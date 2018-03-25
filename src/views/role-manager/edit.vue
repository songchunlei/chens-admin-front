<template>
    <div id="roleEdit" class="app-container simpleForm">
        <div>
            <el-form class="form-container" label-width="80px" label-position="right" :model="roleForm" :rules="rules" ref="roleForm">
                <el-form-item label="角色名" prop="roleName">
                <el-input v-model="roleForm.roleName" placeholder="角色名"></el-input>
                </el-form-item>
                <el-form-item label="角色编码" prop="roleCode">
                <el-input v-model="roleForm.roleCode" placeholder="角色编码(英文数字)"></el-input>
                </el-form-item>

                <el-form-item>
                <el-button type="primary" @click="submitForm('roleForm')">提交</el-button>
                <el-button @click="resetForm('roleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import api from '@/api';
import mapGetter from 'vuex';
import Rule from './rules'

export default {
  data () {
    return {
      rules: Rule.rules,
      roleId: '',
      roleForm: { // 角色信息
        id: '',
        roleName: '',
        roleCode: ''
      }
    }
  },
  computed: {
  },
  components: {
    
  },
  created () {
    this.initData();
  },
  mounted () {

  },
  methods: {
    // 初始化数据
    initData () {
      this.roleId = this.$route.params.id;
      console.log(this.$route.params);
      if (this.roleId == ':id') {
          return;
      }
      api.getRoleById(this.roleId).then((res) => {
          let json = res.data;
          if (json.code != 1) {
              this.$message.error(json.msg || '获取角色信息失败。');
              return;
          }
          console.log(json.data);
          this.roleForm = json.data;

      }).catch((error) => {
          this.$message.error(error || '服务异常。');
      })
    },

    // 提交角色信息
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let funName = 'createRole';
          if (this.roleId && this.roleId != ':id') {
            funName = 'updateRole'
          }
          api[funName](this.roleForm).then((res) => {
            const json = res.data;
            if (json.code != 1) {
              this.$message.error(json.msg || '提交角色信息失败。');
              return;
            }
            this.$message.success(json.msg || '提交成功。');
            this.$router.push({ path: '/roleManager/roleList' });
          }) 
        } else {
          console.log('error submit!!');
          return false;
        }
      });
      
      
    }

  }
}
</script>

<style scoped>
.simpleForm > div {
  width: 400px;
  margin-left: 150px;
}
.simpleForm form {
  text-align: left;
}
</style>