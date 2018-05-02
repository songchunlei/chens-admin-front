<template>
    <div id="shareEdit" class="app-container simpleForm">
        <div>
            <el-form class="form-container" label-width="80px" label-position="right" :model="shareForm" :rules="rules" ref="shareForm">
                <el-form-item label="分享类型" prop="type">
                    <el-select v-model="shareForm.shareType" placeholder="选择分享类型" @change="handleSelectType">
                    <el-option v-for="item in types" :key="item.id" :label="item.name" :value="item.type">
                    </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="有效期" prop="type">
                    <el-select v-model="shareFormVo.invalidType" placeholder="选择有效期" @change="handleInvalidType">
                    <el-option v-for="item in invalidTypes" :key="item.id" :label="item.name" :value="item.type">
                    </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item v-if="shareFormVo.invalidType === 'DATE'"  label="失效时间" prop="invalidTime">
                    <el-date-picker
                    v-model="shareForm.invalidTime"
                    type="datetime"
                    placeholder="选择日期时间"
                    align="right"
                    :picker-options="pickerInvalidTimeOptions">
                    </el-date-picker>
                </el-form-item>

                <el-form-item v-if="shareFormVo.descUrl!='' && shareFormVo.descUrl!=null" label="分享地址" prop="descUrl">
                    <el-input type="textarea" v-model="shareFormVo.descUrl"></el-input>
                </el-form-item>

                <el-form-item v-if="shareForm.id!='' && shareForm.id!=null" label="二维码" prop="url">
                    <img :src="shareForm.url"/>
                </el-form-item>

                <el-form-item>
                    <el-button @click="handleCancel">关闭</el-button>
                    <el-button v-if="shareForm.id!='' && shareForm.id!=null" @click="handleDelete">删除分享</el-button>
                    <el-button type="primary" @click="submitForm('shareForm')">生成分享链接</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import api from '@/api';
import Rule from './shareRules'

export default {
  name: 'shareEdit-dialog',
  data () {
    return {
      rules: Rule.rules,
      shareForm: {
        id: '',//分享id
        shareType: '',//分享类型
        sharePwd: '', //分享密码
        invalidTime: '',//分享过期时间
        url: '',//二维码图片地址
        dataId:''//绑定数据id
      },
      shareFormVo: {
        descUrl:'',//分享描述，页面字段
        invalidType: '',//有效期类型，页面字段
      },
      types: [
        { name: '密码分享', id: 'PWD', type: 'PWD' },
        { name: '公开', id: 'PUBLIC', type: 'PUBLIC' }
      ],
      invalidTypes: [
        { name: '永久有效', id: 'ALWAYS', type: 'ALWAYS' },
        { name: '自定义时间', id: 'DATE', type: 'DATE' }
      ],
      pickerInvalidTimeOptions: {
          shortcuts: [{
            text: '一天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }, {
            text: '两周',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 14);
              picker.$emit('pick', date);
            }
          }]
        }
    }
  },
  computed: {
   
  },
  components: {
    
  },
  props: {
    dataId: {
      type: String
    },
    source:{
      type: Object 
    }
  },
  created () {
    this.initData();
  },
  mounted () {

  },
  methods: {
    // 初始化数据
    initData () {
    
      if (!this.dataId) {
          return;
      }

      this.shareForm.dataId = this.dataId;

      let funName = this.source['getShare'];
      api[funName](this.dataId).then((res) => {
        let json = res.data;
        if (json.code == 1) {
          this.shareForm = json.data;
          console.log(this.shareForm)
          this.getUrlDesc();

        }
        
      }).catch((error) => {
          this.$message.error(error || '服务异常。');
      })
    },

    // 类型切换
    handleSelectType (type) {
      this.shareForm.shareType = type;
      if("PWD" === type)
      {
        if(this.shareForm.sharePwd==null || this.shareForm.sharePwd=='')
        {
          //密码为空，重新生成
          this.shareForm.sharePwd = this.genPwd(4);
        }
      }
      else if ("PUBLIC" == type) 
      {
        this.shareForm.sharePwd = '';
      }
      this.getUrlDesc()
    },

    handleInvalidType(type){
      this.shareFormVo.invalidType = type;
    },

    genPwd(length){
        const s = "023456789abcdefghjklmnopqrstuvwxyz"
        let pwd="";
        for(var i=0;i<length;i++){
            let b=Math.random()*34;
            let c=Math.floor(b);
            pwd=pwd+s[c];
        }
        return pwd;
    },

    // 生成分享信息
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let funName = this.source['createShare'];
          if (this.shareForm.id) {
            funName = this.source['editShare'];
          }
          api[funName](this.shareForm).then((res) => {
            const json = res.data;
            if (json.code != 1) {
              this.$message.error(json.msg || '生成分享链接失败。');
              return;
            }
            this.$message.success(json.msg || '生成分享链接成功。');
            this.shareForm = json.data;
            this.getUrlDesc();
          }).catch((error) => {
            this.$message.error(error);
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
      
      
    },
    getUrlDesc(){
      let type = this.shareForm.shareType
      if(this.shareForm.id != '' && this.shareForm.id != null)
      {
        if("PWD" === type)
        {
          this.shareFormVo.descUrl = "当前分享地址为： http://127.0.0.1/exam-wms/shareController/share?id="+this.shareForm.id+"，密码为:"+this.shareForm.sharePwd;
        }
        else if("PUBLIC" === type)
        {
          this.shareFormVo.descUrl = "当前分享地址为： http://127.0.0.1/exam-wms/shareController/share?id="+this.shareForm.id+"，公开分享";
        }
        if(this.shareForm.invalidTime!='' && this.shareForm.invalidTime != null)
        {
           this.shareFormVo.invalidType = "DATE";
        }
        else
        {
          this.shareFormVo.invalidType = "ALWAYS";
        }
      }
      
    },
    handleCancel () {
      this.$emit('completeShare');
    },
    handleDelete(id){
      /*
        api[funName](this.shareForm).then((res) => {
            const json = res.data;
            if (json.code != 1) {
              this.$message.error(json.msg || '提交角色信息失败。');
              return;
            }
            this.$message.success(json.msg || '提交成功。');
            this.$router.push({ path: '/roleManager/roleList' });
          }) 
          */
    }

  }
}
</script>