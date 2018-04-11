'use strict';

import { API_ROOT } from './config.js';

const proxyUrl = '/chens-api/'; // 服务器资源路径代理抬头
const examWms = 'exam-wms/'; // 服务器资源模块
const examBook = 'exam-book/'; // 服务器应用模块
const csweb = 'chens-admin-web/';
const apiChens = {
    /** 无拦截请求 **/
    loginRes: proxyUrl + 'authController/login', // 登录请求路径
    logoutRes: proxyUrl + 'authController/logout', // 退出请求路径
    registerRes: proxyUrl + csweb + 'authController/register', // 注册请求路径

    /**系统级请求 */
    menusRes: proxyUrl + csweb + 'menuController/tree', // 获取系统菜单路径
    userInfoRes: proxyUrl + csweb + 'authController/parseToken', // 根据token查用户信息

    /**用户管理 */
    usersRes: proxyUrl + csweb + 'userController/pagelist', // 获取当前登录用户下面的用户路径
    userByIdRes: proxyUrl + csweb + 'userController/info', // 根据ID查用户
    createUserRes: proxyUrl + csweb + 'userController/create', // 创建用户
    updateUserRes: proxyUrl + csweb + 'userController/update', // 修改用户
    deleteUserRes: proxyUrl + csweb + 'userController/delete', // 删除用户

    /**角色管理 */
    userListByRoleIdRes: proxyUrl + csweb + '/userController/getUserListByRoleId', // 该角色的用户
    rolesRes: proxyUrl + csweb + 'roleController/pagelist', // 获取角色数据
    sysRolesRes: proxyUrl + csweb + 'roleController/list', // 获取所有角色数据
    rolesByUserIdRes: proxyUrl + csweb + 'roleController/getRoleListByUserId', // 根据用户ID获取角色
    roleByIdRes: proxyUrl + csweb + 'roleController/info', // 获取角色信息
    createRoleRes: proxyUrl + csweb + 'roleController/create', // 新增角色信息
    updateRoleRes: proxyUrl + csweb + 'roleController/update', // 修改角色信息
    deleteRoleRes: proxyUrl + csweb + 'roleController/deleteWithRel', // 删除角色信息

    /**菜单管理 */
    createMenuRes: proxyUrl + csweb + 'menuController/create', // 新增菜单
    updateMenuRes: proxyUrl + csweb + 'menuController/update', // 修改菜单
    deleteMenuRes: proxyUrl + csweb + 'menuController/delete', // 删除菜单

    /**租户管理 */ 
    tenantRes: proxyUrl + csweb + 'tenantController/pagelist', // 获取租户数据
    userListByTenantIdRes: proxyUrl + csweb + 'userController/getUserListByTenantId', // 获取租户下的用户数据

    /**系统日志 */
    sysLogsRes: proxyUrl + csweb + 'sysLogController/pagelist', // 系统日志列表

    /**标签分类管理*/
    tagClassRes: proxyUrl + examWms + 'tagClassController/pagelist', // 获取知识分类数据
    createTagClassRes: proxyUrl + examWms + 'tagClassController/create', // 创建知识分类
    updateTagClassRes: proxyUrl + examWms + 'tagClassController/update', // 修改知识分类
    deleteTagClassRes: proxyUrl + examWms + 'tagClassController/delete', // 删除知识分类

    /**标签管理*/
    tagRes: proxyUrl + examWms + 'tagController/pagelist', // 获取标签数据
    createTagRes: proxyUrl + examWms + 'tagController/create', // 创建标签
    updateTagRes: proxyUrl + examWms + 'tagController/update', // 修改标签
    deleteTagRes: proxyUrl + examWms + 'tagController/delete', // 删除标签

    /**资源管理 */
    sourceFolderRes: proxyUrl + examWms + 'sourceFolderController/info', // 资源管理，根据id获取子目录

    /**题目管理*/
    questionRes: proxyUrl + examWms + 'questionsController/pagelist', // 题目资源
    saveQuestionRes: proxyUrl + examWms + 'questionsController/saveQuestions', // 保存题目
    selectQuestionDetailRes : proxyUrl + examWms + 'questionsController/selectQuestionDetail', // 题目详情

    /**试卷管理*/
    examPapperRes: proxyUrl + examBook + 'examPaperController/pagelist', // 获取试卷数据
    createExamPapperRes: proxyUrl + examBook + 'examPaperController/create', // 创建试卷
    updateExamPapperRes: proxyUrl + examBook + 'examPaperController/update', // 修改试卷
    deleteExamPapperRes: proxyUrl + examBook + 'examPaperController/delete', // 删除试卷
    addQuestionsInExamPapperRes: proxyUrl + examBook + 'examPaperController/addQuestions', // 试卷增加题目
    deleteQuestionsInExamPapperRes: proxyUrl + examBook + 'examPaperController/deleteQuestions', // 试卷删除题目

}

export const loginApi = API_ROOT.concat(apiChens.loginRes);
export const logoutApi = API_ROOT.concat(apiChens.logoutRes);
export const registerApi = API_ROOT.concat(apiChens.registerRes);
export const menusApi = API_ROOT.concat(apiChens.menusRes);
export const userInfoApi = API_ROOT.concat(apiChens.userInfoRes);
export const usersApi = API_ROOT.concat(apiChens.usersRes);
export const userByIdApi = API_ROOT.concat(apiChens.userByIdRes);
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
export const createMenuApi = API_ROOT.concat(apiChens.createMenuRes);
export const updateMenuApi = API_ROOT.concat(apiChens.updateMenuRes);
export const deleteMenuApi = API_ROOT.concat(apiChens.deleteMenuRes);
export const tenantsApi = API_ROOT.concat(apiChens.tenantRes);
export const userListByTenantIdApi = API_ROOT.concat(apiChens.userListByTenantIdRes);
export const sysLogsApi = API_ROOT.concat(apiChens.sysLogsRes);
export const tagClassesApi = API_ROOT.concat(tagClassRes);
export const createTagClassApi = API_ROOT.concat(createTagClassRes);
export const updateTagClassApi = API_ROOT.concat(updateTagClassRes);
export const deleteTagClassApi = API_ROOT.concat(deleteTagClassRes);
export const tagsApi = API_ROOT.concat(tagRes);
export const createTagApi = API_ROOT.concat(createTagRes);
export const updateTagApi = API_ROOT.concat(updateTagRes);
export const deleteTagApi = API_ROOT.concat(deleteTagRes);
export const sourceFolderApi = API_ROOT.concat(apiChens.sourceFolderRes);
export const questionApi = API_ROOT.concat(questionRes);
export const saveQuestionApi = API_ROOT.concat(saveQuestionRes);
export const selectQuestionDetailApi = API_ROOT.concat(selectQuestionDetailRes);
export const examPappersApi = API_ROOT.concat(examPapperRes);
export const createExamPapperApi = API_ROOT.concat(createExamPapperRes);
export const updateExamPapperApi = API_ROOT.concat(updateExamPapperRes);
export const deleteExamPapperApi = API_ROOT.concat(deleteExamPapperRes);
export const addQuestionsInExamPapperApi = API_ROOT.concat(addQuestionsInExamPapperRes);
export const deleteQuestionsInPapperApi = API_ROOT.concat(deleteQuestionsInExamPapperRes);



