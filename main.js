document.getElementById("sign-up").onclick = function(){
    window.location.href = "sign-up.html";
}

document.getElementById("login").onclick = function(){
    window.location.href = "login.html";
}


const sb = window.supabase.createClient(
    "https://jhrhzgaqzykdpjqbupog.supabase.co",
    "sb_publishable_AtXjFnTTxqX-Fm4Tml7vMQ_hMQh3c20"
);

document.addEventListener("DOMContentLoaded", async function () {
    const lgnSgnCntr = document.getElementById("lgn-sgn-cntr");

    try {

        const { data: { user } } = await sb.auth.getUser();

        if (user) {
            const userName = user.user_metadata?.full_name || user.email.split("@")[0];

            
            const welcomeModalHTML = `
                <div id="welcome-modal" style="
                    display: none; 
                    position: fixed; 
                    top: 0; 
                    left: 0; 
                    width: 100vw; 
                    height: 100vh; 
                    background: rgba(0, 0, 0, 0.4); 
                    backdrop-filter: blur(8px); 
                    -webkit-backdrop-filter: blur(8px); 
                    justify-content: center; 
                    align-items: center; 
                    z-index: 2000;
                ">
                    <div style="
                        background-color: #FFF9E8; 
                        border: 0.2rem solid black; 
                        border-radius: 1.5rem; 
                        padding: 2.5rem 2rem; 
                        text-align: center; 
                        box-shadow: 10px 5px 5px red; 
                        font-family: cursive; 
                        max-width: 400px; 
                        width: 85%;
                    ">
                        <h1 style="color: #1F2937; margin-bottom: 0.5rem; font-size: 2rem;">Welcome to MediScan!</h1>
                        <p style="color: #183153; margin-bottom: 1.5rem; font-size: 1.2rem; font-weight: bold;">
                            Hello, ${userName} 👋
                        </p>
                        <button id="close-welcome" style="
                            background-color: #25ff67; 
                            color: #1F2937; 
                            border: 0.1rem solid black; 
                            padding: 0.6rem 1.8rem; 
                            border-radius: 1rem; 
                            cursor: pointer; 
                            font-family: cursive; 
                            font-size: 1.1rem;
                            font-weight: bold;
                        ">Continue</button>
                    </div>
                </div>
            `;


            const logoutModalHTML = `
                <div id="logout-modal" style="
                    display: none; 
                    position: fixed; 
                    top: 0; 
                    left: 0; 
                    width: 100vw; 
                    height: 100vh; 
                    background: rgba(0, 0, 0, 0.4); 
                    backdrop-filter: blur(8px); 
                    -webkit-backdrop-filter: blur(8px); 
                    justify-content: center; 
                    align-items: center; 
                    z-index: 2000;
                ">
                    <div style="
                        background-color: #FFF9E8; 
                        border: 0.2rem solid black; 
                        border-radius: 1.5rem; 
                        padding: 2rem; 
                        text-align: center; 
                        box-shadow: 10px 5px 5px red; 
                        font-family: cursive; 
                        max-width: 350px; 
                        width: 80%;
                    ">
                        <h2 style="color: #1F2937; margin-bottom: 0.5rem;">Log Out</h2>
                        <p style="color: #183153; margin-bottom: 1.5rem; font-size: 1rem;">Are you sure you want to log out?</p>
                        <div style="display: flex; justify-content: space-around; gap: 1rem;">
                            <button id="confirm-logout" style="
                                background-color: #ff3b3b; 
                                color: white; 
                                border: 0.1rem solid black; 
                                padding: 0.5rem 1.2rem; 
                                border-radius: 0.8rem; 
                                cursor: pointer; 
                                font-family: cursive; 
                                font-size: 1rem;
                            ">Yes, Log Out</button>
                            <button id="cancel-logout" style="
                                background-color: rgb(220, 220, 199); 
                                color: #1F2937; 
                                border: 0.1rem solid black; 
                                padding: 0.5rem 1.2rem; 
                                border-radius: 0.8rem; 
                                cursor: pointer; 
                                font-family: cursive; 
                                font-size: 1rem;
                            ">Cancel</button>
                        </div>
                    </div>
                </div>
            `;

            document.body.insertAdjacentHTML("beforeend", welcomeModalHTML + logoutModalHTML);

            if (lgnSgnCntr) {
                lgnSgnCntr.innerHTML = `
                    <span style="font-family: cursive; font-weight: 600; font-size: 1.1rem; color: #1F2937; margin-right: 1rem;">
                        Hi, ${userName}
                    </span>
                    <button id="logout-btn" style="
                        color: #1F2937;
                        font-size: 1rem;
                        font-weight: 600;
                        font-family: cursive;
                        padding: 0.5rem 1rem;
                        border: 0.1rem solid black;
                        border-radius: 5rem;
                        cursor: pointer;
                        background-color: beige;
                    ">LOG OUT</button>
                `;
            }


            const welcomeModal = document.getElementById("welcome-modal");
            if (welcomeModal) {
                welcomeModal.style.display = "flex";
            }

            
            document.getElementById("close-welcome")?.addEventListener("click", function () {
                document.getElementById("welcome-modal")?.remove();
            });

            document.getElementById("logout-btn")?.addEventListener("click", function () {
                const logoutModal = document.getElementById("logout-modal");
                if (logoutModal) logoutModal.style.display = "flex";
            });

            document.getElementById("cancel-logout")?.addEventListener("click", function () {
                const logoutModal = document.getElementById("logout-modal");
                if (logoutModal) logoutModal.style.display = "none";
            });

            document.getElementById("confirm-logout")?.addEventListener("click", async function () {
                await sb.auth.signOut();
                window.location.reload();
            });

        } else {

            const loginBtn = document.getElementById("login");
            const signUpBtn = document.getElementById("sign-up");

            if (loginBtn) {
                loginBtn.onclick = () => window.location.href = "login.html";
            }
            if (signUpBtn) {
                signUpBtn.onclick = () => window.location.href = "sign-up.html";
            }
        }
    } catch (err) {
        console.error("Auth check failed:", err);
    } finally {

        if (lgnSgnCntr) {
            lgnSgnCntr.style.opacity = "1";
        }
    }
});


const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const previewContainer = document.getElementById('preview-container');
const fileNameDisplay = document.getElementById('file-name');
const removeBtn = document.getElementById('remove-btn');
const submitBtn = document.getElementById('submit-btn');

let selectedFile = null;

dropZone.addEventListener('click', () => fileInput.click());

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
});

['dragleave', 'dragend'].forEach(type => {
    dropZone.addEventListener(type, () => dropZone.classList.remove('drag-over'));
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    if (e.dataTransfer.files.length) {
        handleFile(e.dataTransfer.files[0]);
    }
});

fileInput.addEventListener('change', () => {
    if (fileInput.files.length) {
        handleFile(fileInput.files[0]);
    }
});

function handleFile(file) {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
        alert('Please upload a valid image (JPG, PNG).');
        return;
    }

    if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds the 5MB limit.');
        return;
    }

    selectedFile = file;
    fileNameDisplay.textContent = file.name;
    previewContainer.style.display = 'flex';
    submitBtn.disabled = false;
}

removeBtn.addEventListener('click', () => {
    selectedFile = null;
    fileInput.value = '';
    previewContainer.style.display = 'none';
    submitBtn.disabled = true;

    
    const statusBox = document.getElementById('ocr-status');
    const resultBox = document.getElementById('ocr-result');
    if (statusBox) statusBox.style.display = 'none';
    if (resultBox) resultBox.style.display = 'none';
});


const STORES = [
    { name: 'Amazon Pharmacy', url: name => `https://www.amazon.com/s?k=${encodeURIComponent(name)}+pharmacy` },
    { name: 'GoodRx', url: name => `https://www.goodrx.com/${encodeURIComponent(name.toLowerCase())}` },
    { name: 'Walgreens', url: name => `https://www.walgreens.com/search/results.jsp?Ntt=${encodeURIComponent(name)}` },
    { name: 'CVS Pharmacy', url: name => `https://www.cvs.com/search?searchTerm=${encodeURIComponent(name)}` }
];


function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

async function scanWithGemini(file) {
    const apiKey = "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";
    const rawBase64 = await fileToBase64(file);

    const requestBody = {
        model: "openrouter/free", 
        messages: [
            {
                role: "user",
                content: [
                    {
                        type: "text",
                        text: "You are an expert pharmacist. Read this medical prescription image (including complex doctor handwriting). Extract all text and list only the identified medication/drug names in valid JSON format: {\"raw_text\": \"full text transcribed...\", \"medicines\": [\"Medicine 1\", \"Medicine 2\"]}"
                    },
                    {
                        type: "image_url",
                        image_url: {
                            url: rawBase64
                        }
                    }
                ]
            }
        ]
    };

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": window.location.href, 
            "X-Title": "MediScan"
        },
        body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `API Error Status: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    const cleanJson = content.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanJson);
}


function renderStoreLinks(medicineList) {
    const linksContainer = document.getElementById('store-links');
    if (!linksContainer) return;
    
    linksContainer.innerHTML = '';

    if (!medicineList || medicineList.length === 0) {
        linksContainer.innerHTML = `<p style="font-size: 0.9rem; color: #6b7280; font-family: cursive;">No clear medication names detected. You can search manually.</p>`;
        return;
    }

    medicineList.forEach(med => {
        const medSection = document.createElement('div');
        medSection.style.marginBottom = '1rem';
        
        let html = `<p style="font-family: cursive; font-weight: bold; margin-bottom: 0.4rem; color: #1F2937;">Buy <span style="color: #2563eb;">${med}</span> on:</p>`;
        html += `<div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">`;

        STORES.forEach(store => {
            const storeUrl = store.url(med);
            html += `
                <a href="${storeUrl}" target="_blank" rel="noopener noreferrer" style="
                    text-decoration: none;
                    background: #25ff67;
                    color: #1F2937;
                    padding: 0.4rem 0.8rem;
                    border: 0.1rem solid #000;
                    border-radius: 0.5rem;
                    font-size: 0.85rem;
                    font-weight: bold;
                    font-family: cursive;
                ">
                    ${store.name} ↗
                </a>
            `;
        });

        html += `</div>`;
        medSection.innerHTML = html;
        linksContainer.appendChild(medSection);
    });
}

submitBtn.addEventListener('click', async () => {
    if (!selectedFile) return;

    const statusBox = document.getElementById('ocr-status');
    const resultBox = document.getElementById('ocr-result');
    const extractedText = document.getElementById('extracted-text');

    // Reset display states
    if (resultBox) resultBox.style.display = 'none';
    if (statusBox) {
        statusBox.style.display = 'block';
        statusBox.style.color = '#15803d'; // Green text
        statusBox.style.backgroundColor = '#f0fdf4';
        statusBox.style.borderColor = '#bbf7d0';
        statusBox.textContent = 'Analyzing prescription....';
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Scanning...';

    try {
        const result = await scanWithGemini(selectedFile);

        // Display raw transcript
        if (statusBox) statusBox.textContent = 'Prescription analyzed successfully!';
        if (extractedText) extractedText.textContent = result.raw_text || 'No readable text found in the image.';
        if (resultBox) resultBox.style.display = 'block';

        // Render pharmacy buy links directly from AI-extracted medicine names
        renderStoreLinks(result.medicines || []);

    } catch (err) {
        console.error('AI Vision Error:', err);
        if (statusBox) {
            statusBox.style.color = '#dc2626';
            statusBox.style.backgroundColor = '#fef2f2';
            statusBox.style.borderColor = '#fca5a5';
            statusBox.textContent = 'Failed to analyze prescription. Please try again...';
        }
    } finally {
        submitBtn.textContent = 'Scan Medicines';
        submitBtn.disabled = false;
    }
});