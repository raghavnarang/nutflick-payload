export function calculateGST(finalAmount: number, gstRate: number) {
  if (gstRate < 0 || finalAmount < 0) {
    throw new Error('Invalid input: GST rate and final amount must be non-negative.')
  }

  const basePrice = finalAmount / (1 + gstRate / 100)
  const gstAmount = finalAmount - basePrice

  return {
    basePrice: basePrice,
    gstAmount: gstAmount,
  }
}
