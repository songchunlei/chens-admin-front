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
     *          [自定义字段key]:  { name: "[自定义字段显示值]", type: "[自定义字段类型 text文本,date时间，字段 dict,链接 url ,file 附件]" },
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
            content: { name: "题目内容", type: "text" }
        },
        //题目对应资源
        source_List: {
            json_from_key: 'list',
            json_title_name: '资源文件',
            title_right_key: 'budAmount',
            path: { name: "文件", type: "url" }
        },
        // 题目选项
        optio_list: {
            json_type: 'list',
            json_from_key: 'list',
            json_title_name: '题目选项',
            title_right_key: 'budAmount',

            projCustomCode: { name: "用户定义项目编号", type: "text" },
            projShortname: { name: "项目简称", type: "text" },
            customerName: { name: "客户名称", type: "text" },
            chargeOrgName: { name: "部门", type: "text" },
            provinceMajorTypeName: { name: "专业类型", type: "text" },
            budRemark: { name: "摘要", type: "text" },
            budgetIncome: { name: "计划收入(不含税)", type: "text" },
            confirmedIncome: { name: "已确认收入(不含税)", type: "text" },
            budTaxName: { name: "税码", type: "text" },
            approvalIncome: { name: "档期确认收入(不含税)", type: "text" }, // TODO 待确认业务字段 inTax(obj)
            budAmount: { name: "档期确认收入(含税)", type: "text" },
            budYwflName: { name: "业务类别", type: "text" }
        }
    }
}
