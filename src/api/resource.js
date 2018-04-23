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
    restUserPwdRes: proxyUrl + csweb + 'userController/restPwd', // 重置密码
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
    deleteRoleRes: proxyUrl + csweb + 'roleController/delete', // 删除角色信息

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
    getTagClassByIdRes: proxyUrl + examWms + 'tagClassController/info', // 获取知识分类数据
    tagClassRes: proxyUrl + examWms + 'tagClassController/pagelist', // 获取知识分类分页数据
    tagClassListRes: proxyUrl + examWms + 'tagClassController/list', // 获取标签数据
    createTagClassRes: proxyUrl + examWms + 'tagClassController/create', // 创建知识分类
    updateTagClassRes: proxyUrl + examWms + 'tagClassController/update', // 修改知识分类
    deleteTagClassRes: proxyUrl + examWms + 'tagClassController/delete', // 删除知识分类

    /**标签管理*/
    getTagByIdRes: proxyUrl + examWms + 'tagController/info', // 获取知识分类数据
    tagRes: proxyUrl + examWms + 'tagController/pagelist', // 获取标签分页数据
    tagListRes: proxyUrl + examWms + 'tagController/list', // 获取标签数据
    createTagRes: proxyUrl + examWms + 'tagController/create', // 创建标签
    updateTagRes: proxyUrl + examWms + 'tagController/update', // 修改标签
    deleteTagRes: proxyUrl + examWms + 'tagController/delete', // 删除标签

    /**资源管理 */
    sourceFolderRes: proxyUrl + examWms + 'sourceFolderController/info', // 资源-查询文件/文件夹
    createSourceFolderRes: proxyUrl + examWms + 'sourceFolderController/create', // 资源-创建文件夹
    updateSourceFolderRes: proxyUrl + examWms + 'sourceFolderController/update', // 资源-更新文件夹
    deleteSourceFolderRes: proxyUrl + examWms + 'sourceFolderController/delete', // 资源-删除文件夹
    saveSourceRes: proxyUrl + examWms + 'sourceController/save', // 资源-保存草稿
    submitSourceRes: proxyUrl + examWms + 'sourceController/submitDraft', // 资源-提交草稿
    passSourceRes: proxyUrl + examWms + 'sourceController/pass', // 资源-审批通过（只读审批）
    passWithEditSourceRes: proxyUrl + examWms + 'sourceController/passWithEdit', // 资源-审批通过（可编辑审批）
    noPassSourceRes: proxyUrl + examWms + 'sourceController/noPass', // 资源-审批不通过
    publishSourceRes: proxyUrl + examWms + 'sourceController/publish', // 资源-发布
    unPublishSourceRes: proxyUrl + examWms + 'sourceController/unPublish', // 资源-取消发布
    deleteSourceRes: proxyUrl + examWms + 'sourceController/delete', // 资源-删除
    getSourceRes: proxyUrl + examWms + 'sourceController/getApproveFormData', // 资源-获取表单信息

    /**题目管理*/
    questionsFolderRes: proxyUrl + examWms + 'questionsFolderController/info', // 题目-文件/文件夹
    createQuestionsFolderRes: proxyUrl + examWms + 'questionsFolderController/create', // 题目-创建文件夹
    updateQuestionsFolderRes: proxyUrl + examWms + 'questionsFolderController/update', // 题目-更新文件夹
    deleteQuestionsFolderRes: proxyUrl + examWms + 'questionsFolderController/delete', // 题目-删除文件夹
    saveQuestionsRes: proxyUrl + examWms + 'questionsController/save', // 题目-保存草稿
    submitQuestionsRes: proxyUrl + examWms + 'questionsController/submitDraft', // 题目-提交草稿
    passQuestionsRes: proxyUrl + examWms + 'questionsController/pass', // 题目-审批通过（只读审批）
    passWithEditQuestionsRes: proxyUrl + examWms + 'questionsController/passWithEdit', // 题目-审批通过（可编辑审批）
    noPassQuestionsRes: proxyUrl + examWms + 'questionsController/noPass', // 题目-审批不通过
    publishQuestionsRes: proxyUrl + examWms + 'questionsController/publish', // 题目-发布
    unPublishQuestionsRes: proxyUrl + examWms + 'questionsController/unPublish', // 题目-取消发布
    deleteQuestionsRes: proxyUrl + examWms + 'questionsController/delete', // 题目-删除
    getQuestionsRes: proxyUrl + examWms + 'questionsController/getApproveFormData', // 题目-获取表单信息

    /**试卷管理*/
    examPaperFolderRes: proxyUrl + examBook + 'examPaperFolderController/info', // 试卷-文件/文件夹
    createExamPaperFolderRes: proxyUrl + examBook + 'examPaperFolderController/create', // 试卷-创建文件夹
    updateExamPaperFolderRes: proxyUrl + examBook + 'examPaperFolderController/update', // 试卷-更新文件夹
    deleteExamPaperFolderRes: proxyUrl + examBook + 'examPaperFolderController/delete', // 试卷-删除文件夹
    saveExamPaperRes: proxyUrl + examBook + 'examPaperController/save', // 试卷-保存草稿
    submitExamPaperRes: proxyUrl + examBook + 'examPaperController/submitDraft', // 试卷-提交草稿
    passExamPaperRes: proxyUrl + examBook + 'examPaperController/pass', // 试卷-审批通过（只读审批）
    passWithEditExamPaperRes: proxyUrl + examBook + 'examPaperController/passWithEdit', // 试卷-审批通过（可编辑审批）
    noPassExamPaperRes: proxyUrl + examBook + 'examPaperController/noPass', // 试卷-审批不通过
    publishExamPaperRes: proxyUrl + examBook + 'examPaperController/publish', // 试卷-发布
    unPublishExamPaperRes: proxyUrl + examBook + 'examPaperController/unPublish', // 试卷-取消发布
    deleteExamPaperRes: proxyUrl + examBook + 'examPaperController/delete', // 试卷-删除
    getExamPaperRes: proxyUrl + examBook + 'examPaperController/getApproveFormData', // 试卷-获取表单信息
    addQuestionsInExamPapperRes: proxyUrl + examBook + 'examPaperController/addQuestions', // 试卷-增加题目
    deleteQuestionsInExamPapperRes: proxyUrl + examBook + 'examPaperController/deleteQuestions', // 试卷-删除题目

    /**书本管理*/
    bookFolderRes: proxyUrl + examBook + 'bookFolderController/info', // 书本-文件/文件夹
    createBookFolderRes: proxyUrl + examBook + 'bookFolderController/create', // 书本-创建文件夹
    updateBookFolderRes: proxyUrl + examBook + 'bookFolderController/update', // 书本-更新文件夹
    deleteBookFolderRes: proxyUrl + examBook + 'bookFolderController/delete', // 书本-删除文件夹
    saveBookRes: proxyUrl + examBook + 'bookController/save', // 书本-保存草稿
    submitBookRes: proxyUrl + examBook + 'bookController/submitDraft', // 书本-提交草稿
    passBookRes: proxyUrl + examBook + 'bookController/pass', // 书本-审批通过（只读审批）
    passWithEditBookRes: proxyUrl + examBook + 'bookController/passWithEdit', // 书本-审批通过（可编辑审批）
    noPassBookRes: proxyUrl + examBook + 'bookController/noPass', // 书本-审批不通过
    publishBookRes: proxyUrl + examBook + 'bookController/publish', // 书本-发布
    unPublishBookRes: proxyUrl + examBook + 'bookController/unPublish', // 书本-取消发布
    deleteBookRes: proxyUrl + examBook + 'bookController/delete', // 书本-删除
    getBookRes: proxyUrl + examBook + 'bookController/getApproveFormData', // 书本-获取表单信息

    /**课程管理*/
    courseFolderRes: proxyUrl + examBook + 'courseFolderController/info', //课程-文件/文件夹
    createCourseFolderRes: proxyUrl + examBook + 'courseFolderController/create', // 课程-创建文件夹
    updateCourseFolderRes: proxyUrl + examBook + 'courseFolderController/update', // 课程-更新文件夹
    deleteCourseFolderRes: proxyUrl + examBook + 'courseFolderController/delete', // 课程-删除文件夹
    saveCourseRes: proxyUrl + examBook + 'courseController/save', // 课程-保存草稿
    submitCourseRes: proxyUrl + examBook + 'courseController/submitDraft', // 课程-提交草稿
    passCourseRes: proxyUrl + examBook + 'courseController/pass', // 课程-审批通过（只读审批）
    passWithEditCourseRes: proxyUrl + examBook + 'courseController/passWithEdit', // 课程-审批通过（可编辑审批）
    noPassCourseRes: proxyUrl + examBook + 'courseController/noPass', // 课程-审批不通过
    publishCourseRes: proxyUrl + examBook + 'courseController/publish', // 课程-发布
    unPublishCourseRes: proxyUrl + examBook + 'courseController/unPublish', // 课程-取消发布
    deleteCourseRes: proxyUrl + examBook + 'courseController/delete', // 课程-删除
    getCourseRes: proxyUrl + examBook + 'courseController/getApproveFormData', // 课程-获取表单信息

    /**审批管理*/
    undoRes: proxyUrl + examWms + 'bpmController/getMyTodoTaskPage', // 我的代办
    doneRes: proxyUrl + examWms + 'bpmController/getMyDoneTaskPage', // 我的已办
    myStartRes: proxyUrl + examWms + 'bpmController/getMyStartProcessInstancePage', // 我发起的审批

    /**文件*/
    downloadFileRes: proxyUrl + examWms + 'fileController/download',
    deleteFileRes: proxyUrl + examWms + 'fileController/delete',
}

export const loginApi = API_ROOT.concat(apiChens.loginRes);
export const logoutApi = API_ROOT.concat(apiChens.logoutRes);
export const registerApi = API_ROOT.concat(apiChens.registerRes);
export const menusApi = API_ROOT.concat(apiChens.menusRes);
export const userInfoApi = API_ROOT.concat(apiChens.userInfoRes);
export const usersApi = API_ROOT.concat(apiChens.usersRes);
export const userByIdApi = API_ROOT.concat(apiChens.userByIdRes);
export const restUserPwdApi = API_ROOT.concat(apiChens.restUserPwdRes);
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

export const getTagClassByIdApi = API_ROOT.concat(apiChens.getTagClassByIdRes);
export const tagClassListApi = API_ROOT.concat(apiChens.tagClassListRes);
export const tagClassesApi = API_ROOT.concat(apiChens.tagClassRes);
export const createTagClassApi = API_ROOT.concat(apiChens.createTagClassRes);
export const updateTagClassApi = API_ROOT.concat(apiChens.updateTagClassRes);
export const deleteTagClassApi = API_ROOT.concat(apiChens.deleteTagClassRes);

export const getTagByIdApi = API_ROOT.concat(apiChens.getTagByIdRes);
export const tagsApi = API_ROOT.concat(apiChens.tagRes);
export const tagListApi = API_ROOT.concat(apiChens.tagListes);
export const createTagApi = API_ROOT.concat(apiChens.createTagRes);
export const updateTagApi = API_ROOT.concat(apiChens.updateTagRes);
export const deleteTagApi = API_ROOT.concat(apiChens.deleteTagRes);

export const sourceFolderApi = API_ROOT.concat(apiChens.sourceFolderRes);
export const createSourceFolderApi = API_ROOT.concat(apiChens.createSourceFolderRes);
export const updateSourceFolderApi = API_ROOT.concat(apiChens.updateSourceFolderRes);
export const deleteSourceFolderApi = API_ROOT.concat(apiChens.deleteSourceFolderRes);
export const saveSourceApi = API_ROOT.concat(apiChens.saveSourceRes);
export const submitSourceApi = API_ROOT.concat(apiChens.submitSourceRes);
export const passSourceApi = API_ROOT.concat(apiChens.passSourceRes);
export const passWithEditSourceApi = API_ROOT.concat(apiChens.passWithEditSourceRes);
export const noPassSourceApi = API_ROOT.concat(apiChens.noPassSourceRes);
export const publishSourceApi = API_ROOT.concat(apiChens.publishSourceRes);
export const unPublishSourceApi = API_ROOT.concat(apiChens.unPublishSourceRes);
export const deleteSourceApi = API_ROOT.concat(apiChens.deleteSourceRes);
export const getSourceApi = API_ROOT.concat(apiChens.getSourceRes);

export const questionsFolderApi = API_ROOT.concat(apiChens.questionsFolderRes);
export const createQuestionsFolderApi = API_ROOT.concat(apiChens.createQuestionsFolderRes);
export const updateQuestionsFolderApi = API_ROOT.concat(apiChens.updateQuestionsFolderRes);
export const deleteQuestionsFolderApi = API_ROOT.concat(apiChens.deleteQuestionsFolderRes);
export const saveQuestionsApi = API_ROOT.concat(apiChens.saveQuestionsRes);
export const submitQuestionsApi = API_ROOT.concat(apiChens.submitQuestionsRes);
export const passQuestionsApi = API_ROOT.concat(apiChens.passQuestionsRes);
export const passWithEditQuestionsApi = API_ROOT.concat(apiChens.passWithEditQuestionsRes);
export const noPassQuestionsApi = API_ROOT.concat(apiChens.noPassQuestionsRes);
export const publishQuestionsApi = API_ROOT.concat(apiChens.publishQuestionsRes);
export const unPublishQuestionsApi = API_ROOT.concat(apiChens.unPublishQuestionsRes);
export const deleteQuestionsApi = API_ROOT.concat(apiChens.deleteQuestionsRes);
export const getQuestionsApi = API_ROOT.concat(apiChens.getQuestionsRes);

export const examPaperFolderApi = API_ROOT.concat(apiChens.examPaperFolderRes);
export const createExamPaperFolderApi = API_ROOT.concat(apiChens.createExamPaperFolderRes);
export const updateExamPaperFolderApi = API_ROOT.concat(apiChens.updateExamPaperFolderRes);
export const deleteExamPaperFolderApi = API_ROOT.concat(apiChens.deleteExamPaperFolderRes);
export const saveExamPaperApi = API_ROOT.concat(apiChens.saveExamPaperRes);
export const submitExamPaperApi = API_ROOT.concat(apiChens.submitExamPaperRes);
export const passExamPaperApi = API_ROOT.concat(apiChens.passExamPaperRes);
export const passWithEditExamPaperApi = API_ROOT.concat(apiChens.passWithEditExamPaperRes);
export const noPassExamPaperApi = API_ROOT.concat(apiChens.noPassExamPaperRes);
export const publishExamPaperApi = API_ROOT.concat(apiChens.publishExamPaperRes);
export const unPublishExamPaperApi = API_ROOT.concat(apiChens.unPublishExamPaperRes);
export const deleteExamPaperApi = API_ROOT.concat(apiChens.deleteExamPaperRes);
export const getExamPaperApi = API_ROOT.concat(apiChens.getExamPaperRes);
export const addQuestionsInExamPapperApi = API_ROOT.concat(apiChens.addQuestionsInExamPapperRes);
export const deleteQuestionsInExamPapperApi = API_ROOT.concat(apiChens.deleteQuestionsInExamPapperRes);

export const bookFolderApi = API_ROOT.concat(apiChens.bookFolderRes);
export const createBookFolderApi = API_ROOT.concat(apiChens.createBookFolderRes);
export const updateBookFolderApi = API_ROOT.concat(apiChens.updateBookFolderRes);
export const deleteBookFolderApi = API_ROOT.concat(apiChens.deleteBookFolderRes);
export const saveBookApi = API_ROOT.concat(apiChens.saveBookRes);
export const submitBookApi = API_ROOT.concat(apiChens.submitBookRes);
export const passBookApi = API_ROOT.concat(apiChens.passBookRes);
export const passWithEditBookApi = API_ROOT.concat(apiChens.passWithEditBookRes);
export const noPassBookApi = API_ROOT.concat(apiChens.noPassBookRes);
export const publishBookApi = API_ROOT.concat(apiChens.publishBookRes);
export const unPublishBookApi = API_ROOT.concat(apiChens.unPublishBookRes);
export const deleteBookApi = API_ROOT.concat(apiChens.deleteBookRes);
export const getBookApi = API_ROOT.concat(apiChens.getBookRes);

export const courseFolderApi = API_ROOT.concat(apiChens.courseFolderRes);
export const createCourseFolderApi = API_ROOT.concat(apiChens.createCourseFolderRes);
export const updateCourseFolderApi = API_ROOT.concat(apiChens.updateCourseFolderRes);
export const deleteCourseFolderApi = API_ROOT.concat(apiChens.deleteCourseFolderRes);
export const saveCourseApi = API_ROOT.concat(apiChens.saveCourseRes);
export const submitCourseApi = API_ROOT.concat(apiChens.submitCourseRes);
export const passCourseApi = API_ROOT.concat(apiChens.passCourseRes);
export const passWithEditCourseApi = API_ROOT.concat(apiChens.passWithEditCourseRes);
export const noPassCourseApi = API_ROOT.concat(apiChens.noPassCourseRes);
export const publishCourseApi = API_ROOT.concat(apiChens.publishCourseRes);
export const unPublishCourseApi = API_ROOT.concat(apiChens.unPublishCourseRes);
export const deleteCourseApi = API_ROOT.concat(apiChens.deleteCourseRes);
export const getCourseApi = API_ROOT.concat(apiChens.getCourseRes);

export const undoApi = API_ROOT.concat(apiChens.undoRes);
export const doneApi = API_ROOT.concat(apiChens.doneRes);
export const myStartApi = API_ROOT.concat(apiChens.myStartRes);

export const downloadFileApi = API_ROOT.concat(apiChens.downloadFileRes);
export const deleteFileApi = API_ROOT.concat(apiChens.deleteFileRes);



