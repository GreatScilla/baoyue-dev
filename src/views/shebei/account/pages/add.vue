<template>
  <div>
    <el-dialog
      title="新增设备台账"
      :visible.sync="dialogVisible"
      @close="addDialogClosed"
      width="900px"
      @opened="open_all"
      :before-close="updateVisible"
      append-to-body
    >
      <el-divider></el-divider>
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="12"
          ><div class="grid-content bg-purple">
            <strong>*基本信息</strong>
          </div></el-col
        >
        <el-col :span="6" :offset="16"
          ><div class="grid-content bg-purple-light">
            <el-button type="primary" class="btn-save" @click="submitForm"
              >保存</el-button
            >
          </div></el-col
        >
      </el-row>

      <el-form
        label-width="200px"
        ref="clearFrom"
        :model="formLabelAlign"
        :rules="rules"
        inline
      >
        <!-- 第一行 设置间距 :gutter="10" -->
        <el-row>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item label="设备编号" prop="equipmentCoding">
                <el-input
                  v-model="formLabelAlign.equipmentCoding"
                  placeholder="自动生成"
                ></el-input>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple-light">
              <el-form-item label="设备名称" prop="name">
                <el-input
                  v-model="formLabelAlign.name"
                  placeholder="手动输入"
                ></el-input>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple-light">
              <el-form-item label="固定资产编号" prop="assetTag">
                <el-input
                  v-model="formLabelAlign.assetTag"
                  placeholder="手动输入"
                ></el-input>
              </el-form-item></div
          ></el-col>
        </el-row>

        <!-- 第二行 -->
        <el-row>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item label="设备类别" prop="category">
                <wlTreeSelect
                  leaf
                  width="160"
                  height="34"
                  :data="treeData"
                  @change="hindleChanged"
                  v-model="formLabelAlign.category"
                ></wlTreeSelect>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple-light">
              <el-form-item label="设备状态" prop="status">
                <el-select
                  v-model="formLabelAlign.status"
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in optionsStatus"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple-light">
              <el-form-item
                label="所属人员"
                class="form-itemLeft"
                prop="custodian"
              >
                <el-select
                  v-model="formLabelAlign.custodian"
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in optionsCustodian"
                    :key="item.id"
                    :label="item.roleName"
                    :value="item.roleName"
                  >
                  </el-option>
                </el-select>
              </el-form-item></div
          ></el-col>
        </el-row>

        <!-- 第三行 -->
        <el-row>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item label="购置日期" prop="purchaseDate">
                <el-date-picker
                  v-model="formLabelAlign.purchaseDate"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="选择日期时间"
                  align="right"
                >
                </el-date-picker>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple-light">
              <el-form-item label="所在部门" prop="dept">
                <el-select
                  v-model="formLabelAlign.dept"
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in optionsDept"
                    :key="item.id"
                    :label="item.deptName"
                    :value="item.deptName"
                  >
                  </el-option>
                </el-select>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple-light">
              <el-form-item
                label="所在位置"
                class="form-itemLeft"
                prop="location"
              >
                <el-input
                  v-model="formLabelAlign.location"
                  placeholder="请输入"
                ></el-input>
              </el-form-item></div
          ></el-col>
        </el-row>

        <!-- 第四行 -->
        <el-row>
          <el-col :span="12"
            ><div class="grid-content bg-purple-dark">
              <el-form-item label="供应商" class="form-gzLeft" prop="supplier">
                <el-select
                  v-model="formLabelAlign.supplier"
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in optionsSupplier"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  >
                  </el-option>
                </el-select>
              </el-form-item></div
          ></el-col>
        </el-row>

        <!-- 更多信息 -->
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="12"
            ><div class="grid-content bg-purple">
              <strong>*更多信息</strong>
            </div></el-col
          >
        </el-row>
        <!-- 第一行 -->
        <el-row>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item label="设备图片" class="form-L">
                <el-image
                  style="width: 34px; height: 34px"
                  :src="formLabelAlign.picture[0]"
                >
                </el-image>
                <el-upload
                  class="upload-demo"
                  action="#"
                  :limit="1"
                  :show-file-list="false"
                  :file-list="formLabelAlign.picture[0]"
                  :http-request="upload"
                >
                  <el-button size="small" type="primary" class="btn-file"
                    >重新上传</el-button
                  >
                </el-upload>
              </el-form-item>
            </div></el-col
          >
          <el-col :span="8"
            ><div class="grid-content bg-purple-light">
              <el-form-item label="品牌" class="form-itemLeft" prop="brand">
                <el-input
                  v-model="formLabelAlign.brand"
                  placeholder="手动输入"
                ></el-input>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple-light">
              <el-form-item label="购置金额" prop="price" class="form-itemLeft">
                <el-input
                  v-model="formLabelAlign.price"
                  placeholder="手动输入"
                ></el-input>
              </el-form-item></div
          ></el-col>
        </el-row>

        <!-- 第二行 -->
        <el-row>
          <el-col :span="8"
            ><div class="grid-content bg-purple">
              <el-form-item label="出场日期" prop="productionDate">
                <el-date-picker
                  v-model="formLabelAlign.productionDate"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetime"
                  placeholder="选择日期时间"
                  align="right"
                >
                </el-date-picker>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple-light">
              <el-form-item
                class="form-l"
                label="保质年限"
                prop="qualityGuaranteePeriod"
              >
                <div>
                  <el-input
                    class="ipt-sm"
                    type="number"
                    v-model="formLabelAlign.qualityGuaranteePeriod"
                    placeholder="手动输入"
                  ></el-input>
                  <el-select
                    class="date-sle-sm"
                    v-model="selPeriod"
                    placeholder=""
                  >
                    <el-option
                      v-for="item in optionsData"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </el-form-item></div
          ></el-col>
          <el-col :span="8"
            ><div class="grid-content bg-purple-light">
              <el-form-item label="计量单位" prop="unit" class="form-itemLeft">
                <el-select
                  v-model="formLabelAlign.unit"
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in selunit"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item></div
          ></el-col>
        </el-row>

        <!-- 备注 -->
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="12"
            ><div class="grid-content bg-purple">
              <strong>*备注</strong>
            </div></el-col
          >
        </el-row>

        <el-row>
          <el-col :span="24"
            ><div class="grid-content bg-purple">
              <el-form-item>
                <el-input
                  class="inp-Wh"
                  placeholder="手动输入"
                  v-model="formLabelAlign.memo"
                  clearable
                >
                </el-input>
              </el-form-item></div
          ></el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { addsave, selecTtree } from "@/api/shebei/account";
import {depotList, deptList, userList,contactList} from "@/api/shebei/commit";
export default {
  props: {
    dialogVisible: {
      type: Number
    }
  },
  data() {
    return {
      formLabelAlign: {
        equipmentCoding: "A18610086", // 设备编码

        name: "", // 设备名称

        assetTag: "", // 资产编号

        category: [], // 设备分类

        status: "", // 设备状态

        custodian: "", // 保管人

        purchaseDate: "", // 购置日期

        dept: "", // 所属部门

        location: "", // 存放位置

        supplier: "", // 供应商

        picture: [], // 设备图片

        brand: "", // 品牌

        price: "", // 购置价格

        productionDate: "", // 生产日期

        qualityGuaranteePeriod: "", // 质保日期

        unit: "", // 计量单位

        memo: "" // 备注
      },
      // 校验规则
      rules: {
        equipmentCoding: [
          { required: true, message: "设备编号不能为空", trigger: "blur" }
        ],
        name: [
          { required: true, message: "设备名称不能为空", trigger: "blur" }
        ],
        assetTag: [
          { required: true, message: "资产编号不能为空", trigger: "blur" }
        ],
        category: [
          { required: true, message: "设备类别不能为空", trigger: "change" }
        ],
        status: [
          { required: true, message: "设备状态不能为空", trigger: "change" }
        ],
        custodian: [
          { required: true, message: "所属人员不能为空", trigger: "change" }
        ],
        purchaseDate: [
          { required: true, message: "购置日期不能为空", trigger: "blur" }
        ],
        dept: [
          { required: true, message: "所在部门不能为空", trigger: "change" }
        ],
        location: [
          { required: true, message: "所在位置不能为空", trigger: "blur" }
        ],
        supplier: [
          { required: true, message: "供应商不能为空", trigger: "blur" }
        ],
        brand: [{ required: true, message: "品牌不能为空", trigger: "blur" }],
        price: [
          { required: true, message: "购置金额不能为空", trigger: "blur" }
        ],
        productionDate: [
          { required: true, message: "出场日期不能为空", trigger: "blur" }
        ],
        qualityGuaranteePeriod: [
          { required: true, message: "保质年限不能为空", trigger: "blur" }
        ],
        unit: [
          { required: true, message: "计量单位不能为空", trigger: "change" }
        ]
      },
      // 下拉框
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      // 设备状态
      optionsStatus: [
        {
          value: "0",
          label: "正常"
        },
        {
          value: "1",
          label: "闲置"
        },
        {
          value: "2",
          label: "停机"
        },
        {
          value: "3",
          label: "故障"
        },
        {
          value: "4",
          label: "维修"
        },
        {
          value: "5",
          label: "保养"
        },
        {
          value: "6",
          label: "已报废"
        },
        {
          value: "7",
          label: "已出售"
        }
      ],
      // 设备类别
      optionsCategory: [
        {
          value: "设备1",
          label: "设备1"
        },
        {
          value: "设备2",
          label: "设备2"
        },
        {
          value: "设备3",
          label: "设备3"
        },
        {
          value: "设备4",
          label: "设备4"
        }
      ],
      // 所属人员
      optionsCustodian: [],
      // 所在部门
      optionsDept: [],
      // 供应商
      optionsSupplier: [
        {
          value: "供应商A",
          label: "供应商A"
        },
        {
          value: "供应商B",
          label: "供应商B"
        },
        {
          value: "供应商C",
          label: "供应商C"
        },
        {
          value: "供应商D",
          label: "供应商D"
        }
      ],

      props: {
        label: "",
        value: ""
      }, // 配置
      treeData: [
      ],

      // 质保日期的 年/月
      selPeriod: "",
      // 质保日期的下拉框
      optionsData: [
        {
          value: "年",
          label: "年"
        },
        {
          value: "月",
          label: "月"
        }
      ],
      // 计量单位下拉框
      selunit: [
        {
          value: "台",
          label: "台"
        }
      ]
    };
  },
  methods: {
  async open_all(){
      let deptRes = await deptList()
      let contactRes = await contactList({category:"1"})
      let userRes = await userList()
    this.optionsCustodian=userRes.data.data.records
    this.optionsDept=deptRes.data.data
    this.optionsSupplier=contactRes.data.data
    console.log(contactRes.data.data,999)
  },
    async upload(e) {
      let { file } = e;
      let res = await this.$oss.put(file.name, file);
      if (res.res && res.res.status == 200) {
        this.formLabelAlign.picture.push(res.url);
      }
    },
    // 通知父组件
    updateVisible() {
      this.$emit("updateVisible", false);
    },
    // 监听添加弹窗的事件
    addDialogClosed() {
      this.$refs.clearFrom.resetFields();
    },

    //  提交
    submitForm() {
      this.$emit('updateTable', false)
      this.$refs.clearFrom.validate(async valid => {
        if (valid) {
          if (this.formLabelAlign.qualityGuaranteePeriod.trim().length > 2) {
            this.formLabelAlign.qualityGuaranteePeriod =
              this.formLabelAlign.qualityGuaranteePeriod
                .trim()
                .substring(0, 2) + this.selPeriod;
          } else {
            this.formLabelAlign.qualityGuaranteePeriod =
              this.formLabelAlign.qualityGuaranteePeriod.trim() +
              this.selPeriod;
          }
          this.formLabelAlign.picture = this.formLabelAlign.picture[0];
          this.formLabelAlign.category = this.formLabelAlign.category[0].name;
          const { data: res } = await addsave(this.formLabelAlign);
          if (res.code !== 200) return this.$message.error(res.meta.msg);
          this.updateVisible();
          this.$message.success("新增成功");
          this.$emit("updateTable");

        } else {
          this.$message.error("没填写检验");
          return;
        }
      });
    }
  },
  async created() {
    const res = await selecTtree()
    this.treeData = res.data.data
  }
};
</script>

<style lang="scss" scoped>
/deep/.el-dialog__body {
  padding: 0px 20px;
}
/deep/.el-form--inline .el-form-item__label {
  display: inline;
}
.el-input,
.el-select,
.el-date-picker {
  width: 160px;
  height: 34px;
}
.btn-save {
  width: 65px;
  height: 34px;
  text-align: left;
  line-height: 9px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
}
.form-l {
  margin-left: -1px;
}
.form-itemLeft {
  margin-left: 27px;
}
.form-gzLeft {
  margin-left: 15px;
}
.form-L {
  margin-left: 10px;
}
.el-form-item {
  margin-bottom: 10px;
}
/deep/.upload-demo {
  position: absolute;
  bottom: 14px;
  line-height: 10px;
  left: 50px;
  width: 106px;
  height: 34px;
}
.btn-file {
  width: 109px;
  height: 34px;
}
.ipt-sm {
  width: 105px;
  height: 34px;
}
.date-picker-sm {
  width: 51px;
  height: 34px;
  font-size: 12px;
}
.date-sle-sm {
  width: 60px;
  height: 34px;
  font-size: 12px;
}
.inp-Wh {
  width: 842px;
  height: 34px;
}
</style>
