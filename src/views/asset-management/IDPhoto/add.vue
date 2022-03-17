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
          <el-row>
            <el-form-item required label="证照图片:">
              <upload-file
                @on-remove="handleRemove"
                @on-success="handleSuccess"
                :imageList="file"
                message="证照图片"
                :status="type"
              ></upload-file>
            </el-form-item>
          </el-row>
          <el-col :span="12">
            <el-form-item required label="证照编码:" prop="licenseSn">
              <el-input v-if="type !== 'detail'" v-model="form.licenseSn"></el-input>
              <span v-else>{{ form.licenseSn }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="证照类型:" prop="licenseType">
              <el-select v-model="form.licenseType" v-if="type !== 'detail'" placeholder="请选择">
                <el-option
                  v-for="item in typeList"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <span v-else>{{ form.licenseType }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="type !== 'add'">
            <el-form-item required label="证照状态:" prop="model">
              <el-select v-model="value" v-if="type !== 'detail'" placeholder="请选择" disabled>
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <span v-else>{{ form.licenseStatus==0?'有效':'无效' }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="所属部门:" prop="department">
               <el-input
               v-if="type !== 'detail'" 
                v-model="form.department"
                 @focus="selectDepot"
              ></el-input>
              <span v-else>{{ form.department }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="所属人员:" prop="staffName">
              <el-input
              v-if="type !== 'detail'" 
                v-model="form.staffName"
                @focus="selectUser"
                :disabled="!form.department"
              ></el-input>
              <span v-else>{{ form.staffName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="职务:" prop="post">
              <el-input
              v-if="type !== 'detail'" 
                v-model="form.post"
                disabled
              ></el-input>
              <span v-else>{{ form.post }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item required label="有效期至:" prop="validDate">
              <el-date-picker
                type="date"
                v-if="type !== 'detail'" 
                v-model="form.validDate"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
              <span v-else>{{ form.validDate }}</span>
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
          <el-input placeholder="请输入备注" v-if="type !== 'detail'"  v-model="form.remark"></el-input>
          <span v-else>{{ form.remark }}</span>
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
        @on-submit="submitUserAdd"
      ></user>
    </el-dialog>
  </div>
</template>

<script>
import {
  getList,
  addOrUpdateLicenseBank,
} from "@/api/asset-management/IDPhoto.js";
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
  },
  components: {
    customer,
    productSelect,
  },
  mixins: [upload, common, saleType],
  data() {
    return {
      statusList: [
        { code: "0", name: "闲置" },
        { code: "1", name: "使用中" },
        { code: "2", name: "已报废" },
      ],
      module: "资产台账",
      show: false,
      form: {
        status: "0"
      },
      tableData: [],
      typeList:[{id:'1',value:'技术员证书'},{id:2,value:'产品安全证'}],
      rules: {},
      file: [],
    };
  },
  created() {},
  mounted() {
    if (this.type !== "add") {
      this.getDetailInfo();
    }
  },
  methods: {
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
      const res = await getList({ id: this.data.id });
      this.form = res.data.data.records[0];
    },
    async submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.licensePic = this.file.join(",");
          addOrUpdateLicenseBank(this.form).then((res) => {
            console.log(res);
          });

          this.$message.success({
            message: "操作成功",
          });
          this.$router.push({
            path: "/asset-management/IDPhoto",
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
        path: "/asset-management/IDPhoto",
      });
    },
    submitUserAdd(val){
      this.showUser = false
      this.form.department=val.deptName
      this.form.post=val.postName
      this.form.staffName = val.name
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