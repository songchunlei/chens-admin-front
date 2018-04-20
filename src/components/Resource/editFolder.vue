<template>
    <div class="app-container simpleForm">
        <div>
            <el-form class="form-container" label-width="80px" label-position="right" :model="folderForm" :rules="rules" ref="folderForm">
                <el-form-item label="名称" prop="name">
                  <el-input v-model="folderForm.name" placeholder="名称"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button @click="handleCancel">取消</el-button>
                  <el-button type="primary" @click="submitForm('folderForm')">确认</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import api from '@/api';
import mapGetter from 'vuex';
import Rule from './rules'

export default {
  name: 'folderEdit-dialog',
  data () {
    return {
      rules: Rule.rules,
      folderForm: {
        id: '',
        type:'',
        name: '',
        parentId: ''
      }
    }
  },
  props: {
    busId: {
      type: String
    },
    busType:{
      type: String  
    },
    busName: {
      type: String
    },
    busParId: {
      type: String
    },
    
  },
  watch: {
  },
  computed: {
  },
  components: {
    
  },
  created () {
    this.initData();
  },
  mounted () {

  },
  methods: {
    // 初始化数据
    initData () {
        this.folderForm.id = this.busId;
        this.folderForm.type = this.busType;
        this.folderForm.name = this.busName;
        this.folderForm.parentId = this.busParId;
    },

    // 提交标签信息
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let funName = 'createSourceFolder';
          if (this.busId && this.busId != ':id') {
            funName = 'updateSourceFolder'
          }
          api[funName](this.folderForm).then((res) => {
            const json = res.data;
            if (json.code != 1) {
              this.$message.error(json.msg || '提交标签信息失败。');
              return;
            }
            this.$message.success(json.msg || '提交成功。');
            this.$emit('completeUpdate');
          }) 
        } else {
          return false;
        }
      });
      
      
    },

    handleCancel () {
      this.$emit('completeUpdate');
    }

  }
}
</script>