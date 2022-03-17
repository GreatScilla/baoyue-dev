// 排程管理-指派
<template>
  <basic-container>
    <!--排程指派信息-->
    <el-row>
      <el-row>
        <div class="title">排程信息</div>
        <el-divider></el-divider>
      </el-row>
      <el-form
        label-width="120px"
        :inline="true"
        :model="scheduleFormData"
        class="detail-form"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="排程号">
              <el-input
                v-model="scheduleFormData.schedulesOrdersEncode"
                :disabled="true"
                size="small"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="产品编码">
              <el-input
                size="small"
                v-model="scheduleFormData.productEncode"
                :disabled="true"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属工单">
              <el-input
                v-model="scheduleFormData.productionOrdersEncode"
                :disabled="true"
                size="small"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="产品名称">
              <el-input
                size="small"
                v-model="scheduleFormData.productName"
                :disabled="true"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="排程数量">
              <el-input
                v-model="scheduleFormData.schedulesNumber"
                :disabled="true"
                size="small"
              >
              </el-input>
            </el-form-item>
            <el-form-item required label="排程状态">
              <el-select
                v-model="scheduleFormData.schedulesStatus"
                :disabled="true"
                size="small"
              >
                <el-option label="新建" value="0"> </el-option>
                <el-option label="下达" value="1"> </el-option>
                <el-option label="生产中" value="2"> </el-option>
                <el-option label="已完成" value="3"> </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="时间">
            <el-date-picker
              v-model="scheduleFormData.planStartTime"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              :disabled="true"
            >
            </el-date-picker>
            至
            <el-date-picker
              v-model="scheduleFormData.planEndTime"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              size="small"
              :disabled="true"
            >
            </el-date-picker>
          </el-form-item>
        </el-row>
      </el-form>
    </el-row>
    <!--排程指派 -->
    <el-row>
      <el-row>
        <div class="title">排程指派</div>
        <el-divider></el-divider>
      </el-row>
      <el-table
        @selection-change="handleSelectionChange"
        :data="tableData"
        style="width: 100%; padding: 0 100px"
      >
        <el-table-column prop="processName" label="工序" width="220">
        </el-table-column>
        <el-table-column label="工位">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.factoryId"
              @change="changeFactory(scope.row)"
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in scope.row.factoryModelDTO"
                :key="item.id"
                :label="item.factoryName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="人员">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.userId"
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in scope.row.userList"
                :key="item.id"
                :label="item.realName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 操作按钮 -->
    <el-row class="button-wrapper-footer">
      <el-button size="small" @click="cancel">取消</el-button>
      <el-button size="small" type="primary" @click="saveRole">保存</el-button>
    </el-row>
  </basic-container>
</template>
<script>
import {
  detailsSchedule,
  getLineProcess,
  designate,
} from "@/api/planning/schedule";
export default {
  data() {
    return {
      tableData: [],
      scheduleFormData: {},
    };
  },
  async created() {
    await this.initDetails();
    await this.initResources();
  },
  methods: {
    // 修改工位
    changeFactory(row) {
      row.factoryModelDTO.forEach((ele) => {
        if (row.factoryId === ele.id) {
         ele.userDTO.forEach((el) => {
            if (el.realName) {
              row.userList = ele.userDTO;
            } else {
              row.userList = [];
            }
          });
        }
      });
    },
    // 计划排程详情
    async initDetails() {
      const detailsScheduleRes = await detailsSchedule(
        this.$route.query.data.id
      );
      this.scheduleFormData = detailsScheduleRes.data.data;
    },
    // 工位、人员资源
    async initResources() {
      const resource = await getLineProcess({
        productId: this.scheduleFormData.productId,
      });
      console.log(resource);
      this.tableData = resource.data.data;
      this.tableData.forEach((ele) => {
        if (ele.factoryModelDTO.length > 0) {
          ele.factoryModelDTO.forEach((factory) => {
            if (factory.userDTO.length === 0) {
              factory.userDTO.push({
                id: "",
                realName: "",
              });
            }
          });
        }
      });
      console.log(this.userList);
    },
    async saveRole() {
      this.tableData.forEach((ele) => {
        ele.schedulesOrdersId = this.scheduleFormData.id;
      });
      const designateRes = await designate(this.tableData);
      console.log(designateRes);
      if (designateRes.data.success) {
        this.$message.success("指派成功");
        this.$router.back();
      }
    },
    // 取消排程管理-指派
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
</style>
