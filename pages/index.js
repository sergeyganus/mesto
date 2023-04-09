// Импорт необходимых элементов, компонентов и обработчиков
import { editUserButtonElement, addCardButtonElement, initialCardList, editUserFormValidator, addCardFormValidator } from '../utils/constants.js';
import { openEditUserPopupHandler, openAddCardPopupHandler } from '../utils/utils.js';

// Обработчик события редактирования профиля
editUserButtonElement.addEventListener('click', openEditUserPopupHandler);

// Обработчик события добавления новой карточки
addCardButtonElement.addEventListener('click', openAddCardPopupHandler);

// Рендер начального списка карточек
initialCardList.renderItems();

// Добавление валидации формам
editUserFormValidator.enableValidation();
addCardFormValidator.enableValidation();