<template>
  <div class="pages addPages">
    <el-form
      ref="form"
      :inline="true"
      :rules="rules"
      :model="form"
      :inline-message="true"
      label-width="100px"
      class="detail-form"
    >
      <el-row>
        <el-col :span="24">
          <span class="title">基本信息</span>
          <el-divider class="detail-divider"></el-divider>
        </el-col>
        <el-col :span="12">
          <el-form-item required label="单据编号:">
            <el-input
              v-if="type !== 'detail'"
              v-model="form.assetAdjustSn"
              disabled
            ></el-input>
            <span v-else>{{ form.assetAdjustSn }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item required label="单据日期:">
            <el-date-picker
              v-model="form.createTime"
              type="date"
              placeholder="选择日期"
              v-if="type !== 'detail'"
              disabled
            >
            </el-date-picker>
            <span v-else>{{ form.createTime }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="制单人:"
            v-if="type === 'detail'"
            prop="assetName"
          >
            <span>{{ form.createUserName }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-col :span="24">
        <span class="title">领用设备明细</span>
        <el-divider class="detail-divider"></el-divider>
      </el-col>
      <el-row v-if="type !== 'detail'">
        <el-col :span="24">
          <el-button type="primary" size="small" @click="showEquipment = true"
            >添加设备</el-button
          >
          <el-button size="small" @click="handleDelete">移除设备</el-button>
        </el-col>
      </el-row>
      <el-row class="margin-bottom-20">
        <el-col :span="24">
          <el-table
            border
            :data="tableData"
            class="margin-bottom-20"
            highlight-current-row
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              v-if="type !== 'detail'"
              width="50"
            ></el-table-column>
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
            <el-table-column prop="foldDepartment" label="调入部门">
              <template slot-scope="scope">
                <el-input
                  @focus="selectDepot(scope.$index)"
                  v-model="scope.row.foldDepartment"
                  v-if="type !== 'detail'"
                ></el-input>
                <span v-else>{{ scope.row.foldDepartment }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="foldLocation" label="调入位置">
              <template slot-scope="scope">
                <el-input
                  v-if="type !== 'detail'"
                  v-model="scope.row.foldLocation"
                ></el-input>
                <span v-else>{{ scope.row.foldLocation }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="foldWhomBelongs"
              width="120"
              label="调入负责人"
            >
              <template slot-scope="scope">
                <el-input
                  @focus="selectUser(scope.$index)"
                  v-model="scope.row.foldWhomBelongs"
                  v-if="type !== 'detail'"
                ></el-input>
                <span v-else>{{ scope.row.foldWhomBelongs }}</span>
              </template>
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
    <el-dialog append-to-body :visible.sync="showUser" title="选择人员">
      <user
        :deptId="deptId"
        @on-cancel="closeUser"
        @on-submit="submitUser"
      ></user>
    </el-dialog>
    <el-dialog append-to-body :visible.sync="showEquipment" title="添加设备">
      <addDevice
        @on-cancel="closeEquipment"
        :keyWord="1"
        @on-submit="submitEquipment"
      ></addDevice>
    </el-dialog>
  </div>
</template>

<script>
import {
  addOrUpdateAssetAdjust,
  getAssetAdjustByPage,
  assetswapDetail,
} from "@/api/asset-management/assetReallocation.js";
import customer from "@/components/customer";
import addDevice from "@/components/addDevice";
import upload from "@/mixins/upload";
import common from "@/mixins/common";
import saleType from "@/mixins/saleType";
import productSelect from "@/components/productSelect";
export default {
  name: "addAssetReallocation",
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
      module: "资产设备",
      show: false,
      form: {
        assetAdjustSn: "",
        // createTime: "",
        // remarks: "",
      },
      tableData: [],
      rules: {},
      file: [],
      showEquipment: false,
      selectedData: "",
      index: 0,
      indexUser: 0,
    };
  },
  created() {},
  mounted() {
    if (this.type !== "add") {
      this.getDetailInfo();
    }
  },
  methods: {
    handleSelectionChange(data) {
      this.selectedData = data;
    },
    selectDepot(index) {
      // 选择部门处理
      this.showDept = true;
      this.index = index;
    },
    submitDept(val) {
      let that = this;
      that.showDept = false;
      that.tableData.forEach(function (itemI, indexI) {
        if (indexI === that.index) {
          that.$set(itemI, "foldDepartment", val.deptName);
        }
      });
    },
    // 调入人员处理
    selectUser(index) {
      this.showUser = true;
      this.indexUser = index;
    },
    submitUser(val) {
      let that = this;
      that.showUser = false;
      that.tableData.forEach(function (itemI, indexI) {
        if (indexI === that.indexUser) {
          that.$set(itemI, "foldWhomBelongs", val.name);
          itemI.foldWhomBelongs = val.name;
        }
      });
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
    async getDetailInfo() {
      // 获取详情信息
      this.form.id = this.data.id;
      var id = "";
      if (this.model == "0") {
        id = this.$route.query.data.data;
      } else {
        id = this.data.id;
      }
      const res = await assetswapDetail({
        id: id,
      });
      this.form = res.data.data.records[0];
      this.tableData = res.data.data.records[0].assetAdjustSubunitList;
    },
    closeEquipment() {
      this.showEquipment = false;
    },
    submitEquipment(val) {
      val.id = "";
      this.tableData.push(val);
      this.showEquipment = false;
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const params = {
            ...this.form,
            assetAdjustSubunitList: this.tableData,
          };
          addOrUpdateAssetAdjust(params)
            .then((res) => {
              this.$message.success({
                message: "操作成功",
              });
              this.$router.push("/asset-management/assetReallocation");
              this.showEquipment = false;
            })
            .catch((e) => {
              this.showEquipment = false;
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
        path: "/asset-management/assetReallocation",
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