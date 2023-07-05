const form = document.querySelector(".js-form");
const fields = document.querySelectorAll(".js-input");

const setStatus = (field, errorMessage) => {
  const formError = field.parentElement.querySelector(".js-error");

  if (errorMessage) {
    formError.innerHTML = `<p class="form__error-message">${errorMessage}</p>`;
    field.setAttribute("aria-invalid", "true");
  } else {
    formError.innerHTML = "";
    field.setAttribute("aria-invalid", "false");
  }
};

const validate = (field) => {
  const isEmpty = field.value.trim().length === 0;
  const emailRegex = /\S+@\S+\.\S+/;
  const passwordRegex =
    /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,16}$/;

  let errorMessage = "";
  if (isEmpty) {
    errorMessage = `${field.previousElementSibling.innerText} cannot be empty`;
  } else if (field.type === "email" && !emailRegex.test(field.value)) {
    errorMessage = "Looks like this is not an email";
  } else if (field.type === "password" && !passwordRegex.test(field.value)) {
    errorMessage = `The Password must not contain any whitespace.
                    The Password must contain at least one uppercase character.
                    The Password must contain at least one lowercase character.
                    The Password must contain at least one digit.
                    The Password must have at least one special symbol.
                    The Password must be 8-16 characters long.`;
  }

  setStatus(field, errorMessage);
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
