export default {
    rules: {
        belong_subject: [
            { required: true, message: '请选择题目类型', trigger: 'blur' },
        ],
        name: [
            { required: true, message: '请输入题目名称', trigger: 'blur' },
            { min: 2, max: 16, message: '长度在 2 到 64 个字符', trigger: 'blur' }
        ],
        type: [
            { required: true, message: '请选择试题类型', trigger: 'blur' },
        ],
        answer: [
            { required: true, message: '请填写该内容', trigger: 'blur' }
        ]
    }
}