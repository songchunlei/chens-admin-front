<template>
  <div id="userForm" class="app-container simpleForm">
    <div>
      <el-form class="form-container app-container" label-width="80px" label-position="right" :model="userForm" :rules="rules" ref="userForm">
        <el-row :gutter="50">
          <el-col :span="10">
            <h4><i class="iconFont icon-jibenziliao"></i>用户基本信息</h4>
            
              <el-form-item label="用户名" prop="username">
                <el-input v-model="userForm.username" placeholder="登录名"></el-input>
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
          </el-col>
          <el-col :span="12">
            <h4><i class="iconFont icon-jiaoseguanli"></i>角色信息</h4>
            <div v-show="rolesShow">
              <role-allot :userId="id"></role-allot>
            </div>
          </el-col>
        </el-row>

        <el-form-item class="text-center" style="margin-top: 40px;padding-right: 15%">
          <el-button type="primary" @click="submitForm('userForm')">提交</el-button>
          <el-button @click="resetForm('userForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import api from '@/api';
import Rules from './config/rules';
import roleAllot from './components/roleAllot';

export default {
  name: 'editForm',
  data () {
    return {
      id: '', // 用户id
      rules: '',
      userForm: {
        username: '',
        password: '',
        name: '',
        phone: '',
        email: ''
      },
      rolesShow: false
    }
  },
  watch: {

  },
  components: { roleAllot },

  created () {
    this.init();
  },
  methods: {
    init () {
      this.rules = Rules.rules;
      this.id = this.$route.query.userId;
      this.rolesShow = true;
      if (this.id) {
        this.getUser(this.id);
      }
    },
    // id 获取用户
    getUser (id) {
      api.getUserById(id).then((res) => {
        let json = res.data;
        if (json.code != 1) {
          this.$message.warning(json.msg || '获取用户失败。');
          retun;
        }
        this.userForm = json.data;
      }).catch((error) => {
        this.$message.error(json.msg || '系统错误。');
      })
    },
    // 提交表单
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          debugger;
          if (this.id == ':id') { // 新增
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
.simpleForm > div {
}
.simpleForm form {
  text-align: left;
}
h4 > i {
  color: #FF9A4C;
  font-size: 22px;
  vertical-align: middle;
  margin-right: 4px;
}
</style>

