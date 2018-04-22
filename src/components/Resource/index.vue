<template>
  <div class="resourceList">
    <div class="backBox b-b">
      <el-button-group>
        <el-button type="primary" size="mini" icon="el-icon-d-arrow-left" @click="parantFolder('source')">返回最上层</el-button>
        <el-button type="primary" size="mini" icon="el-icon-arrow-left" @click="parantFolder()">返回上一层</el-button>
        <el-button type="default" size="mini" icon="el-icon-share" @click="routerUpdate()">新建文件夹</el-button>
      </el-button-group>
    </div>

    <el-table @select="onSelect" @select-all="onSelectAll" :data="resourceData" v-loading.body="listLoading" element-loading-text="拼命加载中" bolder fit highlight-current-row>
      <el-table-column label="选择框"
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
          <el-button @click="routerUpdate(scope.row)" type="text" v-if="btnVisable" size="small">编辑</el-button>
          <el-button @click="handleDelete(scope.row)" type="text" v-if="btnVisable" size="small">删除</el-button>
          <slot name="btn"></slot>
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
import { mapGetters } from 'vuex'
import api from '@/api'
import fileTag from './fileTag'
import folderEditDialog from './editFolder'

export default {
  data () {
    return {
      listLoading: false,
      currentFold: {},
      resourceData: [], // 根资源数据
      resourceId: '-1', // 根资源id
      checkeds: [], // 保存选中的资源id
      editDialog: {
        dialogTableVisible: false,
        currentId:'',
        currentParId:'',
        currentName:'',
        currentType:''
      },

      currentSource: '', // 当前资源类型
    }
  },
  props: {
    resourceType: {
      type: String,
      default: 'SOURCE_APPROVE'
    },

    btnVisable: {
      type: Boolean,
      default: true
    },

    noFolder: { // 不能选择文件夹
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters([
      'sources'
    ])
  },
  components: { fileTag ,folderEditDialog},
  created () {
    this.initData();
  },
  mounted () {
    
  },
  methods: {
    initData () {
      this.initSources();
    },

    // 调用组件必定会执行的方法 理论上不会出现问题。
    initSources () {
      debugger;
      if (this.sources && Object.keys(this.sources).length > 0) {
        this.currentSource = this.sources[this.resourceType];
        this.getResourceFolder();
      } else {
        this.$store.dispatch('GetSources').then(res => {
          this.currentSource = res[this.resourceType];
          this.getResourceFolder();
        }).catch((error) => {
          this.$message.error(error);
        })
      }
    },

    //资源文件/文件夹
    getResourceFolder (id) {
      const _id = id || this.resourceId;
      const funName = this.currentSource['funName'];
      api[funName](_id).then((res) => {
        const json = res.data;
        if (json.code === 1) {
          this.currentFold = json.data;
          this.resourceData = json.data.children || [];
        }
      }).catch((error) => {
        this.$message.error(error);
      })
    },

    //更新完成后事件
    completeUpdate (type) {
      this.editDialog.dialogTableVisible = false;
      this.handleReset();
    },

    // 重新加载此页， 用于外部调用
    handleReset () {
      this.getResourceFolder(this.currentFold.id);
    },

    // 删除
    handleDelete (item) {
      if (!item || !item.id) {
        return;
      }
      let funName = "";
      if(item.type && item.type == 'FOLDER')
      {
        //资源
        if (this.resourceType && this.resourceType == 'RESOURCE') {
          funName = 'deleteSourceFolder'
        }
        //题目
        else if (this.resourceType && this.resourceType == 'QUESTIONS') {
          funName = 'deleteQuestionsFolder'
        }
        //试卷
        else if(this.resourceType && this.resourceType == 'EXAM_PAPER')
        {
          funName = 'deleteExamPaperFolder'
        }
        //书本
        else if(this.resourceType && this.resourceType == 'BOOK')
        {
          funName = 'deleteBookFolder'
        }
        //课程
        else if(this.resourceType && this.resourceType == 'COURSE')
        {
          funName = 'deleteCourseFolder'
        }
      }
      //题目
      else if (item.type && item.type == 'QUESTIONS') {
        funName = 'x'
      }
      //试卷
      else if(item.type && item.type == 'EXAM_PAPER')
      {
        funName = 'x'
      }
      //书本
      else if(item.type && item.type == 'BOOK')
      {
        funName = 'x'
      }
      //课程
      else if(item.type && item.type == 'COURSE')
      {
        funName = 'x'
      }
      api[funName](item.id).then((res) => {
        const json = res.data;
        if (json.code ===1) {
          this.$message.success(json.msg);
          this.handleReset();
        }
      }).catch((error) => {
        this.$message.error(error);
      });
    },

    routerUpdate (item) {

      console.log(this.currentFold);

      if(!this.currentFold)
      {
          return;
      }

      //当前文件夹id就是要创建的父id
      this.editDialog.currentParId = this.currentFold.id;
      this.editDialog.currentType = this.resourceType;

      if(item && item.id)
      {
        this.editDialog.currentId = item.id;
        this.editDialog.currentName = item.name;
      }

      this.editDialog.dialogTableVisible = true;
    },
    createFolder(){
        let currentFoldId = this.currentFold.id;
        if(!id){
          id = '-1';
        }
        let funName = 'getSourceFolder';
        //题目
        if (this.resourceType && this.resourceType == 'QUESTIONS') {
          funName = 'getQuestionsFolder'
        }
        //试卷
        else if(this.resourceType && this.resourceType == 'EXAM_PAPER')
        {
          funName = 'getExamPaperFolder'
        }
        //书本
        else if(this.resourceType && this.resourceType == 'BOOK')
        {
          funName = 'getBookFolder'
        }
        //书本
        else if(this.resourceType && this.resourceType == 'COURSE')
        {
          funName = 'getCourseFolder'
        }
        api[funName](id).then((res) => {
          const json = res.data;
          if (json.code === 1) {
            this.currentFold = json.data;
            this.resourceData = json.data.children || [];
          }
        }).catch((error) => {
          this.$message.error(error);
        })
    },
    parantFolder (type) {
      let id = type === 'source' ? this.resourceId : this.currentFold && this.currentFold.parent ? this.currentFold.parent.id : '';
      if (!id) {
        id = this.resourceId;
      }
      this.getResourceFolder(id);
    },
    onSelect (selection, row) {
      if (this.noFolder && row.type === 'FOLDER') {
        return;
      }
      if (selection.length < 1) {
        this.checkeds[row.id] = "";
      } else {
        this.checkeds[row.id] = row;
      }
    },

    onSelectAll (selection) {
      console.log(selection);
      if (selection.length > 0) { // 全选 选中
        for (var i = 0; i < selection.length; i ++) {
          if (this.noFolder && selection[i].type === 'FOLDER') {
            continue;
          }
          const sle_i = this.checkeds[selection[i].id];
          if (!sle_i || Object.keys(sle_i).length < 0) {
            this.checkeds[selection[i].id] = selection[i];
          }
        }
      } else { // 全选 取消
        if (this.resourceData && this.resourceData.length > 0) {
          for (var i = 0; i < this.resourceData.length; i ++) {
            const res_i = this.checkeds[this.resourceData[i].id];
            if (res_i && Object.keys(res_i).length > 0) {
              continue;
            }
            this.checkeds[this.resourceData[i].id] = "";
          }
        }
        
      } 
      
    }
  }
}
</script>
<style scoped>
.backBox {
  margin: 10px 0;
  padding: 6px 10px;
}

</style>
