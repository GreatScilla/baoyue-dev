<template>
  <div class="pages addPages">
    <el-form
      ref="form"
      :inline="true"
      :rules="rules"
      :model="form"
      :show-message="false"
      label-width="120px"
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
                v-model="form.assetBorrowSn"
                disabled
              ></el-input>
              <span v-else>{{ form.assetBorrowSn }}</span>
            </el-form-item>
          </el-col>
          <el-col v-if="type !== 'add'" :span="12">
            <el-form-item required label="单据日期:" prop="createTime">
              <span>{{ form.createTime }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="借用部门:">
              <el-input
                v-if="type == 'add' || type == 'edit'"
                v-model="form.borrowDepartment"
                @focus="selectDepot"
              ></el-input>
              <span v-else>{{ form.borrowDepartment }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="借用人:">
              <el-input
                v-if="type == 'add' || type == 'edit'"
                v-model="form.borrower"
                @focus="selectUser"
                :disabled="!form.borrowDepartment"
              ></el-input>
              <span v-else>{{ form.borrower }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="预计归还日期:" prop="returnDate">
              <el-date-picker
                type="date"
                v-if="type == 'add' || type == 'edit'"
                v-model="form.returnDate"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
              <span v-else>{{ form.returnDate }}</span>
            </el-form-item>
          </el-col>
          <el-col required v-if="type !== 'add'" :span="12">
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
          v-if="type == 'add' || type == 'edit'"
          type="primary"
          size="small"
          @click="showAdd = true"
          >添加资产</el-button
        >
        <el-button
          v-if="type == 'add' || type == 'edit'"
          size="small"
          @click="handleDelete"
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
              v-if="type != 'detail'"
              width="50"
            ></el-table-column>
            <el-table-column prop="assetSn" label="资产编号" width="160px">
            </el-table-column>
            <el-table-column prop="facilitySn" label="设备编号" width="160px">
            </el-table-column>
            <el-table-column prop="assetName" label="资产名称">
            </el-table-column>
            <el-table-column prop="assetType" label="资产类别">
            </el-table-column>
            <el-table-column prop="model" label="规格型号"> </el-table-column>
            <el-table-column prop="department" label="权属部门">
            </el-table-column>
            <el-table-column prop="location" label="所在位置">
            </el-table-column>
            <el-table-column prop="whomBelongs" label="权属人">
            </el-table-column>
            <el-table-column
              v-if="type == 'return' || type == 'detail'"
              label="是否归还"
            >
              <template slot-scope="scope">
                <el-select
                  v-if="data.status == 2 || data.status == 4"
                  v-model="scope.row.isReturn"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in isReturnList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
                <span v-else>{{ scope.row.isReturn == 0 ? "否" : "是" }}</span>
              </template>
            </el-table-column>
            <el-table-column
              v-if="type == 'return' || type == 'detail'"
              label="归还日期"
            >
              <template slot-scope="scope">
                <el-date-picker
                  v-if="data.status == 2 || data.status == 4"
                  type="date"
                  v-model="scope.row.returnDate"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
                <span v-else>{{ scope.row.returnDate }}</span>
              </template>
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
    <el-dialog append-to-body :visible.sync="showAdd" title="添加资产">
      <addDevice @on-cancel="closeAssets" @on-submit="submitAssets"></addDevice>
    </el-dialog>
  </div>
</template>

<script>
import {
  getList,
  addOrUpdateAssetBorrow,
  UpdateAssetBorrow,
  borrowReturnDetail,
} from "@/api/asset-management/borrowReturn.js";
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
      module: "资产借用及归还",
      show: false,
      form: { status: "0" },
      tableData: [],
      rules: {},
      file: [],
      showAdd: false,
      selectedData: "",
      go: this.$route.query.go,
      isReturnList: [
        { id: "0", name: "否" },
        { id: "1", name: "是" },
      ],
      returnForm: {},
    };
  },
  created() {
  },
  mounted() {
    if (this.type !== "add") {
      this.getDetailInfo();
    }
  },
  methods: {
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
    closeAssets() {
      this.showAdd = false;
    },
    submitAssets(val) {
      val.id = "";
      this.tableData.push(val);
      this.showAdd = false;
    },
    handleCancel() {
      this.show = false;
    },
    async getDetailInfo() {
      // 获取详情信息
      this.form.id = this.data.id;
      // const params = {
      //   pageNum: this.currentPage,
      //   pageSize: this.pageSize,
      //   data: this.form,
      // };
      var id = "";
      if (this.model == "0") {
        id = this.$route.query.data.data;
      } else {
        id = this.data.id;
      }
      const res = await borrowReturnDetail({
        id: id,
      });
      // const res = await getList(params);
      this.form = res.data.data.records[0];
      this.tableData = res.data.data.records[0].assetBorrowSubunitList;
    },
    async submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const params = {
            ...this.form,
            assetBorrowSubunitList: this.tableData,
          };
          if (this.data.status == 2 || this.data.status == 4) {
            // 归还
            UpdateAssetBorrow(params).then((res) => {
            });
          } else {
            // 新增编辑
            addOrUpdateAssetBorrow(params).then((res) => {
            });
          }
          this.$message.success({
            message: "操作成功",
          });
          this.$router.push({
            path: "/asset-management/borrowReturn",
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
        path: "/asset-management/borrowReturn",
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