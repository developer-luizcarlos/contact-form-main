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
const dialogClose = document.querySelector(".dialog__close");

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
      formLastName.classList.remove("input-wrapper-invalid-error");
      lastNameErrorMsg.classList.add("disabled-visibility");
    }
    if (
      !isNotEmptyFormValue[2] ||
      !emailErrorMsg.classList.contains("disabled-visibility")
    ) {
      formEmail.classList.add("input-wrapper-invalid-error");
      emailErrorMsg.classList.remove("disabled-visibility");
    } else {
      formEmail.classList.remove("input-wrapper-invalid-error");
      emailErrorMsg.classList.add("disabled-visibility");
    }
    if (!isNotEmptyFormValue[3]) {
      formTextarea.classList.add("input-wrapper-invalid-error");
      textareaMsg.classList.remove("disabled-visibility");
    } else {
      formTextarea.classList.remove("input-wrapper-invalid-error");
      textareaMsg.classList.add("disabled-visibility");
    }
    if (!whichRequestIsChecked) {
      requestErrorMsg.classList.remove("disabled-visibility");
    } else {
      requestErrorMsg.classList.add("disabled-visibility");
    }
    if (!dataConsentInput.checked) {
      dataConsentInput.classList.add("input-wrapper-invalid-error");
      consentCheckboxMsg.classList.remove("disabled-visibility");
    } else {
      dataConsentInput.classList.remove("input-wrapper-invalid-error");
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

dialogClose.onclick = () => {
  dialogLoginSuccess.classList.add("dialog-hidden");

  const formElements = [formName, formLastName, formEmail, formTextarea];
  formElements.forEach((element) => {
    element.value = "";
  });

  const errorMsgs = Array.from(
    document.querySelectorAll(".form-main_input-wrapper__error-msg")
  );

  errorMsgs.forEach((element) => {
    if (!element.classList.contains("disabled-visibility")) {
      element.classList.add("disabled-visibility");
    }
  });

  const elementsInputModel = Array.from(
    document.querySelectorAll(".form-main__input-wrapper__input-model")
  );

  elementsInputModel.forEach((element) => {
    if (element.classList.contains("input-wrapper-invalid-error")) {
      element.classList.remove("input-wrapper-invalid-error");
    }
  });

  queryTypeInput.checked = false;
  supportRequestInput.checked = false;
  dataConsentInput.checked = false;
};
