import requests
import json
import time

BASE_URL = "http://localhost:8000"

print("Testing Enterprise Knowledge Assistant API\n")
print("=" * 50)

# Wait for server to be ready
time.sleep(2)

# 1. Health Check
print("\n1. Health Check:")
try:
    response = requests.get(f"{BASE_URL}/health")
    print(f"   Status: {response.status_code}")
    print(f"   Response: {json.dumps(response.json(), indent=2)}")
except Exception as e:
    print(f"   Error: {e}")

# 2. Upload Document (if you have one)
print("\n2. Upload Document:")
print("   To test upload, use:")
print("   files = {'file': open('UtkarshKResume.pdf', 'rb')}")
print("   response = requests.post(f'{BASE_URL}/upload-document', files=files)")

# 3. Ask Question
print("\n3. Ask Question:")
try:
    query = {
        "query": "What skills are mentioned in the resume?"
    }
    response = requests.post(
        f"{BASE_URL}/ask",
        headers={"Content-Type": "application/json"},
        json=query
    )
    print(f"   Status: {response.status_code}")
    result = response.json()
    print(f"   Answer: {result['answer']}")
    print(f"   Confidence: {result['confidence']}")
    print(f"   Sources: {result['sources']}")
except Exception as e:
    print(f"   Error: {e}")

# 4. Metrics
print("\n4. System Metrics:")
try:
    response = requests.get(f"{BASE_URL}/metrics")
    print(f"   Status: {response.status_code}")
    print(f"   Response: {json.dumps(response.json(), indent=2)}")
except Exception as e:
    print(f"   Error: {e}")

print("\n" + "=" * 50)
print("Test complete!")
