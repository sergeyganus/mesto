export default class Card {
  constructor({ data, templateSelector }, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
    this._buttonLike.classList.toggle('place__favorite-button_active');
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._buttonLike = this._element.querySelector('.place__favorite-button');
    this._buttonDelete = this._element.querySelector('.place__delete-button');
    this._cardTitle = this._element.querySelector('.place__title');
    this._cardImage = this._element.querySelector('.place__image');

    this._buttonLike.addEventListener('click', () => this._toggleCardLike());
    this._buttonDelete.addEventListener('click', () => this._deleteCard());
    this._cardImage.addEventListener('click', (evt) => this._handleCardClick(evt));
  }

  generate() {
    // Получаем разметку элемента Card
    this._element = this._getTemplate();
    // Устанавливаем слушателей
    this._setEventListeners();

    // Заполняем необходимые поля
    this._cardImage.src = this._link;
    this._cardImage.alt = `На фото ${this._name}`;
    this._cardImage.title = `На фото ${this._name}`;

    // Заполняем название элемента Card
    this._cardTitle.textContent = this._name;

    // Возвращаем заполненный элемент Card с установленными слушателями
    return this._element;
  }
}