// Импорт необходимых элементов и компонентов
import {
  formUserNameElement,
  formUserDescriptionElement,
  formCardNameElement,
  formCardLinkElement,
  editUserPopup,
  addCardPopup,
  userInfo,
  currentCardList,
  editUserFormValidator,
  addCardFormValidator
} from './constants.js';

// Функция заполнения полей формы из профиля
const setUserFormData = () => {
  const userData = userInfo.getUserInfo();
  formUserNameElement.value = userData['userName'];
  formUserDescriptionElement.value = userData['userDescription'];
}

// Обработчик сохранения информации о профиле
export const saveUserHandler = (evt) => {
  evt.preventDefault();
  const formValues = editUserPopup.getValues();
  userInfo.setUserInfo({
    userName: formValues['profile-name'],
    userDescription: formValues['profile-description']
  });
  editUserPopup.close();
}

// Функция добавления новой карточки
export const addCardHandler = (evt) => {
  evt.preventDefault();
  const cardItem = {
    name: formCardNameElement.value,
    link: formCardLinkElement.value
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