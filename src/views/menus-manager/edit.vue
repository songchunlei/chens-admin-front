<template>
  <div id="menusMange" class="app-container">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="siderMenu" v-show="menusData">
          <menu-tree :data="menusData" @updateTree="updateTree"></menu-tree>
        </div>
      </el-col>
      <el-col :span="16" class="p-md">   
        <h4 v-show="!showForm" v-html="title"></h4>  
        <div class="containerForm" v-show="showForm">
          <h5 class="p-sm" style="margin-bottom: 20px" v-html="title"></h5>
          <menu-form :form="form" @subForm="subForm"></menu-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import api from '@/api';
import { mapGetters } from 'vuex';
import menuTree from './components/tree';
import menuForm from './components/form';

export default {
    data () {
      return {
        showForm: false,
        title: '<span class="sugMsg">点击左侧菜单对应的按钮进行操作<span>', // 操作提示
        form: {
          name: '',
          url: '',
          description: '',
          seq: '',
          isopen: '',
          icon: '',
          id: '',
          parentId: ''
        },
        menusData: [],
        handleStatus: '', // 树触发的方法 ('append', 'update', 'delete')
        currentNode: '' // 触发的当前节点
      }
    },
    computed: {
      ...mapGetters([
        'menusJson',
        'menus'
      ])
    },
    watch: {
      'currentNode.id' () {
        debugger;
        this.rendForm();
        this.showForm = true;
        this.changeTitle();
      },
      handleStatus () {
        this.changeTitle();
      },
      deep: true
    },
    components: { menuTree, menuForm },
    created () {
      this.initData();
    },
    mounted () {

    },
    methods: {
      initData () {
        debugger;
        if (this.menus && this.menus.length > 0) {
          this.menusData = JSON.parse(JSON.stringify(this.menus));
        }
      },
      changeTitle () {
        if (this.handleStatus == 'append') {
          this.title = '新增<span class="font-mark">' + this.currentNode.name + '</span>菜单的子菜单。';
        } else if (this.handleStatus == 'update') {
          this.title = '修改<span class="font-mark">' + this.currentNode.name + '</span>菜单。';
        } else {
          this.title = '<span class="sugMsg">点击左侧菜单对应的按钮进行操作<span>';
        }
      },
      rendForm () {
        const status = this.handleStatus;
        switch (status) {
          case 'append': this.form.parentId = this.currentNode.id;
          break;
          case 'update': this.form = this.currentNode;
          break;
          case 'delete': '';
          default: break;
        }
      },
      
      // 添加或修改
      updateTree (data, type) {
        debugger;
        this.handleStatus = type;
        this.currentNode = data;
      },

      // 

      // 提交
      subForm (menusForm) {
        debugger;
        const status = this.handleStatus;
        if (status == 'append') {
          api.createMenu(menusForm).then((res) => {
            let json = res.data;
            if (json.code != 1) {
              this.$message.error(json.msg || '添加菜单失败。');
              return;
            }
            let currentNode = this.currentNode;
            if (!currentNode.children) {
              this.$set(currentNode, 'children', []);
            }
            // currentNode.children.push(newChild);

            // this.$store.commit('SAVE_MENUS');
          }).catch((error) => {
            this.$message.error(error || '服务异常。')
          })
        }
      }
    }
}
</script>
<style scoped>
#menusMange h4 {
  margin-top: 120px;
  text-align: center;
} 
#menusMange h4 > span.sugMsg,
h5 {
  color: #666;
}
</style>