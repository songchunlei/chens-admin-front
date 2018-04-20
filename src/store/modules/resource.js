'use strict'

const resource = {
  state: {
    sources: {
    }
  },
  
  mutations: {
    SAVE_SOURCES: (state, sources) => {
      if (sources && sources.length > 0) {
        for (let i = 0; i < sources.length; i ++) {
          state.sources[sources[i].code] = sources[i];
        }
      }
    }
  },

  actions: {
    GetSources ({ commit, state }) {
      return new Promise((resolve, reject) => {
        const sources = [
          { code: 'SOURCE_APPROVE', resourceType: 'SOURCE', funName: 'getSourceFolder' },
          { code: 'QUESTION_APPROVE', resourceType: 'QUESTION', funName: 'getQuestionsFolder' },
          { code: 'EXAM_PAPER_APPROVE', resourceType: 'EXAM_PAPER', funName: 'getExamPaperFolder' },
          { code: 'COURSE_APPROVE', resourceType: 'COURSE', funName: 'getCourseFolder' },
          { code: 'BOOK_APPROVE', resourceType: 'BOOK', funName: 'getBookFolder' }
        ];
        commit('SAVE_SOURCES', sources);
        resolve(state.sources);
      })
    }
  }
}

export default resource
