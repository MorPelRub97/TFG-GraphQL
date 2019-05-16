export const type = `
  
  type Direccion {
    _id: Int
    street: String
  }

  type DireccionQueryResults {
    Direccions: [Direccion]
    Meta: QueryResultsMetadata
  }

  type DireccionSingleQueryResult {
    Direccion: Direccion
  }

  type DireccionMutationResult {
    Direccion: Direccion
    success: Boolean
    Meta: MutationResultInfo
  }

  type DireccionMutationResultMulti {
    Direccions: [Direccion]
    success: Boolean
    Meta: MutationResultInfo
  }

  type DireccionBulkMutationResult {
    success: Boolean
    Meta: MutationResultInfo
  }

  input DireccionInput {
    _id: Int
    street: String
  }

  input DireccionMutationInput {
    street: String
  }

  input DireccionSort {
    _id: Int
    street: Int
  }

  input DireccionFilters {
    _id_lt: Int
    _id_lte: Int
    _id_gt: Int
    _id_gte: Int
    _id: Int
    _id_ne: Int
    _id_in: [Int]
    street_contains: String
    street_startsWith: String
    street_endsWith: String
    street_regex: String
    street: String
    street_ne: String
    street_in: [String]
    OR: [DireccionFilters]
  }
  
`;
  
  
export const mutation = `

  createDireccion (
    Direccion: DireccionInput
  ): DireccionMutationResult

  updateDireccion (
    _id: Int,
    Updates: DireccionMutationInput
  ): DireccionMutationResult

  updateDireccions (
    _ids: [String],
    Updates: DireccionMutationInput
  ): DireccionMutationResultMulti

  updateDireccionsBulk (
    Match: DireccionFilters,
    Updates: DireccionMutationInput
  ): DireccionBulkMutationResult

  deleteDireccion (
    _id: String
  ): DeletionResultInfo

`;


export const query = `

  allDireccions (
    _id_lt: Int,
    _id_lte: Int,
    _id_gt: Int,
    _id_gte: Int,
    _id: Int,
    _id_ne: Int,
    _id_in: [Int],
    street_contains: String,
    street_startsWith: String,
    street_endsWith: String,
    street_regex: String,
    street: String,
    street_ne: String,
    street_in: [String],
    OR: [DireccionFilters],
    SORT: DireccionSort,
    SORTS: [DireccionSort],
    LIMIT: Int,
    SKIP: Int,
    PAGE: Int,
    PAGE_SIZE: Int
  ): DireccionQueryResults

  getDireccion (
    _id: String
  ): DireccionSingleQueryResult

`;
  
