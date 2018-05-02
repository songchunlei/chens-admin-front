export default {
    rules: {
        name: [
            { required: true, message: '请输入书本名称', trigger: 'blur' },
            { min: 2, max: 16, message: '长度在 2 到 64 个字符', trigger: 'blur' }
        ]
    }
}