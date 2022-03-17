// 财务管理
import Layout from "@/page/index/";

export default [
  {
    path: "/financial",
    component: Layout,
    redirect: "/financial/incomeStatement",
    children: [
      {
        path: "incomeStatement",
        name: "收入管理",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/financial/incomeStatement")
      },
      {
        path: "incomeStatement/add",
        name: "新增收入管理",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/financial/incomeStatement/add")
      },
      {
        path: "incomeStatement/edit",
        name: "修改收入管理",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/financial/incomeStatement/edit")
      },
      {
        path: "incomeStatement/detail",
        name: "收入管理详情",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/financial/incomeStatement/detail")
      },
      {
        path: "expenseList",
        name: "支出管理",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/financial/expenseList")
      },
      {
        path: "expenseList/add",
        name: "新增支出管理",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/financial/expenseList/add")
      },
      {
        path: "expenseList/edit",
        name: "修改支出管理",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/financial/expenseList/edit")
      },
      {
        path: "expenseList/detail",
        name: "支出管理详情",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/financial/expenseList/detail")
      },
      {
        path: "otherReceivables",
        name: "其他应收",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/financial/otherReceivables")
      },
      {
        path: "otherReceivables/add",
        name: "新增其他应收",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/financial/otherReceivables/add")
      },
      {
        path: "otherReceivables/edit",
        name: "修改其他应收",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/financial/otherReceivables/edit")
      },
      {
        path: "otherReceivables/detail",
        name: "其他应收详情",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/financial/otherReceivables/detail")
      },
      {
        path: "otherPayable",
        name: "其他应付",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/financial/otherPayable")
      },
      {
        path: "otherPayable/add",
        name: "新增其他应付",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/financial/otherPayable/add")
      },
      {
        path: "otherPayable/edit",
        name: "修改其他应付",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/financial/otherPayable/edit")
      },
      {
        path: "otherPayable/detail",
        name: "其他应付详情",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/financial/otherPayable/detail")
      },
      {
        path: "costItems",
        name: "费用项目",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/financial/costItems")
      },
      {
        path: "costItems/add",
        name: "新增费用项目",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/financial/costItems/add")
      },
      {
        path: "costItems/edit",
        name: "修改费用项目",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/financial/costItems/edit")
      },
      {
        path: "costItems/detail",
        name: "费用项目详情",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/financial/costItems/detail")
      },
      {
        path: "settleAccount",
        name: "结算账户",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/financial/settleAccount")
      },
      //报表
      {
        path: "reportForm/income",
        name: "收入明细表",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/financial/reportForm/income")
      },
      {
        path: "reportForm/expenditure",
        name: "支出明细表",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/financial/reportForm/expenditure")
      }
    ]
  }
];
