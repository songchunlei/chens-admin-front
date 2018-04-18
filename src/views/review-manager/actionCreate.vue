<template>
  <div class="app-container">
  模板名称：{{tmptKey}}<br>
  模板json: {{tmptJson}}
  </div>
</template>
<script>
import tempConfig from './config'

export default {
  name: '',
  data () {
    return {
      flowkey: '', // 流程名称
      tmptKey: '', // 模板配置key

      tmptJson: '', // 模板配置json
    }
  },
  compotents: {},
  created () {
    this.initData()
  },
  mounted () {

  },
  methods: {
    initData () {
      this.flowkey = this.$route.query.flowkey;
      this.tmptKey = tempConfig.flowkey[this.flowkey];
      console.log(this.tmptKey);
      this.tmptJson = tempConfig[this.tmptKey];

      if (!this.flowkey || !this.tmptJson || !this.tmptJson) {
        this.$message.error('系统异常，未找到配置模板。');
        return;
      }
      this.initTmpt()
    },

    initTmpt () {
      console.log('flowkey:', this.flowkey, 'tmptJson:', this.tmptJson);
    }
  }
}
</script>
<style scoped>
</style>