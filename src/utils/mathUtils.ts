export const gcd = (a: number, b: number): number => {
  return b === 0 ? a : gcd(b, a % b);
};

export const simplifyFraction = (numerator: number, denominator: number) => {
  const divisor = gcd(Math.abs(numerator), Math.abs(denominator));
  return {
    numerator: numerator / divisor,
    denominator: denominator / divisor
  };
};

export const formatMixedNumber = (numerator: number, denominator: number): string => {
  if (numerator === 0) return "0";
  
  const { numerator: simpNum, denominator: simpDen } = simplifyFraction(numerator, denominator);
  const whole = Math.floor(Math.abs(simpNum) / simpDen);
  const remainder = Math.abs(simpNum) % simpDen;
  
  if (whole === 0) {
    return remainder === 0 ? "0" : `${simpNum}/${simpDen}`;
  }
  
  return remainder === 0 ? `${whole}` : `${whole} ${remainder}/${simpDen}`;
};