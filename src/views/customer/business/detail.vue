//商机管理详情
<template>
  <basic-container>
    <el-row class="operation-function" style="padding-left:8px">
      <el-button size="small" @click="cancel">
        列表
      </el-button>
    </el-row>
    <el-divider></el-divider>
    <el-row>
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
            <el-form-item required label="商机名称:" prop="customerInformationForm.personnelFileBase.name">
              <span v-if="operationState === 'details'"> {{customerInformationForm.personnelFileBase.name}}</span>
              <el-input
                v-else
                size="small"
                placeholder="请输入"
                v-model="customerInformationForm.customerFullName">
              </el-input>
            </el-form-item>
            <el-form-item label="联系人:">
              <span v-if="operationState === 'details'"> {{customerInformationForm.personnelFileBase.censusAddress}}</span>
              <el-input
                v-else
                size="small"
                placeholder="请输入"
                v-model="customerInformationForm.personnelFileBase.name">
              </el-input>
            </el-form-item>
            <el-form-item required label="商机阶段:" prop="customerInformationForm.personnelFileBase.name">
              <span v-if="operationState === 'details'"> {{customerInformationForm.personnelFileBase.name}}</span>
              <el-input
                v-else
                size="small"
                placeholder="请输入"
                v-model="customerInformationForm.customerFullName">
              </el-input>
            </el-form-item>
            <el-form-item label="预计签单金额:">
              <span v-if="operationState === 'details'"> {{customerInformationForm.personnelFileBase.censusAddress}}</span>
              <el-input
                v-else
                size="small"
                placeholder="请输入"
                v-model="customerInformationForm.personnelFileBase.name">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户名称:">
              <span v-if="operationState === 'details'"> {{customerInformationForm.personnelFileBase.jobNumber}}</span>
              <el-switch
                v-model="value"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
            <el-form-item label="商机类型:">
              <span v-if="operationState === 'details'"> {{customerInformationForm.personnelFileBase.address}}</span>
              <el-select v-else size="small" v-model="customerInformationForm.personnelFileBase.deptId" placeholder="请选择" @change="changeDept">
                <el-option
                  v-for="item in deptOptions"
                  :key="item.id"
                  :label="item.deptName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="预计销售金额:">
              <span v-if="operationState === 'details'"> {{customerInformationForm.personnelFileBase.jobNumber}}</span>
              <el-switch
                v-model="value"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
            <el-form-item label="关联产品:">
              <span v-if="operationState === 'details'"> {{customerInformationForm.personnelFileBase.address}}</span>
              <el-select v-else size="small" v-model="customerInformationForm.personnelFileBase.deptId" placeholder="请选择" @change="changeDept">
                <el-option
                  v-for="item in deptOptions"
                  :key="item.id"
                  :label="item.deptName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <el-row class="button-wrapper-footer" v-if="operationState !== 'details'">
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button size="small" type="primary" @click="save">保存</el-button>
    </el-row>
    <select-add 
      label="结算方式"
      code="settlement_method"
      :selectAddDialogVisible="selectAddDialogVisible" 
      @transmitSelectAdd="transmitSelectAdd">
    </select-add>
  </basic-container>
</template>

<script>
import {addEmployeeFile, getDutiesList, detailsEmployeeFile, editEmployeeFile, getSuperior} from "@/api/humanResources/employeeFile"
import {getDepartmentList} from '@/api/humanResources/department'
import uploadImg from "@/components/upload/uploadImg"
import {addCustomer} from "@/api/customer/index";
import selectAdd from "@/components/select-add/index"
import { getDictionary } from "@/api/system/dictbiz";
export default {
  components:{
    uploadImg,
    selectAdd
  },
  data() {
    return {
      customerInformationForm:{
        personnelFileBase:{
          sex:'男',
          pic:'',
        },
        personnelFileEntry:{
          status:4
        },
        personnelFileEducation:{},
        personnelFileSocialSecurity:{},
        personnelFileOther:{},
      },
      selectAddDialogVisible:false,
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
      settlementMethodOptions:[],
      customerClassification:[],
      lederOptions:[],
      operationState:'',
      baseAddressId:'',
      securityAddressId:'',
      rules:{
        "personnelFileBase.name": [
          { required: true, message: "请输入姓名", trigger: ['blur', 'change'] }
        ],
        "personnelFileBase.jobNumber": [
          { required: true, message: "请输入工号", trigger: ['blur', 'change'] }
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
    // 新增结算方式
    async transmitSelectAdd(value){
      if (value === 'addSuccess') {
        let res = await getDictionary({code:'settlement_method'})
        if (res.data.success) {
          this.settlementMethodOptions = res.data.data
        }
      } else {
        this.selectAddDialogVisible = value
      }
    },
    save(){

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

