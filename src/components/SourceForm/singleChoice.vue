<template>
  <div class="app-container lineBox">
    <div v-for="(item, index) in choices">
      {{item.label}}：
      <el-input v-model="choices[index].optionContent" type="textarea"
        :autosize="{ minRows: 2, maxRows: 3}" style="width: 180px" placeholder="请输入内容">
      </el-input>
      <el-button @click="handleAddSource(item, index)" size="mini" type="primary">添加资源<i class="el-icon-circle-plus-outline el-icon--right"></i></el-button>
      
    </div>  

    <div v-if="showCheckedJson">
        <p>
          <a href="item.url" v-for="(item, key) in quoteJson">{{item.name}}</a>
        </p>
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
import Dict from '@/config/dict'
import resourceTable from '@/components/Resource'

export default {
  name: 'single-choice',
  data () {
    return {
      choices: [],
      enAlphabet: [], // 选项
      dialogTableVisible: false, // 控制资源列表显示
      currentIndex: '', // 当前操作的选项
      checkeds: '', // 选中的资源文件对象
      showCheckedJson: false, // 控制 已选资源是否显示
      quoteJson: '', 
    }
  },
  props: {
    size: {
      type: Number,
      default: 4  
    }
  },
  components: { resourceTable },
  created () {
    
  },
  mounted () {
    this.initData();
  },
  methods: {
    initData () {
      if (this.size < 1) {
        return;
      }
      this.enAlphabet = Dict.enAlphabet;
      this.packChoices();
    },

    // 组装选项 array
    packChoices () {
      for (let i = 0; i < this.size; i ++) {
        let choice = {};
        choice.label = this.enAlphabet[i];
        choice.optionSeq = i;
        this.choices.push(choice);
      }
    },

    // 获取选中
    handleGetChecked () {
      debugger;
      this.checkeds = this.$refs.resourceTable.checkeds;
      this.choices[this.currentIndex].quoteJson = this.checkeds;
      for (var key in this.checkeds) {
        if (!this.choices[this.currentIndex].questionsOptionQuoteList) {
          this.choices[this.currentIndex].questionsOptionQuoteList = [];
        }
        this.choices[this.currentIndex].questionsOptionQuoteList.push(this.checkeds[key].id);
      }
      this.dialogTableVisible = false;
      this.quoteJson = this.checkeds
      console.log(this.quoteJson);
      !this.showCheckedJson ? this.showCheckedJson = true : '';
    },

    handleAddSource (item, index) {
      this.currentIndex = index;
      this.dialogTableVisible = true;
    }
  }
}
</script>
<style scoped>
.lineBox label {
  vertical-align: super;
}
.lineBox button {
  vertical-align: top;
  margin-left: 20px;
}
.lineBox > div+div {
  margin-top: 20px;
}
</style>