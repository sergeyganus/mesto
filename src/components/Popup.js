export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close-button');
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      this.close(openedPopup);
    }
  }

  _handleByOverlayClose(evt) {
    if (evt.target.classList.contains('popup')) {
      this.close();
    }
  }

  open() {
    document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
    this._popup.classList.add('popup_opened');
  }

  close() {
    document.removeEventListener('keydown', (evt) => this._handleEscClose(evt));
    this._popup.classList.remove('popup_opened');
  }

  _setEventListeners() {
    this._popup.addEventListener('click', (evt) => this._handleByOverlayClose(evt));
    this._closeButton.addEventListener('click', () => this.close());
  }
}