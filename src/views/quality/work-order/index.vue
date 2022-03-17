// 质检工单
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
        <el-form-item label="单据编号">
          <el-input
            placeholder="请输入单据编号"
            v-model="searchForm.workOrderNo"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属计划">
          <el-input
            placeholder="请输入所属计划编号"
            v-model="searchForm.planNo"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属任务">
          <el-input
            placeholder="请输入所属任务编号"
            v-model="searchForm.taskNo"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="执行人">
          <el-input
            class="iptWidth"
            v-model="searchForm.userName"
            suffix-icon="el-icon-search"
            placeholder="请选择执行人"
            @focus="checkUserSearchVisible = true"
          ></el-input>
        </el-form-item> -->
        <el-form-item label="工单状态">
          <el-select v-model="searchForm.workOrderStatus" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="执行人">
          <el-select v-model="searchForm.executeUserId" placeholder="请选择">
            <el-option
              v-for="item in options1"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工单开始时间">
          <el-date-picker
            class="iptWidth"
            v-model="searchForm.workOrderBeginTime"
            value-format="yyyy-MM-dd 00:00:00"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="工单结束时间">
          <el-date-picker
            class="iptWidth"
            v-model="searchForm.workOrderEndTime"
            value-format="yyyy-MM-dd 23:59:59"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="报工时间">
          <el-date-picker
            @change="changeTime"
            v-model="date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
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
    <el-row style="margin-bottom: 10px">
      <el-button
        v-if="permission.qualitytask_expore"
        size="small"
        icon="el-icon-search"
        type="primary"
        @click="searchDialogVisible = true"
        >查 询</el-button
      >
      <el-button
        v-if="permission.qualityWorkOrder_add"
        size="small"
        icon="el-icon-plus"
        type="primary"
        @click="add"
        >新增</el-button
      >

      <el-button
        v-if="permission.qualityWorkOrder_delete"
        plain
        size="small"
        @click="handleDelRole()"
        >批量删除</el-button
      >
      <!-- <el-button
        v-if="permission.qualityWorkOrder_printer"
        size="small"
        icon="el-icon-printer"
        plain
        @click="handlePrinter('WorkOrderV.1.5.0化验单.ureport')"
        >导出</el-button
      > -->
    </el-row>
    <el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%; margin-bottom: 20px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            {{ scope.row.status | statusName }}
          </template>
        </el-table-column>
        <el-table-column
          prop="workOrderNo"
          width="140"
          label="单据编号"
        ></el-table-column>
        <el-table-column
          prop="planNo"
          width="130"
          label="所属计划"
        ></el-table-column>
        <el-table-column
          prop="taskNo"
          width="130"
          label="所属任务"
        ></el-table-column>
        <el-table-column width="130" prop="productSn" label="产品编号">
        </el-table-column>
        <el-table-column prop="productName" label="产品名称"> </el-table-column>
        <el-table-column prop="model" label="规格型号"> </el-table-column>
        <el-table-column prop="labName" label="执行单位"></el-table-column>
        <el-table-column width="100" prop="executeUserName" label="执行人">
          <template slot-scope="scope">
            <div class="ellipsis">
              {{ scope.row.executeUserName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="hour" label="工时"></el-table-column>
        <el-table-column
          width="120"
          prop="batchNo"
          label="批次批号"
        ></el-table-column>
        <el-table-column
          width="150"
          prop="operationUserName"
          label="签收人/退回人"
        ></el-table-column>
        <el-table-column
          width="150"
          prop="workOrderBeginTime"
          label="工单开始日期"
        ></el-table-column>
        <el-table-column
          width="150"
          prop="workOrderEndTime"
          label="工单结束日期"
        ></el-table-column>
        <el-table-column prop="reportStatus" label="报工状态">
          <template slot-scope="scope">
            {{ scope.row.reportStatus === 0 ? "未报工" : "报工" }}
          </template>
        </el-table-column>
        <el-table-column width="210" label="操作" fixed="right">
          <template slot-scope="scope">
            <span v-if="permission.qualityWorkOrder_signfor">
              <el-tooltip
                v-if="scope.row.status === 1"
                class="item"
                effect="dark"
                content="签收"
                placement="bottom"
              >
                <el-button
                  type="text"
                  size="small"
                  icon="el-icon-edit"
                  @click="operation(scope.row)"
                ></el-button>
              </el-tooltip>
              <el-divider
                v-if="scope.row.status === 1"
                direction="vertical"
              ></el-divider>
            </span>
            <span v-if="permission.qualityWorkOrder_issue">
              <el-tooltip
                v-if="scope.row.status === 2"
                class="item"
                effect="dark"
                content="报工"
                placement="bottom"
              >
                <el-button
                  :disabled="scope.row.reportStatus === 1"
                  type="text"
                  size="small"
                  icon="el-icon-thumb"
                  @click="openlssueDialog(scope.row)"
                ></el-button>
              </el-tooltip>
              <el-divider
                v-if="scope.row.status === 2"
                direction="vertical"
              ></el-divider>
            </span>
            <span v-if="scope.row.reportStatus !== 1">
              <router-link
                v-if="permission.qualityWorkOrder_edit"
                :to="{
                  path: '/quality/work-order/edit',
                  query: { data: scope.row },
                }"
              >
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
                  ></el-button>
                </el-tooltip>
                <el-divider direction="vertical"></el-divider>
              </router-link>
            </span>

            <router-link
              v-if="permission.qualityWorkOrder_detail"
              :to="{
                path: '/quality/work-order/detail',
                query: { data: scope.row },
              }"
            >
              <el-tooltip
                class="item"
                effect="dark"
                content="详情"
                placement="bottom"
              >
                <el-button
                  type="text"
                  size="small"
                  icon="el-icon-tickets"
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </router-link>
            <span v-if="permission.qualityWorkOrder_return">
              <el-tooltip
                class="item"
                effect="dark"
                content="退回"
                placement="bottom"
              >
                <el-button
                  :disabled="scope.row.status !== 1 || scope.row.taskNo === ''"
                  type="text"
                  size="small"
                  icon="el-icon-refresh-left"
                  @click="refresh(scope.row)"
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </span>
            <span v-if="permission.qualityWorkOrder_delete">
              <el-tooltip
                class="item"
                effect="dark"
                content="删除"
                placement="bottom"
              >
                <el-button
                  :disabled="scope.row.taskNo !== ''"
                  type="text"
                  size="small"
                  icon="el-icon-delete"
                  @click="handleDelete(scope.row)"
                ></el-button>
              </el-tooltip>
              <el-divider direction="vertical"></el-divider>
            </span>
            <el-tooltip
              v-if="permission.qualityWorkOrder_printer"
              class="item"
              effect="dark"
              content="打印"
              placement="bottom"
            >
              <el-button
                type="text"
                size="small"
                icon="el-icon-printer"
                :disabled="!(scope.row.status == 2)"
                @click="getPdfBill(pdfIdApi, scope.row.id)"
              ></el-button>
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
      ></el-pagination>
    </el-row>
    <el-dialog
      class="search-dialog"
      :visible.sync="lssueDialogVisible"
      :before-close="handleClose"
      title="报工"
      append-to-body
      width="60%"
    >
      <el-row>
        <div class="title">基础数据</div>
      </el-row>
      <el-form
        :model="lssueForm"
        :rules="rules"
        :show-message="false"
        ref="ruleForm"
        label-width="80px"
        class="form-footer"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="单据编号">
              <span>{{ lssueForm.workOrderNo }} </span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品编号">
              <span>{{ lssueForm.productSn }} </span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="执行人">
              <span>{{ lssueForm.executeUserName }} </span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="hour" label="实际工时">
              <el-input
                class="iptAuto"
                v-model="lssueForm.hour"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <!-- <el-col :span="12">
            <el-form-item prop="doneUserName" label="报工人">
              <span>{{ lssueForm.doneUserName }} </span>
               <el-input
                class="iptAuto"
                v-model="lssueForm.doneUserName"
                suffix-icon="el-icon-search"
                placeholder="请选择报工人"
                @focus="checkUserVisible = true"
              ></el-input> 
            </el-form-item>
          </el-col> -->
          <el-col :span="12">
            <el-form-item label="备注">
              <el-input
                class="iptAuto"
                v-model="lssueForm.remark"
                placeholder="请输入备注"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <div class="title">质检内容</div>
        </el-row>
        <el-row class="margin-bottom-20">
          <el-table
            :data="resultList"
            border
            :cell-style="{ 'text-align': 'center' }"
            :header-cell-style="{ 'text-align': 'center' }"
            style="width: 90%; margin: 10px auto"
          >
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-table
                  :data="props.row.courses"
                  border
                  :cell-style="{ 'text-align': 'center' }"
                  :header-cell-style="{ 'text-align': 'center' }"
                  style="width: 90%; margin: 10px auto"
                >
                  <el-table-column type="index" width="80">
                    <template slot="header">
                      <span @click="handleAdd(props.row.courses)">
                        <i class="el-icon-plus"></i>
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column label="过程" prop="courseTime">
                    <template slot-scope="scop">
                      <el-input
                        class="iptAuto"
                        v-model="scop.row.courseTime"
                        placeholder="请输入过程"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="结果" prop="result">
                    <template slot-scope="scop">
                      <el-input
                        class="iptAuto"
                        v-model="scop.row.result"
                        placeholder="请输入结果"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column width="80" label="操作">
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        icon="el-icon-delete"
                        circle
                        @click="coursesDelete(scope.$index, props.row.courses)"
                        :disabled="type === 'detail'"
                      ></el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </el-table-column>
            <el-table-column label="检验项目" prop="inspectionName">
            </el-table-column>
            <el-table-column label="检验标准" prop="inspectionStandard">
            </el-table-column>
            <el-table-column label="检验结果" prop="result">
              <template slot-scope="scope">
                <el-input
                  class="iptAuto"
                  v-model="scope.row.result"
                  placeholder="请输入结果"
                ></el-input>
              </template>
            </el-table-column>
          </el-table>
          <div class="file">
            <span style="margin-right: 16px">附件信息</span>
            <upload-file
              @on-remove="handleRemove"
              @on-success="handleSuccess"
              :imageList="file"
            ></upload-file>
          </div>
          <!-- <el-form-item label="附件信息"> -->

          <!-- </el-form-item> -->
        </el-row>
        <el-form-item style="margin-top: 37px" class="search-footer">
          <el-button @click="lssueDialogVisible = false" size="small"
            >取消</el-button
          >
          <el-button type="primary" size="small" @click="lssue">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 选择报工人弹窗 -->
    <!-- <leadingCadre
      title="报工人"
      :checkUserVisible.sync="checkUserVisible"
      @on-selected="addUser"
    />-->
    <!-- 查询执行人弹窗 -->
    <!-- <leadingCadres
      title="执行人"
      :checkUserVisible.sync="checkUserSearchVisible"
      @on-selected="addSearchUser"
    /> -->
  </basic-container>
</template>

<script>
let recordObj = "";
import {
  workOrderPage,
  workOrderOperation,
  removeWorkOrder,
  createReport,
} from "@/api/quality/process";
import { queryItemByCategoryId } from "@/api/quality/index";
import { getUser } from "@/api/base-data/user.js";
// import { getUserInfo } from "@/api/system/user";
import upload from "@/mixins/upload";
import paginationMixin from "@/mixins/pagination";
import exportMixin from "@/mixins/reportForm";
import { mapGetters } from "vuex";
// import leadingCadre from "@/components/quality/leadingCadre";
// import leadingCadres from "@/components/quality/leadingCadres";

export default {
  mixins: [paginationMixin, upload, exportMixin],
  // components: { leadingCadre, leadingCadres },
  data() {
    return {
      date:"",
      pdfIdApi: "/quality/workOrder/getWorkReportBillsReportPDF",
      searchForm: {},
      recordForm: {}, //暂存数据
      tableData: [],
      options: [
        {
          value: 1,
          label: "待签收",
        },
        {
          value: 2,
          label: "已签收",
        },
        {
          value: 3,
          label: "退回",
        },
      ],
      multipleSelection: [],
      searchDialogVisible: false,
      lssueDialogVisible: false,
      checkUserVisible: false,
      lssueForm: {},
      workOrderId: "",
      resultList: [], //质检内容
      checkUserSearchVisible: false, //查询执行人弹窗
      rules: {
        hour: [{ required: true, message: "请输入", trigger: "blur" }],
        doneUserName: [
          { required: true, message: "请输入", trigger: "change" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === "修改质检工单" || from.name === "质检工单详情") {
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
      this.currentPage = recordObj.params.pageNum;
      this.pageSize = recordObj.params.pageSize;
      delete recordObj.params.pageNum;
      this.searchForm = recordObj.data;
    }
    this.handleList();
    const res = await getUser({ current: 1, size: 9999 });
    this.options1 = res.data.data.records;
  },
  methods: {
    changeTime(value) {
      if (value !== null) {
        this.searchForm.startDay = value[0];
        this.searchForm.endDay = value[1];
      } else {
        this.searchForm.startDay = this.searchForm.endDay = "";
      }
    },
    // 表格多选
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    //打印
    async handlePrinter(reportName) {
      let ids = [];
      if (this.multipleSelection.length <= 0) {
        this.$message.warning("请至少选择一条导出数据");
        return;
      }
      // status
      let flag = this.multipleSelection.filter((item) => {
        return item.status === 2;
      });
      //   已审核  2
      if (flag.length <= 0 || flag.length != this.multipleSelection.length) {
        this.$message.warning("请选择已签收的数据导出");
        return;
      }
      ids = this.multipleSelection.map((ele) => ele.id);
      try {
        // 减少服务器压力
        await this.$confirm("确定导出单据吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });

        // debugger;
        //  页面跳转
        ids = ids.join(",");
        var win = window.open(
          this.$report +
            `/ureport/preview?_u=blade-${reportName}.xml&ids=${ids}`
        );
        win.document.title = "暂未成功设置title";
      } catch (error) {
        this.$message.info("已取消");
      }
    },
    // 查询角色
    async handleList() {
      let params = { pageNum: this.currentPage, pageSize: this.pageSize };
      let data = this.searchForm;
      this.recordForm = { params, data };
      const res = await workOrderPage(params, data);
      this.tableData = res.data.data.records;
      this.total = res.data.data.total;
    },
    //选择查询执行人
    addSearchUser(list) {
      console.log(list);
      let idList = [];
      let nameList = [];
      list.forEach((res) => {
        idList.push(res.id);
        nameList.push(res.name);
      });
      this.searchForm.userId = idList.join(",");
      this.searchForm.userName = nameList.join(",");
    },
    // 搜索
    searchRole() {
      this.currentPage = 1;
      this.handleList();
      this.searchDialogVisible = false;
    },
    //重置
    reset() {
      this.currentPage = 1;
      this.date = [];
      this.searchForm = {};
      this.handleList();
      this.searchDialogVisible = false;
    },

    //签收
    async operation(info) {
      try {
        await this.$confirm("是否确认签收该条质检工单?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        let params = {
          workOrderId: info.id,
          tag: info.status,
        };
        const res = await workOrderOperation(params);
        if (res.data.code === 200) {
          this.$message.success({
            message: "操作成功",
          });
          this.handleList();
        }
      } catch (error) {
        console.log(error);
      }
    },
    //退回
    async refresh(info) {
      try {
        await this.$confirm("是否退回该条质检工单?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        let params = {
          taskId: info.id,
          tag: 2,
        };
        const res = await workOrderOperation(params);
        if (res.data.code === 200) {
          this.$message.success({
            message: "操作成功",
          });
          this.handleList();
        }
      } catch (error) {
        console.log(error);
      }
    },
    //打开下发弹窗
    async openlssueDialog(info) {
      let data = {
        workOrderNo: info.workOrderNo,
        productSn: info.productSn,
        executeUserName: info.executeUserName,
        doneUserId: "",
        doneUserName: "",
        hour: "",
        remark: "",
      };
      this.lssueForm = data;
      this.workOrderId = info.id;
      //
      // let form = await getUserInfo({});
      // (this.lssueForm.doneUserId = form.data.data.id),
      //   (this.lssueForm.doneUserName = form.data.data.name);
      //
      let productinfo = await queryItemByCategoryId({
        productNo: info.productSn,
      });
      productinfo.data.data.forEach((res) => {
        let obj = {
          itemId: res.id,
          inspectionName: res.inspectionName,
          inspectionStandard: res.inspectionStandard,
          result: "",
          courses: [{}],
        };
        this.resultList.push(obj);
      });
      this.lssueDialogVisible = true;
    },
    addUser(info) {
      (this.lssueForm.doneUserId = info.id),
        (this.lssueForm.doneUserName = info.name);
    },
    //新增过程
    handleAdd(table) {
      table.push({});
    },
    //删除过程
    coursesDelete(index, table) {
      table.splice(index, 1);
    },
    //下发
    async lssue() {
      try {
        await this.$refs.ruleForm.validate();
      } catch (error) {
        this.$message.error({
          message: "请完善必填信息",
        });
        return;
      }
      this.lssueForm.resultList = this.resultList;
      this.lssueForm.files = this.file;
      let res = await createReport(this.workOrderId, this.lssueForm);
      if (res.data.code === 200) {
        this.lssueForm = {};
        this.lssueDialogVisible = false;
        this.$message.success({
          message: "操作成功",
        });
        this.handleList();
      }
    },
    //删除
    funDelRole(ids) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          removeWorkOrder({ ids: ids })
            .then((res) => {
              console.log(res);
              if (res.data.success) {
                this.handleList();
                this.$message.success("删除成功");
              }
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 单行删除
    handleDelete(row) {
      this.funDelRole([row.id]);
    },
    // 多行删除
    handleDelRole() {
      if (this.multipleSelection.length === 0) {
        return this.$message.warning("请至少选择一条数据!");
      }

      const arr = this.multipleSelection.filter((ele) => ele.taskNo !== "");
      if (arr.length > 0) {
        this.$message.warning("下发工单不能删除!");
        return;
      }

      let ids = [];
      ids = this.multipleSelection.map((ele) => ele.id);
      this.funDelRole(ids);
    },
    // 跳转新增
    add() {
      this.$router.push("/quality/work-order/add");
    },
  },
  filters: {
    statusName(val) {
      if (val === 1) {
        return (val = "待签收");
      }
      if (val === 2) {
        return (val = "已签收");
      }
      if (val === 3) {
        return (val = "退回");
      }
    },
    planTypeName(val) {
      switch (val) {
        case 1:
          return "送样检验";

        case 2:
          return "进料检验";

        case 3:
          return "生产入库检验";

        case 4:
          return "销退检验";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.iptAuto {
  width: 100% !important;
}
.ellipsis {
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis; /*超出部分文字以...显示*/
}
.file {
  display: flex;
  padding-left: 32px;
  padding-top: 6px;
}
</style>
