import { ExtensionServiceWorkerMLCEngineHandler } from '@mlc-ai/web-llm';

let webllmHandler: ExtensionServiceWorkerMLCEngineHandler;

chrome.runtime.onConnect.addListener(function (port) {
  if (webllmHandler === undefined) {
    webllmHandler = new ExtensionServiceWorkerMLCEngineHandler(port);
  } else {
    webllmHandler.setPort(port);
  }
  port.onMessage.addListener(webllmHandler.onmessage.bind(webllmHandler));
});

// Show side panel on button click
chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});

// Retrieve content from all tabs
// eslint-disable-next-line func-style
async function getAllTabContents() {
  const tabs = await chrome.tabs.query({}); // all tabs

  const results = [];

  for (const tab of tabs) {
    if (!tab.id || cannotInject(tab.url)) continue;

    // Inject content script dynamically (MV3)
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content/all.iife.js'],
    });

    // Ask the content script for info
    const response = await chrome.tabs
      .sendMessage(tab.id, {
        action: 'GET_TAB_CONTENT',
      })
      .catch(() => null);

    if (response) {
      results.push({
        tabId: tab.id,
        url: tab.url,
        title: response.title,
        text: response.text,
      });
    }
  }

  return results;
}

// eslint-disable-next-line func-style
function cannotInject(url) {
  if (!url) return true;
  return (
    url.startsWith('chrome://') ||
    url.startsWith('chrome-extension://') ||
    url.startsWith('edge://') ||
    url.startsWith('about:') ||
    url.startsWith('devtools://') ||
    url.includes('chrome.google.com/webstore')
  );
}

// Listen for side panel request
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === 'COLLECT_ALL_TABS') {
    console.log('[bg] Collecting all tab contents...');

    getAllTabContents().then(data => {
      sendResponse({ tabs: data });
    });
    return true;
  }
});
