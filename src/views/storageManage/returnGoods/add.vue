
<template>
  <basic-container>
    <el-form
      label-width="100px"
      :model="returnManagement"
      ref="returnManagement"
      :rules="rules"
      :inline-message="true"
    >
      <!-- <el-row class="operation-function" style="padding-left:8px">
        <el-radio-group v-model="tabPosition" class="detailTab" size="small">
          <el-radio-button label="top">列表</el-radio-button>
          <el-radio-button v-if="type!=='add'" label="right">新建</el-radio-button>
          <el-radio-button v-if="type!=='add'" label="bottom">编辑</el-radio-button>
          <el-radio-button v-if="type!=='add'" label="left">提交审核</el-radio-button>
        </el-radio-group>
      </el-row>
      <el-divider></el-divider>-->
      <el-row>
        <div class="title">产品明细</div>
        <el-divider class="detail-divider"></el-divider>
      </el-row>
      <el-table
        :data="returnManagement.returnManagementItems"
        style="margin-bottom: 20px"
        show-summary
        :summary-method="getSummaries"
      >
        <el-table-column
          type="index"
          width="100"
          align="center"
          v-if="type !== 'detail'"
          label="序号"
        >
          <template slot="header">
            <el-button
              type="text"
              icon="el-icon-plus"
              circle
              @click="addRow"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column width="80" align="center" v-if="type !== 'detail'">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-delete"
              circle
              @click="delRow(scope.$index)"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column label="图片" prop="pic" align="center" width="110">
          <template slot-scope="scope">
            <el-image
              v-if="scope.row.pic"
              style="width: 100px; height: 100px; padding-top: 5px"
              :src="scope.row.pic"
              fit="cover"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column
          label="产品编码"
          align="center"
          prop="productSn"
          width="150"
        >
          <template slot="header" slot-scope="scope">
            <span style="color: #f56c6c">*</span>产品编码
          </template>
          <template slot-scope="{ row, $index }">
            <span v-if="type === 'detail'">{{ row.productSn }}</span>
            <el-input
              v-else
              :disabled="row.productSn"
              style="width: 120px"
              size="small"
              v-model="row.productSn"
              @focus="openProductSn($index)"
              placeholder="请选择产品"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="产品名称"
          align="center"
          prop="productName"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="产品分类"
          align="center"
          prop="productCateName"
        ></el-table-column>
        <el-table-column
          label="规格型号"
          align="center"
          prop="model"
        ></el-table-column>
        <el-table-column
          label="单位"
          align="center"
          prop="unit"
        ></el-table-column>
        <el-table-column label="出库仓库" align="center" width="150">
          <template slot="header" slot-scope="scope">
            <span style="color: #f56c6c">*</span>出库仓库
          </template>
          <template slot-scope="scope">
            <span v-if="type === 'detail'">{{ scope.row.depotName }}</span>
            <el-select
              size="small"
              v-model="scope.row.depotId"
              placeholder="请选择仓库"
              v-else
            >
              <el-option
                v-for="item in scope.row.warehouseOptions"
                :key="item.id"
                :label="item.depotName"
                :value="item.id"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          label="退货数量"
          prop="quantity"
          align="center"
          width="120"
        >
          <!-- <template slot="header" slot-scope="scope">
            <span style="color:#F56C6C">*</span>退货数量
          </template>-->
          <template slot-scope="scope">
            <span v-if="type === 'detail'">{{ scope.row.quantity }}</span>
            <el-input
              v-else
              @change="
                (value, index, number) =>
                  changUnitPrice(
                    scope.row.quantity,
                    scope.$index,
                    scope.row.unitPrice
                  )
              "
              size="small"
              v-model="scope.row.quantity"
              placeholder="请输入"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="供应商"
          align="center"
          width="120"
          prop="unitPrice"
        >
          <template slot-scope="{ row, $index }">
            <span v-if="type === 'detail'">{{ row.contactUnitName }}</span>
            <el-input
              v-else
                
              size="small"
              v-model="row.contactUnitName"
              @focus="selectCustomer($index)"
              placeholder="请输入"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="退货成本单价"
          align="center"
          prop="unitPrice"
          width="150"
        >
          <template slot="header" slot-scope="scope">
            <span style="color: #f56c6c">*</span>退货成本单价
          </template>
          <template slot-scope="scope">
            <span v-if="type === 'detail'">{{ scope.row.unitPrice }}</span>
            <el-input
              v-else
                
              size="small"
              v-model="scope.row.unitPrice"
              @change="
                (value, index, number) =>
                  changUnitPrice(
                    scope.row.quantity,
                    scope.$index,
                    scope.row.unitPrice
                  )
              "
              placeholder="请输入"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="退货总金额"
          align="center"
          prop="unitTotalPrice"
          width="150"
        ></el-table-column>
        <el-table-column label="备注" align="center" width="100" prop="remark">
          <template slot-scope="{ row, $index }">
            <span v-if="type === 'detail'">{{ row.remark }}</span>
            <el-input
              v-else
              size="small"
              v-model="row.remark"
              placeholder="请输入"
            ></el-input>
          </template>
        </el-table-column>
      </el-table>
      <el-row>
        <div class="title">附件信息</div>
        <el-divider class="detail-divider"></el-divider>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="备注">
            <span v-if="type === 'detail'">{{ returnManagement.remark }}</span>
            <el-input v-else v-model="returnManagement.remark"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="附件信息:" style="margin-bottom: 6px">
        <upload-file
          :status="type"
          message
          :imageList="fileList"
          @on-success="onSuccess"
          @on-remove="onRemove"
        ></upload-file>
      </el-form-item>
    </el-form>
    <!-- 操作按钮 -->
    <el-row class="button-wrapper-footer">
      <el-button v-if="!examine" size="small" @click="cancel">取消</el-button>
      <el-button
        v-if="type !== 'detail'"
        size="small"
        type="primary"
        @click="saveReturnGoods"
        :loading="requesting"
        >保存</el-button
      >
    </el-row>
    <!-- 选择产品编号 -->
    <el-dialog append-to-body :visible.sync="productDialogVisible" width="80%">
      <product-select
        :checkData="returnManagement.returnManagementItems"
        @on-cancel="handleCancel"
        @on-submit="addProductList"
      ></product-select>
    </el-dialog>
    <!--选择客户-->
    <el-dialog append-to-body :visible.sync="showCustomer" title="选择客户">
      <customer
        category="1"
        @on-cancel="closeCustomer"
        @on-submit="submitCustomer"
      ></customer>
    </el-dialog>
  </basic-container>
</template>

<script>
import {
  addEditReturnGoods,
  detailsReturnGoods,
} from "@/api/storageManage/returnGoods";
import { findDepotByProductId } from "@/api/common";
import { getUserInfo } from "@/api/system/user.js";
import uploadFile from "@/components/uploadFile";
import productSelect from "@/components/productSelect";
import common from "@/mixins/common";
export default {
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
    uploadFile,
    productSelect,
  },
  mixins: [common],
  data() {
    return {
      requesting: false,
      index: 0,
      module: "仓储退货",
      returnManagement: {
        returnManagementItems: [
          {
            contactUnitName: "",
            contactUnitId: "",
          },
        ],
      },

      //   returnManagement: {
      //     returnManagement: {},
      //     returnManagementItems: [
      //       {
      //         contactUnitName: "",
      //         contactUnitId: ""
      //       }
      //     ]
      //   },
      fileList: [],
      warehouseOptions: [],
      selectAddDialogVisible: false,
      productDialogVisible: false,
    };
  },
  created() {
    if (this.type !== "add") {
      this.returnManagement = this.data;
      console.log(this.data);
      this.fileList = this.data.files;
    }
  },
  methods: {
    // 获取详情
    // async handleDetails() {
    //   let res = await detailsReturnGoods({ id: this.$route.query.row.id });
    //   this.returnManagement = res.data.data;
    //   console.log(this.returnManagement);
    //   this.fileList = this.returnManagement.returnManagement.files;
    // },
    // 取消选择产品
    handleCancel() {
      this.productDialogVisible = false;
    },
    //打开产品弹窗
    openProductSn(index) {
      this.productDialogVisible = true;
      this.index = index;
    },
    // 选择产品
    addProductList(list) {
      list.forEach((item, index) => {
        this.initWarehouse(item);
      });
      this.productDialogVisible = false;
    },
    async initWarehouse(item) {
      let res = await findDepotByProductId(item.id);
      if (res.data.success) {
        if (res.data.data.length === 0) {
          this.$message.warning(
            "此产品" + item.name + "无盘点仓库，请重新选择"
          );
        } else {
          const obj = {
            pic: item.pic,
            productId: item.id,
            productSn: item.productSn,
            productName: item.name,
            productCateName: item.productCategoryName,
            model: item.model,
            unit: item.unitName,
            warehouseOptions: res.data.data,
            contactUnitName:
              this.returnManagement.returnManagementItems[this.index]
                .contactUnitName,
            contactUnitId:
              this.returnManagement.returnManagementItems[this.index]
                .contactUnitId,
            quantity: 0,
            unitPrice: item.purPriceSuggest,
          };
          this.returnManagement.returnManagementItems.push(obj);
          this.returnManagement.returnManagementItems =
            this.returnManagement.returnManagementItems.filter((ele) => {
              if (!ele.productSn) {
                return false;
              } else {
                return true;
              }
            });
          this.returnManagement.returnManagementItems.push({});
          this.returnManagement.returnManagementItems.pop();
        }
      }
    },
    // 退货总金额
    changUnitPrice(value, index, number) {
      if (value && number) {
        this.$set(
          this.returnManagement.returnManagementItems[index],
          "unitTotalPrice",
          (Number(value) * Number(number)).toFixed(2)
        );
      }
    },
    // 附件上传
    onSuccess(value) {
      if (value) {
        this.returnManagement.returnManagement.files.push(value);
      }
    },
    // 附件删除
    onRemove(file) {
      this.returnManagement.returnManagement.files.forEach((item, index) => {
        if (file.url === item) {
          return this.returnManagement.returnManagement.files.splice(index, 1);
        }
      });
    },
    // 保存
    async saveReturnGoods() {
      try {
        await this.$refs.returnManagement.validate();
        this.returnManagement.returnManagementItems.forEach((item) => {
          if (!item.productSn) {
            throw "请选择产品编号";
          } else if (!item.depotId) {
            throw "请选择出库仓库";
          } else if (!item.quantity) {
            throw "请输入退货数量";
          } else if (!item.unitPrice) {
            throw "请输入退货成本单价";
          }
        });
      } catch (error) {
        this.$message.error(error);
        return;
      }
      this.requesting = true;
      try {
        let res = await addEditReturnGoods(this.returnManagement);
        this.requesting = false;
        if (res.data.success) {
          this.$message.success("操作成功");
          this.$router.push("/storageManage/returnGoods");
        }
      } catch {
        this.requesting = false;
      }
    },
    // 添加一行
    addRow() {
      this.returnManagement.returnManagementItems.push({
        contactUnitName: "",
        contactUnitId: "",
      });
    },
    // 删除一行
    delRow(index) {
      this.returnManagement.returnManagementItems.splice(index, 1);
    },
    // 取消
    cancel() {
      this.$router.push("/storageManage/returnGoods");
    },
    tabPosition() {},
    //自定义合计
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      const nums = [];
      data.forEach((info) => {
        if (info.orderType === 6) {
          nums.push(-Number(info.allPrice));
        } else {
          nums.push(Number(info.allPrice));
        }
        return nums;
      });
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (column.label === "退货数量" || column.label === "退货总金额") {
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
  },
};
</script>
<style lang="scss" scoped>
.el-input,
.el-select {
  width: 360px;
}
.el-table {
  .el-select {
    width: 120px;
  }
  .el-input {
    width: 90px;
  }
}
.selectAdd,
.noDataSelectAdd {
  margin: 5px 0 0 20px;
  font-size: 14px;
  color: #606266;
  cursor: pointer;
}
.noDataSelectAdd {
  margin: 10px 0 10px 20px;
}
</style>
