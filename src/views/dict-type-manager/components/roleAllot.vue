<template>
    <div id="roleAllot" class="app-container">
        <div>
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="userRoles" @change="handleCheckedAllRolesChange">
                <el-checkbox v-for="item in allRoles" :label="item" :key="item.id">{{item.roleName}}</el-checkbox>
            </el-checkbox-group>
        </div>
        <div class="line_dashed"></div>
    </div>
</template>
<script>
import api from '@/api';
import { mapGetters } from 'vuex';

export default {
  name: 'role-allot',
  data () {
    return {
      isIndeterminate: true,
      allRoles: [], // 全部角色
      userRoles: [], // 用户角色
      checkAll: '', // 全选
    }
  },
  props: ['userId'],
  computed: {
    ...mapGetters([
      'sysRoles'
    ])
  },
  created () {
    this.initData();
  },
  mounted () {

  },
  methods: {
    initData () {
      if (!this.userId) {
          alert(2);
        this.userId = this.$route.params.id;
      }
      if (this.userId != ':id') { // 修改
        this.getRolesByUserId();
      }
      this.getSysRoles();
    },

    // 获取角色 by userId
    getRolesByUserId () {
      api.getRolesByUserId(this.userId).then((res) => {debugger;
        const json = res.data;
        if (json.code != 1) {
          this.$message.error(json.msg || '获取该用户角色信息失败。');
          return;
        }
        this.userRoles = json.data || [];
      }).catch((error) => {
        this.$message.error(error || '系统异常。')
      });
    },

    // 获取所有角色
    getSysRoles () {
      if (this.sysRoles && this.sysRoles.length > 0) {
        this.allRoles = this.sysRoles;
      } else {
        this.$store.dispatch('GetSysRoles').then((res) => {debugger;
          const json = res.data;
          if (json.code != 1) {
            this.$message.error(json.msg || '获取该角色信息失败。');
            return;
          }
          this.allRoles = json.data || [];
        }).catch((error) => {
          this.$message.error(error || '系统异常。');
        })
      }
    },

    // 全选改变
    handleCheckAllChange (val) {debugger;
      console.log(val);
      this.userRoles = val ? this.allRoles : [];
      this.isIndeterminate = false;
    },

    // 全部角色里 已选 改变
    handleCheckedAllRolesChange (value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.allRoles.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.allRoles.length;
    }
  }
}
</script>

<style scoped>
.line_dashed {
    margin: 30px 0;
    text-align: left;
}
.line_dashed:after{
    content: " ";
    width: 50%;
    border-bottom: 1px dashed #999;
    display: block;
}
.item-msg {
    color: #999;
    fints-size: 14px;
    margin-bottom: 15px;
}
.item-msg > span{
    padding: 4px 6px;
    border-bottom:1px solid #999;
}
.noData {
    color: #ff9a4c;
}
.el-checkbox+.el-checkbox {
    margin-left: 0px;
}
.el-checkbox {
    margin-right: 30px;
}
</style>