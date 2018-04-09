<template>
  <div class="">
    <el-transfer v-loading.body="listLoading"
      filterable
      filter-placeholder="关键字搜索"
      :props="{label: 'name', key: 'id'}"
      v-model="roleUser"
      :data="allUser"
      :titles="['所有用户', '已选用户']">
    </el-transfer>
    <el-pagination class="m-t-sm"
      small
      layout="prev, pager, next"
      :page-size="params.page.size"
      :total="params.page.total">
    </el-pagination>
  </div>
</template>
<script>
import api from '@/api'

export default {
  name: 'role-maint',
  data () {
    return {
      listLoading: false,
      queryName: '',
      allUser: [],
      params: {
        page: {
          current: 1,
          size: 50,
          total: 0
        },
        search: {
          name: ''
        }
      }
      
    }
  },
  watch: {
    queryName () {
      this.getUsers();
    }
  },
  props: {
    roleUser: {
      type: Array
    }
  },
  created () {
    this.initData();
  },
  mounted () {
    
  },
  methods: {
    initData () {
      // 拿到所有的用户
      this.getUsers();
      // 显示已选的用户
    },
    getUsers () {
      this.listLoading = true;
      api.getUsers(this.params).then((res) => {
        const json = res.data;
        debugger;
        this.listLoading = false;
        if (json.code === 1) {
          this.params.page.total = json.data.total;
          
          this.allUser = json.data.records;
        }
        
      }).catch((error) => {
        this.listLoading = false;
        this.$message.error(error);
      })
    },
    // 关键字搜索
    
  }
}
</script>