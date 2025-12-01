document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registrationForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");

  [nameInput, emailInput, passwordInput, confirmPasswordInput].forEach(
    (input) => {
      input.addEventListener("input", () => clearError(input));
    }
  );
  // Toggle Show Passord
  document.querySelectorAll(".toggle-password").forEach((button) => {
    button.addEventListener("click", function () {
      const target = document.getElementById(this.getAttribute("data-target"));
      target.type = target.type === "password" ? "text" : "password";
      this.textContent = target.type === "password" ? "👁️" : "👁️‍🗨️";
    });
  });

  // Validation
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let isValid = true;

    clearError(nameInput);
    clearError(emailInput);
    clearError(passwordInput);
    clearError(confirmPasswordInput);

    if (!nameInput.value.trim()) {
      showError(nameInput, "Name is required");
      isValid = false;
    }

    if (!emailInput.value.trim()) {
      showError(emailInput, "Email is required");
      isValid = false;
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value)) {
        showError(emailInput, "Invalid email format");
        isValid = false;
      }
    }

    if (!passwordInput.value.trim()) {
      showError(passwordInput, "Password is required");
      isValid = false;
    } else if (!validatePasswordStrength(passwordInput)) {
      isValid = false;
    }

    if (!confirmPasswordInput.value.trim()) {
      showError(confirmPasswordInput, "Confirm password is required");
      isValid = false;
    } else if (!validatePasswordMatch(passwordInput, confirmPasswordInput)) {
      isValid = false;
    }

    if (isValid) {
      alert("Registration successful!");
      form.reset();
    }
  });
});

// Start Helper Functions
function showError(input, message) {
  input.classList.add("error");

  let errorDiv;
  const wrapper = input.closest(".password-wrapper");
  errorDiv = wrapper
    ? wrapper.parentElement.querySelector(".error-message")
    : input.parentElement.querySelector(".error-message");

  if (errorDiv) {
    errorDiv.textContent = message;
    errorDiv.style.display = "block";
  }
}

function clearError(input) {
  input.classList.remove("error");

  let errorDiv;
  const wrapper = input.closest(".password-wrapper");
  errorDiv = wrapper
    ? wrapper.parentElement.querySelector(".error-message")
    : input.parentElement.querySelector(".error-message");

  if (errorDiv) {
    errorDiv.textContent = "";
    errorDiv.style.display = "none";
  }
}

function validatePasswordStrength(input) {
  const hasUpperCase = /[A-Z]/.test(input.value);
  const hasLowerCase = /[a-z]/.test(input.value);
  const hasNumber = /\d/.test(input.value);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
    input.value
  );
  const hasLength = input.value.length >= 8;

  let message = "Password must contain:\n";
  if (!hasLength) message += "• At least 8 characters\n";
  if (!hasUpperCase) message += "• At least one uppercase letter\n";
  if (!hasLowerCase) message += "• At least one lowercase letter\n";
  if (!hasNumber) message += "• At least one number\n";
  if (!hasSpecialChar) message += "• At least one special character\n";

  if (
    !hasLength ||
    !hasUpperCase ||
    !hasLowerCase ||
    !hasNumber ||
    !hasSpecialChar
  ) {
    showError(input, message);
    return false;
  }
  return true;
}

function validatePasswordMatch(passwordInput, confirmPasswordInput) {
  if (passwordInput.value !== confirmPasswordInput.value) {
    showError(confirmPasswordInput, "Passwords do not match");
    return false;
  }
  return true;
}

// // JavaScript code for validating the registration form
// document.addEventListener("DOMContentLoaded", function () {
//   const form = document.getElementById("registrationForm");
//   const nameInput = document.getElementById("name");
//   const emailInput = document.getElementById("email");
//   const passwordInput = document.getElementById("password");
//   const confirmPasswordInput = document.getElementById("confirmPassword");

//   // Real-time validation: remove error when user types (only for name and email)
//   [nameInput, emailInput].forEach(
//     (input) => {
//       input.addEventListener("input", function () {
//         clearError(this);
//       });
//     }
//   );

//   // Clear error for password fields when user types
//   [passwordInput, confirmPasswordInput].forEach(
//     (input) => {
//       input.addEventListener("input", function () {
//         clearError(this);
//       });
//     }
//   );

//   // Toggle password visibility
//   const toggleButtons = document.querySelectorAll(".toggle-password");
//   toggleButtons.forEach((button) => {
//     button.addEventListener("click", function () {
//       const targetId = this.getAttribute("data-target");
//       const input = document.getElementById(targetId);

//       if (input.type === "password") {
//         input.type = "text";
//         this.textContent = "👁️‍🗨️";
//       } else {
//         input.type = "password";
//         this.textContent = "👁️";
//       }
//     });
//   });

//   form.addEventListener("submit", function (event) {
//     event.preventDefault();
//     let isValid = true;

//     // Clear all previous errors
//     [nameInput, emailInput, passwordInput, confirmPasswordInput].forEach(
//       (input) => {
//         clearError(input);
//       }
//     );

//     // Validate name
//     if (!nameInput.value.trim()) {
//       showError(nameInput, "Name is required");
//       isValid = false;
//     }

//     // Validate email
//     if (!emailInput.value.trim()) {
//       showError(emailInput, "Email Is Required");
//       isValid = false;
//     } else {
//       const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!emailPattern.test(emailInput.value)) {
//         showError(emailInput, "Invalid email format");
//         isValid = false;
//       }
//     }

//     // Validate password
//     if (!passwordInput.value) {
//       showError(passwordInput, "Password is required");
//       isValid = false;
//     } else {
//       if (!validatePasswordStrength(passwordInput)) {
//         isValid = false;
//       }
//     }

//     // Validate confirm password
//     if (!confirmPasswordInput.value) {
//       showError(confirmPasswordInput, "Confirm Password is required");
//       isValid = false;
//     } else if (passwordInput.value && !validatePasswordMatch()) {
//       isValid = false;
//     }

//     // If form is valid, show success message
//     if (isValid) {
//       alert("Registration successful!");
//       form.reset();
//     }
//   });

//   // Function to show error
//   function showError(input, message) {
//     input.classList.add("error");
//     let errorDiv;

//     // Check if input is wrapped in password-wrapper
//     const wrapper = input.closest(".password-wrapper");
//     if (wrapper) {
//       errorDiv = wrapper.parentElement.querySelector(".error-message");
//     } else {
//       errorDiv = input.parentElement.querySelector(".error-message");
//     }

//     if (errorDiv) {
//       errorDiv.textContent = message;
//       errorDiv.style.display = "block";
//     }
//   }

//   // Function to clear error
//   function clearError(input) {
//     input.classList.remove("error");
//     let errorDiv;

//     // Check if input is wrapped in password-wrapper
//     const wrapper = input.closest(".password-wrapper");
//     if (wrapper) {
//       errorDiv = wrapper.parentElement.querySelector(".error-message");
//     } else {
//       errorDiv = input.parentElement.querySelector(".error-message");
//     }

//     if (errorDiv) {
//       errorDiv.textContent = "";
//       errorDiv.style.display = "none";
//     }
//   }

//   // Function to validate password strength
//   function validatePasswordStrength(input) {
//     const hasUpperCase = /[A-Z]/.test(input.value);
//     const hasLowerCase = /[a-z]/.test(input.value);
//     const hasNumber = /\d/.test(input.value);
//     const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(input.value);
//     const hasLength = input.value.length >= 8;

//     let message = "Password must contain:\n";
//     if (!hasLength) message += "• At least 8 characters\n";
//     if (!hasUpperCase) message += "• At least one uppercase letter\n";
//     if (!hasLowerCase) message += "• At least one lowercase letter\n";
//     if (!hasNumber) message += "• At least one number\n";
//     if (!hasSpecialChar) message += "• At least one special character\n";

//     if (!hasLength || !hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
//       showError(input, message);
//       return false;
//     }
//     return true;
//   }

//   // Function to validate password match
//   function validatePasswordMatch() {
//     if (passwordInput.value !== confirmPasswordInput.value) {
//       showError(confirmPasswordInput, "Passwords do not match");
//       return false;
//     }
//     return true;
//   }
// });
