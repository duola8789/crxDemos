// 通过ID找到按钮
const changeColorBtn = document.getElementById('changeColor');

// 弹出 popup 时清楚图标上的icon
chrome.action.setBadgeText({ text: '' });

// 从storage取背景色并设到按钮上
chrome.storage.sync.get('color', ({ color }) => {
  changeColorBtn.style.backgroundColor = color;
});

// 修改对应的标签页颜色
changeColorBtn.addEventListener('click', async () => {
  // 调用Chrome接口取出当前标签页
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // 以当前标签页为上下文，执行setPageBackgroundColor函数，这时候的 document 是当前页签的 document
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    args: [tab.id],
    function: setPageBackgroundColor,
  });
});

// 函数将在指定标签页内执行，因此可以取得当前网页document
function setPageBackgroundColor(tabId) {
  chrome.storage.local.get('colorInfo').then(({ colorInfo }) => {
    const isSet = !!colorInfo[tabId];
    document.body.style.filter = !isSet ? 'invert(100%) hue-rotate(180deg)' : 'none';
    chrome.storage.local.set({ colorInfo: { ...colorInfo, [tabId]: !isSet } });
  });
}
