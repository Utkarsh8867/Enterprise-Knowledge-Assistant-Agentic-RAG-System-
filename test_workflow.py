import requests
import json

BASE_URL = "http://localhost:8000"

# 1. Check health
print("1. Checking health...")
response = requests.get(f"{BASE_URL}/health")
print(f"Health: {response.json()}\n")

# 2. Upload a document (you need to have a file)
print("2. To upload a document, use:")
print("""
files = {'file': open('resume.pdf', 'rb')}
response = requests.post(f"{BASE_URL}/upload-document", files=files)
print(response.json())
""")

# 3. Ask a question
print("\n3. Asking a question...")
query = {
    "query": "What skills are mentioned in the resume?"
}
response = requests.post(
    f"{BASE_URL}/ask",
    headers={"Content-Type": "application/json"},
    data=json.dumps(query)
)
result = response.json()
print(f"Answer: {result['answer']}")
print(f"Confidence: {result['confidence']}")
print(f"Sources: {result['sources']}\n")

# 4. Get metrics
print("4. Getting metrics...")
response = requests.get(f"{BASE_URL}/metrics")
print(f"Metrics: {response.json()}")
