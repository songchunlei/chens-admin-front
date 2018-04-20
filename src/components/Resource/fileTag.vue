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
      type: Object,
      url:String    
    }
  },
  data () {
    return {
      
    }
  },
  methods: {
    handleAssige () {
      switch (this.item.type) {
        case 'FOLDER': 
          this.getFolder();
          break;
        case 'QUESTIONS': 
          this.Question();
          break;
        case 'EXAM_PAPER': 
          this.getFolder();
          break;
        case 'BOOK': 
          this.getBook();
          break;
        case 'COURSE': 
          this.getCourse();
          break;
        default:
          window.open(api.downloadFile(this.item.url));
          break;
      }
    },
    // 类型为文件夹 继续获取文件夹
    getFolder () {
      this.$emit('resetFolder');
    },
    // 类型为题目
    getQuestion () {
      
    },
    // 类型为试卷
    getExamPaper () {
      
    },
    // 类型为书本
    getBook () {
      
    },
    // 类型为课程
    getCourse () {
      
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