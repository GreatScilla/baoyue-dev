// 生产管理
import Layout from "@/page/index/";

export default [
  {
    path: "/production-management",
    component: Layout,
    redirect: "/production-management/pre-production-plan",
    children: [
      {
        path: "pre-production-plan",
        name: "预生产计划",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/pre-production-plan"
          )
      },
      {
        path: "pre-production-plan/add",
        name: "新增预生产计划",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/pre-production-plan/add.vue"
          )
      },
      {
        path: "pre-production-plan/edit",
        name: "编辑预生产计划",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/pre-production-plan/edit.vue"
          )
      },
      {
        path: "pre-production-plan/detail",
        name: "预生产计划详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/pre-production-plan/detail.vue"
          )
      },
      {
        path: "materiel-demand-analysis",
        name: "物料需求分析",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/materiel-demand-analysis"
          )
      },
      {
        path: "reporting-manage",
        name: "报工管理",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/reporting-manage"
          )
      },
      {
        path: "assessment-indicators",
        name: "考核指标",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/assessment-indicators"
          )
      },
      {
        path: "assessment-indicators/add",
        name: "新增考核指标",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/assessment-indicators/add.vue"
          )
      },
      {
        path: "assessment-indicators/detail",
        name: "考核指标详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/assessment-indicators/detail.vue"
          )
      },
      {
        path: "assessment-indicators/edit",
        name: "编辑考核指标",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/assessment-indicators/edit.vue"
          )
      },
      {
        path: "purchase-plan",
        name: "采购计划",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/purchase-plan"
          )
      },
      {
        path: "purchase-plan/edit",
        name: "编辑采购计划",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/purchase-plan/edit.vue"
          )
      },
      {
        path: "purchase-plan/detail",
        name: "采购计划详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/purchase-plan/detail.vue"
          )
      },
      {
        path: "produce-plan",
        name: "生产计划",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/produce-plan"
          )
      },
      {
        path: "produce-plan/edit",
        name: "编辑生产计划",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/produce-plan/edit.vue"
          )
      },
      {
        path: "produce-plan/detail",
        name: "生产计划详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/produce-plan/detail.vue"
          )
      },
      {
        path: "work-order",
        name: "工单管理",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/production-management/work-order")
      },
      {
        path: "work-order/add",
        name: "新增工单",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/production-management/work-order/add")
      },
      {
        path: "work-order/edit",
        name: "编辑工单",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/production-management/work-order/edit")
      },
      {
        path: "work-order/detail",
        name: "工单详情",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/production-management/work-order/detail")
      },
      {
        path: "work-order/distribution",
        name: "工单分配",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/production-management/work-order/distribution")
      },
      {
        path: "schedule",
        name: "排程管理",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/production-management/schedule")
      },
      {
        path: "schedule/assign",
        name: "排程指派",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/production-management/schedule/assign")
      },
      {
        path: "schedule/edit",
        name: "编辑排程",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/production-management/schedule/edit")
      },
      {
        path: "schedule/detail",
        name: "排程详情",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/production-management/schedule/detail")
      },
      {
        path: "pulpingPost",
        name: "制浆岗位操作记录",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/pulpingPost/index.vue"
          )
      },
      {
        path: "pulpingPost/add",
        name: "增加制浆岗位操作记录",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/pulpingPost/add.vue"
          )
      },
      {
        path: "pulpingPost/edit",
        name: "修改制浆岗位操作记录",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/pulpingPost/edit.vue"
          )
      },
      {
        path: "pulpingPost/detail",
        name: "制浆岗位操作记录详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/pulpingPost/detail.vue"
          )
      },
      {
        path: "pouringPost",
        name: "浇注中控岗位记录表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/pouringPost/index.vue"
          )
      },
      {
        path: "pouringPost/add",
        name: "增加浇注中控岗位记录表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/pouringPost/add.vue"
          )
      },
      {
        path: "pouringPost/edit",
        name: "修改浇注中控岗位记录表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/pouringPost/edit.vue"
          )
      },
      {
        path: "pouringPost/detail",
        name: "浇注中控岗位记录表详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/pouringPost/detail.vue"
          )
      },
      {
        path: "shuttleBusPosition",
        name: "静停摆渡车岗位记录表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/shuttleBusPosition/index.vue"
          )
      },
      {
        path: "shuttleBusPosition/add",
        name: "增加静停摆渡车岗位记录表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/shuttleBusPosition/add.vue"
          )
      },
      {
        path: "shuttleBusPosition/edit",
        name: "修改静停摆渡车岗位记录表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/shuttleBusPosition/edit.vue"
          )
      },
      {
        path: "shuttleBusPosition/detail",
        name: "静停摆渡车岗位记录表详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/shuttleBusPosition/detail.vue"
          )
      },
      {
        path: "cuttingPost",
        name: "切割岗位记录表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/cuttingPost/index.vue"
          )
      },
      {
        path: "cuttingPost/add",
        name: "增加切割岗位记录表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/cuttingPost/add.vue"
          )
      },
      {
        path: "cuttingPost/edit",
        name: "修改切割岗位记录表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/cuttingPost/edit.vue"
          )
      },
      {
        path: "cuttingPost/detail",
        name: "切割岗位记录表详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/cuttingPost/detail.vue"
          )
      },

      {
        path: "pipePosition",
        name: "蒸养配气岗位操作记录表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/pipePosition/index.vue"
          )
      },
      {
        path: "pipePosition/add",
        name: "增加蒸养配气岗位操作记录表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/pipePosition/add.vue"
          )
      },
      {
        path: "pipePosition/edit",
        name: "修改蒸养配气岗位操作记录表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/pipePosition/edit.vue"
          )
      },
      {
        path: "pipePosition/detail",
        name: "蒸养配气岗位操作记录表详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/pipePosition/detail.vue"
          )
      },
      //报表
      {
        path: "reportForm/preProduce",
        name: "预生产计划表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/reportForm/preProduce.vue"
          )
      },
      {
        path: "reportForm/produce",
        name: "生产计划表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/reportForm/produce.vue"
          )
      },
      {
        path: "reportForm/workReport",
        name: "报工明细表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/reportForm/workReport.vue"
          )
      },
      {
        path: "reportForm/farmAbnormal",
        name: "车间生产异常统计表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/reportForm/farmAbnormal.vue"
          )
      },
      {
        path: "scheduleSingle",
        name: "生产排程",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/scheduleSingle/index.vue"
          )
      },
      {
        path: "scheduleSingle/edit",
        name: "编辑生产排程",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/scheduleSingle/edit.vue"
          )
      },
      {
        path: "scheduleSingle/detail",
        name: "生产排程详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/scheduleSingle/detail.vue"
          )
      },
      {
        path: "scheduleSingle/distribution",
        name: "生产排程分配",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/scheduleSingle/distribution.vue"
          )
      },
      {
        path: "teamSingle",
        name: "班组工单",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/teamSingle/index.vue"
          )
      },
      {
        path: "teamSingle/edit",
        name: "编辑班组工单",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/teamSingle/edit.vue"
          )
      },
      {
        path: "teamSingle/detail",
        name: "班组工单详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/teamSingle/detail.vue"
          )
      },
      {
        path: "pourSingle",
        name: "浇注工单",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/pourSingle/index.vue"
          )
      },
      {
        path: "pourSingle/detail",
        name: "浇注工单详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/pourSingle/detail.vue"
          )
      },
      {
        path: "cuttingWorkOrder",
        name: "切割工单",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/cuttingWorkOrder/index.vue"
          )
      },
      {
        path: "cuttingWorkOrder/detail",
        name: "切割工单详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/cuttingWorkOrder/detail.vue"
          )
      },
      {
        path: "IntoKettleWorkOrder",
        name: "入釜工单",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/IntoKettleWorkOrder/index.vue"
          )
      },
      {
        path: "IntoKettleWorkOrder/detail",
        name: "入釜工单详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/IntoKettleWorkOrder/detail.vue"
          )
      },
      {
        path: "outKettleWorkOrder",
        name: "出釜工单",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/outKettleWorkOrder/index.vue"
          )
      },
      {
        path: "outKettleWorkOrder/detail",
        name: "出釜工单详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/outKettleWorkOrder/detail.vue"
          )
      },
      {
        path: "qualityControlWorkOrder",
        name: "出釜质检",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/qualityControlWorkOrder/index.vue"
          )
      },
      {
        path: "qualityControlWorkOrder/detail",
        name: "出釜质检详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/qualityControlWorkOrder/detail.vue"
          )
      },
      {
        path: "producePlan",
        name: "生产计划",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/producePlan/index.vue"
          )
      },
      {
        path: "producePlan/add",
        name: "新增生产计划",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/producePlan/add.vue"
          )
      },
      {
        path: "producePlan/edit",
        name: "编辑生产计划",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/producePlan/edit.vue"
          )
      },
      {
        path: "producePlan/detail",
        name: "生产计划详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/producePlan/detail.vue"
          )
      },
      {
        path: "downgradeHandlingOrder",
        name: "降级处理单",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/downgradeHandlingOrder"
          )
      },
      {
        path: "downgradeHandlingOrder/edit",
        name: "编辑降级处理单",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/downgradeHandlingOrder/edit.vue"
          )
      },
      {
        path: "downgradeHandlingOrder/detail",
        name: "降级处理单详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/downgradeHandlingOrder/detail.vue"
          )
      },
      {
        path: "meshPlanOrder",
        name: "网片计划单",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/meshPlanOrder"
          )
      },
      {
        path: "meshPlanOrder/add",
        name: "新增网片计划单",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/meshPlanOrder/add.vue"
          )
      },
      {
        path: "meshPlanOrder/edit",
        name: "编辑网片计划单",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/meshPlanOrder/edit.vue"
          )
      },
      {
        path: "meshPlanOrder/detail",
        name: "网片计划单详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/meshPlanOrder/detail.vue"
          )
      },
      {
        path: "meshWorkOrder",
        name: "网片工单",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/meshWorkOrder"
          )
      },
      {
        path: "meshWorkOrder/detail",
        name: "网片工单详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/meshWorkOrder/detail.vue"
          )
      },
      {
        path: "cutMendPlanOrder",
        name: "切补计划单",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/cutMendPlanOrder"
          )
      },
      {
        path: "cutMendPlanOrder/add",
        name: "新增切补计划单",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/cutMendPlanOrder/add.vue"
          )
      },
      {
        path: "cutMendPlanOrder/edit",
        name: "编辑切补计划单",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/cutMendPlanOrder/edit.vue"
          )
      },
      {
        path: "cutMendPlanOrder/detail",
        name: "切补计划单详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/cutMendPlanOrder/detail.vue"
          )
      },
      {
        path: "cutMendWorkOrder",
        name: "切补工单",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/cutMendWorkOrder"
          )
      },
      {
        path: "cutMendWorkOrder/detail",
        name: "切补工单详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/cutMendWorkOrder/detail.vue"
          )
      },
      {
        path: "productionPlanForm",
        name: "生产计划表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/productionPlanForm"
          )
      },
      {
        path: "productionPlanForm/detail",
        name: "生产计划表详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/productionPlanForm/detail"
          )
      },
      {
        path: "productionRecordForm",
        name: "生产记录表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/productionRecordForm"
          )
      },
      {
        path: "productionRecordForm/detail",
        name: "生产记录表详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/productionRecordForm/detail"
          )
      },
      {
        path: "changeWireForm",
        name: "换钢丝记录表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/changeWireForm"
          )
      },
      {
        path: "changeWireForm/add",
        name: "新增换钢丝记录表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/changeWireForm/add"
          )
      },
      {
        path: "changeWireForm/edit",
        name: "编辑换钢丝记录表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/changeWireForm/edit"
          )
      },
      {
        path: "changeWireForm/detail",
        name: "换钢丝记录表详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/changeWireForm/detail"
          )
      },
      {
        path: "newsWarning",
        name: "消息预警",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/newsWarning"
          )
      }, 
      {
        path: "newsWarning/add",
        name: "新增预警消息",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/newsWarning/add"
          )
      },
      {
        path: "newsWarning/edit",
        name: "编辑预警消息",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/newsWarning/edit"
          )
      },
      {
        path: "newsWarning/detail",
        name: "预警消息详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/production-management/newsWarning/detail"
          )
      },

    ]
  }
];
