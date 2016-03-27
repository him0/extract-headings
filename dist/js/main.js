(() => {
  let currentTabId;
  let currentTabName;

  // 現在のタブIDをセット
  let setCurrentTabId = () => {
    return new Promise(resolve => {
      chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        currentTabId = tabs[0].id;
        currentTabName = `eh-${currentTabId}`;
        return resolve();
      });
    });
  };

  // ストレージに保存されているheadingsを挿入
  let renderingData = () => {
    return new Promise(resolve => {
      chrome.storage.local.get(currentTabName, data => {
        data[currentTabName].forEach(heading => {
          document.getElementById('headings').insertAdjacentHTML('beforeend', heading);
        });
        return resolve();
      });
    });
  };

  let main = () => {
    setCurrentTabId()
    .then(renderingData());
  };

  main();

  document.getElementById('headings').addEventListener('click', () => {
    chrome.tabs.sendMessage(currentTabId, {
      type: 'onClicked',
      id: event.target.id 
    });
  });

}).call(this);
