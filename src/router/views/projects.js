// 项目管理
import Layout from "@/page/index/";
export default [
  {
    path: "/projects",
    component: Layout,
    redirect: "/projects/projectCategory",
    children: [
      {
        path: "projectCategory",
        name: "项目类别",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/projects/projectCategory"
          )
      },
      {
        path: "projectOverview",
        name: "项目概览",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/projects/projectOverview"
          )
      },
      {
        path: "projectOverview/add",
        name: "新增项目概览",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/projects/projectOverview/add"
          )
      },
      {
        path: "projectOverview/edit",
        name: "编辑项目概览",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/projects/projectOverview/edit"
          )
      },
      {
        path: "projectOverview/detail",
        name: "项目概览详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/projects/projectOverview/detail"
          )
      },
      {
        path: "targetManage",
        name: "目标管理",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/projects/targetManage"
          )
      },
      {
        path: "taskManage",
        name: "任务管理",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/projects/taskManage"
          )
      },
      {
        path: "designScheme",
        name: "设计方案",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/projects/designScheme"
          )
      },
      {
        path: "costManage",
        name: "费用管理",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/projects/costManage"
          )
      },
      {
        path: "members",
        name: "项目人员",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/projects/members"
          )
      },
      {
        path: "projectProgress",
        name: "项目进度",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/projects/projectProgress"
          )
      },
      {
        path: "boardProgress",
        name: "板材进度",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/projects/boardProgress"
          )
      },
      {
        path: "shutdownLoss",
        name: "停工损失进度表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/projects/shutdownLoss"
          )
      },
      {
        path: "complaint",
        name: "投诉管理",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/projects/complaint"
          )
      },
      //报表
      {
        path: "reportForm/project",
        name: "项目明细表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/projects/reportForm/project"
          )
      },
      {
        path: "reportForm/palletInOut",
        name: "项目托盘出入库统计表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/projects/reportForm/palletInOut"
          )
      }
    ]
  }
];