<template>
 <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <el-input style='width:340px;' placeholder="请输入关键字" prefix-icon="el-icon-document" v-model="search.keyword"></el-input>
    <el-button style='margin-bottom:20px;' type="primary" icon="document" @click="handleSearch">查询</el-button>
    
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column align="center" label="选择框" width="65">
        <template slot-scope="scope">
          <el-checkbox></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="名称">
        <template slot-scope="scope">
          {{scope.row.tenantName}}
        </template>
      </el-table-column>
      <el-table-column label="营业执照" width="180">
        <template slot-scope="scope">{{scope.row.jregLicens}}</template>
      </el-table-column>

      <el-table-column label="代理人账号" width="180">
        <template slot-scope="scope">{{scope.row.userName}}</template>
      </el-table-column>

      <el-table-column label="租户状态" width="180">
        <template slot-scope="scope">{{scope.row.status}}</template>
      </el-table-column>
      
      <el-table-column align="center" label="创建日期">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="335" align="center">
        <template slot-scope="scope">
          
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <page-pagination :api="'getTanants'" :search="search" @complete="complete">
      </page-pagination>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import { mapState } from 'vuex';
import { parseTime } from '@/utils'
import permBtn from '@/components/BtnTemp'
import pagePagination from '@/components/Pagination'

export default {
  name: 'tenantList',
  data() {
    return {
      list: null,
      listLoading: true,
      search: { // 查询条件
        keyword: '', // 关键字
      },
      dialogFormVisible: false,
      isIndeterminate: false
    }
  },
  computed:{

  },
  components: { permBtn, pagePagination },
  created() {
    console.log('parent created');
  },
  mounted () {
    console.log('parent mounted');
  },
  methods: {
    complete (res) {
      this.listLoading = false;
      this.list = res.data.data.records;
    },
    // 搜索
    handleSearch () {
      this.$refs.pagination.search(this.search);
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