const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  avatar: state => state.user.avatar,

  sysRoles: state => state.user.sysRoles,
  token: state => state.user.token,
  name: state => state.user.name,
  username: state => state.user.username,
  tenantId: state => state.user.tenantId,
  id: state => state.user.id,
  menus: state => state.user.menus,
  menusJson: state => state.user.menusJson,

  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  setting: state => state.user.setting,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  errorLogs: state => state.errorLog.logs,

  sources: state => state.resource.sources,
  
  visiableUpload: state => state.upload.visiableUpload,
}
export default getters
