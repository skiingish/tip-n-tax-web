interface CalculationResult {
    originalValue: number;
    amountAdded: number;
    newValue: number;
  }
  
  export const calculationUtils = {
    addPercentage: (value: number, percentage: number): CalculationResult => {
      const amountAdded = value * percentage;
      const newValue = value + amountAdded;
      return {
        originalValue: value,
        amountAdded: amountAdded,
        newValue: newValue,
      };
    },
  
    calculateTax: (amount: number, taxRate: number): CalculationResult => {
      return calculationUtils.addPercentage(amount, taxRate);
    },
  
    calculateTip: (amount: number, tipPercentage: number): CalculationResult => {
      return calculationUtils.addPercentage(amount, tipPercentage / 100);
    },
  
    calculateTotal: (
      baseAmount: number,
      taxRate: number,
      tipPercentage: number,
      amountIncludesTax = false
    ): {
      baseAmount: number;
      taxAmount: number;
      tipAmount: number;
      totalAmount: number;
    } => {
      let taxableAmount: number;
      let taxAmount: number;

      if (amountIncludesTax) {
        // If the amount includes tax, we need to extract the base amount
        taxableAmount = baseAmount;
        const baseBeforeTax = baseAmount / (1 + taxRate);
        taxAmount = taxableAmount - baseBeforeTax;
      } else {
        // If the amount doesn't include tax, calculate tax on the base amount
        const taxResult = calculationUtils.calculateTax(baseAmount, taxRate);
        taxAmount = taxResult.amountAdded;
        taxableAmount = baseAmount + taxAmount;
      }

      // Calculate tip based on the taxable amount (which includes tax)
      const tipResult = calculationUtils.calculateTip(taxableAmount, tipPercentage);
      const tipAmount = tipResult.amountAdded;

      // Calculate total amount
      const totalAmount = taxableAmount + tipAmount;

      return {
        baseAmount: amountIncludesTax ? taxableAmount - taxAmount : baseAmount,
        taxAmount: taxAmount,
        tipAmount: tipAmount,
        totalAmount: totalAmount,
      };
    },
  };
