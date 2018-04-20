<template>
 <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <el-input style='width:340px;' placeholder="请输入关键字" prefix-icon="el-icon-document" v-model="search.keyword"></el-input>
    <el-button style='margin-bottom:20px;' type="primary" icon="document" @click="handleSearch">查询</el-button>
    
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column align="center" label='Id' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          {{scope.row.opt}}
        </template>
      </el-table-column>
      <el-table-column label="请求人HOST" width="150">
        <template slot-scope="scope">{{scope.row.host}}</template>
      </el-table-column>

      <el-table-column label="请求串">
        <template slot-scope="scope">{{scope.row.url}}</template>
      </el-table-column>
      
      <el-table-column label="请求日期" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <page-pagination :api="'getSysLogs'" :search="search" @complete="complete">
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
  name: 'sysLogPage',
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
    ...mapState({

    })
  },
  components: { permBtn, pagePagination },
  created() {
    this.initDate()
  },
  methods: {
    initDate () {
      this.sysLogList();
    },
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