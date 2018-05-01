<template>
  <div class="app-container">
    <h3>新增试卷</h3>
    <div id="examForm" class="app-container" :rules="examRules">
      <el-row :gutter="40">
        <el-col :span="18">
          <el-form ref="examForm" :model="examForm" label-width="80px">
            <el-form-item label="试卷名称" prop="name">
              <el-input v-model="examForm.name"></el-input>
            </el-form-item>
            <el-form-item label="及格分数" prop="point">
              <el-input v-model="examForm.passPoint"></el-input>
            </el-form-item>
            <el-form-item label="总分数" prop="point">
              <el-input v-model="examForm.totalPoint"></el-input>
            </el-form-item>
            <el-form-item label="时长(分钟)" prop="time">
              <el-input v-model="examForm.duration"></el-input>
            </el-form-item>
            <el-form-item label="试卷简述" prop="time">
              <el-input type="textarea" :rows="2"  placeholder="试卷描述" v-model="examForm.summary"></el-input>
            </el-form-item>

            <el-form-item label="试卷简述" prop="time">
              <el-button type="primary" @click="addQuesition">添加试题</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>

    <el-dialog title="资源列表" width="1000px" :visible.sync="dialogTableVisible">
      <resource-table v-if="dialogTableVisible" ref="resourceTable" :btnVisable="false" :noFolder="true">
        <el-button>选择</el-button>
      </resource-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleGetChecked">添加选中</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import api from '@/api'
import Rule from './config/rules'
import examTable from '@/components/ExamPage'

export default {
  name: '',
  data () {
    return {
      
      examForm: {
        forderId: '',
        packExam: 'auto',
        point: 60,
        time: 120
      },
      examRules: ''
    }
  },
  compotents: { examTable },
  created () {
    this.initData();
  },
  mounted () {

  },
  methods: {
    // 初始化
    initData () {
      this.examRules = Rule.rules;
      console.log(this.examRules);
      this.examForm.forderId = this.$route.query.forderId || '-1'
    },

    // 提交表单
    subForm (type) {
      const funName = type === 'save' ? 'saveExamPaper' : 'submitExamPaperApi';
      api[funName]
    },

    //添加试题
    addQuesition () {

    }
  }
}
</script>
<style scoped>
</style>