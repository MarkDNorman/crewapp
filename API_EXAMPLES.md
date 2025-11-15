# CrewLayover API Examples

Quick reference for common API calls using curl.

## Base URL
```
http://localhost:8000
```

## Authentication

### Register New User
```bash
curl -X POST "http://localhost:8000/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newcrew@example.com",
    "password": "password123",
    "full_name": "New Crew Member",
    "airline": "Emirates"
  }'
```

### Login
```bash
curl -X POST "http://localhost:8000/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "crew@example.com",
    "password": "crew123"
  }'
```

Response:
```json
{
  "access_token": "eyJ...",
  "token_type": "bearer",
  "user": {...}
}
```

### Get Current User
```bash
curl -X GET "http://localhost:8000/auth/me" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Destinations

### List All Destinations
```bash
curl -X GET "http://localhost:8000/destinations" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Search Destinations
```bash
curl -X GET "http://localhost:8000/destinations?search=tokyo" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get Destination with Weather
```bash
curl -X GET "http://localhost:8000/destinations/1?include_weather=true" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Create Destination (Admin Only)
```bash
curl -X POST "http://localhost:8000/destinations" \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "London",
    "country": "United Kingdom",
    "region": "Europe",
    "latitude": 51.5074,
    "longitude": -0.1278,
    "description": "Historic city with world-class museums",
    "highlights_24h": ["British Museum", "Tower Bridge", "Borough Market"],
    "safety_tips": ["Very safe", "Watch belongings on tube"],
    "timezone": "Europe/London"
  }'
```

## Recommendations

### Get Recommendations for Destination
```bash
curl -X GET "http://localhost:8000/recommendations?destination_id=1" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Filter by Category
```bash
curl -X GET "http://localhost:8000/recommendations?destination_id=1&category=activity" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Filter by Tags
```bash
curl -X GET "http://localhost:8000/recommendations?tags=late-night,free" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Upvote Recommendation
```bash
curl -X POST "http://localhost:8000/recommendations/1/vote?vote_type=upvote" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Create Recommendation (Admin Only)
```bash
curl -X POST "http://localhost:8000/recommendations" \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "destination_id": 1,
    "category": "activity",
    "title": "Tsukiji Outer Market",
    "description": "Famous fish market with fresh sushi and street food",
    "duration_minutes": 120,
    "best_time_for_crew": "Early morning (5-8am)",
    "price_range": "$$",
    "tags": ["food", "morning-friendly", "photo-worthy"]
  }'
```

## User Tips

### Get Tips for Destination
```bash
curl -X GET "http://localhost:8000/tips?destination_id=1" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Submit New Tip
```bash
curl -X POST "http://localhost:8000/tips" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "destination_id": 1,
    "title": "Great coffee spot",
    "content": "Found an amazing cafe near the hotel with great wifi!",
    "category": "food_drink"
  }'
```

### Get My Tips
```bash
curl -X GET "http://localhost:8000/tips/my-tips" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get Pending Tips (Admin Only)
```bash
curl -X GET "http://localhost:8000/tips/pending" \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

### Moderate Tip (Admin Only)
```bash
# Approve
curl -X POST "http://localhost:8000/tips/1/moderate" \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "decision": "approved"
  }'

# Reject
curl -X POST "http://localhost:8000/tips/1/moderate" \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "decision": "rejected",
    "reason": "Inappropriate content"
  }'
```

### Vote on Tip
```bash
curl -X POST "http://localhost:8000/tips/1/vote?vote_type=upvote" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## User Destinations

### Mark as Visited
```bash
curl -X POST "http://localhost:8000/user-destinations/1" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "visited": true,
    "want_to_visit": false
  }'
```

### Add to Wishlist
```bash
curl -X POST "http://localhost:8000/user-destinations/1" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "visited": false,
    "want_to_visit": true
  }'
```

### Get Visited Destinations
```bash
curl -X GET "http://localhost:8000/user-destinations/visited" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get Wishlist
```bash
curl -X GET "http://localhost:8000/user-destinations/wishlist" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Health Check

### Check API Status
```bash
curl -X GET "http://localhost:8000/health"
```

Response:
```json
{
  "status": "healthy"
}
```

## Using Postman

1. Import API: File → Import → Link
2. Enter: `http://localhost:8000/openapi.json`
3. Create Environment with:
   - `base_url`: `http://localhost:8000`
   - `token`: Your access token from login

## Using Python

```python
import requests

# Login
response = requests.post(
    "http://localhost:8000/auth/login",
    json={"email": "crew@example.com", "password": "crew123"}
)
token = response.json()["access_token"]

# Get destinations
headers = {"Authorization": f"Bearer {token}"}
destinations = requests.get(
    "http://localhost:8000/destinations",
    headers=headers
).json()
```

## Using JavaScript/Fetch

```javascript
// Login
const response = await fetch('http://localhost:8000/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'crew@example.com',
    password: 'crew123'
  })
});
const { access_token } = await response.json();

// Get destinations
const destinations = await fetch('http://localhost:8000/destinations', {
  headers: { 'Authorization': `Bearer ${access_token}` }
}).then(r => r.json());
```

## Error Responses

### 401 Unauthorized
```json
{
  "detail": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "detail": "Not enough permissions"
}
```

### 404 Not Found
```json
{
  "detail": "Destination not found"
}
```

### 422 Validation Error
```json
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "field required",
      "type": "value_error.missing"
    }
  ]
}
```

---

For interactive API documentation, visit: http://localhost:8000/docs
