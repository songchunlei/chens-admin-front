<template>
    <div class="sysMenus custom-tree-container" :style="{'min-width': minWidth}">   
        <div class="block">
            <el-input
                placeholder="输入关键字进行过滤"
                v-model="filterText">
            </el-input>
            <p>系统菜单</p>
            <el-tree
            :data="data"
            node-key="id"
            :props="propsTree"
            default-expand-all
            ref="menuTree"
            :expand-on-click-node="false"
            :render-content="renderContent"
            :filter-node-method="filterNode"
            @node-click="handleNodeClick">
            </el-tree>
        </div>
    </div>
</template>

<script>
export default {
    name: 'menu-tree',
    data () {
        return {
            filterText: '',
            treeData: [],
            propsTree: {
                label: 'name'
            }
        }
    },
    props: {
        minWidth: {
            type: String,
            default: '200px'
        },
        data: {
            type: Array,
            default: []
        }
    },
    watch: {
        data () {
            this.initData();
        },
        filterText(val) {
            this.$refs.menuTree.filter(val);
        }
    },
    created () {
        this.initData();
    },
    components: {  },
    methods: {
        initData () {
            if (this.data && this.data.length > 0) {
                this.treeData = this.data;
            }    
        },

        filterNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },

        renderForm (data, type) {
            this.$emit('updateTree', data, type);
        },

        append (data) {
            this.renderForm(data, 'append');
            //const newChild = { id: id++, label: 'testtest', children: [] };
            //if (!data.children) {
            //this.$set(data, 'children', []);
            //}
            //data.children.push(newChild);
        },

        remove (node, data) {
            //const parent = node.parent;
            //const children = parent.data.children || parent.data;
            //const index = children.findIndex(d => d.id === data.id);
            //children.splice(index, 1);
        },
        renderContent (h, { node, data, store }) {
            return (
            <span class="custom-tree-node">
                <span>{node.label}</span>
                <span>
                <el-button size="mini" type="text" on-click={ () => this.append(data) }>添加</el-button>
                <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
                </span>
            </span>);
        },
        handleNodeClick(data){
            console.log("data-start");
            console.log(data);
            console.log("data-end");
            this.renderForm(data, 'update');
        }
    }
}
</script>

<style>
.sysMenus {
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    padding: 8px 24px 24px;
}
.sysMenus .custom-tree-node {
    -ms-flex: 1;
    flex: 1;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: justify;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
}
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
}
</style>