class HashMap {
  constructor(loadFactor = 0.75, capacity = 16) {
    if (capacity < 1 || !Number.isInteger(capacity)) {
      throw new Error('Capacity must be a positive integer.');
    }

    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.buckets = Array.from({ length: this.capacity }, () => []);
    this.size = 0;
  }

  hash(key) {
    if (typeof key !== 'string') {
      throw new Error('HashMap only supports string keys.');
    }

    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i += 1) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    if ((this.size + 1) / this.capacity > this.loadFactor) {
      this.#grow();
    }

    const bucketIndex = this.hash(key);
    const bucket = this.buckets[bucketIndex];
    const existingIndex = bucket.findIndex((pair) => pair[0] === key);

    if (existingIndex !== -1) {
      bucket[existingIndex][1] = value;
      return;
    }

    bucket.push([key, value]);
    this.size += 1;
  }

  get(key) {
    const bucket = this.buckets[this.hash(key)];
    const pair = bucket.find(([entryKey]) => entryKey === key);
    return pair ? pair[1] : null;
  }

  has(key) {
    return this.get(key) !== null;
  }

  remove(key) {
    const bucket = this.buckets[this.hash(key)];
    const index = bucket.findIndex(([entryKey]) => entryKey === key);

    if (index === -1) {
      return false;
    }

    bucket.splice(index, 1);
    this.size -= 1;
    return true;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = Array.from({ length: this.capacity }, () => []);
    this.size = 0;
  }

  keys() {
    return this.entries().map(([key]) => key);
  }

  values() {
    return this.entries().map(([, value]) => value);
  }

  entries() {
    return this.buckets.flatMap((bucket) => bucket.map(([key, value]) => [key, value]));
  }

  #grow() {
    const oldEntries = this.entries();
    this.capacity *= 2;
    this.buckets = Array.from({ length: this.capacity }, () => []);
    this.size = 0;

    oldEntries.forEach(([key, value]) => this.set(key, value));
  }
}

module.exports = HashMap;
