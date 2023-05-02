export default class Card {
  constructor({ data, userId, templateSelector }, { handleCardClick, handleDeleteClick, handleAddLikeClick, handleDeleteLikeClick }) {
    this._id = data._id;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._isUserCard = (this._ownerId === this._userId);
    this._name = data.name;
    this._link = data.link;
    this._likeCount = data.likes.length;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleAddLikeClick = handleAddLikeClick;
    this._handleDeleteLikeClick = handleDeleteLikeClick;
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
    if (!this._buttonLike.classList.contains('place__favorite-button_active')) {
      this._handleAddLikeClick(this._id).then(data => {
        this._likeCount = data.likes.length;
        this._cardLikeCounter.textContent = this._likeCount;
      });
    } else {
      this._handleDeleteLikeClick(this._id).then(data => {
        this._likeCount = data.likes.length;
        this._cardLikeCounter.textContent = this._likeCount;
      });
    }

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
    this._cardLikeCounter = this._element.querySelector('.place__favorite-counter');

    this._buttonLike.addEventListener('click', () => this._toggleCardLike());
    if (this._isUserCard) {
      this._buttonDelete.classList.add('place__delete-button_active');
      this._buttonDelete.addEventListener('click', () => {
        this._handleDeleteClick(this._id, this._deleteCard.bind(this));
      });
    }

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
    this._cardLikeCounter.textContent = this._likeCount;

    // Возвращаем заполненный элемент Card с установленными слушателями
    return this._element;
  }
}