// Получение информации о профиле
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');
const editProfileButton = profile.querySelector('.profile__edit-button');
const addPlaceButton = profile.querySelector('.profile__add-button');

// Получение модального окна редактирования профиля и его элементов
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const editProfilePopupCloseButton = editProfilePopup.querySelector('.popup__close-button');

// Получение формы редактирования профиля и её элементов
const editProfileForm = editProfilePopup.querySelector('.form');
const formProfileName = editProfileForm.querySelector('.form__input_type_profile-name');
const formProfileDescription = editProfileForm.querySelector('.form__input_type_profile-description');

// Получение модального окна добавления нового места и его элементов
const addPlacePopup = document.querySelector('.popup_type_add-place');
const addPlacePopupCloseButton = addPlacePopup.querySelector('.popup__close-button');

// Получение формы добавления нового места и её элементов
const addPlaceForm = addPlacePopup.querySelector('.form');
const formPlaceName = addPlaceForm.querySelector('.form__input_type_place-name');
const formPlaceLink = addPlaceForm.querySelector('.form__input_type_place-link');

// Получение окна галереи
const galleryPopup = document.querySelector('.popup_type_gallery');
const galleryPopupCloseButton = galleryPopup.querySelector('.popup__close-button');
const galleryPopupImage = galleryPopup.querySelector('.popup__image');
const galleryPopupTitle = galleryPopup.querySelector('.popup__title');

// Получение элемента списка мест и шаблона карточки места
const placesListElem = document.querySelector('.places__list');
const placeTemplate = document.querySelector('#place').content;

// Функция создания места
function createPlace(place) {
  const placeElem = placeTemplate.querySelector('.place').cloneNode(true);

  const placeImageElem = placeElem.querySelector('.place__image');
  placeImageElem.src = place.link;
  placeImageElem.alt = `На фото ${place.name}`;
  placeImageElem.title = `На фото ${place.name}`;

  placeElem.querySelector('.place__title').textContent = place.name;

  placeElem.querySelector('.place__favorite-button').addEventListener('click', togglePlaceLike);
  placeElem.querySelector('.place__delete-button').addEventListener('click', deletePlace);
  placeImageElem.addEventListener('click', openGalleryPopup);

  return placeElem;
}

// Функция добавления места
function addPlace(place, isAppend = false) {
  const placeElem = createPlace(place);

  // Добавляем элемент в конец или начало списка мест
  if (isAppend) {
    placesListElem.append(placeElem);
  } else {
    placesListElem.prepend(placeElem);
  }
}

// Функция добавления мест
function addPlaces(places) {
  places.forEach((place) => {
    addPlace(place, true);
  });
}

// Функция заполнения полей формы из профиля
function setFormProfileData() {
  formProfileName.value = profileName.textContent;
  formProfileDescription.value = profileDescription.textContent;
}

// Функция заполнения профиля из актуальных данных формы
function setProfileData() {
  profileName.textContent = formProfileName.value;
  profileDescription.textContent = formProfileDescription.value;
}

// Функция заполнения данных галереи
function setGalleryPopupData(placeImageElem) {
  const placeElem = placeImageElem.closest('.place');
  const placeTitleElem = placeElem.querySelector('.place__title');
  galleryPopupImage.src = placeImageElem.src;
  galleryPopupImage.alt = placeImageElem.alt;
  galleryPopupImage.title = placeImageElem.title;
  galleryPopupTitle.textContent = placeTitleElem.textContent;
}

// Функция очистки полей формы добавления места
function clearFormPlaceData() {
  addPlaceForm.reset();
}

// Обработчик открытия модального окна
function openPopup(popup) {
  document.addEventListener('keydown', closePopupByEscHandler);
  popup.classList.add('popup_opened');
}

// Обработчик закрытия модального окна
function closePopup(popup) {
  document.removeEventListener('keydown', closePopupByEscHandler);
  popup.classList.remove('popup_opened');
}

// Обработчик закрытия модального окна кликом по оверлею
function closePopupByOverlay(evt, popup) {
  if (evt.target.classList.contains('popup')) {
    closePopup(popup);
  }
}

// Обработчик закрытия модального окна по нажатию Escape
function closePopupByEscHandler(evt) {
  const openedPopup = document.querySelector('.popup_opened');

  if ((evt.key === 'Escape') && openedPopup) {
    closePopup(openedPopup);
  }
}

// Обработчик открытия модального окна редактирования профиля
function openEditProfilePopup() {
  setFormProfileData();
  resetValidation(editProfilePopup, validationConfig);
  openPopup(editProfilePopup);
}

// Обработчик закрытия модального окна редактирования профиля
function closeEditProfilePopup() {
  closePopup(editProfilePopup);
}

// Обработчик открытия модального окна добавления места
function openAddPlacePopup() {
  clearFormPlaceData();
  resetValidation(addPlacePopup, validationConfig);
  openPopup(addPlacePopup);
}

// Обработчик закрытия модального окна добавления места
function closeAddPlacePopup() {
  closePopup(addPlacePopup);
}

// Обработчик открытия модального окна галереи
function openGalleryPopup(evt) {
  const placeImageElem = evt.target;

  setGalleryPopupData(placeImageElem);
  openPopup(galleryPopup);
}

// Обработчик закрытия модального окна галереи
function closeGalleryPopup() {
  closePopup(galleryPopup);
}

// Обработчик лайка и отмены лайка месту
function togglePlaceLike(evt) {
  evt.target.classList.toggle('place__favorite-button_active');
}

// Обработчик сохранения информации о профиле
function saveProfile(evt) {
  // Отмена стандартной отправки формы
  evt.preventDefault();

  // Запись актуальных значений в профиль
  setProfileData();

  // Закрытие модального окна
  closePopup(editProfilePopup);
}

// Функция добавления нового места
function addPlaceHandler(evt) {
  // Отмена стандартной отправки формы
  evt.preventDefault();

  // Создание нового места
  const newPlace = {
    name: formPlaceName.value,
    link: formPlaceLink.value
  };

  // Добавление нового места в DOM
  addPlace(newPlace);

  // Закрытие модального окна
  closePopup(addPlacePopup);
}

// Функция удаления места
function deletePlace(evt) {
  const placeDeleteButton = evt.target;

  const deletedPlaceElem = placeDeleteButton.closest('.place');
  deletedPlaceElem.remove();
}

// Обработчики событий для редактирования профиля
editProfileButton.addEventListener('click', openEditProfilePopup);
editProfilePopupCloseButton.addEventListener('click', closeEditProfilePopup);
editProfilePopup.addEventListener('click', (evt) => closePopupByOverlay(evt, editProfilePopup));
editProfileForm.addEventListener('submit', saveProfile);

// Обработчики событий для добавления нового места
addPlaceButton.addEventListener('click', openAddPlacePopup);
addPlacePopupCloseButton.addEventListener('click', closeAddPlacePopup);
addPlacePopup.addEventListener('click', (evt) => closePopupByOverlay(evt, addPlacePopup));
addPlaceForm.addEventListener('submit', addPlaceHandler);

// Обработчик события для закрытия галереи
galleryPopupCloseButton.addEventListener('click', closeGalleryPopup);
galleryPopup.addEventListener('click', (evt) => closePopupByOverlay(evt, galleryPopup));

// Запуск функции добавления мест
addPlaces(initialPlaces);

