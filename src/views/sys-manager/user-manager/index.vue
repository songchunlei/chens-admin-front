<template>
  <transition name="fade" mode="out-in">
    <keep-alive :include='cachedViews'>
      <router-view></router-view>
    </keep-alive>
  </transition>
</template>

<script>
export default {
  name: 'UserMain',
  computed: {
    cachedViews() {
      console.log('cachedViews');
      console.log(this.$store.state.tagsView.cachedViews);
      return this.$store.state.tagsView.cachedViews
    }
  }
}
</script>
