"use strict";

// catch all HTML elements;
const formMain = document.querySelector(".form-main");
const formName = document.querySelector("#form-name");
const formLastName = document.querySelector("#form-last-name");
const formEmail = document.querySelector("#form-email");
const queryTypeInput = document.querySelector("#query-type__input");
const supportRequestInput = document.querySelector("#support-request__input");
const formTextarea = document.querySelector("#form-main-textarea");
const dataConsentInput = document.querySelector("#data-consent-input");
const btnSubmit = document.querySelector(".form-main__btn-submit");

// all the small tags that represents the error messages using the concept of destructring;
const [
  nameErrorMsg,
  lastNameErrorMsg,
  emailErrorMsg,
  requestErrorMsg,
  textareaMsg,
  consentCheckboxMsg,
] = Array.from(
  document.querySelectorAll(".form-main_input-wrapper__error-msg")
);
const dialogLoginSuccess = document.querySelector(".dialog-login-success");

// verify if the input value is empty for check name, lastname and textarea fields;
const validityInputValue = (value, errorMsgElement) => {
  if (!value.trim()) errorMsgElement.classList.remove("disabled-visibility");
  else errorMsgElement.classList.add("disabled-visibility");
};

// verify if email's value is valid;
const isEmailAddressValid = (emailValue, errorMsgElement) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailValid = emailRegex.test(emailValue);
  if (!emailValid) {
    errorMsgElement.classList.remove("disabled-visibility");
  } else {
    errorMsgElement.classList.add("disabled-visibility");
  }
};

formMain.onsubmit = (event) => event.preventDefault();

formName.oninput = (event) =>
  validityInputValue(event.target.value, nameErrorMsg);

formLastName.oninput = (event) =>
  validityInputValue(event.target.value, lastNameErrorMsg);

formEmail.oninput = (event) =>
  isEmailAddressValid(event.target.value, emailErrorMsg);

formTextarea.oninput = (event) =>
  validityInputValue(event.target.value, textareaMsg);

// before send the values, we verify if the values aren't empty and if the checkboxes are checked;
btnSubmit.onclick = () => {
  const isNotEmptyFormValue = [
    formName.value,
    formLastName.value,
    formEmail.value,
    formTextarea.value,
  ];

  const emailValueValid = emailErrorMsg.classList.contains(
    "disabled-visibility"
  );

  const hasEmptyFields = isNotEmptyFormValue.some((item) => !item.trim());
  const whichRequestIsChecked =
    queryTypeInput.checked || supportRequestInput.checked;
  const isFormInvalid =
    hasEmptyFields ||
    !emailValueValid ||
    !dataConsentInput.checked ||
    !whichRequestIsChecked;

  // verify which component of input's group contain some error and show your message error;
  const whichErrorsValidExist = () => {
    if (!isNotEmptyFormValue[0]) {
      formName.classList.add("input-wrapper-invalid-error");
      nameErrorMsg.classList.remove("disabled-visibility");
    } else {
      formName.classList.remove("input-wrapper-invalid-error");
      nameErrorMsg.classList.add("disabled-visibility");
    }
    if (!isNotEmptyFormValue[1]) {
      formLastName.classList.add("input-wrapper-invalid-error");
      lastNameErrorMsg.classList.remove("disabled-visibility");
    } else {
      lastNameErrorMsg.classList.add("disabled-visibility");
    }
    if (
      !isNotEmptyFormValue[2] ||
      !emailErrorMsg.classList.contains("disabled-visibility")
    ) {
      emailErrorMsg.classList.remove("disabled-visibility");
    } else {
      emailErrorMsg.classList.add("disabled-visibility");
    }
    if (!isNotEmptyFormValue[3]) {
      textareaMsg.classList.remove("disabled-visibility");
    } else {
      textareaMsg.classList.add("disabled-visibility");
    }
    if (!whichRequestIsChecked) {
      requestErrorMsg.classList.remove("disabled-visibility");
    } else {
      requestErrorMsg.classList.add("disabled-visibility");
    }
    if (!dataConsentInput.checked) {
      consentCheckboxMsg.classList.remove("disabled-visibility");
    } else {
      consentCheckboxMsg.classList.add("disabled-visibility");
    }
  };

  if (isFormInvalid) {
    const isDialogHidden =
      dialogLoginSuccess.classList.contains("dialog-hidden");
    if (!isDialogHidden) dialogLoginSuccess.classList.add("dialog-hidden");
    whichErrorsValidExist();
  } else {
    dialogLoginSuccess.classList.remove("dialog-hidden");
  }
};
