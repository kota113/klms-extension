const targetUrl = "https://lms.keio.jp";

// Load cookies from storage and set them for the target URL
chrome.runtime.onStartup.addListener(() => {
    chrome.storage.local.get(["cookies"], (result) => {
        if (result.cookies) {
            const cookies = JSON.parse(result.cookies);
            cookies.forEach((cookie) => {
                chrome.cookies.set({ ...cookie, url: targetUrl });
            });
            console.log("Cookies loaded and set:", cookies);
        }
    });
});

// Save cookies to storage whenever they are changed
chrome.cookies.onChanged.addListener((changeInfo) => {
    if (changeInfo.cookie.domain.includes("keio.jp") && changeInfo.removed === false) {
        chrome.cookies.getAll({ domain: changeInfo.cookie.domain }, (cookies) => {
            chrome.storage.local.set({ cookies: JSON.stringify(cookies) });
            console.log("Cookies saved:", cookies);
        });
    }
});
