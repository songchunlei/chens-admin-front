'use strict'

import { Loading } from 'element-ui';

let loadingInstance = '';
// 打开全局遮罩
export const openLoading = (opts) => {
  if (opts && Object.keys(opts) > 0) {
    loadingInstance = Loading.service(opts);
  } else {
    const options = {
      lock: true,
      text: '',
      spinner: '',
      background: 'rgba(0, 0, 0, 0.5)'
    };
    loadingInstance = Loading.service(options);
  }
}

// 关闭全局遮罩
export const closeLoading = () => {
  loadingInstance.close();
}