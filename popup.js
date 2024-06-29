document.getElementById("clearCookies").addEventListener("click", () => {
    chrome.storage.local.remove("cookies", () => {
        chrome.cookies.getAll({ domain: "keio.jp" }, (cookies) => {
            cookies.forEach((cookie) => {
                chrome.cookies.remove({
                    url: `https://${cookie.domain}${cookie.path}`,
                    name: cookie.name,
                });
            });
        });
        alert("Cookieをリセットしました。");
    });
});
