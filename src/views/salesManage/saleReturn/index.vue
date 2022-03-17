// 销售退货
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
      <el-form ref="form" :model="form" label-width="90px" class="form-footer">
        <el-row>
          <el-form-item label="退货状态:" prop="refundStatus">
            <el-select v-model="form.refundStatus">
              <el-option :value="1" label="待入库"></el-option>
              <el-option :value="2" label="部分入库"></el-option>
              <el-option :value="3" label="入库待审核"></el-option>
              <el-option :value="4" label="已入库"></el-option>
              <el-option :value="5" label="已关闭"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单据编号:" prop="returnOrderSn">
            <el-input
              placeholder="请输入单据编号"
              v-model="form.returnOrderSn"
            ></el-input>
          </el-form-item>
          <el-form-item label="客户名称:" prop="memberUserName">
            <el-input
              placeholder="请输入客户名称"
              v-model="form.memberUserName"
            ></el-input>
          </el-form-item>
          <el-form-item label="项目名称:" prop="projectName">
            <el-input
              placeholder="请输入项目名称"
              v-model="form.projectName"
            ></el-input>
          </el-form-item>
          <el-form-item label="退货金额:">
            <div class="allNum">
              <el-select
                size="small"
                v-model="form.returnAmountType"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in orderAllNumTypeList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                >
                </el-option>
              </el-select>
              <div style="text-algin: center; color: #dddfe7; padding: 0 10px">
                一
              </div>
              <el-input
                placeholder="请输入"
                v-model="form.returnAmount"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item label="制单人:" prop="createUserName">
            <el-input
              placeholder="请输入制单人"
              v-model="form.createUserName"
            ></el-input>
          </el-form-item>
          <el-form-item label="审核人:" prop="checkPerson">
            <el-input
              placeholder="请输入审核人"
              v-model="form.checkPerson"
            ></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="单据日期" prop="date">
            <el-date-picker
              v-model="form.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="changeTime"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
          </el-form-item>
          <!-- <el-form-item label="交货日期">
            <el-date-picker
                v-model="value1"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
          </el-form-item> -->
          <el-form-item class="search-footer">
            <el-button size="small" @click="handleReset()">重置</el-button>
            <el-button type="primary" size="small" @click="onSearch"
              >查询</el-button
            >
          </el-form-item>
        </el-row>
      </el-form>
    </el-dialog>
    <el-row style="margin-bottom: 20px">
      <el-button
        v-if="permission.sale_return_expore"
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
      >
        查 询
      </el-button>
      <el-button
        v-if="permission.sale_return_add"
        size="small"
        icon="el-icon-plus"
        type="primary"
        @click="handleAdd"
        >新增</el-button
      >
      <!-- <el-button
        v-if="permission.sale_return_aduit"
        size="small"
        icon="el-icon-s-check"
        type="success"
        plain
        @click="handleAudit()"
        >批量提交审核</el-button
      > -->
      <el-button
        v-if="permission.sale_return_delete"
        size="small"
        icon="el-icon-delete"
        type="danger"
        plain
        @click="handleDelete()"
        >批量删除</el-button
      >
      <!-- <el-button
        size="small"
        icon="el-icon-printer"
        plain
        @click="handlePrinter()"
        >打印</el-button
      > -->
    </el-row>
    <el-row>
      <el-table
        @selection-change="handleSelectionChange"
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="status" label="单据状态">
          <template slot-scope="{ row }">
            <span>{{ row.status | approvalName }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="procName" label="附件">
          <template slot-scope="{row}">
            <el-image style="width: 100px; height: 100px" :src="row.file" fit="scale-down">
            </el-image>
          </template> -->
        <!-- </el-table-column> -->
        <el-table-column prop="returnOrderSn" label="单据编号" width="160px">
          <template slot-scope="scope">
            <el-tooltip>
              <div slot="content" style="font-size: 14px">
                <div style="padding: 0 0 10px 0; font-size: 16px">产品信息</div>
                <table
                  border="1px solid #dedede"
                  id="Aclass"
                  cellpadding="1"
                  cellspacing="1"
                  align="center"
                  bgcolor="#303133"
                >
                  <tr bgcolor="#303133">
                    <td>产品编码</td>
                    <td>产品名称</td>
                    <td>规格型号</td>
                    <td>强度</td>
                    <td>密度</td>
                    <td>单位</td>
                    <td>数量</td>
                    <td>仓库名称</td>
                    <td>单价</td>
                    <td>退货金额</td>
                    <td>退货类型</td>
                  </tr>
                  <tr v-if="scope.row.shopOrderReturnDetail.length == 0">
                    <td colspan="11" style="text-align: center">暂无内容</td>
                  </tr>
                  <tr
                    v-else
                    bgcolor="#303133"
                    v-for="(item, index) in scope.row.shopOrderReturnDetail"
                    :key="index"
                  >
                    <td width="auto">{{ item.productSn }}</td>
                    <td width="auto">{{ item.productName }}</td>
                    <td width="auto">{{ item.model }}</td>
                    <td width="auto">{{ item.intensity }}</td>
                    <td width="auto">{{ item.density }}</td>
                    <td width="auto">{{ item.sp1 }}</td>
                    <td width="auto">{{ item.productNum }}</td>
                    <td width="auto">{{ item.depotName }}</td>
                    <td width="auto">{{ item.productPrice }}</td>
                    <td width="auto">{{ item.allPrice }}</td>
                    <td width="auto">{{ item.typeName }}</td>
                  </tr>
                </table>
                <div>
                  <div style="padding: 10px 0; font-size: 16px">其他信息</div>
                  <div style="display: flex">
                    <div style="flex: 1; text-algin: left">
                      车辆号:{{ scope.row.licenseNumber }}
                    </div>
                    <div style="flex: 1; text-algin: left">
                      托盘数量:{{ scope.row.trayNum }}
                    </div>
                  </div>
                </div>
              </div>
              <div>{{ scope.row.returnOrderSn }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="单据日期" width="160px">
        </el-table-column>
        <el-table-column prop="memberUserName" label="客户名称">
        </el-table-column>
        <el-table-column prop="projectName" label="项目名称" width="100px">
        </el-table-column>
        <el-table-column prop="returnAmount" label="退货金额">
        </el-table-column>
        <el-table-column prop="createUserName" label="制单人">
        </el-table-column>
        <el-table-column prop="checkPerson" label="审核人"> </el-table-column>
        <el-table-column width="130" label="操作" fixed="right">
          <template slot-scope="scope">
            <el-tooltip
              v-if="permission.sale_return_aduit"
              class="item"
              effect="dark"
              content="提交审核"
              placement="bottom"
            >
              <el-button
                type="text"
                size="small"
                icon="el-icon-s-check"
                :loading="auditLoading"
                @click="handleAudit(scope.row)"
                :disabled="scope.row.status !== 0"
              >
              </el-button>
            </el-tooltip>
            <el-divider direction="vertical"></el-divider>
            <el-tooltip
              v-if="permission.sale_return_edit"
              class="item"
              effect="dark"
              content="编辑"
              placement="bottom"
            >
              <el-button
                type="text"
                size="small"
                icon="el-icon-edit-outline"
                @click="handleEdit(scope.row)"
                :disabled="scope.row.status !== 0"
              >
              </el-button>
            </el-tooltip>
            <el-divider direction="vertical"></el-divider>
            <el-tooltip
              v-if="permission.sale_return_detail"
              class="item"
              effect="dark"
              content="详情"
              placement="bottom"
            >
              <el-button
                type="text"
                size="small"
                icon="el-icon-tickets"
                @click="handleDetail(scope.row)"
              >
              </el-button>
            </el-tooltip>
            <el-divider direction="vertical"></el-divider>
            <el-tooltip
              v-if="permission.sale_return_delete"
              class="item"
              effect="dark"
              content="删除"
              placement="bottom"
            >
              <el-button
                type="text"
                size="small"
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
                :disabled="scope.row.status !== 0"
              >
              </el-button>
            </el-tooltip>
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
import { getOrderReturn, deleteApi, audit } from "@/api/salesManage/saleReturn";
import paginationMixin from "@/mixins/pagination";
import deleteOrAudit from "@/mixins/deleteOrAudit";
import { mapGetters } from "vuex";
export default {
  mixins: [paginationMixin, deleteOrAudit],
  name: "saleReturn",
  data() {
    return {
      orderAllNumTypeList: [
        { code: 1, name: "大于" },
        { code: 2, name: "等于" },
        { code: 3, name: "小于" },
        { code: 4, name: "大于等于" },
        { code: 5, name: "小于等于" },
      ],
      tableData: [
        {
          productNum: "",
        },
      ],
      multipleSelection: [],
      form: {
        endTime: "",
        startTime: "",
        returnOrderSn: "",
        refundStatus: "",
        memberUserName: "",
        returnAmountType: "",
        date: [], // 单据日期
      },
      recordForm: {}, //暂存数据
      deleteApi: deleteApi,
      auditApi: audit,
      searchDialogVisible: false,
                auditLoading:false,
    };
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "编辑销售退货" || from.name === "销售退货详情") {
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
      this.currentPage = recordObj.pageNum;
      this.pageSize = recordObj.pageSize;
      delete recordObj.pageNum;
      this.form = recordObj.data;
    }
    this.handleList();
  },
  computed: {
    ...mapGetters(["userInfo", "permission"]),
  },
  methods: {
    //查询
    onSearch() {
      this.currentPage = 1;
      this.handleList();
      this.searchDialogVisible = false;
    },
    async handleList() {
      if (this.form.returnAmountType && !this.form.returnAmount) {
        return this.$message.warning("请输入退货金额");
      }
      const params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        data: this.form,
      };
      this.recordForm = params;
      const res = await getOrderReturn(params);
      this.tableData = res.data.data.records;
      this.total = res.data.data.total;
      this.searchDialogVisible = false;
    },
    handleReset() {
      // 重置
      this.currentPage = 1;
      this.form = {};
      this.handleList();
      this.searchDialogVisible = false;
    },
    // async handleDelete(row) {
    //   let ids = [];
    //   if (row) {
    //     ids.push(row.id);
    //   } else {
    //     ids = this.multipleSelection.map(ele => ele.id);
    //   }
    //   if (ids.length === 0) {
    //     this.$message.error("请选择要删除的工序");
    //     return;
    //   }
    //   try {
    //     await this.$confirm("确定要删除该数据吗?", "提示", {
    //       confirmButtonText: "确定",
    //       cancelButtonText: "取消",
    //       type: "warning"
    //     });
    //     const res = await deleteProcess(ids);
    //     if (res.data.code === 200) {
    //       this.$message.success("操作成功");
    //       await this.handleList();
    //     }
    //   } catch (error) {
    //     this.$message.error("已取消删除");
    //   }
    // },
    handleAdd() {
      // 新增
      this.$router.push({
        path: "/salesManage/saleReturn/add",
      });
    },
    changeTime(value) {
      if (value !== null) {
        this.form.startTime = value[0];
        this.form.endTime = value[1];
      } else {
        this.form.startTime = this.form.endTime = "";
      }
    },
    handleEdit(row) {
      this.$router.push({
        path: "/salesManage/saleReturn/edit",
        query: {
          data: row,
        },
      });
    },
    handleDetail(row) {
      this.$router.push({
        path: "/salesManage/saleReturn/detail",
        query: {
          data: row,
        },
      });
    },
    handleClose() {
      this.searchDialogVisible = false;
    },
  },
  filters: {
    typeName(val) {
      if (val === 0) {
        return (val = "扣数");
      } else if (val === 1) {
        return (val = "退回");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#Aclass {
  font-size: 14px;
  td {
    vertical-align: middle;
    text-align: center;
    padding: 5px;
  }
  /deep/.el-input__inner {
    text-align: center;
  }
}
.allNum {
  display: flex;
  /deep/.el-input {
    width: 100px !important;
  }
  /deep/.el-select {
    width: 100px !important;
  }
}
</style>
