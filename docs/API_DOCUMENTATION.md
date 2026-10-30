# Alumni Connect - API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Response Format
All responses are in JSON format:
```json
{
  "success": true,
  "data": { /* response data */ },
  "error": "error message" // only if error
}
```

---

## Alumni Endpoints

### 1. Register Alumni
**POST** `/alumni/register`

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "secure_password",
  "phone": "9876543210",
  "batch": 2020,
  "year": "3",
  "department": "Computer Science",
  "rollNumber": "CS20001",
  "linkedIn": "https://linkedin.com/in/johndoe",
  "github": "https://github.com/johndoe"
}
```

**Response (201):**
```json
{
  "message": "Alumni registered successfully. Awaiting admin approval.",
  "alumni": {
    "id": "uuid",
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "is_approved": false
  }
}
```

---

### 2. Alumni Login
**POST** `/alumni/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "secure_password"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "alumni": {
    "id": "uuid",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "batch": 2020,
    "year": "3",
    "department": "Computer Science"
  }
}
```

**Error Responses:**
- 401: Invalid credentials or not approved yet
- 403: Account pending admin approval

---

### 3. Get Alumni Profile
**GET** `/alumni/profile/:id`

**Authentication:** Required (Alumni Token)

**Response (200):**
```json
{
  "alumni": {
    "id": "uuid",
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "batch": 2020,
    "year": "3",
    "department": "Computer Science",
    "roll_number": "CS20001",
    "linkedin": "https://linkedin.com/in/johndoe",
    "github": "https://github.com/johndoe"
  }
}
```

---

### 4. Get Events
**GET** `/alumni/events`

**Authentication:** Required (Alumni Token)

**Response (200):**
```json
{
  "events": [
    {
      "id": "uuid",
      "title": "Annual Reunion",
      "description": "Meet and greet with alumni",
      "date": "2024-05-15T10:00:00",
      "location": "Main Hall",
      "event_category": "networking",
      "created_at": "2024-04-01T10:00:00"
    }
  ]
}
```

---

### 5. Get Internships
**GET** `/alumni/internships`

**Authentication:** Required (Alumni Token)

**Response (200):**
```json
{
  "internships": [
    {
      "id": "uuid",
      "title": "Software Engineer Intern",
      "company": "Tech Company",
      "description": "6-month internship",
      "requirements": "Knowledge of web development",
      "deadline": "2024-05-01T23:59:59",
      "stipend": "₹15,000/month",
      "location": "Mumbai",
      "created_at": "2024-04-01T10:00:00"
    }
  ]
}
```

---

### 6. Get Placements
**GET** `/alumni/placements`

**Authentication:** Required (Alumni Token)

**Response (200):**
```json
{
  "placements": [
    {
      "id": "uuid",
      "title": "Senior Software Engineer",
      "company": "Fortune 500 Company",
      "description": "Full-time permanent role",
      "salary": "₹12-15 LPA",
      "location": "Bangalore",
      "deadline": "2024-05-10T23:59:59",
      "eligibility": "B.Tech in CS/IT",
      "created_at": "2024-04-01T10:00:00"
    }
  ]
}
```

---

## Admin Endpoints

### 1. Register Admin
**POST** `/admin/register`

**Request Body:**
```json
{
  "name": "Admin Name",
  "email": "admin@example.com",
  "password": "secure_password"
}
```

**Response (201):**
```json
{
  "message": "Admin registered successfully",
  "admin": {
    "id": "uuid",
    "name": "Admin Name",
    "email": "admin@example.com"
  }
}
```

---

### 2. Admin Login
**POST** `/admin/login`

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "secure_password"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "admin": {
    "id": "uuid",
    "name": "Admin Name",
    "email": "admin@example.com"
  }
}
```

---

### 3. Get Pending Alumni Requests
**GET** `/admin/pending-alumni`

**Authentication:** Required (Admin Token)

**Response (200):**
```json
{
  "pendingAlumni": [
    {
      "id": "uuid",
      "first_name": "John",
      "last_name": "Doe",
      "email": "john@example.com",
      "phone": "9876543210",
      "batch": 2020,
      "year": "3",
      "department": "Computer Science",
      "roll_number": "CS20001",
      "linkedin": "https://linkedin.com/in/johndoe",
      "github": "https://github.com/johndoe",
      "is_approved": false,
      "created_at": "2024-04-01T10:00:00"
    }
  ]
}
```

---

### 4. Approve Alumni
**PUT** `/admin/approve-alumni/:alumniId`

**Authentication:** Required (Admin Token)

**Response (200):**
```json
{
  "message": "Alumni approved successfully",
  "alumni": {
    "id": "uuid",
    "first_name": "John",
    "last_name": "Doe",
    "is_approved": true
  }
}
```

---

### 5. Reject Alumni
**DELETE** `/admin/reject-alumni/:alumniId`

**Authentication:** Required (Admin Token)

**Response (200):**
```json
{
  "message": "Alumni request rejected"
}
```

---

### 6. Create Event
**POST** `/admin/events`

**Authentication:** Required (Admin Token)

**Request Body:**
```json
{
  "title": "Annual Reunion",
  "description": "Meet and greet with alumni",
  "date": "2024-05-15T10:00:00",
  "location": "Main Hall",
  "eventCategory": "networking"
}
```

**Response (201):**
```json
{
  "message": "Event created successfully",
  "event": {
    "id": "uuid",
    "title": "Annual Reunion",
    "description": "Meet and greet with alumni",
    "date": "2024-05-15T10:00:00",
    "location": "Main Hall",
    "event_category": "networking",
    "created_by": "admin_uuid",
    "is_active": true,
    "created_at": "2024-04-01T10:00:00"
  }
}
```

---

### 7. Create Internship Opportunity
**POST** `/admin/internships`

**Authentication:** Required (Admin Token)

**Request Body:**
```json
{
  "title": "Software Engineer Intern",
  "company": "Tech Company",
  "description": "6-month internship",
  "requirements": "Knowledge of web development",
  "deadline": "2024-05-01T23:59:59",
  "stipend": "₹15,000/month",
  "location": "Mumbai"
}
```

**Response (201):**
```json
{
  "message": "Internship opportunity posted successfully",
  "internship": {
    "id": "uuid",
    "title": "Software Engineer Intern",
    "company": "Tech Company",
    "description": "6-month internship",
    "requirements": "Knowledge of web development",
    "deadline": "2024-05-01T23:59:59",
    "stipend": "₹15,000/month",
    "location": "Mumbai",
    "created_by": "admin_uuid",
    "is_active": true,
    "created_at": "2024-04-01T10:00:00"
  }
}
```

---

### 8. Create Placement Opportunity
**POST** `/admin/placements`

**Authentication:** Required (Admin Token)

**Request Body:**
```json
{
  "title": "Senior Software Engineer",
  "company": "Fortune 500 Company",
  "description": "Full-time permanent role",
  "salary": "₹12-15 LPA",
  "location": "Bangalore",
  "deadline": "2024-05-10T23:59:59",
  "eligibility": "B.Tech in CS/IT"
}
```

**Response (201):**
```json
{
  "message": "Placement opportunity posted successfully",
  "placement": {
    "id": "uuid",
    "title": "Senior Software Engineer",
    "company": "Fortune 500 Company",
    "description": "Full-time permanent role",
    "salary": "₹12-15 LPA",
    "location": "Bangalore",
    "deadline": "2024-05-10T23:59:59",
    "eligibility": "B.Tech in CS/IT",
    "created_by": "admin_uuid",
    "is_active": true,
    "created_at": "2024-04-01T10:00:00"
  }
}
```

---

### 9. Search Alumni
**GET** `/admin/search-alumni?batch=2020&year=3&department=Computer%20Science`

**Authentication:** Required (Admin Token)

**Query Parameters:**
- `batch` (optional): Batch year (e.g., 2020)
- `year` (optional): Year of study (1-4)
- `department` (optional): Department name

**Response (200):**
```json
{
  "alumni": [
    {
      "id": "uuid",
      "first_name": "John",
      "last_name": "Doe",
      "email": "john@example.com",
      "phone": "9876543210",
      "batch": 2020,
      "year": "3",
      "department": "Computer Science",
      "roll_number": "CS20001",
      "linkedin": "https://linkedin.com/in/johndoe",
      "github": "https://github.com/johndoe",
      "is_approved": true
    }
  ]
}
```

---

### 10. Get Alumni Profile (Admin View)
**GET** `/admin/alumni-profile/:alumniId`

**Authentication:** Required (Admin Token)

**Response (200):**
```json
{
  "alumni": {
    "id": "uuid",
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "batch": 2020,
    "year": "3",
    "department": "Computer Science",
    "roll_number": "CS20001",
    "linkedin": "https://linkedin.com/in/johndoe",
    "github": "https://github.com/johndoe",
    "is_approved": true,
    "created_at": "2024-04-01T10:00:00"
  }
}
```

---

## Error Handling

### Common Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request - Invalid data provided |
| 401 | Unauthorized - No token provided |
| 403 | Forbidden - Invalid token or insufficient permissions |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error |

### Error Response Format
```json
{
  "error": "Error message describing what went wrong"
}
```

---

## Rate Limiting & Best Practices

1. Implement rate limiting in production
2. Use HTTPS for all API calls
3. Store tokens securely (localStorage or sessionStorage)
4. Refresh tokens before expiration
5. Handle token expiration gracefully
6. Validate input on both client and server
7. Use appropriate HTTP methods (GET, POST, PUT, DELETE)

---

## Health Check

**GET** `/api/health`

**Response (200):**
```json
{
  "status": "OK",
  "message": "Alumni Connect API is running"
}
```
