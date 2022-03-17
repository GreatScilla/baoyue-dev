<template>
  <div>
<!--    <button @click="ceshi" class="shishi">删除</button>-->
    <el-dialog
      title="搜索"
      :visible.sync="searchShow"
      width="30%"
      :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row :gutter="5">
          <el-col :span="6"><div class="grid-content bg-purple">
            <el-form-item label="设备编号:">
              <el-input  v-model="accountNumber" filterable placeholder="请输入设备编号">+
              </el-input>
            </el-form-item>
          </div></el-col>
          <el-col :span="6"><div class="grid-content bg-purple">
            <el-form-item label="设备名称:">
              <el-input  v-model="accountName" filterable placeholder="请输入设备名称">
              </el-input >
            </el-form-item>
          </div></el-col>

          <el-col :span="6"
          ><div class="grid-content bg-purple">
            <el-form-item label="购置日期:">
              <div class="block">
                <el-date-picker
                  class="time"
                  v-model="value2"
                  type="daterange"
                  align="right"
                  unlink-panels
                  value-format="yyyy-MM-dd"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </div>
            </el-form-item></div
          ></el-col>


        </el-row>


        <el-row :gutter="5">
          <el-col :span="6"
          ><div class="grid-content bg-purple">
            <el-form-item label="所在部门:">
              <el-select
                v-model="form.department"
                placeholder="请选择"
                class="sel"
              >
                <el-option
                  v-for="item in accountDept"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item></div
          ></el-col>
          <el-col :span="6"
          ><div class="grid-content bg-purple">
            <el-form-item label="设备状态:">
              <el-select class="select" v-model="form.status" placeholder="请选择">
                <el-option
                  v-for="item in accountStatus"
                  :key="item.value"
                  :label="item.value"
                  :value="item.label">
                </el-option>
              </el-select>
            </el-form-item></div
          ></el-col>
          <!-- 时间 -->
          <el-col :span="6" style="margin-left: 10px;"
          >
            <div class="grid-content bg-purple">
              <el-button type="primary" @click="accountSearch" size="small">搜索</el-button>
              <el-button plain @click="reset" size="small">重置</el-button>
            </div>
          </el-col
          >
          <!--        shijian-->
          <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        </el-row>
      </el-form>
    </el-dialog>

<!--<button @click="qqqqqq">测试</button>-->
<!--    <el-form ref="form" :model="form" label-width="80px">-->
<!--      <el-row :gutter="5">-->
<!--        <el-col :span="6"><div class="grid-content bg-purple">-->
<!--          <el-form-item label="设备编号:">-->
<!--            <el-input  v-model="accountNumber" filterable placeholder="请输入设备编号">+-->
<!--            </el-input>-->
<!--          </el-form-item>-->
<!--          </div></el-col>-->
<!--        <el-col :span="6"><div class="grid-content bg-purple">-->
<!--          <el-form-item label="设备名称:">-->
<!--            <el-input  v-model="accountName" filterable placeholder="请输入设备名称">-->
<!--              </el-input >-->
<!--          </el-form-item>-->
<!--          </div></el-col>-->

<!--        <el-col :span="6"-->
<!--        ><div class="grid-content bg-purple">-->
<!--          <el-form-item label="购置日期:">-->
<!--            <div class="block">-->
<!--              <el-date-picker-->
<!--                class="time"-->
<!--                v-model="value2"-->
<!--                type="daterange"-->
<!--                align="right"-->
<!--                unlink-panels-->
<!--                value-format="yyyy-MM-dd"-->
<!--                range-separator="至"-->
<!--                start-placeholder="开始日期"-->
<!--                end-placeholder="结束日期"-->
<!--              >-->
<!--              </el-date-picker>-->
<!--            </div>-->
<!--          </el-form-item></div-->
<!--        ></el-col>-->


<!--      </el-row>-->


<!--      <el-row :gutter="5">-->
<!--        <el-col :span="6"-->
<!--          ><div class="grid-content bg-purple">-->
<!--            <el-form-item label="所在部门:">-->
<!--              <el-select-->
<!--                v-model="form.department"-->
<!--                placeholder="请选择"-->
<!--                class="sel"-->
<!--              >-->
<!--                <el-option-->
<!--                  v-for="item in accountDept"-->
<!--                  :key="item.value"-->
<!--                  :label="item.label"-->
<!--                  :value="item.value"-->
<!--                >-->
<!--                </el-option>-->
<!--              </el-select>-->
<!--            </el-form-item></div-->
<!--        ></el-col>-->
<!--        <el-col :span="6"-->
<!--          ><div class="grid-content bg-purple">-->
<!--            <el-form-item label="设备状态:">-->
<!--              <el-select class="select" v-model="form.status" placeholder="请选择">-->
<!--                <el-option-->
<!--                  v-for="item in accountStatus"-->
<!--                  :key="item.value"-->
<!--                  :label="item.value"-->
<!--                  :value="item.label">-->
<!--                </el-option>-->
<!--              </el-select>-->
<!--            </el-form-item></div-->
<!--        ></el-col>-->
<!--        &lt;!&ndash; 时间 &ndash;&gt;-->
<!--        <el-col :span="6" style="margin-left: 10px;"-->
<!--        >-->
<!--          <div class="grid-content bg-purple">-->
<!--            <el-button type="primary" @click="accountSearch" size="small">搜索</el-button>-->
<!--            <el-button plain @click="reset" size="small">重置</el-button>-->
<!--          </div>-->
<!--        </el-col-->
<!--        >-->
<!--&lt;!&ndash;        shijian&ndash;&gt;-->
<!--        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>-->
<!--      </el-row>-->
<!--    </el-form>-->
    <!-- 按钮组件 -->
    <button @click="qweewq">4545</button>
    <btn-ele :rowIds="rowIds" @updateTable="updateTable"></btn-ele>

    <!-- 下面的表格 -->
    <div class="box">
      <!-- 表格旁边的设备树,要保留 -->
      <div class="left-bottom">
        <p>设备类别：</p>
        <el-tree
          :data="selecttreedata"
          :props="defaultProps"
          @node-click="getCurrentNode"
        ></el-tree>
      </div>
      <!-- 表格 -->
      <el-table
        border
        size="mini"
        ref="multipleTable"
        :data="tableData"
        style="width: 100%"
        @select="select"
        @selection-change="selsChange"
        max-height="350"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="设备图片" prop="picture" show-overflow-tooltip>
          <template v-slot:default="slotProps">
            <el-image
              style="width: 34px; height: 34px"
              :src="slotProps.row.picture"
              :fit="['cover']"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="设备状态" show-overflow-tooltip>
          <template v-slot:default="slotProps">
            <span v-if="slotProps.row.status == '0'" style="color: #13ce66"
              >正常</span
            >
            <span v-else-if="slotProps.row.status == '1'" style="color: #6e6e6e"
              >闲置</span
            >
            <span v-else-if="slotProps.row.status == '2'" style="color: #ff4949"
              >停机</span
            >
            <span v-else-if="slotProps.row.status == '3'" style="color: #f7ba2a"
              >故障</span
            >
            <span v-else-if="slotProps.row.status == '4'" style="color: #1890ff"
              >维修</span
            >
            <span v-else-if="slotProps.row.status == '5'" style="color: #909399"
              >保养</span
            >
            <span v-else-if="slotProps.row.status == '6'" style="color: #909399"
              >已报废</span
            >
            <span v-else-if="slotProps.row.status == '7'" style="color: #909399"
              >已出售</span
            >
          </template>
        </el-table-column>

        <el-table-column
          label="设备编号"
          prop="equipmentCoding"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column label="资产编号" prop="assetTag" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="设备名称" prop="name" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="设备类别" prop="category" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="所在部门" prop="dept" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="购置日期"
          prop="purchaseDate"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="出厂日期"
          prop="productionDate"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="质保日期"
          prop="qualityGuaranteePeriod"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column label="所在位置" prop="location" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="所属人员"
          prop="custodian"
          show-overflow-tooltip
        >
        </el-table-column>
        <!-- 结束 -->
        <el-table-column fixed="right" label="操作" width="150">
          <!-- v-slot:default="slotProps" 插槽 -->
          <template v-slot:default="slotProps">
            <el-button
              @click="setdialogVisible('0', slotProps.row)"
              type="text"
              size="mini"
              >详情</el-button
            >
            <el-button
              type="text"
              size="mini"
              @click="setdialogVisible('1', slotProps.row)"
              >编辑</el-button
            >
            <el-button
              type="text"
              size="mini"
              @click="delDeldialog(slotProps.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager,jumper, next"
      :total="total"
      @current-change="handleCurrentChange"
    >
    </el-pagination>

    <!-- ----弹框组件----- -->

    <!-- 编辑/ 详情 -->
    <edit-dialog
      :dialogVisible="dialogVisible"
      :rowall="rowall"
      :falgBtn="falgBtn"
      @updateedit="updateedit"
      @updateVisible="updateVisible"
    ></edit-dialog>
    <!-- 删除 -->
    <del-dialog
      :rowdel="rowdel"
      :DeldialogVisible="DeldialogVisible"
      @updateDeldialog="updateDeldialog"
    ></del-dialog>
  </div>
</template>

<script>
// import {echartsdata} from "@/api/shebei/commit";
import btnEle from "./btnEle";
import editDialog from "./edit";
import delDialog from "./del";
import {brokenline} from "@/api/shebei/commit"

import { getShebei, selecTtree, delList } from "../../../../api/shebei/account";
import table from "../../../util/table";
export default {
  components: {
    btnEle,
    editDialog,
    delDialog
  },
  data() {
    return {
      searchShow:false,
        tabId:"",
        accountNumber:'',
        accountName:'',
        options:[{
            value: "选项1",
            label: '123'
        }],
        accountStatus:[
            {label:"0",
            value:"正常"},
            {label:"1",
            value:"闲置"},
            {label:"2",
            value:"停机"},
            {label:"3",
            value:"故障"},
            {label:"4",
            value:"维修中"},
            {label:"5",
            value:"保养中"},
            {label:"6",
            value:"已作废"},
            {label:"7",
            value:"已出售"},
        ],
        accountClass:[
            {lable:"0",
            value:"森林"},
            {lable:"1",
             value:"机组0"}
        ],
        accountDept:[
        {lable:"0",
        value:"1231"},
        {lable:"1",
        value:"部门c"}    ,
        {lable:"2",
        value:"生产部门一"}  ,
        {lable:"3",
        value:"生产部门二"}  ,
        {lable:"4",
        value:"生产部门三"}
        ],
      //设备树的数据
      selecttreedata: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      // 本行的所有数据
      rowall: {},
      rowdel: {},
      dialogVisible: false,
      DeldialogVisible: false,
      falgBtn: null,
      // 假数据
      // 输入框和下拉框
      form: {
        category: "",
        name: "",
        department: "",
        status,
        label:"",
      },
      value1: "",
      value2: "",
      // 分页
      paging: { pageNum: 1, pageSize: 10 },
      total: "",

      // 表格数据
      tableData: [],
      rowIds:''
    };
  },
  async created() {
    const res = await getShebei(this.paging);
    this.total = res.data.data.total;
    this.tableData = res.data.data.records;
    const selecttree = await selecTtree();
    this.selecttreedata = selecttree.data.data;
      // console.log(this.selecttreedata)
  },
  methods: {
   async qweewq(){
      let res = await brokenline({id:22})
     console.log(res.data.data,'数据')
     let oldarr = res.data.data.温度折线
     let humidity = res.data.data.湿度折线
     let newArr=[];
     let arrTwo = []
     oldarr.map(item=>{
       newArr.push(item.value)
     })
     let humiditydat = []
     humidity.map(item=>{
       humiditydat.push(item.value)
     })
     console.log(humiditydat,'湿度折线')
     oldarr.map(item=>{
       arrTwo.push(item.acpTime)
     })
     let d = arrTwo.map(item=>{
       return item.substring(11,19)
     })
     let c = humiditydat.map(item=>{
       return item/10+'%'
     })
     console.log(c,'这数据可以么')
     let b=newArr.map(item=>{
       return item/10
     })
    },
  //  async qqqqqq(){
  //     let {data} = await echartsdata()

  //    console.log(data)
  //   },
    searchTrue(){

    },
    //树形控件选择
   async getCurrentNode(data){
      if(data.children.length===0){
        console.log(data.name)
        let res = await getShebei({category:data.name})
        this.tableData = res.data.data.records;
        console.log(res)
      }
    },
      //搜索按钮
     async accountSearch(...arg) {
          let params = {
              equipmentCoding: this.$data.accountNumber,
              dept: this.form.department,
              name: this.$data.accountName,
              status: this.form.status,
              category:this.form.category,
              expectReceiveDateStart:this.$data.value2[0],
              expectReceiveDateEnd:this.$data.value2[1]
          }
          let res = await getShebei(params)
         this.tableData = res.data.data.records;
          // if (arg.length>0) {
          //     params = Object.assign(params,arg[0])
          // }
      },
      //重置
      reset(){
          this.$data.accountNumber="";
              this.$data.accountName="";
              this.form={};
        this.$data.value2=[]
      },
    // 子组件 编辑 详情弹框
    updateVisible() {
      this.dialogVisible = false;
    },
    // 子组件删除弹框
    async updateDeldialog() {
      this.DeldialogVisible = false;
      const res = await getShebei(this.paging);
      this.total = res.data.data.total;
      this.tableData = res.data.data.records;
    },
    // 编辑/详情
    setdialogVisible(val, ele) {
      this.dialogVisible = true;
      this.falgBtn = val;
      this.rowall = ele;
    },
    //删除测试
    // async ceshi() {
    //     let res = await delList({ids:"3"})
    //     console.log(res.data.code)
    //     if(res.data.code===200){
    //         this.$message({
    //             message: '删除成功',
    //             type: 'success'
    //         });
    //     }
    //      // console.log("删除测试")
    //  },

    delDeldialog(val) {
      this.DeldialogVisible = true;
      this.rowdel = val;
    },

    // 孙
    async updateTable() {
      const res = await getShebei(this.paging);
      this.total = res.data.data.total;
      this.tableData = res.data.data.records;
    },

    // 编辑
    async updateedit() {
      const res = await getShebei(this.paging);
      this.total = res.data.data.total;
      this.tableData = res.data.data.records;
    },

    // 分页
    async handleCurrentChange(val) {
      this.paging.pageNum = val;
      const res = await getShebei(this.paging);
      this.total = res.data.data.total;
      this.tableData = res.data.data.records;
    },

    // selsChange
    selsChange(val) {
      const newarr = val.map(ele => ele.id);
      this.rowIds = newarr.join(",");
    }
  }
};
</script>

<style lang="scss" scoped>
.el-pagination {
  margin: 20px 50px 0 0;
  margin-left: 65%;
}
.el-row {
  //   margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
  padding-left: 0;
  padding-right: 0;
}
// .bg-purple-dark {
//   background: #99a9bf;
// }
// .bg-purple {
//   background: #d3dce6;
// }
// .bg-purple-light {
//   background: #e5e9f2;
// }
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  //   padding: 10px 0;
  background-color: #f9fafc;
}
.time {
  width: 100%;
}
.box {
  display: flex;
}
.left-bottom {
  width: 150px;
  height: 350px;
  background-color: #fafafa;
  float: left;
  margin-right: 10px;
}
.left-bottom p {
  text-align: center;
}
//.btn{
//  position:absolute;
//  margin-top: 140px;
//  margin-left: 233px;
//  width: 68px;
//  opacity: 0;
//}
</style>
