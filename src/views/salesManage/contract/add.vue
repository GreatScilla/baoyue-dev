<template>
  <div class="pages addPages">
    <el-form
      ref="form"
      :inline="true"
      :rules="rules"
      :model="form"
      :inline-message="true"
      label-width="100px"
      class="detail-form"
    >
      <el-row v-if="type !== 'add'">
        <el-col :span="12">
          <el-form-item label="单据日期">
            <el-date-picker
              type="date"
              v-if="type !== 'detail'"
              v-model="form.createTime"
              disabled
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
            <span v-else>{{ form.createTime }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单据编码">
            <el-input
              v-if="type !== 'detail'"
              disabled
              v-model="form.contractSn"
            ></el-input>
            <span v-else>{{ form.contractSn }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="合同编号" prop="contractNumber">
            <el-input
              v-if="type !== 'detail'"
              v-model="form.contractNumber"
            ></el-input>
            <span v-else>{{ form.contractNumber }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合同名称" prop="contractName">
            <el-input
              v-if="type !== 'detail'"
              v-model="form.contractName"
            ></el-input>
            <span v-else>{{ form.contractName }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="签订日期">
            <el-date-picker
              type="date"
              v-if="type !== 'detail'"
              v-model="form.contractStartDate"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
            <span v-else>{{ form.contractStartDate }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结束日期">
            <el-date-picker
              type="date"
              v-if="type !== 'detail'"
              v-model="form.contractEndDate"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
            <span v-else>{{ form.contractEndDate }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="客户" prop="memberName">
            <el-input
              v-if="type !== 'detail'"
              v-model="form.memberName"
              @focus="selectCustomer"
            ></el-input>
            <span v-else>{{ form.memberName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="业务部门">
            <el-input
              v-if="type !== 'detail'"
              v-model="form.depotName"
              @focus="selectDepot"
            ></el-input>
            <span v-else>{{ form.depotName }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="销售员">
            <el-input
              v-if="type !== 'detail'"
              v-model="form.salesMan"
              @focus="selectUser"
            ></el-input>
            <span v-else>{{ form.salesMan }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="销售类型">
            <el-select v-if="type !== 'detail'" v-model="form.salesTypeId">
              <el-option
                v-for="item of saleTypeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <span v-else>{{ form.salesTypeName }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row> </el-row>
      <el-row>
        <el-form-item label="附件信息">
          <upload-file
            @on-remove="handleRemove"
            @on-success="handleSuccess"
            :imageList="file"
            message="合同"
            :status="type"
          ></upload-file>
        </el-form-item>
      </el-row>
      <el-row>
        <p>更多信息</p>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="制单人">
            <span v-if="type === 'detail'">{{ createPersonName }}</span>
            <el-input v-else v-model="createPersonName" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="type === 'detail'">
          <el-form-item label="审核人">
            <span>{{ form.reviewerName }}</span>
          </el-form-item>
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
    <el-dialog append-to-body :visible.sync="showCustomer" title="选择客户">
      <customer
        category="2"
        @on-cancel="closeCustomer"
        @on-submit="submitCustomer"
      ></customer>
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
  submitContract,
  getDetail,
  updateContract,
} from "@/api/salesManage/contract";
import customer from "@/components/customer";
import upload from "@/mixins/upload";
import common from "@/mixins/common";
import saleType from "@/mixins/saleType";
import { selectUsableImportOrder } from "@/api/salesManage/statement";
import uploadUrl from "@/config/uploadConfig";
export default {
  name: "addContract",
  props: {
    type: {
      // 类型分add,edit,detail
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
  },
  mixins: [upload, common, saleType],
  data() {
    return {
      module: "合同",
      id: "",
      form: {
        memberName: "",
        depotName: "",
        salesMan: "",
      },
      tableData: [],
      createPersonName: "", // 制单人
      rules: {
        contractName: [
          { required: true, message: "请输入合同名称", trigger: "blur" },
        ],
        contractNumber: [
          { required: true, message: "请输入合同编号", trigger: "blur" },
        ],
        memberName: [
          { required: true, message: "请选择客户名称", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    const info = JSON.parse(localStorage.getItem("saber-userInfo"));
    this.createPersonName = info.content["nick_name"];
  },
  mounted() {
    if (this.type !== "add") {
      this.getDetailInfo();
    }
  },
  methods: {
    async getDetailInfo() {
      // 获取详情信息
      const res = await getDetail({ id: this.data.id });
      this.form = res.data.data;
      this.saleTypeList.forEach((item) => {
        if (this.form.salesTypeId === item.id) {
          this.form.salesTypeName = item.name;
        }
      });
      if (this.form.file.length > 0) {
        this.file = this.form.file.split(",");
      }
      console.log(this.file);
    },
    async submit() {
      try {
        await this.$refs.form.validate();
      } catch (error) {
        this.$message.error({
          message: "请完善必填信息",
        });
        return;
      }
      let submitApi = "";
      if (this.type === "add") {
        submitApi = submitContract;
      } else {
        submitApi = updateContract;
      }
      this.form.file = this.file.join(",");
      const res = await submitApi(this.form);
      this.$message.success({
        message: "操作成功",
      });
      this.$router.push({
        path: "/salesManage/contract",
      });
    },
    handleBack() {
      this.$router.push({
        path: "/salesManage/contract",
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