// 客户信息详情
<template>
  <basic-container>
    <el-radio-group v-model="tabPosition" class="detailTab" size="small">
      <el-radio-button label="top">列表</el-radio-button>
      <el-radio-button label="right">新建</el-radio-button>
      <el-radio-button label="bottom">编辑</el-radio-button>
      <el-radio-button label="left">添加联系人</el-radio-button>
    </el-radio-group>
    <el-divider></el-divider>
    <el-row>
      <el-row>
        <div class="title">基本信息</div>
        <el-divider class="detail-divider"></el-divider>
      </el-row>
      <el-form
        label-width="150px"
        :model="employeeFileForm"
        ref="employeeFileForm"
        :rules="rules"
        :inline-message="true"
        class="detail-form"
      >
        <!-- 基本信息 -->
        <el-row>
          <el-col :span="12">
            <el-form-item required label="客户名称:" prop="personnelFileBase.jobNumber">
              <span v-if="operationState === 'details'"> {{employeeFileForm.personnelFileBase.jobNumber}}</span>
              
            </el-form-item>
            <el-form-item label="欠款数:">
              <span v-if="operationState === 'details'"> {{employeeFileForm.personnelFileBase.address}}</span>
              
            </el-form-item>
            <el-form-item  label="未开票:">
              <span v-if="operationState === 'details'"> {{employeeFileForm.personnelFileBase.deptName}}</span>
              
            </el-form-item>
            <el-form-item  label="已完成订单:">
              <span v-if="operationState === 'details'"> {{employeeFileForm.personnelFileBase.postName}}</span>
              
            </el-form-item>
            <el-form-item label="最近拜访时间:" >
              <span v-if="operationState === 'details'"> {{employeeFileForm.personnelFileBase.postName}}</span>
              
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="客户联系人:" prop="employeeFileForm.personnelFileBase.name">
              <span v-if="operationState === 'details'"> {{employeeFileForm.personnelFileBase.name}}</span>
              
            </el-form-item>
            <el-form-item label="订单总金额:">
              <span v-if="operationState === 'details'"> {{employeeFileForm.personnelFileBase.censusAddress}}</span>
              
            </el-form-item>
            <el-form-item label="未完成订单:">
              <span v-if="operationState === 'details'"> {{employeeFileForm.personnelFileBase.sex}}</span>
              
            </el-form-item>
            <el-form-item label="联系人数:">
              <span v-if="operationState === 'details'"> {{employeeFileForm.personnelFileBase.birthday}}</span>
              
            </el-form-item>
            <el-form-item label="信用额度:">
              <span v-if="operationState === 'details'"> {{employeeFileForm.personnelFileBase.politicsStatus}}</span>
              
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <div class="title">客户视图</div>
          <el-divider class="detail-divider"></el-divider>
        </el-row>
        <!-- 客户视图 -->
        <el-row>
          <el-tabs 
            tab-position="left" 
            type="card" 
            v-model="activeTabName"
            class="customer-detail-tab" 
            @tab-click="handleTabClick"
          >
            <el-tab-pane v-for="(item,index) in tabLabelList" :key="index" :label="item" :value="index">
              <el-table
                :data="customerDetailTableData"
                border
                style="width: 100%"
              >
                <el-table-column :label="item.label" width="180" v-for="(item,index) in tableTheadData.tableTitle" :key="index">
                  <template slot-scope="scope">
                    {{scope.row[item.prop]}} 
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-row>
        <el-row>
          <div class="title" style="margin-top:18px">附件信息</div>
          <el-divider class="detail-divider"></el-divider>
        </el-row>
        <el-row>
          <el-form-item label="附件信息:" label-width="90px" style="margin-top:5px">
            <el-upload
              v-if="operationState !== 'details'"
              action="#"
              list-type="picture-card"
              :http-request="uploadAttachment"
              :file-list="fileList"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
        </el-row>
      </el-form>
    </el-row>
    <el-row class="button-wrapper-footer">
      <el-button size="small" type="primary" @click="cancel">返回</el-button>
    </el-row>
  </basic-container>
</template>

<script>
import {addEditCustomer} from "@/api/customer/index";
import {getDepartmentList} from '@/api/humanResources/department'
import uploadImg from "@/components/upload/uploadImg"
// import {
//   tabLabelList,
//   tableTheadList 
// } from "@/field-data/customer/customerInformation"

export default {
  components:{
    uploadImg
  },
  data() {
    return {
      activeTabName:0,
      tabLabelList: tabLabelList,
      tableTheadData:[],
      tableTheadList: [
        {
          tableTitle:[
            {label:'日期',prop:'name'},
            {label:'状态',prop:'prop'},
            {label:'订单号',prop:'prop'},
          ]
        },
        {
          tableTitle:[
            {label:'日期',prop:'name'},
            {label:'合同名称',prop:'prop'},
            {label:'合同有效期',prop:'prop'},
          ]
        },
        {
          tableTitle:[
            {label:'客户名称',prop:'name'},
            {label:'商机名称',prop:'prop'},
            {label:'创建日期',prop:'prop'},
          ]
        },
        {
          tableTitle:[
            {label:'联系人',prop:'name'},
            {label:'日期',prop:'prop'},
            {label:'主题',prop:'prop'},
          ]
        },
        {
          tableTitle:[
            {label:'客户名称',prop:'name'},
            {label:'日期',prop:'prop'},
            {label:'金额',prop:'prop'},
          ]
        },
        {
          tableTitle:[
            {label:'客户名称',prop:'name'},
            {label:'日期',prop:'prop'},
            {label:'出库单',prop:'prop'},
          ]
        },
        {
          tableTitle:[
            {label:'日期',prop:'name'},
            {label:'发票金额',prop:'prop'},
            {label:'状态',prop:'prop'},
          ]
        },
        {
          tableTitle:[
            {label:'公司名称',prop:'name'},
            {label:'公司地址',prop:'prop'},
            {label:'纳税人识别号',prop:'prop'},
          ]
        }
        
      ],
      customerDetailTableData: [{
        name:'张三'
      }],
      employeeFileForm:{
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
  created(){
    this.tableTheadData = this.tableTheadList[0]
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
    // tab点击
    handleTabClick(value){
      this.tableTheadData = this.tableTheadList[Number(value.index)]
    },
    // 详情
    async initEmployeeFile(){
      let res = await detailsEmployeeFile({id:this.$route.query.row.id})
      this.employeeFileForm = res.data.data
      if (this.employeeFileForm.personnelFileBase.addressId) {
        this.baseAddressId = this.employeeFileForm.personnelFileBase.addressId.split(',')
      } 
      if (this.employeeFileForm.personnelFileSocialSecurity.addressId) {
        this.securityAddressId = this.employeeFileForm.personnelFileSocialSecurity.addressId.split(',')
      }
      
    },
    // 选择地址
    handleChange(value){
      this.employeeFileForm.personnelFileBase.addressId = value.toString()
      this.employeeFileForm.personnelFileBase.address = this.$refs['personnelFileBaseAddress'].getCheckedNodes()[0].pathLabels.toString()
    },
    // 社保选择地址
    handleChangePersonnelFileSocialSecurity(value){
      this.employeeFileForm.personnelFileSocialSecurity.addressId = value.toString()
      this.employeeFileForm.personnelFileSocialSecurity.address = this.$refs['personnelFileSocialSecurityAddress'].getCheckedNodes()[0].pathLabels.toString()
    },
    // 选择部门
    changeDept(value){
      let item = this.deptOptions.filter((item) => {
        return item.id === value
      })
      this.employeeFileForm.personnelFileBase.deptName = item[0].deptName
    },
    // 选择岗位
    changePost(value){
      let item = this.postNameOptions.filter((item) => {
        return item.id === value
      })
      this.employeeFileForm.personnelFileBase.postName = item[0].postName
    },
    // 选择上级
    changeLeder(value){
      let item = this.lederOptions.filter((item) => {
        return item.id === value
      })
      this.employeeFileForm.personnelFileEntry.lederName = item[0].realName
    },
    // 上传图片url
    handleUploadImgUrl(value){
      this.employeeFileForm.personnelFileBase.pic = value
      
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
        await this.$refs.employeeFileForm.validate();
      } catch (error) {
        return;
      }
      if (this.operationState === 'add') {
        let res = await addEmployeeFile(this.employeeFileForm)
        if(res.data.success){
          this.$message.success('操作成功')
          this.$router.back()
        }
      } else {
        let res = await editEmployeeFile(this.employeeFileForm)
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
/deep/ .el-input,.el-select,.el-cascader{
  width:360px;
}
.el-form-item{
  margin-bottom:2px
}
.detailTab{
  margin:4px 0 4px 8px;
}
/deep/ .customer-detail-tab{
  margin:9px 0 0 16px;
  .el-tabs__nav .is-left{
    width:113px;
    .el-tabs__item{
      height: 30px!important;
      line-height: 30px!important;
    }
  }
}

</style>

