<template>
 <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <el-input style='width:340px;' placeholder="请输入关键字" prefix-icon="el-icon-document" v-model="search.name"></el-input>
    <el-button style='margin-bottom:20px;' type="primary" icon="document" @click="handleSearch">查询</el-button>
    
    <el-table :data="list" ref="roleTable" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column align="center" label="选择框" width="65">
        <template slot-scope="scope">
          <el-radio class="radio" :label="scope.$index" v-model="radio" @change.native="getCurrentRow(scope.$index)"></el-radio>
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
  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import api from '@/api'
import { mapGetter } from 'vuex'
import { parseTime } from '@/utils'
import permBtn from '@/components/BtnTemp'
import pagePagination from '@/components/Pagination'

export default {
  name: 'roleManager',
  data() {
    return {
      list: null,
      listLoading: true,
      radio: '',
      search: {

      }
    }
  },
  components: { permBtn, pagePagination },
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
    getCurrentRow (val) {
      // TODO 请求数据 或者调用子组件请求数据
    },

    // 权限btns 子组件触发
    handlerAllot (item, type) {
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