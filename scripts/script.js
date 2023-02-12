// Получение информации о профиле
let profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileDescription = profile.querySelector('.profile__description');
let editButton = profile.querySelector('.profile__edit-button');

// Получение модального окна и его элементов
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-button');

// Получение формы и её элементов
let form = popup.querySelector('.form');
let formProfileName = form.querySelector('.form__profile-name');;
let formProfileDescription = form.querySelector('.form__profile-description');

// Обработчик открытия и закрытия модального окна
function togglePopup() {
  // Получение актуальных данных о профиле
  profileName = profile.querySelector('.profile__name');
  profileDescription = profile.querySelector('.profile__description');

  if (popup.classList.contains('popup_opened')) {
    formProfileName.value = '';
    formProfileDescription.value = '';
  } else {
    formProfileName.value = profileName.textContent;
    formProfileDescription.value = profileDescription.textContent;
  }

  popup.classList.toggle('popup_opened');
}

function saveForm(evt) {
  // Отмена стандартной отправки формы
  evt.preventDefault();

  // Получение актульных данных формы
  formProfileName = form.querySelector('.form__profile-name');
  formProfileDescription = form.querySelector('.form__profile-description');

  // Запись актуальных значений в профиль
  profileName.textContent = formProfileName.value;
  profileDescription.textContent = formProfileDescription.value;

  // Закрытие модального окна
  togglePopup();
}

editButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);
form.addEventListener('submit', saveForm);

