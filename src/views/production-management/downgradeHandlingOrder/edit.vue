// 降级处理单修改、详情
<template>
  <basic-container>
    <el-form
      label-width="120px"
      :inline="true"
      :model="form"
      class="detail-form"
      ref="form"
      :rules="rules"
      :show-message="false"
    >
      <el-row>
        <el-row style="margin-left: -35px">
          <div class="title">基本信息</div>
          <el-divider></el-divider>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="计划单号:">
              <span v-if="type === 'detail'">{{ form.planSn }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.planSn"
                placeholder="自动带出"
                disabled
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="form.depotSn">
            <el-form-item label="入库单据号:">
              <span v-if="type === 'detail'">{{ form.depotSn }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.depotSn"
                placeholder="自动带出"
                disabled
              >
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item required label="修正产品编码:" prop="materialSnNew">
              <span v-if="type === 'detail'">{{ form.materialSnNew }}</span>
              <el-input
                v-else
                class="iptWidth"
                v-model="form.materialSnNew"
                placeholder="请选择产品编码"
                suffix-icon="el-icon-search"
                @focus="checkProductVisible = true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="原产品编码:">
              <span v-if="type === 'detail'">{{ form.materialSn }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.materialSn"
                placeholder="自动带出"
                disabled
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="修正产品名称:">
              <span v-if="type === 'detail'">{{ form.materialNameNew }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.materialNameNew"
                placeholder="自动带出"
                disabled
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="原产品名称:">
              <span v-if="type === 'detail'">{{ form.materialName }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.materialName"
                placeholder="自动带出"
                disabled
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="修正规格型号:">
              <span v-if="type === 'detail'">{{ form.modelNew }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.modelNew"
                placeholder="自动带出"
                disabled
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="原规格型号:">
              <span v-if="type === 'detail'">{{ form.model }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.model"
                placeholder="自动带出"
                disabled
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="修正数量(方):" prop="sumNew">
              <span v-if="type === 'detail'">{{ form.sumNew }}</span>
              <el-input
                v-else
                size="small"
                oninput="value=value.replace(/[^0-9.]/g,'')"
                @keyup.native="handleKeyUp($event)"
                v-model="form.sumNew"
                placeholder="请输入"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="原数量(方):">
              <span v-if="type === 'detail'">{{ form.sum }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.sum"
                disabled
                placeholder="自动带出"
              >
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item required label="预进库位:" prop="location">
              <span v-if="type === 'detail'">{{ form.location }}</span>
              <el-select v-else v-model="form.location">
                <el-option
                  v-for="item of depotList"
                  :key="item.id"
                  :label="item.depotName"
                  :value="item.depotName"
                  @click.native="form.locationId = item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="生产班组:">
              <span v-if="type === 'detail'">{{ form.job }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.job"
                placeholder="自动带出"
                disabled
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="操作员:">
              <span v-if="type === 'detail'">{{ form.handsPersonName }}</span>
              <el-input
                v-else
                size="small"
                v-model="form.handsPersonName"
                placeholder="自动带出"
                disabled
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-row>
      <el-row class="button-wrapper-footer">
        <el-button size="small" @click="cancel">取消</el-button>
        <el-button
          v-if="type !== 'detail'"
          size="small"
          type="primary"
          @click="saveProducePlan"
          >保存</el-button
        >
      </el-row>
    </el-form>
    <!-- 选择产品 -->
    <el-dialog
      :visible.sync="checkProductVisible"
      top="20px"
      append-to-body
      width="70%"
      title="选择产品"
    >
      <productDia
        @on-cancel="handleCancel"
        @on-submit="addProductList"
      ></productDia>
    </el-dialog>
  </basic-container>
</template>
<script>
import { getDepot } from "@/api/common";
import productDia from "@/components/quality/productDia";
import {
  demotionWorkOrderUpdate,
  getDemotionWorkOrderByPageDetail,
} from "@/api/manufacture/downgradeHandlingOrder";
export default {
  props: {
    type: {
      type: String,
      default: "edit",
    },
    data: {
      type: Object,
      default: () => {
        return {};
      },
    },
    model: {
      type: String,
      default: "",
    },
  },
  components: {
    productDia,
  },
  data() {
    return {
      rules: {},
      checkProductVisible: false,
      depotList: [],
      form: {},
    };
  },
  async created() {
    this.getDetailInfo();
    const res = await Promise.all([
      getDepot(), //库位
    ]);
    this.depotList = res[0].data.data;
  },
  methods: {
    handleKeyUp(e) {
      if (e.target.value > this.form.sum) {
        e.target.value = 0;
        return this.$message.error("修正数量不能大于原数量!");
      }
    },
    async getDetailInfo() {
      // 获取详情信息
      this.form.id = this.data.id;
      var id = "";
      if (this.model == "0") {
        id = this.$route.query.data.data;
      } else if (this.type == "edit") {
        id = this.$route.query.data.id;
      } else if (this.type == "detail") {
        id = this.data.id;
      }
      const res = await getDemotionWorkOrderByPageDetail({
        id: id,
      });
      this.form = res.data.data;
      if (!this.form.handsPersonName) {
        const info = JSON.parse(localStorage.getItem("saber-userInfo"));
        this.form.handsPersonName = info.content["nick_name"];
        this.form.handsPersonId = info.content["user_id"];
      }
    },
    //获取产品
    async addProductList(val) {
      // this.form.productId = val.id; //产品ID
      this.form.materialNameNew = val.name; //	产品名称
      this.form.materialSnNew = val.productSn; //产品编号
      this.form.modelNew = val.model; //规格型号
      this.checkProductVisible = false;
    },
    //保存
    async saveProducePlan() {
      try {
        await this.$refs.form.validate();
      } catch (error) {
        this.$message.error({
          message: "请完善必填信息",
        });
        return;
      }
      demotionWorkOrderUpdate(this.form)
        .then((res) => {
          if (res.data.success) {
            this.$message.success("保存成功");
            this.$router.back();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // 取消
    cancel() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.el-col {
  margin-bottom: 0px;
}
.title {
  font-size: 16px;
  font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
  font-weight: bold;
  color: #3e3e3e;
  line-height: 16px;
}
.detail-form {
  padding: 30px 35px;
}
.el-input,
.el-select {
  width: 240px;
}
</style>
