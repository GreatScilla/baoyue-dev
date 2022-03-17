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
          <el-col v-if="type !== 'add'" :span="12">
            <el-form-item label="计划编号:">
              <el-input
                v-if="type !== 'detail'"
                v-model="form.planSn"
                disabled
              ></el-input>
              <span v-else>{{ form.planSn }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="计划名称:" prop="planName">
              <el-input
                v-if="type !== 'detail'"
                v-model="form.planName"
              ></el-input>
              <span v-else>{{ form.planName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="计划部门:" prop="planDepartment">
              <el-input
                v-if="type !== 'detail'"
                v-model="form.planDepartment"
                @focus="selectDepot"
              ></el-input>
              <span v-else>{{ form.planDepartment }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required prop="startTime" label="开始时间:">
              <span v-if="type === 'detail'">{{ form.startTime }}</span>
              <el-date-picker
                v-else
                v-model="form.startTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd HH:mm:ss"
                placeholder="请选择"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required prop="endTime" label="结束时间:">
              <span v-if="type === 'detail'">{{ form.endTime }}</span>
              <el-date-picker
                v-else
                v-model="form.endTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd HH:mm:ss"
                placeholder="请选择"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-row>
      <el-row>
        <p>保养对象</p>
        <el-divider class="detail-divider"></el-divider>
      </el-row>
      <el-row>
        <el-button
          v-if="type !== 'detail'"
          type="primary"
          size="small"
          @click="showA"
          >添加设备分类</el-button
        >
        <el-button v-if="type !== 'detail'" size="small" @click="handleDelete"
          >移除设备分类</el-button
        >
        <el-col :span="24">
          <el-table
            @selection-change="handleSelectionChange"
            :data="tableData"
            :key="itemKey"
            border
            style="width: 100%"
          >
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="productSn" width="160" label="设备分类">
              <template slot-scope="scope">
                <p>{{ scope.row.productSn }}</p>
                <p>{{ scope.row.name }}</p>
                <p>{{ scope.row.model }}</p>
              </template>
            </el-table-column>
            <el-table-column>
              <!-- 设备 -->
              <div class="operation">
                <p>所属设备</p>
                <div v-if="type !== 'detail'">
                  <el-link
                    type="primary"
                    :underline="false"
                    @click="showAdd = true"
                    >添加</el-link
                  >
                  <el-link
                    type="danger"
                    :underline="false"
                    @click="deviceDelete"
                    >删除</el-link
                  >
                </div>
              </div>
              <el-table
                :data="standing_book_list"
                border
                style="width: 100%"
                @selection-change="devicehandleSelectionChange"
              >
                <el-table-column type="selection" width="50"></el-table-column>
                <el-table-column label="序号" width="60px">
                  <template slot-scope="scope">
                    <span>{{ scope.$index + 1 }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="assetSn" label="资产编号">
                </el-table-column>
                <el-table-column prop="facilitySn" label="设备编号">
                </el-table-column>
                <el-table-column prop="assetName" label="资产名称">
                </el-table-column>
                <el-table-column prop="model" label="规格型号">
                </el-table-column>
                <el-table-column prop="assetType" label="质保日期">
                </el-table-column>
                <el-table-column prop="department" label="权属部门">
                </el-table-column>
                <el-table-column prop="model" label="所在位置">
                </el-table-column>
                <el-table-column prop="whomBelongs" label="权属人">
                </el-table-column>
              </el-table>
              <!-- 标准 -->
              <div class="operation">
                <p>所需标准</p>
                <div v-if="type !== 'detail'">
                  <el-link
                    type="primary"
                    :underline="false"
                    @click="standardAdd = true"
                    >添加</el-link
                  >
                  <el-link
                    type="danger"
                    :underline="false"
                    @click="standardDelete"
                    >删除</el-link
                  >
                </div>
              </div>
              <el-table
                :data="standard_list"
                border
                style="width: 100%"
                @selection-change="standardhandleSelectionChange"
              >
                <el-table-column type="selection" width="50"></el-table-column>
                <el-table-column label="序号" width="60px">
                  <template slot-scope="scope">
                    <span>{{ scope.$index + 1 }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="standardSn" label="标准编号">
                </el-table-column>
                <el-table-column prop="standardName" label="标准名称">
                </el-table-column>
                <el-table-column prop="maintainType" label="保养分类">
                </el-table-column>
                <el-table-column prop="maintenanceParts" label="保养位置">
                </el-table-column>
                <el-table-column prop="maintenanceMethod" label="保养方法">
                </el-table-column>
                <el-table-column prop="maintenanceCycle" label="保养周期">
                </el-table-column>
              </el-table>
              <!-- 备件 -->
              <p>所需备件</p>
              <el-table :data="part_list" border style="width: 100%">
                <el-table-column label="序号" width="60px">
                  <template slot-scope="scope">
                    <span>{{ scope.$index + 1 }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="sparePartName" label="备件名称">
                </el-table-column>
                <el-table-column prop="model" label="规格型号">
                </el-table-column>
                <el-table-column prop="sparePartSn" label="备件编号">
                </el-table-column>
                <el-table-column prop="amount" label="所需数量">
                </el-table-column>
                <el-table-column prop="unit" label="单位"> </el-table-column>
              </el-table>
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
    <el-dialog append-to-body :visible.sync="showDept" title="选择部门">
      <dept @on-cancel="closeDept" @on-submit="submitDept"></dept>
    </el-dialog>
    <el-dialog append-to-body :visible.sync="show" width="70%" title="选择产品">
      <product-select
        :checkData="tableData"
        @on-cancel="handleCancel"
        @on-submit="addProduct"
      ></product-select>
    </el-dialog>
    <el-dialog append-to-body :visible.sync="showAdd" title="添加资产">
      <addDevice
        @on-cancel="closeAssets"
        :productSn="form.facilitySn"
        @on-submit="submitAssets"
      ></addDevice>
    </el-dialog>
    <el-dialog append-to-body :visible.sync="standardAdd" title="添加标准">
      <standard
        @on-cancel="closeAssets"
        :checkData="standard_list"
        @on-submit="submitStandard"
        :facilitySn="form.facilitySn"
      ></standard>
    </el-dialog>
  </div>
</template>

<script>
import {
  getMaintenanceScheduleByPageDetail,
  addOrUpdateMaintenanceSchedule,
} from "@/api/asset-management/maintainPlan.js";
import customer from "@/components/customer";
import upload from "@/mixins/upload";
import common from "@/mixins/common";
import saleType from "@/mixins/saleType";
import productSelect from "@/components/productSelect";
import addDevice from "@/components/addDevice";
import standard from "@/components/standard";
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
    standard,
  },
  mixins: [upload, common, saleType],
  data() {
    return {
      itemKey: "",
      module: "保养计划",
      show: false,
      form: {},
      tableData: [],
      rules: {},
      file: [],
      standing_book_list: [],
      standard_list: [],
      part_list: [],
      selectedData: [],
      showAdd: false,
      deviceData: "",
      standardAdd: false,
      standardData: "",
    };
  },
  created() {},
  mounted() {
    console.log("参数", this.type, this.model, this.$route.query.data.data);
    if (this.type !== "add") {
      this.getDetailInfo();
    }
  },
  methods: {
    // 分类显示
    showA() {
      if (this.tableData.length == 1) {
        this.$message.warning("只能选择一条数据哦！");
        return;
      }
      this.show = true;
    },
    // 移除设备
    handleSelectionChange(data) {
      this.selectedData = data;
    },
    devicehandleSelectionChange(data) {
      this.deviceData = data;
    },
    standardhandleSelectionChange(data) {
      this.standardData = data;
    },
    // 添加设备
    closeAssets() {
      this.showAdd = false;
      this.standardAdd = false;
    },
    submitAssets(val) {
      val.id = "";
      this.standing_book_list.push(val);
      this.showAdd = false;
    },
    submitStandard(val) {
      console.log(val);
      for (let i = 0; i < val.length; i++) {
        val[i].id = "";
      }
      this.standard_list = val;
      this.standardAdd = false;
      // 获取备件数据
      for (let i = 0; i < this.standard_list.length; i++) {
        var ele = this.standard_list[i].maintenanceStandardSubunits;
        if (ele.length != 0) {
          if (this.part_list.indexOf(ele) == -1) {
            this.part_list = ele;
          } else {
            //  ele.amount + this.part_list.amount
          }
        }
      }
      for (let i = 0; i < this.part_list.length; i++) {
        this.part_list[i].id = "";
      }
      this.itemKey = Math.random();
    },
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
              that.standing_book_list = [];
              that.standard_list = [];
              that.part_list = [];
            }
          });
        });
      }
    },
    // 设备删除
    deviceDelete() {
      var that = this;
      var val = this.deviceData;
      if (val.length === 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      }
      if (val) {
        val.forEach(function (item, index) {
          that.standing_book_list.forEach(function (itemI, indexI) {
            if (item === itemI) {
              that.standing_book_list.splice(indexI, 1);
            }
          });
        });
      }
    },
    // 标准删除
    standardDelete() {
      var that = this;
      var val = this.standardData;
      if (val.length === 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      }
      if (val) {
        val.forEach(function (item, index) {
          that.standard_list.forEach(function (itemI, indexI) {
            if (item === itemI) {
              that.standard_list.splice(indexI, 1);
            }
          });
        });
      }
    },
    // 选择设备分类
    async addProduct(list) {
      console.log("设备分类", list);
      this.show = false;
      list[0].id = "";
      this.tableData = list;
      this.form.facilitySn = list[0].productSn;
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
      const res = await getMaintenanceScheduleByPageDetail({
        id: id,
      });
      this.form = res.data.data.records[0];
      this.tableData.push({ productSn: this.form.facilitySn });
      this.standing_book_list =
        res.data.data.records[0].maintenanceScheduleEquipments;
      this.standard_list =
        res.data.data.records[0].maintenanceScheduleStandards;
      this.part_list = res.data.data.records[0].maintenanceSpareParts;
    },
    async submit() {
      if (this.tableData.length == 0) {
        this.$message.error({
          message: "请输入子单数据",
        });
        return;
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          const params = {
            ...this.form,
            maintenanceScheduleEquipments: this.standing_book_list,
            maintenanceScheduleStandards: this.standard_list,
            maintenanceSpareParts: this.part_list,
          };
          addOrUpdateMaintenanceSchedule(params).then((res) => {
            console.log(res);
          });

          this.$message.success({
            message: "操作成功",
          });
          this.$router.push({
            path: "/asset-management/maintainPlan",
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
        path: "/asset-management/maintainPlan",
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
.operation {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.operation p {
  margin: 0;
  background: 3;
}
.operation div a {
  margin-left: 10px;
}
</style>