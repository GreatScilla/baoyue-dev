<template>
  <div>
    <el-dialog
      title="搜索"
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
          <el-input v-model="formInline.dept" placeholder="领用部门"></el-input>
        </el-form-item>

        <el-form-item label="活动时间" required>
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
        <el-form-item>
          <el-button type="primary" @click="onSubmit" size="small">查询</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>



    <el-divider></el-divider>

    <div class="center">
      <el-button type="primary" @click="searchBtn" size="small"><i class="el-icon-search"></i>查询</el-button>
      <el-button type="primary" @click="addbtn" size="small">新增</el-button>
      <el-button type="success" size="small" @click="auditBtn">审核</el-button>
      <el-button type="success" size="small" @click="unauditBtn">反审核</el-button>
      <el-button size="small" @click="removeBtn">删除</el-button>
      <el-button size="small">导出</el-button>
      <el-button size="small">打印</el-button>
      <el-button size="small" @click="invalidBtn">作废</el-button>
    </div>

    <el-table
      size="small"
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
        width="120">
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
        width="120">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="单据日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="orderType"
        label="领用类别"
        width="120">
        <template v-slot:default="slotProps">
          <span v-if="slotProps.row.orderType == '-1'">-</span>
          <span v-if="slotProps.row.orderType == '0'">设备领用</span>
          <span v-if="slotProps.row.orderType == '1'">备件领用</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="dept"
        label="领用部门"
        width="120">
      </el-table-column>
      <el-table-column
        prop="receiver"
        label="领用人"
        width="120">
      </el-table-column>
      <el-table-column
        prop="approvedBy"
        label="制单人"
        width="120">
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
          <el-button @click="editBtn(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
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
    <edit :info="info"></edit>
  </div>
</template>

<script>
import {collectPage, collectAudit, invalidCollect, removeCollect} from "@/api/shebei/transfer"
import edit from "./edit"

export default {
  name: "",
  components: {
    edit
  },
  data() {
    return {
      dialogVisible:false,
      rowIds: "",
      info: {
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
      multipleSelection: [],
      total:"",
    }
  },
  created() {
    this.getpage()
  },
  methods: {
    //编辑按钮
    editBtn(index, row){
      this.info.detailShow = true
      this.info.showStatus = "detail"
      this.info.id=row.id
      this.info.flag=1
    },
    //详情按钮
    detailBtn(index, row) {
      this.info.detailShow = true
      this.info.showStatus = "detail"
      this.info.id=row.id
      this.info.flag=0
      console.log(row.id)
    },
    searchBtn(){
      this.dialogVisible=true
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
      let res = await collectPage(para)
      this.tableData = res.data.data.records
      this.total=res.data.data.total
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
      this.info.detailShow = true
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
