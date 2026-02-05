# Teachers Module - Quick Reference

## Overview

Complete teacher management module with support for:
- Basic teacher profiles (name, email, phone, etc.)
- Multiple academic qualifications
- Employment history tracking
- Progressive onboarding workflow
- Document URL references (integrates with Uploads API)

## File Structure

```
src/modules/teachers/
├── teachers.service.js      # Business logic
├── teachers.controller.js    # HTTP handlers
└── teachers.routes.js        # Route definitions
```

## Routes Summary

### Teacher Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/teachers` | Create teacher |
| GET | `/api/teachers` | List all teachers |
| GET | `/api/teachers/:id` | Get teacher details |
| PUT | `/api/teachers/:id` | Update teacher |
| DELETE | `/api/teachers/:id` | Delete teacher |

### Qualifications
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/teachers/:teacherId/qualifications` | Add qualification |
| GET | `/api/teachers/:teacherId/qualifications` | List qualifications |
| GET | `/api/teachers/:teacherId/qualifications/:qualificationId` | Get qualification |
| PUT | `/api/teachers/:teacherId/qualifications/:qualificationId` | Update qualification |
| DELETE | `/api/teachers/:teacherId/qualifications/:qualificationId` | Delete qualification |

### Employment History
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/teachers/:teacherId/employment-history` | Add employment record |
| GET | `/api/teachers/:teacherId/employment-history` | List employment history |
| GET | `/api/teachers/:teacherId/employment-history/:employmentHistoryId` | Get employment record |
| PUT | `/api/teachers/:teacherId/employment-history/:employmentHistoryId` | Update employment record |
| DELETE | `/api/teachers/:teacherId/employment-history/:employmentHistoryId` | Delete employment record |

## Service Methods

### TeachersService

**Teacher CRUD:**
- `createTeacher(data, tenantId)` - Create with validation
- `getTeacherById(id, tenantId)` - Get with relations
- `getAllTeachers(tenantId)` - List all with relations
- `updateTeacher(id, data, tenantId)` - Partial update
- `deleteTeacher(id, tenantId)` - Delete with cascade

**Qualifications:**
- `addQualification(teacherId, data, tenantId)` - Add new
- `getQualificationById(id, tenantId)` - Get specific
- `getQualificationsByTeacher(teacherId, tenantId)` - List all for teacher
- `updateQualification(id, data, tenantId)` - Update
- `deleteQualification(id, tenantId)` - Delete

**Employment History:**
- `addEmploymentHistory(teacherId, data, tenantId)` - Add new
- `getEmploymentHistoryById(id, tenantId)` - Get specific
- `getEmploymentHistoryByTeacher(teacherId, tenantId)` - List all for teacher
- `updateEmploymentHistory(id, data, tenantId)` - Update
- `deleteEmploymentHistory(id, tenantId)` - Delete

## Key Features

### 1. Validation
- `fullName` required for teachers
- `employeeCode` unique per tenant
- `qualificationName` required for qualifications
- `organizationName` and `role` required for employment history

### 2. Tenant Safety
- All queries filtered by `tenantId`
- Cross-tenant access prevented
- Automatic tenant association from authenticated user

### 3. Relationships
- Teacher → Multiple Qualifications (1:N)
- Teacher → Multiple Employment Records (1:N)
- Teacher → Optional User (1:1)

### 4. Response Format
All endpoints return consistent format:
```json
{
  "status": "success|error",
  "data": { ...payload... },
  "message": "Human-readable message"
}
```

## Pagination & Filtering

**Current Implementation:**
- No pagination (all results returned)
- Results ordered by `createdAt DESC`

**Future Enhancement:**
- Add limit/offset parameters
- Add filtering by status, gender, employeeCode
- Add search by name/email

## Integration Points

### With User Module
- Teacher can optionally link to User via `userId`
- User must exist before linking
- Useful for teacher logins and authentication

### With Uploads Module
- `documentUrl` in qualifications references Upload.s3Url
- Supports categories: `teacher_degree_certificate`, `teacher_experience_letter`
- Documents stored in S3, URLs managed separately

### With Tenant Module
- All data scoped to tenant
- Automatic tenant filtering via middleware

## Database Schema

### Teachers Table
```prisma
model Teacher {
  id                    String  @id @default(uuid())
  tenantId              String
  userId                String? @unique
  fullName              String
  email                 String?
  phone                 String?
  gender                Gender?
  employeeCode          String?
  profilePhotoUrl       String?
  yearsOfExperience     Float?
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt
  
  tenant                Tenant @relation(...)
  user                  User? @relation(...)
  assignments           TeacherAssignment[]
  qualifications        TeacherQualification[]
  employmentHistory     TeacherEmploymentHistory[]
}
```

### TeacherQualification Table
```prisma
model TeacherQualification {
  id                String  @id @default(uuid())
  tenantId          String
  teacherId         String
  qualificationName String
  specialization    String?
  institution       String?
  score             Float?
  yearOfPassing     Int?
  documentUrl       String?
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  tenant            Tenant @relation(...)
  teacher           Teacher @relation(...)
}
```

### TeacherEmploymentHistory Table
```prisma
model TeacherEmploymentHistory {
  id                String  @id @default(uuid())
  tenantId          String
  teacherId         String
  organizationName  String
  role              String
  startDate         DateTime?
  endDate           DateTime?
  reasonForLeaving  String?
  experienceYears   Float?
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  
  tenant            Tenant @relation(...)
  teacher           Teacher @relation(...)
}
```

## Testing Workflow

### 1. Create Teacher
```bash
POST /api/teachers
Body: { "fullName": "John Doe" }
```

### 2. Get Teacher
```bash
GET /api/teachers/{id}
```

### 3. Add Qualification
```bash
POST /api/teachers/{id}/qualifications
Body: { "qualificationName": "M.Sc" }
```

### 4. Add Employment History
```bash
POST /api/teachers/{id}/employment-history
Body: { "organizationName": "School", "role": "Teacher" }
```

### 5. Update Teacher
```bash
PUT /api/teachers/{id}
Body: { "yearsOfExperience": 12 }
```

### 6. List All
```bash
GET /api/teachers
```

## Error Handling

| Error | Cause | Solution |
|-------|-------|----------|
| "fullName is required" | Missing required field | Add fullName |
| "Teacher not found" | Invalid teacher ID | Check ID and tenant |
| "employeeCode already exists" | Duplicate code | Use unique code |
| "Qualification not found" | Invalid qualification ID | Check ID and tenant |
| "organizationName and role are required" | Missing required fields | Add both fields |

## Future Enhancements

1. **Pagination:** Add limit/offset for large datasets
2. **Filtering:** Filter by status, gender, experience level
3. **Search:** Full-text search on name, email, employeeCode
4. **Bulk Operations:** Bulk import/export teachers
5. **Validations:** Email format, phone format validation
6. **Soft Deletes:** Archive teachers instead of permanent delete
7. **History Audit:** Track all changes with timestamps and user
8. **Status Tracking:** Active/Inactive/On-leave statuses
9. **Department Linking:** Associate teachers with departments
10. **Performance Metrics:** Add teaching hours, ratings, etc.

## Column Configuration

The module includes table column definitions for UI rendering:

```javascript
tableColumns.teachers = [
  { field: "fullName", headerName: "Full Name" },
  { field: "email", headerName: "Email" },
  { field: "phone", headerName: "Phone" },
  { field: "gender", headerName: "Gender" },
  { field: "employeeCode", headerName: "Employee Code" },
  { field: "profilePhotoUrl", headerName: "Profile Photo" },
  { field: "yearsOfExperience", headerName: "Years of Experience" },
  { field: "createdAt", headerName: "Created At" },
  { field: "updatedAt", headerName: "Updated At" }
]
```

## Authentication & Authorization

**Required:**
- Valid JWT token in Authorization header
- User must belong to tenant

**Implicit Permissions:**
- Users can only access their own tenant's data
- No role-based access control yet (can be added)

**Future:**
- Role-based routes (admin-only operations)
- Field-level permissions
- Audit logging
