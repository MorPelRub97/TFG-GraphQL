export const type = `
  
  type Course {
    _id: String
    name: String
    credits: Int
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
    credits: Int
    department: String
  }

  input CourseMutationInput {
    name: String
    credits: Int
    credits_INC: Int
    credits_DEC: Int
    department: String
  }

  input CourseSort {
    _id: Int
    name: Int
    credits: Int
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
    credits_lt: Int
    credits_lte: Int
    credits_gt: Int
    credits_gte: Int
    credits: Int
    credits_ne: Int
    credits_in: [Int]
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
    credits_lt: Int,
    credits_lte: Int,
    credits_gt: Int,
    credits_gte: Int,
    credits: Int,
    credits_ne: Int,
    credits_in: [Int],
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
  
