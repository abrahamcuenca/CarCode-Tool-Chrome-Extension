chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'checkForCarCode') {
    hasCarCodeScript();
    hasWordPress();
    hasDDC();
    hasSD();
    hasDealerInspire();
  } else if (request.action === 'injectCarCode') {
    addCarCode();
  }
});

function hasWordPress () {
  const script = document.createElement('script');
  script.textContent = `
  (() => {
  if (document.querySelector('meta[name="generator"][content*="WordPress"]')) {
  console.log('This site is using WordPress.');
   if (window.__carcode_wp_plugin) {
        console.log('This site has the CarCode WordPress Plugin installed');
        console.log('Plugin Info:');
        console.log(window.__carcode_wp_plugin);
      } else {
        console.log('window.__carcode_wp_plugin not found.');
      } 
  
  } else {
  console.log('This site is not using WordPress.');
}
})();
  `;

  document.documentElement.appendChild(script);
  script.remove();
}

function hasCarCodeScript () {
  const script = document.createElement('script');
  script.textContent = `
  (()=>{
  if (document.querySelectorAll('script[src^="https://www.carcodesms.com/widgets"]').length > 0) {
  widget = document.querySelectorAll('script[src^="https://www.carcodesms.com/widgets"]')[0].src;
  fetch(widget)
   .then(response => response.arrayBuffer())
  .then(buffer => {
    const bytes = new Uint8Array(buffer.slice(4, 20));
    const str = String.fromCharCode(...bytes);
   console.log('CarCode script url:')
   console.log(document.querySelectorAll('script[src^="https://www.carcodesms.com/widgets"]')[0].src);
   console.log('CarCode Widget', str);
  })
  .catch(error => console.error(error));
  } else {
  console.log('No CarCode detected on the page');
  }
  })()`;
  document.documentElement.appendChild(script);
  script.remove();
}

function hasDDC() {
  const script = document.createElement('script');
  script.textContent = `
  (()=>{
  if (window.DDC) {
    console.log('This site is a DDC site');
  }  else {
  console.log('This site is not a DDC site');
  }
  })();
  `;

  document.documentElement.appendChild(script);
  script.remove();
}

function hasSD() {
  const script = document.createElement('script');
  script.textContent = `
  (() =>{
  if (window.sdDataLayer) {
    console.log('This site is a ShiftDigital site');
  }  else {
  console.log('This site is not a ShiftDigital site');
  }
  })();
  `;

  document.documentElement.appendChild(script);
  script.remove();
}

function hasDealerInspire() {
  const script = document.createElement('script');
  script.textContent = `
  (() =>{
  if (window.DealerInspireBrowserDetection) {
    console.log('This site is a DealerInspire site');
  }  else {
  console.log('This site is not a DealerInspire site');
  }
  })();
  `;

  document.documentElement.appendChild(script);
  script.remove();
}
