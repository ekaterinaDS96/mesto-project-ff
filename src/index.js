import './pages/index.css';
import {createCard} from './scripts/card.js';
import {openModal, closeModal} from './scripts/modal.js';
import { enableValidation, clearValidation } from './scripts/validation.js';
import { getCards, getProfile, updateProfile, postNewCard, deleteCard, updateProfileImage } from './scripts/api.js';

const cardsList = document.querySelector('.places__list');

const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit');
const profileEditForm = document.forms['edit-profile'];
const profileEditFormName = profileEditForm.elements.name;
const profileEditFormDescription = profileEditForm.elements.description;
const profileEditSubmitButton = profileEditForm.querySelector('.popup__button');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const popup = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const popupCloseButtons = document.querySelectorAll('.popup__close');

const popupAddCard = document.querySelector('.popup_type_new-card');
const popupAddButton = document.querySelector('.profile__add-button');
const cardAddForm = document.forms['new-place'];
const cardAddFormName = cardAddForm.elements['place-name'];
const cardAddFormSource = cardAddForm.elements.link;
const cardSubmitButton = cardAddForm.querySelector('.popup__button');
const myID = "f84ecf6df16b9c52acf5165f";
const promises = [getCards, getProfile];

const cardDeletePopup = document.querySelector('.popup_type_delete-card');
const cardDeleteForm = document.forms['delete-card'];
const cardDeleteFormSubmitButton = cardDeleteForm.querySelector('.popup__button');

const imageEditPopup = document.querySelector('.popup_type_edit-image');
const imageEditButton = document.querySelector('.profile__image-button');
const imageEditForm = document.forms['edit-image'];
const imageFormInput = imageEditForm.elements.link;
const imageFormSubmitButton = imageEditForm.querySelector('.popup__button');

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    disabledButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

Promise.all(promises)
.then(()=> {
    getProfile()
    .then(data => {
        profileName.textContent = data.name;
        profileDescription.textContent = data.about;
        profileImage.style.backgroundImage = `url('${data.avatar}')`;
    })
    .catch(error => {
        console.log(error);
    })
    getCards()
    .then(data=> {
        data.forEach((card)=>addCard(card, cardsList));
    })
    .catch(error=> {
        console.log(error);
    })
})

function addCard(card, list){
    const createdCard = createCard(card, handleOpenDeleteCardPopup, handleOpenFullImage);
    list.append(createdCard);
}

profileEditButton.addEventListener('click', () => {
    clearValidation(profileEditForm, validationConfig);
    profileEditFormName.value = profileName.textContent;
    profileEditFormDescription.value = profileDescription.textContent;
    openModal(profileEditPopup);
});

function handleOpenFullImage(evt) {
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    popupCaption.textContent = evt.target.alt;
    openModal(popup);
}

function handleCloseByButton(evt) {
    const popup = evt.target.closest('.popup');
    closeModal(popup);
}

popupCloseButtons.forEach((button)=> {
    button.addEventListener('click', handleCloseByButton);
})

function handleSubmitProfileForm(evt) {
    evt.preventDefault();
    profileEditSubmitButton.textContent = "Сохранение...";
    updateProfile(profileEditFormName.value, profileEditFormDescription.value)
    .then((data) => {
        console.log(data);
        profileName.textContent = profileEditFormName.value;
        profileDescription.textContent = profileEditFormDescription.value;
        closeModal(profileEditPopup);
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(()=> {
        profileEditSubmitButton.textContent = "Сохранить";
    })
}

profileEditForm.addEventListener('submit', handleSubmitProfileForm);

popupAddButton.addEventListener('click', () => {
    clearValidation(cardAddForm, validationConfig);
    cardAddForm.reset();
    openModal(popupAddCard);
});

function handleAddCardFromForm(evt) {
    evt.preventDefault();
    cardSubmitButton.textContent = "Сохранение...";
    const name = cardAddFormName.value;
    const link = cardAddFormSource.value;
    postNewCard(name, link)
    .then((data) => {
        cardsList.prepend(createCard(data, handleOpenDeleteCardPopup, handleOpenFullImage));
        closeModal(popupAddCard);
    })
    .catch((error)=> {
        console.log(error);
    })
    .finally(()=> {
        cardSubmitButton.textContent = "Сохранить";
    })
    
}

cardAddForm.addEventListener('submit', (evt) => {
    handleAddCardFromForm(evt)
});

function handleOpenDeleteCardPopup(id) {
    cardDeleteForm.dataset.id = id;
    openModal(cardDeletePopup);
}

function handleDeleteCard(evt) {
    evt.preventDefault();
    const id = cardDeleteForm.dataset.id;
    deleteCard(id)
    .then(()=> {
        const card = document.querySelector(`[id='${id}']`);
        card.remove();
        closeModal(cardDeletePopup);
    })
    .catch((error) => {
        console.log(error);
    })
}

cardDeleteForm.addEventListener('submit', handleDeleteCard);

imageEditButton.addEventListener('click', () => {
    imageEditForm.reset();
    clearValidation(imageEditForm, validationConfig);
    openModal(imageEditPopup);
});

function handleUpdateProfileImage(evt) {
    evt.preventDefault();
    imageFormSubmitButton.textContent = "Сохранение...";
    updateProfileImage(imageFormInput.value)
    .then((data) => {
        profileImage.style.backgroundImage = `url('${data.avatar}')`;
        closeModal(imageEditPopup);
      })
      .catch((error) => 
      {
        console.log(error);
      })
      .finally(() => {
        imageFormSubmitButton.textContent = 'Сохранить';
      });
}

imageEditForm.addEventListener('submit', handleUpdateProfileImage);

enableValidation(validationConfig);