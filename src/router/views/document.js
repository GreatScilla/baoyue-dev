// 文档管理

import Layout from "@/page/index/";

export default [
  {
    path: "/document",
    component: Layout,
    redirect: "/document/manage",
    children: [
      {
        path: "manage",
        name: "文档管理",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/document/manage")
      },
      {
        path: "manage/sublist",
        name: "文档子管理",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/document/manage/sublist")
      },
      {
        path: "recycle",
        name: "回收站",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/document/recycle")
      },
    ]
  }
];
