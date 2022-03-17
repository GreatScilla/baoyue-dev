// 产品研发

import Layout from "@/page/index/";

export default [
  {
    path: "/product-development",
    component: Layout,
    redirect: "/product-development/product-category",
    children: [
      {
        path: "process-manage",
        name: "工序管理",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/product-development/process-manage"
          )
      },
      {
        path: "process-manage/add",
        name: "新增工序管理",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/product-development/process-manage/add.vue"
          )
      },
      {
        path: "process-manage/edit",
        name: "修改工序管理",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/product-development/process-manage/edit.vue"
          )
      },
      {
        path: "process-manage/detail",
        name: "工序管理详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/product-development/process-manage/detail.vue"
          )
      },
      {
        path: "craft-route",
        name: "工艺路线",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/product-development/craft-route"
          )
      },
      {
        path: "craft-route/detail",
        name: "工艺路线",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/product-development/craft-route/detail.vue"
          )
      },
      {
        path: "product-category",
        name: "产品分类",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/product-development/product-category/product-category.vue"
          )
      },
      {
        path: "product-category/add",
        name: "新增根分类",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/product-development/product-category/add.vue"
          )
      },
      {
        path: "product-category/edit",
        name: "编辑产品分类",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/product-development/product-category/edit.vue"
          )
      },
      {
        path: "product-category/detail",
        name: "产品分类详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/product-development/product-category/detail.vue"
          )
      },
      {
        path: "bom-manage",
        name: "BOM管理",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/product-development/bom-manage"
          )
      },
      {
        path: "bom-manage/add",
        name: "新增BOM",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/product-development/bom-manage/add"
          )
      },
      {
        path: "bom-manage/edit",
        name: "编辑BOM",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/product-development/bom-manage/edit"
          )
      },
      {
        path: "bom-manage/detail",
        name: "BOM详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/product-development/bom-manage/detail"
          )
      },
      {
        path: "product-data",
        name: "产品数据",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/product-development/product-data"
          )
      },
      {
        path: "product-data/add",
        name: "新增产品数据",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/product-development/product-data/add"
          )
      },
      {
        path: "product-data/edit",
        name: "编辑产品数据",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/product-development/product-data/edit"
          )
      },
      {
        path: "product-data/detail",
        name: "产品数据详情",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/product-development/product-data/detail"
          )
      },
      {
        path: "product-unit",
        name: "计量单位",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/product-development/product-unit"
          )
      },
      {
        path: "craft-bom",
        name: "工艺BOM",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/product-development/craft-bom"
          )
      },
      {
        path: "craft-bom/related-material",
        name: "关联物料新增",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/product-development/craft-bom/materialAdd.vue"
          )
      },
      {
        path: "craft-bom/related-component",
        name: "关联组件新增",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/product-development/craft-bom/comAdd.vue"
          )
      },
      {
        path: "craft-bom/related-sop",
        name: "关联组件新增",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/product-development/craft-bom/sopAdd"
          )
      },
      {
        path: "bom-multidimensional-query",
        name: "bom多维查询",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/product-development/bom-multidimensional-query"
          )
      },
      {
        path: "reportForm/schedule",
        name: "产品明细表",
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/product-development/reportForm/schedule.vue"
          )
      }
    ]
  }
];
