export default class Card {
  constructor(data, templateSelector, openGalleryPopup) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openGalleryPopup = openGalleryPopup;
    this._cardSelector = '.place';
  }

  _getTemplate() {
    const cardTemplate = document.
      querySelector(this._templateSelector)
      .content
      .querySelector(this._cardSelector)
      .cloneNode(true);

    return cardTemplate;
  }

  _toggleCardLike() {
    this._element.querySelector('.place__favorite-button').classList.toggle('place__favorite-button_active');
  }

  _deleteCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._element.querySelector('.place__favorite-button').addEventListener('click', () => { this._toggleCardLike(); });
    this._element.querySelector('.place__delete-button').addEventListener('click', () => { this._deleteCard(); });
    this._element.querySelector('.place__image').addEventListener('click', (evt) => { this._openGalleryPopup(evt); });
  }

  generateCard() {
    // Получаем разметку элемента Card
    this._element = this._getTemplate();
    // Устанавливаем слушателей
    this._setEventListeners();

    // Получаем изображение элемента Card
    const placeImageElement = this._element.querySelector('.place__image');
    // Заполняем необходимые поля
    placeImageElement.src = this._link;
    placeImageElement.alt = `На фото ${this._name}`;
    placeImageElement.title = `На фото ${this._name}`;

    // Заполняем название элемента Card
    this._element.querySelector('.place__title').textContent = this._name;

    // Возвращаем заполненный элемент Card с установленными слушателями
    return this._element;
  }
}