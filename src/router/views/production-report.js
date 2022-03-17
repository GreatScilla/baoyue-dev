//生产报表
import Layout from "@/page/index/";

export default [
  {
    path: "/productionReport",
    component: Layout,
    redirect: "/productionReport/preProductionPlan",
    children: [
      // {
      //   path: "progress",
      //   name: "实时进度",
      //   component: () =>
      //     import(/* webpackChunkName: "views" */ "@/views/planning/progress")
      // }
        {
        path: "preProductionPlan",
        name: "预生产计划表",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/production-report/preProductionPlan")
      }
    ]
  }
];
