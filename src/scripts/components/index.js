
import '../../pages/index.css';
import { openModal, closeModal, addCloseButtonListeners, addPopupClickListeners, addEscapeKeyListener } from './modal.js';
import { createCard } from './card.js';
import { enableValidation, toggleButtonState } from './validate.js';

import logo from '../../images/logo.svg';
import avatar from '../../images/avatar.jpg';

const logoImage = document.querySelector('.header__logo');
logoImage.src = logo;

const avatarImage = document.querySelector('.profile__image');
avatarImage.style.backgroundImage = `url(${avatar})`;

const initialCards = [
  { name: "Архыз", link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg" },
  { name: "Челябинская область", link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg" },
  { name: "Иваново", link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg" },
  { name: "Камчатка", link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg" },
  { name: "Холмогорский район", link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg" },
  { name: "Байкал", link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg" }
];

export const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
export const imagePopup = document.querySelector('.popup_type_image');
const editButton = document.querySelector('.profile__edit-button');
const profileFormElement = profilePopup.querySelector('.popup__form');
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const cardFormElement = cardPopup.querySelector('.popup__form');
const cardNameInput = cardPopup.querySelector('.popup__input_type_card-name');
const cardLinkInput = cardPopup.querySelector('.popup__input_type_url');
const addCardButton = document.querySelector('.profile__add-button');

const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
enableValidation(validationSettings);

document.addEventListener('DOMContentLoaded', () => {
  addCloseButtonListeners();
  addPopupClickListeners();
  addEscapeKeyListener();
  const popups = document.querySelectorAll('.popup');
  popups.forEach(popup => {
    popup.classList.add('popup_is-animated');
  });
});


function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(profilePopup);
}

editButton.addEventListener('click', () => {
  fillProfileForm();
  openModal(profilePopup);
});

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

document.querySelectorAll('.popup__close').forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closeModal(popup));
});

document.querySelectorAll('.popup').forEach(popup => {
  popup.addEventListener('click', evt => {
      if (evt.target === popup) closeModal(popup);
  });
});

document.addEventListener('keydown', evt => {
  if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      if (openedPopup) closeModal(openedPopup);
  }
});

addCardButton.addEventListener('click', () => {
  cardNameInput.value = '';
  cardLinkInput.value = '';
  const inputs = [cardNameInput, cardLinkInput];
  const submitButton = cardFormElement.querySelector(validationSettings.submitButtonSelector);
  toggleButtonState(inputs, submitButton, validationSettings);
  openModal(cardPopup);
});


// Обработчик формы добавления карточки
function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const cardInfo = {
      name: cardNameInput.value,
      link: cardLinkInput.value
  };

  const newCard = createCard(cardInfo);
  placesList.prepend(newCard); // Добавляем карточку в начало списка
  closeModal(cardPopup);       // Закрываем попап
}

cardFormElement.addEventListener('submit', handleCardFormSubmit);

initialCards.forEach(info => {
  const card = createCard(info);
  placesList.append(card);
});
