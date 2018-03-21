'use strict';

import { API_ROOT } from './config.js';

const reUrl = '/static/mock/';
const proxyUrl = '/chens-admin/'; // 服务器资源路径代理抬头

const reUrlSer = '/zq-web/'; // 服务器资源路径代理抬头

const apiChens = {
    /** 真实数据 **/
    menusRes: proxyUrl + 'menuController/tree', // 获取系统菜单路径
    usersRes: proxyUrl + 'userController/pagelist', // 获取当前登录用户下面的用户路径
    userByIdRes: proxyUrl + 'userController/info', // 根据ID查用户
    updateUserRes: proxyUrl + 'userController/update', // 修改用户
    createUserRes: proxyUrl + 'userController/create', // 修改用户
    deleteUserRes: proxyUrl + 'userController/delete', // 删除用户
    rolesRes: proxyUrl + 'roleController/pagelist', // 获取角色数据
    /** 真实数据 **/

}

export const menusApi = API_ROOT.concat(apiChens.menusRes);
export const usersApi = API_ROOT.concat(apiChens.usersRes);
export const userByIdApi = API_ROOT.concat(apiChens.userByIdRes);
export const rolesApi = API_ROOT.concat(apiChens.rolesRes);
export const updateUserApi = API_ROOT.concat(apiChens.updateUserRes);
export const createUserApi = API_ROOT.concat(apiChens.createUserRes);
export const deleteUserApi = API_ROOT.concat(apiChens.deleteUserRes);