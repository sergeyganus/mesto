// Импорт главного файла стилей
import './index.css';

// Импорт необходимых компонентов, элементов и функций
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';

import {
  editUserButtonElement,
  editUserPhotoButtonElement,
  editUserFormElement,
  editUserPhotoFormElement,
  addCardButtonElement,
  addCardFormElement,
  formUserNameElement,
  formUserDescriptionElement,
  formUserPhotoElement,
  saveUserButtonElement,
  saveUserPhotoButtonElement,
  addFormCardButtonElement,
  applicationConfig,
  validationConfig,
  apiSettings
} from '../utils/constants.js';

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
  userInfo.sendUserInfo(userData)
    .then(res => {
      editUserPopup.close();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      saveUserButtonElement.textContent = 'Сохранить';
    });
}

export const saveUserPhotoHandler = (formValues) => {
  const userPhoto = formValues['profile-photo'];
  userInfo.setUserPhoto(userPhoto);
  saveUserPhotoButtonElement.textContent = 'Сохранение...';
  userInfo.updateUserPhoto(userPhoto)
    .then(res => {
      editUserPhotoPopup.close();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
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
      addCardPopup.close();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
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

// Создание экземпляров необходимых классов
export const editUserPopup = new PopupWithForm(applicationConfig.editUserPopupSelector, saveUserHandler);
export const editUserPhotoPopup = new PopupWithForm(applicationConfig.editUserPhotoPopupSelector, saveUserPhotoHandler);
export const addCardPopup = new PopupWithForm(applicationConfig.addCardPopupSelector, addCardHandler);
export const galleryPopup = new PopupWithImage(applicationConfig.galleryPopupSelector);
export const getConfirmationPopup = new PopupWithSubmit(applicationConfig.getConfirmationPopupSelector, deleteCardByApiHandler);
export const editUserFormValidator = new FormValidator(validationConfig, editUserFormElement);
export const editUserPhotoFormValidator = new FormValidator(validationConfig, editUserPhotoFormElement);
export const addCardFormValidator = new FormValidator(validationConfig, addCardFormElement);
export const api = new Api({
  baseUrl: apiSettings.baseUrl,
  cohortId: apiSettings.cohortId,
  headers: apiSettings.headers
});

export let userInfo;
export let currentCardList;

const getUserInfoPromise = api.getUserInfo();

getUserInfoPromise.then(userData => {
  userInfo = new UserInfo(
    userData,
    {
      userNameSelector: applicationConfig.userNameSelector,
      userDescriptionSelector: applicationConfig.userDescriptionSelector,
      userProfilePhotoSelector: applicationConfig.userProfilePhotoSelector
    },
    {
      handleUserInfo: api.setUserInfo.bind(api),
      handleUserPhoto: api.updateUserPhoto.bind(api)
    }
  );

  userInfo.setUserInfo(userData);

  const getCardsPromise = api.getCards();
  getCardsPromise.then(currentCards => {
    // Экземпляр для работы со списком карточек
    currentCardList = new Section({
      items: currentCards,
      renderer: (cardItem, addToEnd = false) => {
        const card = new Card({
            data: cardItem,
            userId: userInfo.getUserId(),
            templateSelector: applicationConfig.cardTemplateSelector
          },
          {
            handleCardClick: openGalleryPopupHandler,
            handleDeleteClick: openGetConfirmationPopup,
            handleAddLikeClick: addCardLikeByApi,
            handleDeleteLikeClick: deleteCardLikeByApi
          });

        const cardElement = card.generate();
        if (addToEnd) {
          currentCardList.addItemToEnd(cardElement);
        } else {
          currentCardList.addItemToStart(cardElement);
        }
      }
    },
      applicationConfig.cardListSelector
    );

    // Рендер начального списка карточек
    currentCardList.renderItems();
  });
});

// Обработчик события редактирования профиля
editUserButtonElement.addEventListener('click', openEditUserPopupHandler);

// Обработчик события обновления фотографии профиля
editUserPhotoButtonElement.addEventListener('click', openEditUserPhotoPopupHandler)

// Обработчик события добавления новой карточки
addCardButtonElement.addEventListener('click', openAddCardPopupHandler);

// Добавление валидации формам
editUserFormValidator.enableValidation();
editUserPhotoFormValidator.enableValidation();
addCardFormValidator.enableValidation();