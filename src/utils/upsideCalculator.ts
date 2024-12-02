export function upsideCalculator(
  selectButton: number,
  valuationResultData: { valuationResult?: number } | null,
  selectPrice: number
): { upside: number; adjustedPrice: number } {
  console.log('selectButton', selectButton)
  console.log('valuationResultData', valuationResultData)
  console.log('selectPrice', selectPrice)

  if (valuationResultData && valuationResultData.valuationResult !== undefined && selectPrice) {
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

  return { upside: 0, adjustedPrice: 0 };
}