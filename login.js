document.getElementById("sign-up").onclick =  function(){
    window.location.href = "sign-up.html";
}

// login.js
// Handles MediScan login using real Supabase Auth (not localStorage).

// Initialize Supabase client (same project as sign-up.js)
const sb = window.supabase.createClient(
    "https://jhrhzgaqzykdpjqbupog.supabase.co",
    "sb_publishable_AtXjFnTTxqX-Fm4Tml7vMQ_hMQh3c20"
);

document.addEventListener("DOMContentLoaded"), function () {

    const form = document.getElementById("login-form");
    const errorDiv = document.getElementById("error");
    const button = document.getElementById("button");
}

    if (errorDiv) {
        errorDiv.style.display = "none";
    }

    // Nav "SIGN UP FOR FREE" button (already wired in login.html's inline script,
    // but keeping this here too in case that inline script is removed later)
    const signUpNav = document.getElementById("sign-up");
    if (signUpNav) {
        signUpNav.onclick = function () {
            window.location.href = "sign-up.html";
        };
    }

    function showError(message) {
        if (errorDiv) {
            errorDiv.querySelector("p").textContent = message;
            errorDiv.style.display = "block";
        } else {
            alert(message);
        }
    }

    form.addEventListener("submit", async function (e) {
        e.preventDefault(); // stop the form from reloading the page

        const email = document.getElementById("email").value.trim().toLowerCase();
        const password = document.getElementById("password").value;

        button.disabled = true;

        const { data, error } = await sb.auth.signInWithPassword({
            email: email,
            password: password
        });

        button.disabled = false;

        if (error) {
            showError(error.message);
            return;
        }

        if (errorDiv) {
            errorDiv.style.display = "none";
        }

        // Supabase automatically stores the session securely (in localStorage
        // under its own key) and keeps the user logged in across page loads.
        // You can check sb.auth.getUser() on any page to see who's logged in.

        window.location.href = "index.html";
    });

// login.js
// Handles MediScan login using real Supabase Auth (not localStorage).

// Initialize Supabase client (same project as sign-up.js)
const sb = window.supabase.createClient(
    "https://jhrhzgaqzykdpjqbupog.supabase.co",
    "sb_publishable_AtXjFnTTxqX-Fm4Tml7vMQ_hMQh3c20"
);

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("login-form");
    const errorDiv = document.getElementById("error");
    const button = document.getElementById("button");

    if (errorDiv) {
        errorDiv.style.display = "none";
    }

    // Nav "SIGN UP FOR FREE" button (already wired in login.html's inline script,
    // but keeping this here too in case that inline script is removed later)
    const signUpNav = document.getElementById("sign-up");
    if (signUpNav) {
        signUpNav.onclick = function () {
            window.location.href = "sign-up.html";
        };
    }

    function showError(message) {
        if (errorDiv) {
            errorDiv.querySelector("p").textContent = message;
            errorDiv.style.display = "block";
        } else {
            alert(message);
        }
    }

    form.addEventListener("submit", async function (e) {
        e.preventDefault(); // stop the form from reloading the page

        const email = document.getElementById("email").value.trim().toLowerCase();
        const password = document.getElementById("password").value;

        button.disabled = true;

        const { data, error } = await sb.auth.signInWithPassword({
            email: email,
            password: password
        });

        button.disabled = false;

        if (error) {
            showError(error.message);
            return;
        }

        if (errorDiv) {
            errorDiv.style.display = "none";
        }

        // Supabase automatically stores the session securely (in localStorage
        // under its own key) and keeps the user logged in across page loads.
        // You can check sb.auth.getUser() on any page to see who's logged in.

        window.location.href = "index.html";
    });

});