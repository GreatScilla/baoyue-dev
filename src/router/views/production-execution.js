// 生产执行

export default [
  // {
  //   path: "/production-execution/index",
  //   redirect: "/production-execution/index"
  // },
  {
    path: "/production-execution/home",
    name: '浇注报工',
    component: () =>
      import(
        /* webpackChunkName: "views" */ "@/views/production-execution/home"
      )
  },
  {
    path: "/production-execution/cuttingWork",
    name: '切割报工',
    component: () =>
      import( 
        /* webpackChunkName: "views" */ "@/views/production-execution/home/cuttingWork.vue"
      )
  },
  {
    path: "/production-execution/irigamaWork",
    name: '入釜报工',
    component: () =>
      import( 
        /* webpackChunkName: "views" */ "@/views/production-execution/home/irigamaWork.vue"
      )
  },
  {
    path: "/production-execution/outKettleWork",
    name: '出釜报工',
    component: () =>
      import( 
        /* webpackChunkName: "views" */ "@/views/production-execution/home/outKettleWork.vue"
      )
  },
  {
    path: "/production-execution/qualityControlWork",
    name: '质检报工',
    component: () =>
      import( 
        /* webpackChunkName: "views" */ "@/views/production-execution/home/qualityControlWork.vue"
      )
  },
  {
    path: "/production-execution/cutMendWork",
    name: '切补报工',
    component: () =>
      import( 
        /* webpackChunkName: "views" */ "@/views/production-execution/home/cutMendWork.vue"
      )
  },
  {
    path: "/production-execution/meshWork",
    name: '网片报工',
    component: () =>
      import( 
        /* webpackChunkName: "views" */ "@/views/production-execution/home/meshWork.vue"
      )
  },
  {
    path: "/production-execution/productionExecutionDataBig",
    name: '生产执行运行驾驶舱',
    component: () =>
      import( 
        /* webpackChunkName: "views" */ "@/views/production-execution/productionExecutionDataBig"
      )
  },
  {
    path: "/production-execution/baogong",
    component: () =>
      import(
        /* webpackChunkName: "views" */ "@/views/production-execution/baogong"
      )
  },
  {
    path: "/production-execution/bad-record",
    component: () =>
      import(
        /* webpackChunkName: "views" */ "@/views/production-execution/bad-record"
      )
  },
  {
    path: "/production-execution/doc-check",
    component: () =>
      import(
        /* webpackChunkName: "views" */ "@/views/production-execution/doc-check"
      )
  },
  {
    path: "/production-execution/task",
    component: () =>
      import(
        /* webpackChunkName: "views" */ "@/views/production-execution/task"
      )
  },
  {
    path: "/production-execution/stationSelection",
    component: () =>
      import(
        /* webpackChunkName: "views" */ "@/views/production-execution/stationSelection"
      )
  },
];
