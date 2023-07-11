const form = document.querySelector(".js-form");
const thanksCard = document.querySelector(".js-thanks");
const fields = document.querySelectorAll(".js-input");

const setInputStatus = (field, errorMessage) => {
  const formError = field.parentElement.querySelector(".js-error");

  if (errorMessage) {
    if (errorMessage.includes("\n")) {
      const passwordRequirementsList = document.createElement("ol");
      passwordRequirementsList.classList.add("form__error-message-list");

      // Allow password strength feedback to dynamically update
      formError.innerHTML = "";

      if (!formError.hasChildNodes()) {
        formError.appendChild(passwordRequirementsList);
      }

      const passwordRequirements = errorMessage.trim().split("\n");
      passwordRequirements.forEach((passwordRequirement) => {
        const passwordRequirementsListItem = document.createElement("li");
        passwordRequirementsListItem.classList.add("form__error-message");
        passwordRequirementsListItem.innerText = passwordRequirement;
        passwordRequirementsList.appendChild(passwordRequirementsListItem);
      });
    } else {
      formError.innerHTML = `<p class="form__error-message">${errorMessage}</p>`;
    }
    field.setAttribute("aria-invalid", "true");
  } else {
    formError.innerHTML = "";
    field.setAttribute("aria-invalid", "false");
  }
};

const getPasswordStrengthFeedback = (password) => {
  let passwordStrengthFeedback = "";

  const containsWhitespace = /^(?=.*\s)/;
  if (containsWhitespace.test(password)) {
    passwordStrengthFeedback +=
      "The password must not contain any whitespace.\n";
  }

  const containsUppercase = /^(?=.*[A-Z])/;
  if (!containsUppercase.test(password)) {
    passwordStrengthFeedback +=
      "The password must contain at least one uppercase character.\n";
  }

  const containsLowercase = /^(?=.*[a-z])/;
  if (!containsLowercase.test(password)) {
    passwordStrengthFeedback +=
      "The password must contain at least one lowercase character.\n";
  }

  const containsNumber = /^(?=.*[0-9])/;
  if (!containsNumber.test(password)) {
    passwordStrengthFeedback +=
      "The password must contain at least one digit.\n";
  }

  const containsSymbol = /^(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹])/;
  if (!containsSymbol.test(password)) {
    passwordStrengthFeedback +=
      "The password must have at least one special symbol.\n";
  }

  const hasValidLength = /^.{8,16}$/;
  if (!hasValidLength.test(password)) {
    passwordStrengthFeedback += "The password must be 8-16 characters long.\n";
  }

  return passwordStrengthFeedback;
};

const validateInput = (field) => {
  const isEmpty =
    field.type === "password"
      ? field.value.length === 0 // Set up a separate check for whitespace characters in passwords
      : field.value.trim().length === 0;
  const emailRegex = /\S+@\S+\.\S+/;

  let errorMessage;
  if (isEmpty) {
    errorMessage = `${field.previousElementSibling.innerText} cannot be empty`;
  } else if (field.type === "email" && !emailRegex.test(field.value)) {
    errorMessage = "Looks like this is not an email";
  } else if (field.type === "password" && !isEmpty) {
    errorMessage = getPasswordStrengthFeedback(field.value);
  }

  setInputStatus(field, errorMessage);
};

fields.forEach((field) => {
  field.addEventListener("change", (e) => {
    e.target.setAttribute("data-touched", "true");
  });

  field.addEventListener("input", (e) => {
    if (e.target.getAttribute("data-touched") !== "true") {
      return;
    }
    validateInput(e.target);
  });
  field.addEventListener("blur", (e) => {
    if (e.target.getAttribute("data-touched") !== "true") {
      return;
    }
    validateInput(e.target);
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fields.forEach((field) => {
    field.setAttribute("data-touched", "true");
    validateInput(field);
  });
  if (
    Array.from(fields).some(
      (field) => field.getAttribute("aria-invalid") === "true"
    )
  ) {
    form.querySelector("[aria-invalid='true']").focus();
  } else {
    form.hidden = true;
    thanksCard.hidden = false;
  }
});
