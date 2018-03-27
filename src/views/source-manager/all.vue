<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.importance" :placeholder="添加资源">
        <el-option v-for="item in sourcesAdds" :key="item.value" :label="item.name" :value="item.value" @click.native="chioseFunAdd(item)">
        </el-option>
      </el-select>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="搜索资源名" v-model="listQuery.title">
      </el-input>      
    </div>

  </div>
</template>
<script>
const sourcesAdds = () => [
  { name: '上传文件', value: '001' },
  { name: '图文新建', value: '002' },
  { name: '新建链接', value: '003' }
];
export default {
  data () {
    return {
      sourcesAdds: sourcesAdds(), // 添加资源的方法
    }
  },

  components: {

  },
  created () {

  },
  mounted () {

  },
  methods: {
    // 上传文件
    uploadSource () {

    },
    // 图文新建
    editSource () {

    },
    // 新建链接
    addLink () {

    },
    chioseFunAdd (item) {
      switch (item.value) {
        case '001': this.uploadSource;
        break;
        case '002': this.editSource;
        break;
        case '003': this.addLink;
        default:;
      }
    }
  }
}
</script>