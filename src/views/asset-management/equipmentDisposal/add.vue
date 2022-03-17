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
      <el-row v-if="type !== 'add'">
        <el-col :span="24">
          <span class="title">基本信息</span>
          <el-divider class="detail-divider"></el-divider>
        </el-col>
        <el-row>
          <el-col :span="12">
            <el-form-item required label="处置编号:">
              <el-input
                v-if="type !== 'detail'"
                v-model="form.assetsDisposalSn"
                disabled
              ></el-input>
              <span v-else>{{ form.assetsDisposalSn }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="处置日期:">
              <el-date-picker
                type="date"
                v-if="type !== 'detail'"
                v-model="form.createTime"
                placeholder="选择日期"
                disabled
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
              <span v-else>{{ form.createTime }}</span>
            </el-form-item>
          </el-col>
          <el-col required :span="12">
            <el-form-item label="制单人:">
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
        <el-button v-if="type !== 'detail'" size="small" @click="handleDelete"
          >移除设备</el-button
        >
        <el-col :span="24">
          <el-table
            @selection-change="handleSelectionChange"
            :data="tableData"
            :summary-method="getSummaries"
            show-summary
            border
            style="width: 100%"
          >
            <el-table-column
              v-if="type !== 'detail'"
              type="selection"
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
            <el-table-column prop="department" label="所在部门">
            </el-table-column>
            <el-table-column prop="model" label="所在位置"> </el-table-column>
            <el-table-column prop="purchaseAmount" label="购置金额">
            </el-table-column>
            <el-table-column prop="model" label="数量"> </el-table-column>
            <el-table-column prop="unit" label="单位"> </el-table-column>
            <el-table-column prop="remark" label="处置原因">
              <template slot-scope="scope">
                <el-input
                  :disabled="type == 'detail'"
                  v-model="scope.row.remark"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="disposalPrice" label="处置价格">
              <template slot-scope="scope">
                <el-input
                  type="number"
                  :disabled="type == 'detail'"
                  v-model="scope.row.disposalPrice"
                ></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <p>处置信息</p>
        <el-divider class="detail-divider"></el-divider>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="处置方式:">
            <el-select
              v-if="type !== 'detail'"
              v-model="form.disposalWay"
              placeholder="请选择"
            >
              <el-option
                v-for="item in disposalWay"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
            <span v-else>{{ form.disposalWay }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item required label="处置人:">
            <el-input
              v-if="type !== 'detail'"
              v-model="form.disposalPerson"
              @focus="selectUser"
            ></el-input>
            <span v-else>{{ form.disposalPerson }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <p>其它信息</p>
        <el-divider class="detail-divider"></el-divider>
      </el-row>
      <el-row>
        <el-form-item label="备注:">
          <span v-if="type === 'detail'">{{ form.remark }}</span>
          <el-input
            placeholder="请输入备注"
            v-else
            v-model="form.remark"
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
      </el-row>
    </el-form>
    <el-dialog append-to-body :visible.sync="showCustomer" title="选择供应商">
      <customer
        category="1"
        @on-cancel="closeCustomer"
        @on-submit="submitCustomer"
      ></customer>
    </el-dialog>
    <el-dialog append-to-body :visible.sync="show" width="70%" title="选择产品">
      <product-select
        :checkData="tableData"
        @on-cancel="handleCancel"
        @on-submit="addProductList"
      ></product-select>
    </el-dialog>
    <el-dialog append-to-body :visible.sync="showDept" title="选择部门">
      <dept @on-cancel="closeDept" @on-submit="submitDept"></dept>
    </el-dialog>
    <el-dialog append-to-body :visible.sync="showUser" title="选择人员">
      <user
        :deptId="deptId"
        @on-cancel="closeUser"
        @on-submit="submitUser"
      ></user>
    </el-dialog>
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
  getList,
  equipmentDisposalDetail,
  addOrUpdateAssetsDisposal,
} from "@/api/asset-management/equipmentDisposal.js";
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
    customer,
    productSelect,
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
      form: {
        status: "0",
      },
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
    closeAssets() {
      this.showAdd = false;
    },
    submitAssets(val) {
      val.id = "";
      this.tableData.push(val);
      this.showAdd = false;
    },
    handleSelectionChange(data) {
      this.selectedData = data;
    },
    // 移除设备
    handleDelete() {
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
    // 合计行
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 1) {
          sums[index] = "合计";
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (column.label === "处置价格") {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
        } else {
          sums[index] = "";
        }
      });

      return sums;
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
      var id = "";
      if (this.model == "0") {
        id = this.$route.query.data.data;
      } else {
        id = this.data.id;
      }
      const res = await equipmentDisposalDetail({ id: id });
      this.form = res.data.data.records[0];
      this.tableData = res.data.data.records[0].assetsDisposalSubunitsList;
    },
    async submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const params = {
            ...this.form,
            assetsDisposalSubunitsList: this.tableData,
          };
          addOrUpdateAssetsDisposal(params)
            .then((res) => {
              this.$message.success({
                message: "操作成功",
              });
              this.$router.push("/asset-management/equipmentDisposal");
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
        path: "/asset-management/equipmentDisposal",
      });
    },
  },
  filters: {
    statusName(val) {
      if (val == "0") {
        val = "闲置";
      } else if (val == "1") {
        val = "使用中";
      } else if (val == "2") {
        val = "已报废";
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