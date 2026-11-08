
View.js
100%
export default class View {
  _data;
  _parentElement;

  constructor(parentElement) {
    this._parentElement = parentElement;
  }

  render(data) {
    if (!data) return;

    this._data = data;
    const markup = this._generateMarkup();

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
}
Displaying View.js.