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
        <el-col v-if="type !== 'add'" :span="12">
          <el-form-item required label="标准编码:">
            <el-input
              v-if="type !== 'detail'"
              v-model="form.standardSn"
              disabled
            ></el-input>
            <span v-else>{{ form.standardSn }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item required label="标准名称:" prop="standardName">
            <el-input
              v-if="type !== 'detail'"
              v-model="form.standardName"
              placeholder="请输入"
            ></el-input>
            <span v-else>{{ form.standardName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item required label="保养分类:" prop="maintainType">
            <el-input
              v-if="type !== 'detail'"
              v-model="form.maintainType"
              placeholder="请选择"
              @focus="show = true"
            ></el-input>
            <span v-else>{{ form.maintainType }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item required label="保养名称:" prop="maintainName">
            <el-input
              v-if="type !== 'detail'"
              v-model="form.maintainName"
              disabled
              placeholder="自动带出"
            ></el-input>
            <span v-else>{{ form.maintainName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item required label="规格型号:" prop="maintainModel">
            <el-input
              v-if="type !== 'detail'"
              v-model="form.maintainModel"
              disabled
              placeholder="自动带出"
            ></el-input>
            <span v-else>{{ form.maintainModel }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item required label="保养位置:" prop="maintenanceParts">
            <el-input
              v-if="type !== 'detail'"
              v-model="form.maintenanceParts"
              placeholder="请输入"
            ></el-input>
            <span v-else>{{ form.maintenanceParts }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item required label="保养方法:" prop="maintenanceMethod">
            <el-input
              v-if="type !== 'detail'"
              v-model="form.maintenanceMethod"
              placeholder="请输入"
            ></el-input>
            <span v-else>{{ form.maintenanceMethod }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item required label="保养周期:" prop="maintenanceCycle">
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
            <span v-else>{{ form.maintenanceCycle }}{{ unit }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-col :span="24">
        <span class="title">所需备件</span>
        <el-divider class="detail-divider"></el-divider>
      </el-col>
      <el-row v-if="type != 'detail'">
        <el-col :span="24">
          <el-button type="primary" size="small" @click="standardAdd = true"
            >添加备件</el-button
          >
          <el-button size="small" @click="remove()">移除备件</el-button>
        </el-col>
      </el-row>
      <el-row class="margin-bottom-20">
        <el-col :span="24">
          <el-table
            border
            @selection-change="handleSelectionChange"
            :data="tableData"
            class="margin-bottom-20"
            highlight-current-row
          >
            <el-table-column
              type="selection"
              v-if="type !== 'detail'"
              width="50"
            ></el-table-column>
            <el-table-column prop="sparePartName" label="备件名称">
            </el-table-column>
            <el-table-column prop="model" label="规格型号"> </el-table-column>
            <el-table-column prop="sparePartSn" label="备件编号">
            </el-table-column>
            <el-table-column label="所需数量" width="150" prop="amount">
              <template slot-scope="scope">
                <el-input
                  v-if="type !== 'detail'"
                  placeholder="请输入所需数量"
                  v-model="scope.row.amount"
                ></el-input>
                <span v-else>{{ scope.row.amount }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="unit" label="单位"> </el-table-column>
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
    <el-dialog append-to-body :visible.sync="show" width="70%" title="选择产品">
      <product-select
        :checkData="tableData"
        @on-cancel="handleCancel"
        @on-submit="addProductList"
      ></product-select>
    </el-dialog>
    <el-dialog append-to-body :visible.sync="showDept" title="添加设备">
      <addDevice @on-cancel="closeDept" @on-submit="submitDept"></addDevice>
    </el-dialog>
    <el-dialog append-to-body :visible.sync="standardAdd" title="添加备件">
      <part
        @on-cancel="closeDept"
        :checkData="tableData"
        @on-submit="submitStandard"
      ></part>
    </el-dialog>
  </div>
</template>

<script>
import {
  getList,
  addOrUpdateMaintenanceStandard,
} from "@/api/asset-management/maintainStandard.js";
import customer from "@/components/customer";
import addDevice from "@/components/addDevice";
import upload from "@/mixins/upload";
import common from "@/mixins/common";
import saleType from "@/mixins/saleType";
import productSelect from "@/components/productSelect";
import part from "@/components/part";
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
  },
  components: {
    customer,
    productSelect,
    addDevice,
    part,
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
      unitList: ["天/次", "周/次", "月/次", "季/次", "年/次"],
      standardAdd: false,
      selectedData: [],
      unit: "",
    };
  },
  created() {},
  mounted() {
    if (this.type !== "add") {
      this.getDetailInfo();
    }
  },
  methods: {
    submitStandard(val) {
      console.log(val);
      for (let i = 0; i < val.length; i++) {
        val[i].id = "";
      }
      this.tableData = val;
      this.standardAdd = false;
    },
    //资产数据
    addProductList(list) {
      console.log(list);
      this.show = false;
      this.form.maintainType = list[0].productSn;
      this.form.maintainName = list[0].name;
      this.form.maintainModel = list[0].model;
      console.log(list);
    },
    handleCancel() {
      this.show = false;
    },
    async getDetailInfo() {
      // 获取详情信息
      this.form.id = this.data.id;
      const params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        data: this.form,
      };
      const res = await getList(params);
      this.form = res.data.data.records[0];
      this.unit = this.form.maintenanceCycle.substring(
        this.form.maintenanceCycle.length - 3,
        this.form.maintenanceCycle.length
      );
      this.form.maintenanceCycle = this.form.maintenanceCycle.substring(
        0,
        this.form.maintenanceCycle.length - 3
      );
      this.tableData = res.data.data.records[0].maintenanceStandardSubunits;
    },
    closeDept() {
      this.showDept = false;
      this.standardAdd = false;
    },
    // closeDept() {
    //   this.showDept = false;
    // },
    submitDept(val) {
      val.id = "";
      this.tableData.push(val);
      this.showDept = false;
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.tableData.length == 0) {
            return this.$message.warning({
              message: "请选择备件数据",
            });
          }
          if (this.tableData.some((val) => val.amount == null)) {
            return this.$message.warning(`请输入所需数量`);
          }
          this.form.maintenanceCycle = this.form.maintenanceCycle + this.unit;
          const params = {
            ...this.form,
            maintenanceStandardSubunits: this.tableData,
          };
          addOrUpdateMaintenanceStandard(params)
            .then((res) => {
              this.$message.success({
                message: "操作成功",
              });
              this.$router.push("/asset-management/maintainStandard");
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
        path: "/asset-management/maintainStandard",
      });
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
  },
};
</script>

<style>
.text-area .el-form--inline,
.text-area .el-form-item__content {
  width: 800px;
}
</style>