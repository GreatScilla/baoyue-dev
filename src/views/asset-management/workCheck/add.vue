<template>
  <div class="pages addPages">
    <el-form
      ref="form"
      :inline="true"
      :rules="rules"
      :model="form"
      :show-message="false"
      label-width="100px"
      class="detail-form"
    >
      <el-row>
        <el-col :span="24">
          <span class="title">基本信息</span>
          <el-divider class="detail-divider"></el-divider>
        </el-col>
        <el-row>
          <el-col :span="12">
            <el-form-item required label="点检编号:">
              <span>{{ form.spotCheckOrderSn }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="点检名称:" prop="spotCheckName">
              <span>{{ form.spotCheckName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="点检部门:" prop="spotCheckDepartment">
              <span>{{ form.spotCheckDepartment }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="点检人:" prop="spotCheckPerson">
              <span>{{ form.spotCheckPerson }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="点检时间:" prop="spotCheckTime">
              <span>{{ form.spotCheckTime }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="计划周期:">
              <span>{{ form.planningCycle }}/{{ form.planningCycleUnit }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-row>
      <el-row>
        <p>点检明细</p>
        <el-divider class="detail-divider"></el-divider>
      </el-row>
      <el-form-item required label="点检算法:">
        <span>{{ form.tallyAlgorithm }}</span>
      </el-form-item>
      <el-row>
        <el-col :span="24">
          <el-table
            @selection-change="handleSelectionChange"
            :data="tableData"
            border
            style="width: 100%"
          >
            <el-table-column label="序号" width="60px">
              <template slot-scope="scope">
                <span>{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
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
            <el-table-column label="结果判定" width="120px">
              <template slot="header">
                <span style="color: #f56c6c">*</span>结果判定
              </template>
              <template slot-scope="{ row }">
                <span v-if="type === 'detail' || data.status == 3">{{
                  row.isReturn | isReturnName
                }}</span>
                <el-select
                  v-if="data.status != 3 && type !== 'detail'"
                  v-model="row.isReturn"
                >
                  <el-option
                    v-for="item in resultList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="result" label="点检结果" width="120px">
              <template slot="header">
                <span style="color: #f56c6c">*</span>点检结果
              </template>
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.remark"
                  placeholder="请输入"
                  v-if="data.status != 3 && type !== 'detail'"
                ></el-input>
                <span v-else>{{ scope.row.remark }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <p>其它信息</p>
        <el-divider class="detail-divider"></el-divider>
      </el-row>
      <el-row>
        <el-form-item label="备注:">
          <span>{{ form.remark }}</span>
        </el-form-item>
      </el-row>
      <el-row class="footer-box margin-bottom-20" v-if="data.status != 3">
        <el-button v-if="!examine" size="small" @click="handleBack"
          >取消</el-button
        >
        <el-button
          v-if="type !== 'detail'"
          type="primary"
          size="small"
          @click="keep"
          >保存</el-button
        >
        <el-button
          v-if="type !== 'detail'"
          type="primary"
          size="small"
          @click="submit"
          >提交</el-button
        >
      </el-row>
      <el-row class="footer-box margin-bottom-20" v-else>
        <el-button v-if="!examine" size="small" @click="handleBack"
          >取消</el-button
        >
        <el-button
          v-if="type !== 'detail'"
          type="primary"
          size="small"
          @click="check"
          >验收</el-button
        >
        <el-button
          v-if="type !== 'detail'"
          type="primary"
          size="small"
          @click="variance"
          >差异入库</el-button
        >
      </el-row>
    </el-form>
  </div>
</template>

<script>
import {
  getList,
  UpdateMaintenanceWorkOrder,
  // commit,
  // designate,
} from "@/api/asset-management/workMaintain.js";
import {
  getSpotCheckByPage,
  addOrUpdateSpotCheck,
  commit,
  designate,
} from "@/api/asset-management/workCheck.js";
import customer from "@/components/customer";
import upload from "@/mixins/upload";
import common from "@/mixins/common";
import saleType from "@/mixins/saleType";
import productSelect from "@/components/productSelect";
export default {
  name: "addContract",
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
  },
  components: {
    customer,
    productSelect,
  },
  mixins: [upload, common, saleType],
  data() {
    return {
      // module: "资产台账",
      show: false,
      form: {},
      tableData: [],
      rules: {},
      file: [],
      isReturnList: [
        { id: 0, name: "否" },
        { id: 1, name: "是" },
      ],
      resultList: [
        { id: "0", name: "正常" },
        { id: "1", name: "异常" },
      ],
      part_list: [],
    };
  },
  created() {},
  mounted() {
    this.getDetailInfo();
  },
  methods: {
    handleCancel() {
      this.show = false;
    },
    async getDetailInfo() {
      // 获取详情信息
      var data = {
        id: this.data.id,
        spotCheckOrderSn: this.data.orderSn,
      };
      const params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        data: data,
      };
      const res = await getSpotCheckByPage(params);
      console.log("res", res);
      this.form = res.data.data.records[0];
      this.tableData = res.data.data.records[0].spotCheckSubunits;
      this.part_list = res.data.data.records[0].maintenanceSpareParts;
    },
    // 保存
    async keep() {
      addOrUpdateSpotCheck(this.form).then((res) => {
        console.log(res);
      });

      this.$message.success({
        message: "操作成功",
      });
      this.$router.push({
        path: "/asset-management/workCheck",
      });
    },
    // 提交
    async submit() {
      if (this.tableData.some((val) => val.isReturn == null)) {
        return this.$message.warning("请选择判定结果");
      }
      if (this.tableData.some((val) => val.remark == "")) {
        return this.$message.warning("请输入点检结果");
      }
      commit(this.form).then((res) => {
        console.log("提交", res);
      });

      setTimeout(() => {
        this.$message.success({
          message: "操作成功",
        });
        this.$router.push({
          path: "/asset-management/workCheck",
        });
      }, 1000);
    },
    //验收
    check() {
      designate(this.form, 1).then((res) => {
        console.log(res);
      });
      setTimeout(() => {
        this.$message.success({
          message: "操作成功",
        });
        this.$router.push({
          path: "/asset-management/workCheck",
        });
      }, 1000);
    },
    // 差异入库
    variance() {},
    handleBack() {
      this.$router.push({
        path: "/asset-management/workCheck",
      });
    },
  },
  filters: {
    isReturnName(val) {
      console.log(val, 123);
      if (val == "0") {
        val = "正常";
      } else if (val == "1") {
        val = "异常";
      }
      return val;
    },
  },
};
</script>

<style>
.text-area .el-form--inline,
.text-area .el-form-item__content {
  width: 800px;
}
</style>