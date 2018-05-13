<template>
  <div class="contentForm">
    <el-form :inline="true" class="form-container" label-width="80px" label-position="right" :model="modelForm" ref="modelForm">
      
      <el-row :gutter="30">
        <el-col :span="12" v-for="(item, key) in renderForm" :key="key">
          <el-form-item :label="item.label" :prop="key" v-if="!item.hidden">
            <el-input v-model="modelForm[key]" :placeholder="item.placeholder || item.label"
              :type="item.type === 'input' ? 'text' : item.type" v-if="!item.type || item.type === 'input' || item.type === 'textarea'">
            </el-input>
            
            <el-select v-model="modelForm[key]" :placeholder="item.placeholder || '请选择'"
              type="select" v-else-if="item.type === 'select'">
              <el-option v-for="opt in item.options || []" :key="opt.value" :label="opt.label" :value="opt.value">
              </el-option>
            </el-select>

            <el-date-picker v-model="modelForm[key]" :placeholder="item.placeholder || '选择日期'"
              type="date" v-else-if="item.type === 'date'">
            </el-date-picker>

            <el-date-picker v-model="modelForm[key]" :placeholder="item.placeholder || '选择日期时间'"
              type="datetime" v-else-if="item.type === 'datetime'">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    
  </div>
</template>

<script>
import resourceTable from '@/components/Resource'

export default {
    name: 'book-form',
    data () {
      return {
        modelForm: {
            name: '', // 菜单名
            url: '', // 菜单路径
            description: '', // 描述
            seq: '', // 排序
            isopen: '', // 是否默认打开
            icon: '', // 图标
            parentId: '' // 默认1为根节点
        },
        modelRules: {},
        
        dialogTableVisible: false, // 资源dialog 显示控制
        showCheckedJson: false, // 已选资源 显示控制
        checkedIds: [], // 已选资源的ids
        checkeds: [], // 已选资源列表
        
      }
    },
    props: {
      rules: {
        type: Object,
        default () {
          return {
        
          }
        }  
      },
      renderForm: { // 渲染页面的form配置
        type: Object,
        default () {
          return {
            
          }
        }   
      },

      actionForm: { // 绑定值的form
        type: Object,
        default () {
          return {
            
          }
        } 
      },

      handleStatus: {
        type: String
      }
    },
    created () {
      console.log("=============");
      console.log(this.rules);
      this.initData();
    },
    mounted () {
    },
    watch: {
      actionForm () { // 表单的值发生变化
        if (this.handleStatus === 'append') {
            
        } else {
            this.modelForm = this.actionForm;
        }
        console.log(this.modelForm);
      },
      deep: true
    },
    components: { resourceTable },
    methods: {
      initData () {
        console.log('this.renderForm: ', this.renderForm);
        this.modelForm = this.actionForm;
        this.modelRules = this.rules;
      },

      validateForm () {
        this.$refs[formName].validate((valid) => {
          return valid;
        })
      },

        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$emit('subForm', this[formName]);
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        }
    }
}
</script>
<style scoped>
.listLine a {
    display: inline-block;
    margin-right: 30px;
    text-description: underline;
    color: #666;
}
</style>