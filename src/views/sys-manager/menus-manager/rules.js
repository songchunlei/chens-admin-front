export default {
    rules: {
        name: [
            { required: true, message: '请输入菜单名', trigger: 'blur' },
            { min: 2, max: 32, message: '长度在 2 到 32 个字符', trigger: 'blur' }
        ],
        url: [
            { required: true, message: '请输入访问路径', trigger: 'blur' }
        ]
    }
}