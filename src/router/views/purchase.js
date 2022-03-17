// 采购
import Layout from "@/page/index/";

export default [
  {
    path: '/purchaseManage',
    component: Layout,
    redirect: "/purchaseManage/purchaseType",
    children: [
      {
        path: "purchaseType",
        name: "采购类型",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/purchaseManage/purchaseType"
          )
      },
      {
        path: "purchaseInvoice",
        name: "开票管理",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/purchaseManage/purchaseInvoice"
          )
      },
      {
        path: "purchaseInvoice/invoiceList",
        name: "已开票列表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/purchaseManage/purchaseInvoice/invoiceList"
          )
      },
      {
        path: "purchaseOrder",
        name: "采购订单",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/purchaseManage/purchaseOrder"
          )
      },
      {
        path: "purchaseOrder/add",
        name: "新增采购订单",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/purchaseManage/purchaseOrder/add"
          )
      },
      {
        path: "purchaseOrder/edit",
        name: "编辑采购订单",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/purchaseManage/purchaseOrder/edit"
          )
      },
      {
        path: "purchaseOrder/detail",
        name: "采购订单详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/purchaseManage/purchaseOrder/detail"
          )
      },
      {
        path: "purchaseInbound",
        name: "采购进货",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/purchaseManage/purchaseInbound"
          )
      },
      {
        path: "purchaseInbound/add",
        name: "新增采购进货",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/purchaseManage/purchaseInbound/add"
          )
      },
      {
        path: "purchaseInbound/edit",
        name: "编辑采购进货",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/purchaseManage/purchaseInbound/edit"
          )
      },
      {
        path: "purchaseInbound/check",
        name: "采购进货检验",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/purchaseManage/purchaseInbound/check"
          )
      },
      {
        path: "purchaseInbound/detail",
        name: "采购进货详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/purchaseManage/purchaseInbound/detail"
          )
      },
      {
        path: "purchaseReturn",
        name: "采购退货",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/purchaseManage/purchaseReturn"
          )
      },
      {
        path: "purchaseReturn/add",
        name: "新增采购退货",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/purchaseManage/purchaseReturn/add"
          )
      },
      {
        path: "purchaseReturn/edit",
        name: "编辑采购退货",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/purchaseManage/purchaseReturn/edit"
          )
      },
      {
        path: "purchaseReturn/detail",
        name: "采购退货详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/purchaseManage/purchaseReturn/detail"
          )
      },
      {
        path: "feedstockCheck",
        name: "进料检验",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/purchaseManage/feedstockCheck"
          )
      },
      {
        path: "feedstockCheck/check",
        name: "检验",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/purchaseManage/feedstockCheck/check"
          )
      },
      {
        path: "feedstockCheck/checkDetail",
        name: "检验详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/purchaseManage/feedstockCheck/checkDetail"
          )
      },
      {
        path: "supplier",
        name: "供应商管理",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/purchaseManage/supplier"
          )
      },
      {
        path: "pricing",
        name: "核价管理",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/purchaseManage/pricing"
          )
      },
      {
        path: "pricing/add",
        name: "新增核价管理",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/purchaseManage/pricing/add"
          )
      },
      {
        path: "pricing/edit",
        name: "编辑核价管理",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/purchaseManage/pricing/edit"
          )
      },
      {
        path: "pricing/detail",
        name: "核价管理详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/purchaseManage/pricing/detail"
          )
      },
      {
        path: "statement",
        name: "采购对账单",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/purchaseManage/statement"
          )
      },
      {
        path: "statement/add",
        name: "新增对账单",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/purchaseManage/statement/add"
          )
      },
      {
        path: "statement/edit",
        name: "编辑对账单",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/purchaseManage/statement/edit"
          )
      },
      {
        path: "statement/detail",
        name: "对账单详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/purchaseManage/statement/detail"
          )
      },
      //报表
      {
        path: "reportForm/supplier",
        name: "供应商明细报表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/purchaseManage/reportForm/supplier"
          )
      },
      {
        path: "reportForm/purchase",
        name: "采购明细报表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/purchaseManage/reportForm/purchase"
          )
      },
      {
        path: "reportForm/purchaseInbound",
        name: "采购进货明细报表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/purchaseManage/reportForm/purchaseInbound"
          )
      },
      {
        path: "reportForm/feedstockCheck",
        name: "进料检验明细报表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/purchaseManage/reportForm/feedstockCheck"
          )
      },
      {
        path: "reportForm/purchaseReturn",
        name: "采购退货明细报表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/purchaseManage/reportForm/purchaseReturn"
          )
      },
      {
        path: "reportForm/pricing",
        name: "采购核价明细表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/purchaseManage/reportForm/pricing"
          )
      },
      {
        path: "reportForm/statement",
        name: "采购对账明细表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/purchaseManage/reportForm/statement"
          )
      },

    ]
  }
]