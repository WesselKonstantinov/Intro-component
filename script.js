const form = document.querySelector(".js-form");
const fields = document.querySelectorAll(".js-input");

const setStatus = (field, message = "") => {
  const formErrorMessage = field.parentElement.querySelector(
    ".js-form-error-message"
  );

  if (message) {
    formErrorMessage.innerText = message;
    field.setAttribute("aria-invalid", "true");
  } else {
    formErrorMessage.innerText = "";
    field.removeAttribute("aria-invalid");
  }
};

const validate = (field) => {
  const isEmpty = field.value.trim() === "";

  if (field.type === "text") {
    if (isEmpty) {
      setStatus(
        field,
        `${field.previousElementSibling.innerText} cannot be empty`
      );
    } else {
      setStatus(field);
    }
  } else if (field.type === "email") {
    const emailRegex = /\S+@\S+\.\S+/;

    if (isEmpty) {
      setStatus(
        field,
        `${field.previousElementSibling.innerText} cannot be empty`
      );
    } else if (!emailRegex.test(field.value)) {
      setStatus(field, "Looks like this is not an email");
    } else {
      setStatus(field);
    }
  } else if (field.type === "password") {
    const passwordRegex =
      /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,16}$/;

    if (field.value.length === 0) {
      setStatus(
        field,
        `${field.previousElementSibling.innerText} cannot be empty`
      );
    } else if (!passwordRegex.test(field.value)) {
      setStatus(
        field,
        `The Password must not contain any whitespace.
        The Password must contain at least one uppercase character.
        The Password must contain at least one lowercase character.
        The Password must contain at least one digit.
        The Password must have at least one special symbol.
        The Password must be 8-16 characters long.`
      );
    } else {
      setStatus(field);
    }
  }
};

fields.forEach((field) => {
  field.addEventListener("input", (e) => validate(e.target));
  field.addEventListener("blur", (e) => validate(e.target));
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fields.forEach((field) => validate(field));
  if (
    Array.from(fields).some(
      (field) => field.getAttribute("aria-invalid") === "true"
    )
  ) {
    form.querySelector("[aria-invalid='true']").focus();
  } else {
    console.log("Successfully submitted");
  }
});
