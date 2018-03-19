'use strict'

import axios from 'axios';
import { Loading } from 'element-ui';

axios.defaults.timeout =  10000;
axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;


axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
    var config = err.config;
    // If config does not exist or the retry option is not set, reject
    if(!config || !config.retry) return Promise.reject(err);
    
    // Set the variable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0;
    
    // Check if we've maxed out the total number of retries
    if(config.__retryCount >= config.retry) {
        // Reject with the error
        return Promise.reject(err);
    }
    
    // Increase the retry count
    config.__retryCount += 1;
    
    // Create new promise to handle exponential backoff
    var backoff = new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, config.retryDelay || 1);
    });
    
    // Return the promise in which recalls axios to retry the request
    return backoff.then(function() {
        return axios(config);
    });
});
const suffix = ''; // 后缀
const reUrlSer = '/zq-web';
const loadingOpts = { // 遮罩层配置项
    lock: true,
    text: '加载中...',
    spinner: 'el-icon-loading',
    background: 'rgba(255, 255, 255, 0)'
}
// let loadingInstance = Loading.service(loadingOpts);
const ajax = function (obj) {
    let url = obj.url + suffix;
    let type = obj.type || 'get';
    if (type == 'get') {
        return axios.get(url, { params: obj.params || {} })
    } else {
        //let params = new URLSearchParams();
        let objParams = obj.params;
        let headers = {headers: {"Content-Type": "application/json"}};
        return axios.post(url, objParams, headers);
    }
}


import { 
    usersApi,
    userByIdApi,
    rolesApi
} from './resource';

export default {
    // 菜单
    getUsers (params, success) {
        debugger;
        return ajax({ url: usersApi, params: params, success: success, type: 'POST' });
    },
    
    // 根据ID获取用户
    getUserById (success) {
        return ajax({ url: userByIdApi, success: success});
    },

    // 获取所有角色
    getRoleList (success) {
        return ajax({ url: rolesApi, success: success });
    }
}