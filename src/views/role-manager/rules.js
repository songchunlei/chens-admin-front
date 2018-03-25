export default {
    rules: {
        roleName: [
            { required: true, message: '请输入角色名', trigger: 'blur' },
            { min: 2, max: 32, message: '长度在 2 到 32 个字符', trigger: 'blur' }
        ],
        roleCode: [
            { required: true, message: '请输入角色编码', trigger: 'blur' },
            { min: 4, max: 32, message: '长度在 4 到 32 个字符', trigger: 'blur' },
            { pattern: /^[a-zA-Z\d]+$/, message: '请输入正确的角色编码', trigger: 'blur, change' }
        ],
    }
}