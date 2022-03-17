<template>
  <div class="pages">
    <el-row class="title-bar">
      <el-col :span="12">
        <p class="margin-right-20">采购进货-{{form.purchaseStockNum}}-{{form.purchaseCheckTime}}</p>
      </el-col>
      <el-col :span="12">
        <p>采购订单编号-{{form.purchaseOrderSn}}</p>
      </el-col>
    </el-row>
    <el-table :data="tableData" border class="margin-bottom-20">
      <el-table-column label="产品编号" prop="productSn"></el-table-column>
      <el-table-column label="产品名称" prop="productName"></el-table-column>
      <el-table-column label="规格" prop="specificationName"></el-table-column>
      <el-table-column label="计量单位" prop="sp1"></el-table-column>
      <el-table-column label="仓库" prop="depotName"></el-table-column>
      <!-- <el-table-column label="储位"></el-table-column>
      <el-table-column label="批号"></el-table-column> -->
      <el-table-column label="数量" prop="num"></el-table-column>
    </el-table>
    <el-form
      ref="form"
      :model="form"
      :inline="true"
      :rules="rules"
      label-width="80px"
      :inline-message="true"
      >
      <el-row v-if="type === 'add'" class="footer-box margin-bottom-20">
       <div v-if="type !== 'detail'">
          <el-button @click="handleBack" size="small">取消</el-button>
          <el-button type="primary" @click="submit" size="small">保存</el-button>
        </div>
         <el-button v-else type="primary" size="small" @click="handleBack">返回</el-button>
      </el-row>
    </el-form>
     <el-dialog append-to-body :visible.sync="showUser" title="选择人员">
      <user :deptId="deptId" @on-cancel="closeUser" @on-submit="submitUser"></user>
    </el-dialog>
  </div>
</template>

<script>
import uploadFile from '@/components/uploadFile'
import upload from '@/mixins/upload'
import common from '@/mixins/common'
 import { getId } from "@/api/common";
import { getUserList } from '@/api/common'
import { addOrUpdatePurchaseCheckOrder } from '@/api/purchase/purchaseInbound'
export default {
  name: 'check',
  data () {
    return {
      module : '校验',
      tableData: [],
      form: {
        purchaseStockId: '',
        purchaseStockNum: '', // 采购进货编号
        purchaseCheckTime: '', // 采购时间
        purchaseOrderSn: '',
        checkPersonId:'', //检验人id
        checkPerson:'' //检验人
      },
      type: 'add',
      userOption: [], // 检验人数据
      rules: {
        checkPersonId: [
          {required: true, message: '请选择检验人', trigger: 'change'}
        ]
      }
    }
  },
  mixins: [upload,common],
  created () {
    this.type = this.$route.query.type
    const data = this.$route.query.data
    this.form.purchaseStockId = data.id
    this.form.purchaseCheckTime = data.createTime
    if (this.type === 'add') {
      // this.getOrderSn()
      this.tableData = data.purchaseStockItemList
      this.form.purchaseStockNum = data.number
      this.form.purchaseOrderSn = data.linkNumber
      this.tableData.forEach(item => {
        item.purchaseStockItemId = item.id
        delete item.id
      })
    } else {
      this.form.purchaseStockNum = data.linkNumber
      this.form.purchaseOrderSn = data.purchaseOrderSn
      this.tableData = data.purchaseCheckItemList
      this.form.num = data.number
      this.form.checkPerson = data.examinePerson
      this.form.note = data.note
       if (data.file.length > 0) {
        this.file = data.file.split(',')
      }
    }
  },
  mounted () {
    this.getUserOption()
  },
  methods: {
    async getUserOption() { // 获取检验人option
      const data = await getUserList()
      this.userOption =  data.data.data.records
    },
    selectCheckPerson (val) {
      this.userOption.forEach(item => {
        if (item.id === val) {
          this.form.checkPerson = item.name
        }
      })
    },
    async beforeAvatarUpload (file) {
      let OSS = require("ali-oss");
      let client = new OSS({
        region: "oss-cn-shenzhen",
        bucket: "bipinyun",
        accessKeyId: "LTAI4FyoJErCzmbxR1549QqR",
        accessKeySecret: "CE5T59WAbnM8xD2D3teGpWf94cYXNZ"
      });
      let result = await client.put(file.name, file);
      this.form.file.push(result.url);
      this.fileList.push({ name: result.name, url: file.url })
      return false;
    },
    async getOrderSn () { // 获取单据编号
      const res = await getId({codeName: '进料检验'})
      this.form.num = res.data.data
    },
    async submit () {
      const params = {
        data: {
          ...this.form,
          purchaseCheckItemList: this.tableData,
          file: this.file.join(','),
        },
        codeName: '进料检验'
      }
      const res = await addOrUpdatePurchaseCheckOrder(params)
      this.$message.success({
        message: '操作成功！'
      })
      this.$router.push({
        path: '/purchaseManage/purchaseInbound'
      })
    },
    handleBack () {
       this.$router.push({
        path: '/purchaseManage/purchaseInbound'
      })
    },
    changeRefundNum (val, index) { // 改变验退数量
      this.tableData[index].checkNum = this.tableData[index].num - this.tableData[index].refundNum
    },
    changeCheckNum (val, index) {
      this.tableData[index].refundNum = this.tableData[index].num - this.tableData[index].checkNum
    }
  }
}
</script>

<style lang="scss" scoped>
.title-bar {
  font-size: 20px;
  // height: 30px;
  margin-bottom: 20px;
  border-bottom: 1px solid#cac7c7;
  p {
    display: inline-block;
    margin-top: 0;
    margin-bottom: 0;
  }
}
</style>
