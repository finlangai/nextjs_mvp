export const getModelNameValuation = (selectButton: number): string => {
    if (!selectButton) {
        return '';
    }
    const models = [
      'discounted-cash-flow',
      'dividend-discount-model',
      'graham-intrinsic-value-formula',
      'price-to-earnings-relative-valuation',
      'price-to-book-relative-valuation',
      'price-earnings-to-growth-ratio',
      'capital-asset-pricing-model',
    ];
    return models[selectButton] || ''; 
};
  