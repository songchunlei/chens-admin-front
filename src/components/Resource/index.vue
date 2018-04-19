<template>
  <div class="resourceList">
    <div class="backBox b-b">
      <el-button-group>
        <el-button type="primary" size="mini" icon="el-icon-d-arrow-left" @click="parantFolder('source')"></el-button>
        <el-button type="primary" size="mini" icon="el-icon-arrow-left" @click="parantFolder()"></el-button>
      </el-button-group>
    </div>

    <el-table :data="resourceData" v-loading.body="listLoading" element-loading-text="拼命加载中" bolder fit highlight-current-row>
      <el-table-column align="center" label="选择框" width="65">
        <template slot-scope="scope">
          <el-checkbox></el-checkbox>
        </template>
      </el-table-column>
      
      <el-table-column label="文件名">
        <template slot-scope="scope">
          <file-tag :item="scope.row" @resetFolder="getSourceFolder(scope.row.id)"></file-tag>
        </template>
      </el-table-column>

      <el-table-column label="文件类型" width="140">
        <template slot-scope="scope">
          {{scope.type | parseDict('fileTag')}}
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
          <!-- 
          <perm-btn :item="scope.row" :code="$route.meta.code" @handlerAllot="handlerAllot">
            <el-button slot="resetPwd" size="mini" type="danger" @click="restPwd(scope.row)">{{$t('table.restPwd')}}</el-button>
          </perm-btn>
          -->

        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import api from '@/api'
import fileTag from './fileTag'

export default {
  data () {
    return {
      listLoading: false,
      currentFold: {},
      resourceData: [], // 根资源数据
      sourceId: '-1', // 根资源id
    }
  },
  props: {
  },
  components: { fileTag },
  created () {
    this.initData();
  },
  methods: {
    initData () {
      debugger;
      this.getSourceFolder(this.sourceId);
    },
    //资源文件/文件夹
    getSourceFolder (id) {
      api.getSourceFolder(id).then((res) => {
        const json = res.data;
        if (json.code === 1) {
          this.currentFold = json.data;
          this.resourceData = json.data.children || [];
        }
      }).catch((error) => {
        this.$message.error(error);  
      })
    },
    //根据类型查询文件/文件夹
    getFolderAndFile (type,id) {
      /**
       * getSourceFolder
       * getQuestionsFolder
       * getExamPaperFolder
       * getBookFolder
       * getCourseFolder
       */
      api.getSourceFolder(id).then((res) => {
        const json = res.data;
        if (json.code === 1) {
          this.currentFold = json.data;
          this.resourceData = json.data.children || [];
        }
      }).catch((error) => {
        this.$message.error(error);  
      })
    },
    // 重新加载此页， 用于外部调用
    handleReset () {
      this.getSourceFolder(this.currentFold.id);
    },

    parantFolder (type) {
      let id = type === 'source' ? this.sourceId : this.currentFold && this.currentFold.parent ? this.currentFold.parent.id : '';
      if (!id) {
        id = this.sourceId;
      }
      this.getSourceFolder(id);
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