export const tableColumns = {
  tenants: [
    { field: "school_name", headerName: "School Name" },
    { field: "contact_address.street", headerName: "Street Address" },
    { field: "contact_address.city", headerName: "City" },
    { field: "contact_address.state", headerName: "State" },
    { field: "contact_address.zip", headerName: "Zip Code" },
    { field: "contact_phone", headerName: "Contact Phone" },
    { field: "contact_email", headerName: "Contact Email" },
    { field: "admin_full_name", headerName: "Admin Full Name" },
    { field: "admin_phone", headerName: "Admin Phone" },
    { field: "admin_email", headerName: "Admin Email" },
    { field: "subscription_plan", headerName: "Subscription Plan" },
    { field: "domain", headerName: "Domain" },
    { field: "logo", headerName: "Logo", type: "profilePic" },
    { field: "caption", headerName: "Caption" },
    { field: "created_at", headerName: "Created At" },
    { field: "updated_at", headerName: "Updated At" },
  ],
  students: [
    { field: "first_name", headerName: "First Name" },
    { field: "middle_name", headerName: "Middle Name" },
    { field: "last_name", headerName: "Last Name" },
    { field: "date_of_birth", headerName: "Date of Birth" },
    { field: "gender", headerName: "Gender" },
    { field: "aadhaar_number", headerName: "Aadhaar Number" },
    { field: "caste_category", headerName: "Caste Category" },
    { field: "sub_caste", headerName: "Sub Caste" },
    { field: "religion", headerName: "Religion" },
    { field: "mother_tongue", headerName: "Mother Tongue" },
    { field: "blood_group", headerName: "Blood Group" },
    { field: "nationality", headerName: "Nationality" },
    { field: "identification_marks", headerName: "Identification Marks" },

    // Admission Details
    { field: "class_applying_for", headerName: "Class Applying For" },
    { field: "medium_of_instruction", headerName: "Medium of Instruction" },
    { field: "previous_school_name", headerName: "Previous School Name" },
    { field: "previous_class_attended", headerName: "Previous Class Attended" },
    {
      field: "transfer_certificate_number",
      headerName: "Transfer Certificate Number",
    },
    { field: "date_of_issue_tc", headerName: "Date of Issue of TC" },
    { field: "mode_of_transport", headerName: "Mode of Transport" },

    // Parent/Guardian Details
    { field: "father_name", headerName: "Father's Name" },
    { field: "father_occupation", headerName: "Father's Occupation" },
    { field: "father_phone", headerName: "Father's Phone Number" },
    { field: "father_aadhaar", headerName: "Father's Aadhaar Number" },
    { field: "mother_name", headerName: "Mother's Name" },
    { field: "mother_occupation", headerName: "Mother's Occupation" },
    { field: "mother_phone", headerName: "Mother's Phone Number" },
    { field: "mother_aadhaar", headerName: "Mother's Aadhaar Number" },
    { field: "guardian_name", headerName: "Guardian's Name" },
    {
      field: "guardian_relation",
      headerName: "Guardian's Relation to Student",
    },
    { field: "guardian_contact", headerName: "Guardian's Contact Number" },

    // Address Details
    { field: "permanent_address", headerName: "Permanent Address" },
    { field: "village_town", headerName: "Village/Town" },
    { field: "mandal", headerName: "Mandal" },
    { field: "district", headerName: "District" },
    { field: "state", headerName: "State" },
    { field: "pincode", headerName: "Pincode" },
    { field: "communication_address", headerName: "Communication Address" },

    // Health & Medical Information
    { field: "known_allergies", headerName: "Known Allergies" },
    { field: "medical_conditions", headerName: "Medical Conditions" },
    { field: "disability_status", headerName: "Disability Status" },
    { field: "immunization_details", headerName: "Immunization Details" },

    // Documents
    { field: "photo_url", headerName: "Photo" },
    { field: "birth_certificate_url", headerName: "Birth Certificate" },
    { field: "aadhaar_card_url", headerName: "Aadhaar Card" },
    { field: "caste_certificate_url", headerName: "Caste Certificate" },
    { field: "income_certificate_url", headerName: "Income Certificate" },
    { field: "domicile_certificate_url", headerName: "Domicile Certificate" },
    { field: "previous_marksheet_url", headerName: "Previous Marksheet" },
    { field: "transfer_certificate_url", headerName: "Transfer Certificate" },
    { field: "ration_card_url", headerName: "Ration Card" },

    // Fee & Scholarship Details
    { field: "fee_payment_mode", headerName: "Fee Payment Mode" },
    { field: "bank_account_details", headerName: "Bank Account Details" },
    {
      field: "mid_day_meal_eligibility",
      headerName: "Mid-Day Meal Eligibility",
    },

    // Tenant ID
    { field: "tenant_id", headerName: "Tenant ID" },

    // Metadata
    { field: "created_at", headerName: "Created At" },
    { field: "updated_at", headerName: "Updated At" },
  ],
  grades: [
    { field: "course_name", headerName: "Course Name" },
    { field: "grade_name", headerName: "Grade Name" },
    { field: "created_at", headerName: "Created At" },
    { field: "updated_at", headerName: "Updated At" },
  ],
  course: [
    { field: "course_name", headerName: "Course Name" },
    { field: "course_description", headerName: "Course Description" },
    { field: "created_at", headerName: "Created At" },
    { field: "updated_at", headerName: "Updated At" },
  ],
  section: [
    { field: "section_id", headerName: "Section ID" },
    { field: "tenant_id", headerName: "Tenant ID" },
    { field: "grade_id", headerName: "Grade ID" },
    { field: "grade_name", headerName: "Grade Name" },
    { field: "section_name", headerName: "Section Name" },
    { field: "created_at", headerName: "Created At" },
    { field: "updated_at", headerName: "Updated At" },
  ],
};
