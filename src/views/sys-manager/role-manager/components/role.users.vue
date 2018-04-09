<template>
  <div class="roleUserBox">
    <div class="filter-container text-right">
        <perm-btn :item="{}" :code="$route.meta.code" @handlerAllot="handlerAllot">
        </perm-btn>
    </div>
    <el-table :data="list" ref="roleTable" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
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
          {{scope.row.username}}
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="180" align="center">
        
        <template slot-scope="scope">{{scope.row.name}}</template>
      </el-table-column>
      
      <el-table-column align="center" label="创建日期" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <page-pagination ref="pagination" :api="'userListByRoleId'" :mustParams="{ roleId: roleId }" :search="search" @complete="pagiComplete">
      </page-pagination>
    </div>

    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
       <maint-role :roleUser="list"></maint-role>
    </el-dialog>
    
  </div>
</template>
<script>
import api from '@/api'
import permBtn from '@/components/BtnTemp'
import pagePagination from '@/components/Pagination'
import maintRole from './role.maint'

export default {
  name: 'roleUsers',
  data () {
    return {
      list: [], // 角色下面的用户列表
      listLoading: false,
      search: {
        name: '',
        code: ''
      },
      dialogTitle: '角色维护',
      dialogFormVisible: false,
    }
  },
  props: {
    roleId: {
      type: String
    }
  },
  components: { permBtn, pagePagination, maintRole },
  watch: {
    roleId () {
      this.$refs.pagination.search({ roleId: this.roleId })
    }
  },
  created () {
    console.log('roleCreated');
  },
  methods: {
    pagiComplete (res) {
      this.list = res.data.data.records;
    },

    handlerAllot (type, item) {
      if (type === 'create') {
        this.dialogFormVisible = true;
      }
    }
  },

}
</script>