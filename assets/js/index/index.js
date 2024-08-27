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

// verify if the input value is empty for check name, lastname and textarea fields;
const validityInputValue = (value, errorMsgElement) => {
  if (!value.trim()) errorMsgElement.classList.remove("disabled-visibility");
  else errorMsgElement.classList.add("disabled-visibility");
};

// verify if email's value is valid;
const isEmailAddressValid = (emailValue, errorMsgElement) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailValid = emailRegex.test(emailValue);
  if (!emailValid) errorMsgElement.classList.remove("disabled-visibility");
  else errorMsgElement.classList.add("disabled-visibility");
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

  if (isFormInvalid) alert("Valores inválidos");
  else alert("Tudo ok");
  console.log(whichRequestIsChecked);
};
