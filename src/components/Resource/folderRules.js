export default {
    rules: {
        name: [
            { required: true, message: '请输入文件夹名称', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ]
    }
}