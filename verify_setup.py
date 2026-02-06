#!/usr/bin/env python3
"""
Setup Verification Script for Enterprise Knowledge Assistant
"""

import sys
import subprocess
import os
from pathlib import Path

def check_python_version():
    """Check Python version"""
    print("🐍 Checking Python version...")
    version = sys.version_info
    if version.major >= 3 and version.minor >= 10:
        print(f"   ✅ Python {version.major}.{version.minor}.{version.micro}")
        return True
    else:
        print(f"   ❌ Python {version.major}.{version.minor}.{version.micro} (Need 3.10+)")
        return False

def check_node():
    """Check Node.js installation"""
    print("\n📦 Checking Node.js...")
    try:
        result = subprocess.run(['node', '--version'], capture_output=True, text=True)
        version = result.stdout.strip()
        print(f"   ✅ Node.js {version}")
        return True
    except FileNotFoundError:
        print("   ❌ Node.js not found")
        return False

def check_npm():
    """Check npm installation"""
    print("\n📦 Checking npm...")
    try:
        result = subprocess.run(['npm', '--version'], capture_output=True, text=True)
        version = result.stdout.strip()
        print(f"   ✅ npm {version}")
        return True
    except FileNotFoundError:
        print("   ❌ npm not found")
        return False

def check_backend_files():
    """Check backend files"""
    print("\n📁 Checking backend files...")
    required_files = [
        'app/main.py',
        'app/agents.py',
        'app/config.py',
        'app/graph.py',
        'app/models.py',
        'app/prompts.py',
        'app/vector_store.py',
        'app/document_processor.py',
        'requirements.txt',
        '.env'
    ]
    
    all_exist = True
    for file in required_files:
        if Path(file).exists():
            print(f"   ✅ {file}")
        else:
            print(f"   ❌ {file} (missing)")
            all_exist = False
    
    return all_exist

def check_frontend_files():
    """Check frontend files"""
    print("\n📁 Checking frontend files...")
    required_files = [
        'frontend/package.json',
        'frontend/public/index.html',
        'frontend/src/index.js',
        'frontend/src/App.js',
        'frontend/src/components/ChatInterface.js',
        'frontend/src/components/DocumentUpload.js',
        'frontend/src/components/SystemStats.js',
        'frontend/src/services/api.js'
    ]
    
    all_exist = True
    for file in required_files:
        if Path(file).exists():
            print(f"   ✅ {file}")
        else:
            print(f"   ❌ {file} (missing)")
            all_exist = False
    
    return all_exist

def check_env_file():
    """Check .env configuration"""
    print("\n🔧 Checking .env configuration...")
    if not Path('.env').exists():
        print("   ❌ .env file not found")
        return False
    
    with open('.env', 'r') as f:
        content = f.read()
        
    required_vars = [
        'GROQ_API_KEY',
        'EMBEDDING_MODEL',
        'VECTOR_DB_PATH',
        'UPLOAD_DIR'
    ]
    
    all_set = True
    for var in required_vars:
        if var in content and not content.split(var)[1].split('\n')[0].strip('=').strip():
            print(f"   ⚠️  {var} is empty")
            all_set = False
        elif var in content:
            print(f"   ✅ {var}")
        else:
            print(f"   ❌ {var} (missing)")
            all_set = False
    
    return all_set

def check_python_packages():
    """Check Python packages"""
    print("\n📦 Checking Python packages...")
    required_packages = [
        'fastapi',
        'uvicorn',
        'groq',
        'langchain',
        'langgraph',
        'faiss-cpu',
        'sentence-transformers'
    ]
    
    all_installed = True
    for package in required_packages:
        try:
            __import__(package.replace('-', '_'))
            print(f"   ✅ {package}")
        except ImportError:
            print(f"   ❌ {package} (not installed)")
            all_installed = False
    
    return all_installed

def main():
    print("=" * 60)
    print("Enterprise Knowledge Assistant - Setup Verification")
    print("=" * 60)
    
    checks = [
        check_python_version(),
        check_node(),
        check_npm(),
        check_backend_files(),
        check_frontend_files(),
        check_env_file(),
        check_python_packages()
    ]
    
    print("\n" + "=" * 60)
    if all(checks):
        print("✅ All checks passed! You're ready to go!")
        print("\nNext steps:")
        print("1. Run: python -m uvicorn app.main:app --host 0.0.0.0 --port 8000")
        print("2. Run: cd frontend && npm install && npm start")
        print("3. Open: http://localhost:3000")
    else:
        print("❌ Some checks failed. Please fix the issues above.")
        print("\nCommon fixes:")
        print("- Install Python packages: pip install -r requirements.txt")
        print("- Install Node packages: cd frontend && npm install")
        print("- Configure .env file with your Groq API key")
    print("=" * 60)

if __name__ == "__main__":
    main()
