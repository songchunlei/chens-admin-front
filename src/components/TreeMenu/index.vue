<template>
    <div class="sysMenus custom-tree-container" :style="{'min-width': minWidth}">
        <div class="block">
            <p>系统菜单</p>
            <el-tree
            :data="data"
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            :render-content="renderContent">
            </el-tree>
        </div>
    </div>
</template>

<script>
export default {
    name: 'sidebar-tree',
    data () {
        return {

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
    components: {  },
    methods: {
        append(data) {
            const newChild = { id: id++, label: 'testtest', children: [] };
            if (!data.children) {
            this.$set(data, 'children', []);
            }
            data.children.push(newChild);
        },

        remove(node, data) {
            const parent = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex(d => d.id === data.id);
            children.splice(index, 1);
        },
        renderContent(h, { node, data, store }) {
            return (
            <span class="custom-tree-node">
                <span>{node.label}</span>
                <span>
                <el-button size="mini" type="text" on-click={ () => this.append(data) }>添加</el-button>
                <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
                </span>
            </span>);
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