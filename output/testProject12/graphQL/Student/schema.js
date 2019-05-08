export const type = `
  
  type Student {
    _id: String
    name: String
    age: Int
    email: String
    phone: Int
    credits: Float
    repetidor: Boolean
  }

  type StudentQueryResults {
    Students: [Student]
    Meta: QueryResultsMetadata
  }

  type StudentSingleQueryResult {
    Student: Student
  }

  type StudentMutationResult {
    Student: Student
    success: Boolean
    Meta: MutationResultInfo
  }

  type StudentMutationResultMulti {
    Students: [Student]
    success: Boolean
    Meta: MutationResultInfo
  }

  type StudentBulkMutationResult {
    success: Boolean
    Meta: MutationResultInfo
  }

  input StudentInput {
    _id: String
    name: String
    age: Int
    email: String
    phone: Int
    credits: Float
    repetidor: Boolean
  }

  input StudentMutationInput {
    name: String
    age: Int
    age_INC: Int
    age_DEC: Int
    email: String
    phone: Int
    phone_INC: Int
    phone_DEC: Int
    credits: Float
    credits_INC: Int
    credits_DEC: Int
    repetidor: Boolean
  }

  input StudentSort {
    _id: Int
    name: Int
    age: Int
    email: Int
    phone: Int
    credits: Int
    repetidor: Int
  }

  input StudentFilters {
    _id: String
    _id_ne: String
    _id_in: [String]
    name_contains: String
    name_startsWith: String
    name_endsWith: String
    name_regex: String
    name: String
    name_ne: String
    name_in: [String]
    age_lt: Int
    age_lte: Int
    age_gt: Int
    age_gte: Int
    age: Int
    age_ne: Int
    age_in: [Int]
    email_contains: String
    email_startsWith: String
    email_endsWith: String
    email_regex: String
    email: String
    email_ne: String
    email_in: [String]
    phone_lt: Int
    phone_lte: Int
    phone_gt: Int
    phone_gte: Int
    phone: Int
    phone_ne: Int
    phone_in: [Int]
    credits_lt: Float
    credits_lte: Float
    credits_gt: Float
    credits_gte: Float
    credits: Float
    credits_ne: Float
    credits_in: [Float]
    repetidor: Boolean
    repetidor_ne: Boolean
    repetidor_in: [Boolean]
    OR: [StudentFilters]
  }
  
`;
  
  
export const mutation = `

  createStudent (
    Student: StudentInput
  ): StudentMutationResult

  updateStudent (
    _id: String,
    Updates: StudentMutationInput
  ): StudentMutationResult

  updateStudents (
    _ids: [String],
    Updates: StudentMutationInput
  ): StudentMutationResultMulti

  updateStudentsBulk (
    Match: StudentFilters,
    Updates: StudentMutationInput
  ): StudentBulkMutationResult

  deleteStudent (
    _id: String
  ): DeletionResultInfo

`;


export const query = `

  allStudents (
    _id: String,
    _id_ne: String,
    _id_in: [String],
    name_contains: String,
    name_startsWith: String,
    name_endsWith: String,
    name_regex: String,
    name: String,
    name_ne: String,
    name_in: [String],
    age_lt: Int,
    age_lte: Int,
    age_gt: Int,
    age_gte: Int,
    age: Int,
    age_ne: Int,
    age_in: [Int],
    email_contains: String,
    email_startsWith: String,
    email_endsWith: String,
    email_regex: String,
    email: String,
    email_ne: String,
    email_in: [String],
    phone_lt: Int,
    phone_lte: Int,
    phone_gt: Int,
    phone_gte: Int,
    phone: Int,
    phone_ne: Int,
    phone_in: [Int],
    credits_lt: Float,
    credits_lte: Float,
    credits_gt: Float,
    credits_gte: Float,
    credits: Float,
    credits_ne: Float,
    credits_in: [Float],
    repetidor: Boolean,
    repetidor_ne: Boolean,
    repetidor_in: [Boolean],
    OR: [StudentFilters],
    SORT: StudentSort,
    SORTS: [StudentSort],
    LIMIT: Int,
    SKIP: Int,
    PAGE: Int,
    PAGE_SIZE: Int
  ): StudentQueryResults

  getStudent (
    _id: String
  ): StudentSingleQueryResult

`;
  
