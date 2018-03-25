<template>
  <div id="userForm" class="app-container simpleForm">
    <div>
      <el-row :gutter="20">
        <el-col :span="10">
          <h4>用户基本信息</h4>
          <el-form class="form-container" label-width="80px" label-position="right" :model="userForm" :rules="rules" ref="userForm">
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

            <el-form-item>
              <el-button type="primary" @click="submitForm('userForm')">提交</el-button>
              <el-button @click="resetForm('userForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="14">
          <h4>角色信息</h4>
          <div class="checkboxBox">
            <span v-for="(item, index) in allRoles" v-show="rolesShow">
              <label>{{item.name}}</label>
              <input type="checkbox"/>
            </span>
          </div>
        </el-col>
      </el-row>
      
    </div>
  </div>
</template>

<script>
import api from '@/api';
import { mapGetters } from 'vuex';
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
      },
      rolesShow: false,
      userRoles: [], // 用户的角色
      allRoles: [], // 所有角色
    }
  },
  watch: {

  },
  components: { 

  },
  computed: {
      ...mapGetters([
          'sysRoles'
      ])
  },
  created () {
    this.init();
  },
  methods: {
    init () {
      this.rules = Rules.rules;
      this.id = this.$route.params.id;
      debugger;
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
    // render页面
    renderRoles () {
      if (this.userRoles.length > 0 && this.allRoles.length > 0) {
        this.rolesShow = true;
      } else {
        return false;
      }
    },

    // 获取角色 by userId
    getRolesByUserId () {
      api.getRolesByUserId().then((res) => {
        let json = res.data;
        if (json.code != 1) {
          this.$message.error(json.msg || '获取该用户角色信息失败。');
          return;
        }
        this.userRoles = json.data;
        this.renderRoles();
      }).catch((error) => {
        this.$message.error(error || '系统异常。')
      });
    },

    // 获取所有角色
    getSysRoles () {
      if (this.sysRoles && this.sysRoles.length > 0) {
        this.allRoles = this.sysRoles;
      } else {
        this.$store.distach('GetSysRoles').then((res) => {
          const json = res.data;
          this.allRoles = json.data;
          this.renderRoles();
        }).catch((error) => {
          this.$message.error(error || '系统异常。');
        })
      }
    },
    // 提交表单
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          debugger;
          if (this.id == '000000' || this.id == ':id') { // 新增
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
</style>

