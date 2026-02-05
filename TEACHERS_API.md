# Teachers Module - API Documentation

## Overview

The Teachers module provides comprehensive endpoints for managing teacher profiles, qualifications, and employment history. It supports progressive onboarding with optional fields at each stage.

---

## Base URL

```
/api/teachers
```

All endpoints require authentication and are tenant-scoped.

---

## Authentication

All endpoints require:
- `Authorization: Bearer <token>` (JWT token in header)
- `x-tenant-id: <tenantId>` (optional, tenant ID in header - derived from user context)

---

## Teacher CRUD Operations

### 1. Create a Teacher

**POST** `/api/teachers`

Creates a new teacher record with basic profile information.

**Request Body:**

```json
{
  "fullName": "Dr. John Smith",
  "email": "john.smith@school.edu",
  "phone": "+1-555-0123",
  "gender": "Male",
  "employeeCode": "TEACH001",
  "profilePhotoUrl": "https://s3.amazonaws.com/photos/john.jpg",
  "yearsOfExperience": 10.5
}
```

**Response (Success - 200):**

```json
{
  "status": "success",
  "data": {
    "id": "teacher-uuid-1",
    "tenantId": "tenant-uuid",
    "userId": null,
    "fullName": "Dr. John Smith",
    "email": "john.smith@school.edu",
    "phone": "+1-555-0123",
    "gender": "Male",
    "employeeCode": "TEACH001",
    "profilePhotoUrl": "https://s3.amazonaws.com/photos/john.jpg",
    "yearsOfExperience": 10.5,
    "createdAt": "2025-12-18T19:48:39Z",
    "updatedAt": "2025-12-18T19:48:39Z",
    "qualifications": [],
    "employmentHistory": []
  },
  "message": "Teacher created successfully."
}
```

**Validation:**
- `fullName` is required
- `employeeCode` must be unique per tenant
- All fields except `fullName` are optional

---

### 2. Get All Teachers

**GET** `/api/teachers`

Retrieves all teachers for the current tenant.

**Response (Success - 200):**

```json
{
  "status": "success",
  "data": {
    "columns": [
      { "field": "fullName", "headerName": "Full Name" },
      { "field": "email", "headerName": "Email" },
      ...
    ],
    "rows": [
      {
        "id": "teacher-uuid-1",
        "tenantId": "tenant-uuid",
        "fullName": "Dr. John Smith",
        "email": "john.smith@school.edu",
        ...
      }
    ]
  },
  "message": "Teachers retrieved successfully."
}
```

---

### 3. Get Teacher by ID

**GET** `/api/teachers/:id`

Retrieves a specific teacher with all qualifications and employment history.

**Path Parameters:**
- `id` (string, required): Teacher ID

**Response (Success - 200):**

```json
{
  "status": "success",
  "data": {
    "id": "teacher-uuid-1",
    "tenantId": "tenant-uuid",
    "fullName": "Dr. John Smith",
    "email": "john.smith@school.edu",
    "phone": "+1-555-0123",
    "gender": "Male",
    "employeeCode": "TEACH001",
    "profilePhotoUrl": "https://s3.amazonaws.com/photos/john.jpg",
    "yearsOfExperience": 10.5,
    "user": {
      "id": "user-uuid",
      "fullName": "Dr. John Smith",
      "email": "john.smith@school.edu"
    },
    "qualifications": [
      {
        "id": "qual-uuid-1",
        "qualificationName": "B.Sc",
        "specialization": "Physics",
        "institution": "MIT",
        "score": 3.8,
        "yearOfPassing": 2010,
        "documentUrl": "https://s3.amazonaws.com/docs/bsc-cert.pdf"
      }
    ],
    "employmentHistory": [
      {
        "id": "emp-uuid-1",
        "organizationName": "Previous School",
        "role": "Physics Teacher",
        "startDate": "2015-06-01T00:00:00Z",
        "endDate": "2023-05-31T00:00:00Z",
        "reasonForLeaving": "Better opportunity",
        "experienceYears": 8
      }
    ]
  },
  "message": "Teacher retrieved successfully."
}
```

---

### 4. Update Teacher

**PUT** `/api/teachers/:id`

Updates teacher profile information (partial update).

**Path Parameters:**
- `id` (string, required): Teacher ID

**Request Body:**

```json
{
  "yearsOfExperience": 11.5,
  "profilePhotoUrl": "https://s3.amazonaws.com/photos/john-updated.jpg"
}
```

**Response (Success - 200):**

```json
{
  "status": "success",
  "data": {
    ...updated teacher object...
  },
  "message": "Teacher updated successfully."
}
```

---

### 5. Delete Teacher

**DELETE** `/api/teachers/:id`

Deletes a teacher and all associated qualifications and employment history (cascading delete).

**Path Parameters:**
- `id` (string, required): Teacher ID

**Response (Success - 200):**

```json
{
  "status": "success",
  "data": null,
  "message": "Teacher deleted successfully."
}
```

---

## Qualifications Management

### 1. Add Qualification

**POST** `/api/teachers/:teacherId/qualifications`

Adds a new academic qualification for a teacher.

**Path Parameters:**
- `teacherId` (string, required): Teacher ID

**Request Body:**

```json
{
  "qualificationName": "M.Sc",
  "specialization": "Quantum Physics",
  "institution": "Cambridge University",
  "score": 3.9,
  "yearOfPassing": 2012,
  "documentUrl": "https://s3.amazonaws.com/docs/msc-cert.pdf"
}
```

**Response (Success - 200):**

```json
{
  "status": "success",
  "data": {
    "id": "qual-uuid-2",
    "tenantId": "tenant-uuid",
    "teacherId": "teacher-uuid-1",
    "qualificationName": "M.Sc",
    "specialization": "Quantum Physics",
    "institution": "Cambridge University",
    "score": 3.9,
    "yearOfPassing": 2012,
    "documentUrl": "https://s3.amazonaws.com/docs/msc-cert.pdf",
    "createdAt": "2025-12-18T19:48:39Z",
    "updatedAt": "2025-12-18T19:48:39Z"
  },
  "message": "Qualification added successfully."
}
```

**Validation:**
- `qualificationName` is required
- All other fields are optional

---

### 2. Get Qualifications by Teacher

**GET** `/api/teachers/:teacherId/qualifications`

Retrieves all qualifications for a specific teacher.

**Path Parameters:**
- `teacherId` (string, required): Teacher ID

**Response (Success - 200):**

```json
{
  "status": "success",
  "data": [
    {
      "id": "qual-uuid-1",
      "qualificationName": "B.Sc",
      "specialization": "Physics",
      ...
    },
    {
      "id": "qual-uuid-2",
      "qualificationName": "M.Sc",
      "specialization": "Quantum Physics",
      ...
    }
  ],
  "message": "Qualifications retrieved successfully."
}
```

---

### 3. Get Qualification by ID

**GET** `/api/teachers/:teacherId/qualifications/:qualificationId`

Retrieves a specific qualification.

**Path Parameters:**
- `teacherId` (string, required): Teacher ID
- `qualificationId` (string, required): Qualification ID

**Response (Success - 200):**

```json
{
  "status": "success",
  "data": {
    "id": "qual-uuid-1",
    "tenantId": "tenant-uuid",
    "teacherId": "teacher-uuid-1",
    ...
  },
  "message": "Qualification retrieved successfully."
}
```

---

### 4. Update Qualification

**PUT** `/api/teachers/:teacherId/qualifications/:qualificationId`

Updates a qualification record (partial update).

**Path Parameters:**
- `teacherId` (string, required): Teacher ID
- `qualificationId` (string, required): Qualification ID

**Request Body:**

```json
{
  "score": 4.0,
  "yearOfPassing": 2013
}
```

**Response (Success - 200):**

```json
{
  "status": "success",
  "data": {
    ...updated qualification object...
  },
  "message": "Qualification updated successfully."
}
```

---

### 5. Delete Qualification

**DELETE** `/api/teachers/:teacherId/qualifications/:qualificationId`

Deletes a specific qualification.

**Path Parameters:**
- `teacherId` (string, required): Teacher ID
- `qualificationId` (string, required): Qualification ID

**Response (Success - 200):**

```json
{
  "status": "success",
  "data": null,
  "message": "Qualification deleted successfully."
}
```

---

## Employment History Management

### 1. Add Employment History

**POST** `/api/teachers/:teacherId/employment-history`

Adds a new employment history record for a teacher.

**Path Parameters:**
- `teacherId` (string, required): Teacher ID

**Request Body:**

```json
{
  "organizationName": "Delhi Public School",
  "role": "Senior Physics Teacher",
  "startDate": "2015-06-01",
  "endDate": "2023-05-31",
  "reasonForLeaving": "Career advancement opportunity",
  "experienceYears": 8
}
```

**Response (Success - 200):**

```json
{
  "status": "success",
  "data": {
    "id": "emp-uuid-1",
    "tenantId": "tenant-uuid",
    "teacherId": "teacher-uuid-1",
    "organizationName": "Delhi Public School",
    "role": "Senior Physics Teacher",
    "startDate": "2015-06-01T00:00:00Z",
    "endDate": "2023-05-31T00:00:00Z",
    "reasonForLeaving": "Career advancement opportunity",
    "experienceYears": 8,
    "createdAt": "2025-12-18T19:48:39Z",
    "updatedAt": "2025-12-18T19:48:39Z"
  },
  "message": "Employment history added successfully."
}
```

**Validation:**
- `organizationName` is required
- `role` is required
- All other fields are optional

---

### 2. Get Employment History by Teacher

**GET** `/api/teachers/:teacherId/employment-history`

Retrieves all employment history records for a teacher.

**Path Parameters:**
- `teacherId` (string, required): Teacher ID

**Response (Success - 200):**

```json
{
  "status": "success",
  "data": [
    {
      "id": "emp-uuid-1",
      "organizationName": "Delhi Public School",
      "role": "Senior Physics Teacher",
      ...
    },
    {
      "id": "emp-uuid-2",
      "organizationName": "Another School",
      "role": "Physics Teacher",
      ...
    }
  ],
  "message": "Employment history retrieved successfully."
}
```

---

### 3. Get Employment History by ID

**GET** `/api/teachers/:teacherId/employment-history/:employmentHistoryId`

Retrieves a specific employment history record.

**Path Parameters:**
- `teacherId` (string, required): Teacher ID
- `employmentHistoryId` (string, required): Employment History ID

**Response (Success - 200):**

```json
{
  "status": "success",
  "data": {
    "id": "emp-uuid-1",
    "tenantId": "tenant-uuid",
    "teacherId": "teacher-uuid-1",
    ...
  },
  "message": "Employment history retrieved successfully."
}
```

---

### 4. Update Employment History

**PUT** `/api/teachers/:teacherId/employment-history/:employmentHistoryId`

Updates an employment history record (partial update).

**Path Parameters:**
- `teacherId` (string, required): Teacher ID
- `employmentHistoryId` (string, required): Employment History ID

**Request Body:**

```json
{
  "reasonForLeaving": "Relocation",
  "experienceYears": 8.5
}
```

**Response (Success - 200):**

```json
{
  "status": "success",
  "data": {
    ...updated employment history object...
  },
  "message": "Employment history updated successfully."
}
```

---

### 5. Delete Employment History

**DELETE** `/api/teachers/:teacherId/employment-history/:employmentHistoryId`

Deletes a specific employment history record.

**Path Parameters:**
- `teacherId` (string, required): Teacher ID
- `employmentHistoryId` (string, required): Employment History ID

**Response (Success - 200):**

```json
{
  "status": "success",
  "data": null,
  "message": "Employment history deleted successfully."
}
```

---

## Error Handling

All errors follow this format:

```json
{
  "status": "error",
  "data": null,
  "message": "Error description"
}
```

### Common Error Codes

| HTTP Code | Scenario |
|-----------|----------|
| 400 | Validation error or missing required fields |
| 401 | Unauthorized - missing or invalid token |
| 403 | Forbidden - tenant mismatch |
| 404 | Resource not found |
| 409 | Conflict - duplicate employeeCode |
| 500 | Server error |

### Example Error Response

```json
{
  "status": "error",
  "data": null,
  "message": "Teacher with employeeCode 'TEACH001' already exists in this tenant."
}
```

---

## Progressive Onboarding Workflow

### Phase 1: Basic Profile (Required)
1. Create teacher with `fullName`
2. Optionally add `email`, `phone`, `gender`, `employeeCode`

### Phase 2: Academic Profile (Optional)
1. Add qualifications via `/teachers/:teacherId/qualifications`
2. Attach documents via Upload API and reference in `documentUrl`

### Phase 3: Employment History (Optional)
1. Add employment records via `/teachers/:teacherId/employment-history`
2. Attach experience letters via Upload API

---

## Tenant Safety

All operations are tenant-scoped:
- Teachers belong to a specific tenant
- Cross-tenant access is prevented at the middleware level
- All queries automatically filter by tenant

---

## Data Models

### Teacher

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID | - | Auto-generated |
| tenantId | UUID | ✓ | Tenant reference |
| userId | UUID | - | Optional user linkage |
| fullName | String | ✓ | Teacher's full name |
| email | String | - | Email address |
| phone | String | - | Phone number |
| gender | Enum | - | Male, Female, Other |
| employeeCode | String | - | Unique per tenant |
| profilePhotoUrl | String | - | S3 URL to photo |
| yearsOfExperience | Float | - | Total experience |
| createdAt | DateTime | - | Auto-generated |
| updatedAt | DateTime | - | Auto-generated |

### TeacherQualification

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID | - | Auto-generated |
| tenantId | UUID | ✓ | Tenant reference |
| teacherId | UUID | ✓ | Teacher reference |
| qualificationName | String | ✓ | e.g., B.Sc, M.Sc |
| specialization | String | - | Area of focus |
| institution | String | - | University/College |
| score | Float | - | CGPA or percentage |
| yearOfPassing | Int | - | Graduation year |
| documentUrl | String | - | S3 URL to certificate |
| createdAt | DateTime | - | Auto-generated |
| updatedAt | DateTime | - | Auto-generated |

### TeacherEmploymentHistory

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | UUID | - | Auto-generated |
| tenantId | UUID | ✓ | Tenant reference |
| teacherId | UUID | ✓ | Teacher reference |
| organizationName | String | ✓ | Previous employer |
| role | String | ✓ | Job title/designation |
| startDate | DateTime | - | Employment start |
| endDate | DateTime | - | Employment end |
| reasonForLeaving | String | - | Exit reason |
| experienceYears | Float | - | Years worked |
| createdAt | DateTime | - | Auto-generated |
| updatedAt | DateTime | - | Auto-generated |

---

## Example Usage: Complete Onboarding Flow

### Step 1: Create Teacher
```bash
curl -X POST http://localhost:5001/api/teachers \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Dr. John Smith",
    "email": "john@school.edu",
    "employeeCode": "TEACH001",
    "yearsOfExperience": 10
  }'
```

### Step 2: Add Qualification
```bash
curl -X POST http://localhost:5001/api/teachers/teacher-id/qualifications \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "qualificationName": "M.Sc",
    "specialization": "Physics",
    "institution": "MIT",
    "score": 3.9,
    "yearOfPassing": 2012
  }'
```

### Step 3: Add Employment History
```bash
curl -X POST http://localhost:5001/api/teachers/teacher-id/employment-history \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "organizationName": "Previous School",
    "role": "Physics Teacher",
    "startDate": "2015-06-01",
    "endDate": "2023-05-31",
    "experienceYears": 8
  }'
```

---

## Integration with Uploads

To attach documents (degree certificates, experience letters):

1. Upload document via `/api/uploads`
2. Reference the returned `s3Url` in qualification or employment history

```bash
# Upload document
curl -X POST http://localhost:5001/api/uploads \
  -H "Authorization: Bearer <token>" \
  -F "file=@certificate.pdf" \
  -F "category=teacher_degree_certificate" \
  -F "entityId=teacher-id"

# Result contains s3Url
# Use s3Url in qualification documentUrl field
```

---

## Notes

- All timestamps are in ISO 8601 format (UTC)
- Dates without time are treated as 00:00:00 UTC
- Soft deletes are not implemented; deletes are permanent
- Cascading deletes apply: deleting a teacher removes qualifications and employment history
- All operations are logged for audit purposes
