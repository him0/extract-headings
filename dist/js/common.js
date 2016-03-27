(() => {
  chrome.runtime.onMessage.addListener(message => {
    if (message.type === 'onCompleted') {
      let currentTabId = message.tabId.toString();
      let articles = Array.from(document.querySelectorAll('article'));
      let headings = [];
      let headingCounter = 0;
      // ストレージに保存するデータ
      // keyは eh-${tabId} とする
      let data = {};

      Array.prototype.forEach.call(articles, article => {
        Array.prototype.forEach.call(article.querySelectorAll('h1, h2, h3, h4, h5, h6'), heading => {
          heading.insertAdjacentHTML('afterbegin', `<span id="eh-${headingCounter}"></span>`);

          tagName = heading.tagName.toLowerCase();

          headings.push(`<${tagName} class="heading" id="eh-${headingCounter}">${heading.innerText}</${tagName}>`);

          headingCounter++;
        });
      });
      data[`eh-${currentTabId}`] = headings;
      
      chrome.storage.local.set(data);
      chrome.storage.local.get((data) => {
      });
    }

    if (message.type === 'onClicked') {
      location.hash = message.id;
    } 
  });

}).call(this);
