import { DiscountData } from '../types';

/**
 * Generates a discount code with the format: SMIDENT-XXXXPC
 * XXXX: Random 4 digits
 * P: Percent indicator (1=5%, 2=10%, 3=15%)
 * C: Checksum digit ((Sum of XXXX + P) % 10)
 */
export const generateDiscountCode = (): DiscountData => {
  // 1. Determine discount percentage (Weighted random or pure random)
  const rand = Math.random();
  let percent = 5;
  let percentIndicator = 1;

  if (rand > 0.66) {
    percent = 15;
    percentIndicator = 3;
  } else if (rand > 0.33) {
    percent = 10;
    percentIndicator = 2;
  }

  // 2. Generate random 4 digits
  const randomPart = Math.floor(1000 + Math.random() * 9000); // 1000 to 9999
  
  // 3. Calculate Checksum
  const digits = randomPart.toString().split('').map(Number);
  const sum = digits.reduce((a, b) => a + b, 0) + percentIndicator;
  const checksum = sum % 10;

  const code = `SMIDENT-${randomPart}${percentIndicator}${checksum}`;

  return {
    code,
    percent
  };
};

export const verifyDiscountCode = (code: string): boolean => {
  if (!code.startsWith('SMIDENT-')) return false;
  
  const numericPart = code.split('-')[1];
  if (numericPart.length !== 6) return false;

  const randomPartStr = numericPart.substring(0, 4);
  const percentIndStr = numericPart.substring(4, 5);
  const checksumStr = numericPart.substring(5, 6);

  const randomPart = parseInt(randomPartStr);
  const percentInd = parseInt(percentIndStr);
  const checksum = parseInt(checksumStr);

  const digits = randomPartStr.split('').map(Number);
  const sum = digits.reduce((a, b) => a + b, 0) + percentInd;
  
  return (sum % 10) === checksum;
};