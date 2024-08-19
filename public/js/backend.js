document.addEventListener("DOMContentLoaded", () => {
  const callbackForm = document.querySelector("#callback-form");
  if (callbackForm) {
    callbackForm.addEventListener("submit", (event) => {
      event.preventDefault();
      callbackForm.validator.validate();
      if (callbackForm.validator.valid) {
        // Do something
        console.log("Form validated and ready for submit");
      }
    });
  }
});
