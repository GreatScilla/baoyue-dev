// 工艺管理

import Layout from "@/page/index/";
export default [
  {
    path: "/process",
    component: Layout,
    redirect: "/process/process-manage2",
    children: [
      {
        path: "process-manage2",
        name: "工序管理（代码生成）",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/process/code-generate/process.vue"
          )
      },

     
      {
        path: "material-data",
        name: "物料数据",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/process/material-data"
          )
      },
      {
        path: "material-data/detail",
        name: "物料数据",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/process/material-data/detail.vue"
          )
      }
    ]
  }
];
