export default class LimitedMap {
  constructor(limit, iterable = undefined) {
    this.map = new Map(iterable);
    this.limit = limit;
  }

  has(key) {
    return this.map.has(key);
  }

  get(key) {
    return this.map.get(key);
  }

  set(key, value) {
    if (!this.has(key) && this.map.size + 1 > this.limit) {
      this.map.clear();
    }

    return this.map.set(key, value);
  }
}
