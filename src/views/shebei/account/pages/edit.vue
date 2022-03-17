<template>
  <div>
    <el-dialog
      title="设备详情"
      :visible.sync="dialogVisible"
      @close="addDialogClosed"
      width="900px"
      @opened="openAll"
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
        <el-col :span="8" :offset="18" v-if="falgBtn == '0'"
          ><div class="grid-content bg-purple-light">
            <div class="flagA">
              <el-button type="primary" class="btn-save" @click="falgBtn = '1'"
                >编辑</el-button
              >
            </div>
          </div></el-col
        >
        <el-col :span="8" :offset="7" v-else
          ><div class="grid-content bg-purple-light">
            <div class="flag">
              <el-button
                size="small"
                type="info"
                class="btn-file"
                @click="falgBtn = '0'"
                >取消编辑</el-button
              >
              <el-button
                size="small"
                type="primary"
                class="btn-file"
                @click="coneditor"
                >保存编辑</el-button
              >
            </div>
          </div></el-col
        >
      </el-row>

      <el-form
        :label-position="labelPosition"
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
                  ref="selec"
                  :props="props"
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
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
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
              <el-form-item label="供应商" class="form-Left" prop="supplier">
                <el-select
                  v-model="formLabelAlign.supplier"
                  clearable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in optionsSupplier"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
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
              <el-form-item label="设备图片" class="from-img">
                <el-image
                  style="width: 34px; height: 34px"
                  :src="formLabelAlign.picture"
                >
                </el-image>
                <el-image-viewer
                  v-if="showViewer"
                  :on-close="
                    () => {
                      showViewer = false;
                    }
                  "
                  :url-list="srcList"
                />
                <el-button
                  size="small"
                  type="primary"
                  class="btn-view"
                  @click="showViewer = true"
                  >查看大图</el-button
                >
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

        <el-form
          :label-position="labelPosition"
          :model="deprecition"
          :rules="deprecitionrules"
          ref="clearFrom"
          inline
          label-width="100px"
          class="demo-ruleForm"
        >
          <!-- 设备折旧 -->
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="12"
              ><div class="grid-content bg-purple">
                <strong>*设备折旧</strong>
                <span class="span-l-r">暂未开启</span>
                <el-button
                  @click="isDepreciation = '1'"
                  type="primary"
                  class="btn-s-r"
                  >开启折旧</el-button
                >
              </div></el-col
            >
          </el-row>

          <template>
            <div v-if="isDepreciation == '1'">
              <!-- 第一行 -->
              <el-row>
                <el-col :span="8"
                  ><div class="grid-content bg-purple">
                    <el-form-item label="开启日期" prop="startTime">
                      <el-date-picker
                        v-model="deprecition.startTime"
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
                    <el-form-item label="折旧方法" prop="method">
                      <el-select
                        v-model="deprecition.method"
                        clearable
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="item in optionsMethod"
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
                      label="折旧年限"
                      prop="usefulLife"
                      class="form-itemLeft"
                    >
                      <el-input
                        v-model="deprecition.usefulLife"
                        placeholder="手动输入"
                      ></el-input>
                    </el-form-item></div
                ></el-col>
              </el-row>

              <!-- 第二行 -->
              <el-row>
                <el-col :span="8"
                  ><div class="grid-content bg-purple">
                    <el-form-item
                      label="残值率"
                      prop="residualValueRate"
                      class="form-Left"
                    >
                      <el-input
                        @blur="blurResidual"
                        v-model="deprecition.residualValueRate"
                        placeholder="手动输入"
                      ></el-input>
                    </el-form-item></div
                ></el-col>
                <el-col :span="8"
                  ><div class="grid-content bg-purple-light">
                    <el-form-item label="月折旧额" prop="monthlyDepreciation">
                      <el-input
                        v-model="deprecition.monthlyDepreciation"
                        placeholder="自动生成"
                      ></el-input>
                    </el-form-item></div
                ></el-col>
                <el-col :span="8"
                  ><div class="grid-content bg-purple-light">
                    <el-form-item
                      label="累计折旧"
                      prop="accumulatedDepreciation"
                      class="form-itemLeft"
                    >
                      <el-input
                        v-model="deprecition.accumulatedDepreciation"
                        placeholder="自动生成"
                      ></el-input>
                    </el-form-item></div
                ></el-col>
              </el-row>

              <!-- 第三行 -->
              <el-row>
                <el-col :span="8"
                  ><div class="grid-content bg-purple-dark">
                    <el-form-item label="净值" class="form-Left-z">
                      <el-input
                        v-model="deprecition.netWorth"
                        placeholder="手动输入"
                      ></el-input>
                    </el-form-item></div
                ></el-col>
              </el-row>
            </div>
          </template>
        </el-form>

        <!-- 设备记录 -->
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="12"
            ><div class="grid-content bg-purple">
              <strong>*设备记录</strong>
            </div></el-col
          >
        </el-row>

        <!-- 第一行 tab切换-->
        <el-row>
          <el-col :span="24"
            ><div class="grid-content bg-purple-dark">
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="操作类型" name="first">
                  <el-table :data="formLabelAlign.records" style="width: 100%">
                    <el-table-column prop="operationCategory" label="操作类型">
                    </el-table-column>
                    <el-table-column prop="operationUser" label="操作人">
                    </el-table-column>
                    <el-table-column prop="operationDate" label="操作时间">
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
                <!-- repairInfos -->
                <el-tab-pane label="维修记录" name="second">
                  <el-table
                    :data="formLabelAlign.repairInfos"
                    style="width: 100%"
                  >
                    <el-table-column prop="" label="单据编号">
                    </el-table-column>
                    <el-table-column prop="" label="单据日期">
                    </el-table-column>
                    <el-table-column prop="" label="维修部门">
                    </el-table-column>
                    <el-table-column prop="" label="维修人"> </el-table-column>
                    <el-table-column prop="" label="故障类别">
                    </el-table-column>
                    <el-table-column prop="" label="备注"> </el-table-column>
                  </el-table>
                </el-tab-pane>
                <el-tab-pane label="保养记录" name="third">
                  <el-table
                    :data="formLabelAlign.repairInfos"
                    style="width: 100%"
                  >
                    <el-table-column prop="" label="单据编号">
                    </el-table-column>
                    <el-table-column prop="" label="单据日期">
                    </el-table-column>
                    <el-table-column prop="" label="保养部门">
                    </el-table-column>
                    <el-table-column prop="" label="保养人"> </el-table-column>
                    <el-table-column prop="" label="备注"> </el-table-column>
                  </el-table>
                </el-tab-pane>
                <el-tab-pane label="点检记录" name="fourth">
                  <el-table
                    :data="formLabelAlign.repairInfos"
                    style="width: 100%"
                  >
                    <el-table-column prop="" label="单据编号">
                    </el-table-column>
                    <el-table-column prop="" label="单据日期">
                    </el-table-column>
                    <el-table-column prop="" label="点检部门">
                    </el-table-column>
                    <el-table-column prop="" label="点检人"> </el-table-column>
                    <el-table-column prop="" label="备注"> </el-table-column>
                  </el-table>
                </el-tab-pane>
                <el-tab-pane label="备件更换记录" name="fourth2">
                  <el-table
                    :data="formLabelAlign.repairInfos"
                    style="width: 100%"
                  >
                    <el-table-column prop="" label="备件编号">
                    </el-table-column>
                    <el-table-column prop="" label="更换日期">
                    </el-table-column>
                    <el-table-column prop="" label="备件名称">
                    </el-table-column>
                    <el-table-column prop="" label="数量"> </el-table-column>
                  </el-table>
                </el-tab-pane>
              </el-tabs></div
          ></el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  updateData,
  updateResidual,
  getIDdata
} from "../../../../api/shebei/account";

export default {
  props: {
    // 弹窗的状态
    dialogVisible: {
      type: Number
    },
    falgBtn: {
      // 控制编辑 详情
      type: [Number, String, Object]
    },
    rowall: {
      // 本行的数据
      type: [String, Object]
    }
  },
  components: {
    "el-image-viewer": () =>
      import("element-ui/packages/image/src/image-viewer")
  },
  watch: {
    async rowall(val) {
      const res = await getIDdata({ id: val.id })
      console.log(this.$refs.clearFrom)
      this.formLabelAlign = res.data.data;

      switch (true) {
        case this.formLabelAlign.category === "hello world":
          this.formLabelAlign.category = 0;
          break;
        case this.formLabelAlign.category === "海边":
          this.formLabelAlign.category = 1;
          break;
        case this.formLabelAlign.category === "森林":
          this.formLabelAlign.category = 2;
          break;
        case this.formLabelAlign.category === "草原":
          this.formLabelAlign.category = 3;
          break;
        case this.formLabelAlign.category === "古城":
          this.formLabelAlign.category = 4;
          break;
        case this.formLabelAlign.category === "蓬莱":
          this.formLabelAlign.category = 5;
          break;

        default:
          null;
      }

      // 设备折旧数据
      if (this.formLabelAlign.depreciation)
        this.deprecition = this.formLabelAlign.depreciation;

      // 保质年限
      let qualityGuaranteePeriodlen =
        this.formLabelAlign.qualityGuaranteePeriod.length - 1;

      this.selPeriod = this.formLabelAlign.qualityGuaranteePeriod
        .trim()
        .substring(qualityGuaranteePeriodlen);

      //-------------

      if (this.formLabelAlign.qualityGuaranteePeriod.length > 2) {
        this.formLabelAlign.qualityGuaranteePeriod = this.formLabelAlign.qualityGuaranteePeriod
          .trim()
          .substring(0, 2);
      } else {
        this.formLabelAlign.qualityGuaranteePeriod = this.formLabelAlign.qualityGuaranteePeriod
          .trim()
          .substring(0, 1);
      }

      //-------------
      // 大图
      this.srcList[0] = this.formLabelAlign.picture;

      // 折旧是否开启
      this.isDepreciation = val.isDepreciation + "";

      // pid
      this.deprecition.pid = val.id;

      this.onSearch();
    }
  },
  data() {
    return {
      // ！折旧
      isDepreciation: "",
      // 展示大图
      showViewer: false,
      // 控制编辑/详情
      labelPosition: "right",
      formLabelAlign: {},
      repairInfos: [],
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
      deprecitionrules: {
        startTime: [
          { required: true, message: "开启日期不能为空", trigger: "change" }
        ],
        method: [
          { required: true, message: "折旧方法不能为空", trigger: "change" }
        ],
        usefulLife: [
          { required: true, message: "折旧年限不能为空", trigger: "blur" }
        ],
        residualValueRate: [
          { required: true, message: "残值率不能为空", trigger: "blur" }
        ],
        monthlyDepreciation: [
          { required: true, message: "月折旧额不能为空", trigger: "blur" }
        ],
        accumulatedDepreciation: [
          { required: true, message: "累计折旧不能为空", trigger: "blur" }
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
      // 所属人员
      optionsCustodian: [
        {
          value: "人员A",
          label: "人员A"
        },
        {
          value: "人员B",
          label: "人员B"
        },
        {
          value: "人员C",
          label: "人员C"
        },
        {
          value: "人员D",
          label: "人员D"
        }
      ],
      // 所在部门
      optionsDept: [
        {
          value: "部门A",
          label: "部门A"
        },
        {
          value: "部门B",
          label: "部门B"
        },
        {
          value: "部门C",
          label: "部门C"
        },
        {
          value: "部门D",
          label: "部门D"
        }
      ],
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
      // 折旧方法
      optionsMethod: [
        {
          value: 1,
          label: "平均年限法"
        }
      ],
      // 计量单位下拉框
      selunit: [
        {
          value: "台",
          label: "台"
        }
      ],

      // 设备类别
      props: {
        label: "name",
        value: "id"
      }, // 配置
      treeData: [
        {
          id: 0,
          name: "hello world",
          children: [
            {
              id: 1,
              name: "海边",
              children: [
                {
                  id: 5,
                  name: "蓬莱"
                }
              ]
            },
            {
              id: 2,
              name: "森林"
            },
            {
              id: 3,
              name: "草原"
            },
            {
              id: 4,
              name: "古城"
            }
          ]
        }
      ],
      // 大图
      srcList: [],
      activeName: "first",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],

      // 折旧
      deprecition: {
        startTime: "",
        method: "",
        usefulLife: "",
        pid: "",
        residualValueRate: "",
        monthlyDepreciation: "",
        accumulatedDepreciation: "",
        netWorth: ""
      },
      // 折旧年限
      selusefulLife: "",
      optionsusefulLife: [
        {
          value: "年",
          label: "年"
        },
        {
          value: "月",
          label: "月"
        }
      ],
      // 控制折旧
      usefulLifeFalg: false
    };
  },
  methods: {
    openAll(){
      this.$refs.clearFrom.disabled=true
      this.$refs.selec.disabled=true

      if(this.falgBtn==1){
        this.$refs.ruleForm.disabled=false
        this.$refs.selec.disabled=false

      }
      console.log("selec")
    },
    // 通知父组件
    updateVisible() {
      this.$emit("updateVisible", false);
    },
    // 监听添加弹窗的事件 重置
    addDialogClosed() {
      this.deprecition = {
        startTime: "",
        method: "",
        usefulLife: "",
        pid: "",
        residualValueRate: "",
        monthlyDepreciation: "",
        accumulatedDepreciation: "",
        netWorth: ""
      };
      this.$refs.clearFrom.resetFields();
    },
    // 自动折旧
    async blurResidual() {
      if (this.deprecition.method == "平均年限法") {
        this.deprecition.method = 1;
      }
      if (this.deprecition.residualValueRate.trim().length > 0) {
        const res = await updateResidual({
          method: this.deprecition.method,
          usefulLife: this.deprecition.usefulLife,
          pid: this.deprecition.pid,
          startTime: this.deprecition.startTime,
          residualValueRate: this.deprecition.residualValueRate
        });

        if (res.data.data.method == 1) {
          res.data.data.method = "平均年限法";
        }
        this.deprecition = res.data.data;
      }
    },
    // 保存编辑
    coneditor() {
      this.adddepreciation();
      this.setStat();
      this.onCategory();
      this.formLabelAlign.depreciation = null;
      this.formLabelAlign.records = null;
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
          const { data: res } = await updateData(this.formLabelAlign);
          if (res.code !== 200) {
            this.updateVisible();
            this.$emit("updateedit");
            return this.$message.error(res.meta.msg);
          }
          this.updateVisible();
          this.$emit("updateedit");
          this.$message.success("修改成功");
        } else {
          this.$message.error("没填写检验");
          return;
        }
      });
    },
    hindleChanged(val) {
      console.log(val[0].name);
      switch (true) {
        case val[0].name === "hello world":
          this.formLabelAlign.category = 0;
          break;
        case val[0].name === "海边":
          this.formLabelAlign.category = 1;
          break;
        case val[0].name === "森林":
          this.formLabelAlign.category = 2;
          break;
        case val[0].name === "草原":
          this.formLabelAlign.category = 3;
          break;
        case val[0].name === "古城":
          this.formLabelAlign.category = 4;
          break;
        case val[0].name === "蓬莱":
          this.formLabelAlign.category = 5;
          break;
        default:
          null;
      }
    },

    // status状态
    onSearch() {
      switch (true) {
        case this.formLabelAlign.status === 0:
          this.formLabelAlign.status = "正常";
          break;
        case this.formLabelAlign.status === 1:
          this.formLabelAlign.status = "闲置";
          break;
        case this.formLabelAlign.status === 2:
          this.formLabelAlign.status = "停机";
          break;
        case this.formLabelAlign.status === 3:
          this.formLabelAlign.status = "故障";
          break;
        case this.formLabelAlign.status === 4:
          this.formLabelAlign.status = "维修";
          break;
        case this.formLabelAlign.status === 5:
          this.formLabelAlign.status = "保养";
          break;
        case this.formLabelAlign.status === 6:
          this.formLabelAlign.status = "已报废";
          break;
        case this.formLabelAlign.status === 7:
          this.formLabelAlign.status = "已出售";
          break;
        default:
          null;
      }
    },
    // 改变设备类被
    onCategory() {
      switch (true) {
        case this.formLabelAlign.category === 0:
          this.formLabelAlign.category = "hello world";
          break;
        case this.formLabelAlign.category === 1:
          this.formLabelAlign.category = "海边";
          break;
        case this.formLabelAlign.category === 2:
          this.formLabelAlign.category = "森林";
          break;
        case this.formLabelAlign.category === 3:
          this.formLabelAlign.category = "草原";
          break;
        case this.formLabelAlign.category === 4:
          this.formLabelAlign.category = "古城";
          break;
        case this.formLabelAlign.category === 5:
          this.formLabelAlign.category = "蓬莱";
          break;
        default:
          null;
      }
    },

    // depreciation
    adddepreciation() {
      if (this.deprecition.method == "平均年限法") {
        this.deprecition.method = 1;
      }
      this.formLabelAlign.startTime = this.deprecition.startTime;
      this.formLabelAlign.method = this.deprecition.method;
      this.formLabelAlign.usefulLife = this.deprecition.usefulLife;
      this.formLabelAlign.pid = this.deprecition.pid;
      this.formLabelAlign.residualValueRate = this.deprecition.residualValueRate;
      this.formLabelAlign.monthlyDepreciation = this.deprecition.monthlyDepreciation;
      this.formLabelAlign.accumulatedDepreciation = this.deprecition.accumulatedDepreciation;
      this.formLabelAlign.netWorth = this.deprecition.netWorth;
    },

    setStat() {
      switch (true) {
        case this.formLabelAlign.status === "正常":
          this.formLabelAlign.status = "0";
          break;
        case this.formLabelAlign.status === "闲置":
          this.formLabelAlign.status = "1";
          break;
        case this.formLabelAlign.status === "停机":
          this.formLabelAlign.status = "2";
          break;
        case this.formLabelAlign.status === "故障":
          this.formLabelAlign.status = "3";
          break;
        case this.formLabelAlign.status === "维修":
          this.formLabelAlign.status = "4";
          break;
        case this.formLabelAlign.status === "保养":
          this.formLabelAlign.status = "5";
          break;
        case this.formLabelAlign.status === "已报废":
          this.formLabelAlign.status = "6";
          break;
        case this.formLabelAlign.status === "已出售":
          this.formLabelAlign.status = "7";
          break;
        default:
          null;
      }
    }
  },
  created() {}
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
.form-itemLeft {
  margin-left: 27px;
}
.form-gzLeft {
  margin-left: 22px;
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
.btn-file,
.btn-view {
  width: 109px;
  height: 34px;
}
.btn-view {
  position: absolute;
  left: 50px;
}
.date-sle-sm {
  width: 60px;
  height: 34px;
  font-size: 12px;
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
.inp-Wh {
  width: 842px;
  height: 34px;
}
.span-l-r {
  margin: 0 20px;
}
.ipt-sm {
  width: 105px;
  height: 34px;
}
.btn-s-r {
  width: 109px;
  height: 34px;
  font-family: 萍方-简;
  font-weight: normal;
  font-size: 14px;
  line-height: 10px;
}
.from-img {
  margin-left: 7px;
}
.form-Left {
  margin-left: 15px;
}
.form-Left-z {
  margin-left: 37px;
}
.flag {
  display: flex;
}
</style>
