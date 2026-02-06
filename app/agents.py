import json
from typing import Dict
from groq import Groq
from app.models import RAGState
from app.prompts import (
    QUERY_PLANNER_PROMPT,
    ANSWER_SYNTHESIS_PROMPT,
    HALLUCINATION_VERIFIER_PROMPT,
    RERANKER_PROMPT
)
from app.config import get_settings
from app.vector_store import VectorStore

settings = get_settings()

class AgentOrchestrator:
    """Manages all agents in the RAG pipeline"""
    
    def __init__(self):
        self.client = Groq(api_key=settings.groq_api_key)
        self.vector_store = VectorStore()
    
    def query_planner_agent(self, state: RAGState) -> RAGState:
        """Agent 1: Decompose query into structured intent"""
        try:
            prompt = QUERY_PLANNER_PROMPT.format(query=state['user_query'])
            
            response = self.client.chat.completions.create(
                model=settings.primary_model,
                messages=[{"role": "user", "content": prompt}],
                temperature=0.1,
                max_tokens=500
            )
            
            result = json.loads(response.choices[0].message.content)
            state['intent'] = result.get('intent', 'factual')
            state['sub_queries'] = result.get('sub_queries', [state['user_query']])
            
        except Exception as e:
            state['sub_queries'] = [state['user_query']]
            state['intent'] = 'factual'
        
        return state
    
    def retrieval_agent(self, state: RAGState) -> RAGState:
        """Agent 2: Retrieve relevant chunks from vector store"""
        all_chunks = []
        seen_texts = set()
        
        for sub_query in state['sub_queries']:
            results = self.vector_store.search(sub_query, top_k=settings.top_k)
            
            for result in results:
                if result['text'] not in seen_texts:
                    all_chunks.append(result)
                    seen_texts.add(result['text'])
        
        state['retrieved_chunks'] = all_chunks
        return state
    
    def reranker_agent(self, state: RAGState) -> RAGState:
        """Agent 3: Rerank and refine context"""
        if not state['retrieved_chunks']:
            state['refined_context'] = ""
            return state
        
        scored_chunks = []
        for chunk in state['retrieved_chunks'][:10]:  # Limit for efficiency
            try:
                prompt = RERANKER_PROMPT.format(
                    query=state['user_query'],
                    chunk=chunk['text'][:500]
                )
                
                response = self.client.chat.completions.create(
                    model=settings.fallback_model,
                    messages=[{"role": "user", "content": prompt}],
                    temperature=0,
                    max_tokens=10
                )
                
                score = float(response.choices[0].message.content.strip())
                scored_chunks.append((chunk, score))
            except:
                scored_chunks.append((chunk, chunk.get('score', 0.5)))
        
        scored_chunks.sort(key=lambda x: x[1], reverse=True)
        top_chunks = [c[0] for c in scored_chunks[:5]]
        
        context_parts = []
        for chunk in top_chunks:
            meta = chunk['metadata']
            context_parts.append(
                f"[Source: {meta['source']}, Page {meta['page']}]\n{chunk['text']}"
            )
        
        state['refined_context'] = "\n\n".join(context_parts)
        return state

    def answer_synthesis_agent(self, state: RAGState) -> RAGState:
        """Agent 4: Generate grounded answer with citations"""
        if not state['refined_context']:
            state['draft_answer'] = "Not found in the provided documents."
            state['sources'] = []
            return state
        
        prompt = ANSWER_SYNTHESIS_PROMPT.format(
            context=state['refined_context'],
            query=state['user_query']
        )
        
        try:
            response = self.client.chat.completions.create(
                model=settings.primary_model,
                messages=[{"role": "user", "content": prompt}],
                temperature=0.3,
                max_tokens=1000
            )
            
            state['draft_answer'] = response.choices[0].message.content
            
            # Extract sources from context
            sources = []
            for chunk in state['retrieved_chunks'][:5]:
                meta = chunk['metadata']
                source_str = f"{meta['source']} (Page {meta['page']})"
                if source_str not in sources:
                    sources.append(source_str)
            
            state['sources'] = sources
            
        except Exception as e:
            state['draft_answer'] = f"Error generating answer: {str(e)}"
            state['sources'] = []
        
        return state
    
    def hallucination_verifier_agent(self, state: RAGState) -> RAGState:
        """Agent 5: Verify factual grounding and detect hallucinations"""
        if not state['draft_answer'] or state['draft_answer'].startswith("Not found"):
            state['verified_answer'] = state['draft_answer']
            state['confidence_score'] = 0.5
            return state
        
        prompt = HALLUCINATION_VERIFIER_PROMPT.format(
            context=state['refined_context'],
            answer=state['draft_answer']
        )
        
        try:
            response = self.client.chat.completions.create(
                model=settings.fallback_model,
                messages=[{"role": "user", "content": prompt}],
                temperature=0,
                max_tokens=500
            )
            
            verification = json.loads(response.choices[0].message.content)
            
            if verification.get('is_hallucinated', False):
                state['verified_answer'] = "I cannot provide a fully verified answer based on the available documents. Please rephrase your question or provide more context."
                state['confidence_score'] = 0.4
            else:
                state['verified_answer'] = state['draft_answer']
                state['confidence_score'] = verification.get('confidence_score', 0.8)
        
        except Exception as e:
            state['verified_answer'] = state['draft_answer']
            state['confidence_score'] = 0.7
        
        return state
    
    def confidence_gate(self, state: RAGState) -> RAGState:
        """Final gate: Apply confidence thresholds"""
        confidence = state['confidence_score']
        answer = state['verified_answer']
        
        if confidence < settings.confidence_low:
            state['verified_answer'] = f"[Low Confidence] {answer}\n\nI need more information to answer accurately. Please provide additional context or rephrase your question."
        elif confidence < settings.confidence_medium:
            state['verified_answer'] = f"{answer}\n\n(Note: This answer has moderate confidence. Please verify critical details.)"
        
        return state
