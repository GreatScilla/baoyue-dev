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
            <el-form-item label="资产编号:">
              <el-input
                v-if="type !== 'detail'"
                v-model="form.assetSn"
                disabled
              ></el-input>
              <span v-else>{{ form.assetSn }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="设备编号:" prop="facilitySn">
              <el-input
                v-if="type !== 'detail'"
                v-model="form.facilitySn"
                @focus="show = true"
              ></el-input>
              <span v-else>{{ form.facilitySn }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="资产名称:" prop="assetName">
              <el-input
                v-if="type !== 'detail'"
                v-model="form.assetName"
                disabled
              ></el-input>
              <span v-else>{{ form.assetName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="资产类别:" prop="assetType">
              <el-input
                v-if="type !== 'detail'"
                v-model="form.assetType"
                disabled
              ></el-input>
              <span v-else>{{ form.assetType }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="规格型号:" prop="model">
              <el-input
                v-if="type !== 'detail'"
                v-model="form.model"
                disabled
              ></el-input>
              <span v-else>{{ form.model }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计量单位:" prop="unit">
              <el-input
                v-if="type !== 'detail'"
                v-model="form.unit"
                disabled
              ></el-input>
              <span v-else>{{ form.unit }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="购置日期:" prop="purchaseDate">
              <el-date-picker
                type="date"
                v-if="type !== 'detail'"
                v-model="form.purchaseDate"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
              <span v-else>{{ form.purchaseDate }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="所在位置:" prop="location">
              <el-input
                v-if="type !== 'detail'"
                v-model="form.location"
              ></el-input>
              <span v-else>{{ form.location }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="状态:" prop="status">
              <el-select v-if="type !== 'detail'" v-model="form.status">
                <el-option
                  v-for="item of statusList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
              <span v-else>{{ form.status | statusName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="供应商:" prop="organName">
              <span v-if="type === 'detail'">{{ form.organName }}</span>
              <el-input
                v-else
                v-model="form.organName"
                @focus="selectCustomer"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="供应商电话:">
              <el-input
                v-if="type !== 'detail'"
                v-model="form.organPhone"
                disabled
              ></el-input>
              <span v-else>{{ form.organPhone }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="权属部门:" prop="department">
              <el-input
                v-if="type !== 'detail'"
                v-model="form.department"
                @focus="selectDepot"
              ></el-input>
              <span v-else>{{ form.department }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="权属人:">
              <el-input
                v-if="type !== 'detail'"
                v-model="form.whomBelongs"
                @focus="selectUser"
                :disabled="!form.department"
              ></el-input>
              <span v-else>{{ form.whomBelongs }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-row>
      <el-row>
        <p>更多信息</p>
        <el-divider class="detail-divider"></el-divider>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="品牌:">
            <span v-if="type === 'detail'">{{ form.assetBrand }}</span>
            <el-input v-else v-model="form.assetBrand"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item required label="购置金额:" prop="purchaseAmount">
            <span v-if="type === 'detail'">{{ form.purchaseAmount }}</span>
            <el-input v-else v-model="form.purchaseAmount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item required label="出厂日期:" prop="productionDate">
            <el-date-picker
              type="date"
              v-if="type !== 'detail'"
              v-model="form.productionDate"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
            <span v-else>{{ form.productionDate }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item required label="质保年限:" prop="warrantyPeriod">
            <span v-if="type === 'detail'">{{ form.warrantyPeriod }}</span>
            <el-input v-else v-model="form.warrantyPeriod"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="资产图片:">
          <upload-file
            @on-remove="handleRemove"
            @on-success="handleSuccess"
            :imageList="file"
            message="资产图片"
            :status="type"
          ></upload-file>
        </el-form-item>
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
      <el-row v-if="type == 'detail'">
        <p>设备记录</p>
        <el-divider class="detail-divider"></el-divider>
      </el-row>
      <el-row v-if="type == 'detail'">
        <el-col :span="2">
          <el-tabs
            @tab-click="tabClick"
            stretch="false"
            tab-position="left"
            style="height: 200px"
          >
            <el-tab-pane label="全部" />
            <el-tab-pane label="维修记录" />
            <el-tab-pane label="保养记录" />
            <el-tab-pane label="点检记录" />
            <el-tab-pane label="巡检记录" />
          </el-tabs>
        </el-col>
        <el-col :span="22">
          <el-table
            :header-cell-style="{ 'text-align': 'center' }"
            :cell-style="{ 'text-align': 'center', cursor: 'pointer' }"
            :data="equipmentList"
            border
            @row-click="clickData"
            style="width: 100%"
          >
            <el-table-column prop="orderSn" label="工单编号" />
            <el-table-column prop="time" label="工单日期" />
            <el-table-column prop="type" label="工单类型" />
            <el-table-column prop="person" label="负责人" />
            <el-table-column prop="remark" label="备注" />
          </el-table>
          <el-row class="pagination-wrapper margin-bottom-20">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="pageSizes"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              background
            >
            </el-pagination>
          </el-row>
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
  </div>
</template>

<script>
import {
  getList,
  addOrUpdateAssetBook,
  getEquipmentRecordByPage,
} from "@/api/asset-management/assetsParameter.js";
import customer from "@/components/customer";
import upload from "@/mixins/upload";
import common from "@/mixins/common";
import saleType from "@/mixins/saleType";
import productSelect from "@/components/productSelect";
import paginationMixin from "@/mixins/pagination";
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
  mixins: [paginationMixin, upload, common, saleType],
  data() {
    return {
      equipmentType: "",
      equipmentList: [],
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
    };
  },
  created() {},
  mounted() {
    if (this.type !== "add") {
      this.getDetailInfo();
    }
    if (this.type == "detail") {
      this.getEquipmentRecordByPageList();
    }
  },
  methods: {
    async getEquipmentRecordByPageList() {
      const params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        type: this.equipmentType,
        bookSn: this.data.assetSn,
      };
      const res = await getEquipmentRecordByPage(params);
      this.equipmentList = res.data.data.records;
      this.total = res.data.data.total;
    },
    //切换类型
    tabClick(e) {
      e.label == "维修记录"
        ? (this.equipmentType = "维修工单")
        : e.label == "保养记录"
        ? (this.equipmentType = "保养工单")
        : e.label == "点检记录"
        ? (this.equipmentType = "点检工单")
        : e.label == "巡检记录"
        ? (this.equipmentType = "巡检工单")
        : (this.equipmentType = "");
      this.getEquipmentRecordByPageList();
    },
    //行跳转详情
    clickData(row) {
      delete row.id;
      if (row.type == "维修工单") {
        this.$router.push({
          path: "/asset-management/repairOrder/detail",
          query: {
            data: row,
          },
        });
      } else if (row.type == "保养工单") {
        this.$router.push({
          path: "/asset-management/workMaintain/detail",
          query: {
            data: row,
          },
        });
      } else if (row.type == "巡检工单") {
        this.$router.push({
          path: "/asset-management/workPatrol/detail",
          query: {
            data: row,
          },
        });
      } else if (row.type == "点检工单") {
        this.$router.push({
          path: "/asset-management/workCheck/detail",
          query: {
            data: row,
          },
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
      const params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        data: this.form,
      };
      const res = await getList(params);
      this.form = res.data.data.records[0];
      if (this.form.assetPic.length > 0) {
        this.file = this.form.assetPic.split(",");
      }
    },
    async submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.form.assetPic = this.file.join(",");
          await addOrUpdateAssetBook(this.form);
          this.$message.success({
            message: "操作成功",
          });
          setTimeout(() => {
            this.$router.push({
              path: "/asset-management/assetsParameter",
            });
          }, 200);
        } else {
          this.$message.error({
            message: "请完善必填信息",
          });
        }
      });

      // try {
      //   await this.$refs.form.validate();
      // } catch (error) {
      //   this.$message.error({
      //     message: "请完善必填信息",
      //   });
      //   return;
      // }
      // this.form.assetPic = this.file.join(",");
      // const res = await addOrUpdateAssetBook(this.form);
      // this.$message.success({
      //   message: "操作成功",
      // });
      // this.$router.push({
      //   path: "/asset-management/assetsParameter",
      // });
    },
    handleBack() {
      this.$router.push({
        path: "/asset-management/assetsParameter",
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