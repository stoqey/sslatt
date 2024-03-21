/**
 * Nice Decimal number
 * @param num
 */
export const niceDec = (num: number = 0, showSign: boolean = true): string => {
  const getNumber = () => {
    if (typeof num !== 'number') {
      return ``;
    }
    return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };

  return `${showSign ? '$' : ''}${getNumber()}`;
};
