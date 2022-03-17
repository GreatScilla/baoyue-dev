// 人员新增、修改
<template>
  <basic-container>
    <el-row>
      <el-form
        label-width="100px"
        :inline="true"
        :model="personnelForm"
        class="detail-form"
        ref="personnelForm"
        :rules="rules"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item required label="员工工号" prop="empNo">
              <el-input
                size="small"
                v-model="personnelForm.empNo"
                placeholder="请输入">
              </el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-select size="small" v-model="personnelForm.status" placeholder="请选择">
                <el-option
                  v-for="item in stateOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="手机号码">
              <el-input
                size="small"
                v-model="personnelForm.phone"
                placeholder="请输入手机号码">
              </el-input>
            </el-form-item>
            <el-form-item label="离职日期">
              <el-date-picker
                v-model="personnelForm.dimissionTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item required label="员工姓名" prop="realName">
              <el-input
                size="small"
                v-model="personnelForm.realName"
                placeholder="请输入">
              </el-input>
            </el-form-item>
            <el-form-item label="出生日期">
              <el-date-picker
                v-model="personnelForm.birthday"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input
                size="small"
                v-model="personnelForm.email"
                placeholder="请输入">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="性别">
              <el-select size="small" v-model="personnelForm.sex" placeholder="请选择">
                <el-option
                  v-for="item in sexOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item required label="所属部门" prop="deptName">
              <el-select size="small" v-model="personnelForm.deptName" placeholder="请选择">
                <el-option>
                  <el-tree :data="departmentTreeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="入职日期">
              <el-date-picker
                v-model="personnelForm.entryTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <el-row class="button-wrapper-footer">
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button size="small" type="primary" @click="savePerson('personnelForm')">保存</el-button>
    </el-row>
  </basic-container>
</template>

<script>
import {getDepartmentTree} from '@/api/humanResources/department'
import {addPersonnel, detailsPersonnel, editPersonnel} from '@/api/humanResources/personnel'
export default {
  data() {
    return {
      personnelForm:{
        status:0,
        sex:1,
        deptName:'',
        birthday:'',
        phone:'',
        email:'',
        entryTime:'',
        dimissionTime:''
      },
      departmentTreeData:[],
      sexOptions: [{
        value: 1,
        label: '男'
      }, {
        value: 2,
        label: '女'
      }],
      stateOptions: [{
        value: 0,
        label: '启用'
      }, {
        value: 1,
        label: '停用'
      }],
      tel:'',
      sexValue:0,
      stateValue:0,
      operationState:null,
      departmentName:'',
      defaultProps: {
        label: "title"
      },
      rules: {
        empNo: [
          {required: true, message: '请输入员工工号', trigger: ['blur', 'change']}
        ],
        realName:[
          { required: true, message: '请输入员工姓名', trigger: ['blur', 'change'] },
        ],
        deptName:[
          { required: true, message: '请选择所属部门', trigger: ['blur', 'change'] },
        ],
      },
    };
  },
  created(){
    if (this.$route.query.operationState) {
      this.operationState = this.$route.query.operationState
    }
    if (this.operationState === 'edit') {
      this.initPersonnelDetails()
    }
    this.initDepartment()
  },
  methods: {
    // 部门选择
    handleNodeClick(value){
      this.personnelForm.deptName = value.title
      this.personnelForm.deptId = value.id
    },
    // 查询部门
    initDepartment(){
      getDepartmentTree()
      .then(res => {
        this.departmentTreeData = res.data.data
      })
      .catch(error => {
        console.log(error)
      })
    },
    // 人员详情
    initPersonnelDetails(){
      detailsPersonnel({id:this.$route.query.row.id})
      .then(res => {
        this.personnelForm = res.data.data
        // this.departmentName = this.personnelForm.deptName
        // for (let key in this.personnelForm) {
        //   if (key === 'entryTime') {
        //     this.personnelForm[key] = this.personnelForm[key].replace(/\s[\x00-\xff]*/g,'')
        //   }
        //   if (key === 'dimissionTime') {
        //     this.personnelForm[key] = this.personnelForm[key].replace(/\s[\x00-\xff]*/g,'')
        //   }
        //   if (key === 'birthday') {
        //     this.personnelForm[key] = this.personnelForm[key].replace(/\s[\x00-\xff]*/g,'')
        //   }
        // }
      })
      .catch(error => {
        console.error(error)
      })
    },
    // 取消
    cancel(){
      this.$router.back()
    },
    // 保存
    savePerson(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.operationState === 'add') {
            let addParams = this.personnelForm
            addPersonnel(addParams)
            .then(res => {
              if (res.data.success) {
                this.$message.success('保存成功')
                this.$router.back()
              }
            })
            .catch(error => {
              console.error(error)
            })
          } else {
            let editParams = {
              id:this.personnelForm.id,
              empNo:this.personnelForm.empNo,
              realName:this.personnelForm.realName,
              sex:this.personnelForm.sex,
              status:this.personnelForm.status,
              birthday:this.personnelForm.birthday,
              deptId:this.personnelForm.deptId,
              phone:this.personnelForm.phone,
              email:this.personnelForm.email,
              entryTime:this.personnelForm.entryTime,
              dimissionTime:this.personnelForm.dimissionTime
            }
            editPersonnel(editParams)
            .then(res => {
              if(res.data.success) {
                this.$message.success('修改成功')
                this.$router.back()
              }
            })
            .catch(error => {
              console.error(error)
            })
          }
        } else {
          return false;
        }
      })
    },
  }
};
</script>

<style lang="scss" scoped>
.detail-form {
  padding: 30px 35px;
}
.el-input,.el-select{
  width:240px;
}
/deep/ .el-tree{
  margin:10px
}
.el-select-dropdown__item.hover{
  background-color: #fff;
}
</style>
