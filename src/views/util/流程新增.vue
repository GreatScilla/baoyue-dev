// 流程新增
<template>
  <div>
    <basic-container>
      <el-row>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="流程名称">
            <el-input
              v-model="formInline.user"
              placeholder="请输入名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="流程类型">
            <el-select v-model="formInline.user">
              <el-option label="禁用" value="1"></el-option>
              <el-option label="启用" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-input
              v-model="formInline.user"
              placeholder="请输入名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="流程描述">
            <el-input
              v-model="formInline.user"
              placeholder="请输入名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              v-model="formInline.user"
              placeholder="请输入名称"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <div class="canvas" ref="canvas"></div>
      </el-row>
    </basic-container>
  </div>
</template>

<script>
import { client } from "@/util/oss.js";
import axios from "axios";
import { saveOrUpdateCraftRoute } from "@/api/process/craft-route";
import { getDictionary } from "@/api/system/dictbiz";
import { findProcessList } from "@/api/process/process.js";
import BpmnModeler from "bpmn-js/lib/Modeler";
import bpmnXml from "@/mock/diagram";
const activitiExtensionModule = require("activiti-bpmn-moddle/lib");
const activitiModdle = require("activiti-bpmn-moddle/resources/activiti");
export default {
  name: "wel",
  data() {
    return {
      formInline: {
        user: ""
      },
      fileList: [],
      status: "",
      activeName: "first",
      processList: [],
      form: {
        nodeid: "",
        processCode: "",
        processName: "",
        level: "",
        processSeq: ""
      },
      craft: {
        bpmUrl: "",
        lineSn: "",
        lineType: "",
        status: "",
        lineName: "",
        version: "",
        lineDesc: "",
        lineProcessList: []
      },
      craftStatus: [
        {
          value: 0,
          label: "启用"
        },
        {
          value: 1,
          label: "不启用"
        }
      ],
      craftTypes: []
    };
  },
  computed: {},
  async mounted() {
    this.status = this.$route.query.status;
    if (this.$route.query.row) {
      this.craft = this.$route.query.row;
      axios({
        method: "get",
        url: this.craft.bpmUrl,
        responseType: "stream"
      }).then(response => {
        const xml = response.data;
        this._init(xml);
      });
    } else {
      this._init(bpmnXml);
    }
  },
  methods: {
    async save() {
      try {
        const saveBpmnResult = await this.bpmnModeler.saveXML({ format: true });
        const { xml } = saveBpmnResult;
        let date = Date.now();
        let bpmnFile = new File([xml], `${date}.bpmn20.xml`);
        let result = await client.put(bpmnFile.name, bpmnFile);
        this.craft.bpmUrl = result.url;
        const saveCraftRouteRes = await saveOrUpdateCraftRoute(this.craft);
        if (saveCraftRouteRes.data.code === 200) {
          this.$message.success("操作成功");
          this.$router.push({
            path: "/product-development/craft-route"
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    async _init(xml) {
      const canvas = this.$refs.canvas;
      // 建模
      this.bpmnModeler = new BpmnModeler({
        container: canvas,
        additionalModules: [activitiExtensionModule],
        moddleExtensions: {
          activiti: activitiModdle
        }
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
        item => item.nodeid === this.form.nodeid
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
                  : JSON.stringify(this.form[nodeKey])
            });
            //  2.属性值为数组或对象
          } else if (typeof this.form[nodeKey] === "object") {
            // 2.1 属性值为数组，对应案例中 '爱吃'字段，checkbox多选
            if (this.form[nodeKey] instanceof Array) {
              if (this.form[nodeKey].length) {
                inputParameter = bpmnFactory.create("activiti:InputParameter", {
                  name: nodeKey
                });
                const list = bpmnFactory.create("activiti:List");
                list.items = [];
                this.form[nodeKey].forEach(item => {
                  const itemValue = bpmnFactory.create("activiti:Value", {
                    value: item
                  });
                  list.items.push(itemValue);
                });
                inputParameter.definition = list;
              }
            } else {
              // 2.2 此时属性值是对象，对应案例中 '详细信息'
              if (JSON.stringify(this.form[nodeKey]) === "{}") continue;
              inputParameter = bpmnFactory.create("activiti:InputParameter", {
                name: nodeKey
              });
              const map = bpmnFactory.create("activiti:Map");
              map.entries = [];
              for (const mapKey in this.form[nodeKey]) {
                if (this.form[nodeKey][mapKey] !== "") {
                  const itemValue = bpmnFactory.create("activiti:Entry", {
                    key: mapKey,
                    value: this.form[nodeKey][mapKey]
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
      let formData = {};
      // 此时这个id必须要，因为json生成xml时，节点id是找到节点的唯一标识
      formData["nodeid"] = businessObject.id;
      let params = this.getExtensionElement(
        businessObject,
        "activiti:InputOutput"
      );
      if (params && params.inputParameters) {
        params.inputParameters.forEach(item => {
          let definition = item.definition;
          if (definition) {
            if (definition.$type === "activiti:List") {
              let arr = [];
              definition.items.forEach(itemsItem => {
                arr.push(itemsItem.value);
              });
              formData[item.name] = arr;
            } else if (definition.$type === "activiti:Map") {
              let obj = {};
              if (definition.entries) {
                definition.entries.forEach(entriesItem => {
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
      return element.extensionElements.values.filter(extensionElement => {
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
      eventTypes.forEach(eventType => {
        eventBus.on(eventType, e => {
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
    }
  }
};
</script>

<style scoped="scoped" lang="scss"></style>
