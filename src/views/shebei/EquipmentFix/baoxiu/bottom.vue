<template>
    <div  style="background-color: #ffffff">
      <el-dialog
        title="搜索1"
        :visible.sync="info.searchShow"
        width="30%"
        :modal="false"
        style="background-color: rgba(0,0,0,0.5)"
        :before-close="handleClose">

        <el-form ref="form" class="demo-ruleForm"  :model="form" label-width="80px">

          <el-form-item label="报修单号:">
            <el-input v-model="form.number"></el-input>
          </el-form-item>


          <el-form-item label="维修部门:">
            <el-input v-model="form.dept"></el-input>
          </el-form-item>


          <el-form-item label="维修人:">
            <el-input v-model="form.user"></el-input>
          </el-form-item>


          <el-button type="primary" size="small" @click="serchAll">查询</el-button>
          <el-button type="info" size="small" @click="removeForm">重置</el-button>


        </el-form>

      </el-dialog>
<!--      <el-button type="primary" @click="addBtn">新增报修</el-button>-->
<!--      <el-button type="primary">&nbsp;&nbsp;删除&nbsp; &nbsp;</el-button>-->
<!--      <el-button type="primary" @click="zhiPai"> &nbsp;&nbsp;指派 &nbsp;&nbsp;</el-button>-->
<!--      <button @click="wee"></button>-->
      <el-button  size="small" type="primary" @click="searchBtn"><i class="el-icon-search"></i>搜索</el-button>
      <el-button @click="newBtn" size="small" type="primary">新增</el-button>
      <el-button @click="removeAll"  size="small"  type="primary">删除</el-button>
      <el-button @click="assBtn"  size="small"  type="primary">指派</el-button>
      <el-table
        size="small"
        ref="multipleTable"
        :data="tableData"
        border
        tooltip-effect="dark"
        style="width: 100%"
        @row-click="rowClick"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="计划状态"
          prop="status"
          width="160">
          <template  v-slot:default="slotProps">
           <span v-if="slotProps.row.status == '0'" style="color: #aaaaaa"
             >未指派</span>
            <span v-if="slotProps.row.status == '1'" style="color: #f56c6c"
            >已指派</span>
<!--            <span v-if="slotProps.row.status == '2'" style="color: #909399"-->
<!--            >作废</span>-->
          </template>
        </el-table-column>
        <el-table-column
          prop="urgency"
          label="紧急程度"
          width="160">
          <template  v-slot:default="slotProps">
          <span v-if="slotProps.row.urgency == '0'" style="color: #aaaaaa"
            >普通</span>
            <span v-if="slotProps.row.urgency == '1'" style="color: #f56c6c"
            >一般紧急</span>
            <span v-if="slotProps.row.urgency == '2'" style="color: #909399"
            >特别紧急</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="报修名称"
          width="160"
          >
        </el-table-column>
        <el-table-column
          prop="dept"
          label="维修部门"
          width="160">
        </el-table-column>
        <el-table-column
          prop="repairman"
          label="维修人"
          width="160">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="单据日期"
          width="160">
        </el-table-column>
        <el-table-column
          label="操作"
          width="160">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.$index, scope.row)" type="text" size="small" >详情</el-button>
            <el-button type="text" size="small" @click="editBtn">编辑</el-button>
            <el-button type="text" size="small"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
<!--      //表格详情组件-->
      <!--    分页-->
      <xiangqing :info="info"></xiangqing>
      <div class="block" style="float: right;">
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
      <v-assign :info="info"></v-assign>
      <newAdd  :info="info"></newAdd>
      <edit :info="info"></edit>
<!--       <top :info="info"></top>-->
      <!--    //end-->
    </div>
</template>

<script>
    import newAdd from "@/views/shebei/EquipmentFix/baoxiu/newAdd";
    import xiangqing from "./xiangqing"
    import edit from "./edit"
    // import top from "./top"
    import vAssign from "./assign"
    import {fixPage, delfix, voidPage} from "@/api/shebei/fix";

    export default {
        name: "",
      components:{
          // top,
          edit,
        vAssign,
        newAdd,
        xiangqing,
      },
        data() {
            return {
              form:{
                number:"",
                deot:"",
                user:"",
              },
              info:{
                searchShow:false,
                newAdd:false,
                xiangqingShow:false,
                assShow:false,
                pid:"",
                editShow:false,
                rowIds:""
              },
                //表格假数据
                tableData: [],
                multipleSelection: [],
              //分页total
              paging: { pageNum: 1, pageSize: 10 },
              total:""
            }
        },
        created(){
          this.handleList()
        },

        methods: {
          serchAll(){
            console.log(999)
            this.handleList(this.form)
            this.info.searchShow=false
          },
          searchBtn(){
              this.info.searchShow=true
          },
          assBtn(){
            this.info.assShow=true
          },
          newBtn(){
            this.info.newAdd=true
          },
          removeAll(){
            delfix({ids:this.rowIds})
          },
          wee(){
            Bus.$emit('txt',this.value);
          },
         async handleDelete(index, row){
            console.log(row.id)
            const rest = await this.$confirm("是否确定删除本条工单?", "删除工单", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).catch(err => err);
            if (rest !== "confirm") return this.$message("取消删除成功");
            const { data: res } = await delfix({ ids: row.id });
            if (res.code !== 200) return this.$message.error(res.meta.msg);
            this.$message.success("删除成功");

            // this.$emit("updateTable");
          },
          editBtn(index, row){
            this.info.editShow=true
          },
          zhiPai(){
            console.log(this.info.rowIds)
            this.info.assShow = true;
          },
          rowClick(row){
            this.info.pid=row.pid
            this.info.updid=row.id
            this.info.id=row.id
            this.id=row.id
          },
           delBtn(){
            // let res = await delfix({ids:this.info.id})
            // console.log(res.data)
            console.log(this.row,123)
          },
          //详情按钮
          handleClick(index, row){
            this.info.detailId=row.id
            this.info.xiangqingShow=true
            console.log(row)
            // console.log(this.info.detailId)
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
            //分页查询
            async  handleList(...arg){
                let params = {}
                if (arg.length>0) {
                    params = Object.assign(params,arg[0])
                }
                let res = await fixPage(params)
                this.tableData=res.data.data.records
              this.total=res.data.data.total
              console.log(res.data.data)
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
              const newarr = val.map(ele => ele.id);
              this.info.rowIds = newarr.join(",");
              this.rowIds = newarr.join(",");
              console.log(this.rowIds,666)
            },
            handleSizeChange(val) {
              this.handleList({pageSize:val})
            },
           handleCurrentChange(val) {
             this.handleList({pageNum:val})
          }
        }

    }
</script>

<style scoped>

</style>
