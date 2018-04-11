'use strict';

import { API_ROOT } from './config.js';

const proxyUrl = '/chens-api/'; // 服务器资源路径代理抬头
const examWms = 'exam-wms/'; // 服务器资源模块
const csweb = 'chens-admin-web/';
const apiChens = {
    /** 真实数据 **/
    loginRes: proxyUrl + 'authController/login', // 登录请求路径
    logoutRes: proxyUrl + 'authController/logout', // 退出请求路径
    registerRes: proxyUrl + csweb + 'authController/register', // 注册请求路径
    menusRes: proxyUrl + csweb + 'menuController/tree', // 获取系统菜单路径
    createMenuRes: proxyUrl + csweb + 'menuController/create', // 新增菜单
    updateMenuRes: proxyUrl + csweb + 'menuController/update', // 修改菜单
    deleteMenuRes: proxyUrl + csweb + 'menuController/delete', // 删除菜单
    usersRes: proxyUrl + csweb + 'userController/pagelist', // 获取当前登录用户下面的用户路径
    userByIdRes: proxyUrl + csweb + 'userController/info', // 根据ID查用户
    userInfoRes: proxyUrl + csweb + 'authController/parseToken', // 根据token查用户信息
    createUserRes: proxyUrl + csweb + 'userController/create', // 创建用户
    updateUserRes: proxyUrl + csweb + 'userController/update', // 修改用户
    deleteUserRes: proxyUrl + csweb + 'userController/delete', // 删除用户
    userListByRoleIdRes: proxyUrl + csweb + '/userController/getUserListByRoleId', // 该角色的用户
    rolesRes: proxyUrl + csweb + 'roleController/pagelist', // 获取角色数据
    sysRolesRes: proxyUrl + csweb + 'roleController/list', // 获取所有角色数据
    rolesByUserIdRes: proxyUrl + csweb + 'roleController/getRoleListByUserId', // 根据用户ID获取角色
    roleByIdRes: proxyUrl + csweb + 'roleController/info', // 获取角色信息
    createRoleRes: proxyUrl + csweb + 'roleController/create', // 新增角色信息
    updateRoleRes: proxyUrl + csweb + 'roleController/update', // 修改角色信息
    deleteRoleRes: proxyUrl + csweb + 'roleController/deleteWithRel', // 删除角色信息
    sysLogsRes: proxyUrl + csweb + 'sysLogController/pagelist', // 系统日志列表
    sourceFolderRes: proxyUrl + examWms + 'sourceFolderController/info', // 资源管理，根据id获取子目录
    /** 真实数据 **/

}

export const loginApi = API_ROOT.concat(apiChens.loginRes);
export const logoutApi = API_ROOT.concat(apiChens.logoutRes);
export const registerApi = API_ROOT.concat(apiChens.registerRes);
export const menusApi = API_ROOT.concat(apiChens.menusRes);
export const createMenuApi = API_ROOT.concat(apiChens.createMenuRes);
export const updateMenuApi = API_ROOT.concat(apiChens.updateMenuRes);
export const deleteMenuApi = API_ROOT.concat(apiChens.deleteMenuRes);
export const usersApi = API_ROOT.concat(apiChens.usersRes);
export const userByIdApi = API_ROOT.concat(apiChens.userByIdRes);
export const userInfoApi = API_ROOT.concat(apiChens.userInfoRes);
export const createUserApi = API_ROOT.concat(apiChens.createUserRes);
export const updateUserApi = API_ROOT.concat(apiChens.updateUserRes);
export const deleteUserApi = API_ROOT.concat(apiChens.deleteUserRes);
export const userListByRoleIdApi = API_ROOT.concat(apiChens.userListByRoleIdRes);
export const rolesApi = API_ROOT.concat(apiChens.rolesRes);
export const sysRolesApi = API_ROOT.concat(apiChens.sysRolesRes);
export const rolesByUserIdApi = API_ROOT.concat(apiChens.rolesByUserIdRes);
export const roleByIdApi = API_ROOT.concat(apiChens.roleByIdRes);
export const createRoleApi = API_ROOT.concat(apiChens.createRoleRes);
export const updateRoleApi = API_ROOT.concat(apiChens.updateRoleRes);
export const deleteRoleApi = API_ROOT.concat(apiChens.deleteRoleRes);
export const sysLogsApi = API_ROOT.concat(apiChens.sysLogsRes);
export const sourceFolderApi = API_ROOT.concat(apiChens.sourceFolderRes);



