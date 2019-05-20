export const type = `
  
  type Complexity {
    height: Int
    weight: Int
  }

  input ComplexityInput {
    height: Int
    weight: Int
  }

  input ComplexityMutationInput {
    height: Int
    height_INC: Int
    height_DEC: Int
    weight: Int
    weight_INC: Int
    weight_DEC: Int
  }

  input ComplexitySort {
    height: Int
    weight: Int
  }

  input ComplexityFilters {
    height_lt: Int
    height_lte: Int
    height_gt: Int
    height_gte: Int
    height: Int
    height_ne: Int
    height_in: [Int]
    weight_lt: Int
    weight_lte: Int
    weight_gt: Int
    weight_gte: Int
    weight: Int
    weight_ne: Int
    weight_in: [Int]
    OR: [ComplexityFilters]
  }
  
`;
  
  
  
