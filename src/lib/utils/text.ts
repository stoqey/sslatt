import isEmpty from 'lodash/isEmpty';
import validator from 'validator';
/**
 * CapitalizeFirstLetter
 * @param txt
 * @returns
 */
export function capitalizeFirstLetter(txt: string): string {
  return txt.charAt(0).toUpperCase() + txt.slice(1); // or if you want lowercase the rest txt.slice(1).toLowerCase();
}

export const JSONDATA = (
  data: any,
): Record<string, any> | string | undefined => {
  if (isEmpty(data) || !data) {
    return undefined;
  }

  try {
    if (typeof data !== 'object') {
      return JSON.parse(data);
    }
    return data;
  } catch (error) {
    console.error(error);
    return data;
  }
};

export const parseCountryCode = (code?: string): string => {
  if (isEmpty(code) || !code) return '';
  if (code === 'all') return '🌐';
  return code.toUpperCase();
};

export const escapeText = (text: any): string => {
  if (!Number.isNaN(+text)) return text;
  if (isEmpty(text) || !text) return '';
  return validator.escape(text);
};
