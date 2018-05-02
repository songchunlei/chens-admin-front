<template>
  <div class="app-container">
    <h3>新增试卷</h3>
    <div id="examForm" class="app-container">
      <el-row :gutter="40">
        <el-col :span="18">
          <el-form ref="examForm" :model="examForm" :rules="examRules" label-width="90px">
            <el-form-item label="试卷名称" prop="name">
              <el-input v-model="examForm.name"></el-input>
            </el-form-item>
            <el-form-item label="及格分数" prop="passPoint">
              <el-input v-model="examForm.passPoint"></el-input>
            </el-form-item>
            <el-form-item label="总分数" prop="totalPoint">
              <el-input v-model="examForm.totalPoint"></el-input>
            </el-form-item>
            <el-form-item label="时长(分钟)" prop="duration">
              <el-input v-model="examForm.duration"></el-input>
            </el-form-item>
            <el-form-item label="试卷简述">
              <el-input type="textarea" :rows="2"  placeholder="试卷描述" v-model="examForm.summary"></el-input>
            </el-form-item>

            <el-form-item label="添加试题">
              <el-button type="primary" @click="addQuesition">添加试题</el-button>
            </el-form-item>

            <el-form-item style="margin-top: 35px;">
              <el-button type="success" @click="onSubmit('save')">保存</el-button>
              <el-button type="warning" @click="onSubmit('submit')">提交审批</el-button>
              <el-button @click="$router.go(-1)">取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>

    <el-dialog title="资源列表" width="1000px" :visible.sync="dialogTableVisible">
      <exam-table v-if="dialogTableVisible" ref="resourceTable" :btnVisable="false" :noFolder="true">
        <el-button>选择</el-button>
      </exam-table>
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
      dialogTableVisible: false,
      examForm: {
        folderId: '',
        packExam: 'auto',
        point: 60,
        time: 120
      },
      examRules: ''
    }
  },
  components: { examTable },
  created () {
    this.initData();
  },
  mounted () {

  },
  methods: {
    // 初始化
    initData () {
      console.log(Rule.rules);
      this.examRules = Rule.rules;
      console.log(this.examRules);
      this.examForm.folderId = this.$route.query.folderId;
      this.examForm.id = this.$route.query.id;
      if (this.examForm.id) {
        this.getExam();
      }
    },

    // 获取exam信息
    getExam () {
      debugger;
      api.getExamPaper({ id: this.examForm.id }).then((res) => {
        const json = res.data;
        if (json.code === 1) {
          this.examForm = json.data.businessData;
        }
      }).catch((error) => {
        this.$message.error(error);
      })
    },

    // 提交表单
    onSubmit (type) {
      const funName = type === 'save' ? 'saveExamPaper' : 'submitExamPaperApi';
      this.$refs.examForm.validate((valid) => {
        if (valid) {
          api[funName](this.examForm).then((res) => {
            const json = res.data;
            if (json.code ===1) {
              this.$message.success(json.msg);
              this.$router.push({ path: '/examPaperManager/examPaperPage' })
            }
          }).catch((error) => {
            this.$message.error(error)
          })
        }
      })
      
    },

    //添加试题
    addQuesition () {
      this.dialogTableVisible = true;
    },

    // 选中添加
    handleGetChecked () {

    }
  }
}
</script>
<style scoped>
</style>