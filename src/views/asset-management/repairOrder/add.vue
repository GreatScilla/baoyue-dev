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
            <el-form-item required label="工单单号:">
              <span>{{ form.maintainOrderSn }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="工单名称:" prop="assetsRepairName">
              <span>{{ form.assetsRepairName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="维修部门:" prop="maintainDepartment">
              <span>{{ form.maintainDepartment }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="维修人:" prop="maintain">
              <span>{{ form.maintain }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="工单日期:" prop="createTime">
              <span>{{ form.createTime }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="制单人:">
              <span>{{ form.createUserName }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-row>
      <el-row>
        <p>维修对象</p>
        <el-divider class="detail-divider"></el-divider>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-table
            border
            :data="tableData"
            class="margin-bottom-20"
            highlight-current-row
            @selection-change="handleSelectionChange"
          >
            <el-table-column prop="assetSn" label="资产编号"> </el-table-column>
            <el-table-column prop="facilitySn" label="设备编号">
            </el-table-column>
            <el-table-column prop="assetName" label="资产名称">
            </el-table-column>
            <el-table-column prop="assetType" label="资产类别">
            </el-table-column>
            <el-table-column prop="model" label="规格型号"> </el-table-column>
            <el-table-column prop="qualityAssuranceDate" label="质保日期">
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
      <el-row>
        <p>其它信息</p>
        <el-divider class="detail-divider"></el-divider>
      </el-row>
      <el-row>
        <el-form-item label="故障描述:">
          <span>{{ form.errorDescription }}</span>
        </el-form-item>
      </el-row>
      <el-row>
        <p>故障判断</p>
        <el-divider class="detail-divider"></el-divider>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item required label="故障类型:" prop="status">
            <span>{{ form.failureCause }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item required label="故障描述:" prop="remark">
            <span>{{ form.remark }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="data.status != 3 && !data.orderId">
        <p>消耗备件</p>
        <el-divider class="detail-divider"></el-divider>
      </el-row>
      <el-row v-if="type != 'detail'">
        <el-button
          v-if="data.status != 3 && !data.orderId"
          type="primary"
          size="small"
          @click="standardAdd = true"
          >添加配件</el-button
        >
        <el-button
          v-if="data.status != 3 && !data.orderId"
          size="small"
          @click="handleDelete"
          >移除配件</el-button
        >
      </el-row>
      <el-row>
        <el-table
          :data="form.maintainWorkOrderSubunits"
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
          <el-table-column prop="sparePartSn" label="备件编号">
          </el-table-column>
          <el-table-column label="消耗数量">
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
          <el-table-column prop="unit" label="单位"> </el-table-column>
        </el-table>
      </el-row>
      <el-row class="footer-box margin-bottom-20" v-if="data.status != 3">
        <el-button v-if="!examine" size="small" @click="handleBack"
          >取消</el-button
        >
        <el-button
          v-if="type !== 'detail' && !data.orderId"
          type="primary"
          size="small"
          @click="keep"
          >保存</el-button
        >
        <el-button
          v-if="type !== 'detail' && !data.orderId"
          type="primary"
          size="small"
          @click="submit"
          >提交</el-button
        >
        <el-button
          v-if="data.orderId"
          type="primary"
          size="small"
          @click="check(1)"
          >验收</el-button
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
          @click="check(2)"
          >不合格</el-button
        >
        <el-button
          v-if="type !== 'detail'"
          type="primary"
          size="small"
          @click="check(1)"
          >验收</el-button
        >
      </el-row>
    </el-form>
    <el-dialog append-to-body :visible.sync="standardAdd" title="添加备件">
      <part
        @on-cancel="closeAssets"
        :checkData="form.maintainWorkOrderSubunits"
        @on-submit="submitStandard"
      ></part>
    </el-dialog>
  </div>
</template>

<script>
import {
  getList,
  UpdateMaintenanceWorkOrder,
  commit,
  designate,
} from "@/api/asset-management/repairOrder.js";
import customer from "@/components/customer";
import upload from "@/mixins/upload";
import common from "@/mixins/common";
import saleType from "@/mixins/saleType";
import productSelect from "@/components/productSelect";
import part from "@/components/part";
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
    part,
  },
  mixins: [upload, common, saleType],
  data() {
    return {
      module: "资产台账",
      show: false,
      show1: false,
      form: {
        status: "0",
      },
      tableData: [],
      rules: {},
      file: [],
      isReturnList: [
        { id: 0, name: "否" },
        { id: 1, name: "是" },
      ],
      part_list: [],
      standardAdd: false,
    };
  },
  created() {},
  mounted() {
    this.getDetailInfo();
  },
  methods: {
    //移除备件
    handleDelete() {},
    // 添加设备
    closeAssets() {
      this.standardAdd = false;
    },
    submitStandard(val) {
      console.log(val);
      for (let i = 0; i < val.length; i++) {
        val[i].id = "";
      }
      this.form.maintainWorkOrderSubunits = val;
      this.standardAdd = false;
    },
    handleCancel() {
      this.show = false;
    },
    async getDetailInfo() {
      // 获取详情信息
      let data;
      if (this.data.orderId) {
        data = {
          id: this.data.orderId,
          // maintainOrderSn : this.data.orderSn,
        };
      } else {
        data = {
          id: this.data.id,
          // maintainOrderSn : this.data.orderSn,
        };
      }

      // this.form.maintainOrderSn = this.data.orderSn;
      const params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        data: data,
      };
      const res = await getList(params);
      this.form = res.data.data.records[0];
      this.form.maintainWorkOrderSubunits =
        res.data.data.records[0].maintainWorkOrderSubunits;
      this.tableData.push(this.form);
    },
    // 保存
    async keep() {
      UpdateMaintenanceWorkOrder(this.form).then((res) => {
        if (res.data.code === 200) {
          this.$message.success({
            message: "操作成功",
          });
          this.$router.push({
            path: "/asset-management/repairOrder",
          });
        }
      });
    },
    // 提交
    async submit() {
      try {
        await this.$confirm("提交之后不可修改！", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        const res = await commit(this.form);
        if (res.data.success) {
          this.$message.success("操作成功");
          this.$router.push({
            path: "/asset-management/repairOrder",
          });
        }
      } catch (error) {
        this.$message.error("操作失败");
      }
    },
    //验收 - 不合格
    check(num) {
      let routerName;
      if (this.data.orderId) {
        routerName = "assetRepair";
      } else {
        routerName = "repairOrder";
      }
      designate(this.form, num).then((res) => {
        if (res.data.code === 200) {
          this.$message.success({
            message: "操作成功",
          });
          this.$router.push({
            path: `/asset-management/${routerName}`,
          });
        }
      });
    },
    handleBack() {
      this.$router.push({
        path: "/asset-management/repairOrder",
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