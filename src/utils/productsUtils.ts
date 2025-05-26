export function getSpecialPriceStr(
  originalPrice: number,
  discount: number
): string {
  return (
    "R$ " +
    (originalPrice * (1 - discount)).toFixed(2).toString().replace(",", ".")
  );
}
