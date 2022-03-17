// 工艺路线新增、修改、详情
<template>
  <basic-container>
    <el-row>
      <el-form
        :model="craft"
        label-width="100px"
        ref="craft"
        :rules="rules"
        :show-message="false"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item prop="lineName" label="工艺名称：">
              <el-input
                size="small"
                v-model="craft.lineName"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item prop="status" label="状态：">
              <el-select
                :disabled="status === 'isDetail'"
                size="small"
                v-model="craft.status"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in craftStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="name" label="产品名称：">
              <el-input
                :disabled="status === 'isDetail'"
                @click.native="productDialogVisible = true"
                v-model="craft.name"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="lineType" label="工艺类型：">
              <el-select
                :disabled="status === 'isDetail'"
                size="small"
                v-model="craft.lineType"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in craftTypes"
                  :key="item.dictKey"
                  :label="item.dictValue"
                  :value="item.dictKey"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="version" label="版本号：">
              <el-input
                size="small"
                v-model="craft.version"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
            <el-form-item  label="规格型号：">
              <el-input
                size="small"
                v-model="craft.model"
                readonly
                placeholder="自动带出"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="描述：">
              <el-input
                style="width: 610px"
                :rows="5"
                type="textarea"
                size="small"
                v-model="craft.lineDesc"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <el-row style="margin-bottom: 20px">
      <el-button size="small" type="primary" @click="save" :loading="requesting"
        >保存</el-button
      >
    </el-row>
    <div class="content-wrapper">
      <div class="right">
        <div class="flow-wrapper border">
          <div class="canvas" ref="canvas"></div>
        </div>
        <div class="information-wapper border">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="工序信息" name="first">
              <el-form ref="form" :model="form" label-width="100px">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="工序编码：">
                      <el-input
                        disabled
                        size="small"
                        v-model="form.processCode"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="工序名称：">
                      <el-select
                        @change="selectProcess"
                        v-model="form.processName"
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="item in processList"
                          :key="item.id"
                          :label="item.procName"
                          :value="item"
                        >
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="优先级：">
                      <el-input
                        size="small"
                        v-model="form.level"
                        placeholder="请输入"
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="工序顺序：">
                      <el-input
                        size="small"
                        v-model="form.processSeq"
                        placeholder="请输入"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <el-button
                size="small"
                type="primary"
                @click="json2xml"
                style="margin-left: 20px"
                >关联工序</el-button
              >
            </el-tab-pane>
            <!-- <el-tab-pane label="关联工步" name="second">关联工步</el-tab-pane> -->
          </el-tabs>
        </div>
      </div>
    </div>

    <el-dialog
      title="产品选择"
      :visible.sync="productDialogVisible"
      append-to-body
      width="80%"
      :before-close="handleClose"
    >
      <product-select @on-submit="selectProduct"></product-select>
    </el-dialog>
  </basic-container>
</template>

<script>
import { upload } from "@/api/common";
import productSelect from "@/components/productSelect";
import axios from "axios";
import { saveOrUpdateCraftRoute } from "@/api/process/craft-route";
import { getDictionary } from "@/api/system/dictbiz";
import { findProcessList } from "@/api/process/process.js";
import BpmnModeler from "bpmn-js/lib/Modeler";
import bpmnXml from "@/mock/diagram";
const activitiExtensionModule = require("activiti-bpmn-moddle/lib");
const activitiModdle = require("activiti-bpmn-moddle/resources/activiti");
export default {
  data() {
    return {
      requesting: false,
      productDialogVisible: false,
      fileList: [],
      status: "",
      activeName: "first",
      processList: [],
      form: {
        nodeid: "",
        processCode: "",
        processName: "",
        level: "",
        processSeq: "",
      },
      craft: {
        bpmUrl: "",
        lineType: "",
        status: "",
        lineName: "",
        name: "", //产品
        version: "",
        lineDesc: "",
        lineProcessList: [],
        productId: "",
      },
      craftStatus: [
        {
          value: 0,
          label: "启用",
        },
        {
          value: 1,
          label: "不启用",
        },
      ],
      craftTypes: [],
      rules: {
        lineName: [{ required: true, trigger: "blur" }],
        status: [{ required: true, trigger: "change" }],
        name: [{ required: true, trigger: "blur" }],
        lineType: [{ required: true, trigger: "blur" }],
        version: [{ required: true, trigger: "blur" }],
      },
    };
  },
  components: {
    productSelect,
  },
  async mounted() {
    this.status = this.$route.query.status;
    if (this.$route.query.row) {
      console.log(this.$route.query.row);
      this.craft = this.$route.query.row;
      this.craft.name = this.$route.query.row.lineName;
      this.craft.model = this.$route.query.row.model;
      axios({
        method: "get",
        url: this.craft.bpmUrl,
        responseType: "stream",
      }).then((response) => {
        const xml = response.data;
        this._init(xml);
      });
    } else {
      this._init(bpmnXml);
    }
  },
  methods: {
    selectProduct(e) {
      console.log(e);
      if (e.length && e.length > 0) {
        this.craft.productId = e[0].id;
        this.craft.name = e[0].name;
        this.craft.model = e[0].model;
        this.productDialogVisible = false;
      }
    },
    async save() {
      //先检验
      try {
        await this.$refs.craft.validate();
      } catch (error) {
        this.$message.error({
          message: "请完善必填信息",
        });
        return;
      }

      try {
        const saveBpmnResult = await this.bpmnModeler.saveXML({ format: true });
        const { xml } = saveBpmnResult;
        let date = Date.now();
        let bpmnFile = new File([xml], `${date}.bpmn20.xml`);
        const fd = new FormData();
        fd.append("file", bpmnFile);
        const result = await upload(fd);
        this.craft.bpmUrl = result.data.data.url;
        this.requesting = true;
        try {
          const saveCraftRouteRes = await saveOrUpdateCraftRoute(this.craft);
          this.requesting = false;
          if (saveCraftRouteRes.data.code === 200) {
            this.$message.success("操作成功");
            this.$router.push({
              path: "/product-development/craft-route",
            });
          }
        } catch {
          this.requesting = false;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async _init(xml) {
      const processList = await findProcessList({ current: 1, size: 1000 });
      this.processList = processList.data.data.processVOList;
      const craftTypeRes = await getDictionary({ code: "mes_craf_type" });
      this.craftTypes = craftTypeRes.data.data;
      // 获取到属性ref为“canvas”的dom节点
      const canvas = this.$refs.canvas;
      // 建模
      this.bpmnModeler = new BpmnModeler({
        container: canvas,
        additionalModules: [activitiExtensionModule],
        moddleExtensions: {
          activiti: activitiModdle,
        },
      });
      this.createNewDiagram(xml);
    },
    async createNewDiagram(xml) {
      try {
        const result = await this.bpmnModeler.importXML(xml);
        const { warnings } = result;
        console.log(warnings);
        this.addEventBusListener();
      } catch (err) {
        console.log(err.message, err.warnings);
      }
    },
    json2xml() {
      if (!this.form.nodeid) {
        this.$message.warning("请选择工序");
        return;
      }
      let existIndex = this.craft.lineProcessList.findIndex(
        (item) => item.nodeid === this.form.nodeid
      );
      if (existIndex === -1) {
        this.craft.lineProcessList.push(this.form);
      } else {
        this.craft.lineProcessList[existIndex] = this.form;
      }
      const elementRegistry = this.bpmnModeler.get("elementRegistry");
      const bpmnFactory = this.bpmnModeler.get("bpmnFactory");
      const modeling = this.bpmnModeler.get("modeling");
      // “elementRegistry.get” 根据节点id找到节点实例，为其在xml写入添加属性
      const element = elementRegistry.get(this.form.nodeid);
      // 存在找不到节点的情况，那说明节点在点击后，被删除了
      if (element !== undefined) {
        const extensionElements = bpmnFactory.create("bpmn:ExtensionElements");
        const inputOutput = bpmnFactory.create("activiti:InputOutput");
        extensionElements.values = [inputOutput];
        inputOutput.inputParameters = [];
        // 遍历this.form，将其各个属性进行循环写入extensionElements
        for (const nodeKey in this.form) {
          let inputParameter = null;
          // 1、属性值为单个值，即布尔、字符串、数字
          if (
            (typeof this.form[nodeKey] === "string" &&
              this.form[nodeKey] !== "") ||
            typeof this.form[nodeKey] === "boolean" ||
            typeof this.form[nodeKey] === "number"
          ) {
            inputParameter = bpmnFactory.create("activiti:InputParameter", {
              name: nodeKey,
              // 布尔值和数字影响生成xml，都要转成字符串
              value:
                typeof this.form[nodeKey] === "string"
                  ? this.form[nodeKey]
                  : JSON.stringify(this.form[nodeKey]),
            });
            //  2.属性值为数组或对象
          } else if (typeof this.form[nodeKey] === "object") {
            // 2.1 属性值为数组，对应案例中 '爱吃'字段，checkbox多选
            if (this.form[nodeKey] instanceof Array) {
              if (this.form[nodeKey].length) {
                inputParameter = bpmnFactory.create("activiti:InputParameter", {
                  name: nodeKey,
                });
                const list = bpmnFactory.create("activiti:List");
                list.items = [];
                this.form[nodeKey].forEach((item) => {
                  const itemValue = bpmnFactory.create("activiti:Value", {
                    value: item,
                  });
                  list.items.push(itemValue);
                });
                inputParameter.definition = list;
              }
            } else {
              // 2.2 此时属性值是对象，对应案例中 '详细信息'
              if (JSON.stringify(this.form[nodeKey]) === "{}") continue;
              inputParameter = bpmnFactory.create("activiti:InputParameter", {
                name: nodeKey,
              });
              const map = bpmnFactory.create("activiti:Map");
              map.entries = [];
              for (const mapKey in this.form[nodeKey]) {
                if (this.form[nodeKey][mapKey] !== "") {
                  const itemValue = bpmnFactory.create("activiti:Entry", {
                    key: mapKey,
                    value: this.form[nodeKey][mapKey],
                  });
                  map.entries.push(itemValue);
                }
                inputParameter.definition = map;
              }
            }
          }
          inputParameter !== null &&
            inputOutput.inputParameters.push(inputParameter);
        }
        modeling.updateProperties(element, { extensionElements });
      }
      this.saveDiagram();
    },
    splitBusiness2Json(businessObject) {
      console.log(businessObject);
      let formData = {};
      // 此时这个id必须要，因为json生成xml时，节点id是找到节点的唯一标识
      formData["nodeid"] = businessObject.id;
      let params = this.getExtensionElement(
        businessObject,
        "activiti:InputOutput"
      );
      if (params && params.inputParameters) {
        params.inputParameters.forEach((item) => {
          let definition = item.definition;
          if (definition) {
            if (definition.$type === "activiti:List") {
              let arr = [];
              definition.items.forEach((itemsItem) => {
                arr.push(itemsItem.value);
              });
              formData[item.name] = arr;
            } else if (definition.$type === "activiti:Map") {
              let obj = {};
              if (definition.entries) {
                definition.entries.forEach((entriesItem) => {
                  obj[entriesItem.key] = entriesItem.value;
                });
                formData[item.name] = obj;
              }
            }
          } else {
            formData[item.name] = item.value;
          }
        });
      }
      this.form = formData;
    },
    getExtensionElement(element, type) {
      if (!element.extensionElements) {
        return;
      }
      return element.extensionElements.values.filter((extensionElement) => {
        return extensionElement.$instanceOf(type);
      })[0];
    },
    success() {
      // console.log('创建成功!')
      this.addBpmnListener();
    },
    addEventBusListener() {
      let eventBus = this.bpmnModeler.get("eventBus");
      // 注册节点事件，eventTypes中可以写多个事件
      let eventTypes = ["element.click"];
      eventTypes.forEach((eventType) => {
        eventBus.on(eventType, (e) => {
          let { element } = e;
          if (!element.parent) return;
          if (!e || element.type === "bpmn:Process") {
            return false;
          } else {
            if (eventType === "element.click") {
              let businessObject = element.businessObject || element;
              this.businessObject = businessObject;
              // 此时的businessObject 是我们想要的万能的小可爱
              this.splitBusiness2Json(businessObject);
            }
          }
        });
      });
    },
    async saveDiagram(done) {
      // 把传入的done再传给bpmn原型的saveXML函数调用
      try {
        const result = await this.bpmnModeler.saveXML({ format: true });
        const { xml } = result;
        // console.log(xml);
      } catch (err) {
        console.log(err);
      }
    },
    // 当图发生改变的时候会调用这个函数，这个data就是图的xml
    setEncoded(link, name, data) {
      // 把xml转换为URI，下载要用到的
      const encodedData = encodeURIComponent(data);
      // 下载图的具体操作,改变a的属性，className令a标签可点击，href令能下载，download是下载的文件的名字
      console.log(link, name, data);
      let xmlFile = new File([data], "test.bpmn");
      //   console.log(xmlFile)
      if (data) {
        link.className = "active";
        link.href = "data:application/bpmn20-xml;charset=UTF-8," + encodedData;
        link.download = name;
      }
    },
    selectProcess(data) {
      this.form.processId = data.id;
      this.form.processCode = data.procCode;
      this.form.processName = data.procName;
      this.businessObject.name = data.procName;
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .el-select {
  width: 100%;
}
/deep/ .bjs-powered-by {
  visibility: hidden;
}
.content-wrapper {
  display: flex;
  .border {
    border: 1px solid #dedede;
  }
  .right {
    flex: 1;
    .flow-wrapper {
      height: 360px;
      .canvas {
        width: 100%;
        height: 100%;
      }
    }
    .information-wapper {
      height: 198px;
      margin-top: 15px;
      /deep/ .el-tabs__nav {
        padding-left: 10px;
      }
      /deep/ .el-tabs__active-bar {
        left: 10px;
      }
    }
  }
}
</style>
