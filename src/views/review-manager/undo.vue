<template>
  <div class="app-container">
    <div class="clearBoth">
      <el-input style='width:340px;' placeholder="请输入关键字" prefix-icon="el-icon-document" v-model="search.keywords"></el-input>
      <el-button style='margin-bottom:20px;' type="primary" icon="document" @click="handleSearch">查询</el-button>
    </div>
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

      <el-table-column label="节点名称">
        <template slot-scope="scope">
          {{scope.row.taskDefinitionName}}
        </template>
      </el-table-column>
      <el-table-column label="待办类型">
        <template slot-scope="scope">
          {{scope.row.processDefinitionName}}
        </template>
      </el-table-column>
      <el-table-column label="任务名称">
        <template slot-scope="scope">
          {{scope.row.taskName}}
        </template>
      </el-table-column>
      <el-table-column label="发起人" width="180" align="center">
        <template slot-scope="scope">{{scope.row.startByName}}</template>
      </el-table-column>

      <el-table-column align="center" label="创建日期" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="335" align="center">
        <template slot-scope="scope">
          <perm-btn :item="scope.row" :code="$route.meta.code" @handlerAllot="handlerAllot" @btnTempComplete="btnTempComplete">
            <el-button type="warning" size="mini" @click="handleRouter(scope)">处理</el-button>
          </perm-btn>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <page-pagination :api="'getUndoPage'" :mustParams="mustParams" ref="pagination" :search="search" @complete="completePage">
      </page-pagination>
    </div>
  </div>
</template>
<script>
import api from '@/api'
import { mapState } from 'vuex';
import { parseTime, confirm } from '@/utils'
import permBtn from '@/components/BtnTemp'
import pagePagination from '@/components/Pagination'

export default {
  name: '',
  data () {
    return {
      list: null,
      listLoading: true,
      search: { // 查询条件
        keywords: '', // 关键字
      },
      mustParams: {
        processDefinitionKey: ""
      }
    }
  },
  components: { permBtn, pagePagination },
  created () {

  },
  mounted () {

  },
  methods: {
    handleRouter () {

    },
    completePage (res) {
      this.listLoading = false;
      this.list = res.data.data.records;
    },

    handleSearch () {

    },

    // btn模板组件触发
    handlerAllot () {

    },

    btnTempComplete () {

    },
    
    
  }
}
</script>
<style scoped>
</style>