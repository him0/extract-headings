(() => {
  chrome.runtime.onMessage.addListener(message => {
    if (message.type === 'onCompleted') {
      let currentTabId = message.tabId.toString();
      let headings = [];
      let headingCounter = 0;
      // ストレージに保存するデータ
      // keyは eh-${tabId} とする
      let data = {};

      let articles = document.querySelectorAll('article');

      let setHeadings = baseElement => {
        Array.from(baseElement.querySelectorAll('h1,h2,h3,h4,h5,h6')).forEach(heading => {
          heading.insertAdjacentHTML('afterbegin', `<span id="eh-${headingCounter}"></span>`);

          let tagName = heading.tagName.toLowerCase();
          headings.push(`<${tagName} class="heading" id="eh-${headingCounter}">${heading.innerText}</${tagName}>`);

          headingCounter++;
        });
      };

      // ページ中にarticleタグが含まれていない場合はdocumentから
      // headingタグを抽出
      if (articles.length === 0) {
        setHeadings(document);
      } else {
        Array.from(articles).forEach(article => {
          setHeadings(article); 
        });
      }
      
      // ストレージに保存
      data[`eh-${currentTabId}`] = headings;
      chrome.storage.local.set(data);
    }

    if (message.type === 'onClicked') {
      location.hash = message.id;
    } 
  });

}).call(this);
