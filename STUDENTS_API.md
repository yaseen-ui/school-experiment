# Students Module API Documentation

## Overview

The Students API provides endpoints for managing student records in the school management system. Students are core entities that track personal information, academic details, family information, and documentation for school enrollment.

## Base URL
```
/api/students
```

## Authentication
All endpoints require authentication via JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## 1. CREATE STUDENT

### Endpoint
```
POST /api/students
```

### Description
Creates a new student record and automatically enrolls them in the active academic year for the tenant.

### Request Headers
```
Content-Type: application/json
Authorization: Bearer <jwt_token>
```

### Request Body (Payload)

```json
{
  "firstName": "string",
  "middleName": "string (optional)",
  "lastName": "string",
  "dateOfBirth": "ISO 8601 Date (YYYY-MM-DD)",
  "gender": "Male | Female | Other",
  
  "aadhaarNumber": "string (optional)",
  "casteCategory": "string (optional)",
  "subCaste": "string (optional)",
  "religion": "string (optional)",
  "motherTongue": "string (optional)",
  "bloodGroup": "string (optional)",
  "nationality": "string (optional)",
  "identificationMarks": "string (optional)",
  
  "classApplyingFor": "string (optional)",
  "mediumOfInstruction": "string (optional)",
  "previousSchoolName": "string (optional)",
  "previousClassAttended": "string (optional)",
  "transferCertificateNo": "string (optional)",
  "dateOfIssueTC": "ISO 8601 Date (YYYY-MM-DD) (optional)",
  "modeOfTransport": "string (optional)",
  
  "fatherName": "string (optional)",
  "fatherOccupation": "string (optional)",
  "fatherPhone": "string (optional)",
  "fatherAadhaar": "string (optional)",
  
  "motherName": "string (optional)",
  "motherOccupation": "string (optional)",
  "motherPhone": "string (optional)",
  "motherAadhaar": "string (optional)",
  
  "guardianName": "string (optional)",
  "guardianRelation": "string (optional)",
  "guardianContact": "string (optional)",
  
  "feePaymentMode": "string (optional)",
  "bankAccountDetails": "string (optional)",
  "midDayMealEligibility": "boolean (optional)",
  
  "permanentAddress": "string (optional)",
  "state": "string (optional)",
  "pincode": "string (optional)",
  
  "gradeId": "uuid",
  "sectionId": "uuid",
  
  "studentPassportPhoto": "string (URL) (optional)",
  "motherPassportPhoto": "string (URL) (optional)",
  "fatherPassportPhoto": "string (URL) (optional)",
  "guardianPassportPhoto": "string (URL) (optional)",
  "studentAadharCopy": "string (URL) (optional)",
  "parentsAadharCopy": "string (URL) (optional)",
  "casteCertificateCopy": "string (URL) (optional)",
  "birthCertificateCopy": "string (URL) (optional)",
  "tcCopy": "string (URL) (optional)",
  "conductCertificateCopy": "string (URL) (optional)",
  "previousYearsMarksheetCopy": "string (URL) (optional)",
  "incomeCertificateCopy": "string (URL) (optional)"
}
```

### Request Example
```bash
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGc..." \
  -d '{
    "firstName": "Arjun",
    "middleName": "Kumar",
    "lastName": "Sharma",
    "dateOfBirth": "2012-05-15",
    "gender": "Male",
    "bloodGroup": "O+",
    "gradeId": "grade-uuid-123",
    "sectionId": "section-uuid-456",
    "fatherName": "Raj Sharma",
    "motherName": "Priya Sharma",
    "permanentAddress": "123 Main Street",
    "state": "Maharashtra",
    "pincode": "400001"
  }'
```

### Response (Success - 200)

```json
{
  "status": "success",
  "data": {
    "id": "student-uuid-789",
    "tenantId": "tenant-uuid-001",
    "firstName": "Arjun",
    "middleName": "Kumar",
    "lastName": "Sharma",
    "dateOfBirth": "2012-05-15T00:00:00.000Z",
    "gender": "Male",
    "aadhaarNumber": null,
    "casteCategory": null,
    "subCaste": null,
    "religion": null,
    "motherTongue": null,
    "bloodGroup": "O+",
    "nationality": null,
    "identificationMarks": null,
    "classApplyingFor": null,
    "mediumOfInstruction": null,
    "previousSchoolName": null,
    "previousClassAttended": null,
    "transferCertificateNo": null,
    "dateOfIssueTC": null,
    "modeOfTransport": null,
    "fatherName": "Raj Sharma",
    "fatherOccupation": null,
    "fatherPhone": null,
    "fatherAadhaar": null,
    "motherName": "Priya Sharma",
    "motherOccupation": null,
    "motherPhone": null,
    "motherAadhaar": null,
    "guardianName": null,
    "guardianRelation": null,
    "guardianContact": null,
    "feePaymentMode": null,
    "bankAccountDetails": null,
    "midDayMealEligibility": null,
    "permanentAddress": "123 Main Street",
    "state": "Maharashtra",
    "pincode": "400001",
    "gradeId": "grade-uuid-123",
    "sectionId": "section-uuid-456",
    "studentPassportPhoto": null,
    "motherPassportPhoto": null,
    "fatherPassportPhoto": null,
    "guardianPassportPhoto": null,
    "studentAadharCopy": null,
    "parentsAadharCopy": null,
    "casteCertificateCopy": null,
    "birthCertificateCopy": null,
    "tcCopy": null,
    "conductCertificateCopy": null,
    "previousYearsMarksheetCopy": null,
    "incomeCertificateCopy": null,
    "createdAt": "2025-12-18T10:30:00.000Z",
    "updatedAt": "2025-12-18T10:30:00.000Z",
    "course": {
      "courseId": "course-uuid-001",
      "name": "Primary"
    },
    "grade": {
      "gradeId": "grade-uuid-123",
      "name": "Grade 5"
    },
    "section": {
      "sectionId": "section-uuid-456",
      "name": "Section A"
    }
  },
  "message": "Student created successfully. Use the update API to complete the profile."
}
```

### Response (Error - 400)

```json
{
  "status": "error",
  "data": null,
  "message": "No active academic year found for this tenant. Please activate an academic year first."
}
```

---

## 2. GET ALL STUDENTS

### Endpoint
```
GET /api/students
```

### Description
Retrieves all students for the authenticated tenant with their table columns metadata.

### Request Headers
```
Authorization: Bearer <jwt_token>
```

### Query Parameters
None

### Response (Success - 200)

```json
{
  "status": "success",
  "data": {
    "columns": [
      {
        "field": "firstName",
        "headerName": "First Name"
      },
      {
        "field": "middleName",
        "headerName": "Middle Name"
      },
      {
        "field": "lastName",
        "headerName": "Last Name"
      },
      {
        "field": "dateOfBirth",
        "headerName": "Date of Birth"
      },
      {
        "field": "gender",
        "headerName": "Gender"
      },
      {
        "field": "aadhaarNumber",
        "headerName": "Aadhaar Number"
      },
      {
        "field": "gradeId",
        "headerName": "Grade ID"
      },
      {
        "field": "sectionId",
        "headerName": "Section ID"
      },
      {
        "field": "fatherName",
        "headerName": "Father's Name"
      },
      {
        "field": "motherName",
        "headerName": "Mother's Name"
      }
    ],
    "rows": [
      {
        "id": "student-uuid-789",
        "tenantId": "tenant-uuid-001",
        "firstName": "Arjun",
        "middleName": "Kumar",
        "lastName": "Sharma",
        "dateOfBirth": "2012-05-15T00:00:00.000Z",
        "gender": "Male",
        "bloodGroup": "O+",
        "gradeId": "grade-uuid-123",
        "sectionId": "section-uuid-456",
        "fatherName": "Raj Sharma",
        "motherName": "Priya Sharma",
        "permanentAddress": "123 Main Street",
        "state": "Maharashtra",
        "pincode": "400001",
        "createdAt": "2025-12-18T10:30:00.000Z",
        "updatedAt": "2025-12-18T10:30:00.000Z",
        "course": {
          "courseId": "course-uuid-001",
          "name": "Primary"
        },
        "grade": {
          "gradeId": "grade-uuid-123",
          "name": "Grade 5"
        },
        "section": {
          "sectionId": "section-uuid-456",
          "name": "Section A"
        }
      },
      {
        "id": "student-uuid-790",
        "tenantId": "tenant-uuid-001",
        "firstName": "Priya",
        "middleName": "Rani",
        "lastName": "Singh",
        "dateOfBirth": "2012-08-20T00:00:00.000Z",
        "gender": "Female",
        "bloodGroup": "A+",
        "gradeId": "grade-uuid-123",
        "sectionId": "section-uuid-456",
        "fatherName": "Vikram Singh",
        "motherName": "Anjali Singh",
        "permanentAddress": "456 Oak Street",
        "state": "Maharashtra",
        "pincode": "400002",
        "createdAt": "2025-12-17T14:15:00.000Z",
        "updatedAt": "2025-12-17T14:15:00.000Z",
        "course": {
          "courseId": "course-uuid-001",
          "name": "Primary"
        },
        "grade": {
          "gradeId": "grade-uuid-123",
          "name": "Grade 5"
        },
        "section": {
          "sectionId": "section-uuid-456",
          "name": "Section A"
        }
      }
    ]
  },
  "message": "Students retrieved successfully."
}
```

### Response (Error - 400)

```json
{
  "status": "error",
  "data": null,
  "message": "Failed to retrieve students."
}
```

---

## 3. GET STUDENT BY ID

### Endpoint
```
GET /api/students/:id
```

### Description
Retrieves a specific student's details by their ID.

### Request Headers
```
Authorization: Bearer <jwt_token>
```

### Path Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | uuid | Yes | The unique identifier of the student |

### Response (Success - 200)

```json
{
  "status": "success",
  "data": {
    "id": "student-uuid-789",
    "tenantId": "tenant-uuid-001",
    "firstName": "Arjun",
    "middleName": "Kumar",
    "lastName": "Sharma",
    "dateOfBirth": "2012-05-15T00:00:00.000Z",
    "gender": "Male",
    "aadhaarNumber": "123456789012",
    "casteCategory": "General",
    "subCaste": null,
    "religion": "Hindu",
    "motherTongue": "Marathi",
    "bloodGroup": "O+",
    "nationality": "Indian",
    "identificationMarks": "Mole on left arm",
    "classApplyingFor": "Grade 5",
    "mediumOfInstruction": "English",
    "previousSchoolName": "ABC School",
    "previousClassAttended": "Grade 4",
    "transferCertificateNo": "TC/2024/001",
    "dateOfIssueTC": "2024-05-15T00:00:00.000Z",
    "modeOfTransport": "School Bus",
    "fatherName": "Raj Sharma",
    "fatherOccupation": "Engineer",
    "fatherPhone": "9876543210",
    "fatherAadhaar": "111122223333",
    "motherName": "Priya Sharma",
    "motherOccupation": "Doctor",
    "motherPhone": "9876543211",
    "motherAadhaar": "111122223334",
    "guardianName": null,
    "guardianRelation": null,
    "guardianContact": null,
    "feePaymentMode": "Monthly",
    "bankAccountDetails": "HDFC Bank, Account: 50100123456789",
    "midDayMealEligibility": true,
    "permanentAddress": "123 Main Street",
    "state": "Maharashtra",
    "pincode": "400001",
    "gradeId": "grade-uuid-123",
    "sectionId": "section-uuid-456",
    "studentPassportPhoto": "https://cdn.example.com/photos/student-photo-789.jpg",
    "motherPassportPhoto": "https://cdn.example.com/photos/mother-photo-789.jpg",
    "fatherPassportPhoto": "https://cdn.example.com/photos/father-photo-789.jpg",
    "guardianPassportPhoto": null,
    "studentAadharCopy": "https://cdn.example.com/docs/aadhaar-789.pdf",
    "parentsAadharCopy": "https://cdn.example.com/docs/parent-aadhaar-789.pdf",
    "casteCertificateCopy": "https://cdn.example.com/docs/caste-789.pdf",
    "birthCertificateCopy": "https://cdn.example.com/docs/birth-789.pdf",
    "tcCopy": "https://cdn.example.com/docs/tc-789.pdf",
    "conductCertificateCopy": "https://cdn.example.com/docs/conduct-789.pdf",
    "previousYearsMarksheetCopy": "https://cdn.example.com/docs/marks-789.pdf",
    "incomeCertificateCopy": "https://cdn.example.com/docs/income-789.pdf",
    "createdAt": "2025-12-18T10:30:00.000Z",
    "updatedAt": "2025-12-18T10:30:00.000Z",
    "course": {
      "courseId": "course-uuid-001",
      "name": "Primary"
    },
    "grade": {
      "gradeId": "grade-uuid-123",
      "name": "Grade 5"
    },
    "section": {
      "sectionId": "section-uuid-456",
      "name": "Section A"
    }
  },
  "message": "Student retrieved successfully."
}
```

### Response (Error - 404)

```json
{
  "status": "error",
  "data": null,
  "message": "Student not found."
}
```

---

## 4. UPDATE STUDENT

### Endpoint
```
PUT /api/students/:id
```

### Description
Updates student information. All fields are optional - only include fields you want to update.

### Request Headers
```
Content-Type: application/json
Authorization: Bearer <jwt_token>
```

### Path Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | uuid | Yes | The unique identifier of the student |

### Request Body (Payload)
Same as CREATE STUDENT - include only the fields you want to update.

```json
{
  "firstName": "Arjun",
  "middleName": "Kumar",
  "lastName": "Sharma",
  "gender": "Male",
  "bloodGroup": "O+",
  "permanentAddress": "123 Main Street Updated",
  "state": "Maharashtra",
  "pincode": "400001",
  "fatherName": "Raj Sharma",
  "motherName": "Priya Sharma"
}
```

### Response (Success - 200)

```json
{
  "status": "success",
  "data": null,
  "message": "Student updated successfully."
}
```

### Response (Error - 404)

```json
{
  "status": "error",
  "data": null,
  "message": "Student not found."
}
```

### Response (Error - 400)

```json
{
  "status": "error",
  "data": null,
  "message": "Failed to update student."
}
```

---

## 5. DELETE STUDENT

### Endpoint
```
DELETE /api/students/:id
```

### Description
Deletes a student record from the system. This is a soft delete operation that removes all related data.

### Request Headers
```
Authorization: Bearer <jwt_token>
```

### Path Parameters
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | uuid | Yes | The unique identifier of the student |

### Response (Success - 200)

```json
{
  "status": "success",
  "data": null,
  "message": "Student deleted successfully."
}
```

### Response (Error - 404)

```json
{
  "status": "error",
  "data": null,
  "message": "Student not found."
}
```

### Response (Error - 400)

```json
{
  "status": "error",
  "data": null,
  "message": "Failed to delete student."
}
```

---

## Response Structure

### Standard Response Format
```json
{
  "status": "success | error",
  "data": "object | array | null",
  "message": "string | null"
}
```

### Status Codes
| Code | Meaning |
|------|---------|
| 200 | Success - Request completed successfully |
| 400 | Error - Bad request or operation failed |
| 401 | Unauthorized - Missing or invalid JWT token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error |

---

## Student Data Model

### Student Record Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| id | uuid | Auto | Unique identifier |
| tenantId | uuid | Auto | Associated tenant (school) |
| firstName | string | Yes | Student's first name |
| middleName | string | No | Student's middle name |
| lastName | string | Yes | Student's last name |
| dateOfBirth | ISO Date | Yes | Birth date (YYYY-MM-DD) |
| gender | enum | No | Male, Female, or Other |
| aadhaarNumber | string | No | Aadhaar ID number |
| casteCategory | string | No | Caste category (e.g., General, OBC) |
| subCaste | string | No | Sub-caste |
| religion | string | No | Religion |
| motherTongue | string | No | Primary language |
| bloodGroup | string | No | Blood group (e.g., O+, A-) |
| nationality | string | No | Nationality |
| identificationMarks | string | No | Physical identification marks |
| classApplyingFor | string | No | Class/Grade applying to |
| mediumOfInstruction | string | No | Language medium (English, Hindi, etc.) |
| previousSchoolName | string | No | Former school name |
| previousClassAttended | string | No | Last class attended |
| transferCertificateNo | string | No | Transfer certificate number |
| dateOfIssueTC | ISO Date | No | TC issue date |
| modeOfTransport | string | No | Transportation mode |
| fatherName | string | No | Father's full name |
| fatherOccupation | string | No | Father's occupation |
| fatherPhone | string | No | Father's phone number |
| fatherAadhaar | string | No | Father's Aadhaar number |
| motherName | string | No | Mother's full name |
| motherOccupation | string | No | Mother's occupation |
| motherPhone | string | No | Mother's phone number |
| motherAadhaar | string | No | Mother's Aadhaar number |
| guardianName | string | No | Guardian's name (if different from parents) |
| guardianRelation | string | No | Guardian's relationship to student |
| guardianContact | string | No | Guardian's contact number |
| feePaymentMode | string | No | Payment method (e.g., Monthly, Quarterly) |
| bankAccountDetails | string | No | Bank account information |
| midDayMealEligibility | boolean | No | Eligibility for mid-day meals |
| permanentAddress | string | No | Permanent residential address |
| state | string | No | State |
| pincode | string | No | Postal code |
| gradeId | uuid | Yes | Current grade/class ID |
| sectionId | uuid | Yes | Current section/division ID |
| studentPassportPhoto | URL | No | Student's photo URL |
| motherPassportPhoto | URL | No | Mother's photo URL |
| fatherPassportPhoto | URL | No | Father's photo URL |
| guardianPassportPhoto | URL | No | Guardian's photo URL |
| studentAadharCopy | URL | No | Student's Aadhaar copy document |
| parentsAadharCopy | URL | No | Parent's Aadhaar copy document |
| casteCertificateCopy | URL | No | Caste certificate document |
| birthCertificateCopy | URL | No | Birth certificate document |
| tcCopy | URL | No | Transfer certificate document |
| conductCertificateCopy | URL | No | Conduct certificate document |
| previousYearsMarksheetCopy | URL | No | Previous year's marksheet |
| incomeCertificateCopy | URL | No | Income certificate document |
| createdAt | ISO Timestamp | Auto | Record creation time |
| updatedAt | ISO Timestamp | Auto | Last update time |

### Related Objects in Response

#### Course
```json
{
  "courseId": "uuid",
  "name": "string"
}
```
Note: The `name` field is mapped from the database `courseName` field.

#### Grade
```json
{
  "gradeId": "uuid",
  "name": "string"
}
```
Note: The `name` field is mapped from the database `gradeName` field.

#### Section
```json
{
  "sectionId": "uuid",
  "name": "string"
}
```
Note: The `name` field is mapped from the database `sectionName` field.
```

---

## Key Features

1. **Multi-Tenant Support**: Each student belongs to a specific tenant (school)
2. **Automatic Enrollment**: Students are automatically enrolled in the active academic year upon creation
3. **Complete Student Profile**: Comprehensive personal, academic, and family information
4. **Document Management**: Support for various document uploads (certificates, photos, etc.)
5. **Grade & Section Assignment**: Students are assigned to specific grades and sections
6. **Academic Tracking**: Students are tracked through enrollments for enrollment status changes

---

## Error Handling

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| No active academic year found | Tenant has no active academic year | Create and activate an academic year first |
| Student not found | Invalid student ID or not associated with tenant | Verify the student ID and tenant |
| Unauthorized | Missing or invalid JWT token | Include valid JWT token in Authorization header |
| Forbidden | Insufficient permissions | Ensure user has appropriate role/permissions |

---

## Usage Examples

### Example 1: Create a Complete Student Profile
```bash
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGc..." \
  -d '{
    "firstName": "Rajesh",
    "lastName": "Kumar",
    "dateOfBirth": "2013-03-20",
    "gender": "Male",
    "aadhaarNumber": "123456789012",
    "bloodGroup": "B+",
    "gradeId": "grade-123",
    "sectionId": "section-456",
    "fatherName": "Ravi Kumar",
    "fatherPhone": "9876543210",
    "motherName": "Rekha Kumar",
    "motherPhone": "9876543211",
    "permanentAddress": "789 Pine Street",
    "state": "Karnataka",
    "pincode": "560001",
    "mediumOfInstruction": "English",
    "feePaymentMode": "Monthly",
    "midDayMealEligibility": true
  }'
```

### Example 2: Update Student Contact Information
```bash
curl -X PUT http://localhost:3000/api/students/student-uuid-789 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGc..." \
  -d '{
    "permanentAddress": "New Address",
    "state": "Delhi",
    "pincode": "110001",
    "fatherPhone": "9999999999",
    "motherPhone": "9999999998"
  }'
```

### Example 3: Retrieve All Students for Report
```bash
curl -X GET http://localhost:3000/api/students \
  -H "Authorization: Bearer eyJhbGc..."
```

### Example 4: Get Specific Student Details
```bash
curl -X GET http://localhost:3000/api/students/student-uuid-789 \
  -H "Authorization: Bearer eyJhbGc..."
```

### Example 5: Delete a Student Record
```bash
curl -X DELETE http://localhost:3000/api/students/student-uuid-789 \
  -H "Authorization: Bearer eyJhbGc..."
```

---

## Integration with Other Modules

### Related Modules
- **Academic Years**: Students are enrolled in active academic years
- **Grades & Sections**: Students belong to specific grades and sections
- **Enrollments**: StudentEnrollment tracks enrollment history and status
- **Parents**: Students can be linked to parent records
- **Attendance**: Attendance is tracked per student enrollment
- **Exams & Marks**: Exam marks are recorded per student enrollment

---

## Notes

- **Tenant Isolation**: Students are completely isolated by tenant - no cross-tenant access
- **Academic Year Auto-Enrollment**: Upon creation, students are automatically enrolled in the active academic year
- **Soft Delete**: Deletion removes student records but maintains referential integrity
- **Date Format**: All dates must be in ISO 8601 format (YYYY-MM-DD)
- **Document URLs**: Document URLs should point to GCS (Google Cloud Storage) or your CDN
- **Required Fields**: At minimum, provide firstName, lastName, dateOfBirth, gradeId, and sectionId
