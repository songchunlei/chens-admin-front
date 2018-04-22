<template>
  <div id="createQuestion" class="app-container">
    <el-form :model="questionForm" :rules="questionRules" ref="questionForm" label-width="100px" class="source-form" label-position="left">
      <div class="title-container">
        <h3 class="title">新增题目</h3>
      </div>
      <el-row :gutter="40">
        <el-col :span="24">
          <el-form-item label="试题类型" prop="type">
            <el-select v-model="questionForm.type" placeholder="选择试题类型">
              <el-option v-for="item in types" :key="item.code" :label="item.name" :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="知识分类" prop="belong_subject">
            <el-radio-group v-model="questionForm.belong_subject">
              <el-radio v-for="item in subjects" :label="item.name" :key="item.code" @change="handleChoiceSub(item)"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="分类题目" prop="ubject_child">
            <el-checkbox-group v-model="questionForm.subject_child">
              <el-checkbox v-for="item in subject_child" :key="item.code" :label="item.name" name="subject_child"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="选项">
            <single-choice :size="3"></single-choice>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="题目名" prop="name">
            <el-input name="name" type="text" v-model="questionForm.name" placeholder="请输入题目名称" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import Rule from './config/rules'
import singleChoice from '@/components/SourceForm/singleChoice'

export default {
  name: '',
  data () {
    return {
      questionRules: Rule.rules,
      types: [
        { name: '单选题', code: '001' },
        { name: '多选题', code: '002' },
        { name: '判断题', code: '003' },
        { name: '填空题', code: '004' },
        { name: '简答题', code: '005' },
      ],

      subjects: [
        { name: '驾照题', code: '001' },
        { name: '高中毕业数学题', code: '002' },
        { name: '大学英语', code: '003' },
        { name: '大学物理', code: '004' },
        { name: '材料分析', code: '005' },
        { name: '分子结构', code: '006' }
      ],
      subject_child: [], // 筛选后
      subject_child_data: [ // 数据
        { name: '驾照题child', code: '001', pid: "001" },
        { name: '高中毕业数学题child', code: '002', pid: "002" },
        { name: '大学英语child', code: '003', pid: "003" },
        { name: '大学物理child', code: '004', pid: "004" },
        { name: '材料分析child', code: '005', pid: "005" },
        { name: '分子结构child', code: '006', pid: "006" }
      ],
      questionForm: {

      },
      
    }
  },
  components: { singleChoice },
  created () {

  },
  mounted () {

  },
  methods: {
    handleChoiceSub (item) {
      console.log(item);
      this.subject_child = [];
      for (let i = 0; i < this.subject_child_data.length; i ++) {
        if (this.subject_child_data[i].pid === item.code) {
          this.subject_child.push(this.subject_child_data[i]);
        }
      }
    }
  }
}
</script>
<style scoped>
</style>