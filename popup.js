document.getElementById('checkForCarCode').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'checkForCarCode' });
  });
});

document.getElementById('injectCarCode').addEventListener('click', () => {
  const widgetId = document.getElementById('widgetId').value;
  const dev = document.getElementById('devDsg').checked;
  const skipOptimize = document.getElementById('skipOptimize').checked;
  const radioButtons = Array.from(document.querySelectorAll('input[name="widget"]'));
  const widgetType = radioButtons.filter(b => b.checked)[0].value;

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'injectCarCode', widgetId, dev, skipOptimize, widgetType });
  });
});
