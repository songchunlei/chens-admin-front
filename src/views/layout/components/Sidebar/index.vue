<template>
  <scroll-bar>
    <el-menu mode="vertical" :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
      <sidebar-item :routes="menus"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  components: { SidebarItem, ScrollBar },
  mounted () {
    
  },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar',
      'menus'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  created () {
    console.log("====================");
    console.log(this.menus);
  }
}
</script>
