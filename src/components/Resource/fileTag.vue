<template>
  <div>
    <a href="javascript:void(0)" @click="handleAssige">
        <i class="iconfont" :class=""></i>
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
      switch (item.type) {
        case 'folder': this.getFolder();
        break;
        default:;
      }
    },
    // 类型为文件夹 继续获取文件夹
    getFolder () {
      this.$emit('resetFolder', json.data);
    }
  }
}
</script>