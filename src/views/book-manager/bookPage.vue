<template>
  <div id="bookSource" class="app-container">

    <div class="m-t-md">
      <resource-table ref="resourceTable" :resourceType="resourceType" :btnFuncVisable="true" >
        <el-button slot="btn" size="mini" type="text" @click="btnFunc(scope.row)">编辑目录</el-button>
      </resource-table>
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
      resourceType: 'BOOK_APPROVE', // 模块类型
    }
  },

  components: {resourceTable },
  created () {

  },
  mounted () {

  },
  methods: {
    // 刷新列表
    refrashTable () {
      this.$refs.resourceTable.handleReset();
    },
    //自定义按钮功能
    btnFunc(){
      
    }
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