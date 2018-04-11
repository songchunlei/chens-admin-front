<template>
  <div class="resourceList">
    <el-table :data="resourceData" v-loading.body="listLoading" element-loading-text="拼命加载中" bolder fit highlight-current-row>
      <el-table-column align="center" label="选择框" width="65">
        <template slot-scope="scope">
          <el-checkbox></el-checkbox>
        </template>
      </el-table-column>
      
      <el-table-column label="文件名">
        <template slot-scope="scope">
          <file-tag :item="scope.row.name" @resetFolder="getSourceFolder(scope.row.id)"></file-tag>
        </template>
      </el-table-column>
      
      <el-table-column align="center" label="更新日期" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.updateTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="335" align="center">
        <template slot-scope="scope">
          <!-- 
          <perm-btn :item="scope.row" :code="$route.meta.code" @handlerAllot="handlerAllot">
            <el-button slot="resetPwd" size="mini" type="danger" @click="restPwd(scope.row)">{{$t('table.restPwd')}}</el-button>
          </perm-btn>
          -->

        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import api from '@/api'
import fileTag from './fileTag'
import { praseTime } from '@/filters'

export default {
  data () {
    return {
      listLoading: false,
      currentFold: {},
      resourceData: [], // 根资源数据
      sourceId: 'b33493fc4c7f4537b3079c6cf25daf66', //'-1', // 根资源id
    }
  },
  props: {
  },
  components: { fileTag },
  created () {
    this.initData();
  },
  methods: {
    initData () {
      debugger;
      this.getSourceFolder(this.sourceId);
    },
    getSourceFolder (id) {
      api.getSourceFolder(id).then((res) => {
        const json = res.data;
        if (json.code === 1) {
          this.currentFold = json.data;
          this.resourceData = json.data.children || [];
        }
      }).catch((error) => {
        this.$message.error(error);  
      })
    },
    resetFolder (data) {
      this.data = data;  
    }
  }
}
</script>