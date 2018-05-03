<template>
  <div @click="handleToggleUpload" class='international'>
    <el-dropdown trigger="hover" @command="handleToggleUpload">
      <div>
        <svg-icon class-name='international-icon' icon-class="upload"/>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="loading">
          正在上传（1）
        </el-dropdown-item>
        <el-dropdown-item command="finish">
          已完成
        </el-dropdown-item>
        <el-dropdown-item command="faild">
          失败
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'upload',
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'visiableUpload'
    ]),
  },
  components: {},
  created () {
  },
  mounted () {

  },
  methods: {
    handleToggleUpload (val) {
      console.log(!this.visiableUpload);
      this.$store.dispatch('toggleUpload', !this.visiableUpload);
    }
  }
}
</script>
<style scoped>
.international-icon {
  font-size: 25px;
  cursor: pointer;
  vertical-align: -7px !important;
}
</style>