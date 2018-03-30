<template>
  <div id="allSource" class="app-container">
    <div class="i-header">
      <el-dropdown split-button size="medium" type="primary" @click="choiseUp">
        上传资源
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item, index) in sourcesAdds" @click.native="chioseFunAdd(item)" :key="item.value">
            <i class="iconfont" :class="item.icon"></i>{{item.name}}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button type="primary" icon="el-icon-share">新建文件夹</el-button>
    </div>

    <div>
      <el-popover
        ref="filePopover"
        placement="right"
        width="800"
        trigger="manual">
        <popover-content></popover-content>
      </el-popover>
    </div>

  </div>
</template>
<script>
import popoverContent from './components/popover';

const sourcesAdds = () => [
  { name: '上传文件', value: '001', icon: 'icon-shangchuanwenjian' },
  { name: '图文新建', value: '002', icon: 'icon-liebiaodaohang_tuwen' },
  { name: '新建链接', value: '003', icon: 'icon-lianjie' }
];
export default {
  data () {
    return {
      sourcesAdds: sourcesAdds(), // 添加资源的方法
      addType: '', // 添加方法
      sourceTitle: '', // 资源名 用来搜索
    }
  },

  components: { popoverContent },
  created () {

  },
  mounted () {

  },
  methods: {
    // 上传文件
    uploadSource () {
      console.log('上传');
      this.$refs.filePopover.doShow();
    },
    // 图文新建
    editSource () {

    },
    // 新建链接
    addLink () {

    },
    // 上传操作
    choiseUp () {
      this.uploadSource();
    },
    // 选择添加途径
    chioseFunAdd (item) {
      switch (item.value) {
        case '001': this.uploadSource();
        break;
        case '002': this.editSource();
        break;
        case '003': this.addLink();
        default:;
      }
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