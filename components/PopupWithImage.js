import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._title = this._popup.querySelector('.popup__title');
    super._setEventListeners();
  }

  _setData(placeImageElement) {
    const placeElement = placeImageElement.closest('.place');
    const placeTitleElement = placeElement.querySelector('.place__title');
    this._image.src = placeImageElement.src;
    this._image.alt = placeImageElement.alt;
    this._image.title = placeImageElement.title;
    this._title.textContent = placeTitleElement.textContent;
  }

  open(evt) {
    const placeImageElement = evt.target;
    this._setData(placeImageElement);
    super.open();
  }
}