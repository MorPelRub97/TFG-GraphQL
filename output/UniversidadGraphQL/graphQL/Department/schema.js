export const type = `
  
  type Department {
    _id: String
    name: String
    building: Int
  }

  type DepartmentQueryResults {
    Departments: [Department]
    Meta: QueryResultsMetadata
  }

  type DepartmentSingleQueryResult {
    Department: Department
  }

  type DepartmentMutationResult {
    Department: Department
    success: Boolean
    Meta: MutationResultInfo
  }

  type DepartmentMutationResultMulti {
    Departments: [Department]
    success: Boolean
    Meta: MutationResultInfo
  }

  type DepartmentBulkMutationResult {
    success: Boolean
    Meta: MutationResultInfo
  }

  input DepartmentInput {
    _id: String
    name: String
    building: Int
  }

  input DepartmentMutationInput {
    name: String
    building: Int
    building_INC: Int
    building_DEC: Int
  }

  input DepartmentSort {
    _id: Int
    name: Int
    building: Int
  }

  input DepartmentFilters {
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
    building_lt: Int
    building_lte: Int
    building_gt: Int
    building_gte: Int
    building: Int
    building_ne: Int
    building_in: [Int]
    OR: [DepartmentFilters]
  }
  
`;
  
  
export const mutation = `

  createDepartment (
    Department: DepartmentInput
  ): DepartmentMutationResult

  updateDepartment (
    _id: String,
    Updates: DepartmentMutationInput
  ): DepartmentMutationResult

  updateDepartments (
    _ids: [String],
    Updates: DepartmentMutationInput
  ): DepartmentMutationResultMulti

  updateDepartmentsBulk (
    Match: DepartmentFilters,
    Updates: DepartmentMutationInput
  ): DepartmentBulkMutationResult

  deleteDepartment (
    _id: String
  ): DeletionResultInfo

`;


export const query = `

  allDepartments (
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
    building_lt: Int,
    building_lte: Int,
    building_gt: Int,
    building_gte: Int,
    building: Int,
    building_ne: Int,
    building_in: [Int],
    OR: [DepartmentFilters],
    SORT: DepartmentSort,
    SORTS: [DepartmentSort],
    LIMIT: Int,
    SKIP: Int,
    PAGE: Int,
    PAGE_SIZE: Int
  ): DepartmentQueryResults

  getDepartment (
    _id: String
  ): DepartmentSingleQueryResult

`;
  
