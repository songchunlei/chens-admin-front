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

      <!-- 知识分类 -->
      <tags-form ref="tagsForm"></tags-form>

      <el-row :gutter="40">
        <el-col :span="24" class="line"></el-col>
        <el-col :span="12">
          <el-form-item label="题目描述" prop="name">
            <vueUEditor @ready="editorReady" style="width: 800px"></vueUEditor>
          </el-form-item>
        </el-col>

        <el-col :span="20">
          <el-form-item label="内容">
            <choice ref="choiceSub" :size="choiceSize" 
              v-if="questionForm.type === 'singleChoice' || questionForm.type === 'multipleChoice'" :subType="questionForm.type">
            </choice>

            <div v-if="questionForm.type === 'trueFalse'">
              <el-radio v-model="questionForm.answer" label="1">正确</el-radio>
              <el-radio v-model="questionForm.answer" label="0">错误</el-radio>
            </div>

            <el-input type="textarea" :rows="2"  placeholder="请输入内容" 
             v-model="questionForm.answer"
             v-if="questionForm.type === 'fillBlank' || questionForm.type === 'shortAnswer'">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="40">
        <el-col :span="20">
          <el-form-item label="题目解析">
            <vueUEditor @ready="editorAnalysis" style="width: 800px"></vueUEditor>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="40">
        <el-col :span="12">
          <el-form-item>
            <el-button type="primary" @click="onSubmit('questionForm')">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script> 
import api from '@/api'
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
      choiceSize: 3, // 选项个数
      types: [
        { name: '单选题', id: '001', type: 'singleChoice' },
        { name: '多选题', id: '002', type: 'multipleChoice' },
        { name: '判断题', id: '003', type: 'trueFalse' },
        { name: '填空题', id: '004', type: 'fillBlank' },
        { name: '简答题', id: '005', type: 'shortAnswer' }
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
      this.questionForm.type = type;
    },

    // 题目、试题内容
    editorReady (editorInstance) {
      editorInstance.setContent('');
      editorInstance.addListener('contentChange', () => {
        const content = editorInstance.getContent();
        console.log('编辑器内容发生了变化：', content);
        this.questionForm.name = content;
      });
    },

    // 题目解析
    editorAnalysis (editorInstance) {
      editorInstance.setContent('请填写题目解析');
      editorInstance.addListener('contentChange', () => {
        const content = editorInstance.getContent();
        console.log('编辑器内容发生了变化：', content);
        this.questionForm.analysis = content;
      });
    },

    // 组装form
    packForm() {
      debugger;
      // 获取题型的已选项
      this.questionForm.belongSubject = this.$refs.tagsForm.tagForm.choicedTags;
      const type = this.questionForm.type;
      if (type) {
        if (type === 'singleChoice' || type === 'multipleChoice') {
          debugger;
          this.questionForm.questionsOptionList = this.$refs.choiceSub.choices;
        }
      }
    },

    // 提交表单
    onSubmit(formName) {
      
      this.packForm();
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.saveQuestions(this.questionForm).then((res) => {
            const json = res.data;
            if (json.code === 1) {
              this.$message.success('保存成功.');
            }
          }).catch((error) => {
            this.$message.error(error);
          });
        }
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
