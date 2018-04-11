<template>
  <div>
    <a href="javascript:void(0)" @click="handleAssige" class="linkSource">
        <i class="iconfont" :class="item.type | parseDict('fileTag', 'icon')"></i>
        <span>{{item.name}}</span>
    </a>
  </div>
</template>
<script>
import api from '@/api'

export default {
  name: 'file-tag',
  props: {
    item: {
      type: Object    
    }
  },
  data () {
    return {
      
    }
  },
  methods: {
    handleAssige () {
      switch (this.item.type) {
        case 'FOLDER': this.getFolder();
        break;
        default:;
      }
    },
    // 类型为文件夹 继续获取文件夹
    getFolder () {
      this.$emit('resetFolder');
    }
  }
}
</script>
<style scoped>
.linkSource i {
  font-size: 20px;
  vertical-align: baseline;
  margin-right: 4px;
  color: #FF9A4C;
  font-weight: 600;
}
</style>