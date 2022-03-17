
<template>
  <div class="handlePages addPages">
    <el-row>
      <div class="title">基础数据</div>
      <el-divider></el-divider>
    </el-row>
    <el-form
      :model="form"
      :show-message="false"
      :rules="rules"
      ref="ruleForm"
      label-width="180px"
      class="detail-form"
    >
      <el-row v-if="type !== 'add'">
        <el-col :span="12">
          <el-form-item label="单据编号:">
            <span>{{ form.planNo }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="创建时间:">
            <span>{{ form.createTime }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item prop="planType" label="质检计划类别:">
            <el-select
              class="iptWidth"
              v-model="form.planType"
              placeholder="请选择"
              :disabled="type === 'detail'"
            >
              <el-option
                v-for="item in planTypeList"
                :key="item.dictKey"
                :label="item.dictValue"
                :value="item.dictKey"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="planSource" label="计划来源:">
            <el-select
              class="iptWidth"
              v-model="form.planSource"
              placeholder="请选择"
              :disabled="type === 'detail'"
            >
              <el-option
                v-for="item in deptOptions"
                :key="item.id"
                :label="item.deptName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item prop="batchNo" label="批次批号:">
            <span v-if="type === 'detail'">{{ form.batchNo }}</span>
            <el-input
              v-else
              class="iptWidth"
              v-model="form.batchNo"
              placeholder="请输入批次批号"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="productSn" label="产品编号/名称/规格型号:">
            <span v-if="type === 'detail'">{{ products }}</span>
            <el-input
              v-else
              class="iptWidth"
              v-model="products"
              placeholder="请选择产品编号"
              suffix-icon="el-icon-search"
              @focus="getKey('plan')"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item prop="planBeginTime" label="计划开始日期:">
            <span v-if="type === 'detail'">{{ form.planBeginTime }}</span>
            <el-date-picker
              v-else
              class="iptWidth"
              v-model="form.planBeginTime"
              value-format="yyyy-MM-dd 00:00:00"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="planEndTime" label="计划结束日期:">
            <span v-if="type === 'detail'">{{ form.planEndTime }}</span>
            <el-date-picker
              v-else
              class="iptWidth"
              v-model="form.planEndTime"
              value-format="yyyy-MM-dd 23:59:59"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="type === 'detail' ? 12 : 20">
          <el-form-item label="备注:">
            <span v-if="type === 'detail'">{{ form.remark }}</span>
            <el-input
              v-else
              v-model="form.remark"
              placeholder="请输入备注"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col v-if="type === 'detail'" :span="12">
          <el-form-item label="签收人/签退人:">
            <span>{{ form.operationUserName }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <div v-if="type === 'detail'">
        <el-row style="margin: 20px 0 10px">
          <div class="title">任务列表</div>
          <el-divider></el-divider>
        </el-row>
        <el-row class="margin-bottom-20">
          <el-table
            :data="tableData"
            border
            :cell-style="{ 'text-align': 'center' }"
            :header-cell-style="{ 'text-align': 'center' }"
            style="width: 100%; margin: 0 auto"
          >
            <el-table-column label="单据编号" prop="taskNo"> </el-table-column>
            <el-table-column label="所属计划" prop="planNo"> </el-table-column>
            <el-table-column width="130" prop="productSn" label="产品编号">
            </el-table-column>
            <el-table-column prop="productName" label="产品名称">
            </el-table-column>
             <el-table-column prop="model" label="规格型号">
            </el-table-column>
            <el-table-column label="执行单位" prop="labName"> </el-table-column>
            <el-table-column label="工时" prop="hour"> </el-table-column>
            <el-table-column label="任务开始时间" prop="taskBeginTime">
            </el-table-column>
            <el-table-column label="任务结束时间" prop="taskEndTime">
            </el-table-column>
            <el-table-column label="状态" prop="status">
              <template slot-scope="scope">
                {{ scope.row.status | statusName }}
              </template>
            </el-table-column>
            <el-table-column width="100" label="操作">
              <template slot-scope="scope">
                <el-tooltip
                  v-if="scope.row.status === 3"
                  class="item"
                  effect="dark"
                  content="重新下发"
                  placement="bottom"
                >
                  <el-button
                    type="text"
                    icon="el-icon-s-unfold"
                    circle
                    @click="openDialog(scope.row)"
                  ></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </div>
      <el-row class="footer-box margin_30">
        <div v-if="type !== 'detail'">
          <el-button @click="handleBack" size="small">取消</el-button>
          <el-button
            type="primary"
            @click="submit"
            size="small"
            :loading="requesting"
            >保存</el-button
          >
        </div>
        <el-button v-else type="primary" size="small" @click="handleBack"
          >返回</el-button
        >
      </el-row>
    </el-form>
    <el-dialog
      class="search-dialog"
      :visible.sync="taskDialogVisible"
      :before-close="handleClose"
      title="重新下发"
      append-to-body
      width="60%"
    >
      <el-row>
        <div class="title">基础数据</div>
      </el-row>
      <el-form ref="searchForm" label-width="180px" class="form-footer">
        <el-row>
          <el-col :span="12">
            <el-form-item label="单据编号:">
              <span>{{ taskForm.taskNo }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建时间:">
              <span>{{ taskForm.createTime }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="执行单位:">
              <el-select
                class="iptAuto"
                v-model="taskForm.labId"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in labList"
                  :key="item.id"
                  :label="item.labName"
                  :value="item.id"
                  @click.native="getType(item.id)"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="batchNo" label="批次批号:">
              <el-input
                class="iptAuto"
                v-model="taskForm.batchNo"
                placeholder="请输入批次批号"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="productSn" label="产品编号/名称/规格名称:">
              <el-input
                class="iptAuto"
                v-model="productDias"
                placeholder="请选择"
                suffix-icon="el-icon-search"
                @focus="getKey('taskDia')"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="hour" label="工时:">
              <el-input
                class="iptAuto"
                v-model="taskForm.hour"
                placeholder="请输入工时"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="任务开始日期:">
              <el-date-picker
                class="iptAuto"
                v-model="taskForm.taskBeginTime"
                value-format="yyyy-MM-dd 00:00:00"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="任务结束日期:">
              <el-date-picker
                class="iptAuto"
                v-model="taskForm.taskEndTime"
                value-format="yyyy-MM-dd 23:59:59"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="备注:">
              <el-input
                class="iptAuto"
                v-model="taskForm.remark"
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
            :data="tasktList"
            border
            :cell-style="{ 'text-align': 'center' }"
            :header-cell-style="{ 'text-align': 'center' }"
            style="width: 90%; margin: 10px auto"
          >
            <el-table-column label="检验项目" prop="inspectionName">
            </el-table-column>
            <el-table-column label="检验标准" prop="inspectionStandard">
            </el-table-column>
          </el-table>
        </el-row>
        <el-form-item class="search-footer">
          <el-button @click="taskDialogVisible = false" size="small"
            >取消</el-button
          >
          <el-button type="primary" size="small" @click="updateStatus(taskForm)"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 选择产品 -->
    <el-dialog
      :visible.sync="checkProductVisible"
      top="20px"
      append-to-body
      width="70%"
      title="选择产品"
    >
      <productDia
        @on-cancel="handleCancel"
        @on-submit="addProductList"
      ></productDia>
    </el-dialog>
  </div>
</template>

<script>
import {
  saveOrUpdatePlan,
  taskPage,
  saveOrUpdateTask,
} from "@/api/quality/process";
import { getDepartmentList } from "@/api/humanResources/department";
import { queryItemByCategoryId, selectLabNameList } from "@/api/quality/index";
import { getDictionary } from "@/api/system/dictbiz";
import productDia from "@/components/quality/productDia";

export default {
  props: {
    type: {
      type: String,
      default: "add",
    },
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: {
    productDia,
  },
  data() {
    return {
      requesting: false,
      key: "",
      form: {},
      deptOptions: [],
      planTypeList: [],
      tableData: [],
      checkProductVisible: false,
      taskDialogVisible: false,
      taskForm: {},
      tasktList: [],
      labList: [], //化验室列表
      rules: {
        planSource: [{ required: true, message: "请选择", trigger: "change" }],
        planType: [{ required: true, message: "请选择", trigger: "change" }],
        planBeginTime: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        planEndTime: [{ required: true, message: "请选择", trigger: "change" }],
        batchNo: [{ required: true, message: "请输入", trigger: "blur" }],
        productSn: [{ required: true, message: "请选择", trigger: "change" }],
      },
      products: "", //数据集合
      productDias: "", //弹窗数据集合
    };
  },
  computed: {},
  async created() {
    let res = await getDepartmentList();
    this.deptOptions = res.data.data;
    let list = await getDictionary({ code: "mes_plan_type" });
    this.planTypeList = list.data.data;
    if (this.type !== "add") {
      this.form = this.data;
      this.products =
        this.form.productSn +
        " " +
        this.form.productName +
        " " +
        this.form.model;
    }
    if (this.type === "detail") {
      this.getTask(this.data.planNo);
    }
  },
  mounted() {},
  methods: {
    getKey(info) {
      //获取表示
      this.key = info;
      this.checkProductVisible = true;
    },
    async openDialog(info) {
      console.log(info);
      let res = await selectLabNameList({});
      this.labList = res.data.data;
      this.getTabList(info.productSn);
      this.taskForm = info;
      this.productDias =
        info.productName + " " + info.productSn + " " + info.model;
      this.taskDialogVisible = true;
    },
    addProductList(val) {
      //获取产品
      if (this.key === "taskDia") {
        this.taskForm.productId = val.id; //产品ID
        this.taskForm.productName = val.name; //	产品名称
        this.taskForm.productSn = val.productSn; //产品编号'
        this.productDias = val.name + " " + val.productSn + " " + val.model;
        this.getTabList(val.productSn);
      } else {
        this.form.productId = val.id; //产品ID
        this.form.productName = val.name; //	产品名称
        this.form.productSn = val.productSn; //产品编号
        this.products = val.name + " " + val.productSn + " " + val.model;
      }

      this.checkProductVisible = false;
    },
    async getTabList(id) {
      //获取列表
      let info = await queryItemByCategoryId({ productNo: id });
      if (info.data.code === 200) {
        this.tasktList = info.data.data;
      }
    },
    async updateStatus(info) {
      let tag = 1;
      let form = JSON.parse(JSON.stringify(info));
      form.status = 1;
      try {
        await this.$confirm("确定重新下发改任务?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        const res = await saveOrUpdateTask(tag, form);
        if (res.data.code === 200) {
          this.$message.success({
            message: "操作成功",
          });
          this.taskDialogVisible = false;
          this.getTask(this.data.planNo);
        }
      } catch (error) {
        console.log(error);
        // this.$message.error("已取消删除");
      }
    },
    async getTask(id) {
      let info = await taskPage({  }, {planNo: id});
      this.tableData = info.data.data.records;
    },
    async submit() {
      try {
        await this.$refs.ruleForm.validate();
      } catch (error) {
        this.$message.error({
          message: "请完善必填信息",
        });
        return;
      }
      let tag = "";
      console.log(this.form);
      if (this.type === "add") {
        tag = 0;
      } else {
        tag = 1;
      }
      this.requesting = true;
      saveOrUpdatePlan(tag, this.form).then((res) => {
        if (res.data.code === 200) {
          this.requesting = false;
          this.$message.success({
            message: "操作成功",
          });
          this.$router.push("/quality/plan");
        }
      });
    },
    handleBack() {
      this.$router.push("/quality/plan");
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
  },
};
</script>
<style src="../common.css"  scoped>
</style>
<style lang="scss" scoped>
.iptAuto {
  width: 100% !important;
}
.search-dialog .el-form-item {
  padding-left: 0px !important;
}
.el-select /deep/ .el-input {
  width: 100% !important;
}
.ellipsis {
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis; /*超出部分文字以...显示*/
}
</style>