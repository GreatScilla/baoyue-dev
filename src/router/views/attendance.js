//考勤管理
import Layout from "@/page/index/";
export default [
        {
                path: "/attendance",
                component: Layout,
                redirect: "/attendance/record",
                children: [
                        {
                                path: "record",
                                name: "考勤记录",
                                component: () =>
                                        import(
            /* webpackChunkName: "views" */ "@/views/attendance/record"
                                        )
                        },
                        {
                                path: "calendar",
                                name: "月考勤日历",
                                component: () =>
                                        import(
            /* webpackChunkName: "views" */ "@/views/attendance/calendar"
                                        )
                        },
                        {
                                path: "statistics",
                                name: "考勤统计",
                                component: () =>
                                        import(
            /* webpackChunkName: "views" */ "@/views/attendance/statistics"
                                        )
                        },

                        {
                                path: "annualLeaveStatistics",
                                name: "年假统计",
                                component: () =>
                                        import(
            /* webpackChunkName: "views" */ "@/views/attendance/annualLeaveStatistics"
                                        )
                        },
                        {
                                path: "otherHolidayStatistics",
                                name: "其他假期统计",
                                component: () =>
                                        import(
            /* webpackChunkName: "views" */ "@/views/attendance/otherHolidayStatistics"
                                        )
                        },
                        {
                                path: "overtimeStatistics",
                                name: "加班统计",
                                component: () =>
                                        import(
            /* webpackChunkName: "views" */ "@/views/attendance/overtimeStatistics"
                                        )
                        },
                        {
                                path: "leaveStatistics",
                                name: "请假统计",
                                component: () =>
                                        import(
            /* webpackChunkName: "views" */ "@/views/attendance/leaveStatistics"
                                        )
                        },
                        {
                                path: "leaveType",
                                name: "假期类型",
                                component: () =>
                                        import(
            /* webpackChunkName: "views" */ "@/views/attendance/leaveType"
                                        )
                        },
                        {
                                path: "annualLeaveValid",
                                name: "年假有效期设置",
                                component: () =>
                                        import(
            /* webpackChunkName: "views" */ "@/views/attendance/annualLeaveValid"
                                        )
                        },
                        {
                                path: "annualLeavePeriod",
                                name: "年假期限设置",
                                component: () =>
                                        import(
            /* webpackChunkName: "views" */ "@/views/attendance/annualLeavePeriod"
                                        )
                        },
                ]

        }
]