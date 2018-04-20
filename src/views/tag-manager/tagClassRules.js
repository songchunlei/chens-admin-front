export default {
    rules: {
        className: [
            { required: true, message: '请输入标签分类名称', trigger: 'blur' },
            { min: 2, max: 32, message: '长度在 2 到 32 个字符', trigger: 'blur' }
        ]
    }
}