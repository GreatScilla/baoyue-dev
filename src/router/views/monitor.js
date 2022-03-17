export default [
  {
    path: "/operate/intelligenceData",
    name: "湖南宝悦智能化信息系统",
    component: () =>
      import(
        /* webpackChunkName: "views" */ "@/views/operate/intelligenceData/index.vue"
      )
  },
  {
    path: "/operate/orderData",
    name: "订单数据分析",
    component: () =>
      import(
          /* webpackChunkName: "views" */ "@/views/operate/orderData/index.vue"
      )
  },
  {
    path: "/operate/purchaseData",
    name: "采购数据分析",
    component: () =>
      import(
          /* webpackChunkName: "views" */ "@/views/operate/purchaseData/index.vue"
      )
  },
  {
    path: "/operate/productionData",
    name: "生产数据分析",
    component: () =>
      import(
          /* webpackChunkName: "views" */ "@/views/operate/productionData/index.vue"
      )
  },
  {
    path: "/operate/qualityData",
    name: "质量数据分析",
    component: () =>
      import(
          /* webpackChunkName: "views" */ "@/views/operate/qualityData/index.vue"
      )
  },
  {
    path: "/operate/capacityData",
    name: "湖南宝悦产能消耗表",
    component: () =>
      import(
          /* webpackChunkName: "views" */ "@/views/operate/capacityData/index.vue"
      )
  },
  {
    path: "/operate/trayData",
    name: "托盘大屏",
    component: () =>
      import(
          /* webpackChunkName: "views" */ "@/views/operate/trayData/index.vue"
      )
  },
  {
    path: "/operate/loadometerData",
    name: "无人地磅大屏",
    component: () =>
      import(
          /* webpackChunkName: "views" */ "@/views/operate/loadometerData/index.vue"
      )
  },
  {
    path: "/operate/equipment3DData",
    name: "设备3D管理",
    component: () =>
      import(
          /* webpackChunkName: "views" */ "@/views/operate/equipment3DData/index.vue"
      )
  },
  {
    path: "/operate/inventoryManagementData",
    name: "存货管理运行驾驶舱",
    component: () =>
      import(
          /* webpackChunkName: "views" */ "@/views/operate/inventoryManagementData/index.vue"
      )
  }
];