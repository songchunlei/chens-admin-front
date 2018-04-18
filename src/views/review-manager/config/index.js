export default {
    /**
     * 流程key-模版关系配置
     * 流程key: 模版key
     * flowkey: {
     *  [自定义流程key]: [自定义模版key]
     * }
     */
    flowkey: {
        //资源审核
        "SOURCE_APPROVE": 'F_SOURCE',
        //题目审核
        "QUESTION_APPROVE": 'F_QUESTION',
        //试卷审核
        "EXAM_PAPER_APPROVE": 'F_EXAM_PAPER',
        //课程审核
        "COURSE_APPROVE": 'F_COURSE',
        //书本审核
        "BOOK_APPROVE": 'F_BOOK'
    },

    /**
     * 模版配置
     * [自定义模版key]:{
     *  [自定义content_key_1]:{
     *          json_from_key: '',
     *          json_type: '[json类型,form 表单,list 列表]',
     *          json_title_name: '[自定义标题内容]',
     *          title_icon: '[自定义标题图标]',
     *          title_right_key: '[自定义标题显示值]',
     *
     *          [自定义字段key]:  { name: "[自定义字段显示值]", 
     *                            type: "[自定义字段类型 text文本,date时间，字段 dict,单个附件 file , files 多个附件
     *                                                 链接 url ,多选 checkbox ,单选 radio]" }
     *                                                  
     *      }
     *  }
     *
     */

    //资源
    F_SOURCE: {
        // 抬头信息
        title_info: {
            json_from_key: '',
            json_title_name: '资源信息',
            title_icon: 'icon-duojibiaoti',
            title_right_key: 'busRecordNo',

            createByName: { name: "创建人", type: "text" },
            createTime: { name: "创建时间", type: "date" },
            name: { name: "名称", type: "text" },
            type: { name: "类型", type: "dict" },
            content: { name: "内容", type: "text" },
            remark: { name: "备注", type: "text" }
        },
        file_info: {
            json_from_key: '',
            json_title_name: '资源文件',
            title_right_key: 'budAmount',
            path: { name: "文件", type: "url" }
        }
    },
    // 题目
    F_QUESTION: {
        title_info: {
            json_from_key: '',
            json_title_name: '题目信息',
            title_icon: 'icon-duojibiaoti',
            title_right_key: 'busRecordNo',

            createByName: { name: "创建人", type: "text" },
            createTime: { name: "创建时间", type: "date" },
            name: { name: "题目名称", type: "text" },
            type: { name: "题目类型", type: "dict" },
            difficulty: { name: "难度", type: "dict" },
            content: { name: "题目内容", type: "text" },
            questionsQuoteList:{name: "资源", type: "files"}
        },
        // 题目选项
        option_list: {
            json_type: 'list',
            json_from_key: 'questionsOptionList',
            json_title_name: '题目选项',
            title_right_key: 'budAmount',

            optionSeq: { name: "选项顺序", type: "text" },
            optionContent: { name: "选项内容", type: "text" },
            isRight: { name: "正确答案", type: "radio" },
            remark: { name: "备注", type: "text" },
            optionQuoteList:{name: "资源", type: "files"}
        }
    }
}
