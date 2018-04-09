<template>
 <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <el-input style='width:340px;' placeholder="请输入关键字" prefix-icon="el-icon-document" v-model="search.name"></el-input>
    <el-button style='margin-bottom:20px;' type="primary" icon="document" @click="handleSearch">查询</el-button>
    
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
          {{scope.row.code}}
        </template>
      </el-table-column>
      
      <el-table-column align="center" label="创建日期" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span v-if="scope.row.createTime">{{scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="235" align="center">
        <template slot-scope="scope">
          <perm-btn :item="scope.row" :code="$route.meta.code" @handlerAllot="handlerAllot"></perm-btn>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <page-pagination ref="pagination" :api="'getRoles'" :search="search" @complete="complete">
      </page-pagination>
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

export default {
  name: 'roleManager',
  data() {
    return {
      list: null,
      listLoading: true,
      radio: '',
      currentItem: '',
      search: {

      }
    }
  },
  components: { permBtn, pagePagination, roleUsers },
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
      this.$refs.pagination.search(this.search);
    },
    
    // 选中
    getCurrentRow (item) {
      console.log(item.id);
      this.currentItem = item;
    },

    // 权限btns 子组件触发
    handlerAllot (type, item) {
    },
  }
}
</script>

<style>
.el-checkbox-group .el-checkbox {
  margin-left: 0px;
  margin-right: 30px;
} 
</style>