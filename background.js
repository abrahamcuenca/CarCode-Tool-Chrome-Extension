chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch(request.action) {
    case 'checkForCarCode':
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'checkForCarCode' });
      });
      break;
    case 'injectCarCode':
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'injectCarCode' });
      });
      break;
    default:
      break;
  }
});
