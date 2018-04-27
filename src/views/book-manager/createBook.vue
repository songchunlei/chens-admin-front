<template>
  <div class="app-container">
    <el-form :model="bookForm" :rules="bookRules" ref="bookForm" label-width="100px" label-position="right">
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
          <el-form-item label="封面内容" prop="name">
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
import Rule from './bookRules'
import vueUEditor from '@/components/Ueditor'
import tagsForm from '@/components/SourceForm/tags'
import { getTagClasses, getTagsByClassId } from '@/utils/tagSelect'

export default {
  name: '',
  data () {
    return {
      bookRules: Rule.rules,
      bookForm: {
        
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
      this.editorReady()
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
</style>