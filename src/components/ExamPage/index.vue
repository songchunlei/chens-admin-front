<template>
  <div class="app-container">
    <div class="treeLine">
      <a href="javascript:void(0)" v-for="(tree, index) in currentFold.tree" :key="tree.id" @click="getListByFolderId(tree.id)">
        <span>{{tree.name}}</span><i v-if="index !== currentFold.tree.length">\</i>
      </a>
    </div>

    <el-table @select="onSelect" @select-all="onSelectAll" :data="resourceData" v-loading.body="listLoading" stripe element-loading-text="拼命加载中" style="width: 100%">
      <el-table-column 
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column label="文件名">
        <template slot-scope="scope">
          <file-tag :item="scope.row" @resetFolder="getResourceFolder(scope.row.id)"></file-tag>
        </template>
      </el-table-column>

      <el-table-column label="文件类型" width="140">
        <template slot-scope="scope">
          {{scope.row.type | parseDict('fileTag')}}
        </template>
      </el-table-column>

      <el-table-column align="center" label="更新日期" width="160">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.updateTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="335" align="center">
        <template slot-scope="scope">
          <slot :name="'btn' + scope.$index"></slot>
          <el-button @click="routerUpdate(scope.row)" type="text" v-if="btnVisable" size="small">编辑</el-button>
          <!-- 无法循环展示按钮,暂时注释.自己在父组件实现 btnFunc方法 <el-button @click="btnFunc(scope.row)" type="text" v-if="btnFuncVisable && scope.row.type!='FOLDER'" size="small">编辑</el-button> -->
          <el-button @click="handleDelete(scope.row)" type="text" v-if="btnVisable" size="small">删除</el-button> 
        </template>
      </el-table-column>
    </el-table>

    <div>
      <el-dialog title="文件夹" :visible.sync="editDialog.dialogTableVisible">
        <folderEdit-dialog :busParId="editDialog.currentParId" :busType="editDialog.currentType" :busName="editDialog.currentName" v-if="editDialog.dialogTableVisible" :busId="editDialog.currentId" @completeUpdate="completeUpdate"></folderEdit-dialog>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import api from '@/api'
import fileTag from './fileTag'
export default {
  name: '',
  data () {
    return {
      listLoading: false,
      folderId: '-1',
      currentFold: '', // 当前文件夹数据
      resourceData: [], // 当前文件列表
    }
  },
  components: {},
  created () {
    this.initData()
  },
  mounted () {

  },
  methods: {
    initData () {
      
    },
    
    // 根据id获取文件
    getListByFolderId (id) {
      const folderId = id || this.folderId;
      api.getExamPaperFolder(folderId).then((res) => {
        const json = res.data;
        if (json.code ===1) {
          this.currentFold = json.data;
          this.resourceData = json.data.children || [];

          // 完成时告诉 父组件
          this.$nextTick( ()=> {
            this.$emit('complete', this.resourceData);
          })
        }
      }).catch((error) => {
        this.$message.error(error);
      })    
    },

    onSelect () {

    },

    onSelectAll () {

    }
  }
}
</script>
<style scoped>
</style>