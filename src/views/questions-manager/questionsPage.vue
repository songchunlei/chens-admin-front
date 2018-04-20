<template>
  <div id="allSource" class="app-container">
    <div class="i-header">
      <el-button type="default" icon="el-icon-share" class="m-lr-md">新建文件夹</el-button>
    </div>

    <div class="m-t-md">
      <resource-table ref="resourceTable"></resource-table>
    </div>

  </div>
</template>
<script>

import resourceTable from '@/components/Resource'

export default {
  data () {
    return {
      addType: '', // 添加方法
      sourceTitle: '', // 资源名 用来搜索
      upload: {
        dialogTableVisible: false,
        files: [], // 文件
        folderId:'-1',//默认文件夹位置-1
      },
    }
  },

  components: {resourceTable },
  created () {

  },
  mounted () {

  },
  methods: {

    // 上传完成的回调
    completeUpload (newFile, oldFile) {
      this.upload.dialogTableVisible = false;
      this.refrashTable();
    },

    // 刷新列表
    refrashTable () {
      this.$refs.resourceTable.handleReset();
    },
  }
}
</script>
<style scoped>
.i-header .el-dropdown > button{
  padding: 5px 10px;
}
.i-header button i,li i {
  margin: 0 4px;
  vertical-align: middle;
}
.i-header button i.iconfont{
  margin-right: 10px;
}
li i {
  color: #ff9a4c;
  font-size: 20px;
}
.i-header .el-button--medium {
  padding: 10px;
}
</style>