'use strict'
import Vue from 'vue'
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  timeout: 5000 // request timeout
})
service.interceptors.request.use(config => {
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


// respone interceptor
service.interceptors.response.use(
  (response) => {
    debugger;
    /**
    * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
    * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
    */
    const res = response.data;
    if (res.code !== 1) {
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      });
      // 101:非法的token; 102:token为空;  100:Token 过期了;
      debugger;
      if (res.code === 100 || res.code === 101 || res.code === 102) {
        Vue.$confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload();// 为了重新实例化vue-router对象 避免bug
          });
        })
      }
      return Promise.reject('error');
    } else {
      return response;
    }
  },
  
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
})
  

const suffix = ''; // 后缀
const ajax = function (obj) {
    const _suffix = obj.suffix || suffix;
    let url = obj.url + _suffix;
    let type = obj.type ? obj.type.toUpperCase() : 'GET';
    let headers = { headers: { "Content-Type": "application/json" }};
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

export default ajax;