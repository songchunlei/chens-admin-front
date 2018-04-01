<template>
  <el-table :data="upFiles">
    <el-table-column width="150" property="fileName" label="文件名"></el-table-column>
    <el-table-column width="100" property="fileSize" label="文件大小"></el-table-column>
    <el-table-column width="300" property="fileType" label="文件类型"></el-table-column>
  </el-table>
</template>

<script>
import FileUpload from 'vue-upload-component';

export default {
  name: 'up-table',
  data () {
    return {
      upFiles: [
        {
          fileName: [], // 文件名
          fileSize: [], // 文件大小
          fileType: [] // 文件类型
        }
      ]
    }
  },
  props: {
    files: {
      type: Array
    }
  },
  components:{ FileUpload },
  created () {
    // this.initData();
  },
  mounted () {

  },
  methods: {
    initData () {
      if (this.files && this.files.length > 0) {
        this.upFiles = this.files
      }
    },
  }
}
</script>