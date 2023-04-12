chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'checkForCarCode') {
    const group = 'Detected Settings'
    startGroup(group);
    hasCarCodeScript();
    hasWordPress();
    hasDDC();
    hasSD();
    hasDealerInspire();
    endGroup(group);
  } else if (request.action === 'injectCarCode') {
    const group = 'Injected Widget'
    startGroup(group);
    injectCarCode(request);
    endGroup(group);
  }
});

function startGroup(group) {
  console.group(`\x1b[43m\x1b[97m..::CarCode Tool - ${group}::..\x1b[0m`)
}

function endGroup(group) {
  console.groupEnd(`\x1b[43m\x1b[97m..::CarCode Tool - ${group}::..\x1b[0m`)
}


function hasWordPress () {
  const script = document.createElement('script');
  script.textContent = `
  (() => {
  if (document.querySelector('meta[name="generator"][content*="WordPress"]')) {
  console.log('\x1b[32mThis site is using WordPress.');
   if (window.__carcode_wp_plugin) {
        console.log('\x1b[32mThis site has the CarCode WordPress Plugin installed\x1b[0m');
        console.log('\x1b[32mPlugin Info:\x1b[0m');
        console.log(window.__carcode_wp_plugin);
      } else {
        console.log('\x1b[31mwindow.__carcode_wp_plugin not found.\x1b[0m');
      } 
  
  } else {
  console.log('\x1b[31mThis site is not using WordPress.\x1b[0m');
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
   console.log('\x1b[32mCarCode script url:')
   console.log(document.querySelectorAll('script[src^="https://www.carcodesms.com/widgets"]')[0].src);  
   
   widget = document.querySelectorAll('script[src^="https://www.carcodesms.com/widgets"]')[0].src;
  fetch(widget)
   .then(response => response.arrayBuffer())
  .then(buffer => {
    const bytes = new Uint8Array(buffer.slice(4, 20));
    const str = String.fromCharCode(...bytes);
 
   console.log('\x1b[33mDetected CarCode Widget\x1b[0m', str);
  })
  .catch(error => console.error(error));
  } else {
  console.log('\x1b[31mNo CarCode detected on the page\x1b[0m');
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
    console.log('\x1b[32mThis site is a DDC site\x1b[0m');
  }  else {
  console.log('\x1b[31mThis site is not a DDC site\x1b[0m');
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
    console.log('\x1b[32mThis site is a ShiftDigital site\x1b[0m');
  }  else {
  console.log('\x1b[31mThis site is not a ShiftDigital site\x1b[0m');
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
    console.log('\x1b[32mThis site is a DealerInspire site\x1b[0m');
  }  else {
  console.log('\x1b[31mThis site is not a DealerInspire site\x1b[0m');
  }
  })();
  `;

  document.documentElement.appendChild(script);
  script.remove();
}

function injectCarCode(request) {
  const { widgetId, dev, skipOptimize, widgetType } = request;

  const script = document.createElement('script');
  script.textContent =`
(() => {
    const widgetId = '${widgetId}';
   
    if (!widgetId) 
    {
      console.error('Widget ID is required...')
      return
    } 
    const dev = ${dev};
    const skipOptimize = ${skipOptimize};
    const widgetType = '${widgetType}';

    let url = 'https://';
    if (dev) url += 'dev-dsg11-';
    url += 'www.carcodesms.com/widgets/';
    if (widgetType === 'slug') url += 's/';
    url += widgetId + '.js';
    if (skipOptimize) url += '?skip_optimization=true';
    
    const snippet = '<script src="'+url+'" async defer></script>';
    console.info('\x1b[1m\x1b[34mInjecting CarCode widget snippet:\\n\\n \x1b[33m'+snippet+'\\n\\n');
    
    const src = document.createElement('script');
    src.src = url;
    src.async = true;
    src.defer = true;
    document.body.insertAdjacentElement('beforeend', src);

    console.info('\x1b[3m\x1b[1mCarCode Added to Site... please wait.\x1b[0m')    
})()`
  document.documentElement.appendChild(script);
  script.remove();
}
