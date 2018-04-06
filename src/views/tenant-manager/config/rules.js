export default {
    rules: {
        name: [
            { required: true, message: '请输入真实姓名', trigger: 'blur' },
            { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
        ],
        username: [
            { required: true, message: '请输入用户名/登录名', trigger: 'blur' },
            { min: 4, max: 30, message: '长度在 4 到 30 个字符', trigger: 'blur' }
        ],
        password: [
            { required: true, message: '请输入登录密码', trigger: 'blur' },
            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        phone: [
            { required: true, message: '请输入联系方式', trigger: 'blur' },
            { pattern: /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/, message: '请输入正确的手机号', trigger: 'blur, change' }
        ],
        email: [
            { required: true, message: '请输入电子邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur, change' }
        ]
    }
}