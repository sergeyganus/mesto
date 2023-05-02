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
  applicationConfig,
  validationConfig,
  apiSettings
} from '../utils/constants.js';

import {
  openEditUserPopupHandler,
  openEditUserPhotoPopupHandler,
  openAddCardPopupHandler,
  openGalleryPopupHandler,
  openGetConfirmationPopup,
  saveUserHandler,
  saveUserPhotoHandler,
  addCardHandler,
  deleteCardByApiHandler,
  addCardLikeByApi,
  deleteCardLikeByApi
} from '../utils/utils.js';

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
  userInfo = new UserInfo(userData, {
    userNameSelector: applicationConfig.userNameSelector,
    userDescriptionSelector: applicationConfig.userDescriptionSelector,
    userProfilePhotoSelector: applicationConfig.userProfilePhotoSelector
  });

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