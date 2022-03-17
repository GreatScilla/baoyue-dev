<template>
  <div>
    <el-dialog
      title="新增调拨单"
      append-to-body
      :visible.sync="adddialogVisible"
      width="60%"
      @opened="open_all"
      @close="detailialogClosed"
      :before-close="updateVisible"
    >
      <el-divider></el-divider>
      <el-row>
        <el-col :span="21"
          ><div class="grid-content bg-purple-dark">
            <strong>● 调拨信息</strong>
          </div></el-col
        >
        <el-col :span="1"
          ><div class="grid-content bg-purple-light">
            <el-button size="small" type="primary" @click="addForm">保存</el-button>
          </div></el-col
        >
      </el-row>
      <el-divider></el-divider>

      <el-form
        inline
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <!-- 1 -->
        <el-row>
          <el-col :span="24"
            ><div class="grid-content bg-purple">
              <el-form-item>
                <el-radio v-model="ruleForm.allotType" label="1"
                  >库内调拨</el-radio
                >
                <el-radio v-model="ruleForm.allotType" label="2"
                  >库外调拨</el-radio
                >
              </el-form-item>
            </div></el-col
          >
        </el-row>
        <!-- 2 -->
        <el-row>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item label="单据编号" prop="number">
                <el-input v-model="ruleForm.number"></el-input>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple-light">
              <el-form-item label="单据日期" prop="documentTime">
                <el-date-picker
                  v-model="ruleForm.documentTime"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item label="调出仓库" prop="location">
                <el-select
                  class="select"
                  v-model="ruleForm.location"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in locationoptions"
                    :key="item.id"
                    :label="item.depotName"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item></div
          ></el-col>
        </el-row>
        <!-- 3 -->
        <el-row>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item
                v-if="ruleForm.allotType == '1' || ruleForm.allotType == ''"
                label="调出仓库"
                prop="location"
              >
                <el-select
                  class="select"
                  v-model="ruleForm.location"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in locationoptions"
                    :key="item.id"
                    :label="item.depotName"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                v-if="ruleForm.allotType == '2'"
                label="调入仓库"
                prop="inLocation"
              >
                <el-select
                  class="select"
                  v-model="ruleForm.inLocation"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in inLocationoptions"
                    :key="item.id"
                    :label="item.depotName"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item class="form-item" label="执行部门" prop="">
                <el-select
                  class="select"
                  v-model="ruleForm.handleDeptId"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in handleDeptIdoptions"
                    :key="item.id"
                    :label="item.deptName"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item></div
          ></el-col>
        </el-row>
        <!-- 3 -->
        <el-row>
          <el-col :span="8"
            ><div class="grid-content bg-purple-light">
              <el-form-item class="form-itemL" label="执行人" prop="">
                <el-select
                  class="select"
                  v-model="ruleForm.handlePersonId"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in handlePersonIdoptions"
                    :key="item.id"
                    :label="item.roleName"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item class="form-itemL" label="制单人">
                <el-input v-model="ruleForm.createUser"></el-input>
              </el-form-item></div
          ></el-col>
        </el-row>

        <el-row>
          <el-col :span="24"
            ><div class="grid-content bg-purple-dark">
              <strong>● 调拨对象</strong>
            </div></el-col
          >
        </el-row>
        <el-divider></el-divider>
        <!-- 4 -->
        <el-row>
          <el-col :span="24"
            ><div class="grid-content bg-purple">
              <el-form-item>
                <el-radio v-model="ruleForm.allotObject" label="1"
                  >设备调拔</el-radio
                >
                <el-radio v-model="ruleForm.allotObject" label="2"
                  >备件调拨</el-radio
                >
              </el-form-item>
            </div></el-col
          >
          <el-col :span="24"
            ><div class="grid-content bg-purple-dark">
              <el-form-item label="扫码:">
                <el-input
                  ref="input"
                  @keyup.enter.native="payCode"
                  v-model="ruleForm.scanaQRcode"
                  placeholder=""
                ></el-input>
              </el-form-item></div
          ></el-col>
        </el-row>

        <!-- 5 -->
        <el-row>
          <el-col :span="24"
            ><div class="grid-content bg-purple-dark">
              <el-button size="small" type="primary" @click="addTool('0')"
                >添加设备</el-button
              >
              <el-button size="small" type="primary">移除设备</el-button>
            </div></el-col
          >
          <el-col :span="24"
            ><div class="grid-content bg-purple-dark">
              <!-- 设备 -->
              <el-table
                ref="multipleTable"
                :data="ruleForm.equipmentInventoryList"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection" width="55"> </el-table-column>
                <el-table-column prop="assetTag" label="资产编号">
                </el-table-column>
                <el-table-column prop="equipmentCoding" label="设备编号">
                </el-table-column>
                <el-table-column prop="name" label="设备名称">
                </el-table-column>
                <el-table-column prop="category" label="设备类别">
                </el-table-column>
                <el-table-column prop="model" label="规格型号">
                </el-table-column>
                <el-table-column prop="unit" label="单位"> </el-table-column>
                <el-table-column width="150" prop="barCode" label="库位编码（调出）">
                </el-table-column>
                <el-table-column fixed="right" width="150" prop="inCode" label="库位编码（调入）">
                  <template slot-scope="{ row }">
                    <el-select v-model="row.inCode" placeholder="请选择">
                      <el-option
                        v-for="item in inCodeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column fixed="right" width="120" prop="arrivalNum" label="调拔数量">
                  <template slot-scope="{ row }">
                    <el-input
                      v-model="row.arrivalNum"
                      placeholder="请输入内容"
                    ></el-input>
                  </template>
                </el-table-column>
              </el-table></div
          ></el-col>
        </el-row>

        <!-- 6 备件 -->
        <el-row>
          <el-col :span="24"
            ><div class="grid-content bg-purple-dark">
              <el-button size="small" type="primary" @click="addTool('1')"
                >添加备件</el-button
              >
              <el-button size="small" type="primary">移除备件</el-button>
            </div></el-col
          >
          <el-col :span="24"
            ><div class="grid-content bg-purple-dark">
              <!-- 备件Table -->
              <el-table
                ref="multipleTable"
                :data="ruleForm.equipmentPartList"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection" width="55"> </el-table-column>
                <el-table-column prop="equipmentCoding" label="备件编号">
                </el-table-column>
                <el-table-column prop="name" label="备件名称">
                </el-table-column>
                <el-table-column prop="category" label="备件类别">
                </el-table-column>
                <el-table-column prop="model" label="规格型号">
                </el-table-column>
                <el-table-column prop="unit" label="单位"> </el-table-column>
                <el-table-column width="150" prop="barCode" label="库位编码（调出）">
                </el-table-column>
                <el-table-column fixed="right" width="150" prop="inCode" label="库位编码（调入）">
                  <template slot-scope="{ row }">
                    <el-select v-model="row.inCode" placeholder="请选择">
                      <el-option
                        v-for="item in inCodeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column fixed="right" width="120" prop="arrivalNum" label="调拔数量">
                  <template slot-scope="{ row }">
                    <el-input
                      v-model="row.arrivalNum"
                      placeholder="请输入内容"
                    ></el-input>
                  </template>
                </el-table-column>
              </el-table></div
          ></el-col>
        </el-row>

        <!-- 备注 -->
        <el-row>
          <el-col :span="24"
            ><div class="grid-content bg-purple-dark">
              <strong>● 备注</strong>
            </div></el-col
          >

          <el-col :span="24">
            <el-input v-model="ruleForm.remark"></el-input>
          </el-col>
        </el-row>
      </el-form>

      <!-- 二层弹框 -->
      <el-dialog
        width="60%"
        title="添加设备/备件"
        :visible.sync="innerVisible"
        :before-close="updateinterior"
        append-to-body
      >
        <!-- 设备组件 -->
        <infor-ele @addTabData="addTabData" v-if="falg == '0'"></infor-ele>
        <replac-ement @bjaddTabData="bjaddTabData" v-else></replac-ement>
      </el-dialog>
    </el-dialog>
  </div>
</template>
<script>
import inforEle from "./infor";
import replacEment from "./replacement";
import { Gostorage } from "@/api/shebei/InventoryManagement";
import {deptList,userList,depotList} from "@/api/shebei/commit"
export default {
  name: "",
  components: { inforEle, replacEment },
  props: {
    adddialogVisible: {
      type: [String, Number, Object, Array]
    }
  },
  data() {
    return {
      falg: "0",

      // 二层弹框
      innerVisible: false,

      // 表单数据
      ruleForm: {
        allotType: "", // 调拔类型（1.外，2内）
        location: "", // 调出
        inLocation: "", // 调入
        number: "", // 单据编号
        documentTime: "", // 单据日期
        createUser: "", // 制单人
        handleDeptId: "", // 执行部门
        handlePersonId: "", // 执行人
        allotObject: "", // 设备/备件调拨
        remark: "", // 备注

        // 设备
        equipmentInventoryList: [
        ],
        // 备件
        equipmentPartList: [

        ]
      },

      // 校验规则

      rules: {
        number: [{ required: true, message: "单据编号必选" }],
        documentTime: [
          { required: true, message: "请输入单据日期", trigger: "blur" }
        ],
        location: [
          { required: true, message: "请输入调出仓库", trigger: "blur" }
        ],
        inLocation: [
          { required: true, message: "请输入调入仓库", trigger: "blur" }
        ]
      },

      // 执行部门
      handleDeptIdoptions: [],

      // 调入
      inLocationoptions: [],

      // 执行人
      handlePersonIdoptions: [
        {
          value: "执行人a",
          label: "执行人a"
        },
        {
          value: "执行人b",
          label: "执行人b"
        }
      ],

      // 调拔仓库
      locationoptions: []
    };
  },
  activated() {},
  watch: {
    // immediate = true
  },
  created() {},
  mounted() {},
  methods: {
   async open_all(){
     let deptRes = await deptList()
     let depotRes = await depotList()
     let userRes = await userList()
     this.locationoptions=depotRes.data.data
     this.inLocationoptions=depotRes.data.data
     this.handleDeptIdoptions=deptRes.data.data
     this.handlePersonIdoptions=userRes.data.data.records
    },
    // 通知父组件 关闭
    updateVisible() {
      this.$emit("updateAdd");
    },
    // 真正关闭的回调
    detailialogClosed() {
      this.datainit();
    },

    // 二层 真正关闭的回调
    updateinterior() {
      this.innerVisible = false;
    },

    // 二层弹框
    addTool(val) {
      this.innerVisible = true;
      this.falg = val;
    },

    // 添加
    async addForm() {
      this.ruleForm.type = "调拨";
      const { data: res } = await Gostorage(this.ruleForm);
      if (res.code !== 200) return this.$message.error("新增失败");
      this.$message.success("新增成功");
      this.updateVisible();
    },

    // 初始化数据
    datainit() {
      this.ruleForm.allotType = "";
      this.ruleForm.location = "";
      this.ruleForm.number = "";
      this.ruleForm.documentTime = "";
      this.ruleForm.createUser = "";
      this.ruleForm.handleDeptId = "";
      this.ruleForm.handlePersonId = "";
      this.ruleForm.allotObjct = "";
      this.ruleForm.remark = "";
      this.ruleForm.equipmentInventoryList = [];
      this.ruleForm.equipmentPartList = [];
    },

    // 获取设备添加的数据
    addTabData(val) {
      val.forEach(element => {
        this.ruleForm.equipmentInventoryList.push(element);
      });
      console.log(this.ruleForm.equipmentInventoryList);
      this.updateinterior();
      this.$message.success("新增成功");
    },

    // 获取备件添加的数据
    bjaddTabData(val) {
      val.forEach(element => {
        this.ruleForm.equipmentPartList.push(element);
      });
      this.updateinterior();
      this.$message.success("新增成功");
    }
  },
  // 计算属性
  computed: {}
};
</script>
<style scoped lang="scss">
/deep/.el-dialog__body {
  padding: 0px 20px;
}

/deep/.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 190px;
}

/deep/.select {
  width: 190px;
}

.form-item {
  padding-left: 10px;
}
.form-itemL {
  padding-left: 22px;
}
</style>
