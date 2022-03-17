import Layout from "@/page/index/";

export default [
  {
    path: '/flow2',
    component: Layout,
    children: [
      {
        path: 'flowConfig',
        name: '流程配置',
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/flow2/flowConfig")
      },
      {
        path: 'condition_branch',
        name: '条件分支',
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/flow2/conditionBranch")
      },
      {
        path: 'flowConfigSetting',
        name: '设置审批节点',
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/flow2/flowConfigSetting")
      },
      {
        path: 'auditorManage',
        name: '审批人管理',
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/flow2/auditorManage")
      },
      {
        path: 'todoList',
        name: '待办事务',
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/flow2/todoList/index")
      },
      {
        path: 'todoList/edit',
        name: '处理待办事务',
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/flow2/todoList/edit.vue")
      },
      {
        path: 'todoList/detail',
        name: '待办事务详情',
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/flow2/todoList/detail.vue")
      },
      {
        path: 'doneList',
        name: '办结事务',
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/flow2/doneList")
      },
      {
        path: 'doneList/detail',
        name: '办结事务详情',
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/flow2/doneListDetail")
      },
      {
        path: 'CcTransaction',
        name: '抄送事务',
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/flow2/CcTransaction")
      },
      {
        path: 'CcTransaction/edit',
        name: '处理抄送事务',
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/flow2/CcTransaction/edit")
      },
      {
        path: 'CcTransaction/detail',
        name: '抄送事务详情',
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/flow2/CcTransaction/detail")
      },
    
    ]
  }
]