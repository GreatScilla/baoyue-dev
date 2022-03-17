import Layout from "@/page/index/";

export default [
  {
    path: '/customer1',
    component: Layout,
    redirect: "/customer1/customerInformation",
    children: [
      {
        path: 'customerInformation',
        name: '客户信息',
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/customer/customerInformation")
      },
      {
        path: 'customerInformation/addEdit',
        name: '客户信息新增编辑',
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/customer/customerInformation/addEdit")
      },
      {
        path: 'customerInformation/detail',
        name: '客户信息详情',
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/customer/customerInformation/detail")
      },
      {
        path: 'contacts',
        name: '联系人',
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/customer/contacts")
      },
      {
        path: 'contacts/detail',
        name: '联系人详情',
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/customer/contacts/detail")
      },
      {
        path: 'credit',
        name: '信用管理',
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/customer/credit")
      },
      {
        path: 'credit/detail',
        name: '信用管理详情',
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/customer/credit/detail")
      },
      {
        path: 'business',
        name: '商机管理',
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/customer/business")
      },
      {
        path: 'business/detail',
        name: '商机管理详情',
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/customer/business/detail")
      }
      
    ]
  }
]