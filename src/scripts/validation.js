function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

function toggleButtonState(inputList, button, disabledClass) {
    if (hasInvalidInput(inputList)) {
        button.classList.add(disabledClass);
        button.disabled = true;
    }   
    else {
        button.disabled = false;
        button.classList.remove(disabledClass);
    }
        
}

function showError(form, formInput, formInputErrorClass, errorClass, errorMessage) {
    const error = form.querySelector(`.${formInput.id}-error`);
    formInput.classList.add(formInputErrorClass);
    error.textContent = errorMessage;
    error.classList.add(errorClass);
}

function hideError(form, formInput, formInputErrorClass, errorClass) {
    const error = form.querySelector(`.${formInput.id}-error`);
    formInput.classList.remove(formInputErrorClass);
    error.textContent = '';
    error.classList.remove(errorClass);
}

function checkInputValidity(form, formInput, formInputErrorClass, errorClass) {
    if (formInput.validity.patternMismaatch)
        formInput.setCustomValidity(formInput.dataset.errorMessage);
    else
        formInput.setCustomValidity('');

    if (formInput.validity.valid)
        hideError(form, formInput, formInputErrorClass, errorClass);
    else 
        showError(form, formInput, formInputErrorClass, errorClass, formInput.validationMessage);
}

function setEventListeners(form, formInputSelector, submitButtonSelector, disabledButtonClass, formInputErrorClass, errorClass) {
    const inputList = Array.from(form.querySelectorAll(`${formInputSelector}`));
    const submitButton = form.querySelector(submitButtonSelector);

    toggleButtonState(inputList, submitButton, disabledButtonClass);

    inputList.forEach((input) => {
        input.addEventListener('input', () => {
            checkInputValidity(form, input, formInputErrorClass, errorClass);
            toggleButtonState(inputList, submitButton, disabledButtonClass);
        })
    })
}

function enableValidation(validationConfig) {
    const formList = Array.from(document.querySelectorAll(`${validationConfig.formSelector}`));
    formList.forEach((form) => {
        setEventListeners(form, validationConfig.inputSelector, validationConfig.submitButtonSelector, validationConfig.disabledButtonClass, validationConfig.inputErrorClass, validationConfig.errorClass);
    })
}

function clearValidation(form, validationConfig) {
    const inputList = Array.from(form.querySelectorAll(validationConfig.inputSelector));
    const submitButton = form.querySelector(validationConfig.submitButtonSelector);
    inputList.forEach((input) => {
        hideError(form, input, validationConfig.inputErrorClass, validationConfig.errorClass);
    });
    submitButton.classList.add(validationConfig.disabledButtonClass);
}

export {enableValidation, clearValidation}