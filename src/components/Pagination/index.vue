<template>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
</template>
  
<script>
export default {
  name: 'page-pagination',
  data () {

  },
  props: {
    
  },
  components: {},
  created () {

  },
  mounted () {

  },
  methods: {
    initData () {

    },
    
    // 条数显示条数
    handleSizeChange(val) {
      
    },
    // 当前页
    handleCurrentChange(val) {
      
    }
  }
  
}
</script>