export function upsideCalculator(
    selectButton: number,
    valuationResultData: { valuationResult?: number } | null, // Cho phép null
    selectPrice: number
  ): { upside: number; adjustedPrice: number } {
    if (
      selectButton &&
      valuationResultData &&
      valuationResultData.valuationResult !== undefined &&
      selectPrice
    ) {
      const adjustedPrice =
        selectButton > 4
          ? selectPrice * (1 + valuationResultData.valuationResult / 100)
          : selectPrice;
  
      const upside =
        selectButton > 4
          ? valuationResultData.valuationResult
          : ((valuationResultData.valuationResult - selectPrice) / selectPrice) * 100;
  
      return { upside, adjustedPrice };
    }
  
    return { upside: 0, adjustedPrice: 0 }; // Trả về giá trị mặc định
  }
  