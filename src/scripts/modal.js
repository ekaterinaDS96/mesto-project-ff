function openModal(popup) {
    popup.classList.add('popup_is-animated');
    
    setTimeout(() => {
        popup.classList.add('popup_is-opened');
        popup.classList.remove('popup_is-animated');
    }, 0);
    document.addEventListener('keydown', closeModalOnEscape);
}

function closeModal(popup) {
    popup.classList.add('popup_is-animated');

    setTimeout(() => {
      popup.classList.remove('popup_is-opened');
    }, 0);
  
    setTimeout(() => {
      popup.classList.remove('popup_is-animated');
    }, 300);
    document.removeEventListener('keydown', closeModalOnEscape);
}

function closeModalOnEscape(evt){
    if (evt.key==='Escape') {
        const popup = document.querySelector('.popup_is-opened');
        closeModal(popup);
    }
}

function closeModalOnOverlay(evt) {
    if (evt.target.classList.contains('popup_is-opened')) {
        const popup = document.querySelector('.popup_is-opened');
        closeModal(popup);
    }
}

export {openModal, closeModal, closeModalOnOverlay}