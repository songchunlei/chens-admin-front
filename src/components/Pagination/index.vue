<template>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pagesizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalSize">
    </el-pagination>
  </div>
</template>
  
<script>
import api from '@/api'
import { deepClone } from '@/utils'

export default {
  name: 'page-pagination',
  data () {
    return {
      params: {
        page: {
          totalSize: 0,
        },
        search: {

        }
      }
    }
  },
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pagesizes: {
      type: Array,
      default () {
        return [10, 20, 50]
      }
    },
    total: {
      type: Number,
      default: 0
    },
    api: {
      type: String
    }
  },
  components: {},
  created () {
    console.log('child created');
    this.initData();
  },
  mounted () {
    console.log('child mounted');
  },
  methods: {
    initData () {
      this.totalSize = this.total;
      if (this.api) {
        this.pageList();
      }
    },
    search (search) {
      this.params.search = deepClone(search);
      this.pageList();
    },
    pageList () {
      api[this.api](this.params).then((res) => {
        this.totalSize = res.data.data.total;
        this.$emit('complete', res)
      }).catch((error) => {
        this.$message.error(error || '系统异常。');
      });
    },
    
    // 条数显示条数
    handleSizeChange(val) {
      this.params.pageSize = val;
      this.pageList();
    },
    // 当前页
    handleCurrentChange(val) {
      this.params.page.currentPage = val;
      this.pageList();
    }
  }
  
}
</script>