<template>
 <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <el-input style='width:340px;' placeholder="请输入关键字" prefix-icon="el-icon-document" v-model="search.keywords"></el-input>
    <el-button style='margin-bottom:20px;' type="primary" icon="document" @click="handleSearch">查询</el-button>
    <el-button v-if="createVisable" type="success" icon="document" @click="routerUpdate">新增</el-button>


    <el-row>
      <el-button v-for="tag in tagClasses" :key="tag.id" size="mini" @click="handleClassIdSearch(tag.id)">{{tag.className}}</el-button>
    </el-row>

    <!-- <div>
        <el-tag
          v-for="tag in tagClasses"
          :key="tag.id"
          :type="''">
          {{tag.className}}
        </el-tag>
    </div> -->

    <el-table :data="list" ref="tagTable" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column label="名称" width="180">
        <template slot-scope="scope">
          {{scope.row.tagName}}
        </template>
      </el-table-column>
      <el-table-column label="备注">
        <template slot-scope="scope">
          {{scope.row.comment}}
        </template>
      </el-table-column>

      <el-table-column label="最后更新时间" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span v-if="scope.row.updateTime">{{scope.row.createTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
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
      <page-pagination ref="pagination" :api="'getTags'" :search="search" @complete="complete">
      </page-pagination>
    </div>

    <div>
      <el-dialog title="标签信息" :visible.sync="editDialog.dialogTableVisible">
        <tagEdit-dialog v-if="editDialog.dialogTableVisible" :busId="editDialog.currentId" :busParId="editDialog.currentClassId" @completeUpdate="completeUpdate"></tagEdit-dialog>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import { mapGetter } from 'vuex'
import { parseTime } from '@/utils'
import permBtn from '@/components/BtnTemp'
import pagePagination from '@/components/Pagination'
import tagEditDialog from './components/tag.edit'

export default {
  name: 'tagList',
  data() {
    return {
      list: null,
      listLoading: true,
      radio: '',
      currentItem: {},
      search: {
        keywords: '' // 关键字
      },
      createVisable: false, // 新增显示控制
      editDialog: {
        dialogTableVisible: false,
        currentId:'',
        currentClassId:''
      },
      tagClasses: [],
      currentTagClassId:''
    }
  },
  components: { permBtn, pagePagination,tagEditDialog },
  computed: {
  },
  created () {
    this.initData();
  },
  methods: {
    initData () {
      this.getTagClassList();
    },
    getTagClassList(){
      api.getTagClassList({}).then((res) => {
        const json = res.data;
        if (json.code === 1) {
          this.tagClasses = json.data;
        }
      }).catch((error) => {
        this.$message.error(error);
      })
    },

    complete (res) {
      this.listLoading = false;
      this.list = res.data.data.records;
    },

    handleSearch () {
      let searchParams = {};
      searchParams.tagName = this.search.keywords;
      searchParams.comment= this.search.keywords;
      searchParams.classId = this.currentTagClassId;
      searchParams.isAnd = false;
      this.$refs.pagination.search(searchParams);
    },

    handleClassIdSearch (classId) {
      this.currentTagClassId = classId;
      this.handleSearch();
    },


    // 角色修改
    routerUpdate (item) {
      // this.$router.push({ path: '/sysManager/role/roleUpdate/', query: { 'userId': itemId }});
      this.editDialog.currentId = item.id;
      this.editDialog.currentClassId = this.currentTagClassId;
      this.editDialog.dialogTableVisible = true;
    },

    //更新完成后事件
    completeUpdate (type) {
      this.editDialog.dialogTableVisible = false;
      this.handleSearch();
    },

    // 删除
    handleDelete (item) {
      if (!item || !item.id) {
        return;
      }

      api.deleteTag(item.id).then((res) => {
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
