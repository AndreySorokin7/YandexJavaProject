import { cardTemplate, imagePopup, openConfirmPopup} from './index.js';
import { openModal } from './modal.js';
import { toggleLikeOnServer, deleteCard, cohortId as currentUserId, token } from './api.js';

export function createCard(info) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');

  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = document.createElement('span');

  const deleteButton = cardElement.querySelector('.card__delete-button');

  likeCount.classList.add('card__like-count');
  likeCount.textContent = info.likes.length; 
  likeButton.after(likeCount);
  console.log('Owner ID:', info.owner._id);
  console.log('Current User ID:', token);

  if (info.owner._id !== '12e7b86937b167477a9e7892') {
    deleteButton.style.display = 'none';
  }

  cardImage.alt = info.name;

  cardImage.src = info.link;
  
  cardTitle.textContent = info.name;

  likeButton.addEventListener('click', () => {
    const isLiked = likeButton.classList.contains('card__like-button_is-active');
    toggleLikeOnServer(info._id, !isLiked)
      .then(updatedCard => {
        likeButton.classList.toggle('card__like-button_is-active', !isLiked);
        likeCount.textContent = updatedCard.likes.length;
      })
      .catch(err => console.error(`Ошибка лайка: ${err}`));
  });

  cardImage.addEventListener('click', () => {
    const imagePopupImage = imagePopup.querySelector('.popup__image');
    const imagePopupCaption = imagePopup.querySelector('.popup__caption');

    imagePopupImage.src = info.link;
    imagePopupImage.alt = info.name;
    imagePopupCaption.textContent = info.name;

    openModal(imagePopup);
  });

  deleteButton.addEventListener('click', () => {
    openConfirmPopup(() => {
    deleteCard(info._id)
      .then(() => {
        cardElement.remove();
      })
      .catch(err => console.error('Ошибка удаления карточки:', err));
    });
  });

  return cardElement;
}
