<template>
  <div class="app-container uploadPage" id="uploadPage">
    <div>
      <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
        <el-radio-button label="top">正在上传</el-radio-button>
        <el-radio-button label="right">转码中</el-radio-button>
        <el-radio-button label="bottom">已完成</el-radio-button>
        <el-radio-button label="left">失败</el-radio-button>
      </el-radio-group>
      <el-button class="pull-right" size="small" type="primary" @click="handleCancelAll" plain>全部取消</el-button>
    </div>

    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" stripe fit highlight-current-row>
      <el-table-column label="略缩图" width="80">
        <template slot-scope="scope">
          <img v-if="scope.row.thumb" :src="scope.row.thumb" width="40" height="auto" />
        </template>
      </el-table-column>
      
      <el-table-column label="文件名" width="180">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="文件大小">
        <template slot-scope="scope">{{scope.row.size | formatSize}}</template>
      </el-table-column>
      <el-table-column label="文件类型">
        <template slot-scope="scope">{{scope.row.type}}</template>
      </el-table-column>
      <el-table-column label="速度">
        <template slot-scope="scope">{{scope.row.speed}}KB/S</template>
      </el-table-column>
      <el-table-column label="完成进度">
        <template slot-scope="scope">{{scope.row.progress}}</template>
      </el-table-column>

      <el-table-column label="操作">
        <el-button @click="handleCancel(scope.row)" type="text" size="small">取消任务</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: '',
  data () {
    return {
      listLoading: false,
      tabPosition: 'top',
      list: []
    }
  },
  props: {

  },
  computed: {
    ...mapGetters([
      'uploadingFiles'
    ])
  },
  
  watch: {
    uploadingFiles () {
      console.log('watch upload: ', this.uploadingFiles);
      this.list = this.uploadingFiles;
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
      console.log('initData upload: ', this.uploadingFiles);
      this.list = this.uploadingFiles
    },
    handleCancel () {
          
    },
    handleCancelAll () {

    }
  }
}
</script>
<style scoped>
.uploadPage {
    position: absolute;
    top: 2px;
    right: 0;
    z-index: 1000;
    background: #fff;
    width: 100%;
    height: 99%;
}
</style>