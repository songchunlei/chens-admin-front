<template>
    <div class="contentForm">
        <el-form :inline="true" class="form-container" label-width="80px" label-position="right" :model="menusForm" :rules="rules" ref="menusForm">
        <el-form-item label="菜单名" prop="name">
            <el-input v-model="menusForm.name" placeholder="菜单名"></el-input>
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
            <el-button type="primary" @click="submitForm('menusForm')">提交</el-button>
            <el-button @click="resetForm('menusForm')">重置</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>

<script>
import Rules from '../rules';

export default {
    name: 'menu-form',
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
            }
        }
    },
    watch: {
        form () { // 表单的值发生变化
            this.menusForm = this.form;
        }
    },
    props: ['form'],
    methods: {
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$emit('subForm', this[formName]);
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        }
    }
}
</script>