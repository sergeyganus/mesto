export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._initialArray.forEach(item => this._renderer(item, true));
  }

  renderItem(item) {
    this._renderer(item);
  }

  addItemToStart(itemElement) {
    this._container.prepend(itemElement);
  }

  addItemToEnd(itemElement) {
    this._container.append(itemElement);
  }
}