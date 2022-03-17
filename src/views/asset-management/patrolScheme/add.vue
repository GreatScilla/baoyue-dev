<template>
  <div class="pages addPages">
    <el-form
      ref="form"
      :inline="true"
      :rules="rules"
      :model="form"
      :inline-message="true"
      label-width="110px"
      class="detail-form"
    >
      <el-row>
        <el-col :span="24">
          <span class="title">基本信息</span>
          <el-divider class="detail-divider"></el-divider>
        </el-col>
        <el-col v-if="type !== 'add'" :span="12">
          <el-form-item required label="计划单号:">
            <el-input
              v-if="type !== 'detail'"
              v-model="form.spotCheckOrderSn"
              disabled
            ></el-input>
            <span v-else>{{ form.spotCheckOrderSn }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item required label="计划名称:">
            <el-input
              v-if="type !== 'detail'"
              v-model="form.spotCheckName"
              placeholder="请输入"
            ></el-input>
            <span v-else>{{ form.spotCheckName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item required label="巡检部门:">
            <el-input
              v-if="type !== 'detail'"
              v-model="form.spotCheckDepartment"
              @focus="selectDepot"
            ></el-input>
            <span v-else>{{ form.spotCheckDepartment }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item required label="巡检时间:">
            <el-input
              v-if="type !== 'detail'"
              v-model="form.spotCheckTime"
              placeholder="请输入如：每周五  16：00"
            ></el-input>
            <span v-else>{{ form.spotCheckTime }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item required label="计划周期:">
            <span v-if="type !== 'detail'">
              <el-col :span="12">
                <el-input
                  v-model="form.maintenanceCycle"
                  placeholder="请输入"
                ></el-input>
              </el-col>
              <el-col :span="12">
                <el-select v-model="unit" placeholder="请选择">
                  <el-option
                    v-for="item in unitList"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-col>
            </span>
            <span v-else
              >{{ form.planningCycle }}/{{ form.planningCycleUnit }}</span
            >
          </el-form-item>
        </el-col>
      </el-row>
      <span class="title">巡检计划变更单</span>
      <el-divider class="detail-divider"></el-divider>
      <el-row>
        <el-form-item required label="巡检算法:">
          <el-select
            v-if="type != 'detail'"
            v-model="form.algorithm"
            placeholder="请选择"
          >
            <el-option
              v-for="item in algorithmList"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
          <span v-else>{{ form.tallyAlgorithm }}</span>
        </el-form-item>
      </el-row>
      <el-row class="margin-bottom-20">
        <el-col :span="24">
          <el-table
            border
            :data="tableData"
            class="margin-bottom-20"
            highlight-current-row
          >
            <el-table-column prop="assetSn" label="资产编号" width="160px">
            </el-table-column>
            <el-table-column prop="facilitySn" label="设备编号" width="160px">
            </el-table-column>
            <el-table-column prop="assetName" label="资产名称" width="120px">
            </el-table-column>
            <el-table-column prop="assetType" label="资产类别" width="120px">
            </el-table-column>
            <el-table-column prop="model" label="规格型号" width="120px">
            </el-table-column>
            <el-table-column
              prop="qualityAssuranceDate"
              label="质保日期"
              width="120px"
            >
            </el-table-column>
            <el-table-column prop="location" label="所在位置">
            </el-table-column>
            <el-table-column prop="department" label="权属部门">
            </el-table-column>
            <el-table-column prop="whomBelongs" label="权属人员">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-col :span="24">
        <span class="title">其他信息</span>
        <el-divider class="detail-divider"></el-divider>
      </el-col>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注:" prop="remarks">
            <el-input
              v-if="type !== 'detail'"
              placeholder="请输入备注"
              type="textarea"
              v-model="form.remark"
            ></el-input>
            <span v-else>{{ form.remark }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="footer-box margin-bottom-20">
        <el-button v-if="!examine" size="small" @click="handleBack"
          >取消</el-button
        >
        <el-button
          v-if="type !== 'detail'"
          type="primary"
          size="small"
          @click="submit"
          >保存</el-button
        >
      </el-row>
    </el-form>
    <el-dialog append-to-body :visible.sync="showDept" title="选择部门">
      <dept @on-cancel="closeDept" @on-submit="submitDept"></dept>
    </el-dialog>
  </div>
</template>

<script>
import {
  getPollingByPageDetails,
  deleteMaintenanceStandard,
} from "@/api/asset-management/patrolScheme.js";
import customer from "@/components/customer";
import upload from "@/mixins/upload";
import common from "@/mixins/common";
import saleType from "@/mixins/saleType";
export default {
  name: "maintainStandard",
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
    examine: {
      type: String,
      default: "",
    },
    model: {
      type: String,
      default: "",
    },
  },
  components: {
    customer,
  },
  mixins: [upload, common, saleType],
  data() {
    return {
      statusList: [
        { code: "0", name: "闲置" },
        { code: "1", name: "使用中" },
        { code: "2", name: "已报废" },
      ],
      module: "资产台账",
      show: false,
      form: {
        assetAdjustSn: "",
        // createTime: "",
        // remarks: "",
      },
      tableData: [],
      rules: {},
      file: [],
      showDept: false,
      unitList: ["天/次", "周/次", "月/次", "年/次", "季/次"],
      unit: "",
      algorithmList: ["算法A", "算法B"],
    };
  },
  created() {},
  mounted() {
    if (this.type !== "add") {
      this.getDetailInfo();
    }
  },
  methods: {
    //资产数据
    addProductList(list) {
      this.show = false;
      this.form.maintainType = list[0].productSn;
      console.log(list);
    },
    handleCancel() {
      this.show = false;
    },
    async getDetailInfo() {
      // 获取详情信息
      // 获取详情信息
      console.log(this.$route.query.data);
      this.form.id = this.data.id;
      // console.log('data',this.data.records[0].type);
      var id = "";
      if (this.model == "0") {
        id = this.$route.query.data.data;
      } else {
        id = this.data.id;
      }
      const res = await getPollingByPageDetails({ id: id });
      console.log(res, 1212121);
      this.form = res.data.data.records[0];
      this.tableData = res.data.data.records[0].spotCheckSubunits;
    },
    closeDept() {
      this.showDept = false;
    },
    submitDept(val) {
      val.id = "";
      this.tableData.push(val);
      this.showDept = false;
    },
    submit() {
      this.form.maintenanceCycle = this.form.maintenanceCycle + this.unit;
      console.log(this.form);
      const params = {
        ...this.form,
        maintenanceStandardSubunits: this.tableData,
      };
      addOrUpdateMaintenanceStandard(params)
        .then((res) => {
          this.$message.success({
            message: "操作成功",
          });
          this.$router.push("/asset-management/patrolScheme");
          this.showDept = false;
        })
        .catch((e) => {
          this.showDept = false;
        });
    },
    handleBack() {
      this.$router.push({
        path: "/asset-management/patrolScheme",
      });
    },
    // 移除设备
    remove() {},
  },
};
</script>

<style>
.text-area .el-form--inline,
.text-area .el-form-item__content {
  width: 800px;
}
</style>