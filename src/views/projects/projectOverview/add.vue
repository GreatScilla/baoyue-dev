//项目概览详情
<template>
  <basic-container>
    <el-form
      label-width="100px"
      :model="projectOverviewForm"
      ref="projectOverviewForm"
      class="detail-form"
      size="small"
    >
      <el-row style="margin-top: 20px">
        <el-col :span="8">
          <el-form-item
            required
            label="项目名称:"
            prop="roleName"
            :show-message="false"
          >
            <span v-if="type === 'detail'">{{
              projectOverviewForm.projectName
            }}</span>
            <el-input
              v-else
              v-model="projectOverviewForm.projectName"
              placeholder="请输入项目名称"
            ></el-input>
          </el-form-item>

          <el-form-item
            required
            label="客户名称:"
            prop="customerName"
            :show-message="false"
          >
            <span v-if="type === 'detail'">{{
              projectOverviewForm.customerName
            }}</span>
            <el-input
              v-else
              size="small"
              v-model="projectOverviewForm.customerName"
              placeholder="请输入客户名称"
              @focus="selectCustomer"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="计划工期:" prop="roleTypeId">
            <span v-if="type === 'detail'">{{
              projectOverviewForm.planPeriod
            }}</span>
            <el-input
              v-else
              size="small"
              type="number"
              v-model="projectOverviewForm.planPeriod"
              placeholder="请输入计划工期"
            ></el-input
            >月
          </el-form-item>
          <el-form-item label="状态:" prop="roleTypeId">
            <el-switch
              @change="changeType"
              v-model="projectOverviewForm.status"
              :active-value="0"
              :inactive-value="1"
              :disabled="type == 'detail'"
              active-color="#319b36"
              inactive-color="#ff4949"
            >
            </el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="this.type === 'detail' ? 6 : 8">
          <el-form-item label="项目负责人:">
            <span v-if="type === 'detail'">{{
              projectOverviewForm.projectLead
            }}</span>
            <el-input
              v-else
              @focus="employeeDialogVisible = true"
              suffix-icon="el-icon-search"
              v-model="projectOverviewForm.projectLead"
              placeholder="请选择项目负责人"
              readonly
            ></el-input>
          </el-form-item>

          <!-- <el-form-item label="项目编号:">
            <span v-if="type === 'detail'">{{ projectOverviewForm.projectSn }}</span>
            <el-input
              v-else
              size="small"
              v-model="projectOverviewForm.projectSn"
              placeholder="请输入项目编号"
            ></el-input>
          </el-form-item>-->
          <el-form-item label="客户联系人:" prop="customerLead">
            <span v-if="type === 'detail'">{{
              projectOverviewForm.customerLead
            }}</span>
            <el-input
              v-else
              size="small"
              v-model="projectOverviewForm.customerLead"
              placeholder="请输入客户联系人"
            ></el-input>
          </el-form-item>
          <el-form-item label="销售员:" prop="salesMan">
            <span v-if="type === 'detail'">{{
              projectOverviewForm.salesMan
            }}</span>
            <el-input
              v-else
              size="small"
              v-model="projectOverviewForm.salesMan"
              placeholder="销售员"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="发货限制:" prop="roleTypeId">
            <el-switch
              @change="changeType"
              v-model="projectOverviewForm.status"
              :active-value="0"
              :inactive-value="1"
              :disabled="type == 'detail'"
              active-color="#319b36"
              inactive-color="#ff4949"
            >
            </el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="contractSn" label="合同编号:">
            <span v-if="type === 'detail'">{{
              projectOverviewForm.contractSn
            }}</span>
            <el-input
              v-else
              size="small"
              @focus="contactDialogVisible = true"
              v-model="projectOverviewForm.contractSn"
              placeholder="请输入合同编号"
            ></el-input>
          </el-form-item>

          <el-form-item label="客户联系方式:" prop="customerPhone">
            <span v-if="type === 'detail'">{{
              projectOverviewForm.customerPhone
            }}</span>
            <el-input
              v-else
              size="small"
              v-model="projectOverviewForm.customerPhone"
              placeholder="请输入客户联系方式"
            ></el-input>
          </el-form-item>

          <el-form-item label="销售部门:">
            <span v-if="type === 'detail'">{{
              projectOverviewForm.depotName
            }}</span>
            <el-input
              v-else
              size="small"
              v-model="projectOverviewForm.depotName"
              placeholder="请输入销售部门"
              disabled
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="创建日期:" prop="resourceTypeId">
                        <span v-if="type === 'detail'">
                            {{ projectOverviewForm.createTime }}
                        </span>
                        <el-input
                            v-else
                            v-model="projectOverviewForm.createTime"
                            disabled
                        >
                        </el-input>
          </el-form-item>-->
        </el-col>
        <el-col :span="24">
          <form-table
            v-if="type == 'detail'"
            ref="product"
            :type="type"
            :list="productList"
            :data="productData"
          />
          <!-- 
          <el-table ref="product" :data="productTable" border style="width: 100%">
            <el-table-column type="index"> </el-table-column>

            <el-table-column prop="date" label="" width="50">
              <template>
                <div>
                  <el-button type="text">+</el-button>
                  <el-button type="text">-</el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="图片">
              <template slot-scope="scope">
                <div v-if="type == 'detail'">{{ scope.row.carSn }}</div>
                <el-input
                  v-else
                  ref="car"
                  v-model="scope.row.carSn"
                  @focus="goSelect('car', scope.$index)"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="产品编码">
              <template slot-scope="scope">
                <div v-if="type == 'detail'">
                  {{ sendTable[scope.$index].date }}
                </div>
                <el-input v-else></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="产品">
              <template slot-scope="scope">
                <div v-if="type == 'detail'">
                  {{ sendTable[scope.$index].date }}
                </div>
                <el-input v-else></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="规格型号">
              <template slot-scope="scope">
                <div v-if="type == 'detail'">
                  {{ sendTable[scope.$index].date }}
                </div>
                <el-input v-else></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="产品分类">
              <template slot-scope="scope">
                <div v-if="type == 'detail'">
                  {{ sendTable[scope.$index].date }}
                </div>
                <el-input v-else></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="单位">
              <template slot-scope="scope">
                <div v-if="type == 'detail'">
                  {{ sendTable[scope.$index].date }}
                </div>
                <el-input v-else></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="数量">
              <template slot-scope="scope">
                <div v-if="type == 'detail'">
                  {{ sendTable[scope.$index].date }}
                </div>
                <el-input v-else></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="单价">
              <template slot-scope="scope">
                <div v-if="type == 'detail'">
                  {{ sendTable[scope.$index].date }}
                </div>
                <el-input v-else></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="税率">
              <template slot-scope="scope">
                <div v-if="type == 'detail'">
                  {{ sendTable[scope.$index].date }}
                </div>
                <el-input v-else></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="含税金额">
              <template slot-scope="scope">
                <div v-if="type == 'detail'">
                  {{ sendTable[scope.$index].date }}
                </div>
                <el-input v-else></el-input>
              </template>
            </el-table-column>
            <el-table-column v-if="type != 'detail'" label="操作" width="100">
              <template slot-scope="scope">
                <div
                  class="el-button--text delete"
                  @click="deleteRow(scope.$index,'product')"
                >
                  删除
                </div>
              </template>
            </el-table-column>
          </el-table> -->
        </el-col>
      </el-row>
      <el-row class="building-radio">
        <span>是否有楼栋：</span>
        <el-radio :disabled="type == 'detail'" v-model="haveBuilding" :label="1"
          >有</el-radio
        >
        <el-radio :disabled="type == 'detail'" v-model="haveBuilding" :label="0"
          >没有</el-radio
        >
      </el-row>
      <el-row v-show="haveBuilding">
        <form-table
          ref="building"
          :type="type"
          :list="buildingList"
          :data="buildingData"
        />
        <!-- <el-table :data="sendTable" border style="width: 100%">
            <el-table-column type="index"> </el-table-column>
            <el-table-column prop="date" label="楼栋号">
              <template slot-scope="scope">
                <div v-if="type == 'detail'">
                  {{ sendTable[scope.$index].date }}
                </div>
                <el-input v-else></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="楼层">
              <template slot-scope="scope">
                <div v-if="type == 'detail'">
                  {{ sendTable[scope.$index].date }}
                </div>
                <el-input v-else></el-input>
              </template>
            </el-table-column>
            <el-table-column v-if="type != 'detail'" label="操作" width="100">
              <template slot-scope="scope">
                <div
                  class="el-button--text delete"
                  @click="deleteSendRow(scope.$index)"
                >
                  删除
                </div>
              </template>
            </el-table-column>
          </el-table> -->
      </el-row>
      <el-row class="title"> 工具领用和耗材 </el-row>
      <form-table ref="tool" :type="type" :list="toolList" :data="toolData" />
      <el-form-item label="附件信息:">
        <upload-file
          ref="uploader"
          :imageList="projectOverviewForm.files || []"
          :limit="6"
          multiple
          @on-success="onFileUploaded"
          @on-remove="onFilesChange"
        />
      </el-form-item>
    </el-form>
    <el-row class="button-wrapper-footer" style="margin-bottom: 27px">
      <el-button
        v-if="!examine"
        size="small"
        @click="$router.push('/projects/projectOverview')"
        >返回</el-button
      >
      <el-button
        v-if="type !== 'detail'"
        size="small"
        type="primary"
        @click="submitForm"
        >保存</el-button
      >
    </el-row>

    <!-- <form-table ></form-table> -->

    <!-- 选择负责人弹窗 -->
    <dialog-select
      title="项目负责人"
      :employeeDialogVisible.sync="employeeDialogVisible"
      @on-selected-personnel="onProjectLeadSelected"
    />
    <!-- 选择合同编号弹窗 -->
    <contact-messige
      title="合同编号"
      :contactDialogVisible.sync="contactDialogVisible"
      @on-selected-contact="onContactSelect"
    ></contact-messige>
    <!-- 选择客户名称 -->
    <el-dialog append-to-body :visible.sync="showCustomer" title="选择客户">
      <customer
        category="2"
        @on-cancel="closeCustomer"
        @on-submit="submitCustomer"
      ></customer>
    </el-dialog>
  </basic-container>
</template>

<script>
import {
  addEditProjectOverview,
  detailProjectOverview,
  getProductData,
} from "@/api/projects/projectOverview";
import common from "@/mixins/common";
import {
  addEditInAndOutBoundPage,
  getProductList,
  detailsInAndOutBoundPage,
} from "@/api/storageManage/inAndOutBound";
import { getContactUnitList } from "@/api/base-data/contactUnit";
import { getEmployeeList } from "@/api/humanResources/employeeFile";
import { getDepartmentList } from "@/api/humanResources/department";
import { getUserInfo } from "@/api/system/user.js";
import { getContractList } from "@/api/salesManage/contract";
import { getNowFormatDate } from "@/util/util";
import dialogSelect from "@/components/dialog-select/personnel";
import contactMessige from "@/components/dialog-select/contactMessige";
import uploadFile from "@/components/uploadFile";
import formTable from "@/components/formTable";
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
  mixins: [common],
  components: {
    dialogSelect,
    uploadFile,
    contactMessige,
    formTable,
  },
  data() {
    return {
      module: "项目",
      projectOverviewForm: {
        projectName: "",
        customerId: "", //客户id
        customerName: "", //客户名称
        customerLead: "", //客户联系人
        customerPhone: "", //客户联系方式
        status: "0",
      },
      expenseListTableData: [{ roleType: "123" }],
      productClassificationOptions: [],
      isSalesman: true,
      collectionOptions: [], // 付款单位
      deptOptions: [], // 部门
      settlementMethodOptions: [], // 结算方式
      employeeTableData: [], //业务员数据
      employeeDialogVisible: false, // 项目负责人对话框
      contactDialogVisible: false, //合同编号弹框
      elDialogTitle: "",
      rowEmployee: null,
      haveBuilding: 0,
      productTable: [],
      productData: "",
      productList: [
        {
          label: "图片",
          prop: "productPic",
          type: "image",
          placeholder: "请点击选择",
          onclick: function (i) {},
        },
        {
          label: "产品编码",
          prop: "productSn",
          type: "detail",
          widtd: "140",
        },
        {
          label: "产品",
          prop: "productName",
          type: "detail",
        },
        {
          label: "规格型号",
          prop: "model",
          type: "detail",
        },
        {
          label: "产品分类",
          prop: "productCategory",
          type: "detail",
        },
        {
          label: "单位",
          prop: "productUnit",
          type: "detail",
        },
        {
          label: "数量",
          prop: "productNum",
          type: "input",
          amount: true,
        },
        {
          label: "单价",
          prop: "productPrice",
          type: "input",
        },
        {
          label: "税率",
          prop: "taxRate",
          type: "input",
        },
        // {
        //   label: "含税金额",
        //   prop: "taxPrice",
        //   type: "input",
        //   amount: true,
        // },
      ],
      buildingData: "",
      buildingList: [
        {
          label: "楼栋号",
          prop: "buildingNo",
          type: "input",
        },
        {
          label: "楼层",
          prop: "floor",
          type: "input",
        },
      ],
      toolData: "",
      toolList: [
        {
          label: "工具名称",
          prop: "tool",
          type: "input",
        },
        {
          label: "数量",
          prop: "num",
          type: "input",
        },
        {
          label: "关联产品申请单",
          prop: "forSingle",
          type: "input",
        },
      ],
    };
  },
  created() {
    console.log(this.projectOverviewForm.contractSn);
    this.initResources();
    this.projectOverviewForm.createTime = getNowFormatDate();
    if (this.type !== "add") {
      this.initDetails();
    }
    this.reverse();
  },

  methods: {
    changeType(val) {
      this.projectOverviewForm.status = val;
    },
    // 详情
    reverse() {
      let arr = [];
      for (let i = 0; i < 6; i++) {
        arr[i] = {
          value: i + 1,
          next: arr[i + 1],
        };
      }
    },
    async initDetails() {
      let res = await detailProjectOverview({
        id: this.$route.query.data.id,
      });
      if (res.data.success) {
        this.projectOverviewForm = res.data.data;
        if (this.projectOverviewForm.file) {
          this.projectOverviewForm.files =
            this.projectOverviewForm.file.split(",");
        }
        let d = res.data.data;
        console.log("d", d);
        if (d.projectToolList.length > 0)
          this.$refs.tool.setData(d.projectToolList);
        if (d.projectFloorList.length > 0) {
          this.haveBuilding = 1;
          this.$refs.building.setData(d.projectFloorList);
        }
        if (this.type == "detail")
          this.getProductData(d.projectSn, d.customerId);
      }
    },
    getProductData(projectSn, memberId) {
      getProductData({ projectSn, memberId }).then((res) => {
        this.$refs.product.setData(res.data.data);
      });
    },
    // 选择申请人
    onProjectLeadSelected(e) {
      this.projectOverviewForm.projectLead = e.name;
    },
    //选择合同
    onContactSelect(e) {
      console.log(e);
      this.projectOverviewForm.contractSn = e.contractNumber;
      this.projectOverviewForm.contractName = e.contractName;
      this.projectOverviewForm.customerId = e.memberId;
      this.projectOverviewForm.customerName = e.memberName;
      this.projectOverviewForm.customerLead = e.linkName;
      this.projectOverviewForm.customerPhone = e.mobilePhone;
      this.projectOverviewForm.salesManId = e.salesManId;
      this.projectOverviewForm.salesMan = e.salesMan;
      this.projectOverviewForm.depotId = e.depotId;
      this.projectOverviewForm.depotName = e.depotName;
    },
    // 获取资源
    async initResources() {
      let promiseArray = [getProductList({ current: 0, size: 10000 })];
      let handlePromise = Promise.all(
        promiseArray.map((promiseItem) => {
          return promiseItem.catch(function (err) {
            return err;
          });
        })
      );
      let res = await handlePromise;
      this.productClassificationOptions = res[0].data.data.records;

      console.log(this.productClassificationOptions);
      // this.deptOptions = res[1].data.data
      // this.employeeTableData = res[2].data.data
      // this.projectOverviewForm.makePerson = res[3].data.data.realName
      // this.settlementMethodOptions = res[4].data.data
    },
    onFileUploaded(url) {
      if (!this.projectOverviewForm.files) {
        this.projectOverviewForm.files = [url];
      } else {
        this.projectOverviewForm.files.push(url);
      }
    },
    onFilesChange(list) {
      this.projectOverviewForm.files = list;
    },
    submitForm() {
      // 判断参数是否为空
      if (!this.projectOverviewForm.projectName) {
        return this.$message.warning("请输入项目名称");
      } else if (!this.projectOverviewForm.customerName) {
        return this.$message.warning("请输入客户名称");
      }
      this.$confirm("确定提交吗？")
        .then(async () => {
          const res = await addEditProjectOverview({
            ...this.projectOverviewForm,
            file: this.projectOverviewForm.files
              ? this.projectOverviewForm.files.join(",")
              : "",
            projectFloorList: this.haveBuilding
              ? this.$refs.building.getData().list
              : [],
            projectToolList: this.$refs.tool.getData().list,
          });
          if (res.data.success) {
            this.$message("提交成功");
            this.$router.push("/projects/projectOverview");
          } else {
            this.$message.warning(res.data.msg);
          }
        })
        .catch((_) => {});
    },
    // 选择业务员
    focusSalesman() {
      this.isSalesman = true;
    },
    // 选择经手人
    focusManager() {
      this.isSalesman = false;
    },
    // 单击选择人员
    clickRowEmployee(row) {
      this.rowEmployee = row;
    },
    // 添加一行
    addRow() {
      this.projectOverviewForm.projectProductList.push({});
    },
    // 删除一行
    delRow(index) {
      this.projectOverviewForm.projectProductList.splice(index, 1);
    },
    // 添加一行
    addBuildRow() {
      this.projectOverviewForm.projectBuildingList.push({});
    },
    // 删除一行
    delBuildRow(index) {
      this.projectOverviewForm.projectBuildingList.splice(index, 1);
    },

    // 人员保存
    confimEmployeeDialogVisible() {
      if (this.rowEmployee) {
        // this.userFormData.realName = this.clickRealName.name
        // this.userFormData.bladeUserId = this.clickRealName.bladeUserId
        this.employeeDialogVisible = false;
      } else {
        this.$message.info("请选择人员");
      }
    },
    // 选择收款单位
    changeCollection(value) {
      console.log(value);
      let item = this.collectionOptions.filter((item) => {
        return item.id === value;
      });
      this.projectOverviewForm.organName = item[0].name;
    },
    // 格式化日期
  },
};
</script>

<style lang="scss" scoped>
.el-input,
.el-select {
  width: 240px;
}
.el-table {
  .el-select {
    width: 140px;
  }
}
.building-radio {
  margin: 20px 0;
}
.title {
  margin-bottom: 10px;
}
</style>



