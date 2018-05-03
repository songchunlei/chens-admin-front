const upload = {
  state: {
    visiableUpload: false,
    uploadingFiles: []
  },
  mutations: {
    TOGGLE_UPLOAD: (state, visable) => {
      state.visiableUpload = visable;
    },
    PUSH_UPLOADING_FILES: (state, file) => {
      state.uploadingFiles.push(file);
    }
  },
  actions: {
    toggleUpload({ commit }, visable) {
      commit('TOGGLE_UPLOAD', visable)
    },
    pushUploadingFiles({ commit }, file) {
      commit('PUSH_UPLOADING_FILES', file)
    }
  }
}

export default upload
