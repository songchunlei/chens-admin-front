<template>
 <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <el-input style='width:340px;' placeholder="请输入关键字" prefix-icon="el-icon-document" v-model="filename"></el-input>
    <el-button style='margin-bottom:20px;' type="primary" icon="document" @click="handleSearch">查询</el-button>
    
    <!-- Role -->
    <el-button style="float: right;" type="success" @click="openRolesPopo">分配角色</el-button>

    <el-dialog title="分配角色" :visible.sync="dialogFormVisible">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedRoles" @change="handleCheckedRoleChange">
        <el-checkbox v-for="role in roles" :label="role.id" :key="role.id">{{role.roleName}}</el-checkbox>
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="subRoles">确 定</el-button>
      </div>
    </el-dialog>

    <!-- Role -->
    
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column align="center" label="选择框" width="65">
        <template slot-scope="scope">
          <el-checkbox></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column align="center" label='Id' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="用户名">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="创建者" width="150" align="center">
        
        <template slot-scope="scope">{{scope.row.tenantId}}</template>
      </el-table-column>
      
      <el-table-column align="center" label="创建日期" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="235" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{$t('table.edit')}}</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row,'deleted')">{{$t('table.delete')}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import api from '@/api'
import { mapState, mapActions } from 'vuex';
import { parseTime } from '@/utils'

export default {
  name: 'exportExcel',
  data() {
    return {
      list: null,
      listLoading: true,
      page: { // 分页信息
        current: 1,
        size: 10
      },
      search: { // 查询条件

      },

      downloadLoading: false,
      filename: '',

      checkedRoles: [], // 选中的角色
      checkAll: false,
      roles: [],
      ids: [], // 所有的id
      dialogFormVisible: false,
      isIndeterminate: false
    }
  },
  computed:{
    ...mapState({

    })
  },
  created() {
    this.userList()
  },
  methods: {
    userList(success) {
      let params = {
        "page": this.page,
        "search": this.search
      }
      let _this = this;
      api.getUsers(params).then((res) => {
        _this.listLoading = false;
        if (res.data.code == 1) {
          let json = res.data.data;
          let records = json.records;
          if (success) {
            success(records);
          } else {
            _this.list = records;
          }
        } else {
        }
      }).catch( (error) => {
        this.listLoading = false;
      });
    },

    // 搜索
    handleSearch () {

    },

    // 用户修改
    handleUpdate (user) {
      debugger;
      let id = user ? user.id : '000000';
      this.$router.push({ path: '/userManager/editUser/' + id });
    },

    // 删除用户
    handleDelete (user, type) {
      if (type == 'deleted') {
        api.deleteUserById(user.id).then((res) => {
          console.log(3);
        });
      }
    },

    // 分配角色

    // getRoles
    getRoles () {
      
    },


    // 打开角色弹窗
    
    openRolesPopo () {
      this.dialogFormVisible = true;
      let _this = this;
      api.getRoles().then((res) => {
        _this.listLoading = false;
        if (res.data.code == 1) {
          let roles = res.data.data;
          _this.roles = roles;
          _this.getIds(_this.roles); // 拿到所有角色id
        }
      }).catch( (error) => {
        this.listLoading = false;
      });

    },
    // getIds

    getIds (arr) {
      let ids = [];
      if (arr && arr.length > 0) {
        for (var i=0; i < arr.length; i++) {
          ids.push(arr[i].id);
        }
      }
      this.ids = ids;
    },

    // -- 单选
    handleCheckedRoleChange (value) {
      console.log(value);
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.roles.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.roles.length;
    },

    // -- 全选
    handleCheckAllChange (val) {
      console.log(roles());
      debugger;
      this.checkedRoles = val ? this.ids : [];
      this.isIndeterminate = false;
    },

    // 提交
    subRoles() {
      this.dialogFormVisible = false;
    }
  }
}
</script>

<style>
.el-checkbox-group .el-checkbox {
  margin-left: 0px;
  margin-right: 30px;
} 
</style>