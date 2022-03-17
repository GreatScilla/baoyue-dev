<template>
  <div class="pages addPages">
    <el-form
      ref="form"
      :inline="true"
      :rules="rules"
      :model="form"
      :show-message="false"
      label-width="110px"
      class="detail-form"
    >
      <el-row>
        <el-col :span="24">
          <span class="title">基本信息</span>
          <el-divider class="detail-divider"></el-divider>
        </el-col>
        <el-row>
          <el-col v-if="type !== 'add'" :span="12">
            <el-form-item required label="工单单号:">
              <el-input
                v-if="type !== 'detail'"
                v-model="form.assetsRepairSn"
                disabled
              ></el-input>
              <span v-else>{{ form.assetsRepairSn }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="工单名称:">
              <el-input
                v-if="type !== 'detail'"
                v-model="form.assetsRepairName"
              ></el-input>
              <span v-else>{{ form.assetsRepairName }}</span>
            </el-form-item>
          </el-col>
          <el-col v-if="type !== 'add'" :span="12">
            <el-form-item required label="工单日期:">
              <el-date-picker
                type="date"
                v-if="type !== 'detail'"
                v-model="form.createTime"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                disabled
              >
              </el-date-picker>
              <span v-else>{{ form.createTime }}</span>
            </el-form-item>
          </el-col>
          <el-col v-if="type !== 'add'" :span="12">
            <el-form-item required label="制单人:">
              <span>{{ form.createUserName }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-row>
      <el-row>
        <p>设备信息</p>
        <el-divider class="detail-divider"></el-divider>
      </el-row>
      <el-row>
        <el-button
          v-if="type !== 'detail'"
          type="primary"
          size="small"
          @click="showAdd = true"
          >添加设备</el-button
        >
        <el-button v-if="type !== 'detail'" size="small" @click="remove()"
          >移除设备</el-button
        >
        <el-col :span="24">
          <el-table
            @selection-change="handleSelectionChange"
            :data="tableData"
            border
            style="width: 100%"
          >
            <el-table-column
              type="selection"
              v-if="type !== 'detail'"
              width="50"
            ></el-table-column>
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
            <el-table-column prop="department" label="权属部门">
            </el-table-column>
            <el-table-column prop="location" label="所在位置">
            </el-table-column>
            <el-table-column prop="whomBelongs" label="权属人员">
            </el-table-column>
            <!-- <el-table-column prop="purchaseAmount" label="购置金额">
            </el-table-column> -->
            <!-- <el-table-column prop="model" label="数量"> </el-table-column> -->
            <!-- <el-table-column prop="unit" label="单位"> </el-table-column> -->
          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <p>其它信息</p>
        <el-divider class="detail-divider"></el-divider>
      </el-row>
      <el-row>
        <el-form-item label="故障描述:">
          <span v-if="type === 'detail'">{{ form.errorDescription }}</span>
          <el-input
            placeholder="请输入"
            v-else
            v-model="form.errorDescription"
          ></el-input>
        </el-form-item>
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
        <!-- <el-button
          v-if="type !== 'detail'"
          type="primary"
          size="small"
          @click="handleAcceptance"
          >验收</el-button
        > -->
      </el-row>
    </el-form>
    <el-dialog append-to-body :visible.sync="showAdd" title="添加设备">
      <addDevice
        :keyWord="2"
        @on-cancel="closeAssets"
        @on-submit="submitAssets"
      ></addDevice>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAssetsRepairByPageDetails,
  addOrUpdateAssetsRepair,
} from "@/api/asset-management/repairPlan.js";
import customer from "@/components/customer";
import upload from "@/mixins/upload";
import common from "@/mixins/common";
import saleType from "@/mixins/saleType";
import productSelect from "@/components/productSelect";
import addDevice from "@/components/addDevice";
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
    model: {
      type: String,
      default: "",
    },
  },
  components: {
    addDevice,
  },
  mixins: [upload, common, saleType],
  data() {
    return {
      statusList: [
        { code: "0", name: "闲置" },
        { code: "1", name: "使用中" },
        { code: "2", name: "已报废" },
      ],
      module: "设备处置",
      show: false,
      form: {},
      tableData: [],
      rules: {},
      file: [],
      disposalWay: [{ name: "变卖" }, { name: "报损" }, { name: "遗失" }], //处置方式
      selectedData: "",
      showAdd: false,
    };
  },
  created() {},
  mounted() {
    if (this.type !== "add") {
      this.getDetailInfo();
    }
  },
  methods: {
    //验收
    handleAcceptance() {
      addOrUpdateAssetsRepair().then((res) => {
        if (res.data.code == 200) {
          this.$message.success({
            message: "操作成功",
          });
          this.$router.push("/asset-management/assetRepair");
          this.showDept = false;
        }
      });
    },
    closeAssets() {
      this.showAdd = false;
    },
    submitAssets(val) {
      val.id = "";
      this.tableData.push(val);
      this.showAdd = false;
    },
    // 移除设备
    handleSelectionChange(data) {
      this.selectedData = data;
    },
    // 移除设备
    remove() {
      var that = this;
      var val = this.selectedData;
      if (val.length === 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      }
      if (val) {
        val.forEach(function (item, index) {
          that.tableData.forEach(function (itemI, indexI) {
            if (item === itemI) {
              that.tableData.splice(indexI, 1);
            }
          });
        });
      }
    },
    //资产数据
    addProductList(list) {
      this.show = false;
      this.form.facilitySn = list[0].productSn;
      this.form.assetName = list[0].name;
      this.form.assetType = list[0].productCategoryName;
      this.form.model = list[0].model;
      this.form.unit = list[0].unitName;
    },
    handleCancel() {
      this.show = false;
    },
    async getDetailInfo() {
      // 获取详情信息
      this.form.id = this.data.id;
      var id = "";
      if (this.model == "0") {
        id = this.$route.query.data.data;
      } else {
        id = this.data.id;
      }
      const res = await getAssetsRepairByPageDetails({ id: id });
      this.form = res.data.data.records[0];
      this.tableData = res.data.data.records[0].assetsRepairSubunits;
    },
    async submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const params = {
            ...this.form,
            assetsRepairSubunits: this.tableData,
          };
          addOrUpdateAssetsRepair(params)
            .then((res) => {
              this.$message.success({
                message: "操作成功",
              });
              this.$router.push("/asset-management/assetRepair");
              this.showDept = false;
            })
            .catch((e) => {
              this.showDept = false;
            });
        } else {
          this.$message.error({
            message: "请完善必填信息",
          });
        }
      });
    },
    handleBack() {
      this.$router.push({
        path: "/asset-management/assetRepair",
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