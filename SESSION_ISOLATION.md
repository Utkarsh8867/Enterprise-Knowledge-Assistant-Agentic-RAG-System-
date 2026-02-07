# 🔒 Session Isolation & Automatic Cleanup

## Overview

The Enterprise Knowledge Assistant now implements **session-based user isolation** to ensure that each user has their own private document space. Documents are automatically cleaned up when sessions expire.

## How It Works

### 1. Session Creation
- When a user first accesses the application, a unique session ID is automatically created
- The session ID is stored in the browser's localStorage
- Each session has its own isolated vector store (FAISS index)

### 2. Document Isolation
- Documents uploaded by User A are stored in User A's session
- User B cannot access User A's documents
- Each user sees only their own uploaded documents

### 3. Automatic Cleanup
Sessions are automatically cleaned up in three ways:

#### a) **Session Timeout (30 minutes)**
- If a user is inactive for 30 minutes, their session expires
- A background thread checks every minute for expired sessions
- Expired sessions are automatically deleted with all their documents

#### b) **Browser Close/Tab Close**
- When user closes the browser tab or window
- The `beforeunload` event triggers session cleanup
- Documents are immediately removed from the vector store

#### c) **Manual "New Session" Button**
- User can click "New Session" button in the header
- This clears current session and creates a fresh one
- All previous documents are removed

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Session Manager                       │
│  ┌────────────┬────────────┬────────────┬────────────┐  │
│  │ Session 1  │ Session 2  │ Session 3  │ Session N  │  │
│  │            │            │            │            │  │
│  │ Vector DB  │ Vector DB  │ Vector DB  │ Vector DB  │  │
│  │ Doc A, B   │ Doc C      │ Doc D, E   │ Doc F      │  │
│  │            │            │            │            │  │
│  │ User 1     │ User 2     │ User 3     │ User N     │  │
│  └────────────┴────────────┴────────────┴────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## Implementation Details

### Backend (FastAPI)

**New Files:**
- `app/session_manager.py` - Manages sessions and cleanup

**Modified Files:**
- `app/main.py` - Session-aware endpoints

**Key Features:**
```python
# Session Manager
- create_session() - Creates new isolated session
- get_vector_store(session_id) - Gets session's vector store
- delete_session(session_id) - Cleans up session
- _cleanup_expired_sessions() - Background cleanup thread
```

**New Endpoints:**
```
POST   /session/new      - Create new session
DELETE /session/clear    - Clear current session
GET    /session/info     - Get session information
```

**Modified Endpoints:**
All endpoints now accept `X-Session-ID` header:
```
GET    /health           - Returns session info
POST   /upload-document  - Uploads to session's vector store
POST   /ask              - Queries session's documents
GET    /metrics          - Shows session metrics
```

### Frontend (React)

**Modified Files:**
- `frontend/src/services/api.js` - Session management
- `frontend/src/App.jsx` - New Session button

**Key Features:**
```javascript
// Automatic session ID management
- Session ID stored in localStorage
- Automatically sent with all requests
- Extracted from response headers

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  // Cleans up session when user closes tab
});
```

## Usage Examples

### For Users

**Starting Fresh:**
1. Click "New Session" button in header
2. All previous documents are cleared
3. Upload new documents for new session

**Automatic Cleanup:**
- Just close the browser tab
- Documents are automatically removed
- No manual cleanup needed

### For Developers

**Check Session Info:**
```bash
curl -X GET http://localhost:8000/session/info \
  -H "X-Session-ID: your-session-id"
```

**Create New Session:**
```bash
curl -X POST http://localhost:8000/session/new
```

**Clear Session:**
```bash
curl -X DELETE http://localhost:8000/session/clear \
  -H "X-Session-ID: your-session-id"
```

## Configuration

**Session Timeout:**
Edit `app/main.py`:
```python
session_manager = SessionManager(session_timeout_minutes=30)
```

**Cleanup Interval:**
Edit `app/session_manager.py`:
```python
time.sleep(60)  # Check every 60 seconds
```

## Benefits

### 1. **Privacy & Security**
- ✅ Users cannot access each other's documents
- ✅ No data leakage between sessions
- ✅ Automatic cleanup prevents data accumulation

### 2. **Resource Management**
- ✅ Memory is freed when sessions expire
- ✅ Vector store doesn't grow indefinitely
- ✅ Efficient resource utilization

### 3. **User Experience**
- ✅ Each user has clean slate
- ✅ No confusion from other users' documents
- ✅ Easy to start fresh with "New Session"

## Monitoring

**Check Active Sessions:**
```python
# In health endpoint response
{
  "active_sessions": 5,  # Number of active sessions
  "session_id": "abc-123",
  "vector_store_size": 10
}
```

**Session Information:**
```json
{
  "session_id": "abc-123",
  "created_at": "2026-02-06T23:00:00",
  "last_accessed": "2026-02-06T23:15:00",
  "documents_count": 2,
  "uploaded_files": ["resume.pdf", "report.docx"],
  "chunks_count": 15
}
```

## Testing

### Test Session Isolation

**Terminal 1 (User A):**
```bash
# Create session
SESSION_A=$(curl -X POST http://localhost:8000/session/new | jq -r .session_id)

# Upload document
curl -X POST http://localhost:8000/upload-document \
  -H "X-Session-ID: $SESSION_A" \
  -F "file=@document_a.pdf"

# Ask question
curl -X POST http://localhost:8000/ask \
  -H "X-Session-ID: $SESSION_A" \
  -H "Content-Type: application/json" \
  -d '{"query": "What is in document A?"}'
```

**Terminal 2 (User B):**
```bash
# Create different session
SESSION_B=$(curl -X POST http://localhost:8000/session/new | jq -r .session_id)

# Upload different document
curl -X POST http://localhost:8000/upload-document \
  -H "X-Session-ID: $SESSION_B" \
  -F "file=@document_b.pdf"

# Ask question - will NOT see document A
curl -X POST http://localhost:8000/ask \
  -H "X-Session-ID: $SESSION_B" \
  -H "Content-Type: application/json" \
  -d '{"query": "What is in document A?"}'
# Response: "Not found in the provided documents"
```

### Test Automatic Cleanup

**Test Timeout:**
```bash
# Create session
SESSION=$(curl -X POST http://localhost:8000/session/new | jq -r .session_id)

# Wait 31 minutes (or change timeout to 1 minute for testing)
# Session will be automatically cleaned up

# Try to use expired session
curl -X GET http://localhost:8000/session/info \
  -H "X-Session-ID: $SESSION"
# Response: 404 Not Found
```

## Troubleshooting

### Session Lost After Refresh
**Cause:** localStorage cleared or session expired
**Solution:** Click "New Session" to create fresh session

### Documents Not Found
**Cause:** Using wrong session ID or session expired
**Solution:** Check session info or create new session

### Memory Usage High
**Cause:** Many active sessions
**Solution:** Reduce session timeout or increase cleanup frequency

## Future Enhancements

Potential improvements:
- [ ] User authentication integration
- [ ] Persistent sessions with database
- [ ] Session sharing between users
- [ ] Session export/import
- [ ] Admin dashboard for session management
- [ ] Configurable timeout per user
- [ ] Session activity logs

## Summary

✅ **Implemented:** Session-based isolation
✅ **Automatic Cleanup:** 30-minute timeout + browser close
✅ **User Privacy:** Complete document isolation
✅ **Resource Efficient:** Automatic memory cleanup
✅ **Easy to Use:** Transparent to users

Each user now has their own private document space that automatically cleans up when they're done!
