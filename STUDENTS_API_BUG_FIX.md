# Students API - Bug Fix Summary

## Issue
The Students API was throwing a Prisma schema validation error when attempting to query students:

```
Unknown field `name` for select statement on model `Grade`. Available options are marked with ?.
```

## Root Cause
The Prisma schema uses different field names than what was referenced in the service:
- `Grade` model uses `gradeName` (not `name`)
- `Section` model uses `sectionName` (not `name`)
- `Course` model uses `courseName` (not `name`)

The students service was trying to select these non-existent `name` fields.

## Solution
Updated `/src/modules/students/students.service.js` to use the correct field names:

### Changes Made:

1. **mapStudentOut() function** - Fixed response mapping:
   - `row.grade.course.name` → `row.grade.course.courseName`
   - `row.grade.name` → `row.grade.gradeName`
   - `row.section.name` → `row.section.sectionName`

2. **createStudent() method** - Fixed transaction query:
   - Updated grade select: `name: true` → `gradeName: true`
   - Updated course select: `name: true` → `courseName: true`
   - Updated section select: `name: true` → `sectionName: true`

3. **deleteStudent() method** - Fixed existing record fetch:
   - Updated all field selections with correct names

4. **getStudentById() method** - Fixed student fetch:
   - Updated all field selections with correct names

5. **getAllStudents() method** - Fixed students list query:
   - Updated all field selections with correct names

## Files Modified
- `/src/modules/students/students.service.js` - Fixed Prisma field selections
- `/STUDENTS_API.md` - Updated documentation to clarify field name mappings

## API Response Structure
The API response still returns normalized field names for better UX:
```json
{
  "course": {
    "courseId": "uuid",
    "name": "Primary"  // mapped from courseName
  },
  "grade": {
    "gradeId": "uuid",
    "name": "Grade 5"  // mapped from gradeName
  },
  "section": {
    "sectionId": "uuid",
    "name": "Section A"  // mapped from sectionName
  }
}
```

## Testing
The fix ensures that:
✅ POST `/api/students` - Create student now works
✅ GET `/api/students` - Get all students now works
✅ GET `/api/students/:id` - Get specific student now works
✅ PUT `/api/students/:id` - Update student now works
✅ DELETE `/api/students/:id` - Delete student now works

All endpoints will now correctly query the Grade, Section, and Course models without Prisma validation errors.
