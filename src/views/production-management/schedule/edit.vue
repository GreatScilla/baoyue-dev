// 排程管理-编辑
<template>
  <basic-container>
    <!--基础数据-->
    <el-row>
      <el-row>
        <div class="title">基础数据</div>
        <el-divider></el-divider>
      </el-row>
      <el-form
        label-width="120px"
        :inline="true"
        :model="scheduleFormData"
        class="detail-form"
      >
        <el-row>
          <el-col :span="8" class="deatilsColumn">
            <el-form-item label="工单号">
              <span v-if="type === 'detail'">{{
                scheduleFormData.productionOrdersEncode
              }}</span>
              <el-input
                v-else
                v-model="scheduleFormData.productionOrdersEncode"
                placeholder="请输入编码"
                :disabled="true"
                size="small"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="物料名称">
              <span v-if="type === 'detail'">{{
                scheduleFormData.productName
              }}</span>
              <el-input
                v-else
                size="small"
                v-model="scheduleFormData.productName"
                :disabled="true"
                placeholder="请输入"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="车间">
              <span v-if="type === 'detail'">{{
                scheduleFormData.productionOrdersWorkShopName
              }}</span>
              <el-input
                v-else
                size="small"
                v-model="scheduleFormData.productionOrdersWorkShopName"
                :disabled="true"
                placeholder="请输入"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="控制状态">
              <span v-if="type === 'detail'">{{
                scheduleFormData.controlStatusName
              }}</span>
              <el-select
                size="small"
                v-model="scheduleFormData.controlStatus"
                placeholder="请选择"
                :disabled="disabled"
                v-else
              >
                <el-option
                  v-for="item in controlStateOptions"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="deatilsColumn">
            <el-form-item label="物料编码">
              <span v-if="type === 'detail'">{{
                scheduleFormData.productEncode
              }}</span>
              <el-input
                v-else
                v-model="scheduleFormData.productEncode"
                :disabled="true"
                size="small"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="排程数量">
              <span v-if="type === 'detail'">{{
                scheduleFormData.schedulesNumber
              }}</span>
              <el-input
                v-else
                size="small"
                v-model="scheduleFormData.schedulesNumber"
                :disabled="true"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="分配产线">
              <span v-if="type === 'detail'">{{
                scheduleFormData.factoryName
              }}</span>
              <el-input
                v-else
                v-model="scheduleFormData.factoryName"
                :disabled="true"
                size="small"
              >
              </el-input>
            </el-form-item>

            <el-form-item label="指派工位">
              <span v-if="type === 'detail'">{{
                scheduleFormData.stationName
              }}</span>
              <el-input
                v-else
                v-model="scheduleFormData.stationName"
                :disabled="true"
                size="small"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="deatilsColumn">
            <el-form-item label="排程号">
              <span v-if="type === 'detail'">{{
                scheduleFormData.schedulesOrdersEncode
              }}</span>
              <el-input
                v-else
                v-model="scheduleFormData.schedulesOrdersEncode"
                :disabled="true"
                size="small"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="排程状态">
              <span v-if="type === 'detail'">{{
                scheduleFormData.schedulesStatusName
              }}</span>
              <el-select
                size="small"
                v-model="scheduleFormData.schedulesStatus"
                placeholder="请选择"
                :disabled="true"
                v-else
              >
                <el-option
                  v-for="item in stateOptions"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否指派">
              <span v-if="type === 'detail'">{{
                scheduleFormData.isDesignate | designate
              }}</span>
              <!-- <el-select
                size="small"
                v-model="scheduleFormData.isDesignate"
                placeholder="请选择"
                :disabled="true"
                v-else
              >
                <el-option
                  v-for="item in designateState"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                >
                </el-option>
              </el-select> -->
              <el-switch
                v-else
                v-model="scheduleFormData.isDesignate"
                active-value="1"
                inactive-value="0"
              >
              </el-switch>
            </el-form-item>

            <el-form-item label="指派人员">
              <span v-if="type === 'detail'">{{
                scheduleFormData.personName
              }}</span>
              <el-input
                v-else
                size="small"
                v-model="scheduleFormData.personName"
                :disabled="true"
                placeholder="请输入"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="模数量">
              <span v-if="type === 'detail'">{{
                scheduleFormData.schedulesNumber
              }}</span>
              <el-input
                v-else
                size="small"
                v-model="scheduleFormData.schedulesNumber"
                :disabled="true"
                placeholder="请输入"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="时间">
              <span v-if="type === 'detail'">{{
                scheduleFormData.planStartTime
              }}</span>
              <el-date-picker
                v-else
                v-model="scheduleFormData.planStartTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                :disabled="true"
                placeholder="选择日期时间"
              >
              </el-date-picker>
              至
              <span v-if="type === 'detail'">{{
                scheduleFormData.planEndTime
              }}</span>
              <el-date-picker
                v-else
                v-model="scheduleFormData.planEndTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                size="small"
                :disabled="true"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <div v-if="type === 'detail'">
          <el-row>
            <div class="title">质检进度</div>
            <el-divider></el-divider>
          </el-row>
          <el-table :data="workTable" border class="margin-bottom-20">
            <el-table-column
              prop="workOrderNo"
              width="140"
              label="单据编号"
            ></el-table-column>
            <el-table-column
              prop="taskNo"
              width="130"
              label="所属任务"
            ></el-table-column>
            <el-table-column width="130" prop="productSn" label="产品编号">
            </el-table-column>
            <el-table-column prop="productName" label="产品名称">
            </el-table-column>
            <el-table-column prop="model" label="规格型号"> </el-table-column>
            <el-table-column prop="labName" label="执行单位"></el-table-column>
            <el-table-column
              prop="executeUserName"
              label="执行人"
            ></el-table-column>
            <el-table-column prop="hour" label="工时"></el-table-column>
            <el-table-column
              width="120"
              prop="batchNo"
              label="批次批号"
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
            <el-table-column width="60" label="操作" fixed="right">
              <template slot-scope="scop">
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
                    @click="openCheckDia(scop.row)"
                  ></el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form>
    </el-row>
    <!-- 操作按钮 -->
    <el-row class="button-wrapper-footer">
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button
        v-if="type === 'edit'"
        size="small"
        type="primary"
        @click="saveScheduleAssign"
        >保存</el-button
      >
    </el-row>
    <el-dialog
      class="search-dialog"
      append-to-body
      :visible.sync="checkVisible"
      title="检验内容"
    >
      <el-form>
        <el-col :span="12">
          <el-form-item label="状态:">
            <span>{{ diaForm.status | statusName }}</span>
          </el-form-item>
        </el-col>
        <el-table
          :data="checkTable"
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
                <el-table-column type="index" width="80"> </el-table-column>
                <el-table-column label="过程" prop="courseTime">
                </el-table-column>
                <el-table-column label="结果" prop="result"> </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column label="检验项目" prop="inspectionName">
          </el-table-column>
          <el-table-column label="检验标准" prop="inspectionStandard">
          </el-table-column>
          <el-table-column label="检验结果" prop="result"> </el-table-column>
        </el-table>

        <el-form-item class="search-footer">
          <el-button @click="checkVisible = false" size="small">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </basic-container>
</template>

<script>
import {
  detailsSchedule,
  getScheduleControlState,
  getScheduleState,
  editSchedule,
} from "@/api/planning/schedule";
import { workOrderPage, workReportDetails } from "@/api/quality/process";
import { getCode } from "@/api/common";
export default {
  props: {
    type: {
      type: String,
      default: "edit",
    },
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      scheduleFormData: {
        factoryUserDTOList: {
          factoryName: "",
          userName: "",
        },
      },
      controlStateOptions: [],
      stateOptions: [],
      user: "无",
      controlStatusName: "",
      designateState: [
        {
          code: "0",
          name: "否",
        },
        {
          code: "1",
          name: "是",
        },
      ],
      workTable: [],
      checkTable: [],
      checkVisible: false,
      diaForm: "",
    };
  },
  async created() {
    // const codeRes = await getCode({ codeName: "排程管理" });
    // this.workOrderForm.productionOrdersEncode = codeRes.data.data;
    // this.type = this.$route.query.type;
    this.initDetailsControlState();
  },
  filters: {
    designate: function (value) {
      if (value === "0") {
        value = "否";
      } else if (value === "1") {
        value = "是";
      }
      return value;
    },
    statusName(val) {
      if (val === 0) {
        return (val = "待审核");
      }
      if (val === 1) {
        return (val = "合格");
      }
      if (val === 2) {
        return (val = "不合格");
      }
    },
  },
  methods: {
    // 排程详情以及排程控制状态
    initDetailsControlState() {
      Promise.all([
        detailsSchedule(this.$route.query.data.id),
        getScheduleControlState(),
        getScheduleState(),
      ])
        .then((res) => {
          this.scheduleFormData = res[0].data.data;
          console.log(this.scheduleFormData);
          this.controlStateOptions = res[1].data.data;
          this.stateOptions = res[2].data.data;
          this.scheduleFormData.factoryList = [];
          this.scheduleFormData.personList = [];
          this.scheduleFormData.factoryUserDTOList.forEach((ele) => {
            console.log(ele);
            this.scheduleFormData.factoryList.push(ele.factoryName);
            this.scheduleFormData.personList.push(ele.userName);
          });
          this.scheduleFormData.stationName =
            this.scheduleFormData.factoryList.join();
          this.scheduleFormData.personName =
            this.scheduleFormData.personList.join();
          this.controlStateOptions.forEach((control) => {
            if (control.code === this.scheduleFormData.controlStatus) {
              this.scheduleFormData.controlStatusName = control.name;
            }
          });
          this.stateOptions.forEach((state) => {
            if (state.code === this.scheduleFormData.schedulesStatus) {
              this.scheduleFormData.schedulesStatusName = state.name;
            }
          });

          if (this.type === "detail") {
            this.getWorker(this.scheduleFormData.schedulesOrdersEncode);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async getWorker(info) {
      let params = { pageNum: 1, pageSize: 10 };
      let form = {
        batchNo: info,
      };
      workOrderPage(params, form).then((res) => {
        this.workTable = res.data.data.records;
      });
    },
    async openCheckDia(info) {
      //打开弹窗
      let res = await workReportDetails({
        workOrderNo: info.workOrderNo,
      });
      this.diaForm = res.data.data;
      this.checkTable = res.data.data.resultList;
      this.checkVisible = true;
    },
    //保存
    saveScheduleAssign() {
      let params = {
        id: this.scheduleFormData.id,
        controlStatus: this.scheduleFormData.controlStatus,
        isDesignate: this.scheduleFormData.isDesignate,
      };
      editSchedule(params)
        .then((res) => {
          if (res.data.success) {
            this.$message.success("修改成功");
            this.$router.push("/production-management/schedule");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // 取消
    cancel() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 16px;
  font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
  font-weight: bold;
  color: #3e3e3e;
  line-height: 16px;
}
.el-input,
.el-select {
  width: 240px;
}
.el-date-editor--date {
  width: 160px;
}
.deatilsColumn {
  display: flex;
  flex-direction: column;
}
</style>
