class Bus {
  constructor() {
    this.listeners = {};
  }

  on(event, callback) { // подписываемся на событие
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(callback);
  }

  off(event, callback) { // отписываемся от события
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event]
        .filter((listener) => listener !== callback);
    }
  }

  emit(event, data) { // публикуем (диспатчим, эмитим) событие
    const listener = this.listeners[event][0];
    listener(data);
  }

  emitLast(event, data) {
    const listener = this.listeners[event][this.listeners[event].length - 1];
    listener(data);
  }
}

export default new Bus();
