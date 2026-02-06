from langgraph.graph import StateGraph, END
from app.models import RAGState
from app.agents import AgentOrchestrator

def create_rag_graph(vector_store):
    """Build the LangGraph workflow for agentic RAG"""
    
    orchestrator = AgentOrchestrator(vector_store)
    
    # Initialize graph
    workflow = StateGraph(RAGState)
    
    # Add nodes
    workflow.add_node("query_planner", orchestrator.query_planner_agent)
    workflow.add_node("retrieval", orchestrator.retrieval_agent)
    workflow.add_node("reranker", orchestrator.reranker_agent)
    workflow.add_node("answer_synthesis", orchestrator.answer_synthesis_agent)
    workflow.add_node("hallucination_verifier", orchestrator.hallucination_verifier_agent)
    workflow.add_node("confidence_gate", orchestrator.confidence_gate)
    
    # Define edges (flow)
    workflow.set_entry_point("query_planner")
    workflow.add_edge("query_planner", "retrieval")
    workflow.add_edge("retrieval", "reranker")
    workflow.add_edge("reranker", "answer_synthesis")
    workflow.add_edge("answer_synthesis", "hallucination_verifier")
    workflow.add_edge("hallucination_verifier", "confidence_gate")
    workflow.add_edge("confidence_gate", END)
    
    return workflow.compile()
