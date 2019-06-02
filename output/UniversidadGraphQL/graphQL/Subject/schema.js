export const type = `
  
  type Subject {
    _id: String
    name: String
    credits: Int
    type: String
    department: Department
    teacher: Teacher
  }

  type SubjectQueryResults {
    Subjects: [Subject]
    Meta: QueryResultsMetadata
  }

  type SubjectSingleQueryResult {
    Subject: Subject
  }

  type SubjectMutationResult {
    Subject: Subject
    success: Boolean
    Meta: MutationResultInfo
  }

  type SubjectMutationResultMulti {
    Subjects: [Subject]
    success: Boolean
    Meta: MutationResultInfo
  }

  type SubjectBulkMutationResult {
    success: Boolean
    Meta: MutationResultInfo
  }

  input SubjectInput {
    _id: String
    name: String
    credits: Int
    type: String
    department: DepartmentInput
    teacher: TeacherInput
  }

  input SubjectMutationInput {
    name: String
    credits: Int
    credits_INC: Int
    credits_DEC: Int
    type: String
    department: DepartmentInput
    department_UPDATE: DepartmentMutationInput
    teacher: TeacherInput
    teacher_UPDATE: TeacherMutationInput
  }

  input SubjectSort {
    _id: Int
    name: Int
    credits: Int
    type: Int
    department: Int
    teacher: Int
  }

  input SubjectFilters {
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
    credits_lt: Int
    credits_lte: Int
    credits_gt: Int
    credits_gte: Int
    credits: Int
    credits_ne: Int
    credits_in: [Int]
    type_contains: String
    type_startsWith: String
    type_endsWith: String
    type_regex: String
    type: String
    type_ne: String
    type_in: [String]
    department: DepartmentFilters
    teacher: TeacherFilters
    OR: [SubjectFilters]
  }
  
`;
  
  
export const mutation = `

  createSubject (
    Subject: SubjectInput
  ): SubjectMutationResult

  updateSubject (
    _id: String,
    Updates: SubjectMutationInput
  ): SubjectMutationResult

  updateSubjects (
    _ids: [String],
    Updates: SubjectMutationInput
  ): SubjectMutationResultMulti

  updateSubjectsBulk (
    Match: SubjectFilters,
    Updates: SubjectMutationInput
  ): SubjectBulkMutationResult

  deleteSubject (
    _id: String
  ): DeletionResultInfo

`;


export const query = `

  allSubjects (
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
    credits_lt: Int,
    credits_lte: Int,
    credits_gt: Int,
    credits_gte: Int,
    credits: Int,
    credits_ne: Int,
    credits_in: [Int],
    type_contains: String,
    type_startsWith: String,
    type_endsWith: String,
    type_regex: String,
    type: String,
    type_ne: String,
    type_in: [String],
    department: DepartmentFilters,
    teacher: TeacherFilters,
    OR: [SubjectFilters],
    SORT: SubjectSort,
    SORTS: [SubjectSort],
    LIMIT: Int,
    SKIP: Int,
    PAGE: Int,
    PAGE_SIZE: Int
  ): SubjectQueryResults

  getSubject (
    _id: String
  ): SubjectSingleQueryResult

`;
  
