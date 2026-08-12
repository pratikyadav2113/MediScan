// sign-up.js
// Handles MediScan sign-up using real Supabase Auth (not localStorage).

// Initialize Supabase client
// Note: this "anon/publishable" key is safe to expose in frontend code.
const sb = window.supabase.createClient(
    "https://jhrhzgaqzykdpjqbupog.supabase.co",
    "sb_publishable_AtXjFnTTxqX-Fm4Tml7vMQ_hMQh3c20"
);

document.addEventListener("DOMContentLoaded"), function () {

    const form = document.getElementById("sign-form");
    const errorDiv = document.getElementById("error");
    const signBtn = document.getElementById("sign-btn");
}

    // Hide the error message by default; only show it when needed
    errorDiv.style.display = "none";

    // Nav "LOGIN" button
    const loginNav = document.getElementById("login");
    if (loginNav) {
        loginNav.onclick = function () {
            window.location.href = "login.html";
        };
    }

    function showError(message) {
        errorDiv.querySelector("p").textContent = message;
        errorDiv.style.display = "block";
    }

    form.addEventListener("submit", async function (e) {
        e.preventDefault(); // stop the form from reloading the page

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim().toLowerCase();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("new-password").value;

        // Check passwords match
        if (password !== confirmPassword) {
            showError("Password do not match");
            return;
        }

        // Password strength rules: 8+ chars, at least one uppercase,
        // one lowercase, and one symbol (special character)
        const hasMinLength = password.length >= 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

        if (!hasMinLength) {
            showError("Password must be at least 8 characters long");
            return;
        }

        if (!hasUppercase) {
            showError("Password must include at least one uppercase letter");
            return;
        }

        if (!hasLowercase) {
            showError("Password must include at least one lowercase letter");
            return;
        }

        if (!hasSymbol) {
            showError("Password must include at least one symbol (e.g. ! @ # $ %)");
            return;
        }

        // Disable the button while we wait for Supabase
        signBtn.disabled = true;
        signBtn.textContent = "Signing up...";

        // Create the account in Supabase Auth, storing the name as user metadata
        const { data, error } = await sb.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    full_name: name
                }
            }
        });

        signBtn.disabled = false;
        signBtn.textContent = "Sign Up";

        if (error) {
            showError(error.message);
            return;
        }

        errorDiv.style.display = "none";
        form.reset();

        // By default, Supabase requires email confirmation before login works.
        // Let the user know, then send them to the login page.
        alert("Account created!");
        // window.location.href = "login.html";

        document.getElementById("log-logo-cntr").innerHTML = `
        <div>
                <img src="Mediscan.png">
                <h1 style="padding-left:2.5rem">MediScan</h1>
                <p>Welcome to MediScan.</p>
            </div>
        
        `

        document.getElementById("sign-up-form").innerHTML = `
  <div style="text-align: center; padding: 2rem;">
    <h2 style="font-family: cursive;">You are successfully registered!!</h2>
    <p>Thanks for your time and efforts.</p>
    <br>
    <a href="index.html" style="font-size: 1.2rem; font-weight: bold; font-family:cursive;">Go to Home Page</a>
  </div>
`;
    });

// sign-up.js
// Handles MediScan sign-up using real Supabase Auth (not localStorage).

// Initialize Supabase client
// Note: this "anon/publishable" key is safe to expose in frontend code.
const sb = window.supabase.createClient(
    "https://jhrhzgaqzykdpjqbupog.supabase.co",
    "sb_publishable_AtXjFnTTxqX-Fm4Tml7vMQ_hMQh3c20"
);

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("sign-form");
    const errorDiv = document.getElementById("error");
    const signBtn = document.getElementById("sign-btn");

    // Hide the error message by default; only show it when needed
    errorDiv.style.display = "none";

    // Nav "LOGIN" button
    const loginNav = document.getElementById("login");
    if (loginNav) {
        loginNav.onclick = function () {
            window.location.href = "login.html";
        };
    }

    function showError(message) {
        errorDiv.querySelector("p").textContent = message;
        errorDiv.style.display = "block";
    }

    form.addEventListener("submit", async function (e) {
        e.preventDefault(); // stop the form from reloading the page

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim().toLowerCase();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("new-password").value;

        // Check passwords match
        if (password !== confirmPassword) {
            showError("Password do not match");
            return;
        }

        // Password strength rules: 8+ chars, at least one uppercase,
        // one lowercase, and one symbol (special character)
        const hasMinLength = password.length >= 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

        if (!hasMinLength) {
            showError("Password must be at least 8 characters long");
            return;
        }

        if (!hasUppercase) {
            showError("Password must include at least one uppercase letter");
            return;
        }

        if (!hasLowercase) {
            showError("Password must include at least one lowercase letter");
            return;
        }

        if (!hasSymbol) {
            showError("Password must include at least one symbol (e.g. ! @ # $ %)");
            return;
        }

        // Disable the button while we wait for Supabase
        signBtn.disabled = true;
        signBtn.textContent = "Signing up...";

        // Create the account in Supabase Auth, storing the name as user metadata
        const { data, error } = await sb.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    full_name: name
                }
            }
        });

        signBtn.disabled = false;
        signBtn.textContent = "Sign Up";

        if (error) {
            showError(error.message);
            return;
        }

        errorDiv.style.display = "none";
        form.reset();

        // By default, Supabase requires email confirmation before login works.
        // Let the user know, then send them to the login page.
        alert("Account created!");
        // window.location.href = "login.html";

        document.getElementById("log-logo-cntr").innerHTML = `
        <div>
                <img src="Mediscan.png">
                <h1 style="padding-left:2.5rem">MediScan</h1>
                <p>Welcome to MediScan.</p>
            </div>
        
        `

        document.getElementById("sign-up-form").innerHTML = `
  <div style="text-align: center; padding: 2rem;">
    <h2 style="font-family: cursive;">You are successfully registered!!</h2>
    <p>Thanks for your time and efforts.</p>
    <br>
    <a href="index.html" style="font-size: 1.2rem; font-weight: bold; font-family:cursive;">Go to Home Page</a>
  </div>
`;
    });

});