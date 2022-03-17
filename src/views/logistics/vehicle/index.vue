//车盘管理
<template>
  <basic-container>
    <el-dialog
      class="search-dialog"
      :visible.sync="searchDialogVisible"
      :before-close="handleClose"
      title="查询条件"
      append-to-body
      width="640px"
    >
      <el-form
        ref="searchForm"
        :model="params"
        label-width="100px"
        class="form-footer"
      >
        <el-form-item label="车辆号">
          <el-input
            placeholder="请输入车辆号"
            v-model="params.licenseNumber"
          ></el-input>
        </el-form-item>
        <el-form-item label="车型">
          <el-input
            placeholder="请输入车型"
            v-model="params.carType"
          ></el-input>
        </el-form-item>
        <el-form-item label="最大体积">
          <div class="allNum">
            <el-select
              size="small"
              v-model="params.maxVolumeType"
              placeholder="请选择"
            >
              <el-option
                v-for="item in orderAllNumTypeList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
            <div style="text-algin: center; color: #dddfe7; padding: 0 10px">
              一
            </div>
            <el-input
              placeholder="请输入"
              v-model="params.maxVolume"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="载重">
          <div class="allNum">
            <el-select
              size="small"
              v-model="params.heavyType"
              placeholder="请选择"
            >
              <el-option
                v-for="item in orderAllNumTypeList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
            <div style="text-algin: center; color: #dddfe7; padding: 0 10px">
              一
            </div>
            <el-input placeholder="请输入" v-model="params.heavy"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="空车重量">
          <div class="allNum">
            <el-select
              size="small"
              v-model="params.carHeavyType"
              placeholder="请选择"
            >
              <el-option
                v-for="item in orderAllNumTypeList"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
            <div style="text-algin: center; color: #dddfe7; padding: 0 10px">
              一
            </div>
            <el-input placeholder="请输入" v-model="params.carHeavy"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="默认司机">
          <el-input
            placeholder="请输入默认司机"
            v-model="params.driverName"
          ></el-input>
        </el-form-item>
        <el-form-item label="司机电话">
          <el-input
            placeholder="请输入司机电话"
            v-model="params.driverPhone"
          ></el-input>
        </el-form-item>
        <el-form-item label="运输证有效期">
          <el-date-picker
            v-model="searchDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="区域">
          <p class="pwrap">
            <!-- <v-distpicker
              @selected="selected"
              :province="sendArea[0]"
              :city="sendArea[1]"
              :area="sendArea[2]"
            ></v-distpicker> -->
            <v-distpicker
              :province="regForm.comAddress.province"
              :city="regForm.comAddress.city"
              :area="regForm.comAddress.area"
              @selected="addressChecked"
              @province="onChangeProvince"
              @city="onChangeCity"
              @area="onChangeArea"
            ></v-distpicker>
          </p>
        </el-form-item>
        <el-form-item style="margin-top: 40px" class="search-footer">
          <el-button @click="reset" size="small">重置</el-button>
          <el-button type="primary" size="small" @click="searchRole"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>

    <avue-crud
      ref="crud"
      :option="option"
      :page.sync="page"
      :table-loading="loading"
      @on-load="getList"
      @row-update="rowUpdate"
      @row-save="rowSave"
      @row-del="rowDel"
      v-model="form"
      :data="data"
      :before-open="beforeOpen"
      @selection-change="muiltiSelect"
      @search-change="searchChange"
      @refresh-change="refreshChange"
    >
      <template slot="menuLeft">
        <el-button
          v-if="permission.vehicle_add"
          type="primary"
          size="small"
          @click="openSearchPop"
        >
          <i class="el-icon-search"></i>
          查询</el-button
        >
        <el-button
          v-if="permission.vehicle_add"
          type="primary"
          size="small"
          @click="$refs.crud.rowAdd()"
        >
          <i class="el-icon-plus"></i>
          新增
        </el-button>
        <el-button
          v-if="permission.vehicle_delete"
          type="default"
          size="small"
          @click="muiltiDelete"
          >批量删除</el-button
        >
      </template>
      <template slot="status" slot-scope="scope">
        <el-switch
          v-model="scope.row.status"
          :active-value="0"
          :inactive-value="1"
          @change="checkStatus(scope.row)"
        ></el-switch>
      </template>
      <template slot="driverLicense" slot-scope="scope">
        <el-image :src="scope.row.driverLicense" fit="contain"></el-image>
      </template>
      <template slot="transportLicense" slot-scope="scope">
        <el-image :src="scope.row.transportLicense" fit="contain"></el-image>
      </template>
      <template slot="transportDate" slot-scope="scope">
        <span>{{ scope.row.transportStart }}-{{ scope.row.transportEnd }}</span>
      </template>
      <template slot-scope="scope" slot="menu">
        <el-tooltip
          v-if="permission.vehicle_edit"
          class="item"
          effect="dark"
          content="编辑"
          placement="bottom"
        >
          <el-button
            type="text"
            size="small"
            @click="$refs.crud.rowEdit(scope.row)"
            icon="el-icon-edit-outline"
          ></el-button>
        </el-tooltip>
        <el-divider
          v-if="permission.vehicle_edit"
          direction="vertical"
        ></el-divider>
        <el-tooltip
          v-if="permission.vehicle_detail"
          class="item"
          effect="dark"
          content="查看"
          placement="bottom"
        >
          <el-button
            type="text"
            size="small"
            icon="el-icon-tickets"
            @click="$refs.crud.rowView(scope.row)"
          ></el-button>
        </el-tooltip>
        <el-divider
          v-if="permission.vehicle_detail"
          direction="vertical"
        ></el-divider>
        <el-tooltip
          v-if="permission.vehicle_delete"
          class="item"
          effect="dark"
          content="删除"
          placement="bottom"
        >
          <el-button
            type="text"
            size="small"
            icon="el-icon-delete"
            @click="rowDel(scope.row)"
          ></el-button>
        </el-tooltip>
      </template>
      <!-- 表单 -->
      <template slot="driverLicenseForm">
        <upload-file
          listType="picture-card"
          :limit="1"
          :imageList="driverLicenseImgs"
          @on-success="onSuccessDriver"
          @on-remove="onRemove"
        ></upload-file>
      </template>
      <template slot="transportLicenseForm">
        <upload-file
          listType="picture-card"
          :limit="1"
          :imageList="transportLicenseImgs"
          @on-success="onSuccessTransport"
          @on-remove="onRemove"
        ></upload-file>
      </template>
      <!-- <template slot="driverNameForm" slot-scope="scope">
        <el-select v-model="scope.row.driverName" placeholder="请选择">
          <el-option
            v-for="item in driverNames"
            :key="item.id"
            :label="item.name"
            :value="item.name"
            @click.native="checkdriverName(item)"
          ></el-option>
        </el-select>
      </template> -->
      <template slot="driverPhoneForm">
        <el-input
          v-model="form.driverPhone"
          size="small"
          placeholder="联系电话"
        ></el-input>
      </template>
      <template slot="areaForm" slot-scope="scope">
        <el-row>
          <el-cascader
            style="width: 100px; margin-right: 10px"
            size="small"
            ref="companyAddress"
            :options="addressOptions"
            v-model="companyAddress"
            @change="handleChangeCompanyAddress"
            placeholder="请选择地址"
          ></el-cascader>
          <el-input
            style="width: 140px"
            v-model="scope.row.address"
            size="small"
            placeholder="详细地址"
          ></el-input>
        </el-row>
      </template>
    </avue-crud>
  </basic-container>
</template>

<script>
import VDistpicker from "v-distpicker";
import { mapGetters } from "vuex";
import uploadFile from "@/components/uploadFile";
import { regionData, CodeToText } from "element-china-area-data";
import {
  getCarByPage,
  addOrUpdateShopCar,
  deleteCarBatch,
  updateCarUsable,
} from "@/api/logistics/vehicle/vehicle.js";
import { getEmployeeList } from "@/api/humanResources/employeeFile";
import { MaintenancestandardsPage } from "@/api/shebei/Maintenancestandards.js";
export default {
  components: {
    uploadFile,
    VDistpicker,
  },
  data() {
    return {
      regForm: {
        comAddress: {
          province: "",
          city: "",
          area: "",
        },
      },
      sendAreaCode: [],
      sendArea: [],
      searchDate: [],
      orderAllNumTypeList: [
        { code: 1, name: "大于" },
        { code: 2, name: "等于" },
        { code: 3, name: "小于" },
        { code: 4, name: "大于等于" },
        { code: 5, name: "小于等于" },
      ],
      searchDialogVisible: false,
      driverNames: [],
      page: {},
      form: {},
      query: {},
      params: {},
      loading: false,
      data: [],
      phone: "",
      selectedRows: [],
      companyAddress: [],
      addressOptions: regionData,
      driverLicenseImgs: [], //行驶证
      transportLicenseImgs: [], //运输证
      option: {
        align: "center",
        headerAlign: "center",
        menuWidth: 120,
        border: true,
        stripe: true,
        editBtn: false,
        delBtn: false,
        formslot: true,
        searchShow: false,
        addBtn: false,
        addTitle: "车辆管理-新增",
        editTitle: "车辆管理-编辑",
        viewTitle: "车辆管理-详情",
        selection: true,
        tip: false,
        dialogClickModal: false,
        column: [
          {
            label: "车辆号",
            prop: "licenseNumber",
            search: true,
            span: 12,
            searchSpan: 8,
            rules: [
              {
                required: true,
                message: " ",
                trigger: "blur",
              },
            ],
          },
          {
            label: "状态",
            prop: "status",
            addDisplay: false,
            editDisplay: false,
            viewDisplay: false,
            slot: true,
          },
          {
            label: "车型",
            prop: "carType",
            search: true,
            searchSpan: 8,
            span: 12,
          },
          {
            label: "最大体积",
            prop: "maxVolume",
            append: "m³",
            searchSpan: 12,
            span: 12,
            rules: [
              {
                required: true,
                message: " ",
                trigger: "blur",
              },
            ],
          },
          {
            label: "载重",
            prop: "heavy",
            append: "KG",
            span: 12,
            rules: [
              {
                required: true,
                message: " ",
                trigger: "blur",
              },
            ],
          },
          {
            label: "载人数",
            prop: "passPerson",
            hide: true,
            span: 12,
          },
          {
            label: "空车重量",
            prop: "carHeavy",
            append: "KG",
            span: 12,
            rules: [
              {
                required: true,
                message: " ",
                trigger: "blur",
              },
            ],
          },
          {
            label: "行驶证",
            prop: "driverLicense",
            span: 12,
            slot: true,
            formslot: true,
          },
          {
            label: "运输证",
            prop: "transportLicense",
            span: 12,
            slot: true,
            formslot: true,
          },
          {
            label: "默认司机",
            prop: "driverName",
            span: 12,
            // formslot: true,
          },
          {
            label: "联系电话",
            prop: "driverPhone",
            span: 12,
            formslot: true,
          },
          {
            label: "运输证有效期",
            labelWidth: 100,
            width: 200,
            prop: "transportDate",
            span: 12,
            type: "daterange",
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
            defaultTime: ["00:00:00", "23:59:59"],
            slot: true,
          },
          {
            label: "承保公司",
            prop: "contractCompany",
            hide: true,
            span: 12,
          },
          {
            label: "交强险有效期",
            labelWidth: 100,
            prop: "compulsoryDate",
            hide: true,
            span: 12,
            type: "daterange",
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
            defaultTime: ["00:00:00", "23:59:59"],
          },
          {
            label: "商业险有效期",
            labelWidth: 100,
            prop: "businessDate",
            hide: true,
            span: 12,
            type: "daterange",
            format: "yyyy-MM-dd",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
            defaultTime: ["00:00:00", "23:59:59"],
          },
          {
            label: "保养标准",
            prop: "maintenanceParts",
            span: 12,
            type: "select",
            dicData: [],
            props: {
              label: "account",
              desc: "deptName",
              value: "id",
            },
          },
          {
            label: "区域",
            prop: "area",
            width: 120,
            span: 12,
            formslot: true,
          },
          {
            label: "GPS",
            prop: "gps",
            hide: true,
            span: 12,
          },
          {
            label: "备注",
            prop: "remark",
            hide: true,
            span: 12,
          },
        ],
      },
    };
  },
  created() {
    getEmployeeList().then((res) => {
      this.driverNames = res.data.data;
    });
    // MaintenancestandardsPage().then(res=>{
    //   console.log(res)
    // })
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  methods: {
    onChangeProvince(data) {
      this.regForm.comAddress.province = data.value;
    },
    onChangeCity(data) {
      this.regForm.comAddress.city = data.value;
    },
    onChangeArea(data) {
      this.regForm.comAddress.area = data.value;
    },
    addressChecked(data) {
      this.sendArea[0] = data.province.value;
      this.sendAreaCode[0] = data.province.code;
      this.sendArea[1] = data.city.value;
      this.sendAreaCode[1] = data.city.code;
      this.sendArea[2] = data.area.value;
      this.sendAreaCode[2] = data.area.code;
      this.regForm.comAddress.province = data.province.value;
      this.regForm.comAddress.city = data.city.value;
      this.regForm.comAddress.area = data.area.value;
      console.log(this.regForm.comAddress);
    },
    openSearchPop() {
      this.searchDialogVisible = true;
    },
    //搜索点击触发
    searchRole() {
      if (this.params.maxVolumeType && !this.params.maxVolume) {
        return this.$message.warning("请输入最大体积");
      }
      if (this.params.maxVolume && !this.params.maxVolumeType) {
        return this.$message.warning("请选择最大体积范围");
      }
      if (this.params.heavyType && !this.params.heavy) {
        return this.$message.warning("请输入载重");
      }
      if (this.params.heavy && !this.params.heavyType) {
        return this.$message.warning("请选择载重范围");
      }
      if (this.params.carHeavyType && !this.params.carHeavy) {
        return this.$message.warning("请输入空车重量积");
      }
      if (this.params.carHeavy && !this.params.carHeavyType) {
        return this.$message.warning("请选择空车重量积范围");
      }
      if (this.sendAreaCode) {
        this.params.areaId = this.sendAreaCode.join(",");
      }
      if (this.searchDate) {
        this.params.startDay = this.searchDate[0];
        this.params.endDay = this.searchDate[1];
      } else {
        this.params.startDay = "";
        this.params.endDay = "";
      }
      this.page.currentPage = 1;
      this.getList();
      this.searchDialogVisible = false;
      // this.$message.success("搜索成功");
    },
    reset() {
      this.params.areaId = "";
      this.sendAreaCode = [];
      this.regForm.comAddress.province = ""; // 清空 v-distpicker 中的 省
      this.regForm.comAddress.city = ""; // 清空 v-distpicker 中的 市
      this.regForm.comAddress.area = ""; // 清空 v-distpicker 中的 区
      this.searchDate = [];
      this.params = {};
      this.getList();
      // this.searchDialogVisible = false;
      // this.$message.success("刷新成功");
    },
    async getList() {
      this.loading = true;
      const params = {
        pageNum: this.page.currentPage,
        pageSize: this.page.pageSize,
        data: this.params,
      };
      const res = await getCarByPage(params);
      const data = res.data.data;
      this.loading = false;
      this.page.total = data.total;
      const result = data.records;
      result.forEach((x) => {
        for (let key in x) {
          if (x[key] == "-1") x[key] = "";
        }
      });
      this.data = result;
    },
    //新增提交触发
    rowSave(row, done, loading) {
      const params = this.handleSubmit(row);
      addOrUpdateShopCar(params)
        .then(() => {
          this.$message.success("新增成功");
          this.getList();
          done();
        })
        .catch(() => {
          loading();
        });
    },
    //编辑操作
    rowUpdate(row, done, loading) {
      const params = this.handleSubmit(row);
      addOrUpdateShopCar(params)
        .then(() => {
          this.$message.success("编辑成功");
          this.getList();
          done();
        })
        .catch(() => {
          loading();
        });
    },
    //删除操作
    rowDel(row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return deleteCarBatch(row.id);
        })
        .then(() => {
          this.$message.success("删除成功");
          this.getList();
        });
    },
    //搜索点击触发
    // searchChange(params, done) {
    //   this.query = params;
    //   this.page.currentPage = 1;
    //   if (done) done();
    //   this.getList();
    //   this.$message.success("搜索成功");
    // },
    refreshChange() {
      this.getList();
      this.$message.success("刷新成功");
    },
    //多选时触发
    muiltiSelect(e) {
      this.selectedRows = e;
    },
    //批量删除
    muiltiDelete() {
      if (this.selectedRows.length == 0)
        return this.$message.info("您还未选中任何数据！");
      this.$confirm("确认批量删除选中的数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return deleteCarBatch(this.selectedRows.map((x) => x.id).join(","));
        })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getList();
        })
        .catch(() => {});
    },
    //更改状态
    checkStatus(row) {
      updateCarUsable({ id: row.id, status: row.status }).then((res) => {
        if (res.data.code === 200) {
          this.$message.success("更改成功");
          this.getList();
        }
      });
    },
    onSuccessDriver(value) {
      this.form.driverLicense = value;
    },
    onSuccessTransport(value) {
      this.form.transportLicense = value;
    },
    beforeOpen(done, type) {
      if (type !== "add") {
        (this.driverLicenseImgs = this.form.driverLicense.split(" ")),
          (this.transportLicenseImgs = this.form.transportLicense.split(" ")),
          (this.form.businessDate = [
            this.form.businessStart,
            this.form.businessEnd,
          ]);
        this.form.compulsoryDate = [
          this.form.compulsoryStart,
          this.form.compulsoryEnd,
        ];
        this.form.transportDate = [
          this.form.transportStart,
          this.form.transportEnd,
        ];
        this.companyAddress = this.form.areaId.split(",");
      } else {
        this.driverLicenseImgs = [];
        this.transportLicenseImgs = [];
      }
      done();
    },
    handleChangeCompanyAddress(value) {
      console.log(value);
    },
    //选择司机
    checkdriverName(value) {
      this.form.driverPhone = value.phone;
      this.form.driverId = value.id;
    },
    //处理要提交的数据
    handleSubmit(form) {
      const data = form;
      console.log(data);
      data.businessStart = form.businessDate[0];
      data.businessEnd = form.businessDate[1];
      data.compulsoryStart = form.compulsoryDate[0];
      data.compulsoryEnd = form.compulsoryDate[1];
      data.transportStart = form.transportDate[0];
      data.transportEnd = form.transportDate[1];
      data.area =
        (CodeToText[this.companyAddress[0]] || "") +
        "," +
        (CodeToText[this.companyAddress[1]] || "") +
        "," +
        (CodeToText[this.companyAddress[2]] || "");
      data.areaId = this.companyAddress.join(",");
      delete data.businessDate;
      delete data.compulsoryDate;
      delete data.transportDate;
      return data;
    },
  },
};
</script>
<style lang="scss" scoped>
.pwrap {
  margin: 0;
  .distpicker-address-wrapper {
    label {
      select {
        width: auto !important;
      }
    }
  }
}
::v-deep .el-cascader {
  width: 140px !important;
}
.allNum {
  display: flex;
  /deep/.el-input {
    width: 100px !important;
  }
  /deep/.el-select {
    width: 100px !important;
  }
}
</style>