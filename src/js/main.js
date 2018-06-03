import 'babel-polyfill';

import { setMask } from './module/mask';
import { isValid } from './module/validation';

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (let i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

const formSelector = '.js-form';
const fieldSelector = '.js-field';

window.paymentSystemInfo = {};

const forms = document.querySelectorAll(formSelector);

forms.forEach((form) => {
  const elements = form.querySelectorAll(fieldSelector);

  elements.forEach((field) => {
    let input;

    if (field.tagName.toLowerCase() === 'input') {
      input = field;
    } else {
      input = field.querySelector('input');
    }

    if (input) {
      const dataType = input.getAttribute('data-type');

      setMask(input, dataType);

      input.addEventListener('focus', () => {
        field.classList.remove('error');
        field.classList.remove('valid');
        field.classList.add('focus');
      });

      input.addEventListener('blur', () => {
        field.classList.remove('focus');

        if (isValid(input.value, dataType, true)) {
          field.classList.add('valid');
        } else {
          field.classList.add('error');
        }
      });
    }
  });

  form.addEventListener('submit', (event) => {
    let error = 0;

    elements.forEach((field) => {
      let input;

      if (field.tagName.toLowerCase() === 'input') {
        input = field;
      } else {
        input = field.querySelector('input');
      }

      if (input) {
        const dataType = input.getAttribute('data-type');

        if (isValid(input.value, dataType, true)) {
          field.classList.add('valid');
        } else {
          field.classList.add('error');
          error += 1;
        }
      }
    });

    if (error) {
      event.preventDefault();
      event.stopPropagation();
    }
  });
});

window.addEventListener('paymentSystemInfo', (event) => {
  const paymentSystemInfo = event.detail;

  const { name } = paymentSystemInfo;

  console.log(name);

  if (window.paymentSystemInfo.name !== name) {
    window.paymentSystemInfo = paymentSystemInfo;
  }
});
