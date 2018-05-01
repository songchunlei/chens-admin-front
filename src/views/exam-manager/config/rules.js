export default {
    rules: {
        name: [
            { required: true, message: '请输入试卷名称', trigger: 'blur' },
            { min: 2, max: 16, message: '长度在 2 到 128 个字符', trigger: 'blur' }
        ],
        packExam: [
            { required: true, message: '请选择组卷方式', trigger: 'blur' }
        ],
        passPoint: [
            { type: 'number', required: true, message: '请输入及格分数', trigger: 'change' }
        ],
        totalPoint: [
            { type: 'number', required: true, message: '请输入总分数', trigger: 'change' }
        ],
        
        duration: [
            { type: 'number', required: true, message: '请输入考试时长', trigger: 'change' }
        ]
    }
}