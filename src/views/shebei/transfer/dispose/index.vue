<template>
  <div>


    <el-dialog
      title="条件搜索"
      :visible.sync="dialogVisible"
      width="30%"
      :modal="false"
      style="background-color: rgba(0,0,0,0.5)"
      :before-close="handleClose">
      <el-form :inline="true"
               :model="formInline"
               class="demo-form-inline">
        <el-form-item label="单据编号">
          <el-input v-model="formInline.user" placeholder="单据编号"></el-input>
        </el-form-item>
        <el-form-item label="领用部门">
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="部门一" value="shanghai"></el-option>
            <el-option label="部门二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="活动时间" >
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker type="date"
                              placeholder="选择日期"
                              v-model="formInline.data1"
                              value-format="yyyy-MM-dd"
                              style="width: 160px;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <br>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" size="small">查询</el-button>
          <el-button type="primary" @click="resetBtn" size="small">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <div class="center">

<!--      <el-button @click="qwer">测试</el-button>-->
      <el-button type="primary" @click="searchBtn" size="small"><i class="el-icon-search"></i>查询</el-button>
      <el-button type="primary" @click="addbtn" size="small">申请处置</el-button>
      <el-button type="success" size="small" @click="auditBtn">审核</el-button>
      <el-button size="small" @click="removeBtn">删除</el-button>
      <el-button size="small">导出</el-button>
      <el-button size="small">打印</el-button>
      <el-button size="small" @click="invalidBtn">作废</el-button>
    </div>

    <el-table
      size="mini"
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%;margin-top: 15px"
      border
      @selection-change="selsChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="单据状态"
        prop="status"
        width="100">
        <template v-slot:default="slotProps">
          <span v-if="slotProps.row.status == '0'" style="color: #f56c6c"
          >待审</span>
          <span v-if="slotProps.row.status == '1'" style="color: #67c23a"
          >已审</span>
          <span v-if="slotProps.row.status == '2'" style="color: #909399"
          >作废</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="number"
        label="单据编号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="单据日期"
        width="150">
      </el-table-column>
      <el-table-column
        prop="processingMethod"
        label="处置方式"
        width="100">
        <template v-slot:default="slotProps">
          <span v-if="slotProps.row.orderType == '-1'">-</span>
          <span v-if="slotProps.row.orderType == '0'">设备领用</span>
          <span v-if="slotProps.row.orderType == '1'">备件领用</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="reasonsForDisposal"
        label="处置原因"
        width="100">
      </el-table-column>
      <el-table-column
        prop="equipmentCoding"
        label="设备编号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="eqAssetTag"
        label="资产编号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="eqName"
        label="设备名称"
        width="100">
      </el-table-column>
      <el-table-column
        prop="equipmentInfo"
        label="设备类别"
        width="100">
      </el-table-column>
      <el-table-column
        prop="dept"
        label="购置金额"
        width="100">
      </el-table-column>
      <el-table-column
        prop="dept"
        label="净值"
        width="100">
      </el-table-column>
      <el-table-column
        prop="dept"
        label="使用时长"
        width="100">
      </el-table-column>
      <el-table-column
        prop="receiver"
        label="处置人"
        width="100">
      </el-table-column>
      <el-table-column
        prop="approvedBy"
        label="制单人"
        width="100">
      </el-table-column>
      <el-table-column
        prop="memo"
        label="备注"
        width="300"
      >
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="detailBtn(scope.$index, scope.row)" type="text" size="small">详情</el-button>
          <el-button @click="editBtn" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="float: right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <!--    编辑弹框-->
    <add :info="info"></add>
    <edit :info="info"></edit>
  </div>
</template>

<script>
import {disposePage, collectAudit, invalidCollect, removeCollect,disposeDetail,equipmentdisposal} from "@/api/shebei/transfer"
import edit from "./edit"
import add from "./add"

export default {
  name: "",
  components: {
    edit,
    add
  },
  data() {
    return {
      total:"",
      dialogVisible:false,
      rowIds: "",
      info: {
        addShow:false,
        detailShow: false,
        editShow: false,
        showStatus: ''
      },
      formInline: {
        user: '',
        region: '',
        data1: ""
      },
      tableData: [],
      multipleSelection: []
    }
  },
  created() {
    this.getpage()
  },
  methods: {
    resetBtn(){
      this.formInline={}
    },
    searchBtn(){
      this.dialogVisible=true
    },
   async qwer(){
        let res = await disposeDetail({id:this.rowIds})
     console.log(res.data)
    },
    //删除
    async removeBtn() {
      let res = await removeCollect({ids:this.rowIds})
      if(res.data.code==200){
        this.$message({
          message: '删除成功',
          type: 'success'
        });
        this.getpage()
      }
    },
    //作废
    async invalidBtn() {
      let para = this.rowIds
      let res = await invalidCollect({ids: para})
      if (res.data.code == 200) {
        this.$message({
          message: '作废成功',
          type: 'success'
        });
        this.getpage()
      }
    },
    //反审核
    async unauditBtn() {
      let para = {
        ids: this.rowIds,
        result: '1'
      }
      let res = await collectAudit(para)
      if (res.data.code == 200) {
        this.$message({
          message: '操作成功',
          type: 'success'
        });
      }
      this.getpage()
    },
    //审核
    async auditBtn() {
      let para = {
        ids: this.rowIds,
        result: '0'
      }
      let res = await collectAudit(para)
      this.getpage()
      if (res.data.code == 200) {
        this.$message({
          message: '操作成功',
          type: 'success'
        });
      }
    },
    // selsChange
    selsChange(val) {
      const newarr = val.map(ele => ele.id);
      this.rowIds = newarr.join(",");
    },
    handleSizeChange(val) {
      this.getpage({pageSize:val})
    },
    handleCurrentChange(val) {
      this.getpage({pageNum:val})
    },
    async getpage(para) {
      let res = await disposePage(para)
      this.tableData = res.data.data.records
      this.total=res.data.data.total
    },
    //详情按钮
    detailBtn(index,row) {
      this.info.detailShow = true
      this.info.showStatus = "detail"
      this.info.id=row.id
    },
    //编辑按钮
    edit() {
      this.info.editShow = true
      // console.log(this.info.editShow)
    },
    onSubmit() {
      console.log(this.formInline.data1)
    },
    addbtn() {
      this.info.addShow = true
      this.info.showStatus = "add"
    }
  }
}
</script>

<style scoped>
.demo-form-inline {
}

/*.center {*/
/*  width: 100%;*/
/*  margin-bottom: 15px;*/
/*}*/

/*.center .el-button {*/
/*  width: 85px;*/
/*}*/
</style>
