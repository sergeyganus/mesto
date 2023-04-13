// Импорт главного файла стилей
import './index.css';

// Импорт необходимых компонентов, элементов и функций
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import {
  editUserButtonElement,
  editUserFormElement,
  addCardButtonElement,
  addCardFormElement,
  initialCards,
  applicationConfig,
  validationConfig,
} from '../utils/constants.js';
import { openEditUserPopupHandler, openAddCardPopupHandler, openGalleryPopupHandler, saveUserHandler, addCardHandler } from '../utils/utils.js';

// Создание экземпляров необходимых классов
export const editUserPopup = new PopupWithForm(applicationConfig.editUserPopupSelector, saveUserHandler);
export const addCardPopup = new PopupWithForm(applicationConfig.addCardPopupSelector, addCardHandler);
export const galleryPopup = new PopupWithImage(applicationConfig.galleryPopupSelector);
export const userInfo = new UserInfo({
  userNameSelector: applicationConfig.userNameSelector,
  userDescriptionSelector: applicationConfig.userDescriptionSelector
});
export const editUserFormValidator = new FormValidator(validationConfig, editUserFormElement);
export const addCardFormValidator = new FormValidator(validationConfig, addCardFormElement);

// Экземпляр для работы со списком карточек
export const currentCardList = new Section({
  items: initialCards,
  renderer: (cardItem, addToEnd = false) => {
    const card = new Card({ data: cardItem, templateSelector: applicationConfig.cardTemplateSelector }, openGalleryPopupHandler);
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

// Обработчик события редактирования профиля
editUserButtonElement.addEventListener('click', openEditUserPopupHandler);

// Обработчик события добавления новой карточки
addCardButtonElement.addEventListener('click', openAddCardPopupHandler);

// Рендер начального списка карточек
currentCardList.renderItems();

// Добавление валидации формам
editUserFormValidator.enableValidation();
addCardFormValidator.enableValidation();