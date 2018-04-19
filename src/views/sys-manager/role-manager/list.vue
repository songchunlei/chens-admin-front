<template>
 <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <el-input style='width:340px;' placeholder="请输入关键字" prefix-icon="el-icon-document" v-model="search.name"></el-input>
    <el-button style='margin-bottom:20px;' type="primary" icon="document" @click="handleSearch">查询</el-button>
    <el-button v-if="createVisable" type="success" icon="document" @click="routerUpdate">新增</el-button>

    <el-table :data="list" ref="roleTable" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column align="center" label="选择框" width="65">
        <template slot-scope="scope">
          <el-radio class="radio" :label="scope.$index" v-model="radio" @change.native="getCurrentRow(scope.row)"></el-radio>
        </template>
      </el-table-column>

      <el-table-column align="center" label='Id' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="角色名">
        <template slot-scope="scope">
          {{scope.row.roleName}}
        </template>
      </el-table-column>
      <el-table-column label="角色CODE">
        <template slot-scope="scope">
          {{scope.row.roleCode}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="创建日期" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span v-if="scope.row.createTime">{{scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="335" align="center">
        <template slot-scope="scope">
          <perm-btn :item="scope.row" :code="$route.meta.code" @handlerAllot="handlerAllot" @btnTempComplete="btnTempComplete">
          </perm-btn>
        </template>
      </el-table-column>

    </el-table>
    <div class="pagination-container">
      <page-pagination ref="pagination" :api="'getRoles'" :search="search" @complete="complete">
      </page-pagination>
    </div>

    <div>
      <el-dialog title="角色信息" :visible.sync="editRoleDialog.dialogTableVisible">
        <roleEdit-dialog v-if="editRoleDialog.dialogTableVisible" :roleId="currentItem.id" @completeUpdate="completeUpdate"></roleEdit-dialog>
      </el-dialog>
    </div>

    <div style="margin-top: 100px" v-if="currentItem">
      <h4 class="m-b-md">角色<span class="font-mark">{{currentItem.roleName}}</span>下的用户</h4>
      <role-users :roleId="currentItem.id"></role-users>
    </div>
  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import api from '@/api'
import { mapGetter } from 'vuex'
import { parseTime } from '@/utils'
import permBtn from '@/components/BtnTemp'
import pagePagination from '@/components/Pagination'
import roleUsers from './components/role.users'
import roleEditDialog from './components/role.edit'

export default {
  name: 'roleManager',
  data() {
    return {
      list: null,
      listLoading: true,
      radio: '',
      currentItem: '',
      search: {

      },
      createVisable: false, // 新增显示控制
      editRoleDialog: {
        dialogTableVisible: false,
        currentRoleId:''
      }
    }
  },
  components: { permBtn, pagePagination, roleUsers,roleEditDialog },
  computed: {
  },
  created () {
  },
  methods: {
    complete (res) {
      this.listLoading = false;
      this.list = res.data.data.records;
    },

    handleSearch () {
      let searchParams = {};
      searchParams.roleName = this.search.keywords;
      searchParams.roleCode= this.search.keywords;
      searchParams.isAnd = false;
      this.$refs.pagination.search(searchParams);
    },

    // 选中
    getCurrentRow (item) {
      // console.log(item.id);
      // this.currentItem = item;
    },

    // 角色修改
    routerUpdate (item) {
      // this.$router.push({ path: '/sysManager/role/roleUpdate/', query: { 'userId': itemId }});

      this.currentItem = item;
      this.editRoleDialog.dialogTableVisible = true;


    },

    //更新完成后事件
    completeUpdate (type) {
      this.editRoleDialog.dialogTableVisible = false;
      this.handleSearch();
    },

    // 删除
    handleDelete (item) {
      if (!item || !item.id) {
        return;
      }

      api.deleteRole(item.id).then((res) => {
        const json = res.data;
        if (json.code ===1) {
          this.$message.success(json.msg);
          this.$refs.pagination.refresh();
        }
      }).catch((error) => {
        this.$message.error(error);
      });
    },

    // 权限btns 子组件触发
    handlerAllot (type, item) {
      switch (type) {
        case 'create': this.routerUpdate();
          break;
        case 'update': this.routerUpdate(item);
          break;
        case 'delete': this.handleDelete(item);
          break;
        default:;
      }
    },

    btnTempComplete (showBtns) {
      this.createVisable = showBtns.create;
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
