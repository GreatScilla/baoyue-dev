//考核指标
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
        label-width="90px"
        class="form-footer"
      >
        <el-form-item label="考核年份">
          <div class="block">
            <el-date-picker
              v-model="searchForm.year"
              value-format="yyyy"
              format="yyyy"
              type="year"
              placeholder="选择年"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="考核月份">
          <div class="block,mentMonth">
            <el-date-picker
              class="assessmentMonth"
              v-model="searchForm.month"
              value-format="M"
              format="M"
              type="month"
              placeholder="选择月"
            >
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item class="search-footer">
          <el-button @click="reset()" size="small">重置</el-button>
          <el-button type="primary" size="small" @click="searchRole"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      class="search-dialog"
      :visible.sync="setDialogVisible"
      :before-close="handleClose"
      title="设置参考标准"
      append-to-body
      width="840px"
    >
      <el-row>
        <el-col :span="24">
          <table
            width="800"
            border="1"
            bordercolor="#d7d7d7"
            id="Aclass"
            cellpadding="5"
            cellspacing="15"
            align="center"
            bgcolor="black"
          >
            <tr bgcolor="#f2f2f2">
              <td width="25%">参考标准</td>
              <td width="25%">板材</td>
              <td width="25%">高精砌块</td>
              <td width="25%">加气砌块</td>
            </tr>
            <tr bgcolor="white">
              <td>干物料</td>
              <td>
                <el-input type="number" v-model="form.panelMaterial"></el-input>
              </td>
              <td>
                <el-input
                  type="number"
                  v-model="form.precisionBlockMaterial"
                ></el-input>
              </td>
              <td>
                <el-input
                  type="number"
                  v-model="form.aeratedBlockMaterial"
                ></el-input>
              </td>
            </tr>
            <tr bgcolor="white">
              <td>浇筑模数(模)</td>
              <td>
                <el-input type="number" v-model="form.panelModulus"></el-input>
              </td>
              <td>
                <el-input
                  type="number"
                  v-model="form.precisionBlockModulus"
                ></el-input>
              </td>
              <td>
                <el-input
                  type="number"
                  v-model="form.aeratedBlockModulus"
                ></el-input>
              </td>
            </tr>
            <tr bgcolor="white">
              <td>电使用量(度)</td>
              <td colspan="3">
                <el-input type="number" v-model="form.electric"></el-input>
              </td>
            </tr>
            <tr bgcolor="white">
              <td>燃气使用量(方)</td>
              <td colspan="3">
                <el-input type="number" v-model="form.fuelGas"></el-input>
              </td>
            </tr>
            <tr bgcolor="white">
              <td>电力单价(元/度)</td>
              <td colspan="3">
                <el-input type="number" v-model="form.electricUnit"></el-input>
              </td>
            </tr>
            <tr bgcolor="white">
              <td>燃气单价(元/方)</td>
              <td colspan="3">
                <el-input type="number" v-model="form.fuelGasUnit"></el-input>
              </td>
            </tr>
          </table>
        </el-col>
        <el-row>
          <el-col>
            <span class="dialog-footer">
              <el-button size="small" @click="setDialogVisible = false"
                >取 消</el-button
              >
              <el-button
                size="small"
                @click="setReferencestandard"
                type="primary"
                >确 定</el-button
              >
            </span></el-col
          >
        </el-row>
      </el-row>
    </el-dialog>
    <el-row style="margin: 20px 0">
      <el-button
        size="small"
        icon="el-icon-search"
        @click="searchDialogVisible = true"
        type="primary"
        >查询</el-button
      >
      <el-button
        size="small"
        icon="el-icon-plus"
        @click="handleAdd"
        type="primary"
        >新增</el-button
      >
      <el-button
        size="small"
        icon="el-icon-setting"
        @click="setDialogVisible = true"
        type="primary"
        >设置参考标准</el-button
      >
    </el-row>
    <el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%; margin-bottom: 20px"
        @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <!-- <el-table-column prop="receiptNo" label="单据编号"></el-table-column> -->
        <el-table-column prop="year" label="考核年份"></el-table-column>
        <el-table-column prop="month" label="考核月份"></el-table-column>
        <el-table-column prop="totalOutput" label="月产量"></el-table-column>
        <el-table-column prop="fuelGas" label="天然气使用量"></el-table-column>
        <el-table-column prop="electric" label="电量使用量"></el-table-column>
        <el-table-column prop="gasFee" label="燃气费"></el-table-column>
        <el-table-column prop="electricCharge" label="电费"></el-table-column>
        <el-table-column prop="" label="原材料消耗指标" width="200">
          <template slot-scope="scope">
            <span>
              <el-tooltip
                class="item"
                effect="dark"
                :content="scope.row.aeratedBlockMaterial"
                placement="top"
              >
                <span>加气砌块</span>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </span>
            <span>
              <el-tooltip
                class="item"
                effect="dark"
                :content="scope.row.precisionBlockMaterial"
                placement="top"
              >
                <span>高精砌砖</span>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </span>
            <span>
              <el-tooltip
                class="item"
                effect="dark"
                :content="scope.row.panelMaterial"
                placement="top"
                ><span>板材</span>
              </el-tooltip>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80" fixed="right">
          <template slot-scope="scope">
            <span>
              <el-tooltip
                class="item"
                effect="dark"
                content="编辑"
                placement="bottom"
              >
                <el-button
                  type="text"
                  size="small"
                  icon="el-icon-edit-outline"
                  @click="toEdit(scope.row)"
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </span>

            <router-link
              :to="{
                path: '/production-management/assessment-indicators/detail',
                query: { data: scope.row },
              }"
            >
              <el-tooltip
                class="item"
                effect="dark"
                content="详情"
                placement="bottom"
              >
                <el-button type="text" size="small" icon="el-icon-tickets">
                </el-button>
              </el-tooltip>
            </router-link>
          </template>
        </el-table-column>
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
      >
      </el-pagination>
    </el-row>
  </basic-container>
</template>

<script>
let recordObj = "";
import {
  getAssessmentIndicatorsList,
  getByReferenceStandard,
  ReferenceStandardSubmit,
} from "@/api/manufacture/assessment-indicators";
import paginationMixin from "@/mixins/pagination";
import { mapGetters } from "vuex";

export default {
  mixins: [paginationMixin],
  data() {
    return {
      form: {},
      referenceStandard: {},
      searchForm: {},
      recordForm: {}, //暂存数据
      tableData: [],
      multipleSelection: [],
      searchDialogVisible: false, //查询
      setDialogVisible: false,
    };
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "编辑考核指标" || from.name === "考核指标详情") {
      recordObj = JSON.parse(sessionStorage.getItem("recordForm"));
      next();
    } else {
      recordObj = "";
      next();
    }
  },
  beforeRouteLeave(to, from, next) {
    sessionStorage.setItem("recordForm", JSON.stringify(this.recordForm));
    next();
  },
  async created() {
    if (recordObj) {
      this.currentPage = recordObj.params.current;
      this.pageSize = recordObj.params.size;
      delete recordObj.params.current;
      this.searchForm = recordObj.data;
    }
    this.handleList();
    let res = await getByReferenceStandard();
    this.form = res.data.data;
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  methods: {
    async setReferencestandard() {
      var data = this.form;
      let res = await ReferenceStandardSubmit(data);
      if (res.data.code === 200) {
        this.$message.success({
          message: "操作成功",
        });
        this.setDialogVisible = false;
      }
    },
    // 表格多选
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    //新增
    handleAdd() {
      // 新增
      this.$router.push({
        path: "/production-management/assessment-indicators/add",
      });
    },
    //
    handleList() {
      let data = this.searchForm;
      let params = { current: this.currentPage, size: this.pageSize };
      this.recordForm = { data: data, params: params };
      getAssessmentIndicatorsList(data, params)
        .then((res) => {
          this.tableData = res.data.data.records;
          this.total = res.data.data.total;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // 查询
    searchRole() {
      this.currentPage = 1;
      this.handleList();
      this.searchDialogVisible = false;
    },
    //重置
    reset() {
      this.searchForm = {};
      this.handleList();
      this.searchDialogVisible = false;
    },
    //跳转编辑
    toEdit(data) {
      this.$router.push({
        path: "/production-management/assessment-indicators/edit",
        query: { data: data },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
// 处理input type = number的上下箭头
/deep/input::-webkit-outer-spin-button,
/deep/input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}
/deep/input[type="number"] {
  -moz-appearance: textfield;
}

#Aclass {
  /deep/.el-input {
    width: 100% !important;
    z-index: 2;
  }
  td {
    vertical-align: middle;
    text-align: center;
  }
  /deep/.el-input__inner {
    text-align: center;
  }
  .footerBut {
    padding-top: 10px;
  }
}
// .el-date-picker__header{
//     display: none;
// }
</style>
