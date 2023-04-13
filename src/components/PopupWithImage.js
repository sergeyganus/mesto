import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._title = this._popup.querySelector('.popup__title');
    super._setEventListeners();
  }

  _setData(cardItem) {
    this._title.textContent = cardItem.title;
    this._image.src = cardItem.src;
    this._image.alt = cardItem.alt;
    this._image.title = cardItem.imageTitle;
  }

  open(cardItem) {
    this._setData(cardItem);
    super.open();
  }
}