
<template>
  <basic-container>
    <el-form
      label-width="100px"
      :model="inboundManageForm"
      ref="inboundManageForm"
      :rules="rules"
      :inline-message="true"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="单据编号:"
            v-if="inboundManageForm.depotHead.number"
          >
            <span v-if="type === 'detail'">{{
              inboundManageForm.depotHead.number
            }}</span>
            <el-input
              v-else
              size="small"
              v-model="inboundManageForm.depotHead.number"
              :disabled="true"
              placeholder="自动编号"
            ></el-input>
          </el-form-item>
          <el-form-item required label="入库日期:" prop="depotHead.outJoinTime">
            <span v-if="type === 'detail'">{{
              inboundManageForm.depotHead.outJoinTime
            }}</span>
            <el-date-picker
              v-else
              size="small"
              v-model="inboundManageForm.depotHead.outJoinTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="部门:">
            <span v-if="type === 'detail'">{{
              inboundManageForm.depotHead.handsDepot
            }}</span>
            <el-select
              size="small"
              v-model="inboundManageForm.depotHead.handsDepotId"
              placeholder="请选择部门"
              v-else
              @change="changeDept"
            >
              <el-option
                v-for="item in deptOptions"
                :key="item.id"
                :label="item.deptName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="扫码:">
            <span v-if="type === 'detail'">{{
              inboundManageForm.depotHead.inboundName
            }}</span>
            <el-input
              v-else
              size="small"
              v-model="inboundManageForm.inboundName"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="车牌号">
            <span v-if="type === 'detail'">{{
              inboundManageForm.depotHead.licenseNumber
            }}</span>
            <el-input
              v-else
              suffix-icon="el-icon-search"
              placeholder="请选择车牌号"
              v-model="inboundManageForm.depotHead.licenseNumber"
              @focus="vehicleDialogVisible = true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item required label="入库类别:" prop="depotHead.typeClassId">
            <span v-if="type === 'detail'">{{
              inboundManageForm.depotHead.typeClass
            }}</span>
            <el-select
              size="small"
              v-model="inboundManageForm.depotHead.typeClassId"
              placeholder="请选择入库类别"
              @change="changeTypeClass"
              v-else
            >
              <el-option
                v-for="item in inAndOutBoundCategoryOptions"
                :key="item.dictKey"
                :label="item.dictValue"
                :value="item.dictKey"
              ></el-option>
              <!-- <div
                :slot="inAndOutBoundCategoryOptions.length > 0 ? null : 'empty'"
              >
                <div
                  :class="[
                    inAndOutBoundCategoryOptions.length > 0
                      ? 'selectAdd'
                      : 'noDataSelectAdd',
                  ]"
                  @click="selectAddDialogVisible = true"
                >
                  <i class="el-icon-plus"></i>
                  新增入库类别
                </div>
              </div> -->
            </el-select>
          </el-form-item>
          <el-form-item label="经办人:">
            <span v-if="type === 'detail'">{{
              inboundManageForm.depotHead.handsPersonName
            }}</span>
            <el-input
              v-else
              @click.native="employeeDialogVisible = true"
              size="small"
              suffix-icon="el-icon-search"
              v-model="inboundManageForm.depotHead.handsPersonName"
              placeholder="请选择经办人"
            ></el-input>
          </el-form-item>
          <el-form-item label="项目名称:">
            <el-input
              v-if="type !== 'detail'"
              v-model="inboundManageForm.depotHead.projectName"
              @focus="projectDialogVisible = true"
              suffix-icon="el-icon-search"
              placeholder="请选择项目名称"
            ></el-input>
            <span v-else>{{ inboundManageForm.depotHead.projectName }}</span>
          </el-form-item>
          <el-form-item label="客户名称:">
            <el-input
              disabled
              v-if="type !== 'detail'"
              v-model="inboundManageForm.depotHead.organName"
              placeholder="自动带出"
            ></el-input>
            <span v-else>{{ inboundManageForm.depotHead.organName }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-table
          :data="inboundManageForm.depotItems"
          style="margin-bottom: 20px"
        >
          <el-table-column
            type="index"
            width="100"
            align="center"
            v-if="type !== 'detail'"
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
            label="产品编号"
            align="center"
            prop="productSn"
            width="150"
          >
            <template slot="header" slot-scope="scope">
              <span style="color: #f56c6c">*</span>产品编号
            </template>
            <template slot-scope="scope">
              <span v-if="type === 'detail'">{{ scope.row.productSn }}</span>
              <el-input
                v-else
                :disabled="scope.row.productSn"
                style="width: 120px"
                size="small"
                v-model="scope.row.productSn"
                @focus="productDialogVisible = true"
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
            prop="productCate"
          ></el-table-column>
          <el-table-column
            label="规格型号"
            align="center"
            prop="productType"
          ></el-table-column>
          <el-table-column
            label="单位"
            align="center"
            prop="unit"
          ></el-table-column>
          <el-table-column label="入库仓库" align="center" width="150">
            <template slot="header" slot-scope="scope">
              <span style="color: #f56c6c">*</span>入库仓库
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
                  v-for="item in warehouseOptions"
                  :key="item.id"
                  :label="item.depotName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="数量" align="center" width="120">
            <template slot="header" slot-scope="scope">
              <span style="color: #f56c6c">*</span>数量
            </template>
            <template slot-scope="scope">
              <span v-if="type === 'detail'">{{ scope.row.operNumber }}</span>
              <el-input
                v-else
                  
                @change="
                  (value, index, number) =>
                    changUnitPrice(
                      scope.row.operNumber,
                      scope.$index,
                      scope.row.unitPrice
                    )
                "
                size="small"
                v-model="scope.row.operNumber"
                placeholder="请输入"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="单价"
            align="center"
            width="120"
            prop="unitPrice"
          >
            <template slot-scope="scope">
              <span v-if="type === 'detail'">{{ scope.row.unitPrice }}</span>
              <el-input
                v-else
                  
                size="small"
                v-model="scope.row.unitPrice"
                @change="
                  (value, index, number) =>
                    changUnitPrice(value, scope.$index, scope.row.operNumber)
                "
                placeholder="请输入"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="总价"
            align="center"
            prop="unitTotalPrice"
          ></el-table-column>
        </el-table>
      </el-row>

      <el-row>
        <el-form-item label="附件信息">
          <upload-file
            @on-remove="handleRemove"
            @on-success="handleSuccess"
            :imageList="file"
            :status="type"
          ></upload-file>
        </el-form-item>
      </el-row>
      <el-form-item label="备注:" prop>
        <span v-if="type === 'detail'">{{
          inboundManageForm.depotHead.remark
        }}</span>
        <el-input
          v-else
          size="small"
          v-model="inboundManageForm.depotHead.remark"
          placeholder="请输入备注"
        ></el-input>
      </el-form-item>
      <el-row>
        <el-row>
          <div class="title">更多信息</div>
          <el-divider class="detail-divider"></el-divider>
        </el-row>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="制单人:">
            <span v-if="type === 'detail'">{{
              inboundManageForm.depotHead.createUser
            }}</span>
            <el-input
              v-else
              size="small"
              v-model="inboundManageForm.depotHead.createUser"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="审核日期:" v-if="type === 'detail'">
            <span v-if="type === 'detail'">{{
              inboundManageForm.depotHead.checkTime
            }}</span>
            <el-input
              v-else
              size="small"
              v-model="inboundManageForm.depotHead.checkTime"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间:" v-if="type === 'detail'">
            <span v-if="type === 'detail'">{{
              inboundManageForm.depotHead.createTime
            }}</span>
            <el-input
              v-else
              size="small"
              v-model="inboundManageForm.depotHead.createTime"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="type === 'detail'">
          <el-form-item label="审核人:">
            <span v-if="type === 'detail'">{{
              inboundManageForm.depotHead.checkPerson
            }}</span>
            <el-input
              v-else
              size="small"
              :disabled="true"
              v-model="inboundManageForm.depotHead.checkPerson"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 操作按钮 -->
    <el-row class="button-wrapper-footer">
      <el-button v-if="!examine" size="small" @click="cancel">取消</el-button>
      <el-button
        v-if="type !== 'detail'"
        size="small"
        type="primary"
        @click="saveInboundManage"
        >保存</el-button
      >
    </el-row>
    <select-add
      label="入库类别"
      code="in_type_class"
      :selectAddDialogVisible="selectAddDialogVisible"
      @transmitSelectAdd="transmitSelectAdd"
    ></select-add>
    <!-- 选择人员 -->
    <dialog-select-personnel
      title="经办人"
      :employeeDialogVisible="employeeDialogVisible"
      @on-selected-personnel="onSelectedPersonnel"
    ></dialog-select-personnel>
    <!-- 选择产品编号 -->
    <el-dialog append-to-body :visible.sync="productDialogVisible" width="80%">
      <!-- <product-select
        :checkData="inboundManageForm.depotItems" -->
      <product-select
        :checkData="inboundManageForm.depotItems"
        @on-cancel="handleCancel"
        @on-submit="addProductList"
      ></product-select>
    </el-dialog>
    <!--车牌弹窗-->
    <dia-vehicle
      title="车牌"
      :vehicleDialogVisible.sync="vehicleDialogVisible"
      @on-selected-contact="onVehicleSelect"
    ></dia-vehicle>
    <!-- 项目弹窗 -->
    <projectSelect
      title="项目"
      :projectDialogVisible.sync="projectDialogVisible"
      @on-selected-contact="onProjectSelect"
    />
  </basic-container>
</template>

<script>
import {
  addEditInAndOutBoundPage,
  getProductList,
  detailsInAndOutBoundPage,
} from "@/api/storageManage/inAndOutBound";
import upload from "@/mixins/upload";
import { getUserInfo } from "@/api/system/user.js";
import { getWarehouseList } from "@/api/base-data/warehouseSetup";
import { getDictionary } from "@/api/system/dictbiz";
import selectAdd from "@/components/select-add/index";
// import uploadFile from "@/components/uploadFile";
import { getDepartmentList } from "@/api/humanResources/department";
import dialogSelectPersonnel from "@/components/dialog-select/personnel";
import productSelect from "@/components/productSelect";
import diaVehicle from "@/components/dialog-select/diaVehicle";
import projectSelect from "@/components/projectSelect";
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
    selectAdd,
    // uploadFile,
    productSelect,
    dialogSelectPersonnel,
    diaVehicle,
    projectSelect,
  },
  mixins: [upload],
  data() {
    return {
      inboundManageForm: {
        depotHead: {
          type: "入库",
          files: [],
        },
        depotItems: [{}],
      },
      inAndOutBoundCategoryOptions: [
        { dictKey: "7", dictValue: "生产入库" },
        { dictKey: "9", dictValue: "盘点入库" },
        { dictKey: "10", dictValue: "带回托盘" },
        { dictKey: "13", dictValue: "备品备件" },
        { dictKey: "15", dictValue: "修补切割入库" },
        { dictKey: "16", dictValue: "行政办公" },
      ],
      warehouseOptions: [],
      selectAddDialogVisible: false,
      defaultProps: {
        label: "cateName",
        children: "productCateList",
      },
      rules: {
        "depotHead.outJoinTime": [
          {
            required: true,
            message: "请选择入库日期",
            trigger: ["blur", "change"],
          },
        ],
        "depotHead.typeClassId": [
          {
            required: true,
            message: "请选择入库类别",
            trigger: ["blur", "change"],
          },
        ],
      },
      productDialogVisible: false,
      deptOptions: [],
      employeeDialogVisible: false,
      vehicleDialogVisible: false, //展示车牌
      projectDialogVisible: false, //项目弹窗
    };
  },
  created() {
    this.handleResources();
    if (this.type !== "add") {
      this.handleDetails();
    }
  },
  methods: {
    // 获取详情
    async handleDetails() {
      let res = await detailsInAndOutBoundPage({ id: this.data.id });
      this.inboundManageForm = res.data.data;
      this.file = res.data.data.depotHead.files;
    },
    // 获取出入库类别
    async handleResources() {
      let res = await Promise.all([
        getDictionary({ code: "in_type_class" }),
        getUserInfo(),
        getWarehouseList(),
        getDepartmentList(),
      ]);
      // this.inAndOutBoundCategoryOptions = res[0].data.data;
      this.inboundManageForm.depotHead.createUser = res[1].data.data.realName;
      this.warehouseOptions = res[2].data.data;
      this.deptOptions = res[3].data.data;
    },
    // 新增入库类别传递
    async transmitSelectAdd(value) {
      if (value === "addSuccess") {
        let res = await getDictionary({ code: "in_type_class" });
        if (res.data.success) {
          this.inAndOutBoundCategoryOptions = res.data.data;
        }
      } else {
        this.selectAddDialogVisible = value;
      }
    },
    // 取消选择产品
    handleCancel() {
      this.productDialogVisible = false;
    },
    // 选择产品
    addProductList(list) {
      list.forEach((item, index) => {
        const obj = {
          pic: item.pic,
          productId: item.id,
          productName: item.name,
          productSn: item.productSn,
          productCate: item.productCategoryName,
          productType: item.model,
          unit: item.unitName,
        };
        this.inboundManageForm.depotItems.push(obj);
        this.inboundManageForm.depotItems =
          this.inboundManageForm.depotItems.filter((ele) => {
            if (!ele.productSn) {
              return false;
            } else {
              return true;
            }
          });
        this.inboundManageForm.depotItems.push({});
        this.inboundManageForm.depotItems.pop();
      });
      this.productDialogVisible = false;
    },
    // 选择出入库类别
    changeTypeClass(value) {
      let item = this.inAndOutBoundCategoryOptions.filter((item) => {
        return item.dictKey === value;
      });
      this.inboundManageForm.depotHead.typeClass = item[0].dictValue;
    },
    // 入库成本单价
    changUnitPrice(value, index, number) {
      if (value && number) {
        this.$set(
          this.inboundManageForm.depotItems[index],
          "unitTotalPrice",
          (Number(value) * Number(number)).toFixed(2)
        );
      }
    },
    // 选择部门
    changeDept(value) {
      let item = this.deptOptions.filter((item) => {
        return item.id === value;
      });
      this.inboundManageForm.depotHead.handsDepot = item[0].deptName;
    },
    // 选择人员
    onSelectedPersonnel(value) {
      if (value) {
        this.inboundManageForm.depotHead.handsPersonName = value.name;
        this.inboundManageForm.depotHead.handsPersonId = value.id;
      }
      this.employeeDialogVisible = false;
    },
    // // 上传附件
    // async uploadAttachment(e) {
    //   let res = await client.put(e.file.name, e.file)
    //   if (res.res && res.res.status == 200) {
    //     this.inboundManageForm.depotHead.files.push(res.url)
    //   }
    // },
    // // 删除附件
    // handleRemove(file,fileList){
    //   console.log(file)
    //   this.inboundManageForm.depotHead.files.forEach((item,index) => {
    //     if(file.url === item){
    //       return this.inboundManageForm.depotHead.files.splice(index,1)
    //     }
    //   })
    // },
    // 保存
    async saveInboundManage() {
      try {
        await this.$refs.inboundManageForm.validate();
        this.inboundManageForm.depotItems.forEach((item) => {
          if (!item.productSn) {
            throw "请选择产品编号";
          } else if (!item.depotId) {
            throw "请选择入库仓库";
          } else if (!item.operNumber) {
            throw "请输入数量";
          }
        });
      } catch (error) {
        this.$message.error(error);
        return;
      }
      this.inboundManageForm.depotHead.files = this.file;
      let res = await addEditInAndOutBoundPage(this.inboundManageForm);
      if (res.data.success) {
        this.$message.success("操作成功");
        this.$router.push("/storageManage/inboundManage");
      }
    },
    // 添加一行
    addRow() {
      this.inboundManageForm.depotItems.push({});
    },
    // 删除一行
    delRow(index) {
      this.inboundManageForm.depotItems.splice(index, 1);
    },
    // 取消
    cancel() {
      this.$router.back();
    },
    //选择车牌
    onVehicleSelect(val) {
      this.inboundManageForm.depotHead.licenseNumber = val.licenseNumber;
      this.inboundManageForm.depotHead.carId = val.id;
      this.inboundManageForm.depotHead.carSn = val.carSn;
      this.inboundManageForm.depotHead.driverName = val.driverName;
    },
    //选择项目
    onProjectSelect(e) {
      this.inboundManageForm.depotHead.projectSn = e.projectSn;
      this.inboundManageForm.depotHead.projectName = e.projectName;
      this.inboundManageForm.depotHead.organName = e.customerName;
      this.inboundManageForm.depotHead.organId = e.customerId;
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
