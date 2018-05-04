<template>
  <div class="app-container">
    <el-steps :active="stepJson.active" finish-status="success">
      <el-step title="步骤 1" @click="step1" description="编辑书本明细"></el-step>
      <el-step title="步骤 2" @click="step2" description="编辑书本目录"></el-step>
      <el-step title="步骤 3" @click="step3" description="提交审批"></el-step>
    </el-steps>

    <div class="m-b-md text-right w-full">
    <el-button style="margin-top: 12px;" type="success" @click="onSubmit('bookForm')">{{stepJson.stepBtnTitle}}</el-button>
    <el-button style="margin-top: 12px;">取消</el-button>
    </div>

    <book-edit> </book-edit>
    <el-form v-show="stepJson.active === 1" :model="bookForm" :rules="bookRules" ref="bookForm" label-width="100px" label-position="right">
      <div class="title-container">
        <h3 class="title">新增书本</h3>
      </div>
      <el-row :gutter="40">
        <el-col :span="24">
          <el-form-item label="书本名称" prop="name">
            <el-input name="name" type="text" v-model="bookForm.name" placeholder="请输入书本名称" />
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
    </el-form>
  </div>
</template>
<script>
import api from '@/api'
import Rule from './bookRules'
import vueUEditor from '@/components/Ueditor'
import tagsForm from '@/components/SourceForm/tags'
import editBook from './components/editBookSection'
import { getTagClasses, getTagsByClassId } from '@/utils/tagSelect'


export default {
  name: '',
  data () {
    return {
      bookRules: Rule.rules,
      bookForm: {
        id: '', // id
        name: '', // 书本名称
        description: '', // 描述
        folderId: '-1' // 文件夹id
      },
      stepJson: {
        active: 1,
        stepBtnTitle: '创建书本'
      },
    }
  },
  components: { vueUEditor, tagsForm,editBook },
  watch: {
    'stepJson.active' () {
      if (this.stepJson.active === 1) {
        this.stepJson.stepBtnTitle = '创建书本'
      } else if (this.stepJson.active === 2) {
        this.stepJson.stepBtnTitle = '创建目录'
      } else if (this.stepJson.active === 3) {
        this.stepJson.stepBtnTitle = '提交审核'
      }
    },
    deep: true
  },
  created () {
    this.initData();
  },
  mounted () {

  },
  methods: {
    initData () {
      this.bookForm.folderId = this.$route.query.folderId;
      this.bookForm.id = this.$route.query.id;
      if (this.bookForm.id) {
        this.getBook();
      }
      
    },
    next() {
      if (this.active++ > 3) {
          this.active = 3;
          this.$message({
            showClose: true,
            message: '已经是最后一步了'
          });
      }
    },
    step1(){
      this.stepJson.active = 1;
    },
    step2(){
      this.stepJson.active = 2;
    },
    step3(){
      this.stepJson.active = 3;
    },

    // 获取书本信息
    getBook () {
      api.getBook({ id: this.bookForm.id }).then((res) => {
        const json = res.data;
        if (json.code === 1) {
          this.bookForm = json.data.businessData;
          this.editorReady();
        }
      }).catch((error) => {
        this.$message.error(error);
      })
    },

    editorReady (editorInstance) {
      editorInstance.setContent(this.bookForm.description);
      editorInstance.addListener('contentChange', () => {
        const content = editorInstance.getContent();
        //console.log('编辑器内容发生了变化：', editorInstance.getContent());
        this.bookForm.description = content;
      });
    },



    // 提交表单
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.saveBook(this.bookForm).then((res) => {
            const json = res.data;
            if (json.code === 1) {
              this.next();
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