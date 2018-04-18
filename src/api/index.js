'use strict'

import ajax from '@/utils/request';
import store from '@/store'
import { getToken } from '@/utils/auth'
import { Loading } from 'element-ui'

import { 
    loginApi,
    logoutApi,
    registerApi,
    menusApi,
    createMenuApi,
    updateMenuApi,
    deleteMenuApi,
    usersApi,
    userByIdApi,
    userInfoApi,
    restUserPwdApi,
    updateUserApi,
    createUserApi,
    deleteUserApi,
    userListByRoleIdApi,
    rolesApi,
    sysRolesApi,
    rolesByUserIdApi,
    roleByIdApi,
    createRoleApi,
    updateRoleApi,
    deleteRoleApi,
    sysLogsApi,
    sourceFolderApi,
    tenantsApi,
    createDraftApi
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

    // 新增菜单
    createMenu (params) {
        return ajax({ url: createMenuApi, params: params, type: 'POST'});
    },

    // 修改菜单
    updateMenu (params) {
        return ajax({ url: updateMenuApi, params: params, type: 'PUT'});
    },

    // 删除菜单
    deleteMenu (id) {
        return ajax({ url: deleteMenuApi, params: params, type: 'DELETE'});
    },

    // 用户列表
    getUsers (params) {
        return ajax({ url: usersApi, params: params, type: 'POST' });
    },

    restPwd(params){
        return ajax({ url: restUserPwdApi, params: params, type: 'PUT' });
    },
    
    // 根据ID获取用户
    getUserById (id) {
        return ajax({ url: userByIdApi + '/' + id});
    },

    // 根据token获取用户
    getUserInfoByToken (token) {
        return ajax({ url: userInfoApi, params: { token: token } });
    },

    // 获取角色列表
    getRoles (params) {
        return ajax({ url: rolesApi, params: params, type: 'POST' });
    },

    // 获取所有角色
    getSysRoles () {
        return ajax({ url: sysRolesApi })
    },
    
    // 根据userId 获取角色
    getRolesByUserId (userId) {
        return ajax({ url: rolesByUserIdApi, params: {userId: userId} });
    },

    // 根据id获取角色
    getRoleById (id) {
        return ajax({ url: roleByIdApi + '/' + id });
    },

    // 新增角色
    createRole (params) {
        return ajax({ url: createRoleApi, params: params, type: 'POST' })
    },
    
    // 更新角色信息
    updateRole (params) {
        return ajax({ url: updateRoleApi, params: params, type: 'PUT' })
    },

    // 新增角色
    deleteRole (id) {
        return ajax({ url: deleteRoleApi + '/' + id, type: 'DELETE' })
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
    },

    // 角色下面的用户
    userListByRoleId (params) {
        return ajax({ url: userListByRoleIdApi, params: params, type: 'POST' });
    },

    // 租户列表
    getTanants (params) {
        return ajax({ url: tenantsApi, params: params, type: 'POST' });
    },

    // 租户下用户列表
    getUsersByTanantId (params) {
        return ajax({ url: userListByTenantIdApi, params: params, type: 'POST' });
    },
    
    // 日志列表
    getSysLogs (params) {
        return ajax({ url: sysLogsApi, params: params, type: 'POST' });
    },

    // 资源子目录
    getSourceFolder (id) {
        return ajax({ url: sourceFolderApi + '/' + id })
    },

    // 创建资源
    createDraft (params) {
        return ajax({ url: createDraftApi, params: params, type: 'POST' })
    }
}