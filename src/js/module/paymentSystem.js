import { generateCustomEvent } from './customEvent';

export const PaymentSystemDefault = {
  name: '',
  range: [],
  cardLength: [14, 15, 16, 17, 18, 19],
  cvcLength: [3, 4],
};

export const paymentSystemList = [
  {
    name: 'amex',
    range: [
      {
        start: 340000,
        end: 349999,
      },
      {
        start: 370000,
        end: 379999,
      },
    ],
    cardLength: [15],
    cvcLength: [4],
  },

  {
    name: 'dinersclub',
    range: [
      {
        start: 300000,
        end: 305999,
      },
      {
        start: 309500,
        end: 309599,
      },
      {
        start: 360000,
        end: 369999,
      },
      {
        start: 380000,
        end: 399999,
      },
    ],
    cardLength: [14, 16],
    cvcLength: [3],
  },

  {
    name: 'discover',
    range: [
      {
        start: 601100,
        end: 601109,
      },
      {
        start: 601120,
        end: 601149,
      },
      {
        start: 601174,
        end: 601174,
      },
      {
        start: 601177,
        end: 601179,
      },
      {
        start: 601186,
        end: 601199,
      },
      {
        start: 644000,
        end: 659999,
      },
    ],
    cardLength: [16, 17, 18, 19],
    cvcLength: [3],
  },

  {
    name: 'jcb',
    range: [
      {
        start: 352800,
        end: 358999,
      },
    ],
    cardLength: [16],
    cvcLength: [3],
  },

  {
    name: 'maestro',
    range: [
      {
        start: 500000,
        end: 509999,
      },
      {
        start: 560000,
        end: 599999,
      },
      {
        start: 600000,
        end: 601099,
      },
      {
        start: 601200,
        end: 622125,
      },
      {
        start: 622999,
        end: 623999,
      },
      {
        start: 627000,
        end: 628199,
      },
      {
        start: 628900,
        end: 643999,
      },
      {
        start: 660000,
        end: 699999,
      },
    ],
    cardLength: [16, 17, 18, 19],
    cvcLength: [0, 3],
  },

  {
    name: 'mastercard',
    range: [
      {
        start: 510000,
        end: 559999,
      },
      {
        start: 222100,
        end: 272099,
      },
    ],
    cardLength: [16],
    cvcLength: [3],
  },

  {
    name: 'mir',
    range: [
      {
        start: 220000,
        end: 220499,
      },
    ],
    cardLength: [16, 17, 18, 19],
    cvcLength: [3],
  },

  {
    name: 'unionpay',
    range: [
      {
        start: 622126,
        end: 622998,
      },
      {
        start: 624000,
        end: 626999,
      },
      {
        start: 628200,
        end: 628899,
      },
    ],
    cardLength: [16, 17, 18, 19],
    cvcLength: [3],
  },

  {
    name: 'visa',
    range: [
      {
        start: 400000,
        end: 499999,
      },
    ],
    cardLength: [16, 17, 18, 19],
    cvcLength: [3],
  },
];

export function getPaymentSystemInfoByPan(pan) {
  let binStart;
  let binEnd;
  let paymentSystemInfo = PaymentSystemDefault;

  if (pan.length >= 6) {
    const strBin = pan.substr(0, 6);

    binStart = Number(strBin);
    binEnd = Number(strBin);
  } else {
    const strBinStart = `${pan}00000`.substr(0, 6);
    const strBinEnd = `${pan}99999`.substr(0, 6);

    binStart = Number(strBinStart);
    binEnd = Number(strBinEnd);
  }

  paymentSystemList.forEach((paymentSystem) => {
    const binRangeList = paymentSystem.range;

    if (binRangeList.some(range => range.start <= binStart && binEnd <= range.end)) {
      paymentSystemInfo = paymentSystem;
    }
  });

  generateCustomEvent('paymentSystemInfo', paymentSystemInfo);

  return paymentSystemInfo;
}
