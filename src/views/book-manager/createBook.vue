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

    <!--
    <book-edit> </book-edit>
    -->

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

      <tags-form ref="tagsForm"></tags-form>

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

    <div v-show="stepJson.active === 2">
      <el-row :gutter="40">
        <el-col :span="8">
          <h3 class="m-b-md">创建目录</h3>
          <tree :data="treeList" v-if="stepJson.active === 2"></tree>
        </el-col>
        <el-col :span="16">
          <h5 class="p-sm" style="margin-bottom: 20px" v-html="title"></h5>
          <catalogForm :form="form" @subForm="subForm" :handleStatus="handleStatus"></catalogForm>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import api from '@/api'
import Rule from './bookRules'
import vueUEditor from '@/components/Ueditor'
import tagsForm from '@/components/SourceForm/tags'
import editBook from './components/editBookSection'
import { getTagClasses, getTagsByClassId } from '@/utils/tagSelect'
import tree from './components/tree'
import catalogForm from './components/form'

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

      treeList: [], // 目录
      title: '<span class="sugMsg">点击左侧菜单对应的按钮进行操作<span>', // 操作提示
      handleStatus: '', // 树触发的方法 ('append', 'update', 'delete')
      currentNode: '' // 触发的当前节点
    }
  },
  components: { vueUEditor, tagsForm, editBook, tree, catalogForm },
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
      this.bookForm.folderId = this.$route.query.folderId || -1;
      this.bookForm.id = this.$route.query.id || '';
      if (this.bookForm.id) {
        this.getBook();
      } else {
        this.treeList = [{
          name: '主目录',
          id: '-1'
        }]
      }
      
    },
    next() {
      if (this.stepJson.active ++ > 3) {
          this.stepJson.active = 3;
          this.$message({
            showClose: true,
            message: '已经是最后一步了'
          });
      }
    },
    step1 () {
      this.stepJson.active = 1;
    },
    step2 () {
      this.stepJson.active = 2;
    },
    step3 () {
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

    changeTitle () {
      if (this.handleStatus == 'append') {
        this.title = '新增<span class="font-mark">' + this.currentNode.name + '</span>菜单的子菜单。';
      } else if (this.handleStatus == 'update') {
        this.title = '修改<span class="font-mark">' + this.currentNode.name + '</span>菜单。';
      } else {
        this.title = '<span class="sugMsg">点击左侧菜单对应的按钮进行操作<span>';
      }
    },
    rendForm () {
      const status = this.handleStatus;
      this.form = clearJson(this.form);
      switch (status) {
        case 'append': this.form.parentId = this.currentNode.id;
        break;
        case 'update': this.form = deepClone(this.currentNode);
        break;
        case 'delete': '';
        default: break;
      }
    },
    
    // 添加或修改
    updateTree (data, type) {
      debugger;
      this.handleStatus = type;
      this.currentNode = data;
    },

    subForm () {
      console.log('subForm');
    },

    // 提交表单
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = this.bookForm;
          params.choicedTags = this.$refs.tagsForm.tagForm.choicedTags;
          api.saveBook(params).then((res) => {
            const json = res.data;
            if (json.code === 1) {
              this.bookForm.id = json.data;
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