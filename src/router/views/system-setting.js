// 系统设置

import Layout from "@/page/index/";

export default [
  {
    path: "/system",
    component: Layout,
    children: [
      {
        path: "factory-model",
        name: "工厂模型",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/system/factory-model")
      },
      {
        path: "factory-model/add",
        name: "新增工厂模型",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/system/factory-model/add.vue"
          )
      },
      {
        path: "factory-model/edit",
        name: "编辑工厂模型",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/system/factory-model/edit.vue"
          )
      },
      {
        path: "factory-model/detail",
        name: "工厂模型详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/system/factory-model/detail.vue"
          )
      },
      {
        path: "role",
        name: "角色管理",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/authority/role.vue")
      },
      {
        path: "contactUnit",
        name: "往来单位",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/system/contactUnit")
      },
      {
        path: "warehouseSetup",
        name: "仓库设置",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/system/warehouseSetup"
          )
      },
      {
        path: "definitionOfStorageLocation",
        name: "储位设置",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/system/definitionOfStorageLocation"
          )
      },
      {
        path: "systemLog/operationLog",
        name: "操作日志",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/system/systemLog/operationLog"
          )
      },
      {
        path: "systemLog/abnormalLog",
        name: "错误日志",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/system/systemLog/abnormalLog"
          )
      },
      {
        path: "initSystem",
        name: "系统初始化",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/system/initSystem"
          )
      },
      {
        path: "accountSetting",
        name: "费用科目",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/system/accountSetting"
          )
      },
      {
        path: "shebei",
        name: "设备数据",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/system/basic/shebei"
          )
      },
      {
        path: "beijian",
        name: "备件数据",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/system/basic/beijian"
          )
      },
      {
        path: "tallystandard",
        name: "点检标准",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/system/tallystandard/index"
          )
      },
      {
        path: "Maintenancestandards",
        name: "保养标准",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/system/Maintenancestandards/index"
          )
      },
      {
        path: "equipmentMaterialAl/thermometer",
        name: "温度计",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/system/equipmentMaterialAl/thermometer/index"
          )
      },
      {
        path: "/equipmentMaterialAl/thermometer/add",
        name: "新增温度计",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/system/equipmentMaterialAl/thermometer/add"
          )
      },
      {
        path: "/equipmentMaterialAl/thermometer/edit",
        name: "编辑温度计",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/system/equipmentMaterialAl/thermometer/edit"
          )
      },
      {
        path: "/equipmentMaterialAl/thermometer/detail",
        name: "温度计详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/system/equipmentMaterialAl/thermometer/detail"
          )
      },
      {
        path: "equipmentMaterialAl/motorMonitoring",
        name: "电机监控",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/system/equipmentMaterialAl/motorMonitoring/index"
          )
      },
      {
        path: "/equipmentMaterialAl/motorMonitoring/add",
        name: "新增电机监控",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/system/equipmentMaterialAl/motorMonitoring/add"
          )
      },
      {
        path: "/equipmentMaterialAl/motorMonitoring/edit",
        name: "编辑电机监控",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/system/equipmentMaterialAl/motorMonitoring/edit"
          )
      },
      {
        path: "/equipmentMaterialAl/motorMonitoring/detail",
        name: "电机监控详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/system/equipmentMaterialAl/motorMonitoring/detail"
          )
      },
      {
        path: "equipmentMaterialAl/autoclave",
        name: "余气",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/system/equipmentMaterialAl/autoclave/index"
          )
      },
      {
        path: "/equipmentMaterialAl/autoclave/add",
        name: "新增余气",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/system/equipmentMaterialAl/autoclave/add"
          )
      },
      {
        path: "/equipmentMaterialAl/autoclave/edit",
        name: "编辑余气",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/system/equipmentMaterialAl/autoclave/edit"
          )
      },
      {
        path: "/equipmentMaterialAl/autoclave/detail",
        name: "余气详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/system/equipmentMaterialAl/autoclave/detail"
          )
      },
      {
        path: "equipmentMaterialAl/residualGas",
        name: "余气",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/system/equipmentMaterialAl/residualGas/index"
          )
      },
      {
        path: "/equipmentMaterialAl/residualGas/add",
        name: "新增余气",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/system/equipmentMaterialAl/residualGas/add"
          )
      },
      {
        path: "/equipmentMaterialAl/residualGas/edit",
        name: "编辑余气",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/system/equipmentMaterialAl/residualGas/edit"
          )
      },
      {
        path: "/equipmentMaterialAl/residualGas/detail",
        name: "余气详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/system/equipmentMaterialAl/residualGas/detail"
          )
      },
      {
        path: "equipmentMaterialAl/camera",
        name: "摄像头",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/system/equipmentMaterialAl/camera/index"
          )
      },
      {
        path: "/equipmentMaterialAl/camera/add",
        name: "新增摄像头",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/system/equipmentMaterialAl/camera/add"
          )
      },
      {
        path: "/equipmentMaterialAl/camera/edit",
        name: "编辑摄像头",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/system/equipmentMaterialAl/camera/edit"
          )
      },
      {
        path: "/equipmentMaterialAl/camera/detail",
        name: "摄像头详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/system/equipmentMaterialAl/camera/detail"
          )
      },
      {
        path: "equipmentMaterialAl/gps",
        name: "GPS",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/system/equipmentMaterialAl/gps/index"
          )
      },
      {
        path: "/equipmentMaterialAl/gps/add",
        name: "新增GPS",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/system/equipmentMaterialAl/gps/add"
          )
      },
      {
        path: "/equipmentMaterialAl/gps/edit",
        name: "编辑GPS",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/system/equipmentMaterialAl/gps/edit"
          )
      },
      {
        path: "/equipmentMaterialAl/gps/detail",
        name: "GPS详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/system/equipmentMaterialAl/gps/detail"
          )
      },
      {
        path: "equipmentMaterialAl/gas",
        name: "燃气表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/system/equipmentMaterialAl/gas/index"
          )
      },
      {
        path: "/equipmentMaterialAl/gas/add",
        name: "新增燃气表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/system/equipmentMaterialAl/gas/add"
          )
      },
      {
        path: "/equipmentMaterialAl/gas/edit",
        name: "编辑燃气表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/system/equipmentMaterialAl/gas/edit"
          )
      },
      {
        path: "/equipmentMaterialAl/gas/detail",
        name: "燃气表详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/system/equipmentMaterialAl/gas/detail"
          )
      },
      {
        path: "equipmentMaterialAl/waterMeter",
        name: "水表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/system/equipmentMaterialAl/waterMeter/index"
          )
      },
      {
        path: "/equipmentMaterialAl/waterMeter/add",
        name: "新增水表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/system/equipmentMaterialAl/waterMeter/add"
          )
      },
      {
        path: "/equipmentMaterialAl/waterMeter/edit",
        name: "编辑水表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/system/equipmentMaterialAl/waterMeter/edit"
          )
      },
      {
        path: "/equipmentMaterialAl/waterMeter/detail",
        name: "水表详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/system/equipmentMaterialAl/waterMeter/detail"
          )
      },
    ]
  }
];
