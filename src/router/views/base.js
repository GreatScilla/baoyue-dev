import Layout from "@/page/index/";

export default [
  {
    path: '/base',
    component: Layout,
    children: [
      {
        path: 'encodedManage',
        name: '编码管理',
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/base/encodedManage")
      },
      {
        path: 'encodeDetail',
        name: '编码详情',
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/base/encodeDetail")
      },
      {
        path: 'encodeEdit',
        name: '修改编码',
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/base/encodeEdit")
      },
      {
        path: 'encodeAdd',
        name: '新增编码',
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/base/encodeAdd")
      }
    ]
  }
]