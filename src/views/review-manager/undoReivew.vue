<template>
  <div class="app-container">
  模板名称：{{tmptKey}}<br>
  模板json: {{tmptJson}}
  <action-form v-if="actionFormVisable" :tmptJson="tmptJson"></action-form>
  </div>
</template>
<script>
import tempConfig from './config'
import actionForm from './components/actionForm'

export default {
  name: '',
  data () {
    return {
      actionFormVisable: false, // 自由表单控制显示
      flowkey: '', // 流程名称
      tmptKey: '', // 模板配置key

      tmptJson: '', // 模板配置json
    }
  },
  compotents: { actionForm },
  created () {
    this.initData()
  },
  mounted () {

  },
  methods: {
    initData () {
      this.flowkey = this.$route.query.flowkey;
      this.tmptKey = tempConfig.flowkey[this.flowkey];
      this.tmptJson = tempConfig[this.tmptKey];

      if (!this.flowkey || !this.tmptJson || !this.tmptJson) {
        this.$message.error('系统异常，未找到配置模板。');
        return;
      }
      this.initTmpt()
    },

    initTmpt () {
      this.actionFormVisable = true;
      console.log('flowkey:', this.flowkey, 'tmptJson:', this.tmptJson);
    }
  }
}
</script>
<style scoped>
</style>