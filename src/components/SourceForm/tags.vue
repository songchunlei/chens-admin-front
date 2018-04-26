<template>
  <div class="tagBox">
    <el-row>
      <el-col :span="12">
        <el-form-item label="知识分类">
          <el-radio-group v-model="tagForm.choicedTagClass" v-if="tagClasses">
            <el-radio v-for="item in tagClasses" :label="item.id" :key="item.id" @change="handleChangeTagClass(item)">{{item.className}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="分类题目" class="text-left">
          <el-checkbox-group v-model="tagForm.choicedTags" v-if="currentTagList && currentTagList.length > 0">
            <el-checkbox v-for="item in currentTagList" :key="item.id" :label="item.id" @change="handleChangeTags(item)">{{item.tagName}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="已选分类">
            <div class="listBox">
              <a href="javascript:void(0)" v-for="(item, key) in currentTagsJson" @click="handleChoicedTag(item)">
                <span v-if="item.tagName">/&nbsp;{{item.tagName}}&nbsp;/</span>
              </a>
            </div>
            <el-button size="mini" type="warning" @click="handeClearTags">清空列表</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import api from '@/api'

export default {
  name: 'form-select',
  data () {
    return {
      placeholder: '选择类型',
      tagClasses: '', // 标签分类
      currentTagList: [], // 标签分类对应的标签

      tagForm: {
        choicedTagClass: '', // 已选标签分类
        choicedTags: [] // 已选标签
      },
      
      currentTagsJson: { // 用作显示的

      }
    }
  },
  components: {},
  watch: {
    // 监听标签类型变化
    'tagForm.choicedTagClass' () {
      const id = this.tagForm.choicedTagClass;
      this.getTagList(id);
    },
    deep: true
  },
  created () {
    this.initData()
  },
  mounted () {

  },
  methods: {
    initData () {
      this.getTagClasses();
    },
    // 获取标签分类
    getTagClasses () {
      api.getTagClassList().then((res) => {
        const json = res.data;
        if (json.code === 1) {
          console.log('tagClasses: ', json.data);
          const tagClasses = json.data;
          
          if (tagClasses && Object.keys(tagClasses).length > 0) {
            this.tagClasses = json.data;
            // 默认中第一个
            this.tagForm.choicedTagClass = this.tagClasses[0].id 
          }
        }
      }).catch((error) => {
        this.$message.error(error);
      });
    },

    getTagList (id) {
      api.getTagList({ classId: id}).then((res) => {
        const json = res.data;
        if (json.code === 1) {
          console.log('currentTagList: ', json.data);
          this.currentTagList = json.data;
        }
      }).catch((error) => {
        Vue.prototype.$message.error(error);
      });
    },

    // 标签分类改变
    handleChangeTagClass (item) {
      
    },

    // 标签改变
    handleChangeTags (item) {
      if (!this.currentTagsJson[item.id]) {
        this.currentTagsJson[item.id] = item;
      } else {
        this.currentTagsJson[item.id] = '';
      }
      
    },

    // 清空列表
    handeClearTags () {
      this.tagForm.choicedTags = [];
      this.currentTagsJson = {};
    },

    // 点击已选
    handleChoicedTag (item) {
      this.tagForm.choicedTagClass = item.classId;
    }
    
  }
}
</script>
<style scoped>
.listBox span{
  margin-right: 30px;
  margin-bottom: 0px;
  color: #666;
  display: inline-block;
}
</style>