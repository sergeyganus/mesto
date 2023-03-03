// Получение информации о профиле
const profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileDescription = profile.querySelector('.profile__description');
const editProfileButton = profile.querySelector('.profile__edit-button');
const addPlaceButton = profile.querySelector('.profile__add-button');

// Получение модального окна редактирования профиля и его элементов
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const editProfilePopupCloseButton = editProfilePopup.querySelector('.popup__close-button');

// Получение формы редактирования профиля и её элементов
const editProfileForm = editProfilePopup.querySelector('.form');
let formProfileName = editProfileForm.querySelector('.form__input_type_profile-name');
let formProfileDescription = editProfileForm.querySelector('.form__input_type_profile-description');

// Получение модального окна добавления нового места и его элементов
const addPlacePopup = document.querySelector('.popup_type_add-place');
const addPlacePopupCloseButton = addPlacePopup.querySelector('.popup__close-button');

// Получение формы добавления нового места и её элементов
const addPlaceForm = addPlacePopup.querySelector('.form');
let formPlaceName = addPlaceForm.querySelector('.form__input_type_place-name');
let formPlaceLink = addPlaceForm.querySelector('.form__input_type_place-link');

// Первоначальный массив мест
const initialPlaces = [
  {
    id: 1,
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    id: 2,
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    id: 3,
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    id: 4,
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    id: 5,
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    id: 6,
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Актуальный массив мест
const actualPlaces = initialPlaces;

const placesListElem = document.querySelector('.places__list');
const placeTemplate = placesListElem.querySelector('#place').content;

// Функция рендеринга мест
function renderPlaces(places) {
  places.forEach((place) => {
    renderPlace(place, true);
  });
}

// Функция рендеринга одного места
function renderPlace(place, isAppend = false) {
  const placeElem = placeTemplate.querySelector('.place').cloneNode(true);

  placeElem.querySelector('.place__id').value = place.id;

  const placeImageElem = placeElem.querySelector('.place__image');
  placeImageElem.src = place.link;
  placeImageElem.alt = `На фото ${place.name}`;
  placeImageElem.title = `На фото ${place.name}`;

  placeElem.querySelector('.place__title').textContent = place.name;

  if (isAppend) {
    placesListElem.append(placeElem);
  } else {
    placesListElem.prepend(placeElem);
  }

  return placeElem;
}

// Обработчик открытия и закрытия модального окна
function togglePopup(popup) {
  const popupType = popup.classList[1];

  switch (popupType) {
    case 'popup_type_edit-profile':
      if (popup.classList.contains('popup_opened')) {
        formProfileName.value = '';
        formProfileDescription.value = '';
      } else {
        formProfileName.value = profileName.textContent;
        formProfileDescription.value = profileDescription.textContent;
      }
      popup.classList.toggle('popup_opened');
      break;
    case 'popup_type_add-place':
      if (popup.classList.contains('popup_opened')) {
        formPlaceName.value = '';
        formPlaceLink.value = '';
      }
      popup.classList.toggle('popup_opened');
      break;
    default:
      console.log('Ошибка: Тип модального окна не определён!');
      break;
  }
}

// Получение окна галереи
const gallery = document.querySelector('.gallery');
const galleryCloseButton = gallery.querySelector('.gallery__close-button');
const galleryImage = gallery.querySelector('.gallery__image');
const galleryTitle = gallery.querySelector('.gallery__title');

// Обработчик открытия и закрытия галереи
function toggleGallery(evt) {
  const placeImageElem = evt.target;

  if (gallery.classList.contains('gallery_opened')) {
    galleryImage.alt = 'Фото';
    galleryImage.title = 'Фото';
    galleryTitle.textContent = '';
    gallery.classList.toggle('gallery_opened');
  } else {
    const placeElem = placeImageElem.closest('.place');
    const placeTitleElem = placeElem.querySelector('.place__title');
    galleryImage.src = placeImageElem.src;
    galleryImage.alt = placeImageElem.alt;
    galleryImage.title = placeImageElem.title;
    galleryTitle.textContent = placeTitleElem.textContent;
    gallery.classList.toggle('gallery_opened');
  }

}

// Обработчик лайка и отмены лайка месту
function togglePlaceLike(evt) {
  if (evt.target.classList.contains('place__favorite-button')) {
    evt.target.classList.toggle('place__favorite-button_active');
  }
}

// Обработчик сохранения информации о профиле
function saveProfile(evt) {
  // Отмена стандартной отправки формы
  evt.preventDefault();

  // Запись актуальных значений в профиль
  profileName.textContent = formProfileName.value;
  profileDescription.textContent = formProfileDescription.value;

  // Закрытие модального окна
  togglePopup(editProfilePopup);
}

// Функция добавления нового места
function addPlace(evt) {
  // Отмена стандартной отправки формы
  evt.preventDefault();

  const placesIds = actualPlaces.map(place => place.id);
  const newId = Math.max(...placesIds) + 1;

  const newPlace = {
    id: newId,
    name: formPlaceName.value,
    link: formPlaceLink.value
  };

  // Добавление нового элемента, рендер и добавление обработчиков
  actualPlaces.unshift(newPlace);
  const newPlaceElem = renderPlace(newPlace);
  newPlaceElem.querySelector('.place__favorite-button').addEventListener('click', togglePlaceLike);
  newPlaceElem.querySelector('.place__delete-button').addEventListener('click', deletePlace);
  newPlaceElem.querySelector('.place__image').addEventListener('click', toggleGallery);

  // Закрытие модального окна
  togglePopup(addPlacePopup);
}

// Функция удаления места
function deletePlace(evt) {
  const placeDeleteButton = evt.target;

  const deletedPlaceElem = placeDeleteButton.closest('.place');
  const deletedId = deletedPlaceElem.querySelector('.place__id').value;

  for (let i = 0; i < actualPlaces.length; i++) {
    if (actualPlaces[i].id === Number(deletedId)) {
      actualPlaces.splice(i, 1);
    }
  }

  deletedPlaceElem.remove();
}

// Обработчики событий для редактирования профиля
editProfileButton.addEventListener('click', () => togglePopup(editProfilePopup));
editProfilePopupCloseButton.addEventListener('click', () => togglePopup(editProfilePopup));
editProfileForm.addEventListener('submit', saveProfile);

// Обработчики событий для добавления нового места
addPlaceButton.addEventListener('click', () => togglePopup(addPlacePopup));
addPlacePopupCloseButton.addEventListener('click', () => togglePopup(addPlacePopup));
addPlaceForm.addEventListener('submit', addPlace);

// Запуск рендера мест
renderPlaces(initialPlaces);

// Получаем все кнопки с лайков и вешаем обработчики
const placeFavoriteButtons = document.querySelectorAll('.place__favorite-button');
placeFavoriteButtons.forEach(currFavoriteButton => currFavoriteButton.addEventListener('click', togglePlaceLike));

// Получаем все кнопки удаления мест и вешаем обработчики
const placeDeleteButtons = document.querySelectorAll('.place__delete-button');
placeDeleteButtons.forEach(currDeleteButton => currDeleteButton.addEventListener('click', deletePlace));

// Получаем все картинки мест и вешаем обработчики
const placeImages = document.querySelectorAll('.place__image');
placeImages.forEach(currPlaceImage => currPlaceImage.addEventListener('click', toggleGallery));
galleryCloseButton.addEventListener('click', toggleGallery);

