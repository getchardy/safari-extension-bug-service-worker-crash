browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type == "test-msg") {
        sendResponse({ response: "hello" })
    }
});

