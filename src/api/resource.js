'use strict';

import { API_ROOT } from './config.js';

const reUrl = '/static/mock/';
const proxyUrl = '/chens-admin/'; // 服务器资源路径代理抬头

const reUrlSer = '/zq-web/'; // 服务器资源路径代理抬头

const apiChens = {
    /** 真实数据 **/
    loginRes: proxyUrl + 'authController/login', // 登录请求路径
    logoutRes: proxyUrl + 'authController/loginout', // 退出请求路径
    registerRes: proxyUrl + 'authController/register', // 注册请求路径
    menusRes: proxyUrl + 'menuController/tree', // 获取系统菜单路径
    createMenuRes: proxyUrl + 'menuController/create', // 新增菜单
    updateMenuRes: proxyUrl + 'menuController/update', // 修改菜单
    deleteMenuRes: proxyUrl + 'menuController/delete', // 删除菜单
    usersRes: proxyUrl + 'userController/pagelist', // 获取当前登录用户下面的用户路径
    userByIdRes: proxyUrl + 'userController/info', // 根据ID查用户
    userInfoRes: proxyUrl + '/authController/parseToken', // 根据token查用户信息
    updateUserRes: proxyUrl + 'userController/update', // 修改用户
    createUserRes: proxyUrl + 'userController/createUser', // 修改用户
    deleteUserRes: proxyUrl + 'userController/delete', // 删除用户
    rolesRes: proxyUrl + 'roleController/pagelist', // 获取角色数据
    /** 真实数据 **/

}

export const loginApi = API_ROOT.concat(apiChens.loginRes);
export const logoutApi = API_ROOT.concat(apiChens.logoutRes);
export const registerApi = API_ROOT.concat(apiChens.registerRes);
export const menusApi = API_ROOT.concat(apiChens.menusRes);
export const usersApi = API_ROOT.concat(apiChens.usersRes);
export const userByIdApi = API_ROOT.concat(apiChens.userByIdRes);
export const userInfoApi = API_ROOT.concat(apiChens.userInfoRes);
export const rolesApi = API_ROOT.concat(apiChens.rolesRes);
export const updateUserApi = API_ROOT.concat(apiChens.updateUserRes);
export const createUserApi = API_ROOT.concat(apiChens.createUserRes);
export const deleteUserApi = API_ROOT.concat(apiChens.deleteUserRes);

export const createMenuApi = API_ROOT.concat(apiChens.createMenuRes);
export const updateMenuApi = API_ROOT.concat(apiChens.updateMenuRes);
export const deleteMenuApi = API_ROOT.concat(apiChens.deleteMenuRes);
