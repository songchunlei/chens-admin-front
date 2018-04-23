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
          { code: 'SOURCE_APPROVE', resourceType: 'SOURCE', 
            getFolders: 'getSourceFolder', createFolder:'createSourceFolder',updateFolder: 'updateSourceFolder', deleteFolder:'deleteSourceFolder',
            createFileRoute:'',editFileRoute:'',deleteFile:'deleteSource',
          },    
          { code: 'QUESTION_APPROVE', resourceType: 'QUESTION', 
            getFolders: 'getQuestionsFolder', createFolder:'createQuestionsFolder',updateFolder: 'updateQuestionsFolder', deleteFolder:'deleteQuestionsFolder',
            createFileRoute:'',editFileRoute:'',deleteFile:'deleteQuestions'
          },    
          { code: 'EXAM_PAPER_APPROVE', resourceType: 'EXAM_PAPER',
            getFolders: 'getExamPaperFolder', createFolder:'createExamPaperFolder',updateFolder: 'updateExamPaperFolder', deleteFolder:'deleteExamPaperFolder',
            createFileRoute:'',editFileRoute:'',deleteFile:'deleteExamPaper'
          },
          { code: 'COURSE_APPROVE', resourceType: 'COURSE',
            getFolders: 'getCourseFolder', createFolder:'createCourseFolder',updateFolder: 'updateCourseFolder', deleteFolder:'deleteCourseFolder',
            createFileRoute:'',editFileRoute:'',deleteFile:'deleteCourse'
          },
          { code: 'BOOK_APPROVE', resourceType: 'BOOK',
            getFolders: 'getBookFolder', createFolder:'createBookFolder',updateFolder: 'updateBookFolder', deleteFolder:'deleteBookFolder',
            createFileRoute:'',editFileRoute:'',deleteFile:'deleteBook'
          }
        ];
        commit('SAVE_SOURCES', sources);
        resolve(state.sources);
      })
    }
  }
}

export default resource
