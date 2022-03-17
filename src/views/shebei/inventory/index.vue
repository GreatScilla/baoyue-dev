<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="单据编号">
        <el-input v-model="formInline.user" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="单据日期">
        <div class="block">
          <el-date-picker
            v-model="value2"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" size="small">查询</el-button>
        <el-button type="primary" @click="onSubmit" size="small">重置</el-button>
      </el-form-item>
    </el-form>
<!------------------------------------------button ---------------------------------------------------->
    <el-row style="margin-top: 15px">
      <el-col :span="24"><div class="grid-content bg-purple-dark">
        <el-button size="small" type="primary" @click="addBtn">新增</el-button>
        <el-button size="small" type="primary">审核</el-button>
        <el-button size="small" >导入</el-button>
        <el-button size="small" >导出</el-button>
        <el-button size="small" >打印</el-button>
        <el-button size="small" >作废</el-button>
      </div></el-col>
    </el-row>
<!--    ---------------------------------------table------------------------------------------------------->
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        border
        size="mini"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="单据状态"
          prop="status"
          width="137">
          <template slot-scope="scope">{{ scope.row.status }}</template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="附件"
          width="55">
          <template  v-slot:default="slotProps">
            <el-button size="small" type="primary"><b>+</b></el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="number"
          label="单据编号"
          width="137">
        </el-table-column>
        <el-table-column
          prop="infoDate"
          label="单据日期"
          width="137">
        </el-table-column>
        <el-table-column
          prop="custodian"
          label="盘点范围"
          width="137">
        </el-table-column>
        <el-table-column
          prop="dept"
          label="执行部门"
          width="137">
        </el-table-column>
        <el-table-column
          prop="executor"
          label="执行人"
          width="137">
        </el-table-column>
        <el-table-column
          prop="createUser"
          label="制单人"
          width="137">
        </el-table-column>
        <el-table-column
          prop="updateUser"
          label="审核人"
          >
        </el-table-column>
      </el-table>
    <inventory-add :info="info"></inventory-add>
    </div>
</template>

<script>
import inventoryAdd from "./inventoryAdd"
import {inventPage} from "@/api/shebei/equipmentinventoryinfo"
    export default {
  components:{
    inventoryAdd
  },
      data() {
        return {
          info:{
            addShow:false
          },
          tableData: [{
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }],
            formInline: {
            user: '',
            region: ''
          },
          pickerOptions: {
            shortcuts: [
              {
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }]
          },
          value1: [new Date(), new Date()],
          value2: ''
        }
      },
      methods: {
        addBtn(){
          this.info.addShow=true
        },
       async ooooo(){
        let res = await inventPage()
         this.tableData=res.data.data.records
         console.log(res.data.data.records)
        },
        onSubmit() {
          console.log('submit!');
        }
      }

    }
</script>

<style lang="scss" scoped>

</style>
