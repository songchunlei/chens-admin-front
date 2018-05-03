const upload = {
  state: {
    visiableUpload: false,
    uploadingFiles: []
  },
  mutations: {
    TOGGLE_UPLOAD: (state, visable) => {
      state.visiableUpload = visable;
    },
    SET_UPLOADING_FILES: (state, files) => {
      state.uploadingFiles = files; 
    }
  },
  actions: {
    toggleUpload({ commit }, visable) {
      commit('TOGGLE_UPLOAD', visable)
    },
    setUploadingFiles({ commit }, files) {
      commit(SET_UPLOADING_FILES, files)
    }
  }
}

export default upload
