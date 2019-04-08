export const type = `
  
  type Student {
    _id: String
    nombre: String
    edad: String
    email: String
    telefono: String
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
    nombre: String
    edad: String
    email: String
    telefono: String
  }

  input StudentMutationInput {
    nombre: String
    edad: String
    email: String
    telefono: String
  }

  input StudentSort {
    _id: Int
    nombre: Int
    edad: Int
    email: Int
    telefono: Int
  }

  input StudentFilters {
    _id: String
    _id_ne: String
    _id_in: [String]
    nombre_contains: String
    nombre_startsWith: String
    nombre_endsWith: String
    nombre_regex: String
    nombre: String
    nombre_ne: String
    nombre_in: [String]
    edad_contains: String
    edad_startsWith: String
    edad_endsWith: String
    edad_regex: String
    edad: String
    edad_ne: String
    edad_in: [String]
    email_contains: String
    email_startsWith: String
    email_endsWith: String
    email_regex: String
    email: String
    email_ne: String
    email_in: [String]
    telefono_contains: String
    telefono_startsWith: String
    telefono_endsWith: String
    telefono_regex: String
    telefono: String
    telefono_ne: String
    telefono_in: [String]
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
    nombre_contains: String,
    nombre_startsWith: String,
    nombre_endsWith: String,
    nombre_regex: String,
    nombre: String,
    nombre_ne: String,
    nombre_in: [String],
    edad_contains: String,
    edad_startsWith: String,
    edad_endsWith: String,
    edad_regex: String,
    edad: String,
    edad_ne: String,
    edad_in: [String],
    email_contains: String,
    email_startsWith: String,
    email_endsWith: String,
    email_regex: String,
    email: String,
    email_ne: String,
    email_in: [String],
    telefono_contains: String,
    telefono_startsWith: String,
    telefono_endsWith: String,
    telefono_regex: String,
    telefono: String,
    telefono_ne: String,
    telefono_in: [String],
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
  
