<template>
  <div id="createQuestion" class="app-container">
    <el-form :model="questionForm" :rules="questionRules" ref="questionForm" label-width="100px" class="source-form" label-position="right">
      <div class="title-container">
        <h3 class="title">新增题目</h3>
      </div>
      <el-row :gutter="40">
        <el-col :span="24">
          <el-form-item label="试题类型" prop="type">
            <el-select v-model="questionForm.type" placeholder="选择试题类型" @change="handleSelect">
              <el-option v-for="item in types" :key="item.id" :label="item.name" :value="item.type">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <tags-form></tags-form>

      <el-row :gutter="40">
        <el-col :span="24" class="line"></el-col>
        <el-col :span="24">
          <el-form-item label="选项">
            <choice ref="choiceSub" :size="choiceSize" v-if="subType === 'singleChoice' || subType === 'multipleChoice'" :subType="subType"></choice>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="题目名" prop="name">
            <!--
            <el-input name="name" type="textarea" v-model="questionForm.name" placeholder="请输入题目名称" />
            -->
            <vueUEditor @ready="editorReady" style="width: 800px"></vueUEditor>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import Rule from './config/rules'
import choice from '@/components/SourceForm/choice'
import vueUEditor from '@/components/Ueditor'
import tagsForm from '@/components/SourceForm/tags'

export default {
  name: '',
  data () {
    return {
      questionForm:{
          type:"singleChoice"
      },
      questionRules: Rule.rules,
      subType: '', // 题目类型
      choiceSize: 3, // 选项个数
      types: [
        { name: '单选题', id: '001', type: 'singleChoice' },
        { name: '多选题', id: '002', type: 'multipleChoice' },
        { name: '判断题', id: '003', type: 'trueFalse' },
        { name: '填空题', id: '004', type: 'fillBlank' },
        { name: '简答题', id: '005', type: 'shortAnswer' },
      ]

    }
  },
  components: { choice, vueUEditor, tagsForm  },
  filters: {
    getName (id, item) {
      return item.name
    }
  },
  watch: {

  },
  created () {
    this.initData();
  },
  mounted () {

  },
  methods: {
    initData () {

    },
    // 题目类型切换
    handleSelect (type) {
      console.log(type);
      this.subType = type;
      //this.$refs.choiceSub.changeSubType(this.subType);
    },

    editorReady (editorInstance) {
      editorInstance.setContent('Hello world!<br>你可以在这里初始化编辑器的初始内容。');
      editorInstance.addListener('contentChange', () => {
        console.log('编辑器内容发生了变化：', editorInstance.getContent());
      });
    }
  }
}
</script>
<style scoped>
.listBox > span{
  margin-right: 30px;
  margin-bottom: 0px;
  color: #666;
  display: inline-block;
}
.line {
  margin: 20px 0;
}
</style>
