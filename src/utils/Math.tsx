export const sum = (number: number[]) => number.reduce((a, b) => a + b, 0);
export const avg = (number: number[]) => sum(number) / number.length;
export const max = (number: number[]) => Math.max(...number);
export const min = (number: number[]) => Math.min(...number);