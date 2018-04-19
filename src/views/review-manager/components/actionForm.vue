<template>
  <div class="app-contanier">

  </div>
</template>
<script>
export default {
  name: '',
  data () {
    return {

    }
  },
  props: {
    tmptJson: {
      type: Object
    }
  },
  compotents: {},
  created () {
    this.initData();
  },
  mounted () {

  },
  methods: {
    initData () {
      console.log(this.tmptJson);
    }
  }
}
</script>
<style scoped>
</style>