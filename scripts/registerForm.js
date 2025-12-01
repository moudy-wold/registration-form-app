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
 