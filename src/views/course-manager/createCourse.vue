<template>
  <div class="app-container">
    <el-form :model="courseForm" :rules="courseRules" ref="courseForm" label-width="100px" label-position="right">
      <div class="title-container">
        <h3 class="title">新增课程</h3>
      </div>
      <el-row :gutter="40">
        <el-col :span="24">
          <el-form-item label="课程名称" prop="name">
            <el-input name="name" type="text" v-model="courseForm.name" placeholder="请输入课程名称" />
          </el-form-item>
        </el-col>
      </el-row>

      <tags-form></tags-form>

      <el-row :gutter="40">
        <el-col :span="24" class="line"></el-col>
        <el-col :span="12">
          <el-form-item label="封面内容" prop="description">
            <!--
            <el-input name="name" type="textarea" v-model="questionForm.name" placeholder="请输入题目名称" />
            -->
            <vueUEditor @ready="editorReady" style="width: 800px"></vueUEditor>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="40">
        <el-col :span="12">
          <el-form-item>
            <el-button type="primary" @click="onSubmit('courseForm')">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
  </div>
</template>
<script>
import api from '@/api'
import Rule from './courseRules'
import vueUEditor from '@/components/Ueditor'
import tagsForm from '@/components/SourceForm/tags'
import { getTagClasses, getTagsByClassId } from '@/utils/tagSelect'

export default {
  name: '',
  data () {
    return {
      courseRules: Rule.rules,
      courseForm: {
        id:'',//id
        name:'',//课程名称
        description:'',//描述
        folderId:'-1'//文件夹id
      }
    }
  },
  components: { vueUEditor, tagsForm },
  created () {
    this.initData();
  },
  mounted () {

  },
  methods: {
    initData () {
      this.courseForm.folderId = this.$route.query.folderId;
      this.courseForm.id = this.$route.query.id;
      if (this.courseForm.id) {
        this.getCourse();
      }
      
    },

    // 获取书本信息
    getCourse () {
      api.getCourse({ id: this.courseForm.id }).then((res) => {
        const json = res.data;
        if (json.code === 1) {
          this.courseForm = json.data.businessData;
          this.editorReady();
        }
      }).catch((error) => {
        this.$message.error(error);
      })
    },

    editorReady (editorInstance) {
      editorInstance.setContent(this.courseForm.description);
      editorInstance.addListener('contentChange', () => {
        const content = editorInstance.getContent();
        //console.log('编辑器内容发生了变化：', editorInstance.getContent());
        this.courseForm.description = content;
      });
    },



    // 提交表单
    onSubmit(formName) {

      this.$refs[formName].validate((valid) => {

        if (valid) {
          api.saveCourse(this.courseForm).then((res) => {
            const json = res.data;
            if (json.code === 1) {
              this.$message.success('保存成功');
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
</style>