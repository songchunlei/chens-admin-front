export default {
    rules: {
        tagName: [
            { required: true, message: '请输入标签名', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
        ]
    }
}