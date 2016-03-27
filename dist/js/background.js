(() => {
  chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
    if (changeInfo.status === 'complete') {
      return chrome.tabs.sendMessage(tabId, {
        type: 'onCompleted',
        tabId: tabId
      });
    }
  });

  chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
    chrome.storage.local.remove(`eh-${tabId}`);
  });

  chrome.tabs.onReplaced.addListener((addedTabId, removeTabId) => {
    chrome.storage.local.remove(`eh-${tabId}`);
  });
}).call(this);
