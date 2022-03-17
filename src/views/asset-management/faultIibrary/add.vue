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
      <el-row>
        <el-col :span="24">
          <span class="title">基本信息</span>
          <el-divider class="detail-divider"></el-divider>
        </el-col>
        <el-col v-if="type !== 'add'" :span="12">
          <el-form-item required label="故障编码:">
            <el-input
              v-if="type !== 'detail'"
              v-model="form.faultSn"
              disabled
            ></el-input>
            <span v-else>{{ form.faultSn }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item required label="故障名称:">
            <el-input
              v-if="type !== 'detail'"
              v-model="form.faultName"
              placeholder="请输入"
            ></el-input>
            <span v-else>{{ form.faultName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item required label="故障分类:">
            <el-select v-if="type !== 'detail'" v-model="form.faultType">
              <el-option
                v-for="item of disposalWay"
                :key="item.dictKey"
                :label="item.dictValue"
                :value="item.dictValue"
              ></el-option>
            </el-select>
            <span v-else>{{ form.faultType }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item required label="维修位置:">
            <el-input
              v-if="type !== 'detail'"
              v-model="form.maintainParts"
              placeholder="请输入"
            ></el-input>
            <span v-else>{{ form.maintainParts }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item required label="维修方法:">
            <el-input
              v-if="type !== 'detail'"
              v-model="form.maintainMethod"
              placeholder="请输入"
            ></el-input>
            <span v-else>{{ form.maintainMethod }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item required label="资产编号:">
            <el-input
              v-if="type !== 'detail'"
              v-model="form.assetSn"
              placeholder="请输入"
              @focus="showDept = true"
            ></el-input>
            <span v-else>{{ form.assetSn }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item required label="资产名称:">
            <el-input
              v-if="type !== 'detail'"
              v-model="form.assetName"
              disabled
              placeholder="请输入"
            ></el-input>
            <span v-else>{{ form.assetName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item required label="规格型号:">
            <el-input
              v-if="type !== 'detail'"
              v-model="form.model"
              disabled
              placeholder="请输入"
            ></el-input>
            <span v-else>{{ form.model }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item required label="设备编号:">
            <el-input
              v-if="type !== 'detail'"
              v-model="form.facilitySn"
              disabled
              placeholder="请输入"
            ></el-input>
            <span v-else>{{ form.facilitySn }}</span>
          </el-form-item>
        </el-col>
        <el-col v-if="type !== 'add'" :span="12">
          <el-form-item required label="创建日期:">
            <el-input
              v-if="type == 'edit'"
              v-model="form.createTime"
              disabled
              placeholder="自动获取"
            ></el-input>
            <span v-else-if="type == 'detail'">{{ form.createTime }}</span>
          </el-form-item>
        </el-col>
        <el-col v-if="type !== 'add'" :span="12">
          <el-form-item required label="创建人:">
            <el-input
               v-if="type == 'edit'"
              v-model="form.createUserName"
              disabled
              placeholder="自动获取"
            ></el-input>
            <span v-else-if="type == 'detail'" >{{ form.createUserName }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-col :span="24">
        <span class="title">关联设备</span>
        <el-divider class="detail-divider"></el-divider>
      </el-col>
      <el-row v-if="type != 'detail'">
        <el-col :span="24">
          <el-button type="primary" size="small" @click="standardAdd = true"
            >添加备件</el-button
          >
          <el-button size="small" @click="remove()">移除备件</el-button>
        </el-col>
      </el-row>
      <el-row class="margin-bottom-20">
        <el-col :span="24">
          <el-table
            border
            @selection-change="handleSelectionChange"
            :data="tableData"
            class="margin-bottom-20"
            highlight-current-row
          >
            <el-table-column
              type="selection"
              v-if="type !== 'detail'"
              width="50"
            ></el-table-column>
            <el-table-column prop="sparePartName" label="备件名称">
            </el-table-column>
            <el-table-column prop="model" label="规格型号"> </el-table-column>
            <el-table-column prop="sparePartSn" label="备件编号">
            </el-table-column>
            <el-table-column
              label="所需数量"
              width="150"
              prop="quantityConsumed"
            >
              <template slot-scope="scope">
                <el-input
                  v-if="type !== 'detail'"
                  placeholder="请输入所需数量"
                  v-model="scope.row.quantityConsumed"
                ></el-input>
                <span v-else>{{ scope.row.quantityConsumed }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="unit" label="单位"> </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-col :span="24">
        <span class="title">其他信息</span>
        <el-divider class="detail-divider"></el-divider>
      </el-col>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注:" prop="remarks">
            <el-input
              v-if="type !== 'detail'"
              placeholder="请输入备注"
              type="textarea"
              v-model="form.remark"
            ></el-input>
            <span v-else>{{ form.remark }}</span>
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
    <el-dialog append-to-body :visible.sync="showDept" title="添加设备">
      <addDevice @on-cancel="closeDept" @on-submit="submitDept"></addDevice>
    </el-dialog>
    <el-dialog append-to-body :visible.sync="standardAdd" title="添加备件">
      <part
        @on-cancel="closeDept"
        :checkData="tableData"
        @on-submit="submitStandard"
      ></part>
    </el-dialog>
  </div>
</template>

<script>
import {
  getList,
  addOrUpdateFaultDatabase,
} from "@/api/asset-management/faultIibrary.js";
import customer from "@/components/customer";
import addDevice from "@/components/addDevice";
import upload from "@/mixins/upload";
import common from "@/mixins/common";
import saleType from "@/mixins/saleType";
import productSelect from "@/components/productSelect";
import part from "@/components/part";
import { getDictionary } from "@/api/system/dictbiz";
export default {
  name: "faultIibrary",
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
    addDevice,
    part,
  },
  mixins: [upload, common, saleType],
  data() {
    return {
      disposalWay: [], //故障原因
      module: "资产台账",
      show: false,
      form: {},
      tableData: [],
      rules: {},
      file: [],
      showDept: false,
      unitList: ["天/次", "周/次", "月/次", "年/次", "季/次"],
      unit: "",
      standardAdd: false,
      selectedData: [],
    };
  },
  async created() {
    const res = await getDictionary({ code: "fault_type" });
    this.disposalWay = res.data.data;
  },
  mounted() {
    if (this.type !== "add") {
      this.getDetailInfo();
    }
  },
  methods: {
    submitStandard(val) {
      for (let i = 0; i < val.length; i++) {
        val[i].id = "";
      }
      this.tableData = val;
      this.standardAdd = false;
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
      this.tableData = res.data.data.records[0].faultDatabaseSubunits;
    },
    closeDept() {
      this.showDept = false;
      this.standardAdd = false;
    },
    submitDept(val) {
      this.form.assetSn = val.assetSn;
      this.form.model = val.model;
      this.form.assetName = val.assetName;
      this.form.facilitySn = val.facilitySn;
      this.showDept = false;
    },
    submit() {
      const params = {
        ...this.form,
        faultDatabaseSubunits: this.tableData,
      };
      addOrUpdateFaultDatabase(params)
        .then((res) => {
          this.$message.success({
            message: "操作成功",
          });
          this.$router.push("/asset-management/faultIibrary");
          this.showDept = false;
        })
        .catch((e) => {
          this.showDept = false;
        });
    },
    handleBack() {
      this.$router.push({
        path: "/asset-management/faultIibrary",
      });
    },
    handleSelectionChange(data) {
      this.selectedData = data;
    },
    // 移除设备
    remove() {
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
  },
};
</script>

<style>
.text-area .el-form--inline,
.text-area .el-form-item__content {
  width: 800px;
}
</style>