function openModal(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeModalOnEscape);
    document.addEventListener('mousedown', closeModalOnOverlay);
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalOnEscape);
    document.removeEventListener('mousedown', closeModalOnOverlay);
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

function handleCloseByButton(evt) {
    const popup = evt.target.closest('.popup');
    closeModal(popup);
}

export {openModal, closeModal, handleCloseByButton}