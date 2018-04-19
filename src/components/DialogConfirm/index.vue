<template>
    <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
    <span>{{message}}</span>
    <span slot="footer" class="dialog-footer">
        <div v-if="type === 'confirm'">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </div>
        <div v-esle-if="type === 'inform'">
            <el-button @click="dialogVisible = false">朕知道了</el-button>
        </div>
    </span>
    </el-dialog>
</template>

<script>
  export default {
    name: 'Confirm',
    data() {
      return {
        dialogVisible: false
      };
    },
    created () {
        this.initData();
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  };
</script>