// 质量管理
import Layout from "@/page/index/";

export default [
  {
    path: "/quality",
    component: Layout,
    redirect: "/quality/plan",
    children: [
      {
        path: "plan",
        name: "质检计划",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/quality/plan"
          )
      },
      {
        path: "plan/add",
        name: "新增质检计划",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/quality/plan/add"
          )
      },
      {
        path: "plan/edit",
        name: "修改质检计划",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/quality/plan/edit"
          )
      },
      {
        path: "plan/detail",
        name: "质检计划详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/quality/plan/detail"
          )
      },
      {
        path: "task",
        name: "质检任务",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/quality/task"
          )
      },
      {
        path: "task/add",
        name: "新增质检任务",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/quality/task/add"
          )
      },
      {
        path: "task/edit",
        name: "修改质检任务",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/quality/task/edit"
          )
      },
      {
        path: "task/detail",
        name: "质检任务详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/quality/task/detail"
          )
      },
      {
        path: "work-order",
        name: "质检工单",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/quality/work-order"
          )
      },
      {
        path: "work-order/add",
        name: "新增质检工单",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/quality/work-order/add"
          )
      },
      {
        path: "work-order/edit",
        name: "修改质检工单",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/quality/work-order/edit"
          )
      },
      {
        path: "work-order/detail",
        name: "质检工单详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/quality/work-order/detail"
          )
      },
      {
        path: "report",
        name: "质检报工",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/quality/report"
          )
      },
      {
        path: "report/edit",
        name: "修改质检报工",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/quality/report/edit"
          )
      },
      {
        path: "report/detail",
        name: "质检报工详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/quality/report/detail"
          )
      },
      {
        path: "check-project",
        name: "检验项目维护",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/quality/check-project"
          )
      },
      {
        path: "check-project/add",
        name: "新增检验项目维护",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/quality/check-project/add"
          )
      },
      {
        path: "check-project/edit",
        name: "修改检验项目维护",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/quality/check-project/edit"
          )
      },
      {
        path: "check-project/detail",
        name: "检验项目维护详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/quality/check-project/detail"
          )
      },
      {
        path: "test-category",
        name: "化验产品维护",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/quality/test-category")
      },
      {
        path: "test-category/add",
        name: "新增化验产品维护",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/quality/test-category/add")
      },
      {
        path: "test-category/edit",
        name: "修改化验产品维护",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/quality/test-category/edit")
      },
      {
        path: "test-category/detail",
        name: "化验产品维护详情",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/quality/test-category/detail")
      },
      {
        path: "off-grade",
        name: "不合格特征维护",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/quality/off-grade")
      },
      {
        path: "off-grade/add",
        name: "新增不合格特征维护",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/quality/off-grade/add")
      },
      {
        path: "off-grade/edit",
        name: "修改不合格特征维护",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/quality/off-grade/edit")
      },
      {
        path: "off-grade/detail",
        name: "不合格特征维护详情",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/quality/off-grade/detail")
      },
      {
        path: "laboratory",
        name: "化验室管理",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/quality/laboratory")
      },
      {
        path: "laboratory/add",
        name: "新增化验室管理",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/quality/laboratory/add")
      },
      {
        path: "laboratory/edit",
        name: "修改化验室管理",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/quality/laboratory/edit")
      },
      {
        path: "laboratory/detail",
        name: "化验室管理详情",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/quality/laboratory/detail")
      }
    ]
  }
];
