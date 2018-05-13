'use strict'

export default {
  renderForm: {
    id: { hidden: true },
    name: { label: '书本名称', type: 'input', placeholder: '请输入书本名称' },
    path: { label: '路径', type: 'input', placeholder: '请输入目录访问路径' },
    icon: { label: '图标', type: 'input' },
    req: { label: '排序', type: 'input' },
    folderName: { label: '所属目录', type: 'text' },
     description: { label: '描述', type: 'textarea', placeholder: '简述' }
  },

  rules: {
    name: [
      { required: true, message: '请输入书本名称', trigger: 'blur' },
      { min: 2, max: 16, message: '长度在 2 到 64 个字符', trigger: 'blur' }
    ],
    path: [
      { required: true, essage: '请输入目录访问路径', trigger: 'blur'  }
    ]
  }
}