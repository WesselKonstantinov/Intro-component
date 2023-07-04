class FormValidator {
  constructor(form, fields) {
    this.form = form;
    this.fields = fields;
  }

  initialize() {
    this.validateOnEntry();
    this.validateOnSubmit();
  }

  validateOnSubmit() {
    let self = this;

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      self.fields.forEach((field) => {
        const input = document.querySelector(`.js-${field}-field`);
        self.validateFields(input);
      });
    });
  }

  validateOnEntry() {
    let self = this;
    this.fields.forEach((field) => {
      const input = document.querySelector(`.js-${field}-field`);
      input.addEventListener("input", () => self.validateFields(input));
    });
  }

  validateFields(field) {
    const isEmpty = field.value.trim() === "";

    if (field.type === "text") {
      if (isEmpty) {
        this.setStatus(
          field,
          `${field.previousElementSibling.innerText} cannot be empty`,
          "error"
        );
      } else {
        this.setStatus(field, null, "success");
      }
    } else if (field.type === "email") {
      const emailRegex = /\S+@\S+\.\S+/;

      if (isEmpty) {
        this.setStatus(
          field,
          `${field.previousElementSibling.innerText} cannot be empty`,
          "error"
        );
      } else if (!emailRegex.test(field.value)) {
        this.setStatus(field, "Looks like this is not an email", "error");
      } else {
        this.setStatus(field, null, "success");
      }
    } else if (field.type === "password") {
      const passwordRegex =
        /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,16}$/;

      if (field.value.length === 0) {
        this.setStatus(
          field,
          `${field.previousElementSibling.innerText} cannot be empty`,
          "error"
        );
      } else if (!passwordRegex.test(field.value)) {
        this.setStatus(
          field,
          `The Password must not contain any whitespace.
        The Password must contain at least one uppercase character.
        The Password must contain at least one lowercase character.
        The Password must contain at least one digit.
        The Password must have at least one special symbol.
        The Password must be 8-16 characters long.`,
          "error"
        );
      } else {
        this.setStatus(field, null, "success");
      }
    }
  }

  setStatus(field, message, status) {
    const formErrorMessage = field.parentElement.querySelector(
      ".js-form-error-message"
    );

    if (status === "success") {
      formErrorMessage.innerText = "";
      field.removeAttribute("aria-invalid");
    }

    if (status === "error") {
      formErrorMessage.innerText = message;
      field.setAttribute("aria-invalid", "true");
    }
  }
}

const form = document.querySelector(".js-form");
const fields = ["first-name", "last-name", "email", "password"];

const formValidator = new FormValidator(form, fields);
formValidator.initialize();
