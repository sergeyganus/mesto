// Импорт необходимых элементов и компонентов
import {
  formUserNameElement,
  formUserDescriptionElement,
  formUserPhotoElement,
  saveUserButtonElement,
  saveUserPhotoButtonElement,
  addFormCardButtonElement,
  applicationConfig
} from './constants.js';

import {
  editUserPopup,
  editUserPhotoPopup,
  addCardPopup,
  galleryPopup,
  getConfirmationPopup,
  currentCardList,
  userInfo,
  api,
  editUserFormValidator,
  editUserPhotoFormValidator,
  addCardFormValidator
} from '../pages/index.js';

// Функция заполнения полей формы из профиля
const setUserFormData = () => {
  const userData = userInfo.getUserInfo();
  formUserNameElement.value = userData['userName'];
  formUserDescriptionElement.value = userData['userDescription'];
}

const setUserPhotoFormData = () => {
  const userData = userInfo.getUserInfo();
  formUserPhotoElement.value = userData['userPhoto']
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
  const userData = {
    userName: formValues['profile-name'],
    userDescription: formValues['profile-description']
  };

  userInfo.setUserInfo(userData);
  saveUserButtonElement.textContent = 'Сохранение...';
  userInfo.sendUserInfo(userData).finally(() => {
    editUserPopup.close();
    saveUserButtonElement.textContent = 'Сохранить';
  });
}

export const saveUserPhotoHandler = (formValues) => {
  const userPhoto = formValues['profile-photo'];
  userInfo.setUserPhoto(userPhoto);
  saveUserPhotoButtonElement.textContent = 'Сохранение...';
  userInfo.updateUserPhoto(userPhoto).finally(() => {
    editUserPhotoPopup.close();
    saveUserPhotoButtonElement.textContent = 'Сохранить';
  });
}

// Функция добавления новой карточки
export const addCardHandler = (formValues) => {
  const cardItem = {
    name: formValues['place-name'],
    link: formValues['place-link']
  };
  const addCardPromise = api.addCard(cardItem);
  addFormCardButtonElement.textContent = 'Создание...';
  addCardPromise
    .then(cardItem => {
      currentCardList.renderItem(cardItem);
    })
    .finally(() => {
      addCardPopup.close();
      addFormCardButtonElement.textContent = 'Создать';
    })
}

// Функция удаления карточки
export const deleteCardByApiHandler = (cardId) => {
 return api.deleteCard(cardId);
}

// Обработчик открытия модального окна редактирования профиля
export const openEditUserPopupHandler = () => {
  setUserFormData();
  editUserFormValidator.resetValidation();
  editUserPopup.open();
}

// Обработчик открытия модального окна редактирования фотографии профиля
export const openEditUserPhotoPopupHandler = () => {
  setUserPhotoFormData();
  editUserPhotoFormValidator.resetValidation();
  editUserPhotoPopup.open();
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

// Обработчик открытия модального окна подтверждения действия
export const openGetConfirmationPopup = (cardId, deleteCardHandler) => {
  getConfirmationPopup.open(cardId, deleteCardHandler);
}

// Обработчик добавления лайка карточке
export const addCardLikeByApi = (cardId) => {
  return api.addLike(cardId);
}

// Обработчик удаления лайка у карточки
export const deleteCardLikeByApi = (cardId) => {
  return api.deleteLike(cardId);
}