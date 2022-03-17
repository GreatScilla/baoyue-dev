// 仓储
import Layout from "@/page/index/";

export default [
  {
    path: '/storageManage',
    component: Layout,
    redirect: "/storageManage/inboundManage",
    children: [
      {
        path: "inboundManage",
        name: "入库管理",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/storageManage/inboundManage"
          )
      },
      {
        path: "inboundManage/add",
        name: "新增入库管理",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/storageManage/inboundManage/add"
          )
      },
      {
        path: "inboundManage/edit",
        name: "编辑入库管理",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/storageManage/inboundManage/edit"
          )
      },
      {
        path: "inboundManage/detail",
        name: "入库管理详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/storageManage/inboundManage/detail"
          )
      },
      {
        path: "outboundManage",
        name: "出库管理",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/storageManage/outboundManage"
          )
      },
      {
        path: "outboundManage/add",
        name: "新增出库管理",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/storageManage/outboundManage/add"
          )
      },
      {
        path: "outboundManage/edit",
        name: "编辑出库管理",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/storageManage/outboundManage/edit"
          )
      },
      {
        path: "outboundManage/detail",
        name: "出库管理详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/storageManage/outboundManage/detail"
          )
      },
      {
        path: "stockCheck",
        name: "库存查看",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/storageManage/stockCheck"
          )
      },
      {
        path: "stockCheck/detail",
        name: "库存详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/storageManage/stockCheck/detail"
          )
      },
      {
        path: "inventoryCheck",
        name: "库存盘点",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/storageManage/inventoryCheck"
          )
      },
      {
        path: "inventoryCheck/detail",
        name: "库存盘点详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/storageManage/inventoryCheck/detail"
          )
      },
      {
        path: "inventoryCheck/add",
        name: "新增库存盘点",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/storageManage/inventoryCheck/add"
          )
      },
      {
        path: "inventoryCheck/edit",
        name: "编辑库存盘点",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/storageManage/inventoryCheck/edit"
          )
      },
      {
        path: "adjustment",
        name: "库存调整",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/storageManage/adjustment"
          )
      },
      {
        path: "adjustment/add",
        name: "新增库存调整",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/storageManage/adjustment/add"
          )
      },
      {
        path: "adjustment/edit",
        name: "编辑库存调整",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/storageManage/adjustment/edit"
          )
      },
      {
        path: "adjustment/detail",
        name: "库存调整详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/storageManage/adjustment/detail"
          )
      },
      {
        path: "returnGoods",
        name: "退货管理",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/storageManage/returnGoods"
          )
      },
      {
        path: "returnGoods/add",
        name: "新增退货管理",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/storageManage/returnGoods/add"
          )
      },
      {
        path: "returnGoods/edit",
        name: "编辑退货管理",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/storageManage/returnGoods/edit"
          )
      },
      {
        path: "returnGoods/detail",
        name: "退货管理详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/storageManage/returnGoods/detail"
          )
      },
      {
        path: "earlyWarning",
        name: "库存预警",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/storageManage/earlyWarning"
          )
      },
      {
        path: "earlyWarning/detail",
        name: "库存预警详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/storageManage/earlyWarning/detail"
          )
      },
      {
        path: "allocation",
        name: "库存调拨",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/storageManage/allocation"
          )
      },
      {
        path: "allocation/add",
        name: "新增库存调拨",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/storageManage/allocation/add"
          )
      },
      {
        path: "allocation/edit",
        name: "编辑库存调拨",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/storageManage/allocation/edit"
          )
      },
      {
        path: "allocation/detail",
        name: "库存调拨详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/storageManage/allocation/detail"
          )
      },
      //报表
      {
        path: "reportForm/inventoryCheck",
        name: "库存盘点明细",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/storageManage/reportForm/inventoryCheck"
          )
      },
      {
        path: "reportForm/stockCheck",
        name: "出入库明细报表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/storageManage/reportForm/stockCheck"
          )
      },
      {
        path: "reportForm/inventorySummary",
        name: "库存汇总报表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/storageManage/reportForm/inventorySummary"
          )
      },
      {
        path: "reportForm/inbound",
        name: "入库明细",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/storageManage/reportForm/inbound"
          )
      },
      {
        path: "reportForm/outbound",
        name: "出库明细",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/storageManage/reportForm/outbound"
          )
      },
      {
        path: "reportForm/allocation",
        name: "仓库调拨明细",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/storageManage/reportForm/allocation"
          )
      },
      {
        path: "reportForm/adjustment",
        name: "仓库调整明细",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/storageManage/reportForm/adjustment"
          )
      },
    ]
  }
]
