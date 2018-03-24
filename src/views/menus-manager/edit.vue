<template>
  <div id="menusMange" class="app-container">
    <el-row :gutter="20">
      <el-col :span="8">
        <div class="siderMenu" v-show="menusData">
          <menu-tree :data="menusData" @updateTree="updateTree"></menu-tree>
        </div>
      </el-col>
      <el-col :span="16" class="p-md">
        <div class="containerForm" v-show="showForm">
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
        form: {
          name: '',
          url: '',
          description: '',
          seq: '',
          isopen: '',
          icon: '',
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
      currentNode () {
        this.rendForm();
        this.showForm = true;
      }
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
        this.handleStatus = type;
        this.currentNode = data;
      },

      // 

      // 提交
      subForm (menusForm) {
        const status = this.handleStatus;
        if (status == 'append') {
          api.createMenu().then((res) => {
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