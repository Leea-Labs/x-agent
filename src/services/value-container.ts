export class ValueContainer<T = string> {
  constructor(private value?: T) {}

  set(value: T) {
    this.value = value
  }

  get() {
    return this.value
  }
}
