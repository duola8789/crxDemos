const color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log(`%cDefault background color is set to ${color}`, `color: ${color};`);
});

chrome.action.onClicked.addListener(() => {
  console.log('click received at background');
});

chrome.action.setBadgeText({ text: 'Hello' });

chrome.alarms.create({ delayInMinutes: 0.1 });

chrome.alarms.onAlarm.addListener(() => {
  chrome.action.setBadgeText({ text: 'ok' });
});

// chrome.windows.create();
// chrome.tabs.create({});

chrome.runtime.onConnect.addListener(function (port) {
  console.assert(port.name === 'qiniu');
  port.onMessage.addListener(async function (msg) {
    if (msg.action === 'download' && msg.url) {
      chrome.downloads.download({ url: msg.url, filename: `${Date.now()}.png` });
    }
  });
});
