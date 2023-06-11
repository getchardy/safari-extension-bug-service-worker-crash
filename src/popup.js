
document.getElementById('openButton').addEventListener('click', () => {
  const extensionPageUrl = browser.runtime.getURL('index.html')
  browser.tabs.create({ url: extensionPageUrl })
})
  
document.getElementById('sendMessage').addEventListener('click', () => {
    browser.runtime.sendMessage({ type: "test-msg" }, (message) => {
        // ignore result
    });
})
