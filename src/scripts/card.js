const cardTemplate = document.querySelector('#card-template').content;

function createCard(card, deleteFunction, likeFunction, openFullImageFunction) {
    const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
    const cardItemImage = cardItem.querySelector('.card__image');
    const cardDeleteButton = cardItem.querySelector('.card__delete-button');
    const cardItemTitle = cardItem.querySelector('.card__title');
    const cardLikeButton = cardItem.querySelector('.card__like-button');

    cardItemImage.alt = card.name;
    cardItemTitle.textContent = card.name;
    cardItemImage.src = card.link;

    cardDeleteButton.addEventListener('click', deleteFunction);
    cardLikeButton.addEventListener('click', likeFunction);
    cardItemImage.addEventListener('click', openFullImageFunction);

    return cardItem;
}

function deleteCard(evt) {
    const cardToDelete = evt.target.closest('.card');
    cardToDelete.remove();
}

function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

export {createCard, deleteCard, likeCard}