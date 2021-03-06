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
    getMenuTreeApi,
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
    tenantsApi,
    //标签
    getTagClassByIdApi,
    tagClassesApi,
    tagClassListApi,
    createTagClassApi,
    updateTagClassApi,
    deleteTagClassApi,
    getTagByIdApi,
    tagsApi,
    tagListApi,
    createTagApi,
    updateTagApi,
    deleteTagApi,
    //资源
    sourceFolderApi,
    createSourceFolderApi,
    updateSourceFolderApi,
    deleteSourceFolderApi,
    saveSourceApi,
    submitSourceApi,
    passSourceApi,
    passWithEditSourceApi,
    noPassSourceApi,
    publishSourceApi,
    unPublishSourceApi,
    deleteSourceApi,
    getSourceApi,
    createSourceShareApi,
    editSourceShareApi,
    deleteSourceShareApi,
    getSourceShareApi,
    //题目
    questionsFolderApi,
    createQuestionsFolderApi,
    updateQuestionsFolderApi,
    deleteQuestionsFolderApi,
    saveQuestionsApi,
    submitQuestionsApi,
    passQuestionsApi,
    passWithEditQuestionsApi,
    noPassQuestionsApi,
    publishQuestionsApi,
    unPublishQuestionsApi,
    deleteQuestionsApi,
    getQuestionsApi,
    createQuestionsShareApi,
    editQuestionsShareApi,
    deleteQuestionsShareApi,
    getQuestionsShareApi,
    //试卷
    examPaperFolderApi,
    createExamPaperFolderApi,
    updateExamPaperFolderApi,
    deleteExamPaperFolderApi,
    saveExamPaperApi,
    submitExamPaperApi,
    passExamPaperApi,
    passWithEditExamPaperApi,
    noPassExamPaperApi,
    publishExamPaperApi,
    unPublishExamPaperApi,
    deleteExamPaperApi,
    getExamPaperApi,
    addQuestionsInExamPapperApi,
    deleteQuestionsInExamPapperApi,
    createExamPaperShareApi,
    editExamPaperShareApi,
    deleteExamPaperShareApi,
    getExamPaperShareApi,
    //书本
    bookFolderApi,
    createBookFolderApi,
    updateBookFolderApi,
    deleteBookFolderApi,
    saveBookApi,
    submitBookApi,
    passBookApi,
    passWithEditBookApi,
    noPassBookApi,
    publishBookApi,
    unPublishBookApi,
    deleteBookApi,
    getBookApi,
    createBookShareApi,
    editBookShareApi,
    deleteBookShareApi,
    getBookShareApi,
    //课程
    courseFolderApi,
    createCourseFolderApi,
    updateCourseFolderApi,
    deleteCourseFolderApi,
    saveCourseApi,
    submitCourseApi,
    passCourseApi,
    passWithEditCourseApi,
    noPassCourseApi,
    publishCourseApi,
    unPublishCourseApi,
    deleteCourseApi,
    getCourseApi,
    createCourseShareApi,
    editCourseShareApi,
    deleteCourseShareApi,
    getCourseShareApi,
    //待办
    undoApi,
    doneApi,
    myStartApi,
    //文件
    downloadFileApi,
    deleteFileApi,
    //分享
    getShareApi
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

    //菜单树
    getMenuTree () {
        return ajax({ url: getMenuTreeApi });
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
    
    //重置密码
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

    //根据id获取标签分类信息
    getTagClassById(id){
        return ajax({ url: getTagClassByIdApi+ '/' + id});
    },

    // 标签分类列表
    getTagClasses (params) {
        return ajax({ url: tagClassesApi, params: params, type: 'POST' });
    },

    // 标签分类列表
    getTagClassList (params) {
        return ajax({ url: tagClassListApi, params: params, type: 'GET' });
    },

    // 创建标签分类
    createTagClass (params) {
        return ajax({ url: createTagClassApi, params: params, type: 'POST' });
    },

    // 更新标签分类
    updateTagClass (params) {
        return ajax({ url: updateTagClassApi, params: params, type: 'PUT' });
    },

    // 删除标签分类
    deleteTagClass (id) {
        return ajax({ url: deleteTagClassApi+ '/' + id,type: 'DELETE' });
    },

    //根据id获取标签信息
    getTagById(id){
        return ajax({ url: getTagByIdApi+ '/' + id});
    },

    // 标签分页列表
    getTags (params) {
        return ajax({ url: tagsApi, params: params, type: 'POST' });
    },

    // 标签列表
    getTagList (params) {
        return ajax({ url: tagListApi, params: params, type: 'GET' });
    },

    // 创建标签
    createTag (params) {
        return ajax({ url: createTagApi, params: params, type: 'POST' });
    },

    // 更新标签分类
    updateTag (params) {
        return ajax({ url: updateTagApi, params: params, type: 'PUT' });
    },

    // 删除标签
    deleteTag (id) {
        return ajax({ url: deleteTagApi+ '/' + id, type: 'DELETE' });
    },

    // 资源-目录
    getSourceFolder (id) {
        return ajax({ url: sourceFolderApi + '/' + id })
    },

    // 资源-创建目录
    createSourceFolder (params) {
        return ajax({ url: createSourceFolderApi, params: params, type: 'POST' })
    },
    
    // 资源-更新目录
    updateSourceFolder (params) {
        return ajax({ url: updateSourceFolderApi, params: params, type: 'PUT' })
    },

    // 资源-删除目录
    deleteSourceFolder (id) {
        return ajax({ url: deleteSourceFolderApi + '/' + id, type: 'DELETE' })
    },

    // 资源-保存草稿
    saveSource (params) {
        return ajax({ url: saveSourceApi, params: params, type: 'POST' })
    },
    
    // 资源-提交草稿
    submitSourceApi (params) {
        return ajax({ url: submitSourceApi, params: params, type: 'POST' })
    },

    // 资源-审批（只读）
    passSource (params) {
        return ajax({ url: passSourceApi , params: params, type: 'POST' })
    },

    // 资源-审批（编辑）
    passWithEditSource (params) {
        return ajax({ url: passWithEditSourceApi , params: params, type: 'POST' })
    },

    // 资源-驳回
    noPassSource (params) {
        return ajax({ url: noPassSourceApi , params: params, type: 'POST' })
    },

    // 资源-发布
    publishSource (params) {
        return ajax({ url: publishSourceApi , params: params, type: 'PUT' })
    },

    // 资源-取消发布
    unPublishSource (params) {
        return ajax({ url: unPublishSourceApi , params: params, type: 'PUT' })
    },

    // 资源-删除
    deleteSource (id) {
        return ajax({ url: deleteSourceApi+ '/' + id  , type: 'DELETE' })
    },

    // 资源-获取资源分页
    getSource (params) {
        return ajax({ url: getSourceApi , params: params, type: 'POST' })
    },

    //资源-创建分享
    createSourceShare (params) {
        return ajax({ url: createSourceShareApi , params: params, type: 'POST' })
    },

    //资源-编辑分享
    editSourceShare (params) {
        return ajax({ url: editSourceShareApi , params: params, type: 'PUT' })
    },

    // 资源-删除分享
    deleteSourceShare (id) {
        return ajax({ url: deleteSourceShareApi+ '/' + id  , type: 'DELETE' })
    },

    //题目-根据业务id获取分享
    getSourceShare(id){
        return ajax({ url: getSourceShareApi+ '/' + id  , type: 'GET' })
    },

    // 题目-目录
    getQuestionsFolder (id) {
        return ajax({ url: questionsFolderApi + '/' + id })
    },

    // 题目-创建目录
    createQuestionsFolder (params) {
        return ajax({ url: createQuestionsFolderApi, params: params, type: 'POST' })
    },
    
    // 题目-更新目录
    updateQuestionsFolder (params) {
        return ajax({ url: updateQuestionsFolderApi, params: params, type: 'PUT' })
    },

    // 题目-删除目录
    deleteQuestionsFolder (id) {
        return ajax({ url: deleteQuestionsFolderApi + '/' + id, type: 'DELETE' })
    },

    // 题目-保存草稿
    saveQuestions (params) {
        return ajax({ url: saveQuestionsApi, params: params, type: 'POST' })
    },
    
    // 题目-提交草稿
    submitQuestionsApi (params) {
        return ajax({ url: submitQuestionsApi, params: params, type: 'POST' })
    },

    // 题目-审批（只读）
    passQuestions (params) {
        return ajax({ url: passQuestionsApi , params: params, type: 'POST' })
    },

    // 题目-审批（编辑）
    passWithEditQuestions (params) {
        return ajax({ url: passWithEditQuestionsApi , params: params, type: 'POST' })
    },

    // 题目-驳回
    noPassQuestions (params) {
        return ajax({ url: noPassQuestionsApi , params: params, type: 'POST' })
    },

    // 题目-发布
    publishQuestions (params) {
        return ajax({ url: publishQuestionsApi , params: params, type: 'PUT' })
    },

    // 题目-取消发布
    unPublishQuestions (params) {
        return ajax({ url: unPublishQuestionsApi , params: params, type: 'PUT' })
    },

    // 题目-删除
    deleteQuestions (id) {
        return ajax({ url:  deleteQuestionsApi+ '/' + id  , type: 'DELETE' })
    },

    // 题目-取消发布
    getQuestions (params) {
        return ajax({ url: getQuestionsApi , params: params, type: 'POST' })
    },

    //题目-创建分享
    createQuestionsShare (params) {
        return ajax({ url: createQuestionsShareApi , params: params, type: 'POST' })
    },

    //题目-编辑分享
    editQuestionsShare (params) {
        return ajax({ url: editQuestionsShareApi , params: params, type: 'PUT' })
    },

    // 题目-删除分享
    deleteQuestionsShare (id) {
        return ajax({ url: deleteQuestionsShareApi+ '/' + id  , type: 'DELETE' })
    },

    //题目-根据业务id获取分享
    getQuestionsShare(id){
        return ajax({ url: getQuestionsShareApi+ '/' + id  , type: 'GET' })
    },

    // 试卷-目录
    getExamPaperFolder (id) {
        return ajax({ url: examPaperFolderApi + '/' + id })
    },

    // 试卷-创建目录
    createExamPaperFolder (params) {
        return ajax({ url: createExamPaperFolderApi, params: params, type: 'POST' })
    },
    
    // 试卷-更新目录
    updateExamPaperFolder (params) {
        return ajax({ url: updateExamPaperFolderApi, params: params, type: 'PUT' })
    },

    // 试卷-删除目录
    deleteExamPaperFolder (id) {
        return ajax({ url: deleteExamPaperFolderApi + '/' + id, type: 'DELETE' })
    },

    // 试卷-保存草稿
    saveExamPaper (params) {
        return ajax({ url: saveExamPaperApi, params: params, type: 'POST' })
    },
    
    // 试卷-提交草稿
    submitExamPaperApi (params) {
        return ajax({ url: submitExamPaperApi, params: params, type: 'POST' })
    },

    // 试卷-审批（只读）
    passExamPaper (params) {
        return ajax({ url: passExamPaperApi , params: params, type: 'POST' })
    },

    // 试卷-审批（编辑）
    passWithEditExamPaper (params) {
        return ajax({ url: passWithEditExamPaperApi , params: params, type: 'POST' })
    },

    // 试卷-驳回
    noPassExamPaper (params) {
        return ajax({ url: noPassExamPaperApi , params: params, type: 'POST' })
    },

    // 试卷-发布
    publishExamPaper (params) {
        return ajax({ url: publishExamPaperApi , params: params, type: 'PUT' })
    },

    // 试卷-取消发布
    unPublishExamPaper (params) {
        return ajax({ url: unPublishExamPaperApi , params: params, type: 'PUT' })
    },

    // 试卷-删除
    deleteExamPaper (id) {
        return ajax({ url:  deleteExamPaperApi+ '/' + id  , type: 'DELETE' })
    },

    // 试卷-详情
    getExamPaper (params) {
        return ajax({ url: getExamPaperApi , params: params, type: 'POST' })
    },

    // 试卷-增加题目
    addQuestionsInExamPapper (params) {
        return ajax({ url: addQuestionsInExamPapperApi , params: params, type: 'POST' })
    },

    // 试卷-删除题目
    deleteQuestionsInExamPapper (params) {
        return ajax({ url: deleteQuestionsInExamPapperApi , params: params, type: 'DELETE' })
    },

    //试卷-创建分享
    createExamPaperShare (params) {
        return ajax({ url: createExamPaperShareApi , params: params, type: 'POST' })
    },

    //试卷-编辑分享
    editExamPaperShare (params) {
        return ajax({ url: editExamPaperShareApi , params: params, type: 'PUT' })
    },

    // 试卷-删除分享
    deleteExamPaperShare (id) {
        return ajax({ url: deleteExamPaperShareApi+ '/' + id  , type: 'DELETE' })
    },

    //试卷-根据业务id获取分享
    getExamPaperShare(id){
        return ajax({ url: getExamPaperShareApi+ '/' + id  , type: 'GET' })
    },

    // 书本-目录
    getBookFolder (id) {
        return ajax({ url: bookFolderApi + '/' + id })
    },

    // 书本-创建目录
    createBookFolder (params) {
        return ajax({ url: createBookFolderApi, params: params, type: 'POST' })
    },
    
    // 书本-更新目录
    updateBookFolder (params) {
        return ajax({ url: updateBookFolderApi, params: params, type: 'PUT' })
    },

    // 书本-删除目录
    deleteBookFolder (id) {
        return ajax({ url: deleteBookFolderApi + '/' + id, type: 'DELETE' })
    },

    // 书本-保存草稿
    saveBook (params) {
        return ajax({ url: saveBookApi, params: params, type: 'POST' })
    },
    
    // 书本-提交草稿
    submitBookApi (params) {
        return ajax({ url: submitBookApi, params: params, type: 'POST' })
    },

    // 书本-审批（只读）
    passBook (params) {
        return ajax({ url: passBookApi , params: params, type: 'POST' })
    },

    // 书本-审批（编辑）
    passWithEditBook (params) {
        return ajax({ url: passWithEditBookApi , params: params, type: 'POST' })
    },

    // 书本-驳回
    noPassBook (params) {
        return ajax({ url: noPassBookApi , params: params, type: 'POST' })
    },

    // 书本-发布
    publishBook (params) {
        return ajax({ url: publishBookApi , params: params, type: 'PUT' })
    },

    // 书本-取消发布
    unPublishBook (params) {
        return ajax({ url: unPublishBookApi , params: params, type: 'PUT' })
    },

    // 书本-删除
    deleteBook (id) {
        return ajax({ url: deleteBookApi +"/"+id, type: 'DELETE' })
    },

    // 书本-取消发布
    getBook (params) {
        return ajax({ url: getBookApi , params: params, type: 'POST' })
    },

    //书本-创建分享
    createBookShare (params) {
        return ajax({ url: createBookShareApi , params: params, type: 'POST' })
    },

    //书本-编辑分享
    editBookShare (params) {
        return ajax({ url: editBookShareApi , params: params, type: 'PUT' })
    },

    // 书本-删除分享
    deleteBookShare (id) {
        return ajax({ url: deleteBookShareApi+ '/' + id  , type: 'DELETE' })
    },

    //书本-根据业务id获取分享
    getBookShare(id){
        return ajax({ url: getBookShareApi+ '/' + id  , type: 'GET' })
    },

    // 课程-目录
    getCourseFolder (id) {
        return ajax({ url: courseFolderApi + '/' + id })
    },

    // 课程-创建目录
    createCourseFolder (params) {
        return ajax({ url: createCourseFolderApi, params: params, type: 'POST' })
    },
    
    // 课程-更新目录
    updateCourseFolder (params) {
        return ajax({ url: updateCourseFolderApi, params: params, type: 'PUT' })
    },

    // 课程-删除目录
    deleteCourseFolder (id) {
        return ajax({ url: deleteCourseFolderApi + '/' + id, type: 'DELETE' })
    },

    // 课程-保存草稿
    saveCourse (params) {
        return ajax({ url: saveCourseApi, params: params, type: 'POST' })
    },
    
    // 课程-提交草稿
    submitCourseApi (params) {
        return ajax({ url: submitCourseApi, params: params, type: 'POST' })
    },

    // 课程-审批（只读）
    passCourse (params) {
        return ajax({ url: passCourseApi , params: params, type: 'POST' })
    },

    // 课程-审批（编辑）
    passWithEditCourse (params) {
        return ajax({ url: passWithEditCourseApi , params: params, type: 'POST' })
    },

    // 课程-驳回
    noPassCourse (params) {
        return ajax({ url: noPassCourseApi , params: params, type: 'POST' })
    },

    // 课程-发布
    publishCourse (params) {
        return ajax({ url: publishCourseApi , params: params, type: 'PUT' })
    },

    // 课程-取消发布
    unPublishCourse (params) {
        return ajax({ url: unPublishCourseApi , params: params, type: 'PUT' })
    },

    // 课程-获取表单
    getCourse (params) {
        return ajax({ url: getCourseApi , params: params, type: 'POST' })
    },

    // 课程-删除
    deleteCourse (id) {
        return ajax({ url: deleteCourseApi +"/"+id, type: 'DELETE' })
    },

    //课程-创建分享
    createCourseShare (params) {
        return ajax({ url: createCourseShareApi , params: params, type: 'POST' })
    },

    //课程-编辑分享
    editCourseShare (params) {
        return ajax({ url: editCourseShareApi , params: params, type: 'PUT' })
    },

    // 课程-删除分享
    deleteCourseShare (id) {
        return ajax({ url: deleteCourseShareApi+ '/' + id  , type: 'DELETE' })
    },

    //课程-根据业务id获取分享
    getCourseShare(id){
        return ajax({ url: getCourseShareApi+ '/' + id  , type: 'GET' })
    },

    // 待办
    getUndoPage (params) {
        return ajax({ url: undoApi, params: params, type: 'POST' })
    },

    // 已办
    getDonePage (params) {
        return ajax({ url: doneApi, params: params, type: 'POST' })
    },

    // 我发起的
    myStartPage (params) {
        return ajax({ url: myStartApi, params: params, type: 'POST' })
    },
    
    //下载
    downloadFile (name){
       window.open(downloadFileApi+"?name="+name);
    },

    //删除文件
    deleteFile (name){
        return ajax({ url: deleteFileApi + '/' + name, type: 'DELETE' })
    },

    //我的分享列表
    getShare (params){
        return ajax({ url: getShareApi , params: params, type: 'POST' })
    }
    
}