<template>
  <div class="">
    <el-row :gutter="30">
      <el-col :span="8">
        <h3 class="m-b-md">创建目录</h3>
        <tree :data="treeList" @updateTree="updateTree" v-if="treeList.length > 0"></tree>
      </el-col>
      <el-col :span="16">
        <h5 class="p-sm" style="margin-bottom: 20px" v-html="title"></h5>
        <action-form :renderForm="_renderForm" :actionForm="currentNode" :handleStatus="handleStatus" v-if="visiableActionForm"></action-form>
        <div v-if="currentNode">
          <el-button type="primary" @click="submitForm('menusForm')">提交</el-button>
          <el-button @click="resetForm('menusForm')">重置</el-button>
          <slot name="btns"></slot>
        </div>
      </el-col>
    </el-row>

    <div class="listLine" v-if="showCheckedJson">
        <h5>已选资源</h5>
        <a href="item.url" target="_blank" v-for="(item, key) in checkeds">{{item.name}}</a>  
    </div>
    <el-dialog title="资源列表" width="1000px" :visible.sync="dialogTableVisible">
        <resource-table v-if="dialogTableVisible" ref="resourceTable" :btnVisable="false" :noFolder="true">
            <el-button>选择</el-button>
        </resource-table>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleGetChecked">添加选中</el-button>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import api from '@/api'
import tree from './tree'
import actionForm from './form'
import { clearJson, deepClone} from '@/utils'

export default {
  name: '',
  data () {
    return {
      dialogTableVisible: false,
      showCheckedJson: false,
      treeList: [],
      title: '<span class="sugMsg">点击左侧菜单对应的按钮进行操作<span>', // 操作提示
      handleStatus: '', // 树触发的方法 ('append', 'update', 'delete')
      currentNode: '', // 触发的当前节点
      _renderForm: { // render 的对象

      },
      form: { // 存值的

      },
      actionForm: {

      },
      actionRule: {},
      visiableActionForm: false,
    }
  },
  props: {
    tree: { //和treeJson二选一 不需要请求的
      type: Array,
      default: []
    },
    treeJson: { //和tree二选一 ajax 请求的配置
      type: Object,
      default () {
        return {
          treeFunName: '', // 方法名
          params: { // 请求参数

          },
          dataFromKey: 'data', // 从res.data 开始 数据放在哪
        }
      }
    },
    
    ajaxForm: { // 初始化 form值
      type: Object,
      default () {
        return {

        }
      }
    },

    renderForm: { // 必传 表单内容
      type: Object,
      default () {
        return {

        }
      }
    },

    rules: { // 规则
      type: Object,
      default () {
        return {
          
        }
      }
    }
  },
  watch: {
    currentNode () {
      this.rendForm();
      this.showForm = true;
      this.changeTitle();
    },
    handleStatus () {
      this.rendForm();
      this.showForm = true;
      this.changeTitle();
    },
    deep: true
  },
  components: { tree, actionForm },
  created () {
    this.initData()
  },
  mounted () {
  },
  methods: {
    initData () {
      console.log('tree: ', this.tree);
      console.log('_renderForm: ', this.renderForm);
      
      this.initTreeList();
      this.initForm();
    },
    initForm () {
      const renderForm = this.renderForm;
      if (!renderForm || Object.keys(renderForm).length < 1) {
        return;
      }
      for (const key in renderForm) {
        this.form[key] = renderForm[key].value || ''
      }
      this._renderForm = renderForm;
    },
    initTreeList () {
      const tree = this.tree;
      const treeFunName = this.treeJson.treeFunName;
      const dataFromKey = this.treeJson.dataFromKey || 'data';
      if (tree && tree.length > 0) {
        this.treeList = tree;
      }
      if (treeFunName) {
        api[treeFunName](params).then((res) => {
          const json = res.data;
          if (json.code === 1) {
            const jfkArr = dataFromKey.split('.');
            if ( jfkArr.length > 1) {
              let _treeList = [];
              for (let i = 0; i < jfkArr.length; i ++) {
                _treeList = json[jfkArr[i]]
              }
              this.treeList = _treeList
            } else {
              this.treeList = json[dataFromKey]
            }
          }
        }).catch((error) => {
          this.$message.error(error);
        })
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
      this.changeTitle();
      this.form = clearJson(this.form);
      switch (status) {
        case 'append': this.form.parentId = this.currentNode.id;
        break;
        case 'update': this.form = deepClone(this.currentNode);
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
      this.visiableActionForm = true;
    },

    handleSubForm () {

    },

    handleAppendSource () {
      this.dialogTableVisible = true;
      console.log('handleAppendSource');
    },
    // 获取选中
    handleGetChecked () {
      debugger;
      const checkeds = this.$refs.resourceTable.checkeds;
      for (let key in checkeds) {
        this.checkedIds.push(key);
        this.checkeds.push(checkeds[key])
      }
      
      this.dialogTableVisible = false;
      !this.showCheckedJson ? this.showCheckedJson = true : '';
    },
  }
}
</script>
<style scoped>
</style>