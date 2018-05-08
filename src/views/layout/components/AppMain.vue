<template>
  <section class="app-main" style="min-height: 100%;position: relative">
    <transition name="fade" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view></router-view>
      </keep-alive>
    </transition>
    <!--
    <upload v-if="uploadVisable"></upload>
    -->
  </section>
</template>

<script>
// import Upload from '@/components/Upload'
import { mapGetters } from 'vuex'

export default {
  name: 'AppMain',
  data () {
    return {
      uploadVisable: false
    }
  },
  computed: {
    ...mapGetters([
      'visiableUpload'
    ]),
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    }
  },
  watch: {
    visiableUpload () {
      this.uploadVisable = this.visiableUpload
    }
  },
  components: { }
}
</script>
