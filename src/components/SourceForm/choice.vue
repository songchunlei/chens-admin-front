<template>
  <div class="app-container lineBox">
    <div v-for="(item, index) in choices">
      {{item.label}}：
      <el-input v-model="choices[index].optionContent" type="textarea"
        :autosize="{ minRows: 2, maxRows: 3}" style="width: 180px" placeholder="请输入内容">
      </el-input>
      <el-button @click="handleAddSource(item, index)" size="mini" type="primary">添加资源<i class="el-icon-circle-plus-outline el-icon--right"></i></el-button>
    </div>

    <div v-if="subType === 'singleChoice'">
      <span style="margin-right: 10px">选择正确答案：</span>
      <el-radio-group v-model="rightAnswer">
        <el-radio v-for="item in enAlphabetNeed" :label="item" :key="item">{{item}}</el-radio>
      </el-radio-group>
    </div>

    <div v-if="subType === 'multipleChoice'">
      <el-checkbox-group v-model="rightAnswer">
        <el-checkbox v-for="item in enAlphabetNeed" :key="item" :label="item">{{item}}</el-checkbox>
      </el-checkbox-group>
    </div>

    <div class="checkedSourceBox">
      <div v-for="(choice, index) in choices">
        <span>选项&nbsp;{{choice.label}}&nbsp;的资源</span></br>
        <div>
          <a href="item.url" target="_blank" v-for="(item, key) in choice.quoteJson">{{item.name}}</a>    
        </div>
      </div>
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
//import Dict from '@/sysconfig/dict'
import resourceTable from '@/components/Resource'
import { deepClone } from '@/utils'

export default {
  name: 'single-choice',
  data () {
    return {
      choices: [],
      enAlphabet: [], // 选项
      enAlphabetNeed: [], // 需要的选项
      dialogTableVisible: false, // 控制资源列表显示
      currentIndex: '', // 当前操作的选项
      checkeds: '', // 选中的资源文件对象
      showCheckedJson: false, // 控制 已选资源是否显示

      rightAnswer: [], // 正确答案
    }
  },
  props: {
    size: {
      type: Number,
      default: 4
    },
    subType: {
      type: String,
      default: 'singleChoice'
    }
  },
  components: { resourceTable },
  watch: {
    subType () {
      this.rightAnswer = [];
    }
  },
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
      //this.enAlphabet = Dict.enAlphabet;
      this.enAlphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
      this.packChoices();
    },

    // 组装选项 array
    packChoices () {
      for (let i = 0; i < this.size; i ++) {
        this.enAlphabetNeed.push(this.enAlphabet[i]);
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
      if (!this.choices[this.currentIndex].quoteJson) {
        this.choices[this.currentIndex].quoteJson = {}
        for (var key in this.checkeds) {
          this.choices[this.currentIndex].quoteJson[key] = this.checkeds[key]
        }
      }
      for (var key in this.checkeds) {
        if (!this.choices[this.currentIndex].questionsOptionQuoteList) {
          this.choices[this.currentIndex].questionsOptionQuoteList = [];
        }
        this.choices[this.currentIndex].questionsOptionQuoteList.push(this.checkeds[key].id);
      }
      this.dialogTableVisible = false;
      !this.showCheckedJson ? this.showCheckedJson = true : '';
    },

    handleAddSource (item, index) {
      this.currentIndex = index;
      this.dialogTableVisible = true;
    },

    changeSubType (type) {
      if (type !== 'singleChoice' || type !== 'multipleChoice') {
        return;
      }
      this.subType = type
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
.checkedSourceBox > div {
  margin-bottom: 20px;
}
.checkedSourceBox > div > div {
  margin-bottom: 10px;
  padding-left: 15px;
}
.checkedSourceBox a {
  margin-right: 30px;
  text-decoration: underline;
  color: #666;
}
</style>
