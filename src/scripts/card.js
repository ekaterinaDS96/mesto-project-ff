import { likeCard, unlikeCard } from "./api.js";

const cardTemplate = document.querySelector('#card-template').content;

function createCard(card, handleDelete, handleOpenFullImage, handleLike, myID) {
    const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
    const cardItemImage = cardItem.querySelector('.card__image');
    const cardDeleteButton = cardItem.querySelector('.card__delete-button');
    const cardItemTitle = cardItem.querySelector('.card__title');
    const cardLikeButton = cardItem.querySelector('.card__like-button');
    const cardLikeCount = cardItem.querySelector('.card__like-count');
    const cardID = card._id;
    cardItem.id = cardID;
    cardItemImage.alt = card.name;
    cardItemTitle.textContent = card.name;
    cardItemImage.src = card.link;
    cardLikeCount.textContent = card.likes.length;
    if (card.owner['_id']!==myID) {
        cardDeleteButton.style.display = 'none';
    }
    else {
        cardDeleteButton.addEventListener('click', () =>{
        handleDelete(cardID);
        });
    }
    cardLikeButton.addEventListener('click', () => {
        handleLike(cardLikeButton, cardLikeCount, cardID)
    });
    cardItemImage.addEventListener('click', handleOpenFullImage);

    const myLikes = card.likes.find((element) => element._id === myID);
    if (myLikes) {
        cardLikeButton.classList.add('card__like-button_is-active')
    };

    return cardItem;
}
function handleLikeCard(button, likeCount, id) {
    if (button.classList.contains('card__like-button_is-active') ) {
        unlikeCard(id)
        .then(data => {
          button.classList.remove('card__like-button_is-active');
          likeCount.textContent = data.likes.length;
        })
        .catch((error) => {
            console.log(error);
        });
    } 
    else {
        likeCard(id)
        .then(data => {
          button.classList.add('card__like-button_is-active');
          likeCount.textContent = data.likes.length;
        })
        .catch((error)=> {
            console.log(error);
        });
    }
    
}

function handleDeleteCardFromList(id) {
    const card = document.querySelector(`[id='${id}']`);
    card.remove();
}

export {createCard, handleLikeCard, handleDeleteCardFromList}