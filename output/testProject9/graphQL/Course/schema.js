export const type = `
  
  type Course {
    _id: String
    name: String
    credit: String
    department: String
  }

  type CourseQueryResults {
    Courses: [Course]
    Meta: QueryResultsMetadata
  }

  type CourseSingleQueryResult {
    Course: Course
  }

  type CourseMutationResult {
    Course: Course
    success: Boolean
    Meta: MutationResultInfo
  }

  type CourseMutationResultMulti {
    Courses: [Course]
    success: Boolean
    Meta: MutationResultInfo
  }

  type CourseBulkMutationResult {
    success: Boolean
    Meta: MutationResultInfo
  }

  input CourseInput {
    _id: String
    name: String
    credit: String
    department: String
  }

  input CourseMutationInput {
    name: String
    credit: String
    department: String
  }

  input CourseSort {
    _id: Int
    name: Int
    credit: Int
    department: Int
  }

  input CourseFilters {
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
    credit_contains: String
    credit_startsWith: String
    credit_endsWith: String
    credit_regex: String
    credit: String
    credit_ne: String
    credit_in: [String]
    department_contains: String
    department_startsWith: String
    department_endsWith: String
    department_regex: String
    department: String
    department_ne: String
    department_in: [String]
    OR: [CourseFilters]
  }
  
`;
  
  
export const mutation = `

  createCourse (
    Course: CourseInput
  ): CourseMutationResult

  updateCourse (
    _id: String,
    Updates: CourseMutationInput
  ): CourseMutationResult

  updateCourses (
    _ids: [String],
    Updates: CourseMutationInput
  ): CourseMutationResultMulti

  updateCoursesBulk (
    Match: CourseFilters,
    Updates: CourseMutationInput
  ): CourseBulkMutationResult

  deleteCourse (
    _id: String
  ): DeletionResultInfo

`;


export const query = `

  allCourses (
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
    credit_contains: String,
    credit_startsWith: String,
    credit_endsWith: String,
    credit_regex: String,
    credit: String,
    credit_ne: String,
    credit_in: [String],
    department_contains: String,
    department_startsWith: String,
    department_endsWith: String,
    department_regex: String,
    department: String,
    department_ne: String,
    department_in: [String],
    OR: [CourseFilters],
    SORT: CourseSort,
    SORTS: [CourseSort],
    LIMIT: Int,
    SKIP: Int,
    PAGE: Int,
    PAGE_SIZE: Int
  ): CourseQueryResults

  getCourse (
    _id: String
  ): CourseSingleQueryResult

`;
  
