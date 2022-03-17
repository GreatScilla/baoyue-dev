<template>
  <div>
    <el-dialog
      title="新增核价单"
      append-to-body
      :visible.sync="dialogVisible"
      width="60%"
      @opened="open_all"
      @close="detailialogClosed"
      :before-close="updateVisible"
    >
      <el-divider></el-divider>
      <el-row>
        <el-col :span="21"
          ><div class="grid-content bg-purple-dark">
            <strong>● 单据信息</strong>
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
              <el-form-item label="单据日期" prop="numberDate">
                <el-date-picker
                  v-model="ruleForm.numberDate"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item label="制单人">
                <el-input v-model="ruleForm.createPersonName"></el-input>
              </el-form-item></div
          ></el-col>
        </el-row>
        <!-- 3 -->
        <el-row>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item class="form-item" label="附件信息">
                <el-upload
                  class="upload-demo"
                  action="#"
                  :before-upload="myUpload"
                >
                  <el-button size="small">点击上传</el-button>
                </el-upload>
              </el-form-item>
            </div></el-col
          >
        </el-row>

        <el-row>
          <el-col :span="24"
            ><div class="grid-content bg-purple-dark">
              <strong>● 核价设备明细</strong>
            </div></el-col
          >
          <el-col :span="24"
            ><div class="grid-content bg-purple-dark">
              <el-button size="small" type="primary" @click="addmessage('0')"
                >添加设备</el-button
              >
              <el-button size="small" type="primary">移除设备</el-button>
            </div></el-col
          >
        </el-row>
        <el-divider></el-divider>
        <!-- 5 设备 -->
        <el-row>
          <el-col :span="24"
            ><div class="grid-content bg-purple-dark">
              <!-- 设备 -->
              <el-table
                ref="multipleTable"
                :data="ruleForm.deviceDatebaseList"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection" width="55"> </el-table-column>
                <el-table-column prop="equipmentCoding" label="设备编号">
                </el-table-column>
                <el-table-column prop="name" label="设备名称">
                </el-table-column>
                <el-table-column prop="category" label="设备类别">
                </el-table-column>
                <el-table-column prop="model" label="规格型号">
                </el-table-column>
                <el-table-column prop="unit" label="单位"> </el-table-column>
                <el-table-column prop="supplierName" label="供应商">
                  <template v-slot:default="slotProps">
                    <el-select v-model="slotProps.row.supplierName">
                      <el-option
                        v-for="item in businessMan"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="originalPrice" label="原始单价">
                </el-table-column>
                <el-table-column prop="price" label="单价">
                  <template v-slot:default="slotProps">
                    <el-input
                      v-model="slotProps.row.price"
                      placeholder="手动输入"
                    ></el-input>
                  </template>
                </el-table-column>
              </el-table></div
          ></el-col>
        </el-row>

        <el-row>
          <el-col :span="24"
            ><div class="grid-content bg-purple-dark">
              <strong>● 核价备件明细</strong>
            </div></el-col
          >
          <el-col :span="24"
            ><div class="grid-content bg-purple-dark">
              <el-button size="small" type="primary" @click="addmessage('1')"
                >添加备件</el-button
              >
              <el-button size="small" type="primary">移除备件</el-button>
            </div></el-col
          >
        </el-row>
        <el-divider></el-divider>

        <!-- 6 备件 -->
        <el-row>
          <el-col :span="24"
            ><div class="grid-content bg-purple-dark">
              <!-- 备件Table -->
              <el-table
                ref="multipleTable"
                :data="ruleForm.spareDatebaseList"
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
                <el-table-column prop="supplierName" label="供应商">
                  <template v-slot:default="slotProps">
                    <el-select v-model="slotProps.row.supplierName">
                      <el-option
                        v-for="item in businessMan"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="originalPrice" label="原始单价">
                </el-table-column>
                <el-table-column prop="price" label="单价">
                  <template v-slot:default="slotProps">
                    <el-input
                      v-model="slotProps.row.price"
                      placeholder="手动输入"
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

      <!-- 内层 -->
      <el-dialog
        width="60%"
        title="内层 Dialog"
        :visible.sync="innerVisible"
        append-to-body
      >
        <!-- 设备组件 -->
        <infor-ele @addTabData="addTabData" v-if="falg == '0'"></infor-ele>
        <replac-ement
          @bjaddTabData="bjaddTabData"
          v-if="falg == '1'"
        ></replac-ement>
      </el-dialog>
    </el-dialog>
  </div>
</template>
<script>
import inforEle from "./infor";
import replacEment from "./replacement";
import { addOrUpdatePriceList } from "@/api/shebei/purchase";
import {depotList, deptList, userList,contactList} from "@/api/shebei/commit";
export default {
  name: "",
  components: { inforEle, replacEment },
  props: {},
  data() {
    return {
      businessMan:[],
      // 自己的
      dialogVisible: false,
      // 内层的
      innerVisible: false,
      falg: null,
      ruleForm: {
        number: "", // 单据编号
        numberDate: "", // 单据日期
        createPersonName: "", // 制单人
        remark: "", // 备注

        deviceDatebaseList: [
          {
            equipmentCoding: "1",
            name: "2",
            category: "3",
            model: "4",
            unit: "5",
            supplierName: "供应商",
            originalPrice: "999",
            price: "93"
          }
        ], // 设备table

        spareDatebaseList: [
          {
            equipmentCoding: "16",
            name: "56",
            category: "89",
            model: "4",
            unit: "6",
            supplierName: "供应商",
            originalPrice: "69",
            price: "9563"
          }
        ] // 备件table
      },
      // 校验
      rules: {
        number: [
          { required: true, message: "单据编号不为空", trigger: "blur" }
        ],
        numberDate: [
          { required: true, message: "请输入单据日期", trigger: "blur" }
        ],
        createPersonName: [
          { required: true, message: "请输入制单人", trigger: "blur" }
        ]
      }
    };
  },
  activated() {},
  watch: {
    // 方法一 : name function () {}
    // 方法二 : name { 1. handler () {} 此方法可加 2. immediate = true 该回调开始立刻调用 方法一没有}
  },
  created() {},
  mounted() {},
  methods: {
   async open_all(){
      let res = await contactList({category:"1"})
     this.businessMan = res.data.data
    },
    // // 添加
    async addForm() {
      this.mergeTab();
      const { data: res } = await addOrUpdatePriceList(this.ruleForm);
      if (res.code !== 200) return this.$message.error("新增失败");
      this.$message.success("新增成功");
      this.detailialogClosed();
    },
    detailialogClosed() {
      this.dialogVisible = false;
      this.$emit("addupdate");
    },

    // 添加设备/备件
    addmessage(val) {
      this.falg = val;
      this.innerVisible = true;
    },

    // 添加设备成功
    addTabData(val) {
      val.forEach(element => {
        this.ruleForm.deviceDatebaseList.push(element);
      });
      this.innerVisible = false;
    },
    // 添加备件成功
    bjaddTabData(val) {
      val.forEach(element => {
        this.ruleForm.spareDatebaseList.push(element);
      });
      this.innerVisible = false;
    },

    // // 批量删除
    handleSelectionChange(val) {
      // val 是需要被删除的数组
      console.log(val);
    },

    myUpload(file) {
      // let result = `Basic ${Base64.encode(
      //   `${website.clientId}:${website.clientSecret}`
      // )}`;
      var form = new FormData();
      form.append("file", file);
      console.log(file);
      console.log(form);
      // var xhr = new XMLHttpRequest();
      // // 添加 上传成功后的回调函数
      // xhr.onload = function(res) {};
      // // 添加 上传失败后的回调函数
      // xhr.onerror = function(err) {};
      // xhr.open("POST", "/api/blade-rcm/equipmentDepotHead/importOut", true);
      // xhr.setRequestHeader("Authorization", result);
      // xhr.setRequestHeader(website.tokenHeader, "bearer " + getToken());
      // xhr.send(form);
      return false;
    },

    // 合二为一
    mergeTab() {
      this.ruleForm.equipmentPriceListItemList = [];
      this.ruleForm.deviceDatebaseList.forEach(ele => {
        ele.type = "设备";
        this.ruleForm.equipmentPriceListItemList.push(ele);
      });
      this.ruleForm.spareDatebaseList.forEach(ele => {
        ele.type = "备件";
        this.ruleForm.equipmentPriceListItemList.push(ele);
      });
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

/deep/.el-form-item__content {
  width: 150px;
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
