// 编码详情
<template>
  <basic-container>
    <el-form :inline="true" ref="form" :model="form" :rules="rules" label-width="150px" class="margin-top-20">
      <el-row>
        <el-col :span="12">
          <el-form-item label="对象编码：" prop="codeKey">
            <span v-if="type === 'detail'">{{form.codeKey}}</span>
            <el-input v-else v-model="form.codeKey" :disabled="type === 'edit'"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="对象名称：" prop="codeName">
            <span v-if="type === 'detail'">{{form.codeName}}</span>
            <el-input v-else v-model="form.codeName" :disabled="type === 'edit'"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="编码方式：">
            <span v-if="type === 'detail'">{{form.encodingStyle}}</span>
            <el-input v-else v-model="form.encodingStyle" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="前缀：" prop="prefix">
            <span v-if="type === 'detail'">{{form.prefix}}</span>
            <el-input v-else v-model="form.prefix"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="格式：">
            <span v-if="type === 'detail'">{{encodeFormat}}</span>
            <el-input v-else v-model="encodeFormat" disabled></el-input>
            <!-- <el-select v-model="form.codeFormat" @change="changeFormat">
              <el-option v-for="item of encodeFormat" :key="item.code" :value="item.code" :label="item.value"></el-option>
            </el-select> -->
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="流水号长度：">
            <span v-if="type === 'detail'">{{form.combinationLength}}</span>
            <el-input v-else v-model="form.combinationLength" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row>
        <el-col :span="8">
          <el-form-item label="第二前缀">
            <el-input v-model="form.codeDetail[1].segmentVal"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="格式">
            <el-select v-model="form.codeDetail[1].formatId" @change="(val) => changeFormat(1, val)">
              <el-option v-for="item of encodeFormat" :key="item.dictKey" :value="item.dictKey" :label="item.dictValue"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="长度">
            <el-input v-model="form.codeDetail[1].length"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
       <el-row>
        <el-col :span="8">
          <el-form-item label="第三前缀">
            <el-input v-model="form.codeDetail[2].segmentVal"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="格式">
            <el-select v-model="form.codeDetail[2].formatId" @change="(val) => changeFormat(2, val)">
              <el-option v-for="item of encodeFormat" :key="item.dictKey" :value="item.dictKey" :label="item.dictValue"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="长度">
            <el-input v-model="form.codeDetail[2].length"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
       <el-row>
        <el-col :span="8">
          <el-form-item label="流水号依据" prop="combinationId">
            <el-select v-model="form.combinationId">
              <el-option v-for="item of combination" :key="item.dictKey" :value="item.dictKey" :label="item.dictValue"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="流水号长度">
            <el-input v-model="form.combinationLength"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="第一后缀">
            <el-input v-model="form.codeDetail[3].segmentVal"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="格式">
             <el-select v-model="form.codeDetail[3].formatId" @change="(val) => changeFormat(3, val)">
              <el-option v-for="item of encodeFormat" :key="item.dictKey" :value="item.dictKey" :label="item.dictValue"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="长度">
            <el-input  v-model="form.codeDetail[3].length"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
       <el-row>
        <el-col :span="8">
          <el-form-item label="第二后缀">
            <el-input v-model="form.codeDetail[4].segmentVal"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="格式" @change="(val) => changeFormat(4, val)">
            <el-select v-model="form.codeDetail[4].formatId">
              <el-option v-for="item of encodeFormat" :key="item.dictKey" :value="item.dictKey" :label="item.dictValue"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="长度">
            <el-input <el-input  v-model="form.codeDetail[4].length"></el-input></el-input>
          </el-form-item>
        </el-col>
      </el-row> -->
       <el-row>
         <el-form-item label="单据号预览：">
          <span v-if="type === 'detail'">{{preview}}</span>
          <div v-else class="search-box">
            <el-input v-model="preview"></el-input>
            <i class="el-icon-search padding-right-10 cursor-style" @click="handlePreview"></i>
          </div>
         </el-form-item>
      </el-row>
      <el-row class="footer-box margin-bottom-20" v-if="type !== 'detail'">
        <el-button type="primary" @click="handleSubmit('form')" size="small">保存</el-button>
      </el-row>
    </el-form>
  </basic-container>
</template>

<script>
import { formatter } from "@/util/util";
import { getDictionary } from '@/api/common'
import { submit, getDetail, update,  getEncodePreview, getFormatList} from "@/api/base/encode";
export default { 
  name: 'encodeDetail',
  props: {
    type: {
      type: 'String',
      default: 'detail'
    },
    codeId: {
      type: 'String',
      default: ''
    }
  },
  data () {
    return {
      form:  {
        encodingStyle: '自动编码',
        encodeFormat: 'yyyyMMdd',
        combinationLength: 3,
        codeKey: '',
        codeName: '',
        prefix: ''
      },
      encodeStyleList: [], // 编码方式数据
      encodeFormat: '', // 编码合适数据
      combination: [], // 流水号依据
      preview: '', // 预览
      rules: {
        codeKey: [{required: true, message: '请输入对象编码', trigger: 'blur'}],
        codeName: [{required: true, message: '请输入对象名称', trigger: 'blur'}],
        prefix: [{ required: true, message: '请输入前缀', trigger: 'change'}],
        // combinationId: [{required: true, message: '请选择流水号依据', trigger: 'change'}]
      }
    }
  },
  created () {
    console.log(this.$route.query.id)
    const date = new Date()
    this.encodeFormat =  `年月日（${formatter.date(date, "yyyyMMdd")}）`
    if (this.type === 'edit') {
      this.getDetailData(this.codeId)
    } else if (this.type === 'detail') {
      // debugger
      this.getDetailData(this.$route.query.id)
    }
  },
  mounted () {
    this.getDictionaryList()
    // this.getEncodeFormat()
    this.getCombination()
  },
  methods: {
    async getDictionaryList () { // 获取字典
      const encodeWay = await getDictionary({code: 'mes_encoding_style'})
      this.encodeStyleList = encodeWay.data.data
    },
    // async getEncodeFormat () { // 获取类型
    //   const res = await getFormatList()
    //   this.encodeFormat = res.data.data
    // },
    async getCombination () {
      const encodeWay = await getDictionary({code: 'mes_encoding_combination'})
      this.combination = encodeWay.data.data
    },
    async handleSubmit (formName) { // 提交
      await this.$refs[formName].validate((valid) => {
        if (valid) {
          let submitApi = ''
          let params = {}
          if (this.type === 'add') {
            submitApi = submit
            params = this.form
          } else {
            submitApi = update
            params = {
              codeId: this.form.id,
              enCode: this.form
            }
          }
          const data = submitApi(params)
          this.$message.success({
            message: '操作成功'
          })
          this.$router.push({
            path: '/base/encodedManage'
          })
        } else {
          return false
        }
      })
    },
    changeFormat (val) { // 选择格式
      this.encodeFormat.forEach(item => {
        if (item.code === val) {
        }
      })
    },
    async getDetailData (id) { // 获取
      const res = await getDetail(id)
      this.form = res.data.data
      this.preview = res.data.data.codePreview
    },
    async handlePreview () {
      const res = await getEncodePreview(this.form)
      this.preview = res.data.data
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .search-box {
  // width: 240px;
  border: 1px solid #DCDFE6;
  .el-input {
    // width: 216px;
  }
  .el-input__inner {
    border: none
  }
  .el-form-item__content {
    line-height: 32px !important;
  }
}
/deep/ .el-form-item__content {
  line-height: 32px !important;
}
/deep/ .el-input,.el-select,.el-cascader,.el-date-editor{
  width:360px;
}
.el-form-item{
  margin-bottom:2px
}
</style>