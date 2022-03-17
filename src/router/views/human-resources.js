// 人力资源

import Layout from "@/page/index/";
export default [
  {
    path: "/human-resources",
    component: Layout,
    redirect: "/human-resources/department",
    children: [
      {
        path: "department",
        name: "组织架构",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/human-resources/department"
          )
      },
      {
        path: "department/add",
        name: "新增组织架构",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/human-resources/department/add.vue"
          )
      },
      {
        path: "department/edit",
        name: "编辑组织架构",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/human-resources/department/edit.vue"
          )
      },
      {
        path: "department/detail",
        name: "组织架构详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/human-resources/department/detail.vue"
          )
      },
      {
        path: "roles",
        name: "角色管理",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/human-resources/roles"
          )
      },
      {
        path: "roles/detail",
        name: "角色管理",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/human-resources/roles/rolesDetail.vue"
          )
      },
      {
        path: "personnel",
        name: "人员管理",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/human-resources/personnel"
          )
      },
      {
        path: "personnel/detail",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/human-resources/personnel/personDetail.vue"
          )
      },
      {
        path: "user",
        name: "用户管理",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/human-resources/user"
          )
      },
      {
        path: "user/add",
        name: "新增用户管理",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/human-resources/user/add.vue"
          )
      },
      {
        path: "user/edit",
        name: "编辑用户管理",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/human-resources/user/edit.vue"
          )
      },
      {
        path: "shift",
        name: "排班管理",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/human-resources/shift"
          )
      },
      {
        path: "shift/add",
        name: "新增排班管理",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/human-resources/shift/add.vue"
          )
      },
      {
        path: "shift/edit",
        name: "编辑排班管理",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/human-resources/shift/edit.vue"
          )
      },
      {
        path: "shift/detail",
        name: "排班管理详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/human-resources/shift/detail.vue"
          )
      },
      {
        path: "employeeShift",
        name: "员工班次",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/human-resources/employeeShift"
          )
      },
      {
        path: "employeeShift/add",
        name: "新增员工班次",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/human-resources/employeeShift/add.vue"
          )
      },
      {
        path: "employeeShift/edit",
        name: "编辑员工班次",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/human-resources/employeeShift/edit.vue"
          )
      },
      {
        path: "employeeShift/detail",
        name: "员工班次详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/human-resources/employeeShift/detail.vue"
          )
      },
      {
        path: "employeeShift/batchCorrelation",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/human-resources/employeeShift/batchCorrelation.vue"
          )
      },
      {
        path: "StatisticalReports",
        name: "统计报表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/human-resources/StatisticalReports"
          )
      },
      {
        path: "employeeFile",
        name: "人员管理",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/human-resources/employeeFile"
          )
      },
      {
        path: "employeeFile/add",
        name: "新增人员管理",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/human-resources/employeeFile/add"
          )
      },
      {
        path: "employeeFile/edit",
        name: "编辑人员管理",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/human-resources/employeeFile/edit"
          )
      },
      {
        path: "employeeFile/detail",
        name: "人员管理详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/human-resources/employeeFile/detail"
          )
      },
      {
        path: "settlementMethod",
        name: "结算方式",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/human-resources/settlementMethod"
          )
      },
      {
        path: "insurance",
        name: "保险管理",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/human-resources/insurance"
          )
      },
      {
        path: "injury",
        name: "工伤管理",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/human-resources/injury"
          )
      },
      {
        path: "salary",
        name: "薪资管理",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/human-resources/salary"
          )
      },
      {
        path: "labor-contract",
        name: "劳动合同管理",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/human-resources/labor-contract"
          )
      },
      {
        path: "OriginalRecordSheet",
        name: "考勤记录表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/human-resources/StatisticalReports/OriginalRecordSheet"
          )
      },
      {
        path: "AccessControlRecordSheet",
        name: "门禁记录表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/human-resources/StatisticalReports/AccessControlRecordSheet"
          )
      },
      {
        path: "reportForm/personnel",
        name: "人员明细表",
        component: () =>
          import(
              /* webpackChunkName: "views" */ "@/views/human-resources/reportForm/personnel"
          )
      }
    ]
  }
];
