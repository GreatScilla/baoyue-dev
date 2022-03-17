// 选择订单
<template>
  <div>
    <el-dialog
      :title="'选择科目'"
      append-to-body
      :visible.sync="visible"
      :before-close="handleClose"
      width="80%"
    >
      <el-row>
        <el-col :span="8">
          <div class="el-dialog__title">已选择：</div>
          <div class="picked">
            贷方：{{
              picked[0].FNumber +
              (picked[0].FName ? " - " : "") +
              picked[0].FName
            }}
          </div>
          <div class="picked">
            借方：{{
              picked[1].FNumber +
              (picked[1].FName ? " - " : "") +
              picked[1].FName
            }}
          </div>
          <div class="picked">凭证：{{ picked[2].FName }}</div>
        </el-col>
        <el-col :span="16">
          <el-row style="align-items: center">
            <el-col :span="8">
              <el-radio v-model="showUser" :label="0">贷方</el-radio>
              <el-radio v-model="showUser" :label="1">借方</el-radio>
              <el-radio v-model="showUser" :label="2">凭证</el-radio>
            </el-col>
            <el-col style="display: flex" :span="16">
              <el-input
                class="search-input"
                v-model="query"
                placeholder="查询科目名称"
                size="small"
                clearable
                @clear="searchingQuery = ''"
              ></el-input>
              <el-button type="primary" size="small" @click="searchQuery"
                >搜索</el-button
              >
            </el-col>
          </el-row>
          <el-table
            :data="list"
            row-key="FNumber"
            v-loading="loading"
            highlight-current-row
            @row-click="selectRow"
            height="300px"
          >
            <el-table-column
              label="科目编码"
              prop="FNumber"
              type=""
            ></el-table-column>
            <el-table-column label="科目名称" prop="FName"></el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalData"
            background
          >
          </el-pagination>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancel"> 取 消 </el-button>
        <el-button size="small" type="primary" @click="confirm">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getFinancialToken,
  getFinancialSubject,
  getVoucher,
} from "@/api/financial/financial";
import paginationMixin from "@/mixins/pagination";
export default {
  name: "customer",
  mixins: [paginationMixin],
  props: {
    visible: Boolean,
  },
  data() {
    return {
      clickRowData: {},
      data: [[], [], []],
      data1: [],
      loading: false,
      picked: [
        { FNumber: "", FName: "" },
        { FNumber: "", FName: "" },
        { FName: "" },
      ],
      showUser: "0",
      searchingQuery: "",
      query: "",
      // 当前选中行
      //   option: {
      //     addBtn: false,
      //     menu: false,
      //     refreshBtn: false,
      //     columnBtn: false,
      //     rowKey: "code",
      //     expandRowKeys: "name",
      //     column: [
      //       {
      //         label: "科目编码",
      //         prop: "code",
      //         type: "",
      //       },
      //       {
      //         label: "科目名称",
      //         prop: "name",
      //       },
      //     ],
      //   },
    };
  },
  created() {
    this.init();
  },
  computed: {
    sdata() {
      if (this.searchingQuery != "" && this.showUser == 1)
        return this.data1.filter(
          (x) => x.FName.indexOf(this.searchingQuery) > -1
        );
      return this.data[this.showUser].filter(
        (x) => x.FName.indexOf(this.searchingQuery) > -1
      );
    },
    list() {
      let e = this.currentPage * this.pageSize;
      return this.sdata.filter((x, i) => i >= e - this.pageSize && i < e);
    },
    totalData() {
      return this.sdata.length;
    },
  },
  watch: {
    showUser(e) {
      this.query = "";
      this.searchingQuery = "";
      this.currentPage = 1;
    },
  },
  methods: {
    async init() {
      this.loading = true;
      const res1 = await getFinancialToken();
      if(res1.data.code===200){
          this.token = res1.data.Data.Token;
      }
      //0贷方 1借方
      const res2 = await getFinancialSubject({ token: this.token, fdc: 0 });
      this.data[0] = res2.data.Data.Data;
      const res3 = await getFinancialSubject({ token: this.token, fdc: 1 });
      this.data1 = res3.data.Data.Data;
      this.data[1] = this.treelize(res3.data.Data.Data);
      const res4 = await getVoucher({ token: this.token });
      this.data[2] = res4.data.Data.Data;
      this.showUser = 0;
      this.loading = false;
    },
    treelize(data) {
      if (data.length == 0) return [];
      const tree = [];
      let l = 0;
      let l1 = 0;
      let l2 = 0;
      let add = (f, s) => {
        f.push({
          FAccountID: s.FAccountID,
          FName: s.FName,
          FNumber: s.FNumber,
        });
      };
      add(tree, data[0]);
      for (let i = 1; i < data.length; i++) {
        let s = data[i].FNumber.split(".");
        if (s[2]) {
          l = 2;
          if (!tree[l1].children[l2].children)
            tree[l1].children[l2].children = [];
          add(tree[l1].children[l2].children, data[i]);
        } else if (s[1]) {
          if (!tree[l1].children) tree[l1].children = [];
          add(tree[l1].children, data[i]);
          if (l < 1) {
            l2 = 0;
          } else l2++;
          l = 1;
        } else {
          add(tree, data[i]);
          l1++;
          if (l > 0) {
            l = 0;
            l2 = 0;
          }
        }
      }
      return tree;
    },
    confirm() {
      if (this.picked.filter((x) => x.FName == "").length > 0)
        return this.$message.warning("请选择借/贷方和凭证！");
      this.$emit("selected", {
        picked: this.picked,
        token: this.token,
      });
      this.closeDialog();
    },
    selectRow(row) {
      this.picked[this.showUser] = row;
      this.$forceUpdate();
    },
    cancel() {
      this.closeDialog();
    },
    handleClose() {
      this.closeDialog();
    },
    closeDialog() {
      this.$emit("update:visible", false);
    },
    searchQuery() {
      this.searchingQuery = this.query;
    },
  },
};
</script>

<style lang="scss" scoped>
.picked {
  margin-top: 30px;
}
</style>