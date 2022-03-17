// 客户信息新增编辑
<template>
  <basic-container>
    <el-row class="operation-function" style="padding-left:8px">
      <el-button size="small" @click="cancel">
        列表
      </el-button>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-row>
        <div class="title">基本信息</div>
        <el-divider class="detail-divider"></el-divider>
      </el-row>
      <el-form
        label-width="150px"
        :model="customerInformationForm"
        ref="customerInformationForm"
        :rules="rules"
        :inline-message="true"
        class="detail-form"
      >
        <!-- 基本信息 -->
        <el-row>
          <el-col :span="12">
            <el-form-item required label="客户名称:" prop="customerFullName">
              <span v-if="operationState === 'details'"> {{customerInformationForm.customerFullName}}</span>
              <el-input
                v-else
                size="small"
                placeholder="请输入"
                v-model="customerInformationForm.customerFullName">
              </el-input>
            </el-form-item>
            <el-form-item label="统一社会信用代码:">
              <span v-if="operationState === 'details'"> {{customerInformationForm.socialCreditCode}}</span>
              <el-input
                v-else
                size="small"
                placeholder="请输入"
                v-model="customerInformationForm.socialCreditCode">
              </el-input>
            </el-form-item>
            <el-form-item label="注册资本:">
              <span v-if="operationState === 'details'"> {{customerInformationForm.registeredCapital}}</span>
              <el-input
                v-else
                size="small"
                placeholder="请输入"
                v-model="customerInformationForm.registeredCapital">
              </el-input>
            </el-form-item>
            <el-form-item label="经营期限:">
              <span v-if="operationState === 'details'"> {{customerInformationForm.businessStartTerm}}</span>
              <el-date-picker
                v-model="businessStartTerm"
                size="small"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="changeBillDate">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="经营地址:">
              <span v-if="operationState === 'details'"> {{customerInformationForm.businessAddress}}</span>
              <el-input
                size="small"
                placeholder="请输入"
                v-model="customerInformationForm.businessAddress">
              </el-input>
            </el-form-item>

          </el-col>
          <el-col :span="12">
            <el-form-item label="类型:">
              <span v-if="operationState === 'details'"> {{customerInformationForm.type}}</span>
              <el-input
                v-else
                size="small"
                placeholder="请输入"
                v-model="customerInformationForm.type">
              </el-input>
            </el-form-item>
            <el-form-item label="法定代表人:">
              <span v-if="operationState === 'details'"> {{customerInformationForm.legalRepresentative}}</span>
              <el-input
                v-else
                size="small"
                placeholder="请输入"
                v-model="customerInformationForm.legalRepresentative">
              </el-input>
            </el-form-item>
            <el-form-item  label="成立日期:">
              <span v-if="operationState === 'details'"> {{customerInformationForm.setUpDate}}</span>
              <el-input
                v-else
                size="small"
                placeholder="请输入"
                v-model="customerInformationForm.setUpDate">
              </el-input>
            </el-form-item>
            <el-form-item label="经营范围:">
              <span v-if="operationState === 'details'"> {{customerInformationForm.scopeBusiness}}</span>
              <el-input
                v-else
                size="small"
                placeholder="请输入"
                v-model="customerInformationForm.scopeBusiness">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <div class="title">分类/业务员</div>
          <el-divider class="detail-divider"></el-divider>
        </el-row>
        <!-- 分类/业务员 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="客户分类:">
              <span v-if="operationState === 'details'"> {{customerInformationForm.customerClassification}}</span>
              <el-select v-else size="small" v-model="customerInformationForm.id" placeholder="请选择" @change="changeDept">
                <el-option
                  v-for="item in deptOptions"
                  :key="item.id"
                  :label="item.deptName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="客户区域:">
              <span v-if="operationState === 'details'"> {{customerInformationForm.clientArea}}</span>
              <el-select v-else size="small" v-model="customerInformationForm.clientArea" placeholder="请选择" @change="changeDept">
                <el-option
                  v-for="item in deptOptions"
                  :key="item.id"
                  :label="item.deptName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="行业分类:">
              <span v-if="operationState === 'details'"> {{customerInformationForm.industryClassification}}</span>
              <el-select v-else size="small" v-model="customerInformationForm.industryClassification" placeholder="请选择" @change="changeDept">
                <el-option
                  v-for="item in deptOptions"
                  :key="item.id"
                  :label="item.deptName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="销售员:">
              <span v-if="operationState === 'details'"> {{customerInformationForm.theSalesman}}</span>
              <el-input
                v-else
                size="small"
                placeholder="请输入"
                v-model="customerInformationForm.theSalesman">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <div class="title">发票信息</div>
          <el-divider class="detail-divider"></el-divider>
        </el-row>
        <!-- 发票信息 -->
        <el-row>
          <el-col :span="12">
            <el-form-item  label="公司名称:" >
              <span v-if="operationState === 'details'"> {{customerInformationForm.crmCustomerInvoiceInfo.companyName}}</span>
              <el-input
                v-else
                size="small"
                placeholder="请输入"
                v-model="customerInformationForm.crmCustomerInvoiceInfo.companyName">
              </el-input>
            </el-form-item>
            <el-form-item  label="纳税人识别号:" >
              <span v-if="operationState === 'details'"> {{customerInformationForm.crmCustomerInvoiceInfo.ein}}</span>
              <el-input
                v-else
                size="small"
                placeholder="请输入"
                v-model="customerInformationForm.crmCustomerInvoiceInfo.ein">
              </el-input>
            </el-form-item>
            <el-form-item  label="开户银行:" >
              <span v-if="operationState === 'details'"> {{customerInformationForm.crmCustomerInvoiceInfo.bank}}</span>
              <el-input
                v-else
                size="small"
                placeholder="请输入"
                v-model="customerInformationForm.crmCustomerInvoiceInfo.bank">
              </el-input>
            </el-form-item>

          </el-col>
          <el-col :span="12">
            <el-form-item  label="公司地址:">
              <span v-if="operationState === 'details'"> {{customerInformationForm.crmCustomerInvoiceInfo.companyAddress}}</span>
              <el-input
                v-else
                size="small"
                placeholder="请输入"
                v-model="customerInformationForm.companyAddress">
              </el-input>
            </el-form-item>
            <el-form-item  label="公司电话:" >
              <span v-if="operationState === 'details'"> {{customerInformationForm.crmCustomerInvoiceInfo.companyPhone}}</span>
              <el-input
                v-else
                size="small"
                placeholder="请输入"
                v-model="customerInformationForm.crmCustomerInvoiceInfo.companyPhone">
              </el-input>
            </el-form-item>
            <el-form-item  label="开户账号:" >
              <span v-if="operationState === 'details'"> {{customerInformationForm.crmCustomerInvoiceInfo.bankAccount}}</span>
              <el-input
                v-else
                size="small"
                placeholder="请输入"
                v-model="customerInformationForm.crmCustomerInvoiceInfo.bankAccount">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <div class="title">交易信息</div>
          <el-divider class="detail-divider"></el-divider>
        </el-row>
        <!-- 交易信息 -->
        <el-row>
          <el-col :span="12">
            <el-form-item required label="结算方式:" prop="personnelFileEntry.methodOfPayment">
              <span v-if="operationState === 'details'"> {{customerInformationForm.crmCustomerTradingInformation.methodOfPayment}}</span>
              <el-select v-else size="small" v-model="customerInformationForm.crmCustomerTradingInformation.methodOfPayment" placeholder="请选择" @change="changeDept">
                <el-option
                  v-for="item in deptOptions"
                  :key="item.id"
                  :label="item.deptName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="付款方式:">
              <span v-if="operationState === 'details'"> {{customerInformationForm.crmCustomerTradingInformation.termsOfPayment}}</span>
              <el-select v-else size="small" v-model="customerInformationForm.crmCustomerTradingInformation.termsOfPayment" placeholder="请选择" @change="changeDept">
                <el-option
                  v-for="item in deptOptions"
                  :key="item.id"
                  :label="item.deptName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发票类型:">
              <span v-if="operationState === 'details'"> {{customerInformationForm.crmCustomerTradingInformation.invoiceType}}</span>
              <el-select v-else size="small" v-model="customerInformationForm.crmCustomerTradingInformation.invoiceType	" placeholder="请选择" @change="changeDept">
                <el-option
                  v-for="item in deptOptions"
                  :key="item.id"
                  :label="item.deptName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item required label="折扣率:" prop="crmCustomerTradingInformation.discount">
              <span v-if="operationState === 'details'"> {{customerInformationForm.crmCustomerTradingInformation.discount}}</span>
              <el-input
                v-else
                size="small"
                placeholder="请输入"
                v-model="customerInformationForm.crmCustomerTradingInformation.discount">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <el-row class="button-wrapper-footer">
      <el-button size="small" @click="cancel">取 消</el-button>
      <el-button size="small" type="primary" @click="save">保 存</el-button>
    </el-row>
  </basic-container>
</template>

<script>
import { addCustomer} from "@/api/customer/index";
import {addEmployeeFile, getDutiesList, detailsEmployeeFile, editEmployeeFile, getSuperior} from "@/api/humanResources/employeeFile"
import {getDepartmentList} from '@/api/humanResources/department'
import uploadImg from "@/components/upload/uploadImg"

export default {
  components:{
    uploadImg
  },
  data() {
    return {
      customerInformationForm:{
        crmCustomerInvoiceInfo:{},
        crmCustomerTradingInformation:{},
      },
      sexOptions:[{
        value:0,
        label:'男'
      },{
        value:1,
        label:'女'
      }],
      marriageOptions:[{
        value:"0",
        label:'未婚'
      },{
        value:"1",
        label:'已婚'
      },{
        value:"2",
        label:'离异'
      },{
        value:"3",
        label:'不婚族'
      },{
        value:"4",
        label:'丁克'
      }],
      contactsOptions:[{
        value:0,
        label:'父子'
      },{
        value:1,
        label:'母子'
      },{
        value:2,
        label:'兄长'
      },{
        value:3,
        label:'情侣'
      },{
        value:4,
        label:'朋友'
      }],
      politicsOptions:[{
        value:0,
        label:'中共党员'
      },{
        value:1,
        label:'普通群众'
      },{
        value:2,
        label:'预备党员'
      }],
      statusOptions:[{
        value:4,
        label:'正式'
      },{
        value:5,
        label:'试用'
      },{
        value:2,
        label:'兼职'
      }],
      educationOptions:[{
        value:0,
        label:'本科'
      },{
        value:1,
        label:'专科'
      },{
        value:1,
        label:'研究生'
      },{
        value:1,
        label:'博士'
      },{
        value:1,
        label:'专科以下'
      }],
      degreeOptions:[{
        value:0,
        label:'学士学位'
      },{
        value:1,
        label:'硕士学位'
      },{
        value:1,
        label:'博士学位'
      }],
      postNameOptions:[],
      deptOptions:[],
      lederOptions:[],
      operationState:'',
      baseAddressId:'',
      securityAddressId:'',
      rules:{
        "customerFullName": [
          { required: true, message: "请输入客户名称", trigger: ['blur', 'change'] }
        ],
        "crmCustomerTradingInformation.discount": [
          { required: true, message: "请输入折扣率", trigger: ['blur', 'change'] }
        ],
        "personnelFileBase.postId": [
          { required: true, message: "请选择职务", trigger: ['blur', 'change'] }
        ],
        "personnelFileBase.deptId": [
          { required: true, message: "请选择部门", trigger: ['blur', 'change'] }
        ],
        "personnelFileBase.phone": [
          { required: true, message: "请输入手机号", trigger: ['blur', 'change'] }
        ],
        "personnelFileBase.idNumber": [
          { required: true, message: "请输入身份证", trigger: ['blur', 'change'] }
        ],
        "personnelFileEntry.joinDate": [
          { required: true, message: "请选择入职时间", trigger: ['blur', 'change'] }
        ],
      }
    };
  },
  mounted(){
    // let res = getProvinceData()
    // console.log(res)
    // this.initDeptDuties()
    // this.operationState = this.$route.query.operationState
    // if (this.operationState !== 'add') {
    //   this.initEmployeeFile()
    // }
  },
  methods:{
    // 保存
    async save(){
      // try {
      //   await this.$refs.customerInformationForm.validate();
      // } catch (error) {
      //   return;
      // }
      let res = await addCustomer(this.customerInformationForm)
      console.log(res)
      if(res.data.success){
          this.$message.success('操作成功')
          this.$router.back()
        }
    },
    // 详情
    async initEmployeeFile(){
      let res = await detailsEmployeeFile({id:this.$route.query.row.id})
      this.customerInformationForm = res.data.data
      if (this.customerInformationForm.personnelFileBase.addressId) {
        this.baseAddressId = this.customerInformationForm.personnelFileBase.addressId.split(',')
      }
      if (this.customerInformationForm.personnelFileSocialSecurity.addressId) {
        this.securityAddressId = this.customerInformationForm.personnelFileSocialSecurity.addressId.split(',')
      }

    },
    // 选择单据日期
    changeBillDate(value){
      this.customerInformationForm.businessStartTerm = value[0]
      this.customerInformationForm.businessEndTerm = value[1]
    },
    // 选择地址
    handleChange(value){
      this.customerInformationForm.personnelFileBase.addressId = value.toString()
      this.customerInformationForm.personnelFileBase.address = this.$refs['personnelFileBaseAddress'].getCheckedNodes()[0].pathLabels.toString()
    },
    // 社保选择地址
    handleChangePersonnelFileSocialSecurity(value){
      this.customerInformationForm.personnelFileSocialSecurity.addressId = value.toString()
      this.customerInformationForm.personnelFileSocialSecurity.address = this.$refs['personnelFileSocialSecurityAddress'].getCheckedNodes()[0].pathLabels.toString()
    },
    // 选择部门
    changeDept(value){
      let item = this.deptOptions.filter((item) => {
        return item.id === value
      })
      this.customerInformationForm.personnelFileBase.deptName = item[0].deptName
    },
    // 选择岗位
    changePost(value){
      let item = this.postNameOptions.filter((item) => {
        return item.id === value
      })
      this.customerInformationForm.personnelFileBase.postName = item[0].postName
    },
    // 选择上级
    changeLeder(value){
      let item = this.lederOptions.filter((item) => {
        return item.id === value
      })
      this.customerInformationForm.personnelFileEntry.lederName = item[0].realName
    },
    // 上传图片url
    handleUploadImgUrl(value){
      this.customerInformationForm.personnelFileBase.pic = value

    },
    //获取部门/职务/上级
    async initDeptDuties(){
      let res = await Promise.all([getDepartmentList(),getDutiesList({current:1,size:10000}),getSuperior({current:1,size:10000})])
      this.deptOptions = res[0].data.data
      this.postNameOptions = res[1].data.data.records
      this.lederOptions = res[2].data.data.records
    },
    // 提交
    async saveEmployeeFile(){
      try {
        await this.$refs.customerInformationForm.validate();
      } catch (error) {
        return;
      }
      if (this.operationState === 'add') {
        let res = await addEmployeeFile(this.customerInformationForm)
        if(res.data.success){
          this.$message.success('操作成功')
          this.$router.back()
        }
      } else {
        let res = await editEmployeeFile(this.customerInformationForm)
        if(res.data.success){
          this.$message.success('操作成功')
          this.$router.back()
        }
      }

    },
    // 取消
    cancel(){
      this.$router.back()
    }
  },
  filters: {
    maritalStatus: function(value) {
      if (value === "0") {
        value = "未婚";
      } else if (value === "1") {
        value = "已婚";
      } else if (value === "2") {
        value = "离异";
      } else if (value === "3") {
        value = "不婚族";
      } else if (value === "4") {
        value = "丁克";
      }
      return value;
    },
    status: function(value) {
      if (value === 4) {
        value = "正式";
      } else if (value === 5) {
        value = "试用";
      } else if (value === 2) {
        value = "兼职";
      }
      return value;
    }
  },
};
</script>

<style lang="scss" scoped>
/deep/ .el-input,.el-select,.el-cascader,.el-date-editor{
  width:360px;
}
.el-form-item{
  margin-bottom:2px
}
</style>

