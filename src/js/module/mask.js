import * as vanillaTextMask from 'vanilla-text-mask';
import emailMask from 'text-mask-addons/dist/emailMask';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';

import { getPaymentSystemInfoByPan } from './paymentSystem';

export const maskPattern = {
  '#': /\d/,
  S: /[a-zA-Z ]/,
  X: /[a-zA-Z0-9]/,
  W: /[-a-zA-Zа-я-А-Я0-9 ]/,
  Z: /[-a-zA-Zа-я-А-Я0-9., ]/,
};

export function prepareMaskArray(array) {
  const result = [];
  const patterns = Object.keys(maskPattern);

  array.forEach((item) => {
    if (typeof item === 'string') {
      [...item].forEach((symbol) => {
        if (patterns.includes(symbol)) {
          result.push(maskPattern[`${symbol}`]);
        } else {
          result.push(symbol);
        }
      });
    } else {
      result.push(item);
    }
  });

  return result;
}

export const presetMask = {
  address: {
    mask(rawValue) {
      const maskLength = rawValue.replace(/[^-a-zA-Zа-я-А-Я0-9., ]/gi, '').length;
      let stringMask = '';

      if (maskLength) {
        stringMask = 'Z'.repeat(maskLength);
      }

      return prepareMaskArray([stringMask]);
    },
    pipe: null,
    guide: true,
    placeholderChar: '\u2000',
  },

  cardholder: {
    mask(rawValue) {
      const maskLength = rawValue.replace(/[^a-z ]/gi, '').length;
      let stringMask = '';

      if (maskLength) {
        stringMask = 'S'.repeat(maskLength);
      }

      return prepareMaskArray([stringMask]);
    },
    pipe(conformedValue) {
      return { value: conformedValue.toUpperCase() };
    },
    guide: true,
    placeholderChar: '\u2000',
  },

  cardnumber: {
    mask(rawValue) {
      const cardPan = rawValue.replace(/ /g, '').split('X')[0];
      const paymentSystemInfo = getPaymentSystemInfoByPan(cardPan);
      const inputCardLength = rawValue.replace(/[^0-9]/g, '').length;
      let maskNumLength = 19;
      let stringMask = '';

      if (paymentSystemInfo) {
        const cardLengthList = paymentSystemInfo.cardLength.filter(key => key >= inputCardLength);

        if (cardLengthList && cardLengthList.length) {
          maskNumLength = Math.min(...cardLengthList);
        }
      }

      switch (maskNumLength) {
        case 14:
          stringMask = '#### ##### #####';
          break;

        case 15:
          stringMask = '##### ##### #####';
          break;

        case 16:
          stringMask = '#### #### #### ####';
          break;

        case 17:
          stringMask = '#### #### #### #####';
          break;

        case 18:
          stringMask = '#### #### #### #### ##';
          break;

        default:
          stringMask = '#### #### #### #### ###';
      }

      return prepareMaskArray([stringMask]);
    },

    pipe: null,
    guide: true,
    placeholderChar: 'X',
  },

  city: {
    mask(rawValue) {
      const maskLength = rawValue.replace(/[^-a-zA-Zа-яА-Я0-9 ]/gi, '').length;
      let stringMask = '';

      if (maskLength) {
        stringMask = 'W'.repeat(maskLength);
      }

      return prepareMaskArray([stringMask]);
    },
    pipe: null,
    guide: true,
    placeholderChar: '\u2000',
  },

  country: {
    mask(rawValue) {
      const maskLength = rawValue.replace(/[^-a-zA-Zа-яА-Я0-9 ]/gi, '').length;
      let stringMask = '';

      if (maskLength) {
        stringMask = 'W'.repeat(maskLength);
      }

      return prepareMaskArray([stringMask]);
    },
    pipe: null,
    guide: true,
    placeholderChar: '\u2000',
  },

  cvv2: {
    mask() {
      let valueRangeList = [4];

      if (window.paymentSystemInfo.cvcLength) {
        valueRangeList = window.paymentSystemInfo.cvcLength;
      }

      const maskNumLength = valueRangeList[valueRangeList.length - 1];

      const stringMask = '#'.repeat(maskNumLength);

      return prepareMaskArray([stringMask]);
    },
    pipe: null,
    guide: true,
    placeholderChar: 'X',
  },

  email: {
    mask(rawValue, config) {
      return emailMask.mask(rawValue, config);
    },
    pipe: null,
    guide: true,
    placeholderChar: 'X',
  },

  expdate: {
    mask(conformedValue) {
      const year = parseInt(String(conformedValue.split('/')[1]).trim(), 10) || 0;

      if (year >= 2000) {
        return prepareMaskArray(['## / ####']);
      } else if (year > 20 && year <= 29) {
        return prepareMaskArray([`## / 20${year}`]);
      }

      return prepareMaskArray(['## / 20##']);
    },
    pipe(conformedValue) {
      const pipeFunction = createAutoCorrectedDatePipe('mm / yyyy');

      return pipeFunction(conformedValue);
    },
    guide: true,
    placeholderChar: 'X',
  },

  phone: {
    mask(rawValue) {
      let arrayMask = ['+7 (', /[1-9]/, '##) ###-##-##'];
      const startSymbolPosition = rawValue.search(/[+1-9]/);
      const startSymbol = rawValue[Number(startSymbolPosition)];

      if (startSymbol === '8') {
        arrayMask = ['8 (', /[1-9]/, '##) ###-##-##'];
      } else if (startSymbol === '+') {
        arrayMask = ['+', /[1-79]/, ' (', /[1-9]/, '##) ###-##-##'];
      }

      return prepareMaskArray(arrayMask);
    },
    pipe: null,
    guide: true,
    placeholderChar: 'X',
  },

  zip: {
    mask(rawValue) {
      const maskLength = rawValue.replace(/[^a-z0-9]/gi, '').length;
      let stringMask = '';

      if (maskLength < 6) {
        stringMask = 'X'.repeat(maskLength);
      } else {
        stringMask = 'X'.repeat(6);
      }

      return prepareMaskArray([stringMask]);
    },
    pipe(conformedValue) {
      return { value: conformedValue.toUpperCase() };
    },
    guide: true,
    placeholderChar: '\u2000',
  },
};

export function setMask(inputElement, maskName) {
  const presetMaskKeys = Object.keys(presetMask);

  if (presetMaskKeys.includes(maskName)) {
    const {
      mask, pipe, guide, placeholderChar,
    } = presetMask[`${maskName}`];

    vanillaTextMask.maskInput({
      inputElement,
      mask,
      pipe,
      guide,
      placeholderChar,
    });
  }
}
