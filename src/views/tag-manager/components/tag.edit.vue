<template>
    <div class="app-container simpleForm">
        <div>
            <el-form class="form-container" label-width="80px" label-position="right" :model="tagForm" :rules="rules" ref="tagForm">
                <el-form-item label="标签名称" prop="tagName">
                  <el-input v-model="tagForm.tagName" placeholder="标签名称"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="comment">
                  <el-input v-model="tagForm.comment" placeholder="备注"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button @click="handleCancel">取消</el-button>
                  <el-button type="primary" @click="submitForm('tagForm')">确认</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import api from '@/api';
import mapGetter from 'vuex';
import Rule from '../tagRules'

export default {
  name: 'tagEdit-dialog',
  data () {
    return {
      rules: Rule.rules,
      tagForm: {
        id: '',
        comment: '',
        tagName: '',
        classId: ''
      }
    }
  },
  props: {
    busId: {
      type: String
    },
    busParId: {
      type: String
    }
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
      if (!this.busId) {
          return;
      }
      api.getTagById(this.busId).then((res) => {
          let json = res.data;
          if (json.code != 1) {
              this.$message.error(json.msg || '获取标签信息失败。');
              return;
          }
          this.tagForm = json.data;

      }).catch((error) => {
          this.$message.error(error || '服务异常。');
      })
    },

    // 提交标签信息
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let funName = 'createTag';
          if (this.busId && this.busId != ':id') {
            funName = 'updateTag'
          }
          console.log(this.busParId);
          this.tagForm.classId = this.busParId; 
          api[funName](this.tagForm).then((res) => {
            const json = res.data;
            if (json.code != 1) {
              this.$message.error(json.msg || '提交标签信息失败。');
              return;
            }
            this.$message.success(json.msg || '提交成功。');
            this.$emit('completeUpdate');
            //this.$router.push({ path: '/roleManager/roleList' });
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