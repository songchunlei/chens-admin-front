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
    tenantsApi,
    //标签
    getTagClassByIdApi,
    tagClassesApi,
    createTagClassApi,
    updateTagClassApi,
    deleteTagClassApi,
    getTagByIdApi,
    tagsApi,
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
    getSourceApi,
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
    getQuestionsApi,
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
    getExamPaperApi,
    addQuestionsInExamPapperApi,
    deleteQuestionsInExamPapperApi,
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
    getBookApi,
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
    getCourseApi,
    //待办
    undoApi,
    doneApi,
    myStartApi
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

    // 标签列表
    getTags (params) {
        return ajax({ url: tagsApi, params: params, type: 'POST' });
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
    deleteRSourceFolder (id) {
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

    // 资源-取消发布
    getSource (params) {
        return ajax({ url: getSourceApi , params: params, type: 'POST' })
    },

    // 资源-目录
    getQuestionsFolder (id) {
        return ajax({ url: questionsFolderApi + '/' + id })
    },

    // 资源-创建目录
    createQuestionsFolder (params) {
        return ajax({ url: createQuestionsFolderApi, params: params, type: 'POST' })
    },
    
    // 资源-更新目录
    updateQuestionsFolder (params) {
        return ajax({ url: updateQuestionsFolderApi, params: params, type: 'PUT' })
    },

    // 资源-删除目录
    deleteRQuestionsFolder (id) {
        return ajax({ url: deleteQuestionsFolderApi + '/' + id, type: 'DELETE' })
    },

    // 资源-保存草稿
    saveQuestions (params) {
        return ajax({ url: saveQuestionsApi, params: params, type: 'POST' })
    },
    
    // 资源-提交草稿
    submitQuestionsApi (params) {
        return ajax({ url: submitQuestionsApi, params: params, type: 'POST' })
    },

    // 资源-审批（只读）
    passQuestions (params) {
        return ajax({ url: passQuestionsApi , params: params, type: 'POST' })
    },

    // 资源-审批（编辑）
    passWithEditQuestions (params) {
        return ajax({ url: passWithEditQuestionsApi , params: params, type: 'POST' })
    },

    // 资源-驳回
    noPassQuestions (params) {
        return ajax({ url: noPassQuestionsApi , params: params, type: 'POST' })
    },

    // 资源-发布
    publishQuestions (params) {
        return ajax({ url: publishQuestionsApi , params: params, type: 'PUT' })
    },

    // 资源-取消发布
    unPublishQuestions (params) {
        return ajax({ url: unPublishQuestionsApi , params: params, type: 'PUT' })
    },

    // 资源-取消发布
    getQuestions (params) {
        return ajax({ url: getQuestionsApi , params: params, type: 'POST' })
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
    deleteRExamPaperFolder (id) {
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

    // 试卷-取消发布
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
    deleteRBookFolder (id) {
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

    // 书本-取消发布
    getBook (params) {
        return ajax({ url: getBookApi , params: params, type: 'POST' })
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
    deleteRCourseFolder (id) {
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
    }
    
    
}