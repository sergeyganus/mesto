export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close-button');
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleByOverlayClose(evt) {
    if (evt.target.classList.contains('popup')) {
      this.close();
    }
  }

  open() {
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    this._popup.classList.add('popup_opened');
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
    this._popup.classList.remove('popup_opened');
  }

  _setEventListeners() {
    this._popup.addEventListener('click', (evt) => this._handleByOverlayClose(evt));
    this._closeButton.addEventListener('click', () => this.close());
  }
}