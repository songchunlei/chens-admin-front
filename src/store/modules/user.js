import api from '@/api'
import { doLogin, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    sysRoles: [],
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    username: '',
    id: '',
    tenantId: '',
    avatar: '',
    introduction: '',
    roles: [],
    menus: [], // 菜单
    menusJson: {}, // 放为同级的菜单
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_SYSROLES: (state, sysRoles) => {
      state.sysRoles = sysRoles
    },
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_ISLOGIN: (state, flag) => {
      state.isLogin = flag;
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },

    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_USERNAME: (state, username) => {
      state.username = username
    },
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_TENANTID: (state, tenantId) => {
      state.tenantId = tenantId
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus
    },
    SET_MENUSJSON: (state, menusJson) => {
      state.menusJson = menusJson
    }
  },

  actions: {
    // 用户名登录
    DoLogin({ commit }, userInfo) {
      // const username = userInfo.username.trim();
      userInfo.userName = userInfo.userName.trim();
      return new Promise((resolve, reject) => {
        api.doLogin(userInfo).then(response => {
          const json = response.data;
          if (json.code == 1) {
            commit('SET_TOKEN', json.data.accessToken);
            commit('SET_ID', json.data.user.id);
            commit('SET_TENANTID', json.data.user.tenantId);
            commit('SET_NAME', json.data.user.name);
            commit('SET_USERNAME', json.data.user.username);
            commit('SET_MENUSJSON', json.data.all);
            commit('SET_MENUS', json.data.menus);
            
            setToken(json.data.accessToken);
            resolve();
          } else {
            // TODO 错误
            reject(json.msg || 'error');
          }
          
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        debugger;
        api.getUserInfoByToken(state.token).then(response => {
          debugger;
          const json = response.data;
          if (json.code != 1) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject(json.msg || '用户token已经失效，请重新登录。');
          }
          commit('SET_TOKEN', json.data.accessToken);
          commit('SET_ID', json.data.user.id);
          commit('SET_TENANTID', json.data.user.tenantId);
          commit('SET_NAME', json.data.user.name);
          commit('SET_USERNAME', json.data.user.username);
          commit('SET_MENUSJSON', json.data.all);
          commit('SET_MENUS', json.data.menus);

          resolve(response);
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 系统角色
    GetSysRoles({ commit, state }) {
      return new Promise((resolve, reject) => {
        api.getSysRoles().then((response) => {
          const json = response.data;
          if (json.code != 1) {
            reject(json.msg || '获取失败。');
          }
          commit('SET_SYSROLES', json.data);
          resolve(response);
        }).catch((error) => {
          reject(error);
        });
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    DoLogout({ commit }) {
      return new Promise((resolve, reject) => {
        api.doLogout().then(() => {
          commit('SET_TOKEN', '');
          commit('SET_ID', '');
          commit('SET_TENANTID', '');
          commit('SET_NAME', '');
          commit('SET_USERNAME', '');
          commit('SET_MENUSJSON', '');
          commit('SET_MENUS', '');
          removeToken();
          resolve();
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        removeToken();
        resolve();
      })
    },

    // 动态修改权限
    ChangeRoles({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserById(role).then(response => {
          debugger;
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve()
        })
      })
    }
  }
}

export default user
