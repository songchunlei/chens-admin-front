<template>
    <div class="contentForm">
        <el-form :inline="true" class="form-container" label-width="80px" label-position="right" :model="menusForm" :rules="rules" ref="menusForm">
        <el-form-item label="目录名" prop="name">
            <el-input v-model="menusForm.name" placeholder="目录名"></el-input>
        </el-form-item>
        <el-form-item label="路径" prop="url">
            <el-input v-model="menusForm.url" placeholder="路径"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="">
            <el-input v-model="menusForm.description" placeholder="描述"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="">
            <el-input v-model="menusForm.seq" placeholder="排序"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="">
            <el-input v-model="menusForm.icon" placeholder="图标"></el-input>
        </el-form-item>
        <el-form-item label="父节点" prop="">
            <el-input v-model="menusForm.parentId" placeholder="父节点ID"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="warning" @click="handleAppendSource">添加资源</el-button>
            <el-button type="primary" @click="submitForm('menusForm')">提交</el-button>
            <el-button @click="resetForm('menusForm')">重置</el-button>
        </el-form-item>
        </el-form>
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
import Rules from '../bookSectionRules'
import resourceTable from '@/components/Resource'

export default {
    name: 'book-form',
    data () {
        return {
            rules: Rules.rules,
            menusForm: {
                name: '', // 菜单名
                url: '', // 菜单路径
                description: '', // 描述
                seq: '', // 排序
                isopen: '', // 是否默认打开
                icon: '', // 图标
                parentId: '' // 默认1为根节点
            },

            
            dialogTableVisible: false, // 资源dialog 显示控制
            showCheckedJson: false, // 已选资源 显示控制
            checkedIds: [], // 已选资源的ids
            checkeds: [], // 已选资源列表
            
        }
    },
    created () {
        console.log("=============");
        console.log(this.form);
    },
    watch: {
        form () { // 表单的值发生变化
            debugger;
            console.log("```````````````");
            console.log(this.form);
            this.menusForm = this.form;
        },
        deep: true
    },
    props: ['form', 'handleStatus', 'currentNode'],
    components: { resourceTable },
    methods: {
        initData () {
            
        },
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$emit('subForm', this[formName]);
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
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
.listLine a {
    display: inline-block;
    margin-right: 30px;
    text-description: underline;
    color: #666;
}
</style>