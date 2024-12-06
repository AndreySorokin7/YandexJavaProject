const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
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

document.addEventListener('DOMContentLoaded', () => {
  const popups = document.querySelectorAll('.popup');
  popups.forEach(popup => {
    popup.classList.add('popup_is-animated');
  });
});

function openModal(popup) {
  popup.classList.add('popup_is-opened');
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
}


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
  openModal(cardPopup);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const cardInfo = {
      name: cardNameInput.value,
      link: cardLinkInput.value
  };

  const newCard = createCard(cardInfo);
  placesList.prepend(newCard);
  closeModal(cardPopup);
}

cardFormElement.addEventListener('submit', handleCardFormSubmit);

function createCard(info) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = info.link;
  cardImage.alt = info.name;
  cardTitle.textContent = info.name;


  deleteButton.addEventListener('click', () => cardElement.remove());


  likeButton.addEventListener('click', () => likeButton.classList.toggle('card__like-button_is-active'));

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

initialCards.forEach(info => {
  const card = createCard(info);
  placesList.append(card);
});

