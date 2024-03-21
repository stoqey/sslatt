export const isLatitude = (num: number) =>
  Number.isFinite(num) && Math.abs(num) <= 90;
export const isLongitude = (num: number) =>
  Number.isFinite(num) && Math.abs(num) <= 180;
