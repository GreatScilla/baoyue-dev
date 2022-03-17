// 设备管理
import Layout from "@/page/index/";

export default [
  {
    path: "/shebei",
    component: Layout,
    redirect: "/shebei/account",
    children: [
      {
        path: "account",
        name: "设备台帐",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/shebei/account"
          )
      },
      {
        path: "iInternetOfthings",
        name: "设备物联",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/shebei/iInternetOfthings"
          )
      },
      {
        path: "thermometer",
        name: "温度计",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/shebei/iInternetOfthings/thermometer"
          )
      },
      {
        path: "camera",
        name: "摄像头",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/shebei/iInternetOfthings/camera"
          )
      },
      {
        path: "bigpage",
        name: "设备大屏",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/shebei/bigpage"
          )
      },

      {
        path: "InventoryManagement",
        name: "库存管理",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/shebei/InventoryManagement"
          )
      },
      {
        path: "check",
        name: "设备点检",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/shebei/check"
          )
      },

      {
        path: "statement",
        name: "设备采购",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/shebei/procurement/statement"
          )
      },
      {
        path: "purchaserequest",
        name: "请购单",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/shebei/procurement/purchaserequest"
          )
      },
      {
        path: "orderform",
        name: "设备采购订单",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/shebei/procurement/orderform"
          )
      },
      {
        path: "salesreturn",
        name: "设备采购退货",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/shebei/procurement/salesreturn"
          )
      },
      {
        path: "management",
        name: "设备合同管理",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/shebei/procurement/management"
          )
      },
      {
        path: "nuclearpricing",
        name: "核价单",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/shebei/procurement/nuclearpricing"
          )
      },
      {
        path: "commercial",
        name: "发票管理",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/shebei/procurement/commercial"
          )
      },

      {
        path: "depreciation",
        name: "设备折旧",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/shebei/depreciation"
          )
      },

      {
        path: "EquipmentFiles",
        name: "设备档案",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/shebei/EquipmentFiles"
          )
      },

      {
        path: "maintenance",
        name: "设备点检与保养",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/shebei/maintenance"
          )
      },

      {
        path: "EquipmentFix",
        name: "设备维修",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/shebei/EquipmentFix"
          ),
        children: [

        ]
      },
      {
        path: "allocation",
        name: "设备调拨",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/shebei/allocation"
          )
      },

      {
        path: "inventory",
        name: "设备盘点",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/shebei/inventory"
          )
      },
      {
        path: "baoxiu",
        // redirect: "/shebei/EquipmentFix/baoxiu",
        name: "设备报修",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/shebei/EquipmentFix/baoxiu"
          )
      }, {
        path: "plan",
        // redirect: "/shebei/EquipmentFix/baoxiu",
        name: "测试",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/shebei/plan"
          )
      }, {
        path: "checkPlan",
        name: "点检计划",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/shebei/plan/checkPlan"
          )
      }, {
        path: "checkOrder",
        name: "点检工单",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/shebei/plan/checkOrder"
          )
      },
      {
        path: "gongdan",
        name: "维修工单",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/shebei/EquipmentFix/gongdan"
          )
      },
      {
        path: "sbrepertory",
        name: "设备库存",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/shebei/InventoryManagement/sbrepertory"
          )
      },
      {
        path: "bjrepertory",
        name: "备件库存",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/shebei/InventoryManagement/bjrepertory"
          )
      },
      {
        path: "gostorage",
        name: "设备入库管理",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/shebei/InventoryManagement/gostorage"
          )
      },
      {
        path: "outstorage",
        name: "设备出库管理",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/shebei/InventoryManagement/outstorage"
          )
      },
      {
        path: "Thedrawing",
        name: "设备库存调拔",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/shebei/InventoryManagement/Thedrawing"
          )
      },
      {
        path: "takestock",
        name: "设备库存盘点",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/shebei/InventoryManagement/takestock"
          )
      },
      {
        path: "modulation",
        name: "设备库存调整",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/shebei/InventoryManagement/modulation"
          )
      },
      {
        path: "dianjian",
        name: "设备点检",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/shebei/maintenance/dianjian"
          )
      }, {
        path: "maintain",
        name: "设备保养",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/shebei/maintain"
          )
      }, {
        path: "maintainPlan",
        name: "保养计划",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/shebei/maintain/maintainPlan"
          )
      }, {
        path: "maintainOrder",
        name: "保养工单",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/shebei/maintain/maintainOrder"
          )
      },
      {
        path: "collect",
        name: "配件领用",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/shebei/transfer/Collect"
          )
      },
      {
        path: "revert",
        name: "备件归还",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/shebei/transfer/revert"
          )
      },
      {
        path: "dispose",
        name: "设备处置",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/shebei/transfer/dispose"
          )
      },
      {
        path: "reportForm/pouring",
        name: "浇注报表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/shebei/reportForm/pouring"
          )
      },
      {
        path: "reportForm/stillKettle",
        name: "蒸压釜报表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/shebei/reportForm/stillKettle"
          )
      },
      {
        path: "reportForm/gas",
        name: "燃气报表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/shebei/reportForm/gas"
          )
      },
      {
        path: "reportForm/monitoring",
        name: "电机监控报表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/shebei/reportForm/monitoring"
          )
      },
      {
        path: "reportForm/hygrograph",
        name: "温湿度计报表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/shebei/reportForm/hygrograph"
          )
      },
      {
        path: "reportForm/waterMeterRecords",
        name: "水表记录",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/shebei/reportForm/waterMeterRecords"
          )
      },
      {
        path: "reportForm/electricMeterRecords",
        name: "电表记录",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/shebei/reportForm/electricMeterRecords"
          )
      },



    ]
  }
];
