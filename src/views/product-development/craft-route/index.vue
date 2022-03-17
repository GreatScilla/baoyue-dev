// 工艺路线
<template>
  <basic-container>
    <el-row style="margin-bottom: 10px;">
      <el-button   v-if="permission.craftRoute_expore" size="small" icon="el-icon-search" type="primary" @click="searchDialogVisible = true">查 询</el-button>
      <el-button
         v-if="permission.craftRoute_add"
        size="small"
        icon="el-icon-plus"
        type="primary"
        @click="to('isCreate')"
      >新增
      </el-button
      >
      <el-button
         v-if="permission.craftRoute_edit"
        size="small"
        icon="el-icon-edit-outline"
        type="primary"
        @click="to('idEdit', selectLine)"
        plain
      >编辑
      </el-button
      >
      <el-button
         v-if="permission.craftRoute_detail"
        size="small"
        icon="el-icon-delete"
        type="danger"
        plain
        @click="handleDelete"
      >删除
      </el-button
      >
    </el-row>
    <div class="content-wrapper ">
      <div class="left border">
        <el-tree
          :data="lineList"
          :props="defaultProps"
          @node-click="handleNodeClick"
        ></el-tree>
      </div>
      <div class="right">
        <div class="flow-wrapper border">
          <div class="canvas" ref="canvas"></div>
        </div>
        <div class="information-wapper border">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="工序信息" name="first">
              <el-form
                ref="form"
                :model="selectLine"
                label-width="80px"
              >
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="工序编码">
                      <span>{{form.processCode}}</span>
                    </el-form-item>
                    <el-form-item label="工序名称">
                      <span>{{form.processName}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="优先级">
                      <span>{{form.level}}</span>
                    </el-form-item>
                    <el-form-item label="工序顺序">
                      <span>{{form.processSeq}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>


              </el-form>
            </el-tab-pane>
            <el-tab-pane label="关联工步" name="second">关联工步</el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>

    <!-- 查询 -->
    <search
      :searchDialogVisible="searchDialogVisible"
      :column="column"
      @on-search="onSearch"
    >
    </search>
  </basic-container>
</template>

<script>
import {
  getLine,
  getLineList,
  deleteRoute
} from "@/api/process/craft-route.js";
import axios from "axios";
import BpmnModeler from "bpmn-js/lib/Modeler";
import uploadUrl from "@/config/uploadConfig";
import {getXml} from "@/api/common";

var activitiExtensionModule = require("activiti-bpmn-moddle/lib");
var activitiModdle = require("activiti-bpmn-moddle/resources/activiti");
import bpmnXml from "@/mock/diagram";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      searchDialogVisible: false,
      form: {
        nodeid: "",
        processCode: "",
        processName: "",
        level: "",
        processSeq: ""
      },
      searchParam: "",
      activeName: "first",
      lineList: [],
      selectLine: {},
      column: [
        {
          label: '工艺名称',
          prop: 'keywords'
        }
      ],
      defaultProps: {
        children: "lineList",
        label: "lineName",
        value: "id"
      }
    };
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  mounted() {
    this._init();
    // console.log(this.$http)
  },
  methods: {
    async _init() {
      const canvas = this.$refs.canvas;
      this.bpmnModeler = new BpmnModeler({
        container: canvas,
        additionalModules: [activitiExtensionModule],
        moddleExtensions: {
          activiti: activitiModdle
        }
      });
      this.createNewDiagram(bpmnXml);
      this.handleList();
    },
    async handleList(data) {
      const lineListRes = await getLineList(data);
      this.lineList = lineListRes.data.data;
    },
    search() {
      this.handleList({keywords: this.searchParam});
    },
    reset() {
      this.searchParam = "";
      this.selectLine = {};
      this._init();
    },
    async createNewDiagram(xml) {
      try {
        const result = await this.bpmnModeler.importXML(xml);
        const {warnings} = result;
        this.addEventBusListener();
        console.log(warnings);
      } catch (err) {
        console.log(err.message, err.warnings);
      }
    },
    onSearch(value) {
      this.handleList(value);
      this.searchDialogVisible = false
    },
    async handleNodeClick(data) {
      this.selectLine = data;
      const res = await getXml(this.selectLine.bpmUrl)
      this.createNewDiagram(res.data);
    },
    handleDelete() {
      if (!this.selectLine["id"]) {
        this.$message.warning("请选择要删除的路线");
        return;
      }
      this.$confirm("确定要删除该角色吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteRoute({ids: [this.selectLine.id]})
            .then(res => {
              if (res.data.success) {
                this.handleList();
                this.$message.success("删除成功");
              }
            })
            .catch(error => {
              console.error(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    to(status, row) {
      if (status === "idEdit" && !this.selectLine["id"]) {
        this.$message.warning("请选择要编辑的对象");
        return;
      }
      this.$router.push({
        path: "/product-development/craft-route/detail",
        query: {
          row,
          status
        }
      });
    },
    getExtensionElement(element, type) {
      if (!element.extensionElements) {
        return;
      }
      return element.extensionElements.values.filter(extensionElement => {
        return extensionElement.$instanceOf(type);
      })[0];
    },
    addEventBusListener() {
      let eventBus = this.bpmnModeler.get("eventBus");
      // 注册节点事件，eventTypes中可以写多个事件
      let eventTypes = ["element.click"];
      eventTypes.forEach(eventType => {
        eventBus.on(eventType, e => {
          let {element} = e;
          if (!element.parent) return;
          if (!e || element.type === "bpmn:Process") {
            return false;
          } else {
            if (eventType === "element.click") {
              let businessObject = element.businessObject || element;
              // 此时的businessObject 是我们想要的万能的小可爱
              this.splitBusiness2Json(businessObject);
            }
          }
        });
      });
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
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .bjs-powered-by {
  visibility: hidden;
}
/deep/ .djs-palette {
  visibility: hidden;
}
.content-wrapper {
  display: flex;

  .border {
    border: 1px solid #dedede;
  }

  .left {
    width: 240px;
    height: 823px;
    margin-right: 15px;
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
    }
  }
}
</style>
