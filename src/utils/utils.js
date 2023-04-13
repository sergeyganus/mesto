// Импорт необходимых элементов и компонентов
import { formUserNameElement, formUserDescriptionElement, applicationConfig } from './constants.js';
import {
  editUserPopup,
  addCardPopup,
  galleryPopup,
  currentCardList,
  userInfo,
  editUserFormValidator,
  addCardFormValidator
} from '../pages/index.js';

// Функция заполнения полей формы из профиля
const setUserFormData = () => {
  const userData = userInfo.getUserInfo();
  formUserNameElement.value = userData['userName'];
  formUserDescriptionElement.value = userData['userDescription'];
}

// Функция получения информации о карточке при клике на изображение
const getCardInfo = (cardImageElement) => {
  const cardElement = cardImageElement.closest(applicationConfig.cardSelector);
  const cardTitleElement = cardElement.querySelector(applicationConfig.cardTitleSelector);
  const cardItem = {
    title: cardTitleElement.textContent,
    src: cardImageElement.src,
    alt: cardImageElement.alt,
    imageTitle: cardImageElement.title
  };

  return cardItem;
}

// Обработчик сохранения информации о профиле
export const saveUserHandler = (formValues) => {
  userInfo.setUserInfo({
    userName: formValues['profile-name'],
    userDescription: formValues['profile-description']
  });
  editUserPopup.close();
}

// Функция добавления новой карточки
export const addCardHandler = (formValues) => {
  const cardItem = {
    name: formValues['place-name'],
    link: formValues['place-link']
  };
  currentCardList.renderItem(cardItem);
  addCardPopup.close();
}

// Обработчик открытия модального окна редактирования профиля
export const openEditUserPopupHandler = () => {
  setUserFormData();
  editUserFormValidator.resetValidation();
  editUserPopup.open();
}

// Обработчик открытия модального окна добавления новой карточки
export const openAddCardPopupHandler = () => {
  addCardFormValidator.resetValidation();
  addCardPopup.open();
}

// Обработчик открытия модального окна галереи изображений
export const openGalleryPopupHandler = (evt) => {
  const cardImageElement = evt.target;
  const cardItem = getCardInfo(cardImageElement);
  galleryPopup.open(cardItem);
}