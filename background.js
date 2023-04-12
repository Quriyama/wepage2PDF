console.log('Background script loaded.');

chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed.');
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'exampleMessage') {
    console.log('Example message received:', message.data);
    sendResponse({ data: 'Response from background script' });
  }
});
