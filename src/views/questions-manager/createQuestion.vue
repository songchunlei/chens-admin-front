<template>
  <div id="createQuestion" class="app-container">
     <el-form class="source-form" autoComplete="on" :model="questionForm" :rules="questionRules" ref="questionForm" label-position="left">
      <div class="title-container">
        <h3 class="title">新增题目</h3>
      </div>
      <el-form-item label="试题类型" prop="belong_subject">
        <el-select clearable style="width: 90px" class="filter-item" v-model="questionForm.belong_subject" :placeholder="$t('table.importance')">
          <el-option v-for="item in subjects" :key="item.code" :label="item.name" :value="item.code">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="题目名" prop="name">
        <el-input name="name" type="text" v-model="questionForm.name" autoComplete="on" placeholder="请输入题目名称" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Rule from './config/rules'

export default {
  name: '',
  data () {
    return {
      questionRules: Rule.rules,
      subjects: [
        { name: '单选题', code: '001' },
        { name: '多选题', code: '002' },
        { name: '判断题', code: '003' },
        { name: '填空题', code: '004' },
        { name: '简答题', code: '005' },
      ],
      questionForm: {

      }
    }
  },
  compotents: {},
  created () {

  },
  mounted () {

  },
  methods: {

  }
}
</script>
<style scoped>
</style>