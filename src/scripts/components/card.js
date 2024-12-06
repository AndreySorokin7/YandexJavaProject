import { cardTemplate, imagePopup } from './index.js';
import { openModal } from './modal.js';

export function createCard(info) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = info.link;
  cardImage.alt = info.name;
  cardTitle.textContent = info.name;

  // Обработчик кнопки удаления
  deleteButton.addEventListener('click', () => cardElement.remove());

  // Обработчик лайка
  likeButton.addEventListener('click', () => likeButton.classList.toggle('card__like-button_is-active'));

  // Обработчик клика на картинку
  cardImage.addEventListener('click', () => {
    const imagePopupImage = imagePopup.querySelector('.popup__image');
    const imagePopupCaption = imagePopup.querySelector('.popup__caption');

    imagePopupImage.src = info.link;
    imagePopupImage.alt = info.name;
    imagePopupCaption.textContent = info.name;

    openModal(imagePopup);
  });

  return cardElement;
}