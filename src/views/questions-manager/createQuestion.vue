<template>
  <div id="createQuestion" class="app-container">
    <el-form :model="questionForm" :rules="questionRules" ref="questionForm" label-width="100px" class="source-form" label-position="left">
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
        <el-col :span="12">
          <el-form-item label="知识分类" prop="belong_subject">
            <el-radio-group v-model="currentSubject">
              <el-radio v-for="item in subjects" :label="item.id" :key="item.id" @change="handleChangeSub(item)">{{item.name}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="分类题目" prop="ubject_child" class="text-left">
            <el-checkbox-group v-model="questionForm.belongSubject">
              <el-checkbox v-for="item in subject_child" :key="item.id" :label="item.id" @change="handleSubjectChange(item)" name="subject_child">{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="已选分类">
             <div class="listBox">
               <span v-for="(item, key) in currentSubjectJson">/&nbsp;{{item.name}}&nbsp;/</span>
             </div>
             <el-button size="mini" type="warning" @click="handeClearSub">清空列表</el-button>
          </el-form-item>
        </el-col>
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

export default {
  name: '',
  data () {
    return {
      questionRules: Rule.rules,
      subType: 'siigleChoice', // 题目类型
      choiceSize: 3, // 选项个数
      types: [
        { name: '单选题', id: '001', type: 'singleChoice' },
        { name: '多选题', id: '002', type: 'multipleChoice' },
        { name: '判断题', id: '003', type: 'trueFalse' },
        { name: '填空题', id: '004', type: 'fillBlank' },
        { name: '简答题', id: '005', type: 'shortAnswer' },
      ],
      subjects: [
        { name: '驾照题', id: '001' },
        { name: '高中毕业数学题', id: '002' },
        { name: '大学英语', id: '003' },
        { name: '大学物理', id: '004' },
        { name: '材料分析', id: '005' },
        { name: '分子结构', id: '006' }
      ],
      subject_child: [], // 筛选后
      subject_child_data: [ // 数据
        { name: '驾照题child', id: '001', pid: "001" },
        { name: '高中毕业数学题child', id: '002', pid: "002" },
        { name: '大学英语child', id: '003', pid: "003" },
        { name: '大学物理child', id: '004', pid: "004" },
        { name: '材料分析child', id: '005', pid: "005" },
        { name: '分子结构child', id: '006', pid: "006" },
        { name: '驾照题child2', id: '007', pid: "001" },
        { name: '高中毕业数学题child2', id: '008', pid: "002" },
        { name: '大学英语child2', id: '009', pid: "003" },
        { name: '大学物理child2', id: '010', pid: "004" },
        { name: '材料分析child2', id: '011', pid: "005" },
        { name: '分子结构child2', id: '012', pid: "006" }
      ],
      questionForm: {
        belongSubject: [], // 所选的分类
      },

      currentSubject: '001', // 当前标签分类
      currentSubjectJson: { // 当前标签分类信息
        
      },
      
    }
  },
  components: { choice, vueUEditor },
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
      this.currentSubject = this.subjects[0].id;
      this.handleChangeSub({ id: this.currentSubject });
    },
    // 题目类型切换
    handleSelect (type) {
      console.log(type);
      this.subType = type;
      this.$refs.choiceSub.changeSubType(this.subType);
    },    
    
    handleChangeSub (item) {
      this.subject_child = [];
      for (let i = 0; i < this.subject_child_data.length; i ++) {
        if (this.subject_child_data[i].pid === item.id) {
          this.subject_child.push(this.subject_child_data[i]);
        }
      }
    },

    handleSubjectChange (item) {
      this.currentSubjectJson[item.id] = item; 
      console.log(this.currentSubjectJson);
    },
    handeClearSub () {
      this.questionForm.belongSubject = [];
      this.currentSubjectJson = {};
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