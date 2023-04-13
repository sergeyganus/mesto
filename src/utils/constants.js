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
  editUserButtonSelector: '.profile__edit-button',
  addCardButtonSelector: '.profile__add-button',
  editUserPopupSelector: '.popup_type_edit-profile',
  formUserNameSelector: '.form__input_type_profile-name',
  formUserDescriptionSelector: '.form__input_type_profile-description',
  addCardPopupSelector: '.popup_type_add-place',
  formCardNameSelector: '.form__input_type_place-name',
  formCardLinkSelector: '.form__input_type_place-link',
  galleryPopupSelector: '.popup_type_gallery'
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

// Первоначальный массив карточек
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Получение информации о профиле
const userElement = document.querySelector(applicationConfig.userElementSelector);
export const editUserButtonElement = userElement.querySelector(applicationConfig.editUserButtonSelector);
export const addCardButtonElement = userElement.querySelector(applicationConfig.addCardButtonSelector);

// Получение модального окна редактирования профиля и его элементов
const editUserPopupElement = document.querySelector(applicationConfig.editUserPopupSelector);
export const editUserFormElement = editUserPopupElement.querySelector(applicationConfig.formSelector);
export const formUserNameElement = editUserFormElement.querySelector(applicationConfig.formUserNameSelector);
export const formUserDescriptionElement = editUserFormElement.querySelector(applicationConfig.formUserDescriptionSelector);

// Получение модального окна добавления новой карточи и его элементов
const addCardPopupElement = document.querySelector(applicationConfig.addCardPopupSelector);
export const addCardFormElement = addCardPopupElement.querySelector(applicationConfig.formSelector);
export const formCardNameElement = addCardFormElement.querySelector(applicationConfig.formCardNameSelector);
export const formCardLinkElement = addCardFormElement.querySelector(applicationConfig.formCardLinkSelector);