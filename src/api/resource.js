'use strict';

import { API_ROOT } from './config.js';

const reUrl = '/static/mock/';
const proxyUrl = '/chens-admin/'; // 服务器资源路径代理抬头

const reUrlSer = '/zq-web/'; // 服务器资源路径代理抬头

const apiChens = {
    /** 真实数据 **/
    usersRes: proxyUrl + 'user/pagelist', // 获取当前登录用户下面的 用户
    userByIdRes: proxyUrl + 'userController/info/1',
    /** 真实数据 **/

    menus: reUrlSer + 'portalMenuController/portalMenuList',
}

export const usersApi = API_ROOT.concat(apiChens.usersRes);
export const userByIdApi = API_ROOT.concat(apiChens.userByIdRes);

export const menusApi = API_ROOT.concat(apiChens.menus);