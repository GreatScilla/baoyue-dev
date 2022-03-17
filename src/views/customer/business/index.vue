// 客户管理
<template>
  <basic-container>
    <!-- 操作功能 -->
    <el-row class="operation-function">
      <el-button size="small" icon="el-icon-search" type="primary" @click="search">
        查 询
      </el-button>
      <el-button size="small" icon="el-icon-plus" type="primary" @click="to('add')">
        新 增
      </el-button>
      <el-button size="small" icon="el-icon-delete" type="danger" plain @click="handleDelAccount">
        批量删除
      </el-button>
    </el-row>
    <el-divider></el-divider>
    <!-- 表格 -->
    <el-table
      :data="customerInformationTableData"
    >
      <el-table-column type="selection" width="50"> </el-table-column>
      <el-table-column prop="customerFullName" label="客户名称" width="180">
      </el-table-column>
      <el-table-column prop="description" label="客户分类" width="180">
      </el-table-column>
      <el-table-column label="行业分类">
      </el-table-column>
      <el-table-column prop="principalName" label="法定代表人">
        <template slot-scope="scope">
          <!-- {{scope.row.principalName || "无"}}  -->
        </template>
      </el-table-column>
      <!-- <el-table-column label="联系电话">
      </el-table-column> -->
      <el-table-column prop="control" label="销售员">
      </el-table-column>
  
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
            <el-button type="text" size="small" icon="el-icon-edit-outline" @click="to('edit' ,scope.row)" :disabled="scope.row.controllerStatus === 1">
            </el-button>
          </el-tooltip>
          <el-divider direction="vertical"></el-divider>
          <el-tooltip class="item" effect="dark" content="详情" placement="bottom">
            <el-button type="text" size="small" icon="el-icon-tickets" @click="to('details' ,scope.row)" :disabled="scope.row.controllerStatus === 1">
            </el-button>
          </el-tooltip>
          <el-divider direction="vertical"></el-divider>
          <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
            <el-button type="text" size="small" icon="el-icon-delete" @click="handleDelete(scope.row)" :disabled="scope.row.controllerStatus === 1">
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-row class="pagination-wrapper">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      >
      </el-pagination>
    </el-row>
    <!-- 查询 -->
    <search 
      :searchDialogVisible="searchDialogVisible"
      :column="column"
      @on-search="onSearch"
    >
    </search>
  </basic-container>
</template>

<script>
import { getCustomerPage} from "@/api/customer/index";
import paginationMixin from "@/mixins/pagination";
import search from "@/components/search/index"
// import { getProvinceData } from "@/util/provinceAndCity";
var DIC = {
  qwe:[]
}
export default {
  mixins: [paginationMixin],
  components:{
    search
  },
  data() {
    return {
      flag:false,
      form: {
        deliveryStatus: '',
        orderSn: '',
        memberUsername: ''
      },
      expectReceiveDate: [], // 交货日期
      date: [], // 单据日期
      customerInformationTableData: [
        {
          "description":123
        }
      ],
      multipleSelection: [],
      searchDialogVisible:false,
      dicData:{
        provinceData:[]
      },
      data:[],
      column:[
           {
            label:'客户编码',
            prop: "number",
          }, {
            label:'客户名称',
            prop: "name",
          },
          {
            label:'客户分类',
            type:"select",
            prop: "type",
          }, {
            label:'行业分类',
          },
          {
            label:'客户区域',
            type:"select",
          }, {
            label:'发票类型',
            type:"select",
          },
          {
            label:'结算方式',
            type:"select",
          }, {
            label:'折扣率',
          },
          {
            label:'联系人',
          }, {
            label:'联系电话',
          },
          {
            label:'省份',
            type:"select",
            prop:"qwe",
            dicData: [],
          }, {
            label:'业务员',
          },
          {
            label:'授信额度',
          }, {
            label:'开户银行',
          },
          {
            label:'银行账号',
          }
        ],
        columnData:[]
    }
  },
  created(){
    // this.handleList()
  },
 
  methods: {
    // 查询
    onSearch(value){
      this.searchDialogVisible = false
    },
    //
    search(){
      // const column = this.findObject(this.column, "qwe");
      // console.log(column)
      // //     column.data = res.data.data;
      // // // this.columnData = this.column
      // // this.flag = true
      this.searchDialogVisible = true
    },
    async handleList(...arg) {
      let params = {current:this.currentPage,size:this.pageSize}
      if (arg.length>0) {
        params = Object.assign(params,arg[0])
      }
      let res = await getCustomerPage(params)
      this.customerInformationTableData = [{}]
      // res.data.data.pages.records
      this.total = res.data.data.pages.total
    },
    async handleDelete(row) {
      let ids = [];
      if (row) {
        ids.push(row.id);
      } else {
        ids = this.multipleSelection.map(ele => ele.id);
      }
      if (ids.length === 0) {
        this.$message.error("请选择要删除的订单");
        return;
      }
      try {
        await this.$confirm("确定要删除该数据吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
        ids = ids.join(',')
        const res = await deleteOrderBatch(ids);
        if (res.data.code === 200) {
          this.$message.success("操作成功");
          await this.handleList();
        }
      } catch (error) {
        this.$message.error("已取消删除");
      }
    },
    to(operationState,row){
      this.$router.push({
        path: "/customer1/business/detail",
        query: {
          operationState,
          row
        }
      })
    },
    handleAdd() { // 新增
      this.$router.push({
        path: '/salesManage/saleOrder/add'
      })
    },
    handleEdit (row) { // 详情
      this.$router.push({
        path: '/salesManage/saleOrder/edit',
        query: {
          data: row
        }
      })
    },
    handleDetail (row) { // 详情
      this.$router.push({
        path: '/salesManage/saleOrder/detail',
        query: {
          data: row
        }
      })
    },
    async handleAduit (row) { // 审核
      let ids = [];
      if (row) {
        ids.push(row.id);
      } else {
        ids = this.multipleSelection.map(ele => ele.id);
      }
      if (ids.length === 0) {
        this.$message.error("请选择要审核的订单");
        return;
      }
      try {
        await this.$confirm("确定要审核该数据吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
        ids = ids.join(',')
        const res = await updateOrderStatus(ids);
        if (res.data.code === 200) {
          this.$message.success("操作成功");
          await this.handleList();
        }
      } catch (error) {
        this.$message.error("已取消审核");
      }
    },
    handleOutbound (id) { // 出库
      this.$router.push({
        path: '/salesManage/saleOrder/outbound',
        query: {
          id: id
        }
      })
    },
    handleReset (formName) { // 重置
       this.$refs[formName].resetFields();
       this.date = this.expectReceiveDate = []
       this.handleList()
    }
  },
  
  
};
</script>

<style lang="scss" scoped>
 
/deep/ .search-dialog{
  .el-dialog__body{
    padding-bottom:0px!important
  }
}

</style>
