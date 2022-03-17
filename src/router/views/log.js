//日志

import Layout from "@/page/index/";

export default [
    {
        path: "/monitor",
        component: Layout,
        redirect: "/monitor/log/operation",
        children: [
            {
                path: "log/operation",
                name: "操作日志",
                component: () =>
                    import(
            /* webpackChunkName: "views" */ "@/views/monitor/log/operation"
                    )
            },
        ]
    }
];
