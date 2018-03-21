<template>
  <div id="userForm" class="app-container userForm">
    <div>
      <el-form class="form-container" label-width="80px" label-position="right" :model="userForm" :rules="rules" ref="userForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username" placeholder="登录名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="userForm.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="userForm.name" placeholder="真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="userForm.phone" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email" placeholder="电子邮箱"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('userForm')">提交</el-button>
          <el-button @click="resetForm('userForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import api from '@/api';
import Rules from './config/rules'
export default {
  name: 'editForm',
  data () {
    return {
      id: '000000', // 用户id
      rules: '',
      userForm: {
        username: '',
        password: '',
        name: '',
        phone: '',
        email: ''
      }
    }
  },
  watch: {

  },
  components: { 

  },
  created () {
    this.init();
  },
  methods: {
    init () {
      this.rules = Rules.rules;
      this.id = this.$route.params.id;
      if (this.id == '000000' || this.id == ':id') { // 新增

      } else {
        this.getUser(this.id);
      }
    },
    // id 获取用户
    getUser (id) {
      api.getUserById(id).then((res) => {
        let json = res.data;
        if (json.code == 1) {
          this.userForm = json.data;
        } else {
          // TODO 错误处理
        }
        
        debugger;
        console.log(json);

      }).catch((error) => {

      })
    },

    // 提交表单
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          debugger;
          if (this.id == '000000') { // 新增
            api.createUser(this.userForm).then((res) => {debugger;
              if (res.data.code == 1) {

              }
            });
          } else { // 修改
            api.updateUser(this.userForm).then((res) => {
              console.log(res.data);
              if (res.data.code == 1) {

              }
            }).catch((error) => {
              console.log(error);
            })
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  }
}
</script>

<style scoped>
.userForm {
}
.userForm > div {
  width: 400px;
  margin-left: 150px;
}
.userForm form {
  text-align: left;
}
</style>

