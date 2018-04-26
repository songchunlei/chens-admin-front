<template>
  <div class="app-container">
    <el-form :model="bookForm" :rules="bookRules" ref="bookForm" label-width="100px" label-position="left">
      <div class="title-container">
        <h3 class="title">新增书本</h3>
      </div>
      <el-row :gutter="40">
        <el-col :span="24">
          <el-form-item label="书本名称" prop="name">
            <el-input name="name" type="text" v-model="bookForm.name" placeholder="请输入书本名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="知识分类" prop="tagClasses">
            <el-radio-group>
              <el-radio v-for="tagClass in tagClasses" :label="tagClass.id" :key="tagClass.id" @change="handleChangeSub(tagClass)">{{tagClass.className}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="分类题目" prop="ubject_child" class="text-left">
            <el-checkbox-group v-model="bookForm.tags">
              <el-checkbox v-for="tag in tags" :key="tag.id" :label="tag.id" @change="handleSubjectChange(tag)">{{tag.tagName}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="已选分类">
             <div class="listBox">
               <span v-for="tag in tags" :key="tag.id">/&nbsp;{{tag.tagName}}&nbsp;/</span>
             </div>
             <el-button size="mini" type="warning" @click="handeClearSub">清空列表</el-button>
          </el-form-item>
        </el-col>
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
import Rule from './config/rules'
import vueUEditor from '@/components/Ueditor'
import { getTagClasses, getTagsByClassId } from '@/utils/tagSelect'
export default {
  name: '',
  data () {
    return {
      bookRules: Rule.rules,
      bookForm: {
        
      }, 
      tagClasses:{},
      tags:{},

    }
  },
  components: { vueUEditor },
  created () {
    this.initData();
  },
  mounted () {

  },
  methods: {
    initData () {
      this.tagClasses = getTagClasses();
      //this.handleChangeSub({ id: this.currentSubject });
    },
    handleChangeSub (item) {
      if(item && item.id)
      {
         this.tags =  getTagsByClassId(item.id);
      }
      else{
        return;
      }
    },
    handeClearSub(item){

    },
    handleChangeSub (item) {
      
    },
    handleSubjectChange(tag)
    {

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