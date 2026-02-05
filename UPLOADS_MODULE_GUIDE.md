# Upload Module Documentation

## Overview

The Upload module handles file uploads to **Google Cloud Storage (GCS)** with metadata tracking in the database. It uses a two-step process:
1. Get a pre-signed URL from the backend
2. Upload the file directly to GCS
3. Store file metadata in the database

This approach reduces server load and allows direct browser-to-cloud uploads.

---

## Architecture

### Technology Stack
- **Cloud Storage**: Google Cloud Storage (GCS)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Company-based (via `authenticateCompany` middleware)

### Key Components
1. **Routes** (`uploads.routes.js`) - API endpoints
2. **Controller** (`uploads.controller.js`) - Request handling & validation
3. **Service** (`uploads.service.js`) - Business logic & GCS operations
4. **Database** - Upload records stored with metadata

---

## Database Schema

```prisma
model Upload {
  id           String   @id @default(uuid())
  tenantId     String   // School/Tenant identifier
  category     String   // Document category (e.g., "student", "teacher")
  entityId     String   // ID of the entity being uploaded for (e.g., student ID)
  documentType String   // Type of document (e.g., "profile_pic", "certificate")
  s3Url        String   // GCS URL where file is stored
  uploadedAt   DateTime @default(now())

  tenant Tenant @relation(fields: [tenantId], references: [id], onDelete: Cascade)

  @@index([tenantId])
  @@index([tenantId, category])
  @@index([tenantId, entityId])
  @@map("uploads")
}
```

### Field Descriptions
- **id**: Unique identifier (auto-generated UUID)
- **tenantId**: Which school/tenant owns this file
- **category**: Logical grouping (e.g., "students", "teachers", "documents")
- **entityId**: Which entity this file belongs to (e.g., student/teacher ID)
- **documentType**: Type of document (e.g., "profile_picture", "birth_certificate")
- **s3Url**: Full URL to access the file in GCS
- **uploadedAt**: Timestamp when file was uploaded

---

## API Endpoints

### 1. Get Pre-signed URL
**Endpoint**: `POST /api/uploads/presigned-url`

**Purpose**: Get a signed URL to upload a file directly to GCS

**Authentication**: Required (Bearer token)

**Request Body**:
```json
{
  "tenantId": "school-123",
  "category": "students",
  "path": "profile_pic.jpg",
  "mimeType": "image/jpeg"
}
```

**Response** (Success - 200):
```json
{
  "success": true,
  "data": {
    "uploadUrl": "https://storage.googleapis.com/bucket-name/school-123/students/profile_pic_1702898547000.jpg?...",
    "fileUrl": "https://storage.googleapis.com/bucket-name/school-123/students/profile_pic_1702898547000.jpg"
  },
  "message": "Pre-signed URL generated successfully."
}
```

**Response** (Error - 400):
```json
{
  "success": false,
  "data": null,
  "message": "Missing required fields."
}
```

**Parameters**:
- `tenantId` (required): School/tenant identifier
- `category` (required): Document category
- `path` (required): Original filename with extension
- `mimeType` (required): MIME type (e.g., "image/jpeg", "application/pdf")

**How It Works**:
- Backend generates a unique filename by appending timestamp
- Creates a signed URL valid for 10 minutes
- Returns both the upload URL and the final accessible URL

---

### 2. Store File Metadata
**Endpoint**: `POST /api/uploads/`

**Purpose**: Save file metadata to database after successful upload

**Authentication**: Required (Bearer token)

**Request Body**:
```json
{
  "tenantId": "school-123",
  "category": "students",
  "entityId": "student-456",
  "documentType": "profile_picture",
  "gcsUrl": "https://storage.googleapis.com/bucket-name/school-123/students/profile_pic_1702898547000.jpg"
}
```

**Response** (Success - 200):
```json
{
  "success": true,
  "data": {
    "id": "upload-789",
    "tenantId": "school-123",
    "category": "students",
    "entityId": "student-456",
    "documentType": "profile_picture",
    "s3Url": "https://storage.googleapis.com/bucket-name/school-123/students/profile_pic_1702898547000.jpg",
    "uploadedAt": "2024-12-18T10:22:27Z"
  },
  "message": "File metadata stored successfully."
}
```

**Parameters**:
- `tenantId` (required): School/tenant identifier
- `category` (required): Document category
- `entityId` (required): Which entity this belongs to (e.g., student ID)
- `documentType` (required): Type of document
- `gcsUrl` (required): Full URL returned from presigned-url endpoint

---

### 3. Get All Files for an Entity
**Endpoint**: `GET /api/uploads/:tenant_id/:category/:entity_id`

**Purpose**: Retrieve all files uploaded for a specific entity

**Authentication**: Required (Bearer token)

**URL Parameters**:
- `tenant_id`: School/tenant identifier
- `category`: Document category
- `entity_id`: Entity identifier (e.g., student ID)

**Example Request**:
```
GET /api/uploads/school-123/students/student-456
```

**Response** (Success - 200):
```json
{
  "success": true,
  "data": [
    {
      "id": "upload-1",
      "tenantId": "school-123",
      "category": "students",
      "entityId": "student-456",
      "documentType": "profile_picture",
      "s3Url": "https://storage.googleapis.com/...",
      "uploadedAt": "2024-12-18T10:22:27Z"
    },
    {
      "id": "upload-2",
      "tenantId": "school-123",
      "category": "students",
      "entityId": "student-456",
      "documentType": "birth_certificate",
      "s3Url": "https://storage.googleapis.com/...",
      "uploadedAt": "2024-12-17T14:15:00Z"
    }
  ],
  "message": "Files retrieved successfully."
}
```

**Features**:
- Returns files sorted by `uploadedAt` in descending order (newest first)
- Returns all document types for the entity

---

### 4. Get Specific File by Document Type
**Endpoint**: `GET /api/uploads/:tenant_id/:category/:entity_id/:document_type`

**Purpose**: Retrieve a specific file by its document type

**Authentication**: Required (Bearer token)

**URL Parameters**:
- `tenant_id`: School/tenant identifier
- `category`: Document category
- `entity_id`: Entity identifier
- `document_type`: Type of document to retrieve

**Example Request**:
```
GET /api/uploads/school-123/students/student-456/profile_picture
```

**Response** (Success - 200):
```json
{
  "success": true,
  "data": {
    "id": "upload-1",
    "tenantId": "school-123",
    "category": "students",
    "entityId": "student-456",
    "documentType": "profile_picture",
    "s3Url": "https://storage.googleapis.com/...",
    "uploadedAt": "2024-12-18T10:22:27Z"
  },
  "message": "File retrieved successfully."
}
```

**Response** (Error - 404):
```json
{
  "success": false,
  "data": null,
  "message": "File not found."
}
```

---

### 5. Delete File
**Endpoint**: `DELETE /api/uploads/:tenant_id/:category/:entity_id/:file_id`

**Purpose**: Delete a file from GCS and remove its metadata from database

**Authentication**: Required (Bearer token)

**URL Parameters**:
- `tenant_id`: School/tenant identifier
- `category`: Document category
- `entity_id`: Entity identifier
- `file_id`: ID of the file to delete

**Example Request**:
```
DELETE /api/uploads/school-123/students/student-456/upload-1
```

**Response** (Success - 200):
```json
{
  "success": true,
  "data": null,
  "message": "File deleted successfully."
}
```

**What Happens**:
1. Verifies file exists in database
2. Extracts GCS file path from stored URL
3. Deletes file from Google Cloud Storage
4. Removes metadata record from database
5. Returns success

**Error Handling**:
- If file not found: Returns "File not found"
- If URL format invalid: Returns "Stored file URL is invalid"

---

## Upload Flow - Step by Step

### Frontend Implementation Example

```javascript
// Step 1: Request pre-signed URL
const getPresignedUrl = async (file, tenantId, category) => {
  const response = await fetch('/api/uploads/presigned-url', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      tenantId,
      category,
      path: file.name,
      mimeType: file.type
    })
  });
  
  return response.json();
};

// Step 2: Upload file to GCS using the presigned URL
const uploadToGCS = async (file, uploadUrl) => {
  const response = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type
    },
    body: file
  });
  
  if (!response.ok) {
    throw new Error('Upload failed');
  }
  
  return response;
};

// Step 3: Store metadata in database
const storeMetadata = async (tenantId, category, entityId, documentType, gcsUrl) => {
  const response = await fetch('/api/uploads/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      tenantId,
      category,
      entityId,
      documentType,
      gcsUrl
    })
  });
  
  return response.json();
};

// Complete upload process
const completeUpload = async (file, tenantId, category, entityId, documentType) => {
  try {
    // Get presigned URL
    const { data: urlData } = await getPresignedUrl(file, tenantId, category);
    
    // Upload to GCS
    await uploadToGCS(file, urlData.uploadUrl);
    
    // Store metadata
    const result = await storeMetadata(
      tenantId,
      category,
      entityId,
      documentType,
      urlData.fileUrl
    );
    
    console.log('Upload complete!', result.data);
    return result.data;
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
};

// Usage
const file = document.getElementById('fileInput').files[0];
await completeUpload(
  file,
  'school-123',
  'students',
  'student-456',
  'profile_picture'
);
```

---

## Common Use Cases

### 1. Student Profile Picture Upload
```javascript
completeUpload(
  file,
  tenantId,
  'students',
  studentId,
  'profile_picture'
)
```

### 2. Student Document Upload (Certificate, Birth Certificate, etc.)
```javascript
completeUpload(
  file,
  tenantId,
  'students',
  studentId,
  'birth_certificate' // or 'certificate', 'passport', etc.
)
```

### 3. Teacher Profile Picture Upload
```javascript
completeUpload(
  file,
  tenantId,
  'teachers',
  teacherId,
  'profile_picture'
)
```

### 4. Teacher Qualification Document Upload
```javascript
completeUpload(
  file,
  tenantId,
  'teachers',
  teacherId,
  'degree_certificate'
)
```

### 5. Retrieve All Student Documents
```javascript
const response = await fetch(
  `/api/uploads/${tenantId}/students/${studentId}`,
  { headers: { 'Authorization': `Bearer ${token}` } }
);
const files = await response.json();
```

### 6. Get Latest Profile Picture
```javascript
const response = await fetch(
  `/api/uploads/${tenantId}/students/${studentId}/profile_picture`,
  { headers: { 'Authorization': `Bearer ${token}` } }
);
const profilePic = await response.json();
```

---

## Key Features

### Security
✅ **Pre-signed URLs**: Files upload directly to GCS, not through backend
✅ **Time-limited**: URLs expire after 10 minutes
✅ **Authentication**: All endpoints require valid JWT token
✅ **Multi-tenant**: Data isolated by `tenantId`
✅ **MIME type validation**: Enforced at upload time

### Performance
✅ **Direct uploads**: No file processing on backend
✅ **Scalable storage**: Leverages Google Cloud Storage
✅ **Indexed queries**: Fast lookups by tenant, category, entity
✅ **Minimal bandwidth**: Backend only handles metadata

### Reliability
✅ **Atomic operations**: Metadata only stored after GCS upload
✅ **URL validation**: Prevents invalid file URLs from being stored
✅ **Cascade delete**: Removes metadata when tenant/entity deleted

---

## Error Handling

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| "Missing required fields" | Missing parameter in request | Check all required fields are present |
| "File not found" | Trying to delete/get non-existent file | Verify file ID exists |
| "Stored file URL is invalid" | URL format doesn't match expected pattern | Check GCS URL format |
| Upload fails with 403 | Invalid GCS credentials | Verify service account key and permissions |
| Upload fails with 401 | Invalid/expired token | Refresh authentication token |

---

## Environment Variables Required

```bash
# Google Cloud Storage
GOOGLE_CLOUD_PROJECT_ID=your-gcp-project
GCS_SERVICE_ACCOUNT_PATH=/path/to/service-account-key.json
GCS_BUCKET_NAME=your-bucket-name

# Database
DATABASE_URL=postgresql://user:password@host:port/dbname
```

---

## Category & Document Type Examples

### Categories
- `students` - Student-related files
- `teachers` - Teacher-related files
- `documents` - General documents
- `reports` - Generated reports
- `assignments` - Assignment files
- `attendance` - Attendance records

### Document Types
- `profile_picture` - Profile/avatar
- `birth_certificate` - Birth certificate
- `passport` - Passport copy
- `aadhar` - Aadhar card
- `degree_certificate` - Educational degree
- `experience_certificate` - Work experience
- `medical_record` - Medical documentation
- `assignment_submission` - Assignment file
- `exam_answer_sheet` - Exam document

---

## Response Format

All endpoints follow this response structure:

```json
{
  "success": true|false,
  "data": {/* actual data or null */},
  "message": "Human-readable message"
}
```

---

## Implementation Checklist for UI

- [ ] Create file input component
- [ ] Implement file selection UI
- [ ] Add pre-signed URL request logic
- [ ] Implement GCS upload logic
- [ ] Add metadata storage logic
- [ ] Display upload progress
- [ ] Handle errors gracefully
- [ ] Show uploaded file list
- [ ] Implement file deletion
- [ ] Add file type validation (client-side)
- [ ] Add file size validation
- [ ] Show file thumbnails where applicable
- [ ] Implement retry mechanism
- [ ] Add loading states
- [ ] Handle network failures

---

## Testing with cURL

### Get Presigned URL
```bash
curl -X POST http://localhost:3000/api/uploads/presigned-url \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "tenantId": "school-123",
    "category": "students",
    "path": "photo.jpg",
    "mimeType": "image/jpeg"
  }'
```

### Store Metadata
```bash
curl -X POST http://localhost:3000/api/uploads/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "tenantId": "school-123",
    "category": "students",
    "entityId": "student-456",
    "documentType": "profile_picture",
    "gcsUrl": "https://storage.googleapis.com/bucket/school-123/students/photo_1702898547000.jpg"
  }'
```

### Get All Files
```bash
curl -X GET http://localhost:3000/api/uploads/school-123/students/student-456 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get Specific File
```bash
curl -X GET http://localhost:3000/api/uploads/school-123/students/student-456/profile_picture \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Delete File
```bash
curl -X DELETE http://localhost:3000/api/uploads/school-123/students/student-456/upload-789 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Notes

- File names are automatically timestamped to avoid collisions
- URLs are preserved exactly as received from GCS
- All timestamps are in ISO 8601 format
- Pre-signed URLs are valid for 10 minutes from generation
- Deleting an entity cascades to delete all its uploads
- Files are stored in GCS under `{tenantId}/{category}/` structure
