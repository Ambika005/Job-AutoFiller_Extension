const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const phoneInput = document.getElementById('phoneInput');
const saveBtn = document.getElementById('saveBtn');
const editBtn = document.getElementById('editBtn');
const status = document.getElementById('status');

let isSaving = false;

const validators = {
    name: (val) => {
        const regex = /^[a-zA-Z\s]+$/;
        if (val.length < 2) return "Please enter a valid name";
        if (!regex.test(val)) return "Please enter a valid name";
        return null;
    },
    email: (val) => {
        const regex = /^[^@\s]+@gmail\.com$/;
        if (!regex.test(val)) return "Please enter a valid email address";
        return null;
    },
    phone: (val) => {
        const regex = /^\d{10}$/;
        if (!regex.test(val)) return "Please enter a valid phone number";
        return null;
    }
};

const showError = (input, msg) => {
    const errorMsg = document.getElementById(input.id.replace('Input', 'Error'));
    if (msg) {
        input.classList.add('error');
        errorMsg.textContent = msg;
    } else {
        input.classList.remove('error');
        errorMsg.textContent = '';
    }
};

const checkFormValidity = () => {
    const nameValid = !validators.name(nameInput.value.trim());
    const emailValid = !validators.email(emailInput.value.trim());
    const phoneValid = !validators.phone(phoneInput.value.trim());

    const isValid = nameValid && emailValid && phoneValid;

    if (!isSaving) {
        saveBtn.disabled = !isValid;
    }
    return isValid;
};

const handleValidation = (e) => {
    if (isSaving) return;
    const input = e.target;
    const type = input.id.replace('Input', '');
    const val = input.value.trim();

    const error = validators[type](val);
    showError(input, error);
    checkFormValidity();
};

const setInputsDisabled = (disabled) => {
    [nameInput, emailInput, phoneInput].forEach(input => {
        input.disabled = disabled;
    });
};

[nameInput, emailInput, phoneInput].forEach(input => {
    input.addEventListener('input', handleValidation);
    input.addEventListener('blur', handleValidation);
});

chrome.storage.local.get(['userInfo'], (res) => {
    if (res.userInfo) {
        nameInput.value = res.userInfo.name || '';
        emailInput.value = res.userInfo.email || '';
        phoneInput.value = res.userInfo.phone || '';

        setInputsDisabled(true);
        editBtn.style.display = 'block';
        checkFormValidity();
    } else {
        setInputsDisabled(false);
        editBtn.style.display = 'none';
        checkFormValidity();
    }
});

saveBtn.addEventListener('click', () => {
    console.log("Save clicked");

    if (isSaving) return;

    if (!checkFormValidity()) {
        console.log("Form invalid, click ignored");
        return;
    }

    try {
        isSaving = true;
        saveBtn.disabled = true;
        saveBtn.textContent = "Saving...";

        setInputsDisabled(true);
        editBtn.disabled = true;

        const userInfo = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            phone: phoneInput.value.trim()
        };

        setTimeout(() => {
            chrome.storage.local.set({ userInfo }, () => {
                if (chrome.runtime.lastError) {
                    console.error("Storage error:", chrome.runtime.lastError);
                    status.textContent = "Error: " + chrome.runtime.lastError.message;
                    status.style.color = "red";

                    isSaving = false;
                    saveBtn.disabled = false;
                    saveBtn.textContent = "Save Profile";
                    setInputsDisabled(false);
                    return;
                }

                saveBtn.textContent = "Saved \u2713";
                saveBtn.classList.add('saved');

                setTimeout(() => {
                    saveBtn.textContent = "Save Profile";
                    saveBtn.classList.remove('saved');
                    isSaving = false;

                    setInputsDisabled(true);
                    saveBtn.disabled = false;
                    editBtn.style.display = 'block';
                    editBtn.disabled = false;

                }, 2000);
            });
        }, 800);
    } catch (err) {
        console.error("Unexpected error:", err);
        status.textContent = "Error: " + err.message;
        isSaving = false;
        saveBtn.disabled = false;
        saveBtn.textContent = "Save Profile";
    }
});

editBtn.addEventListener('click', () => {
    if (isSaving) return;

    setInputsDisabled(false);
    nameInput.focus();

    saveBtn.textContent = "Save Profile";
    saveBtn.classList.remove('saved');

    checkFormValidity();

    editBtn.style.display = 'none';
});

document.getElementById('fillBtn').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (tab.url.startsWith('chrome://')) {
        status.textContent = "Cannot run on Chrome pages";
        status.style.color = "red";
        setTimeout(() => status.textContent = "", 3000);
        return;
    }

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['scripts/content.js']
    });
});