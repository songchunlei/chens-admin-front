<template>
 <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <div class="clearBoth">
      <el-input style='width:340px;' placeholder="请输入关键字" prefix-icon="el-icon-document" v-model="search.keyword"></el-input>
      <el-button style='margin-bottom:20px;' type="primary" icon="document" @click="handleSearch">查询</el-button>
      <el-button v-if="createVisable" style='float:right' type="success" icon="document" @click="routerUpdate">新增</el-button>
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
      <el-table-column label="操作" width="335" align="center">
        <template slot-scope="scope">
          <perm-btn :item="scope.row" :code="$route.meta.code" @handlerAllot="handlerAllot" @btnTempComplete="btnTempComplete">
            <el-button slot="resetPwd" size="mini" type="danger" @click="restPwd(scope.row)">{{$t('table.restPwd')}}</el-button>
          </perm-btn>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <page-pagination :api="'getUsers'" :search="search" @complete="complete">
      </page-pagination>
    </div>
  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import api from '@/api'
import { mapState } from 'vuex';
import { parseTime } from '@/utils'
import permBtn from '@/components/BtnTemp'
import pagePagination from '@/components/Pagination'

export default {
  name: 'userPage',
  data() {
    return {
      list: null,
      listLoading: true,
      search: { // 查询条件
        keyword: '', // 关键字
      },
      createVisable: false, // 新增显示控制
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
    },

    // 用户修改
    handleUpdate (user) {
      let userId = user ? user.id : '';
      this.$router.push({ path: '/sysManager/user/userUpdate/', query: { 'userId': userId }});
    },

    // 删除用户
    handleDelete (item) {
      let userId = item && item.id ? item.id : '';
      if(userId=='' || userId == null)
      {
          this.$message.error('系统错误!');
      }
      api.deleteUserById(userId).then((res) => {
        const json = res.data;
        if (json.code != 1) {
          this.$message.error(json.msg || '删除失败!');
          return;
        }
        this.$message.success(json.msg || '删除成功。');
      }).catch((error) => {
        this.$message.error(error || '系统错误!');
      });
    },

    // 密码重置
    restPwd (user, type) {
      const params = {
        userId: user.id,
        isRandom: false
      }
      api.restPwdUserApi(params).then((res) => {
        const json = res.data;
        if (json.code != 1) {
          this.$message.error(json.msg || '重置密码失败!');
          return;
        }
        this.$message.success(json.msg || '重置密码成功。');
      }).catch((error) => {
        this.$message.error(error || '系统错误!');
      });
    },
    
    // 路由到编辑页
    routerUpdate (item) {
      let query = {};
      item && item.id ? query.userId = item.id : '';
      this.$router.push({ path: '/sysManager/user/userUpdate', query: query });
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