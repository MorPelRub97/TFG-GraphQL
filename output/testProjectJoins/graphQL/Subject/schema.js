export const type = `
  
  type Subject {
    _id: String
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
  }

  input SubjectMutationInput {
    
  }

  input SubjectSort {
    _id: Int
  }

  input SubjectFilters {
    _id: String
    _id_ne: String
    _id_in: [String]
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
  
