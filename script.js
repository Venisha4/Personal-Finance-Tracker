document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("loginForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let user = document.getElementById("username").value.trim();
        let pass = document.getElementById("password").value.trim();
        let error = document.getElementById("error");

        // Clear previous error
        error.innerText = "";

        // Validation
        if (user === "" || pass === "") {
            error.innerText = "⚠️ Please fill all fields!";
            return;
        }

        // Temporary login (no database yet)
        if (user === "admin" && pass === "1234") {
            alert("✅ Login successful!");
            window.location.href = "dashboard.html";
        } else {
            error.innerText = "❌ Invalid username or password";
        }
    });

});