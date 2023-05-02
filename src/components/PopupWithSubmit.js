import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.form');
    this._setEventListeners();
  }

  _setEventListeners() {
    super._setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._cardId).then(data => {
        this._deleteCardHandler();
        this.close();
      })
    });
  }

  open(cardId, deleteCardHandler) {
    this._cardId = cardId;
    this._deleteCardHandler = deleteCardHandler;
    super.open();
  }
}