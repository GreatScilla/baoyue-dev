// 库存查看
<template>
  <basic-container>
    <!-- 操作功能 -->
    <el-row class="operation-function">
      <el-button size="small" icon="el-icon-search" type="primary" @click="searchDialogVisible = true">查 询</el-button>
      <!-- <el-button size="small" icon="el-icon-plus" type="primary" @click="">导出</el-button> -->
    </el-row>
    <el-divider></el-divider>
    <!-- 搜索 -->
    <!-- <el-row>
      <el-form
        :inline="true"
        :model="stockCheckDetailsSearchForm"
        ref="setUpForm"
      >
        <el-form-item label="产品名称:">
          <el-input
            size="small"
            placeholder="请输入名称"
            v-model="stockCheckDetailsSearchForm.productName">
          </el-input>
        </el-form-item>
        <el-form-item label-width="100px" label="类型:">
          <el-select size="small" v-model="stockCheckDetailsSearchForm.subType" clearable  placeholder="请选择类型">
            <el-option
              v-for="item in warehouseOptions"
              :key="item.id"
              :label="item.depotName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="100px" label="仓库名称:">
          <el-select size="small" v-model="stockCheckDetailsSearchForm.depotId" clearable  placeholder="请选择仓库名称">
            <el-option
              v-for="item in warehouseOptions"
              :key="item.id"
              :label="item.depotName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-row>
          <el-form-item label="单据日期:">
            <el-date-picker
              size="small"
              v-model="documentTime"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              @change="changeDatePicker"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item style="margin-left:20px;margin-top:-1px">
            <el-button size="small" type="primary" @click="searchStockCheck">查询</el-button>
            <el-button size="small" @click="reset">重置</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-row>
    <el-row style="margin-bottom: 20px;">
      <el-button size="small" icon="el-icon-upload2" type="primary" @click="to('add')">导出</el-button>
    </el-row> -->
    <!-- 表格 -->
    <el-row>
      <el-table
        @selection-change="handleSelectionChange"
        :data="stockCheckDetailsTableData"
        border
      >
        <el-table-column type="selection" width="60">
        </el-table-column>
        <el-table-column prop="productSn" label="产品编号" width="150" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="productName" label="产品名称">
        </el-table-column>
        <el-table-column prop="productType" label="产品规格" width="150" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="productCate" label="产品分类">
        </el-table-column>
        <el-table-column prop="depotName" label="所属仓库">
        </el-table-column>
        <el-table-column prop="date" label="出入库时间" width="150" show-overflow-tooltip>
        </el-table-column>
         <el-table-column prop="subType" label="类型">
        </el-table-column>
        <el-table-column prop="operNumber" label="出入库数量" width="150" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="stock" label="库存量">
        </el-table-column>
        <el-table-column prop="unitPrice" label="单价">
        </el-table-column>
        <el-table-column prop="createUser" label="制单人">
        </el-table-column>
      </el-table>
    </el-row>
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
import {detailsStockCheckPage} from "@/api/storageManage/stockCheck";
import {getWarehouseList} from "@/api/base-data/warehouseSetup"
import paginationMixin from "@/mixins/pagination";
import { getDictionary } from "@/api/system/dictbiz";
export default {
  mixins: [paginationMixin],
  data() {
    return {
      stockCheckDetailsSearchForm:{},
      stockCheckDetailsTableData: [],
      warehouseOptions:[],
      documentTime:[],
      searchDialogVisible:false,
      column:[
        {
          label:'产品名称',
          prop: "productName",
        }, {
          label:'类型',
          prop: "typeClassId",
          type:"select",
          dicData: [],
          props: {
            label: 'dictValue',
            value: 'dictKey'
          },
        },
        {
          label:'仓库名称',
          prop: "depotId",
          type:"select",
          dicData: [],
          props: {
            label: 'depotName',
            value: 'id'
          },
        },{
          label:'单据日期',
          prop: "billDate",
          type: "daterange",
          format:'yyyy-MM-dd',
          valueFormat:'yyyy-MM-dd',
        }
      ],
    };
  },
  created(){
    this.handleList()
    this.initResources()
  },
  methods: {
    // 查询分页
    async handleList(...arg) {
      let params = {current:this.currentPage,size:this.pageSize,productId:this.$route.query.row.productId}
      if (arg.length>0) {
        params = Object.assign(params,arg[0])
      }
      let res = await detailsStockCheckPage(params)
      this.stockCheckDetailsTableData = res.data.data.records
      this.total = res.data.data.total
    },
    // 获取产品分类以及仓库
    async initResources(){
      let res = await Promise.all([getWarehouseList(),getDictionary({code:'out_type_class'}),getDictionary({code:'in_type_class'})])
      
      this.warehouseOptions  = res[0].data.data

      // 查询仓库名称下拉框
      let options = this.findObject(this.column, 'depotId')
      options.dicData = this.warehouseOptions

      // 查询类型下拉框
      let typeClass = this.findObject(this.column, 'typeClassId')
      typeClass.dicData = res[1].data.data.concat(res[2].data.data )
    },
    // 选择时间
    changeDatePicker(value){
      this.stockCheckDetailsSearchForm.beginTime = value[0]
      this.stockCheckDetailsSearchForm.endTime = value[1]
    },
    // 查询
    onSearch(value){
      if (value) {
        value.beginTime = value.billDate[0]
        value.endTime = value.billDate[1]
        delete value['billDate']
        this.handleList(value)
      }
      this.searchDialogVisible = false
    },
    // 查询
    searchStockCheck(){
      this.handleList(this.stockCheckDetailsSearchForm)
    },
    // 重置
    reset(){
      this.stockCheckDetailsSearchForm = {}
      this.documentTime = []
      this.handleList()
    },
  }
};
</script>

<style lang="scss" scoped>
 
.el-input,.el-select{
  width:160px
}
</style>
