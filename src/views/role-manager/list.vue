<template>
 <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <el-input style='width:340px;' placeholder="请输入关键字" prefix-icon="el-icon-document" v-model="search.name"></el-input>
    <el-button style='margin-bottom:20px;' type="primary" icon="document" @click="handleSearch">查询</el-button>
    <el-button style='margin-bottom:20px;' type="primary" icon="document" @click="handleMdf">新增</el-button>
    
    
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
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
          <el-button type="primary" @click="handleMdf(scope.row, 'update')" size="small">修改</el-button>
          <el-button type="success" v-if="scope.row.isDelete == 0" @click="handleModifyStatus(scope.row, scope.$index)" size="mini">恢复</el-button>
          <el-button type="warning" v-if="scope.row.isDelete != 0" @click="handleModifyStatus(scope.row, scope.$index)" size="mini">删除</el-button>
          
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
        let json = res.data;
        if (json.code == 1) {
          let records = json.data.records;
          _this.list = records;
          if (records && records.length == page.size ) {
            page.current ++;
          }
        } else {
          this.$message.error(json.msg || '查询失败');
        }
      }).catch( (error) => {
        this.listLoading = false;
        this.$message.error(error || '系统异常。');
      });
    },

    handleSearch () {
    },
    
    // getRoles
    getRoles () {
      
    },
    // 复原 或者 删除
    handleModifyStatus (role, index) {
      role.isDelete = role.isDelete == 0 ? 1 : 0;
      api.updateRole(role).then((res) => {
        let json = res.data;
        if (json.code != 1) {
          this.$message.error(json.msg || '角色恢复失败。');
          return;
        }
        this.list[index].isDelete = role.isDelete;
      }).catch((error) => {
        this.$message.error(error || '系统异常。');
      })
    },
    // 修改
    handleMdf (role, type) {
      let id = type == 'update' ? role.id : ':id';
      this.$router.push({ path: '/roleManager/editRole/' + id });
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