export function generateCustomEvent(eventName, eventParams) {
  let { event } = window;

  event = new CustomEvent(eventName, { detail: eventParams });
  window.dispatchEvent(event);
}

export function customEventFunction(event, params) {
  const eventParams = params || {
    bubbles: false,
    cancelable: false,
    detail: undefined,
  };

  const evt = document.createEvent('CustomEvent');
  evt.initCustomEvent(event, eventParams.bubbles, eventParams.cancelable, eventParams.detail);
  return evt;
}

try {
  const cEvent = new CustomEvent();
  cEvent("IE has CustomEvent, but doesn't support constructor");
} catch (e) {
  window.CustomEvent = customEventFunction;

  CustomEvent.prototype = Object.create(window.Event.prototype);
}
