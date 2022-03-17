
// 托盘盘点详情
<template>
  <basic-container>
    <el-form 
      label-width="100px"
      :model="inboundManageForm"
      ref="inboundManageForm"
      :rules="rules"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label-width="100px" label="单据日期:">
            <el-date-picker
              v-model="value1"
              size="small"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              @change="changeBillDate">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="业务部门:">
            <span v-if="operationState === 'details'"> {{incomeStatementForm.isEnabled | control}}</span>
            <el-select size="small" v-model="deptId" placeholder="请选择业务部门" @change="changeDept">
              <el-option
                v-for="item in deptOptions"
                :key="item.id"
                :label="item.deptName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单据编号:">
            <span v-if="operationState === 'details'">{{inboundManageForm.depotHead.number}}</span>
            <el-input
              v-else
              size="small"
              v-model="inboundManageForm.depotHead.number"
              :disabled="true"
              placeholder="自动编码">
            </el-input>
          </el-form-item>
          <el-form-item label="经手人:" prop="roleTypeId">
            <span v-if="operationState === 'details'"> {{incomeStatementForm.roleType}}</span>
            <el-input
              @click.native="employeeDialogVisible = true"
              suffix-icon="el-icon-search"
              size="small"
              v-model="levelName"
              placeholder="请选择经手人"
              @focus="focusManager"
              :disabled="disabled">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="盘点仓库:">
            <el-select size="small" v-model="depotId"  placeholder="请选择盘点仓库">
              <el-option
                v-for="item in warehouseOptions"
                :key="item.id"
                :label="item.depotName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-table 
          :data="inboundManageForm.depotItems"
          :show-summary="true"
          style="margin-bottom:20px"
        >
          <el-table-column type="index" width="50" align="center" v-if="operationState !== 'details'"> </el-table-column>
          <el-table-column width="130" align="center" v-if="operationState !== 'details'">
            <template slot-scope="scope">
              <el-button type="text" icon="el-icon-plus" circle @click="addRow"></el-button>
              <el-button type="text" icon="el-icon-delete" circle @click="delRow(scope.$index)" :disabled="scope.$index === 0"></el-button>
            </template>
          </el-table-column>
          <el-table-column label="图片" prop="pic" align="center" width="110">
            <template slot-scope="scope">
            <el-image
              v-if="scope.row.pic"
              style="width: 100px; height: 100px"
              :src="scope.row.pic"
              fit="cover">
            </el-image>
          </template>
          </el-table-column>
          <el-table-column label="产品编码" align="center" prop="productSn">
          </el-table-column>
          <el-table-column label="产品名称" align="center" width="150">
            <template slot="header" slot-scope="scope">
              <span style="color:#F56C6C">*</span>产品名称
            </template>
            <template slot-scope="scope">
              <span v-if="operationState === 'details'">{{scope.row.productName}}</span>
              <el-select size="small" v-model="scope.row.productId"  placeholder="请选择产品" v-else @change="(value,index) => changeProduct(value, scope.$index)">
                <el-option
                  v-for="item in productClassificationOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          
          <el-table-column label="产品分类" align="center" prop="productCate">
          </el-table-column>
          <el-table-column label="规格型号" align="center" prop="productType">
          </el-table-column>
          <el-table-column label="计量单位" align="center" prop="unit">
          </el-table-column>
          <el-table-column label="账面数量" align="center" prop="unit">
          </el-table-column>
          <el-table-column label="盘点数量" align="center" prop="unit">
          </el-table-column>
          <el-table-column label="盈亏数量" align="center" prop="unit">
          </el-table-column>
          <el-table-column label="成本单价" align="center" width="120" prop="unitPrice">
            <template slot-scope="scope">
              <span v-if="operationState === 'details'">{{scope.row.unitPrice}}</span>
              <el-input
                v-else
                  
                size="small"
                v-model="scope.row.unitPrice"
                @change="(value,index,number) => changUnitPrice(value,scope.$index,scope.row.operNumber)"
                placeholder="请输入">
              </el-input>
            </template>
          </el-table-column>
          <el-table-column label="盈亏成本" align="center" prop="unitTotalPrice">
          </el-table-column>
        </el-table>
      </el-row>
      <el-form-item label="备注:" prop="">
        <span v-if="operationState === 'details'">{{inboundManageForm.depotHead.remark}}</span>
        <el-input
          v-else
          size="small"
          v-model="inboundManageForm.depotHead.remark"
          placeholder="请输入备注">
        </el-input>
      </el-form-item>
      <el-form-item label="附件信息:" prop="">
        <upload-file></upload-file>
      </el-form-item>
      <el-row>
        <el-row>
          <div class="title">更多信息</div>
          <el-divider></el-divider>
        </el-row>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="制单人:">
            <span v-if="operationState === 'details'">{{inboundManageForm.depotHead.createUser}}</span>
            <el-input
              v-else
              size="small"
              v-model="inboundManageForm.depotHead.createUser"
              :disabled="true">
            </el-input>
          </el-form-item>
          <el-form-item label="审核日期:">
            <span v-if="operationState === 'details'">{{inboundManageForm.depotHead.checkTime}}</span>
            <el-input
              v-else
              size="small"
              v-model="inboundManageForm.depotHead.checkTime"
              :disabled="true">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间:">
            <span v-if="operationState === 'details'">{{inboundManageForm.depotHead.checkPerson}}</span>
            <el-input
              v-else
              size="small"
              :disabled="true"
              v-model="inboundManageForm.depotHead.checkPerson">
            </el-input>
          </el-form-item>
          
        </el-col>
        <el-col :span="8">
          <el-form-item label="审核人:">
            <span v-if="operationState === 'details'">{{inboundManageForm.depotHead.checkPerson}}</span>
            <el-input
              v-else
              size="small"
              :disabled="true"
              v-model="inboundManageForm.depotHead.checkPerson">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 操作按钮 -->
    <el-row class="button-wrapper-footer" v-if="operationState !== 'details'">
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button size="small" type="primary" @click="saveInboundManage">保存</el-button>
    </el-row>
    <!-- 选择经手人 -->
    <dialog-select 
      title="经手人"
      :employeeDialogVisible="employeeDialogVisible"
      @on-selected="onSelected"
    >
    </dialog-select>
  </basic-container>
</template>

<script>
import {
  addEditInAndOutBoundPage,
  getProductList,
  detailsInAndOutBoundPage
} from "@/api/storageManage/inAndOutBound"
import {getUserInfo} from "@/api/system/user.js"
import {getWarehouseList} from "@/api/base-data/warehouseSetup"
import {getNowFormatDate} from "@/util/util"
import { client } from "@/util/oss.js";
import { getDictionary } from "@/api/system/dictbiz";
import code from "@/mixins/code"
import dialogSelect from "@/components/dialog-select/personnel"
import uploadFile from "@/components/uploadFile"
export default {
  mixins: [code],
  components:{
    dialogSelect,
    uploadFile
  },
  data () {
    return {
      inboundManageForm:{
        codeName:"入库管理",
        depotHead:{
          type: "入库",
          files:[]
        },
        depotItems:[{}]
      },
      fileList:[],
      employeeDialogVisible:false,
      productClassificationOptions:[],
      inAndOutBoundCategoryOptions:[],
      warehouseOptions:[],
      operationState:'',
      selectAddDialogVisible:false,
      defaultProps:{
        label: "cateName",
        children: 'productCateList',
      },
      rules:{
        'depotHead.outJoinTime': [
          {required: true, message: '请选择入库日期', trigger: ['blur', 'change']}
        ],
      }
    }
  },
  created(){
    this.operationState = this.$route.query.operationState
    this.inboundManageForm.depotHead.createTime = getNowFormatDate()
    this.initCode('入库管理',this.inboundManageForm.depotHead,'number')
    this.handleResources()
    if (this.operationState !== 'add') {
      this.handleDetails()
    }
  },
  methods: {
    // 获取详情
    async handleDetails() {
      let res = await detailsInAndOutBoundPage({id:this.$route.query.row.id})
      this.inboundManageForm = res.data.data
      this.inboundManageForm.depotHead.files.forEach((item)=>{
        this.fileList.push({url:item})
      })
    },
    // 获取出入库类别
    async handleResources(){
      let res = await Promise.all([getDictionary({code:'in_type_class'}),getProductList({current:0,size:10000}),getUserInfo(),getWarehouseList()])
      this.inAndOutBoundCategoryOptions = res[0].data.data
      this.productClassificationOptions = res[1].data.data.records
      this.inboundManageForm.depotHead.createUser = res[2].data.data.realName
      this.warehouseOptions = res[3].data.data
    },
    // 新增入库类别传递
    async transmitSelectAdd(value){
      if (value === 'addSuccess') {
        let res = await getDictionary({code:'in_type_class'})
        if (res.data.success) {
          this.inAndOutBoundCategoryOptions = res.data.data
        }
      } else {
        this.selectAddDialogVisible = value
      }
    },
    // 选择经手人
    onSelected(value){
      this.employeeDialogVisible = false
    },
    // 选择产品
    changeProduct(value,index){
      let item = this.productClassificationOptions.filter((item) => {
        return item.id === value
      })
      this.inboundManageForm.depotItems[index].pic = item[0].pic
      this.inboundManageForm.depotItems[index].productId = item[0].id
      this.inboundManageForm.depotItems[index].productName = item[0].name
      this.inboundManageForm.depotItems[index].productSn = item[0].productSn
      this.inboundManageForm.depotItems[index].productCate = item[0].productCategoryName
      this.inboundManageForm.depotItems[index].productType = item[0].specificationName
      this.inboundManageForm.depotItems[index].unit = item[0].unitName
    },
    // 选择出入库类别
    changeTypeClass(value){
      let item = this.inAndOutBoundCategoryOptions.filter((item) => {
        return item.dictKey === value
      })
      this.inboundManageForm.depotHead.typeClass = item[0].dictValue
    },
    // 入库成本单价
    changUnitPrice(value,index,number){
      if (value && number) {
        this.$set(this.inboundManageForm.depotItems[index], 'unitTotalPrice', (Number(value) * Number(number)).toFixed(2))
      }
    },
    // 上传附件
    async uploadAttachment(e) {
      let res = await client.put(e.file.name, e.file)
      if (res.res && res.res.status == 200) {
        this.inboundManageForm.depotHead.files.push(res.url)
      }
    },
    // 删除附件
    handleRemove(file,fileList){
      this.inboundManageForm.depotHead.files.forEach((item,index) => {
        if(file.url === item){
          return this.inboundManageForm.depotHead.files.splice(index,1)
        }
      })
    },
    // 保存
    async saveInboundManage(){
      try {
        await this.$refs.inboundManageForm.validate()
        this.inboundManageForm.depotItems.forEach(item => {
          if (!item.productId) {
            throw('请选择产品名称')
          } else if (!item.depotId) {
            throw('请选择入库仓库')
          } else if (!item.operNumber) {
            throw('请输入数量')
          } else if (!item.unitPrice) {
            throw('请输入入库成本单价')
          }
        })
      } catch (error) {
        this.$message.error(error)
        return;
      }
      let res = await addEditInAndOutBoundPage(this.inboundManageForm)
      if (res.data.success) {
        this.$message.success('操作成功')
        this.$router.back()
      }
    },
    // 添加一行
    addRow(){
      this.inboundManageForm.depotItems.push({})
    },
    // 删除一行
    delRow(index){
      this.inboundManageForm.depotItems.splice(index,1)
    },
    // 取消
    cancel(){
      this.$router.back()
    }
  }
}
</script>
<style lang="scss" scoped>
.el-input,.el-select{
  width:240px
}
.el-table{
  .el-select{
    width:140px
  }
  .el-input{
    width:100px
  }
}
.selectAdd,.noDataSelectAdd{
  margin:5px 0 0 20px;
  font-size:14px;
  color: #606266;
  cursor: pointer
}
.noDataSelectAdd{
  margin:10px 0 10px 20px;
}
</style>