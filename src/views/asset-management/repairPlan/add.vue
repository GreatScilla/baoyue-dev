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
            <el-form-item label="工单单号:">
              <el-input
                v-if="type !== 'detail'"
                v-model="form.assetsRepairSn"
                disabled
              ></el-input>
              <span v-else>{{ form.assetsRepairSn }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工单名称:">
              <el-input
                v-if="type !== 'detail'"
                v-model="form.assetsRepairName"
              ></el-input>
              <span v-else>{{ form.assetsRepairName }}</span>
            </el-form-item>
          </el-col>
          <el-col v-if="type !== 'add'" :span="12">
            <el-form-item label="工单日期:" prop="facilitySn">
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
          <el-col :span="12">
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
        <!-- <el-button type="primary" size="small" @click="showAdd = true"
          >添加设备</el-button
        > -->
        <el-col :span="24">
          <el-table
            @selection-change="handleSelectionChange"
            :data="tableData"
            border
            style="width: 100%"
          >
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
            <el-table-column prop="location" label="所在位置">
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
          <span v-if="type === 'detail'">{{ form.errorDescription }}</span>
          <el-input
            placeholder="请输入"
            v-else
            v-model="form.errorDescription"
          ></el-input>
        </el-form-item>
      </el-row>
      <!-- 操作 -->
      <div>
        <el-row>
          <p>故障判断</p>
          <el-divider class="detail-divider"></el-divider>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item required label="故障类型:" prop="failureCause">
              <el-select v-if="val == 1" v-model="form.failureCause">
                <el-option
                  v-for="item of disposalWay"
                  :key="item.dictKey"
                  :label="item.dictValue"
                  :value="item.dictValue"
                ></el-option>
              </el-select>
              <span v-else>{{ form.failureCause }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="故障描述:" prop="remark">
              <el-input v-if="val == 1" v-model="form.remark"></el-input>
              <span v-else>{{ form.remark }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <p>选择处理方式</p>
          <el-divider class="detail-divider"></el-divider>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item>
              <el-radio-group @change="changeRadio" v-model="form.processMode">
                <el-radio :disabled="type == 'detail'" :label="0"
                  >自主维修</el-radio
                >
                <el-radio :disabled="type == 'detail'" :label="1"
                  >委外维修</el-radio
                >
              </el-radio-group>
              <!-- <el-radio
                :disabled="type == 'detail'"
                v-model="form.processMode"
                label="0"
                >自主维修</el-radio
              >
              <el-radio
                :disabled="type == 'detail'"
                v-model="form.processMode"
                label="1"
                >委外维修</el-radio
              > -->
            </el-form-item>
          </el-col>
          <el-form-item v-if="form.processMode == 1">
            <el-col :span="12">
              <el-form-item required label="维修商:" prop="contractors">
                <el-input v-if="val == 1" v-model="form.contractors"></el-input>
                <span v-else>{{ form.contractors }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item required label="联系人:" prop="linkman">
                <el-input v-if="val == 1" v-model="form.linkman"></el-input>
                <span v-else>{{ form.linkman }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item required label="联系电话:" prop="phone">
                <el-input v-if="val == 1" v-model="form.phone"></el-input>
                <span v-else>{{ form.phone }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="预估时长:">
                <el-input
                  v-if="val == 1"
                  v-model="form.estimatedTime"
                ></el-input>
                <span v-else>{{ form.estimatedTime }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="预估费用:">
                <el-input
                  v-if="val == 1"
                  v-model="form.estimatedCost"
                ></el-input>
                <span v-else>{{ form.estimatedCost }}</span>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-row>
      </div>
      <el-row class="footer-box margin-bottom-20">
        <el-button v-if="!examine" size="small" @click="handleBack"
          >取消</el-button
        >
        <el-button
          v-if="type !== 'detail' || val == 1"
          type="primary"
          size="small"
          @click="submit"
          >保存</el-button
        >
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
  getMaintainDetails,
  addOrUpdateAssetsRepair,
} from "@/api/asset-management/repairPlan.js";
import upload from "@/mixins/upload";
import common from "@/mixins/common";
import saleType from "@/mixins/saleType";
import addDevice from "@/components/addDevice";
import { getDictionary } from "@/api/system/dictbiz";
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
      radio: 1,
      module: "设备处置",
      show: false,
      form: { processMode: 0 },
      tableData: [],
      rules: {},
      file: [],
      disposalWay: [], //故障原因
      selectedData: "",
      showAdd: false,
      val: this.$route.query.val,
    };
  },
  async created() {
    const res = await getDictionary({ code: "fault_type" });
    this.disposalWay = res.data.data;
  },
  mounted() {
    if (this.type !== "add") {
      this.getDetailInfo();
    }
    console.log(this.$route.query.val);
  },
  methods: {
    changeRadio(val) {
      if (val===0) {
        this.form.contractors=''
        this.form.linkman=''
        this.form.phone=''
        this.form.estimatedTime=''
        this.form.estimatedCost=''
      }
    },
    closeAssets() {
      this.showAdd = false;
    },
    submitAssets(val) {
      val.id = "";
      this.tableData.push(val);
      this.showAdd = false;
    },
    handleSelectionChange(data) {
      console.log(data);
      this.selectedData = data;
    },
    handleCancel() {
      this.show = false;
    },
    async getDetailInfo() {
      // 获取详情信息

      console.log(this.$route.query.data);
      this.form.id = this.data.id;
      var id = "";
      if (this.model == "0") {
        id = this.$route.query.data.data;
      } else {
        id = this.data.id;
      }
      const res = await getMaintainDetails({ id: id });
      console.log(res);
      this.form = res.data.data.records[0];
      this.form.processMode = res.data.data.records[0].processMode;
      this.tableData = res.data.data.records[0].assetsRepairSubunits;
    },
    async submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const params = {
            ...this.form,
            assetsRepairSubunits: this.tableData,
          };
          console.log(params);
          addOrUpdateAssetsRepair(params)
            .then((res) => {
              this.$message.success({
                message: "操作成功",
              });
              this.$router.push("/asset-management/repairPlan");
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
        path: "/asset-management/repairPlan",
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