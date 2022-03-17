// 计划排程
import Layout from "@/page/index/";

export default [
  {
    path: '/salesManage',
    component: Layout,
    redirect: "/salesManage/saleType",
    children: [
      {
        path: "saleType",
        name: "销售类型",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/salesManage/saleType"
          )
      },
      {
        path: "saleOrder",
        name: "销售订单",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/salesManage/saleOrder"
          )
      },
      {
        path: "saleOrder/add",
        name: "新增销售订单",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/salesManage/saleOrder/add"
          )
      },
      {
        path: "saleOrder/edit",
        name: "编辑销售订单",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/salesManage/saleOrder/edit"
          )
      },
      {
        path: "saleOrder/detail",
        name: "销售订单详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/salesManage/saleOrder/detail"
          )
      },
      {
        path: "changeSaleOrder",
        name: "销售变更单",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/salesManage/changeSaleOrder"
          )
      },
      {
        path: "changeSaleOrder/add",
        name: "新增销售变更单",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/salesManage/changeSaleOrder/add"
          )
      },
      {
        path: "changeSaleOrder/orderChange",
        name: "新增销售变更单",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/salesManage/changeSaleOrder/orderChange"
          )
      },
      {
        path: "changeSaleOrder/edit",
        name: "编辑销售变更单",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/salesManage/changeSaleOrder/edit"
          )
      },
      {
        path: "changeSaleOrder/detail",
        name: "销售变更单详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/salesManage/changeSaleOrder/detail"
          )
      },
      {
        path: "saleOrder/outbound",
        name: "出库",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/salesManage/saleOrder/outbound"
          )
      },
      {
        path: "saleOutbound",
        name: "销售出库",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/salesManage/saleOutbound"
          )
      },
      {
        path: "saleOutbound",
        name: "销售出库",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/salesManage/saleOutbound"
          )
      },
      {
        path: "saleReturn",
        name: "销售退货",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/salesManage/saleReturn"
          )
      },
      {
        path: "saleReport",
        name: "销售报表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/salesManage/saleReport"
          )
      },
      {
        path: "saleOrder/outbound",
        name: "销售发货出库",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/salesManage/saleOrder/outbound"
          )
      },
      {
        path: "saleOutbound/add",
        name: "新增销售出库",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/salesManage/saleOutbound/add"
          )
      },
      {
        path: "saleOutbound/edit",
        name: "编辑销售出库",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/salesManage/saleOutbound/edit"
          )
      },
      {
        path: "saleOutbound/detail",
        name: "销售出库详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/salesManage/saleOutbound/detail"
          )
      },
      {
        path: "saleReturn/add",
        name: "新增销售退货",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/salesManage/saleReturn/add"
          )
      },
      {
        path: "saleReturn/edit",
        name: "编辑销售退货",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/salesManage/saleReturn/edit"
          )
      },
      {
        path: "saleReturn/detail",
        name: "销售退货详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/salesManage/saleReturn/detail"
          )
      },
      {
        path: "customer",
        name: "客户管理",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/salesManage/customer"
          )
      },
      {
        path: "statement",
        name: "销售对账单",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/salesManage/statement"
          )
      },
      {
        path: "statement/add",
        name: "新增销售对账单",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/salesManage/statement/add"
          )
      },
      {
        path: "statement/edit",
        name: "编辑销售对账单",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/salesManage/statement/edit"
          )
      },
      {
        path: "statement/detail",
        name: "销售对账单详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/salesManage/statement/detail"
          )
      },
      {
        path: "contract",
        name: "合同管理",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/salesManage/contract"
          )
      },
      {
        path: "contract/add",
        name: "新增合同",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/salesManage/contract/add"
          )
      },
      {
        path: "contract/edit",
        name: "编辑合同",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/salesManage/contract/edit"
          )
      },
      {
        path: "contract/detail",
        name: "合同详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/salesManage/contract/detail"
          )
      },
      //报表
      {
        path: "reportForm/order",
        name: "订单明细",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/salesManage/reportForm/order"
          )
      },
      {
        path: "reportForm/customer",
        name: "客户明细",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/salesManage/reportForm/customer"
          )
      },
      {
        path: "reportForm/salesDelivery",
        name: "销售出库明细表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/salesManage/reportForm/salesDelivery"
          )
      },
      {
        path: "reportForm/returnSales",
        name: "销售退货明细表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/salesManage/reportForm/returnSales"
          )
      },
      {
        path: "reportForm/contractDetails",
        name: "合同明细表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/salesManage/reportForm/contractDetails"
          )
      },
      {
        path: "reportForm/salesDaily",
        name: "销售日报表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/salesManage/reportForm/salesDaily"
          )
      },
      {
        path: "reportForm/salesStatement",
        name: "销售对账明细表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/salesManage/reportForm/salesStatement"
          )
      },
      {
        path: "reportForm/salesUnreconciledSchedule",
        name: "销售未对账明细表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/salesManage/reportForm/salesUnreconciledSchedule"
          )
      },
      {
        path: "reportForm/unreconciledPurchasesList",
        name: "采购未对账明细表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/salesManage/reportForm/unreconciledPurchasesList"
          )
      },
    ]
  }
]