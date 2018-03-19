'use strict';

import { API_ROOT } from './config.js';

const reUrl = '/static/mock/';
const proxyUrl = '/chens-admin/'; // 服务器资源路径代理抬头

const reUrlSer = '/zq-web/'; // 服务器资源路径代理抬头

const apiChens = {
    /** 真实数据 **/
    usersRes: proxyUrl + 'userController/pagelist', // 获取当前登录用户下面的 用户
    userByIdRes: proxyUrl + 'userController/info/1',
    rolesRes: proxyUrl + 'roleController/list', // 获取角色数据
    /** 真实数据 **/

}

export const usersApi = API_ROOT.concat(apiChens.usersRes);
export const userByIdApi = API_ROOT.concat(apiChens.userByIdRes);
export const rolesApi = API_ROOT.concat(apiChens.rolesRes);

