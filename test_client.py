"""Simple test client for the RAG system"""
import requests
import json

BASE_URL = "http://localhost:8000"

def upload_document(file_path: str):
    """Upload a document"""
    with open(file_path, 'rb') as f:
        files = {'file': f}
        response = requests.post(f"{BASE_URL}/upload-document", files=files)
    print("Upload Response:", response.json())

def ask_question(query: str):
    """Ask a question"""
    response = requests.post(
        f"{BASE_URL}/ask",
        json={"query": query}
    )
    result = response.json()
    print("\n" + "="*60)
    print(f"Question: {query}")
    print("="*60)
    print(f"\nAnswer: {result['answer']}")
    print(f"\nConfidence: {result['confidence']:.2f}")
    print(f"\nSources: {', '.join(result['sources'])}")
    print("="*60 + "\n")

def get_metrics():
    """Get system metrics"""
    response = requests.get(f"{BASE_URL}/metrics")
    print("Metrics:", json.dumps(response.json(), indent=2))

if __name__ == "__main__":
    # Example usage
    print("Testing Enterprise Knowledge Assistant\n")
    
    # Upload a document (replace with your file)
    # upload_document("sample_document.pdf")
    
    # Get metrics
    get_metrics()
    
    # Ask questions
    ask_question("What are the security compliance requirements?")
