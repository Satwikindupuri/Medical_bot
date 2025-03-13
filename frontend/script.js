document.addEventListener("DOMContentLoaded", function () {
    console.log("script.js loaded successfully!"); 
});
console.log("Script Loaded");
document.addEventListener("DOMContentLoaded", function () {
    // 🎯 Select elements
    const loginForm = document.querySelector("#login-form");
    const registerForm = document.querySelector("#register-form");
    const passwordFields = document.querySelectorAll(".password-toggle");
    const errorMessage = document.querySelector(".error-message");

    // ✅ Login Form Validation
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent default form submission

            const email = document.querySelector("#login-email").value.trim();
            const password = document.querySelector("#login-password").value.trim();

            if (email === "" || password === "") {
                showError("Please fill in all fields!");
            } else {
                this.submit(); // Submit if valid
            }
        });
    }

    // ✅ Register Form Validation
    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.querySelector("#register-name").value.trim();
            const email = document.querySelector("#register-email").value.trim();
            const password = document.querySelector("#register-password").value.trim();

            if (name === "" || email === "" || password === "") {
                showError("All fields are required!");
            } else if (password.length < 6) {
                showError("Password must be at least 6 characters!");
            } else {
                this.submit();
            }
        });
    }

    // 👀 Toggle Password Visibility
    passwordFields.forEach(field => {
        field.addEventListener("click", function () {
            let input = this.previousElementSibling;
            input.type = input.type === "password" ? "text" : "password";
            this.textContent = input.type === "password" ? "👁️" : "🙈";
        });
    });

    // ❌ Show Error Message
    function showError(message) {
        if (errorMessage) {
            errorMessage.textContent = message;
            errorMessage.style.display = "block";
            setTimeout(() => errorMessage.style.display = "none", 3000);
        }
    }
});

// ✅ Fetch Diagnosis from AI Model
document.getElementById("diagnosisForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let symptoms = document.getElementById("symptoms").value.trim();
    symptoms = symptoms ? symptoms.split(",").map(s => s.trim()) : [];

    fetch("http://127.0.0.1:5000/predict", {  // Ensure URL is correct
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "symptoms": symptoms })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("result").innerText = "Diagnosis: " + data.diagnosis;
    })
    .catch(error => console.error("Error:", error));
});
