<template>
  <basic-container>
    <el-form
      :model="sendForm"
      ref="palletDeliveryForm"
      :rules="rules"
      label-width="100px"
    >
      <!-- <el-form-item label="派车类型">
        <el-input v-model="sendForm.sendType" disabled></el-input>
      </el-form-item>
      <el-form-item label="选择车辆" required> </el-form-item> -->
      <div class="top">
        <el-form-item label="派车类型" required>
          <div v-if="type == 'detail'">{{ sendForm.carType }}</div>
          <el-select
            :value="sendForm.carType"
            placeholder="请选择派车类型"
            @change="setCarType"
            v-else
          >
            <el-option
              v-for="item in carTypes"
              :key="item.name"
              :label="item.carType"
              :value="item.carType"
            ></el-option>
            <el-option label="+新增派车类型" value="-1"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目名称" required>
          <div v-if="type == 'detail'">{{ sendForm.projectName }}</div>
          <el-input
            v-else
            ref="projectName"
            v-model="sendForm.projectName"
            @click.native="goSelect('projectName')"
          ></el-input>
        </el-form-item>
        <el-form-item label="客户" required>
          <div v-if="type == 'detail'">{{ sendForm.customer }}</div>
          <el-input
            v-else
            ref="customer"
            v-model="sendForm.customer"
            @click.native="goSelect('customer')"
          ></el-input>
        </el-form-item>
      </div>
      <el-table :data="sendTable" border style="width: 100%">
        <el-table-column type="index"> </el-table-column>

      <el-table-column v-if="type != 'detail'" label="" width="60">
        <template slot-scope="scope">
          <div>
            <span class="el-button--text delete" @click="addSendRow">
              <i class="el-icon-plus" />
            </span>
            <el-button
              class="el-button--text delete"
              style="margin-left: 5px; font-weight: 700"
              type="text"
              :disabled="sendTable.length <= 1"
              @click="deleteSendRow(scope.$index)"
            >
              <i class="el-icon-minus" />
            </el-button>
          </div>
        </template>
      </el-table-column>

        <el-table-column prop="date" label="车辆">
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
        <el-table-column prop="date" label="发车日期" width="230">
          <template slot-scope="scope">
            <div v-if="type == 'detail'">
              {{ sendTable[scope.$index].date }}
            </div>
            <el-date-picker
              v-else
              v-model="sendTable[scope.$index].date"
              type="datetime"
              placeholder="选择日期时间"
              :picker-options="timeOptions"
            >
            </el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="driver" label="司机" width="100">
          <template slot-scope="scope">
            <div v-if="type == 'detail'">
              {{ sendTable[scope.$index].driver }}
            </div>
            <el-input
              v-else
              v-model="sendTable[scope.$index].driver"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="driverPhone" label="司机电话" width="150">
          <template slot-scope="scope">
            <div v-if="type == 'detail'">
              {{ sendTable[scope.$index].driverPhone }}
            </div>
            <el-input
              v-else
              v-model="sendTable[scope.$index].driverPhone"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="quest" label="任务">
          <template slot-scope="scope">
            <div v-if="type == 'detail'">
              {{ sendTable[scope.$index].quest }}
            </div>
            <el-input v-else v-model="sendTable[scope.$index].quest"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="note" label="备注">
          <template slot-scope="scope">
            <div v-if="type == 'detail'">
              {{ sendTable[scope.$index].note }}
            </div>
            <el-input v-else v-model="sendTable[scope.$index].note"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <el-row class="upload-box">
        <div class="title">附件信息</div>
        <el-divider class="detail-divider"></el-divider>
      </el-row>
      <div class="upload-box">
        <upload-file
          :status="type == 'detail' ? 'pic-list' : ''"
          :imageList="fileList"
          list-type="picture-card"
          :limit="3"
          @on-success="upSuccess"
          @on-remove="upRemove"
        />
      </div>
      <div class="save-box">
        <el-button type="default" size="small" @click="cancel">取消</el-button>
        <el-button
         v-if="type != 'detail'"
          type="primary"
          size="small"
          :disabled="requesting"
          @click="submit"
          >保存</el-button
        >
      </div>
    </el-form>
    <el-dialog
      title="选择车辆"
      :visible.sync="carChooseDialog"
      width="80%"
      :modal="false"
      :before-close="handleClose"
    >
      <avue-crud
        ref="carList"
        :data="carList"
        :option="carListOption"
        :page.sync="page"
        :table-loading="loading"
        @on-load="getCarList"
        @search-change="searchChange"
        @current-row-change="selectCar"
        @current-change="pageChange"
      ></avue-crud>
      <span slot="footer" class="dialog-footer">
        <el-button @click="carChooseDialog = false">取消</el-button>
        <el-button type="primary" :disabled="!choosingCar" @click="confirmCar"
          >确定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="选择客户"
      :visible.sync="customerChooseDialog"
      width="80%"
      :modal="false"
      :before-close="handleClose"
    >
      <avue-crud
        ref="customerList"
        :data="customerList"
        :option="customerListOption"
        :page.sync="page"
        :table-loading="loading"
        @on-load="getCustomerList"
        @search-change="searchChange"
        @current-row-change="selectCustomer"
        @current-change="pageChange"
      ></avue-crud>
      <span slot="footer" class="dialog-footer">
        <el-button @click="customerChooseDialog = false">取消</el-button>
        <el-button
          type="primary"
          :disabled="!choosingCustomer"
          @click="confirmCustomer"
          >确定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="选择项目"
      :visible.sync="projectNameChooseDialog"
      width="80%"
      :modal="false"
      :before-close="handleClose"
    >
      <avue-crud
        ref="projectNameList"
        :data="projectNameList"
        :option="projectNameListOption"
        :page.sync="page"
        :table-loading="loading"
        @on-load="getProjectNameList"
        @search-change="searchChange"
        @current-row-change="selectProjectName"
        @current-change="pageChange"
      ></avue-crud>
      <span slot="footer" class="dialog-footer" v-if="type != 'detail'">
        <el-button @click="projectNameChooseDialog = false">取消</el-button>
        <el-button
          type="primary"
          :disabled="!choosingProjectName"
          @click="confirmProjectName"
          >确定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="新增派车类型"
      :visible.sync="addCarTypeDialog"
      width="30%"
      :modal="false"
      :before-close="handleCarTypeClose"
    >
      <el-input v-model="newCarType" placeholder="派车类型"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCarTypeClose">取消</el-button>
        <el-button type="primary" :disabled="!newCarType" @click="addCarType"
          >确定</el-button
        >
      </span>
    </el-dialog>
  </basic-container>
</template>

<script>
import {
  getProjectByPage,
  addOrUpdateSendCar,
  getSendCarById,
  getCarType,
  addCarType,
} from "@/api/logistics/sendVehicle/sendVehicle.js";
import { contactUnitBase } from "@/api/salesManage/customer";
import { getUserInfo } from "@/api/system/user.js";
import { getNowFormatDate } from "@/util/util";
import { client } from "@/util/oss.js";
import uploadFile from "@/components/uploadFile.vue";
import uploadUrl from "@/config/uploadConfig";
import { getCarByPage } from "@/api/logistics/vehicle/vehicle.js";
import formTable from "@/components/formTable";


export default {
  name: "sendVehicleAdd",
  props: {
    type: {
      default: "add",
    },
    id: {
      default: "",
    },
  },
  components: {
    uploadFile,
    formTable
  },
  data() {
    return {
      sendForm: {
        carType: "",
        customer: "",
        projectName: "",
        customerRow: "",
        projectNameRow: "",
      },
      sendTable: [
        {
          date: "",
          driver: "",
          driverPhone: "",
          quest: "",
          note: "",
          carSn: "",
          car: "",
        },
      ],
      carTypes: [
        {
          name: "123",
        },
      ],
      carChooseDialog: false,
      customerChooseDialog: false,
      projectNameChooseDialog: false,
      fileList: [],
      carListOption: {
        highlightCurrentRow: true,
        addBtn: false,
        menu: false,
        refreshBtn: false,
        columnBtn: false,
        searchShow: false,
        column: [
          {
            label: "车辆号",
            prop: "licenseNumber",
            search: true,
          },
          {
            label: "状态",
            prop: "status",
          },
          {
            label: "车型",
            prop: "carType",
          },
          {
            label: "最大体积",
            prop: "maxVolume",
          },
          {
            label: "载重",
            prop: "heavy",
          },
          {
            label: "载人数",
            prop: "passPerson",
          },
          {
            label: "空车重量",
            prop: "carHeavy",
          },
          {
            label: "默认司机",
            prop: "driverName",
          },
          {
            label: "联系电话",
            prop: "driverPhone",
          },
          {
            label: "区域",
            prop: "area",
          },
          {
            label: "GPS",
            prop: "gps",
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
        ],
      },
      customerListOption: {
        highlightCurrentRow: true,
        addBtn: false,
        menu: false,
        refreshBtn: false,
        columnBtn: false,
        searchShow: false,
        column: [
          {
            label: "客户编号",
            prop: "id",
            search: true,
          },
          {
            label: "客户名称",
            prop: "name",
            search: true,
          },
          {
            label: "联系方式",
            prop: "phone",
            search: true,
          },
        ],
      },
      projectNameListOption: {
        highlightCurrentRow: true,
        addBtn: false,
        menu: false,
        refreshBtn: false,
        columnBtn: false,
        searchShow: false,
        column: [
          {
            label: "项目名称",
            prop: "projectName",
            search: true,
          },
          {
            label: "项目编号",
            prop: "projectSn",
            search: true,
          },
          {
            label: "项目负责人",
            prop: "projectLead",
            search: true,
          },
        ],
      },
      carList: [],
      customerList: [],
      projectNameList: [],
      query: {},
      loading: false,
      page: {
        currentPage: 1,
        pageSize: 10,
      },
      choosingCar: false,
      choosingCustomer: false,
      choosingProjectName: false,
      requesting: false,
      timeOptions: { //限制选择日期(小于当前日期)
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      addCarTypeDialog: false,
      newCarType: "",
    };
  },
  created() {
    if (this.type == "detail" || this.type == "edit") {
      this.setDetail();
    }
    this.getCarTypeList();
  },
  methods: {
    setDetail() {
      getSendCarById({
        id: this.id,
      }).then((res) => {
        const d = res.data.data;
        this.sendForm = {
          customer: d.client,
          customerRow: {
            id: d.clientId,
          },
          projectName: d.projectName,
          projectNameRow: {
            projectSn: d.projectSn,
          },
        };
        this.sendTable = d.sendCarDrivers.map((x) => {
          return {
            carSn: x.licenseNumber,
            car: {
              licenseNumber: x.licenseNumber,
              id: x.sendCarId,
            },
            date:
              this.type == "edit" ? new Date(x.departureTime) : x.departureTime,
            driver: x.driver,
            driverPhone: x.driverPhone,
            quest: x.task,
            note: x.remarks,
          };
        });
        if (d.image)
          this.fileList = d.image.split(",").map((x) => uploadUrl + x);
      });
    },
    async getCarList() {
      this.loading = true;
      const params = {
        pageNum: this.page.currentPage,
        pageSize: this.page.pageSize,
        data: this.query,
      };
      const res = await getCarByPage(params);
      const data = res.data.data;
      this.loading = false;
      this.page.total = data.total;
      const result = data.records;
      this.carList = result;
    },
    async getCustomerList() {
      this.loading = true;
      const params = {
        current: this.page.currentPage,
        size: this.page.pageSize,
        ...this.query,
      };
      const res = await contactUnitBase(params);
      const data = res.data.data;
      this.loading = false;
      this.page.total = data.total;
      const result = data.records;
      this.customerList = result;
    },
    async getProjectNameList() {
      this.loading = true;
      const params = {
        pageNum: this.page.currentPage,
        pageSize: this.page.pageSize,
        ...this.query,
      };
      const res = await getProjectByPage(params);
      const data = res.data.data;
      this.loading = false;
      this.page.total = data.total;
      const result = data.records;
      this.projectNameList = result;
    },
    searchChange(params, done) {
      this.query = params;
      this.page.currentPage = 1;
      if (done) done();
      if (this.carChooseDialog) this.getCarList();
      if (this.customerChooseDialog) this.getCustomerList();
      if (this.projectNameChooseDialog) this.getProjectNameList();
      this.$message.success("搜索成功");
    },

    upSuccess(url) {
      this.fileList.push(url);
    },
    upRemove(fileList) {
      this.fileList = fileList;
    },

    deleteSendRow(index) {
      if (this.sendTable.length == 1) return;
      this.sendTable.splice(index, 1);
    },
    addSendRow() {
      this.sendTable.push({
        date: "",
        driver: "",
        driverPhone: "",
        quest: "",
        note: "",
        carSn: "",
        car: "",
      });
    },
    goSelect(type, i) {
      if (this.type == "detail") return;
      this[type + "ChooseDialog"] = true;
      this.choosingCarIndex = i;
    },
    selectCar(row) {
      this.choosingCar = row;
    },
    selectCustomer(row) {
      this.choosingCustomer = row;
    },
    selectProjectName(row) {
      this.choosingProjectName = row;
    },
    pageChange() {
      //翻页时取消当前选中行，保持视觉一致
      this.choosingCar = false;
      this.choosingCustomer = false;
      this.choosingProjectName = false;
    },
    confirmCar() {
      this.sendTable[
        this.choosingCarIndex
      ].carSn = this.choosingCar.licenseNumber;
      this.sendTable[this.choosingCarIndex].car = this.choosingCar;
      this.sendTable[
        this.choosingCarIndex
      ].driver = this.choosingCar.driverName;
      this.sendTable[
        this.choosingCarIndex
      ].driverPhone = this.choosingCar.driverPhone;
      this.carChooseDialog = false;
    },
    confirmCustomer() {
      this.sendForm.customer = this.choosingCustomer.name;
      this.sendForm.customerRow = this.choosingCustomer;
      this.customerChooseDialog = false;
    },
    confirmProjectName() {
      this.sendForm.projectName = this.choosingProjectName.projectName;
      this.sendForm.projectNameRow = this.choosingProjectName;
      this.sendForm.customer = this.choosingProjectName.customerName;
      this.sendForm.customerRow = {customerName:this.choosingProjectName.customerName,customerId:this.choosingProjectName.customerId};
      this.projectNameChooseDialog = false;
    },
    handleClose() {
      this.page.currentPage = 1;
      this.choosingCar = false;
      this.choosingCustomer = false;
      this.choosingProjectName = false;
      if (this.carChooseDialog) {
        this.$refs.carList.setCurrentRow();
        this.carChooseDialog = false;
      }
      if (this.customerChooseDialog) {
        this.$refs.customerList.setCurrentRow();
        this.customerChooseDialog = false;
      }
      if (this.projectNameChooseDialog) {
        this.$refs.projectNameList.setCurrentRow();
        this.projectNameChooseDialog = false;
      }
    },
    cancel() {
      this.$router.back();
    },
    validate() {
      if (this.sendForm.customer == "")
        return this.$message.error("请选择客户");
      if (this.sendForm.projectName == "")
        return this.$message.error("请选择项目");
      for (let i = 0; i < this.sendTable.length; i++) {
        if (this.sendTable[i].carSn == "")
          return this.$message.error(`第${i + 1}行未选择车辆`);
        if (this.sendTable[i].date === "")
          return this.$message.error(`第${i + 1}行未选择出发时间`);
        if (this.sendTable[i].driver == "")
          return this.$message.error(`第${i + 1}行未填写司机`);
        if (this.sendTable[i].driverPhone == "")
          return this.$message.error(`第${i + 1}行未填写司机电话`);
        if (this.sendTable[i].quest == "")
          return this.$message.error(`第${i + 1}行未填写任务`);
      }
      return true;
    },
    async submit() {
      if (!this.validate()) return;
      const params = {
        carType: this.sendForm.carType,
        client: this.sendForm.customer,
        clientId: this.sendForm.customerRow.id,
        image: this.fileList.map((x) => x.split(uploadUrl)[1]).join(","),
        projectName: this.sendForm.projectName,
        projectSn: this.sendForm.projectNameRow.projectSn,
        sendCarDrivers: this.sendTable.map((x) => {
          x.date = new Date(x.date);
          return {
            departureTime: x.date.getTime(),
            driver: x.driver,
            driverPhone: x.driverPhone,
            licenseNumber: x.car.licenseNumber,
            remarks: x.note,
            task: x.quest,
          };
        }),
      };
      if (this.type == "edit") params.id = this.id;
      this.requesting = true;
      addOrUpdateSendCar(params)
        .then((res) => {
          this.$message.success("提交成功！");
          this.requesting = false;
          this.cancel();
        })
        .catch((e) => {
          this.requesting = false;
        });
    },
    getCarTypeList() {
      getCarType().then((res) => {
        console.log(res);
        this.carTypes = res.data.data;
      });
    },
    setCarType(e) {
      if (e == -1) return (this.addCarTypeDialog = true);
      this.sendForm.carType = e;
      // addCarType()
    },
    addCarType() {
      addCarType({
        carType: this.newCarType,
      }).then((res) => {
        this.$message.success("提交成功！");
        this.addCarTypeDialog = false;
        this.getCarTypeList();
      });
    },
    handleCarTypeClose() {
      this.addCarTypeDialog = false;
      this.newCarType = "";
    },
  },
};
</script>
<style lang="scss" scoped>
.el-form {
  .top {
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
      width: 50%;
      box-sizing: border-box;
      padding-left: 40px;
    }
  }
}
.el-input,
.el-select {
  width: 240px;
}
.el-table {
  .el-select {
    width: 140px;
  }
  .el-input {
    width: 100%;
  }
  .delete:hover {
    cursor: pointer;
  }
}
.add-row {
  display: block;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.add-text {
  width: 100px;
  box-sizing: border-box;
  padding: 10px 10px;
  font-size: 14px;
}
.add-text:hover {
  cursor: pointer;
}
.upload-box {
  width: 100%;
}
.avue-crud {
  /deep/.avue-crud__menu {
    flex-direction: row-reverse;
  }
}
.save-box {
  width: 100%;
  text-align: center;
}
</style>