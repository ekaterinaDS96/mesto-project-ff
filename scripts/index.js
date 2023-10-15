// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const cardsList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(card, deleteFunction) {
    const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
    const cardItemImage = cardItem.querySelector('.card__image');
    const deleteButton = cardItem.querySelector('.card__delete-button');
    const cardItemTitle = cardItem.querySelector('.card__title');

    cardItemImage.alt = card.name;
    cardItemTitle.textContent = card.name;
    cardItemImage.src = card.link;

    deleteButton.addEventListener('click', deleteFunction);

    return cardItem;
}

// Функция добавления карточки

function addCard(card, list){
    const createdCard = createCard(card, deleteCard);
    list.append(createdCard);
}

// @todo: Функция удаления карточки

function  deleteCard(evt){
    const cardToDelete = evt.target.closest('.card');
    cardToDelete.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach((card)=>{addCard(card, cardsList)});