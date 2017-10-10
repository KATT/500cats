export default class EventEmitter {
  private events: { [key: string]: Function[] };
  constructor() {
    this.events = {};
  }

  on(key: string, callback: Function) {
    if (!this.events.hasOwnProperty(key)) {
      this.events[key] = [];
    }
    this.events[key].push(callback);
  }

  off(key: string, callback: Function) {
    if (!this.events.hasOwnProperty(key)) {
      return;
    }

    const idx = this.events[key].indexOf(callback);

    if (idx > -1) {
      this.events[key].splice(idx, 1);
    }
  }

  emit(key: string, ...args) {
    if (!this.events.hasOwnProperty(key)) {
      return;
    }
    this.events[key].forEach(callback => callback(...args));
  }
}
