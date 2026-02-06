import requests
import json
import time

BASE_URL = "http://localhost:8000"

print("Testing with updated model...\n")

# Wait a moment for any reload
time.sleep(2)

# Test the ask endpoint
print("Asking: 'What is the email mentioned in the resume?'\n")
query = {
    "query": "What is the email mentioned in the resume?"
}

try:
    response = requests.post(
        f"{BASE_URL}/ask",
        headers={"Content-Type": "application/json"},
        json=query,
        timeout=30
    )
    
    print(f"Status Code: {response.status_code}\n")
    
    if response.status_code == 200:
        result = response.json()
        print(f"Answer:\n{result['answer']}\n")
        print(f"Confidence: {result['confidence']}")
        print(f"Sources: {result['sources']}")
    else:
        print(f"Error: {response.text}")
        
except Exception as e:
    print(f"Error: {e}")

print("\n" + "="*50)

# Check health
print("\nChecking system health...")
try:
    response = requests.get(f"{BASE_URL}/health")
    health = response.json()
    print(f"Status: {health['status']}")
    print(f"Vector Store Size: {health['vector_store_size']} chunks")
    print(f"Model: {health['model']}")
except Exception as e:
    print(f"Error: {e}")
