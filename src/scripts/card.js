import { likeCard, unlikeCard } from "./api.js";

const cardTemplate = document.querySelector('#card-template').content;
const myID = "f84ecf6df16b9c52acf5165f";

function createCard(card, deleteFunction, openFullImageFunction) {
    const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
    const cardItemImage = cardItem.querySelector('.card__image');
    const cardDeleteButton = cardItem.querySelector('.card__delete-button');
    const cardItemTitle = cardItem.querySelector('.card__title');
    const cardLikeButton = cardItem.querySelector('.card__like-button');
    const cardLikeCount = cardItem.querySelector('.card__like-count');
    const cardID = card['_id'];
    cardItem.id = cardID;
    cardItemImage.alt = card.name;
    cardItemTitle.textContent = card.name;
    cardItemImage.src = card.link;
    cardLikeCount.textContent = card.likes.length;
    if (card.owner['_id']!=myID)
        cardDeleteButton.style.display = 'none';
    else cardDeleteButton.addEventListener('click', () =>{
        deleteFunction(cardID);
    });
    cardLikeButton.addEventListener('click', () => {
        handleLikeCard(cardLikeButton, cardLikeCount, cardID)
    });
    cardItemImage.addEventListener('click', openFullImageFunction);

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

export {createCard}