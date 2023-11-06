import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import {createCard, deleteCard, likeCard} from './scripts/card.js';
import {openModal, closeModal, closeModalOnOverlay} from './scripts/modal.js';


const cardsList = document.querySelector('.places__list');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit');
const profileEditForm = document.forms['edit-profile'];
const profileEditFormName = profileEditForm.elements.name;
const profileEditFormDescription = profileEditForm.elements.description;
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const popup = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const popupCloseButtons = document.querySelectorAll('.popup__close');

const popupAddCard = document.querySelector('.popup_type_new-card');
const popupAddButton = document.querySelector('.profile__add-button');
const cardAddForm = document.forms['new-place'];
const cardAddFormName = cardAddForm.elements['place-name'];
const cardAddFormSource = cardAddForm.elements.link;

function addCard(card, list){
    const createdCard = createCard(card, deleteCard, likeCard, openFullImage);
    list.append(createdCard);
}

initialCards.forEach((card)=>{addCard(card, cardsList)});

profileEditButton.addEventListener('click', () => {
    profileEditFormName.value = profileName.textContent;
    profileEditFormDescription.value = profileDescription.textContent;
    openModal(profileEditPopup);
});

profileEditPopup.addEventListener('click', (evt) => {
    closeModalOnOverlay(evt);
});

popup.addEventListener('click', (evt) => {
    closeModalOnOverlay(evt);
});

function openFullImage(evt) {
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;
    openModal(popup);
}

function closeByButton(evt) {
    const popup = evt.target.closest('.popup');
    closeModal(popup);
}

popupCloseButtons.forEach((button)=> {
    button.addEventListener('click', closeByButton);
})

function submitProfileForm(evt) {
    evt.preventDefault();
    profileName.textContent = profileEditFormName.value;
    profileDescription.textContent = profileEditFormDescription.value;

    closeModal(profileEditPopup);
}

profileEditForm.addEventListener('submit', submitProfileForm);

popupAddButton.addEventListener('click', () => {
    cardAddForm.reset();
    openModal(popupAddCard);
});

function addCardFromForm(evt) {
    evt.preventDefault();
    const name = cardAddFormName.value;
    const link = cardAddFormSource.value;
    const card = {name, link};
    const createdCard = createCard(card, deleteCard, likeCard, openFullImage);
    cardsList.prepend(createdCard);
    closeModal(popupAddCard);
}

cardAddForm.addEventListener('submit', (evt) => {
    addCardFromForm(evt)
});