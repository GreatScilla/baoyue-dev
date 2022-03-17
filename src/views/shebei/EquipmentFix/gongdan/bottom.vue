<template>
  <div  style="background-color: #ffffff">
<!--    表单-->
<!--    <button @click="btn">测试</button>-->
    <el-dialog
      title="搜索"
      :visible.sync="dialogVisible"
      width="30%"
      :modal="false"
      style="background-color: rgba(0,0,0,0.5)"
      :before-close="handleClose">

      <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="工单编号:">
              <el-input v-model="form.number"></el-input>
            </el-form-item>
            <el-form-item label="维修部门:">
              <el-input v-model="form.dept"></el-input>
            </el-form-item>
            <el-form-item label="维修人:">
              <el-input v-model="form.repairman"></el-input>
            </el-form-item>


            <el-button type="primary" @click="search" size="small">查询</el-button>
            <el-button type="info" @click="resetBtn" size="small">重置</el-button>

      </el-form>

    </el-dialog>



<!--    按钮-->
    <el-button type="primary" @click="searchBtn" size="small"> <i class="el-icon-search"></i>查询</el-button>
    <el-button type="primary" @click="addBtn" size="small">新增工单</el-button>
    <el-button type="primary" @click="voidBtn" size="small">&nbsp;&nbsp;作废&nbsp; &nbsp;</el-button>

    <!--    表格-->
    <el-table
      @updateTable="$emit('updateTable')"
      ref="multipleTable"
      :data="tableData"
      border
      @row-click="rowClick"
      size="mini"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="selsChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        label="工单状态"
        prop="status"
        width="120">
        <template  v-slot:default="slotProps">
          <el-tag size="small" v-if="slotProps.row.orderStatus == '0'" style="color: #aaaaaa"
          >未完成</el-tag>
          <el-tag size="small" v-if="slotProps.row.orderStatus == '1'" style="color: #04d9b2"
          >已完成</el-tag>
          <el-tag  size="small"  v-if="slotProps.row.orderStatus == '2'" style="color: #02a7f0"
          >委外维修中</el-tag>
          <el-tag  size="small"  v-if="slotProps.row.orderStatus == '3'" style="color: #f59a23"
          >委外申请中</el-tag>
          <el-tag  size="small"  v-if="slotProps.row.orderStatus == '4'" style="color: #00b2ff"
          >已验收</el-tag>
          <el-tag  size="small"  v-if="slotProps.row.orderStatus == '5'" style="color: #aaaaaa"
          >已作废</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="urgency"
        label="紧急程度"
        width="120">
        <template  v-slot:default="slotProps">
          <el-tag size="small" v-if="slotProps.row.urgency == '0'" style="color: #d9001b"
          >特别紧急</el-tag>
          <el-tag size="small" v-if="slotProps.row.urgency == '1'" style="color: #00b2ff"
          >一般紧急</el-tag>
          <el-tag size="small" v-if="slotProps.row.urgency == '2'" style="color: #f59a23"
          >比较紧急</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="number"
        label="工单编号"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="documentDate"
        label="工单日期"
        width="120">
      </el-table-column>
      <el-table-column
        prop="dept"
        label="维修部门"
        width="120">
      </el-table-column>
      <el-table-column
        prop="repairman"
        label="维修人"
        width="120">
      </el-table-column>
      <el-table-column
        prop="result"
        label="维修结果"
        width="120">
        <template  v-slot:default="slotProps">
          <span v-if="slotProps.row.result == '0'" style="color: #d9001b"
          >已修好</span>
          <span v-if="slotProps.row.result == '1'" style="color: #d9001b"
          >未修好</span>
          <span else="slotProps.row.result == '-1'" style="color: #f59a23"
          ></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="memo"
        label="备注"
        width="240">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template    slot-scope="scope" style="text-align: center">
          <el-button @click="detail" type="text" size="small">详情</el-button>
          <el-button type="text" size="small"
          v-if="scope.row.orderStatus == '0'" @click="handleClick(scope.$index, scope.row)">结果反馈</el-button>
          <el-button type="text" size="small"
          v-if="scope.row.orderStatus == '2'" @click="handleClick(scope.$index, scope.row)">结果反馈</el-button>
<!--          <el-button type="text" size="small" @click="outFix">委外维修</el-button>-->
          <el-button type="text" size="small" v-if="scope.row.orderStatus == '4'" @click="acc_btn(scope.$index, scope.row)">验收</el-button>
          <el-button type="text" size="small" v-if="scope.row.orderStatus == '1'" @click="acc_btn(scope.$index, scope.row)">验收</el-button>
          <el-button type="text" size="small" v-if="scope.row.orderStatus == '3'">审核</el-button>
        </template>
      </el-table-column>
    </el-table>
<!--    分页-->
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
    <!--      详情组件-->
    <detail :info="info"></detail>
<!--    添加页组件-->
    <vAdd :info="info"></vAdd>
<!--    //end-->
    <fix-back :info="info"></fix-back>
    <acceptance :info="info"></acceptance>
  </div>
</template>

<script>
import fixBack from "@/views/shebei/EquipmentFix/gongdan/fixBack";
import acceptance from "@/views/shebei/EquipmentFix/gongdan/acceptance";
import vAdd from "./add"
import detail from "./detail"
import {woPage ,voidPage} from "@/api/shebei/fix";
import {delList} from "@/api/shebei/account";
import FixBack from "@/views/shebei/EquipmentFix/gongdan/fixBack";
import Acceptance from "@/views/shebei/plan/checkOrder/acceptance";
    export default {
      name: "",
      components:{
        Acceptance,
        FixBack,
        detail,
        vAdd,
        acceptance
      },
        data() {

            return {
              dialogVisible:false,
              info:{
             detailShow:false,
             addShow: false,
             backShow:false,
             accShow:false,
          },
              rowid:"",
              //form表单的数据
              form: {
                number:"",
                dept:"",
                repairman:"",
              },
                //分页假数据
                total:"",
              //表格数据
                tableData: [],
                multipleSelection: [],
              rowIds:""
            }
        },
      created() {
          this.getPage()
      },

      methods: {
        searchBtn(){
          this.dialogVisible=true
        },
        outFix(){

        },
        acc_btn(index,row){
          this.info.id=row.id
          this.info.accShow=true
        },
        handleClick(index, row){
          console.log(row)
          this.info.row_id=row.id
          this.info.backShow=true
        },
        resetBtn(){
          this.form={}
        },
        //查询按钮
        search(){
          let para = this.form
          this.getPage(para)
          this.dialogVisible=false
        },
        //点击添加按钮显示添加页
        addBtn(){
          this.info.addShow=true
        },
        // selsChange,获取所选择的row的id集合
        selsChange(val) {
          const newarr = val.map(ele => ele.id);
          this.rowIds = newarr.join(",");

        },
        //工单作废
        async voidBtn() {
          const rest = await this.$confirm("是否确定作废本条工单?", "作废工单", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).catch(err => err);
          if (rest !== "confirm") return this.$message("取消作废成功");
          const { data: res } = await voidPage({ ids: this.rowIds });
          if (res.code !== 200) return this.$message.error(res.meta.msg);
          this.$message.success("作废成功");
          this.$emit("updateTable");

        },


        //获取单行row的id
        rowClick(row){
          this.rowid=row.id
          this.info.ids=this.rowid
          console.log(row.orderStatus)
          // console.log(row)
        },

        //获取设备分页
        async  getPage(para){
          let  res = await woPage(para)
          this.tableData=res.data.data.records
          console.log(res)
          this.total=res.data.data.total

        },
        btn(){
        },


        //详情页
        detail(){

          this.info.detailShow=true
        },

        toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },


            handleSizeChange(val) {
              this.getPage({pageSize:val})
            },
            handleCurrentChange(val) {
          this.getPage({pageNum:val})
            }
        }

    }
</script>

<style scoped>
  .el-table{
    margin-top: 20px;
  }

</style>
