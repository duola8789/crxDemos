window.onload = async () => {
  await utils.wait(3000);
  const parentElement = document.querySelector('.leftActions_2HLjd');
  if (!parentElement) {
    console.error('parentElement');
    return;
  }
  const childElement = document.createElement('input');
  childElement.addEventListener('keydown', async e => {
    const id = e.target.value;
    if (!id) {
      return;
    }

    if (e.key.toLocaleLowerCase() === 'enter') {
      handleQiniuCloudImage(id);
    }
  });
  parentElement.appendChild(childElement);
};

// async function handleQiniuCloudImage(id) {
//   const inputElement = document.querySelector('.icecream-text-input-inner');
//   if (inputElement) {
//     // 设置input的值
//     inputElement.value = id;
//     inputElement.setAttribute('value', id);
//     inputElement.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
//     // 触发回车事件，进行搜索
//     const event = new KeyboardEvent('keyup', {
//       key: 'Enter',
//       keyCode: 13,
//       bubbles: true,
//       cancelable: true,
//     });
//     inputElement.dispatchEvent(event);
//     await utils.wait(2000);
//     // 重命名弹窗
//     const renameBtn = document.querySelector('[name="portalKodo@resourceV2-filename-edit"]');
//     if (!renameBtn) {
//       console.error('renameBtn');
//       return;
//     }
//     renameBtn.click();
//     await utils.wait(1000);
//     // 重命名
//     const inputInnerElement = document.querySelector('.ant-modal .icecream-text-input-inner');
//     if (!inputInnerElement) {
//       console.error('inputInnerElement');
//       return;
//     }
//     const newVal = inputInnerElement.value + '.png';
//     inputInnerElement.value = newVal;
//     inputInnerElement.setAttribute('value', newVal);
//     inputInnerElement.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
//     // 确认
//     const confirmBtn = document.querySelector('.ant-modal .ant-btn-primary');
//     if (!confirmBtn) {
//       console.error('renameBtn');
//       return;
//     }
//     confirmBtn.click();
//     await utils.wait(1000);
//     // 刷新列表
//     const refreshBtn = document.querySelector('.refreshList_3hZWo');
//     if (!refreshBtn) {
//       console.error('refreshBtn');
//       return;
//     }
//     refreshBtn.click();
//     await utils.wait(1000);
//     // 下载
//     download(`https://image.oldzhou.cn/${id}.png`);
//     // 下拉菜单
//     const triggerBtn = document.querySelector('td .ant-dropdown-trigger');
//     if (!triggerBtn) {
//       console.error('triggerBtn');
//       return;
//     }
//     triggerBtn.click();
//     await utils.wait(1000);
//     // 复制
//     // const copyBtn = document.querySelector('.singleObjectDownload_-YE56');
//     // if (!copyBtn) {
//     //   console.error('copyBtn');
//     //   return;
//     // }
//     // console.log(copyBtn);
//     // copyBtn.click();
//     // await utils.wait(500);
//
//     // 删除原图
//     const delBtn = document.querySelector('.singleObjectDelete_3y1Qd');
//     if (!delBtn) {
//       console.error('delBtn');
//       return;
//     }
//     await utils.wait(1000);
//     delBtn.click();
//     // 删除确认
//     const delConfirmBtn = document.querySelector('.ant-modal .ant-btn-danger');
//     if (!delConfirmBtn) {
//       console.error('delConfirmBtn');
//       return;
//     }
//     delConfirmBtn.click();
//     await utils.wait(1000);
//     const quitBtnList = document.querySelectorAll('.ant-btn');
//     quitBtnList.forEach(v => {
//       if (v.innerText === '退出') {
//         v.click();
//       }
//     });
//   }
// }

async function handleQiniuCloudImage(id) {
  const inputElement = document.querySelector('.icecream-text-input-inner');
  if (inputElement) {
    // 下载
    download(`https://image.oldzhou.cn/${id}`);
    // 设置input的值
    inputElement.value = id;
    inputElement.setAttribute('value', id);
    inputElement.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
    // 触发回车事件，进行搜索
    const event = new KeyboardEvent('keyup', {
      key: 'Enter',
      keyCode: 13,
      bubbles: true,
      cancelable: true,
    });
    inputElement.dispatchEvent(event);
    await utils.wait(1000);
    // 下拉菜单
    const triggerBtn = document.querySelector('td .ant-dropdown-trigger');
    if (!triggerBtn) {
      console.error('triggerBtn');
      return;
    }
    triggerBtn.click();
    await utils.wait(500);
    // 复制
    // const copyBtn = document.querySelector('.singleObjectDownload_-YE56');
    // if (!copyBtn) {
    //   console.error('copyBtn');
    //   return;
    // }
    // console.log(copyBtn);
    // copyBtn.click();
    // await utils.wait(500);

    // 删除原图
    const delBtn = document.querySelector('.singleObjectDelete_3y1Qd');
    if (!delBtn) {
      console.error('delBtn');
      return;
    }
    await utils.wait(500);
    delBtn.click();
    // 删除确认
    const delConfirmBtn = document.querySelector('.ant-modal .ant-btn-danger');
    if (!delConfirmBtn) {
      console.error('delConfirmBtn');
      return;
    }
    delConfirmBtn.click();
    await utils.wait(1000);
    const quitBtnList = document.querySelectorAll('.ant-btn');
    quitBtnList.forEach(v => {
      if (v.innerText === '退出') {
        v.click();
      }
    });
  }
}

let port;

async function download(url) {
  if (!port) {
    port = chrome.runtime.connect({ name: 'qiniu' });
  }
  port.postMessage({ url, action: 'download' });
}
