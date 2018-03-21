<template>
 <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <el-input style='width:340px;' placeholder="请输入关键字" prefix-icon="el-icon-document" v-model="search.name"></el-input>
    <el-button style='margin-bottom:20px;' type="primary" icon="document" @click="handleSearch">查询</el-button>
    
    
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column align="center" label='Id' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="选择框" width="65">
        <template slot-scope="scope">
          <el-checkbox></el-checkbox>
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
      <el-table-column label="操作" width="235" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="goEidt(scope.row)" size="small" icon="el-icon-edit">修改</el-button>
          <el-button type="success" v-if="scope.row.isDelete == 0" @click="handleModifyStatus(scope.row)" size="mini" icon="el-icon-delete">恢复</el-button>
          <el-button type="warning" v-if="scope.row.isDelete != 0" @click="handleModifyStatus(scope.row, 'delete')" size="mini" icon="el-icon-delete">删除</el-button>
          
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
        current: '1',
        size: '10'
      },
      search: { // 查询条件
        name: '',
      },

    }
  },
  computed:{
    ...mapState({

    })
  },
  created() {
    this.roleList()
  },
  methods: {
    roleList() {
      let params = {
        "page": this.page,
        "search": this.search
      }
      let _this = this;
      api.getRoles(params).then((res) => {
        _this.listLoading = false;
        console.log(res);
        if (res.data.code == 1) {
          let json = res.data.data;
          let records = json.records;
          _this.list = records;
        } else {
        }
      }).catch( (error) => {
        this.listLoading = false;
      });
    },

    handleSearch () {
    },
    
    // getRoles
    getRoles () {
      
    },
    // 复原 或者 删除
    handleModifyStatus (role, type) {
        if (type === 'delete') { // 处理成删除

        } else { // 处理成恢复

        }
    },
    // 修改
    handleEdit (role) {
        // TODO 弹窗处理修改
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