import Layout from "@/page/index/";

export default [
    {
        path: '/asset-management',
        component: Layout,
        redirect: "/asset-management/assetsParameter",
        children: [
            {
                path: "assetsParameter",
                name: "资产台账",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/assetsParameter"
                    )
            },
            {
                path: "assetsParameter/add",
                name: "新增资产台账",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/assetsParameter/add"
                    )
            },
            {
                path: "assetsParameter/edit",
                name: "编辑资产台账",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/assetsParameter/edit"
                    )
            },
            {
                path: "assetsParameter/detail",
                name: "资产台账详情",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/assetsParameter/detail"
                    )
            },

            {
                path: "sparePartsManagement",
                name: "备件管理",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/sparePartsManagement"
                    )
            },
            {
                path: "assetReallocation",
                name: "资产调剂",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/assetReallocation"
                    )
            },
            {
                path: "assetReallocation/add",
                name: "新增资产调剂",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/assetReallocation/add"
                    )
            },
            {
                path: "assetReallocation/edit",
                name: "编辑资产调剂",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/assetReallocation/edit"
                    )
            },
            {
                path: "assetReallocation/detail",
                name: "资产调剂详情",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/assetReallocation/detail"
                    )
            },
            {
                path: "inventoryPlan",
                name: "盘点计划",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/inventoryPlan"
                    )
            },
            {
                path: "inventoryPlan/add",
                name: "新增盘点计划",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/inventoryPlan/add"
                    )
            },
            {
                path: "inventoryPlan/edit",
                name: "编辑盘点计划",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/inventoryPlan/edit"
                    )
            },
            {
                path: "inventoryPlan/detail",
                name: "盘点计划详情",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/inventoryPlan/detail"
                    )
            },
            {
                path: "inventoryWorkOrder",
                name: "盘点工单",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/inventoryWorkOrder"
                    )
            },
            {
                path: "inventoryWorkOrder/add",
                name: "盘点结果反馈",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/inventoryWorkOrder/add"
                    )
            },
            {
                path: "inventoryWorkOrder/edit",
                name: "编辑盘点工单",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/inventoryWorkOrder/edit"
                    )
            },
            {
                path: "inventoryWorkOrder/detail",
                name: "盘点工单详情",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/inventoryWorkOrder/detail"
                    )
            },
            {
                path: "profitLossSingle",
                name: "盘盈盘亏单",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/profitLossSingle"
                    )
            },
            {
                path: "profitLossSingle/edit",
                name: "编辑盘盈盘亏单",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/profitLossSingle/edit"
                    )
            },
            {
                path: "profitLossSingle/detail",
                name: "盘盈盘亏单详情",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/profitLossSingle/detail"
                    )
            },
            {
                path: "IDPhoto",
                name: "证照库",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/IDPhoto"
                    )
            },
            {
                path: "IDPhoto/add",
                name: "新增证照库",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/IDPhoto/add"
                    )
            },
            {
                path: "IDPhoto/edit",
                name: "编辑证照库",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/IDPhoto/edit"
                    )
            },
            {
                path: "IDPhoto/detail",
                name: "证照库详情",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/IDPhoto/detail"
                    )
            },
            {
                path: "borrowReturn",
                name: "资产借用及归还",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/borrowReturn"
                    )
            },
            {
                path: "borrowReturn/add",
                name: "新增资产借用及归还",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/borrowReturn/add"
                    )
            },
            {
                path: "borrowReturn/return",
                name: "资产归还",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/borrowReturn/return"
                    )
            },
            {
                path: "borrowReturn/edit",
                name: "编辑资产借用及归还",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/borrowReturn/edit"
                    )
            },
            {
                path: "borrowReturn/detail",
                name: "资产借用及归还详情",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/borrowReturn/detail"
                    )
            },
            {
                path: "equipmentDisposal",
                name: "设备处置",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/equipmentDisposal"
                    )
            },
            {
                path: "equipmentDisposal/add",
                name: "新增设备处置",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/equipmentDisposal/add"
                    )
            },
            {
                path: "equipmentDisposal/edit",
                name: "编辑设备处置",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/equipmentDisposal/edit"
                    )
            },
            {
                path: "equipmentDisposal/detail",
                name: "设备处置详情",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/equipmentDisposal/detail"
                    )
            },
            {
                path: "maintainPlan",
                name: "保养计划",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/maintainPlan"
                    )
            },
            {
                path: "maintainPlan/add",
                name: "新增保养计划",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/maintainPlan/add"
                    )
            },
            {
                path: "maintainPlan/edit",
                name: "编辑保养计划",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/maintainPlan/edit"
                    )
            },
            {
                path: "maintainPlan/detail",
                name: "保养计划详情",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/maintainPlan/detail"
                    )
            },

            {
                path: "assetRepair",
                name: "资产报修",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/assetRepair"
                    )
            },
            {
                path: "assetRepair/add",
                name: "新增资产报修",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/assetRepair/add"
                    )
            },
            {
                path: "assetRepair/edit",
                name: "编辑资产报修",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/assetRepair/edit"
                    )
            },
            {
                path: "assetRepair/detail",
                name: "资产报修详情",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/assetRepair/detail"
                    )
            },

            {
                path: "maintainStandard",
                name: "保养标准",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/maintainStandard"
                    )
            },
            {
                path: "maintainStandard/add",
                name: "新增保养标准",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/maintainStandard/add"
                    )
            },
            {
                path: "maintainStandard/edit",
                name: "编辑保养标准",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/maintainStandard/edit"
                    )
            },
            {
                path: "maintainStandard/detail",
                name: "保养标准详情",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/maintainStandard/detail"
                    )
            },

            {
                path: "faultIibrary",
                name: "故障库",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/faultIibrary"
                    )
            },
            {
                path: "faultIibrary/add",
                name: "新增故障库",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/faultIibrary/add"
                    )
            },
            {
                path: "faultIibrary/edit",
                name: "编辑故障库",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/faultIibrary/edit"
                    )
            },
            {
                path: "faultIibrary/detail",
                name: "故障库详情",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/faultIibrary/detail"
                    )
            },

            {
                path: "workMaintain",
                name: "保养工单",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/workMaintain"
                    )
            },
            {
                path: "workMaintain/add",
                name: "新增保养工单",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/workMaintain/add"
                    )
            },
            {
                path: "workMaintain/edit",
                name: "验收保养工单",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/workMaintain/edit"
                    )
            },
            {
                path: "workMaintain/detail",
                name: "保养工单详情",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/workMaintain/detail"
                    )
            },

            {
                path: "repairOrder",
                name: "维修工单",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/repairOrder"
                    )
            },
            {
                path: "repairOrder/add",
                name: "新增维修工单",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/repairOrder/add"
                    )
            },
            {
                path: "repairOrder/edit",
                name: "验收维修工单",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/repairOrder/edit"
                    )
            },
            {
                path: "repairOrder/detail",
                name: "维修工单详情",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/repairOrder/detail"
                    )
            },
            
            {
                path: "workCheck",
                name: "点检工单",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/workCheck"
                    )
            },
            {
                path: "workCheck/add",
                name: "新增点检工单",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/workCheck/add"
                    )
            },
            {
                path: "workCheck/edit",
                name: "验收点检工单",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/workCheck/edit"
                    )
            },
            {
                path: "workCheck/detail",
                name: "点检工单详情",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/workCheck/detail"
                    )
            },

            {
                path: "workPatrol",
                name: "巡检工单",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/workPatrol"
                    )
            },
            {
                path: "workPatrol/add",
                name: "新增巡检工单",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/workPatrol/add"
                    )
            },
            {
                path: "workPatrol/edit",
                name: "验收巡检工单",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/workPatrol/edit"
                    )
            },
            {
                path: "workPatrol/detail",
                name: "巡检工单详情",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/workPatrol/detail"
                    )
            },

            {
                path: "repairPlan",
                name: "报修计划",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/repairPlan"
                    )
            },
            {
                path: "repairPlan/add",
                name: "新增报修计划",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/repairPlan/add"
                    )
            },
            {
                path: "repairPlan/edit",
                name: "编辑报修计划",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/repairPlan/edit"
                    )
            },
            {
                path: "repairPlan/detail",
                name: "报修计划详情",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/repairPlan/detail"
                    )
            },
            
            {
                path: "checkingPlan",
                name: "点检计划",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/checkingPlan"
                    )
            },
            {
                path: "checkingPlan/add",
                name: "新增点检计划",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/checkingPlan/add"
                    )
            },
            {
                path: "checkingPlan/edit",
                name: "编辑点检计划",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/checkingPlan/edit"
                    )
            },
            {
                path: "checkingPlan/detail",
                name: "点检计划详情",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/checkingPlan/detail"
                    )
            },
            {
                path: "checkingPlan/set",
                name: "点检计划参数设置",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/checkingPlan/set"
                    )
            },
            {
                path: "patrolScheme/set",
                name: "巡检计划参数设置",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/patrolScheme/set"
                    )
            },

            {
                path: "patrolScheme",
                name: "巡检计划",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/patrolScheme"
                    )
            },
            {
                path: "patrolScheme/add",
                name: "新增巡检计划",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/patrolScheme/add"
                    )
            },
            {
                path: "patrolScheme/edit",
                name: "编辑巡检计划",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/patrolScheme/edit"
                    )
            },
            {
                path: "patrolScheme/detail",
                name: "巡检计划详情",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/asset-management/patrolScheme/detail"
                    )
            },
        ]
    }
]