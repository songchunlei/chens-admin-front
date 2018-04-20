export default {
    rules: {
        tagName: [
            { required: true, message: '请输入标签名', trigger: 'blur' },
            { min: 2, max: 32, message: '长度在 2 到 32 个字符', trigger: 'blur' }
        ]
    }
}