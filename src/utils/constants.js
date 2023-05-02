// Конфиг приложения / сайта
export const applicationConfig = {
  cardSelector: '.place',
  cardTitleSelector: '.place__title',
  cardListSelector: '.places__list',
  cardTemplateSelector: '#place',
  formSelector: '.form',
  userElementSelector: '.profile',
  userNameSelector: '.profile__name',
  userDescriptionSelector: '.profile__description',
  userProfilePhotoSelector: '.profile__photo',
  editUserButtonSelector: '.profile__edit-button',
  editUserPhotoSelector: '.profile__photo',
  editUserPhotoButtonSelector: '.profile__photo-button',
  addCardButtonSelector: '.profile__add-button',
  editUserPopupSelector: '.popup_type_edit-profile',
  formUserNameSelector: '.form__input_type_profile-name',
  formUserDescriptionSelector: '.form__input_type_profile-description',
  saveUserButtonSelector: '.form__button_type_save-profile',
  editUserPhotoPopupSelector: '.popup_type_edit-profile-photo',
  saveUserPhotoButtonSelector: '.form__button_type_save-profile-photo',
  formUserPhotoSelector: '.form__input_type_profile-photo',
  addCardPopupSelector: '.popup_type_add-place',
  formCardNameSelector: '.form__input_type_place-name',
  formCardLinkSelector: '.form__input_type_place-link',
  addFormCardButtonSelector: '.form__button_type_add-place',
  galleryPopupSelector: '.popup_type_gallery',
  getConfirmationPopupSelector: '.popup_type_get-confirmation'
};

// Конфиг для валидации
export const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

// Настройки API для общения с сервером
export const apiSettings = {
  baseUrl: 'https://mesto.nomoreparties.co/v1',
  cohortId: 'cohort-64',
  authorizationToken: '018b1696-43c1-4150-b625-13c417c9334e',
  headers: {
    authorization: '018b1696-43c1-4150-b625-13c417c9334e',
    'Content-Type': 'application/json'
  }
};

// Получение информации о профиле
const userElement = document.querySelector(applicationConfig.userElementSelector);
export const editUserButtonElement = userElement.querySelector(applicationConfig.editUserButtonSelector);
export const editUserPhotoElement = userElement.querySelector(applicationConfig.editUserPhotoSelector);
export const editUserPhotoButtonElement = userElement.querySelector(applicationConfig.editUserPhotoButtonSelector)
export const addCardButtonElement = userElement.querySelector(applicationConfig.addCardButtonSelector);

// Получение модального окна редактирования профиля и его элементов
const editUserPopupElement = document.querySelector(applicationConfig.editUserPopupSelector);
export const editUserFormElement = editUserPopupElement.querySelector(applicationConfig.formSelector);
export const formUserNameElement = editUserFormElement.querySelector(applicationConfig.formUserNameSelector);
export const formUserDescriptionElement = editUserFormElement.querySelector(applicationConfig.formUserDescriptionSelector);
export const saveUserButtonElement = editUserFormElement.querySelector(applicationConfig.saveUserButtonSelector);

// Получение модального окна редактирования фотографии профиля и его элементов
const editUserPhotoPopupElement = document.querySelector(applicationConfig.editUserPhotoPopupSelector);
export const editUserPhotoFormElement = editUserPhotoPopupElement.querySelector(applicationConfig.formSelector);
export const formUserPhotoElement = editUserPhotoFormElement.querySelector(applicationConfig.formUserPhotoSelector);
export const saveUserPhotoButtonElement = editUserPhotoFormElement.querySelector(applicationConfig.saveUserPhotoButtonSelector);

// Получение модального окна добавления новой карточи и его элементов
const addCardPopupElement = document.querySelector(applicationConfig.addCardPopupSelector);
export const addCardFormElement = addCardPopupElement.querySelector(applicationConfig.formSelector);
export const formCardNameElement = addCardFormElement.querySelector(applicationConfig.formCardNameSelector);
export const formCardLinkElement = addCardFormElement.querySelector(applicationConfig.formCardLinkSelector);
export const addFormCardButtonElement = addCardFormElement.querySelector(applicationConfig.addFormCardButtonSelector);