// 物流管理
import Layout from "@/page/index/";
export default [{
    path: "/logistics",
    component: Layout,
    redirect: "/logistics/tray/palletStorage",
    children: [{
            path: "vehicle",
            name: "车辆管理",
            component: () =>
                import (
                    /* webpackChunkName: "views" */
                    "@/views/logistics/vehicle"
                )
        },
        {
            path: "tray/pallet",
            name: "托盘管理",
            component: () =>
                import (
                    /* webpackChunkName: "views" */
                    "@/views/logistics/tray/pallet"
                )
        },
        {
            path: "tray/palletStorage",
            name: "托盘入库",
            component: () =>
                import (
                    /* webpackChunkName: "views" */
                    "@/views/logistics/tray/palletStorage"
                )
        },
        {
            path: "tray/palletStorage/detail",
            name: "托盘入库",
            component: () =>
                import (
                    /* webpackChunkName: "views" */
                    "@/views/logistics/tray/palletStorage/detail"
                )
        },
        {
            path: "tray/palletDelivery",
            name: "托盘出库",
            component: () =>
                import (
                    /* webpackChunkName: "views" */
                    "@/views/logistics/tray/palletDelivery"
                )
        },
        {
            path: "tray/palletDelivery/detail",
            name: "托盘出库详情",
            component: () =>
                import (
                    /* webpackChunkName: "views" */
                    "@/views/logistics/tray/palletDelivery/detail"
                )
        },
        {
            path: "tray/palletInventory",
            name: "托盘盘点",
            component: () =>
                import (
                    /* webpackChunkName: "views" */
                    "@/views/logistics/tray/palletInventory"
                )
        },
        {
            path: "tray/palletInventory/detail",
            name: "托盘盘点详情",
            component: () =>
                import (
                    /* webpackChunkName: "views" */
                    "@/views/logistics/tray/palletInventory/detail"
                )
        },
        {
            path: "tray/palletScrap",
            name: "托盘报废",
            component: () =>
                import (
                    /* webpackChunkName: "views" */
                    "@/views/logistics/tray/palletScrap"
                )
        },
        {
            path: "tray/palletScrap/detail",
            name: "托盘报废详情",
            component: () =>
                import (
                    /* webpackChunkName: "views" */
                    "@/views/logistics/tray/palletScrap/detail"
                )
        },
        {
            path: "sendVehicle",
            name: "派车管理",
            component: () =>
                import (
                    /* webpackChunkName: "views" */
                    "@/views/logistics/sendVehicle"
                )
        },
        {
            path: "sendVehicle/add",
            name: "派车管理新增",
            component: () =>
                import (
                    /* webpackChunkName: "views" */
                    "@/views/logistics/sendVehicle/add"
                )
        },
        {
            path: "sendVehicle/edit",
            name: "派车管理编辑",
            component: () =>
                import (
                    /* webpackChunkName: "views" */
                    "@/views/logistics/sendVehicle/edit"
                )
        },
        {
            path: "sendVehicle/detail",
            name: "派车管理详情",
            component: () =>
                import (
                    /* webpackChunkName: "views" */
                    "@/views/logistics/sendVehicle/detail"
                )
        },
        //报表
        {
            path: "reportForm/vehicle",
            name: "车辆明细表",
            component: () =>
                import (
                    /* webpackChunkName: "views" */
                    "@/views/logistics/reportForm/vehicle"
                )
        },
        {
            path: "reportForm/dispatch",
            name: "派车明细表",
            component: () =>
                import (
                    /* webpackChunkName: "views" */
                    "@/views/logistics/reportForm/dispatch"
                )
        },
        {
            path: "reportForm/palletInAndOut",
            name: "托盘出入库统计表",
            component: () =>
                import (
                    /* webpackChunkName: "views" */
                    "@/views/logistics/reportForm/palletInAndOut"
                )
        },
    ]
}];