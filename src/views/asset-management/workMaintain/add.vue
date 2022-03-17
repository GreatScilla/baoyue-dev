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
            <el-form-item required label="保养单号:">
              <span>{{ form.workOrderSn }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="保养名称:" prop="planName">
              <span>{{ form.planName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              required
              label="保养部门:"
              prop="maintenanceDepartment"
            >
              <span>{{ form.maintenanceDepartment }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="保养人:" prop="maintenance">
              <span>{{ form.maintenance }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="开始时间:" prop="startTime">
              <span>{{ form.startTime }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="结束时间:" prop="endTime">
              <span>{{ form.endTime }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="资产编号:" prop="assetSn">
              <span>{{ form.assetSn }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="资产名称:" prop="assetName">
              <span>{{ form.assetName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="资产类别:" prop="facilitySn">
              <span>{{ form.facilitySn }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="型号:" prop="model">
              <span>{{ form.model }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-row>
      <el-row>
        <p>保养结果</p>
        <el-divider class="detail-divider"></el-divider>
      </el-row>
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
            <el-table-column prop="standardSn" label="标准编码" width="160px">
            </el-table-column>
            <el-table-column prop="standardName" label="标准名称">
            </el-table-column>
            <el-table-column prop="maintenanceParts" label="保养位置">
            </el-table-column>
            <el-table-column prop="maintenanceMethod" label="保养方法">
            </el-table-column>
            <el-table-column prop="department" label="*保养结果">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.maintenanceResult"
                  placeholder="请输入"
                  v-if="data.status != 3 && type !== 'detail'"
                ></el-input>
                <span v-else>{{ scope.row.maintenanceResult }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <p>备件消耗</p>
        <el-divider class="detail-divider"></el-divider>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table
            @selection-change="handleSelectionChange"
            :data="part_list"
            border
            style="width: 100%"
          >
            <el-table-column label="序号" width="60px">
              <template slot-scope="scope">
                <span>{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="sparePartName" label="备件名称">
            </el-table-column>
            <el-table-column prop="model" label="规格型号"> </el-table-column>
            <el-table-column prop="id" label="备件ID"> </el-table-column>
            <el-table-column prop="amount" label="所需数量"> </el-table-column>
            <el-table-column prop="unit" label="单位"> </el-table-column>

            <el-table-column prop="quantityConsumed" label="消耗数量">
              <template slot-scope="scope">
                <el-input
                  v-model="scope.row.quantityConsumed"
                  placeholder="请输入"
                  type="number"
                  v-if="data.status != 3 && type !== 'detail'"
                ></el-input>
                <span v-else>{{ scope.row.quantityConsumed }}</span>
              </template>
            </el-table-column>
            <el-table-column label="是否已归还">
              <template slot-scope="scope">
                <el-select
                  v-if="data.status != 3 && type !== 'detail'"
                  v-model="scope.row.isReturn"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in isReturnList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
                <span v-else>{{ (scope.row.isReturn = 0 ? "否" : "是") }}</span>
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
  commit,
  designate,
} from "@/api/asset-management/workMaintain.js";
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
      statusList: [
        { code: "0", name: "闲置" },
        { code: "1", name: "使用中" },
        { code: "2", name: "已报废" },
      ],
      module: "资产台账",
      show: false,
      form: {},
      tableData: [],
      rules: {},
      file: [],
      isReturnList: [
        { id: 0, name: "否" },
        { id: 1, name: "是" },
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
        workOrderSn: this.data.orderSn,
      };
      const params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        data: data,
      };
      const res = await getList(params);
      this.form = res.data.data.records[0];
      this.tableData = res.data.data.records[0].maintenanceScheduleStandards;
      this.part_list = res.data.data.records[0].maintenanceSpareParts;
    },
    // 保存
    async keep() {
      UpdateMaintenanceWorkOrder(this.form).then((res) => {
        console.log(res);
      });

      this.$message.success({
        message: "操作成功",
      });
      this.$router.push({
        path: "/asset-management/workMaintain",
      });
    },
    // 提交
    async submit() {
      commit(this.form).then((res) => {
        console.log(res);
      });

      this.$message.success({
        message: "操作成功",
      });
      this.$router.push({
        path: "/asset-management/workMaintain",
      });
    },
    //验收
    check() {
      designate(this.form, 1).then((res) => {
        console.log(res);
      });

      this.$message.success({
        message: "操作成功",
      });
      this.$router.push({
        path: "/asset-management/workMaintain",
      });
    },
    // 差异入库
    variance() {},
    handleBack() {
      this.$router.push({
        path: "/asset-management/workMaintain",
      });
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