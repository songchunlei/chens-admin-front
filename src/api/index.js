'use strict'

import axios from 'axios';
import store from '@/store'
import { getToken } from '@/utils/auth'

import { Loading } from 'element-ui';
const service = axios.create({
    //baseURL: process.env.BASE_API, // api的base_url
    timeout: 5000 // request timeout
})
// axios.defaults.timeout =  10000;
// axios.defaults.retry = 4;
// axios.defaults.retryDelay = 1000;
// request interceptor
service.interceptors.request.use(config => {
    debugger;
    // Do something before request is sent
    if (store.getters.token) {
      config.headers['Authorization'] = getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    }
    return config
  }, error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  })

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
    let type = obj.type ? obj.type.toUpperCase() : 'GET';
    let headers = {headers: {"Content-Type": "application/json"}};
    let params = obj.params || {};
    switch (type) {
        case 'GET': return service.get(url, { params: params });
        break;
        case 'POST': return service.post(url, params, headers);
        break;
        case 'PUT': return service.put(url, params, headers);
        break;
        case 'DELETE': return service.delete(url, params, headers);
        break;
        default: break;
    }
}


import { 
    loginApi,
    logoutApi,
    registerApi,
    usersApi,
    userByIdApi,
    rolesApi,
    menusApi,
    updateUserApi,
    createUserApi,
    deleteUserApi
} from './resource';

export default {
    // 登录
    doLogin (params) {
        return ajax({ url: loginApi, params: params, type: 'POST' });
    },
    
    // 退出
    doLogout () {
        return ajax({ url: logoutApi });
    },

    // 注册
    doRegister (params) {
        return ajax({ url: registerApi, params: params, type: 'POST' });
    },

    // 系统菜单
    getMenus () {
        return ajax({ url: menusApi });
    },

    // 用户列表
    getUsers (params) {
        debugger;
        return ajax({ url: usersApi, params: params, type: 'POST' });
    },
    
    // 根据ID获取用户
    getUserById (id) {
        return ajax({ url: userByIdApi + '/' + id});
    },

    // 获取角色列表
    getRoles (params) {
        return ajax({ url: rolesApi, params: params, type: 'POST' });
    },

    // 更新用户信息
    updateUser (params) {
        return ajax({ url: updateUserApi, params: params, type: 'PUT' });
    },

    // 创建用户
    createUser (params) {
        return ajax({ url: createUserApi, params: params, type: 'POST' });
    },

    // 删除用户
    deleteUserById (id) {
        return ajax({ url: deleteUserApi + '/' + id, type: 'DELETE' });
    }
}