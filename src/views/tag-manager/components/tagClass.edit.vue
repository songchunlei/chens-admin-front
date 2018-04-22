<template>
    <div class="app-container simpleForm">
        <div>
            <el-form class="form-container" label-width="80px" label-position="right" :model="tagClassForm" :rules="rules" ref="tagClassForm">
                <el-form-item label="分类名称" prop="className">
                <el-input v-model="tagClassForm.className" placeholder="分类名称"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="comment">
                <el-input v-model="tagClassForm.comment" placeholder="备注"></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button @click="handleCancel">取消</el-button>
                  <el-button type="primary" @click="submitForm('tagClassForm')">确认</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import api from '@/api';
import mapGetter from 'vuex';
import Rule from '../tagClassRules'

export default {
  name: 'tagClassEdit-dialog',
  data () {
    return {
      rules: Rule.rules,
      tagClassForm: {
        id: '',
        className: '',
        comment: ''
      }
    }
  },
  props: {
    busId: {
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
      if (!this.roleId) {
          return;
      }
      api.getTagClassById(this.busId).then((res) => {
          let json = res.data;
          if (json.code != 1) {
              this.$message.error(json.msg || '获取角色信息失败。');
              return;
          }
          this.tagClassForm = json.data;

      }).catch((error) => {
          this.$message.error(error || '服务异常。');
      })
    },

    // 提交标签分类信息
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let funName = 'createTagClass';
          if (this.busId && this.busId != ':id') {
            funName = 'updateTagClass'
          }
          api[funName](this.tagClassForm).then((res) => {
            const json = res.data;
            if (json.code != 1) {
              this.$message.error(json.msg || '提交标签分类信息失败。');
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