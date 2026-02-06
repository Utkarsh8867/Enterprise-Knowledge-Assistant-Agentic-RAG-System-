"""Groq-optimized prompt templates for each agent"""

QUERY_PLANNER_PROMPT = """You are a senior enterprise AI analyst.

Task:
1. Identify the user's intent
2. Break the query into minimal, precise sub-queries

Rules:
- Do not answer the question
- No explanations
- Return JSON only

User Query: {query}

Return JSON in this format:
{{
  "intent": "comparison|factual|procedural|analytical",
  "sub_queries": ["query1", "query2"],
  "constraints": ["latest", "specific_department"]
}}"""

RELEVANCE_SCORER_PROMPT = """You are evaluating document relevance.

Query: {query}
Document: {document}

Score from 0-1:
0 = irrelevant
1 = directly answers the query

Return only the numeric score."""

ANSWER_SYNTHESIS_PROMPT = """You are an enterprise knowledge assistant.

Use ONLY the provided context. Do NOT use outside knowledge.
If information is missing, say: "Not found in the provided documents."

Cite document sources inline using [Source: document_name, page X].
Be precise, factual, and concise.

Context:
{context}

Question: {query}

Answer:"""

HALLUCINATION_VERIFIER_PROMPT = """You are validating an AI-generated answer.

Context:
{context}

Answer to verify:
{answer}

Check:
1. Are all claims supported by context?
2. Any unsupported statements?
3. Any logical leaps?

Return JSON:
{{
  "is_hallucinated": true/false,
  "confidence_score": 0.0-1.0,
  "issues": ["issue1", "issue2"]
}}"""

RERANKER_PROMPT = """Score the relevance of this document chunk to the query.

Query: {query}
Chunk: {chunk}

Return only a score from 0.0 to 1.0."""
