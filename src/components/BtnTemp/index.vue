<template>
  <div id="btnTempBox">
    <el-button type="success" v-if="btnChilds.create" @click="handlerEmit('create')">新增</el-button>
    <el-button type="warning" @click="handlerEmit('update')">修改</el-button>
    <el-button type="default" @click="handlerEmit('delete')">删除</el-button>
    <el-button type="default" @click="handlerEmit('batchDelete')">批量删除</el-button>
    <slot name="restPwd"></solt>
  </div>
</template>
<script>
export default {
  name: 'list-btn'
  data () {
    return {
      create: false,
      update: false,
      delete: false,
      batchDelete: false,
    }
  },
  props: ['btnChilds'],
  created () {
    this.initData();
  },
  mounted () {

  },
  methods: {
    // 处理数据 判断按钮是否显示
    initData () {
      const b_cs = this.btnChilds;
      if (!b_cs || b_cs.length < 1) {
        return;
      }

      for (var i = 0; i < b_cs.length; i++) {
        let code = subCode(b_cs[i].code);
        this[code] = true;
      }

    },

    // 截取字符串
    subCode (_code) {
      if (!_code) {
        return "";
      }
      return _code.substring(_code.lastIndexOf('-') + 1, _code.length);
    },

    // 触发父组件的方法
    handlerEmit (type) {
      this.$emit('handlerAllot', type);
    }
  }
}
</script>
<style scoped>
</style>