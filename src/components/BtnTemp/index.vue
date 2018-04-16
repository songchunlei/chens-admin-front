<template>
  <div id="btnTempBox">
    <!-- 新增 按钮不显示在table
    <el-button type="success" size="mini" v-if="showBtns.create" @click="handlerEmit('create')">新增</el-button>
    -->
    <el-button type="warning" size="mini" v-if="showBtns.update" @click="handlerEmit('update')">修改</el-button>
    <el-button type="default" size="mini" v-if="showBtns.delete" @click="handlerEmit('delete')">删除</el-button>
    <el-button type="default" size="mini" v-if="showBtns.batchDelete" @click="handlerEmit('batchDelete')">批量删除</el-button>
    <el-button type="info" size="mini" v-if="showBtns.update" @click="handlerEmit('info')">查看</el-button>
    <slot name="resetPwd"></slot>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'list-btn',
  data () {
    return {
      showBtns: {
        create: false,
        update: false,
        delete: false,
        batchDelete: false
      }
    }
  },
  props: ['code', 'item'],
  computed: {
    ...mapGetters([
      'menusJson'
    ])
  },
  created () {
    this.initData();
  },
  mounted () {

  },
  methods: {
    // 处理数据 判断按钮是否显示
    initData () {
      const b_cs = this.menusJson[this.code].children;
      if (!b_cs || b_cs.length < 1) {
        return;
      }
      for (var i = 0; i < b_cs.length; i++) {
        const code = this.subLastCode(b_cs[i].code);
        this.showBtns[code] = true;
      }
      this.$emit('btnTempComplete', this.showBtns);
    },

    // 截取字符串
    subLastCode (_code, _str) {
      const str = _str || '-';
      if (!_code) {
        return "";
      }
      return _code.substring(_code.lastIndexOf(str) + 1, _code.length);
    },

    // 触发父组件的方法
    handlerEmit (type) {
      this.$emit('handlerAllot', type, this.item);
    }
  }
}
</script>
<style scoped>
</style>