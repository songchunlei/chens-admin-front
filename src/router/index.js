import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if fasle ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'dashboard', noCache: true, code: '' }
    }]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/icon',
    component: Layout,
    children: [{
      path: 'index',
      component: _import('svg-icons/index'),
      name: 'icons',
      meta: { title: 'icons', icon: 'icon', noCache: true }
    }]
  },

  {
    path: '/components',
    component: Layout,
    redirect: 'noredirect',
    name: 'component-demo',
    meta: {
      title: 'components',
      icon: 'component'
    },
    children: [
      { path: 'tinymce', component: _import('components-demo/tinymce'), name: 'tinymce-demo', meta: { title: 'tinymce' }},
      { path: 'markdown', component: _import('components-demo/markdown'), name: 'markdown-demo', meta: { title: 'markdown' }},
      { path: 'count-to', component: _import('components-demo/countTo'), name: 'countTo-demo', meta: { title: 'countTo' }},
      { path: 'mixin', component: _import('components-demo/mixin'), name: 'componentMixin-demo', meta: { title: 'componentMixin' }},
      { path: 'back-to-top', component: _import('components-demo/backToTop'), name: 'backToTop-demo', meta: { title: 'backToTop' }}
    ]
  },


  {
    path: '/example',
    component: Layout,
    redirect: '/example/table/complex-table',
    name: 'example',
    meta: {
      title: 'example',
      icon: 'example'
    },
    children: [
      {
        path: '/example/table',
        component: _import('example/table/index'),
        redirect: '/example/table/complex-table',
        name: 'Table',
        meta: {
          title: 'Table',
          icon: 'table'
        },
        children: [
          { path: 'dynamic-table', component: _import('example/table/dynamicTable/index'), name: 'dynamicTable', meta: { title: 'dynamicTable' }},
          { path: 'drag-table', component: _import('example/table/dragTable'), name: 'dragTable', meta: { title: 'dragTable' }},
          { path: 'inline-edit-table', component: _import('example/table/inlineEditTable'), name: 'inlineEditTable', meta: { title: 'inlineEditTable' }},
          { path: 'tree-table', component: _import('example/table/treeTable/treeTable'), name: 'treeTableDemo', meta: { title: 'treeTable' }},
          { path: 'custom-tree-table', component: _import('example/table/treeTable/customTreeTable'), name: 'customTreeTableDemo', meta: { title: 'customTreeTable' }},
          { path: 'complex-table', component: _import('example/table/complexTable'), name: 'complexTable', meta: { title: 'complexTable' }}
        ]
      },
      { path: 'tab/index', icon: 'tab', component: _import('example/tab/index'), name: 'tab', meta: { title: 'tab' }}
    ]
  },

  { 
    path: '/sysManager',
    component: Layout,
    redirect: '/sysManager/userManager/userList',
    name: 'sysManager',
    meta: {
      title: 'sysManager',
      icon: 'table'
    },
    children: [
      {
        path: '/sysManager/user',
        component: _import('sys-manager/user-manager/index'),
        redirect: '/sysManager/userManager/userList',
        name: 'userManager',
        meta: {
          title: 'userManager',
          icon: 'form'
        },
        children: [
          { path: 'userUpdate', component: _import('sys-manager/user-manager/edit'), name: 'userUpdate', meta: { title: 'userUpdate' }},
          { path: 'userPage', component: _import('sys-manager/user-manager/list'), name: 'userPage', meta: { title: 'userPage', code: 'user/userPage' }}
        ]
      },
      {
        path: '/sysManager/role',
        component: _import('sys-manager/role-manager/index'),
        redirect: '/sysManager/role/roleList',
        name: 'roleManager',
        meta: {
          title: 'roleManager',
          icon: 'form'
        },
        children: [
          { path: 'roleUpdate', component: _import('sys-manager/role-manager/edit'), name: 'roleUpdate', meta: { title: 'roleUpdate' }},
          { path: 'rolePage', component: _import('sys-manager/role-manager/list'), name: 'rolePage', meta: { title: 'rolePage', code: 'role/rolePage' }}
        ]
      },
      { path: 'menuList',  component: _import('sys-manager/menus-manager/edit'), name: 'menusList', meta: { title: 'menusManager', code: 'menusList' }},
      {
        path: 'sysLogList',
        component: _import('sys-manager/sys-log-manager/list'),
        name: 'sysLogList',
        meta: {
          title: 'sysLogList',
          icon: 'form'
        }
      },
      {
        path: 'tenantList',
        component: _import('sys-manager/tenant-manager/list'),
        name: 'tenantList',
        meta: {
          title: 'tenantList',
          icon: 'form'
        }
      }
      

    ]
  },

  {
    path: '/sourceManager',
    component: Layout,
    redirect: 'noredirect',
    name: 'sourceManager',
    meta: {
      title: 'sourceManager',
      icon: 'table'
    },
    children: [
      { path: 'sourcePage', component: _import('source-manager/sourcePage'), name: 'source-page', meta: { title: 'sourcePage', icon: 'table' }},
      { path: 'error', component: _import('source-manager/error'), name: 'error-source', meta: { title: 'errorSource', icon: 'table' }},
      { path: 'other', component: _import('source-manager/other'), name: 'other-source', meta: { title: 'otherSource', icon: 'table' }}
    ]
  },
  {
    path: '/questionManager',
    component: Layout,
    redirect: 'noredirect',
    name: 'questionManager',
    meta: {
      title: 'questionManager',
      icon: 'table'
    },
    children: [
      { path: 'questionPage', component: _import('questions-manager/questionPage'), name: 'questionPage', meta: { title: 'questionPage', code: 'questionPage', icon: 'form' }},
      { path: 'reQuestionPage', component: _import('questions-manager/reQuestionPage'), name: 'reQuestionPage', meta: { title: 'reQuestionPage', code: 'reQuestionPage', icon: 'form' }},
      { path: 'createQuestion', component: _import('questions-manager/createQuestion'), name: 'createQuestion', meta: { title: 'createQuestion', icon: 'form' }},
    ]
  },
  {
    path: '/examPaperManager',
    component: Layout,
    redirect: 'noredirect',
    name: 'examPaperManager',
    meta: {
      title: 'examPaperManager',
      icon: 'table'
    },
    children: [
      { path: 'examPaperPage', component: _import('exam-manager/examPaperPage'), name: 'examPaperPage', meta: { title: 'examPaperPage', code: 'examPaperPage', icon: 'form' }},
      { path: 'reExamPaperPage', component: _import('exam-manager/reExamPaperPage'), name: 'reExamPaperPage', meta: { title: 'reExamPaperPage', code: 'reExamPaperPage', icon: 'form' }},
      { path: 'createExam', component: _import('exam-manager/createExam'), name: 'createExam', meta: { title: 'createExam', icon: 'form' }},
    ]
  },

  {
    path: '/bookManager',
    component: Layout,
    redirect: 'noredirect',
    name: 'bookManager',
    meta: {
      title: 'bookManager',
      icon: 'table'
    },
    children: [
      { path: 'bookPage', component: _import('book-manager/bookPage'), name: 'bookPage', meta: { title: 'bookPage', code: 'bookPage', icon: 'form' }},
      { path: 'reBookPage', component: _import('book-manager/reBookPage'), name: 'reBookPage', meta: { title: 'reBookPage', code: 'reBookPage', icon: 'form' }},
      { path: 'createBook', component: _import('book-manager/createBook'), name: 'createBook', meta: { title: 'createBook', icon: 'form' }},
    ]
  },

  {
    path: '/courseManager',
    component: Layout,
    redirect: 'noredirect',
    name: 'courseManager',
    meta: {
      title: 'courseManager',
      icon: 'table'
    },
    children: [
      { path: 'coursePage', component: _import('course-manager/coursePage'), name: 'coursePage', meta: { title: 'coursePage', code: 'coursePage', icon: 'form' }},
      { path: 'reCoursePage', component: _import('course-manager/reCoursePage'), name: 'reCoursePage', meta: { title: 'reCoursePage', code: 'reCoursePage', icon: 'form' }},
      { path: 'createCourse', component: _import('course-manager/createCourse'), name: 'createCourse', meta: { title: 'createCourse', icon: 'form' }},
    ]
  },

  {
    path: '/myCenter',
    component: Layout,
    redirct: '/myCenter/myUndoPage',
    name: 'myCenter',
    meta: {
      title: 'myCenter',
      icon: 'form'
    },
    children: [
      { path: 'myUndoPage', component: _import('review-manager/undo'), name: 'undoList', meta: { title: 'undoList', icon: 'form', code: 'myUndoPage' }},
      { path: 'myDonePage', component: _import('review-manager/done'), name: 'doneList', meta: { title: 'doneList', icon: 'form', code: 'myDonePage' }},
      { path: 'myStartPage', component: _import('review-manager/myStart'), name: 'myStartList', meta: { title: 'myStartList', icon: 'form', code: 'myStartPage' }},
      { path: 'undoReivew', component: _import('review-manager/undoReivew'), name: 'undoReivew', meta: { title: 'undoReivew', icon: 'form' }}
    ]
  },
  {
    path: '/commonDataManager',
    component: Layout,
    redirct: '/commonDataManager/tagClassList',
    name: 'commonDataManager',
    meta: {
      title: 'commonDataManager',
      icon: 'form'
    },
    children: [
      { path: 'tagClassList', component: _import('tag-manager/tagClass'), name: 'tagClassList', meta: { title: 'tagClassList', icon: 'form', code: 'tagClassList' }},
      { path: 'tagList', component: _import('tag-manager/tag'), name: 'tagList', meta: { title: 'tagList', icon: 'form', code: 'tagList' }}
    ]
  },

  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'excel',
    meta: {
      title: 'excel',
      icon: 'excel'
    },
    children: [
      { path: 'export-excel', component: _import('excel/exportExcel'), name: 'exportExcel', meta: { title: 'exportExcel' }},
      { path: 'export-selected-excel', component: _import('excel/selectExcel'), name: 'selectExcel', meta: { title: 'selectExcel' }},
      { path: 'upload-excel', component: _import('excel/uploadExcel'), name: 'uploadExcel', meta: { title: 'uploadExcel' }}
    ]
  },

  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    meta: { title: 'zip', icon: 'zip' },
    children: [{ path: 'download', component: _import('zip/index'), name: 'exportZip', meta: { title: 'exportZip' }}]
  },

  { path: '*', redirect: '/404', hidden: true }
]
