// 工单分配
<template>
  <basic-container>
    <el-row>
      <el-row>
        <div class="title">基础数据</div>
        <el-divider></el-divider>
      </el-row>
      <el-form
        label-width="120px"
        :inline="true"
        :model="workOrderForm"
        class="detail-form"
      >
        <el-row>
          <el-col :span="6">
            <el-form-item label="工单号">
              <span>{{ workOrderForm.productionOrdersEncode || "无" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="制造数量">
              <span>{{ workOrderForm.planNumber || "无" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="产品编码">
              <span>{{ workOrderForm.productEncode || "无" }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="产品名称">
              <span>{{ workOrderForm.productName || "无" }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item required label="排程数量">
              <el-input
                size="small"
                v-model="workOrderForm.schedulesOrdersEncode"
                placeholder="请输入"
                v-int
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <el-table
      :data="workshopTableData"
      style="width: 100%"
      row-key="id"
      default-expand-all
      @selection-change="handleSelectionChange"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      
    >
      <el-table-column
        type="selection"
        width="55"
        :selectable="selectHandle"
      ></el-table-column>
      <el-table-column align="center" prop="factoryName" label="层级名称"> </el-table-column>
      <el-table-column  align="center" min-width="200" label="时间">
        <template slot-scope="scope" v-if="scope.row.levelId === '20'">
          <el-date-picker
            style="width: 400px"
            v-model="scope.row.timeDate"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
             :default-time="['00:00:00', '23:59:59']"
          >
          </el-date-picker>
        </template>
      </el-table-column>
      <!-- <el-table-column label="开始时间">
        <template slot-scope="scope" v-if="scope.row.levelId === '20'">
          <el-date-picker
            v-model="scope.row.planStartTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </template>
      </el-table-column>
      <el-table-column label="结束时间">
        <template slot-scope="scope" v-if="scope.row.levelId === '20'">
          <el-date-picker
            v-model="scope.row.planEndTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            size="small"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </template>
      </el-table-column> -->
      <el-table-column label="数量">
        <template slot-scope="scope" v-if="scope.row.levelId === '20'">
          <el-input
            style="width: 200px"
            v-model="scope.row.schedulesNumber"
            size="small"
            placeholder="数量"
            v-int
          >
          </el-input>
        </template>
      </el-table-column>
    </el-table>
    <el-row class="button-wrapper-footer">
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button size="small" type="primary" @click="saveWorkOrderDistribution"
        >保存</el-button
      >
    </el-row>
  </basic-container>
</template>

<script>
import {
  stationOrderAllocation,
  workOrderDistribution,
  getScheduleCode,
  workshopLine,
} from "@/api/planning/workOrder";
import { getCode } from "@/api/common";
import { deepClone } from "@/util/util";
export default {
  data() {
    return {
      workOrderForm: {},
      workshopTableData: [],
      multipleSelection: [],
    };
  },
  async created() {
    await this.initStationOrderAllocation();
    await this.initWorkshopLine();
    // await this.initScheduleCode();
  },
  methods: {
    // 排程编码
    async initScheduleCode() {
      const scheduleCodeRes = await getCode({ codeName: "排程管理" });
      this.$set(
        this.workOrderForm,
        "schedulesOrdersEncode",
        scheduleCodeRes.data.data
      );
    },
    selectHandle(row, index) {
      return !(index === 0);
    },
    // 工单详情
    async initStationOrderAllocation() {
      console.log(this.$route.query);
      const stationOrderAllocationRes = await stationOrderAllocation(
        this.$route.query.row.id
      );
      this.workOrderForm = stationOrderAllocationRes.data;
      this.workOrderForm.productionOrdersId = this.workOrderForm.id;
    },
    // 车间产线
    async initWorkshopLine() {
      const workshopLineRes = await workshopLine({
        ids: this.workOrderForm.productionOrdersWorkShopId,
      });
      this.workshopTableData = workshopLineRes.data.data;
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 保存
    saveWorkOrderDistribution() {
      try {
        if (!this.workOrderForm.schedulesOrdersEncode) {
          throw "请输入排程数量";
        }
        if (this.multipleSelection.length === 0) {
          throw "请选择表格内信息";
        }
      } catch (err) {
        this.$message.info(err);
        return;
      }
      this.multipleSelection.forEach((ele) => {
        if (ele.timeDate && ele.schedulesNumber) {
          ele.assemblyLineId = ele.id;
        } else {
          return this.$message.info("表格内数据不能为空");
        }
      });
      this.workOrderForm.schedulesDTO = this.multipleSelection;
      // this.traverseTree(this.workshopTableData);
      this.workOrderForm.codeName = "排程管理";

      let form = deepClone(this.workOrderForm);
      form.schedulesDTO.forEach((el) => {
        el.planStartTime = el.timeDate[0];
        el.planEndTime = el.timeDate[1];
        delete el.timeDate;
      });
      workOrderDistribution(form)
        .then((res) => {
          if (res.data.success) {
            this.$message.success(res.data.msg);
            this.$router.back();
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
    traverseTree(data) {
      if (!data) {
        return;
      }
      for (let i = 0; i < data.length; i++) {
        this.traverseSingle(data[i]);
        if (data[i].children && data[i].children.length > 0) {
          this.traverseTree(data[i].children);
        }
      }
    },
    traverseSingle(item) {
      if (this.clickLine.id === item.id) {
        this.workOrderForm.startTime = item.startTime;
        this.workOrderForm.endTime = item.endTime;
      }
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
</style>
