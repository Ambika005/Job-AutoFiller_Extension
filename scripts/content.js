(function () {
    chrome.storage.local.get(['userInfo'], (res) => {
        if (!res.userInfo) {
            console.warn("No user info saved in the extension.");
            return;
        }

        const data = res.userInfo;
        const inputs = document.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            if (input.type === 'hidden' || input.offsetParent === null) return;

            const ariaLabel = input.getAttribute('aria-label') || '';
            const placeholder = input.placeholder || '';
            const parentText = input.closest('div')?.innerText || '';

            const identifier = (input.id + input.name + placeholder + ariaLabel + parentText).toLowerCase();

            let valueToFill = "";

            if (/full\s*name|first\s*name|name/i.test(identifier)) {
                valueToFill = data.name;
            } else if (/email|mail/i.test(identifier)) {
                valueToFill = data.email;
            } else if (/phone|mobile|contact|whatsapp/i.test(identifier)) {
                valueToFill = data.phone;
            }

            if (valueToFill) {
                input.value = valueToFill;

                input.dispatchEvent(new Event('input', { bubbles: true }));
                input.dispatchEvent(new Event('change', { bubbles: true }));

                input.style.backgroundColor = '#e8f0fe';
                input.style.border = '1px solid #007bff';
            }
        });
    });
})();