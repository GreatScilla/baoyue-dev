//销售出库明细表
<template>
  <basic-container>
    <el-dialog
      class="search-dialog"
      :visible.sync="searchDialogVisible"
      :before-close="handleClose"
      title="查询条件"
      append-to-body
      width="640px"
    >
      <el-form
        ref="searchForm"
        :model="searchForm"
        label-width="100px"
        class="form-footer"
      >
        <el-form-item label="产品名称">
          <el-input v-model="searchForm.product_name" clearable></el-input>
        </el-form-item>
        <el-form-item label="出库单号">
          <el-input v-model="searchForm.number" clearable></el-input>
        </el-form-item>
        <el-form-item label="产品编码">
          <el-input v-model="searchForm.product_sn" clearable></el-input>
        </el-form-item>
        <el-form-item label="规格型号">
          <el-input v-model="searchForm.product_type" clearable></el-input>
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input v-model="searchForm.project_name" clearable></el-input>
        </el-form-item>
        <el-form-item label="客户名称">
          <el-input v-model="searchForm.organ_name" clearable></el-input>
        </el-form-item>
        <el-form-item label="开始日期">
          <el-date-picker
            value-format="yyyy-MM-dd 00:00:00"
            v-model="searchForm.startTime"
            type="date"
            placeholder="请选择"
            clearable
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束日期">
          <el-date-picker
            value-format="yyyy-MM-dd 23:59:59"
            v-model="searchForm.endTime"
            type="date"
            placeholder="请选择"
            clearable
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item class="search-footer">
          <el-button @click="reset" size="small">重置</el-button>
          <el-button type="primary" size="small" @click="searchRole"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-row style="margin: 10px 0">
      <el-button
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        >查询</el-button
      >
      <el-button
        @click="exports(exportApi, searchForm)"
        size="small"
        title="快速导出"
        icon="el-icon-download"
        >快速导出</el-button
      >

      <el-button
        @click="exportList"
        title="按格式导出"
        size="small"
        icon="el-icon-download"
        :loading="loading"
        >按格式导出</el-button
      >

      <el-button
        @click="getPdf(pdfApi, searchForm)"
        size="small"
        icon="el-icon-printer"
        >打印</el-button
      >
    </el-row>
    <el-row>
      <el-table
        :data="tableData"
        :span-method="objectSpanMethod"
        border
        ref="exportTableRef1"
        style="width: 100%; margin-bottom: 20px"
        @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column width="126" prop="number" label="出库单号">
        </el-table-column>
        <el-table-column prop="check_time" label="日期"></el-table-column>
        <el-table-column
          prop="hands_person_name"
          label="销售员"
        ></el-table-column>
        <el-table-column prop="organ_name" label="客户名称"></el-table-column>
        <el-table-column prop="project_name" label="项目名称"></el-table-column>
        <el-table-column
          prop="license_number"
          label="运输车辆"
        ></el-table-column>
        <el-table-column prop="product_name" label="产品名称"></el-table-column>
        <el-table-column prop="product_cate" label="产品分类"></el-table-column>
        <el-table-column prop="product_type" label="规格型号"></el-table-column>
        <el-table-column prop="intensity" label="强度"></el-table-column>
        <el-table-column prop="density" label="密度"></el-table-column>
        <el-table-column prop="oper_number" label="发货数量"></el-table-column>
        <el-table-column prop="goods_number" label="扣数"></el-table-column>
        <el-table-column
          prop="number_buttons"
          label="收货数量"
        ></el-table-column>
        <el-table-column prop="unit" label="单位"></el-table-column>
        <el-table-column prop="state" label="单据是否已回"></el-table-column>
        <el-table-column prop="volumeAlias" label="单位体积"></el-table-column>
        <el-table-column prop="aa" label="发货块数"></el-table-column>
        <el-table-column prop="bb" label="扣数/退回数"></el-table-column>
        <el-table-column prop="cc" label="收货块数"></el-table-column>
        <el-table-column prop="unit_price" label="单价"></el-table-column>
        <el-table-column prop="all_price" label="金额"></el-table-column>
        <el-table-column prop="aTrayNum" label="带出托盘"></el-table-column>
        <el-table-column prop="bTrayNum" label="带回托盘"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
      </el-table>
    </el-row>
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
      ></el-pagination>
    </el-row>
  </basic-container>
</template>

<script>
import XLSX from "xlsx";
import FileSaver from "file-saver";
import { getShopCome, getShopComeExport } from "@/api/salesManage/reportForm";
import paginationMixin from "@/mixins/pagination";
import exportMixin from "@/mixins/reportForm";
import { mapGetters } from "vuex";

export default {
  mixins: [paginationMixin, exportMixin],

  data() {
    return {
      searchForm: {},
      tableData: [],
      spanArr: [],
      pos: 0,
      loading: false,
      searchDialogVisible: false,
      multipleSelection: [],
      exportApi: getShopComeExport,
      pdfApi: "/erp/shopOrder/getShopComeReportPDF",
    };
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  async created() {
    this.handleList();
  },
  methods: {
    //导出
    exportList() {
      this.$confirm("是否导出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.pageSize = this.total;
          this.handleList(this.searchForm);
          this.loading = true;
          setTimeout(() => {
            var xlsxParam = { raw: true }; //转换成excel时，使用原始的格式
            var wb = XLSX.utils.table_to_book(
              document.querySelector(".el-table"),
              xlsxParam
            );
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            if (month < 10) {
              month = "0" + month;
            }
            if (day < 10) {
              day = "0" + day;
            }
            var nowDate = year + "年" + month + "月" + day + "日";
            const filename = "销售出库明细表" + nowDate + ".xlsx";
            /* get binary string as output */
            var wbout = XLSX.write(wb, {
              bookType: "xlsx",
              bookSST: true,
              type: "array",
            });
            try {
              FileSaver.saveAs(
                new Blob([wbout], { type: "application/octet-stream" }),
                filename
              );
            } catch (e) {
              if (typeof console !== "undefined") console.log(e, wbout);
            }
            //在此处更改回来
            this.loading = false;
            this.pageSize = 10;
            this.handleList(this.searchForm);
            this.$message({
              type: "success",
              message: "导出成功!",
            });
            return wbout;
          }, 20000);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消导出",
          });
        });
      //this.reset()
    },
    // exportList() {
    //   var date = new Date();
    //   var year = date.getFullYear();
    //   var month = date.getMonth() + 1;
    //   var day = date.getDate();
    //   if (month < 10) {
    //     month = "0" + month;
    //   }
    //   if (day < 10) {
    //     day = "0" + day;
    //   }
    //   var nowDate = year + "年" + month + "月" + day + "日";
    //   const el = this.$refs.exportTableRef1.$el;
    //   const filename = "销售出库明细表" + nowDate + ".xlsx";
    //   const wb = XLSX.utils.table_to_book(el);
    //   const wbout = XLSX.write(wb, {
    //     bookType: "xlsx",
    //     bookSST: true,
    //     type: "array",
    //   });
    //   try {
    //     FileSaver.saveAs(
    //       new Blob([wbout], { type: "application/octet-stream" }),
    //       filename
    //     );
    //   } catch (e) {
    //     console.log(e);
    //   }
    //   return wbout;
    // },
    //合并
    getSpanArr(data) {
      let that = this;
      that.spanArr = [];
      that.pos = 0;
      data.forEach((item, index) => {
        if (index === 0) {
          this.spanArr.push(1);
          this.pos = 0;
        } else {
          if (data[index].number === data[index - 1].number) {
            this.spanArr[this.pos] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1);
            this.pos = index;
          }
        }
      });
    },

    objectSpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      } else if (columnIndex === 22) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      } else {
        return false;
      }
    },

    // 表格多选
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },

    // 查询角色
    async handleList(...arg) {
      let params = { current: this.currentPage, size: this.pageSize };
      if (arg.length > 0) {
        params = Object.assign(params, arg[0]);
      }
      getShopCome(params)
        .then((res) => {
          this.tableData = res.data.data.records;
          this.total = res.data.data.total;
          this.getSpanArr(this.tableData);
        })
        .catch((err) => {
          // 在这里输出超时错误，并进行处理
          console.log("err", err);
        });

      // const res = await getShopCome(params);
      // this.tableData = res.data.data.records;
      // this.total = res.data.data.total;
    },
    // 搜索
    searchRole() {
      this.currentPage = 1;
      this.handleList(this.searchForm);
      this.searchDialogVisible = false;
    },
    //重置
    reset() {
      this.searchForm = {};
      this.handleList(this.searchForm);
      // this.searchDialogVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
