<template>
  <div class="pages addPages" v-loading="loading">
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
            <el-form-item label="单据编号:">
              <el-input
                v-if="type !== 'detail'"
                v-model="form.inventoryPlanningSn"
                disabled
              ></el-input>
              <span v-else>{{ form.inventoryPlanningSn }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="计划日期:" prop="planDate">
              <el-date-picker
                type="date"
                v-model="form.planDate"
                v-if="type !== 'detail'"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
              <span v-else>{{ form.planDate }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="开始时间:" prop="startTime">
              <el-time-picker
                v-model="form.startTime"
                v-if="type !== 'detail'"
                placeholder="选择时间"
                value-format="HH:mm:ss"
              >
              </el-time-picker>
              <span v-else>{{ form.startTime }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="结束时间:" prop="endTime">
              <el-time-picker
                v-model="form.endTime"
                v-if="type !== 'detail'"
                placeholder="选择时间"
                value-format="HH:mm:ss"
              >
              </el-time-picker>
              <span v-else>{{ form.endTime }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="盘点范围:" prop="inventoryRange">
              <el-input
                v-if="type !== 'detail'"
                v-model="form.inventoryRange"
                @focus="selectDepot"
              ></el-input>
              <span v-else>{{ form.inventoryRange }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="制单人:" prop="createUserName">
              <el-input
                v-if="type !== 'detail'"
                v-model="form.createUserName"
                disabled
                @focus="selectDepot"
              ></el-input>
              <span v-else>{{ form.createUserName }}</span>
            </el-form-item>
          </el-col>
        </el-row>
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
    <el-dialog append-to-body :visible.sync="showDept" title="盘点范围">
      <dept @on-cancel="closeDept" @on-submit="submitDept"></dept>
    </el-dialog>
  </div>
</template>

<script>
import {
  getList,
  addOrUpdateAssetInventoryPlanning,
  deptList,
  getAssetBookRequestByPageDetail,
} from "@/api/asset-management/assetInventory.js";
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
    model: {
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
      loading: false,
      module: "盘点计划",
      show: false,
      form: {
        assetSn: "",
        planDate: "",
        updateTime: "",
        endTime: "",
        department: "",
      },
      tableData: [],
      rules: {},
      file: [],
      range: [],
    };
  },
  async created() {
    if (this.type === "add") {
      const info = JSON.parse(localStorage.getItem("saber-userInfo"));
      this.form.createUserName = info.content["nick_name"];
      this.form.createUserId = info.content["user_id"];
    }
    const res = await deptList({ name: "", current: 1, size: 10 });
    this.range = res.data.data;
  },
  mounted() {
    if (this.type !== "add") {
      this.getDetailInfo();
    }
  },
  methods: {
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
      const res = await getAssetBookRequestByPageDetail({
        id: id,
      });
      this.form = res.data.data.records[0];
    },
    async submit() {
      this.loading = true;
      await addOrUpdateAssetInventoryPlanning(this.form);
      setTimeout(() => {
        this.loading = false;
        this.$message.success({
          message: "操作成功",
        });
        this.$router.push({
          path: "/asset-management/inventoryPlan",
        });
      }, 100);
    },
    handleBack() {
      this.$router.push({
        path: "/asset-management/inventoryPlan",
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