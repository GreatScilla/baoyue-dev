let tenantId = JSON.parse(localStorage.getItem("saber-tenantId")).content
const option ={
    "detail": {
        "name": "订单数据分析",
        "width": 1920,
        "height": 1080,
        "scale": 52.39583333333333,
        "backgroundImage": "https://oss.bladex.vip/caster/upload/20210809/76e717b4b5ef288ac89987e291db4596.png",
        "url": "",
        "mark": {
            "show": false
        },
        "gradeShow": false,
        "gradeLen": 30,
        "query": {
            "td": 2000
        }
    },
    "component": [
        {
            "title": "表格",
            "name": "表格",
            "icon": "icon-table",
            "img": "/img/table.215c94c3.png",
            "top": 787.51,
            "left": 1407.1,
            "dataType": 1,
            "data": [
                {
                    "name": "张梦",
                    "role": "访客",
                    "way": "人脸",
                    "time": "2018-11-01"
                },
                {
                    "name": "李阳荣",
                    "role": "业主",
                    "way": "APP",
                    "time": "2018-11-01"
                },
                {
                    "name": "张无双",
                    "role": "访客",
                    "way": "人脸",
                    "time": "2018-11-01"
                },
                {
                    "name": "李阳",
                    "role": "业主",
                    "way": "APP",
                    "time": "2018-11-01"
                }
            ],
            "dataFormatter": "(res)=>{\r\n var list=res.data.salesRankRespList\r\n  return list\r\n}",
            "stylesFormatter": "",
            "component": {
                "width": 459.72,
                "height": 191.52,
                "name": "table",
                "prop": "table"
            },
            "option": {
                "showHeader": false,
                "columnShow": false,
                "columnViews": true,
                "headerBackground": "#00328E",
                "headerColor": "rgba(241, 242, 245, 1)",
                "headerTextAlign": "center",
                "bodyBackground": "rgba(0, 0, 0, 0.01)",
                "bodyColor": "#fff",
                "borderColor": "rgba(51, 65, 107, 1)",
                "bodyTextAlign": "center",
                "column": [
                    {
                        "$hide": "显示",
                        "label": "销售员",
                        "prop": "salesMan",
                        "width": "",
                        "hide": false,
                        "$index": 0
                    },
                    {
                        "$hide": "显示",
                        "label": "销售金额",
                        "prop": "totalAmountSum",
                        "width": "",
                        "hide": false,
                        "$index": 1
                    }
                ],
                "align": "center",
                "headerAlign": "center",
                "header": false,
                "scroll": true,
                "scrollTime": 2000,
                "fontSize": 15,
                "count": 4,
                "nthColor": "#00328E",
                "othColor": "",
                "index": true,
                "scrollCount": 1,
                "menu": false
            },
            "index": "8d90742a-c03e-4f05-8b08-872795f6179f",
            "zIndex": 14,
            "display": false,
            "time": 60000,
            "dataMethod": "get",
            "url": `${erp}/shopOrder/getOrderBIShop`,
            "dataQuery": `{"tenant":"${tenantId}"}`
        },
        {
            "title": "文本框",
            "name": "原材料库存",
            "icon": "icon-text",
            "img": "/img/text.852a3c54.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${erp}/shopOrder/getOrderBIShop`,
            "dataQuery": `{"tenant":"${tenantId}"}`,
            "dataFormatter": "(res)=>{  return {\r\n  value:res.data.inventoryStatisticsResp.rawMaterialSum\r\n  }\r\n}",
            "stylesFormatter": "",
            "data": {
                "value": "12000"
            },
            "component": {
                "width": 200,
                "height": 33.36,
                "name": "text",
                "prop": "text"
            },
            "option": {
                "textAlign": "center",
                "fontSize": 28,
                "fontWeight": "bold",
                "color": "#50FEFD",
                "split": 0,
                "lineHeight": 0
            },
            "left": 1631.2,
            "top": 597.32,
            "index": "813c115c-3f36-4338-8631-988532e720b9",
            "zIndex": 13,
            "time": 60000
        },
        {
            "title": "文本框",
            "name": "成品库存",
            "icon": "icon-text",
            "img": "/img/text.852a3c54.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${erp}/shopOrder/getOrderBIShop`,
            "dataQuery": `{"tenant":"${tenantId}"}`,
            "dataFormatter": "(res)=>{  return {\r\n  value:res.data.inventoryStatisticsResp.finishedProductSum\r\n  }\r\n}",
            "data": {
                "value": "12000"
            },
            "component": {
                "width": 200,
                "height": 33.36,
                "name": "text",
                "prop": "text"
            },
            "option": {
                "textAlign": "center",
                "fontSize": 28,
                "fontWeight": "bold",
                "color": "#50FEFD",
                "split": 0,
                "lineHeight": 0
            },
            "left": 1631.2,
            "top": 479.46,
            "index": "dcc4effa-6031-4950-a1ca-f50c951ebfef",
            "zIndex": 12,
            "time": 60000
        },
        {
            "name": "销售退货统计",
            "title": "折线图",
            "icon": "icon-line",
            "img": "/img/line.d9ed6cf6.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${erp}/shopOrder/getOrderBIShop`,
            "dataQuery": `{"tenant":"${tenantId}"}`,
            "dataFormatter": "(res)=>{\r\n var info={categories:res.data.shopReturnInfoRespList.map((el) => el.date),\r\n  series:[{data:res.data.shopReturnInfoRespList.map((el) => el.shopReturnSum)}]} \r\n  return info\r\n}",
            "data": {
                "categories": [
                    "1月",
                    "2月",
                    "3月",
                    "4月",
                    "5月",
                    "6月",
                    "7月",
                    "8月",
                    "9月",
                    "10月"
                ],
                "series": [
                    {
                        "data": [
                            123,
                            130,
                            140,
                            150,
                            160,
                            165,
                            168,
                            175,
                            180,
                            190,
                            210
                        ]
                    }
                ]
            },
            "stylesFormatter": "",
            "time": 60000,
            "component": {
                "width": 505.76,
                "height": 287.93,
                "name": "line",
                "prop": "line"
            },
            "option": {
                "gridX": 90,
                "gridY": 0,
                "gridX2": 0,
                "gridY2": 0,
                "nameColor": "#eee",
                "lineColor": "#eee",
                "lineWidth": 3,
                "xNameFontSize": 16,
                "yNameFontSize": 16,
                "labelShow": false,
                "labelShowFontSize": 14,
                "labelShowFontWeight": 300,
                "yAxisInverse": false,
                "xAxisInverse": false,
                "xAxisShow": true,
                "yAxisShow": true,
                "xAxisSplitLineShow": false,
                "yAxisSplitLineShow": false,
                "barWidth": 30,
                "barRadius": 8,
                "barColor": [
                    {
                        "color1": "#34C658",
                        "color2": "#34C658",
                        "postion": 90,
                        "$index": 0,
                        "_show": true
                    }
                ],
                "symbolSize": 3,
                "smooth": true,
                "barMinHeight": 2,
                "areaStyle": true
            },
            "left": 1374.54,
            "top": 120.74,
            "index": "1b053a01-0601-4154-8fcf-823a39f9904f",
            "zIndex": 11
        },
        {
            "name": "销售订单统计",
            "title": "折线图",
            "icon": "icon-line",
            "img": "/img/line.d9ed6cf6.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${erp}/shopOrder/getOrderBIShop`,
            "dataQuery": `{"tenant":"${tenantId}"}`,
            "dataFormatter": "(res)=>{\r\n var info={categories:res.data.shopOrderInfoRespList.map((el) => el.date),\r\n  series:[{data:res.data.shopOrderInfoRespList.map((el) => el.shopOrderSum)}]} \r\n  return info\r\n}",
            "data": {
                "categories": [
                    "1月",
                    "2月",
                    "3月",
                    "4月",
                    "5月",
                    "6月",
                    "7月",
                    "8月",
                    "9月",
                    "10月"
                ],
                "series": [
                    {
                        "data": [
                            123,
                            130,
                            140,
                            150,
                            160,
                            165,
                            168,
                            175,
                            180,
                            190,
                            210
                        ]
                    }
                ]
            },
            "stylesFormatter": "", 
            "time": 60000,
            "component": {
                "width": 798.36,
                "height": 294.2,
                "name": "line",
                "prop": "line"
            },
            "option": {
                "gridX": 90,
                "gridY": 0,
                "gridX2": 0,
                "gridY2": 0,
                "nameColor": "#eee",
                "lineColor": "#eee",
                "lineWidth": 3,
                "xNameFontSize": 16,
                "yNameFontSize": 16,
                "labelShow": false,
                "labelShowFontSize": 14,
                "labelShowFontWeight": 300,
                "yAxisInverse": false,
                "xAxisInverse": false,
                "xAxisShow": true,
                "yAxisShow": true,
                "xAxisSplitLineShow": false,
                "yAxisSplitLineShow": false,
                "barWidth": 30,
                "barRadius": 8,
                "barColor": [
                    {
                        "color1": "#2F3DE9",
                        "color2": "#58C1F4",
                        "postion": 90,
                        "$index": 0,
                        "_show": true
                    }
                ],
                "symbolSize": 3,
                "smooth": true,
                "barMinHeight": 2,
                "areaStyle": true
            },
            "left": 530.18,
            "top": 745.65,
            "index": "379709b8-c1e8-4d62-81fb-311537dcea1d",
            "zIndex": 10
        },
        {
            "title": "文本框",
            "name": "出库数量",
            "icon": "icon-text",
            "img": "/img/text.852a3c54.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${erp}/shopOrder/getOrderBIShop`,
            "dataQuery": `{"tenant":"${tenantId}"}`,
            "dataFormatter": "(res)=>{  return {\r\n  value:res.data.orderBIHomePageResp.operNumberSum\r\n  }\r\n}",
            "stylesFormatter": "",
            "data": {
                "value": "1315"
            },
            "component": {
                "width": 73.6,
                "height": 16,
                "name": "text",
                "prop": "text"
            },
            "option": {
                "textAlign": "center",
                "fontSize": 20,
                "fontWeight": "bold",
                "color": "#fff",
                "split": 0,
                "lineHeight": 15
            },
            "left": 1119.53,
            "top": 306.76,
            "index": "12e71b0f-b3d5-4153-83a0-38a7eeb3744b",
            "zIndex": 9,
            "time": 60000
        },
        {
            "title": "文本框",
            "name": "出库金额",
            "icon": "icon-text",
            "img": "/img/text.852a3c54.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${erp}/shopOrder/getOrderBIShop`,
            "dataQuery": `{"tenant":"${tenantId}"}`,
            "dataFormatter": "(res)=>{  return {\r\n  value:res.data.orderBIHomePageResp.unitTotalPriceSum\r\n  }\r\n}",
            "stylesFormatter": "",
            "data": {
                "value": "1315"
            },
            "component": {
                "width": 73.6,
                "height": 16,
                "name": "text",
                "prop": "text"
            },
            "option": {
                "textAlign": "center",
                "fontSize": 20,
                "fontWeight": "bold",
                "color": "#fff",
                "split": 0,
                "lineHeight": 15
            },
            "left": 969.13,
            "top": 322.76,
            "index": "d53b466f-82fe-4137-85ad-529d82a62ef0",
            "zIndex": 8,
            "time": 60000
        },
        {
            "title": "文本框",
            "name": "销售总额",
            "icon": "icon-text",
            "img": "/img/text.852a3c54.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${erp}/shopOrder/getOrderBIShop`,
            "dataQuery": `{"tenant":"${tenantId}"}`,
            "dataFormatter": "(res)=>{  return {\r\n  value:res.data.orderBIHomePageResp.salePriceSum\r\n  }\r\n}",
            "stylesFormatter": "",
            "data": {
                "value": "1315"
            },
            "component": {
                "width": 73.6,
                "height": 16,
                "name": "text",
                "prop": "text"
            },
            "option": {
                "textAlign": "center",
                "fontSize": 20,
                "fontWeight": "bold",
                "color": "#fff",
                "split": 0,
                "lineHeight": 15
            },
            "left": 782.73,
            "top": 321.16,
            "index": "dfc5f42a-9a9c-412e-894d-c15907dd0e0c",
            "zIndex": 7,
            "time": 60000
        },
        {
            "title": "文本框",
            "name": "销售量",
            "icon": "icon-text",
            "img": "/img/text.852a3c54.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${erp}/shopOrder/getOrderBIShop`,
            "dataQuery": `{"tenant":"${tenantId}"}`,
            "dataFormatter": "(res)=>{  return {\r\n  value:res.data.orderBIHomePageResp.productQuantitySum\r\n  }\r\n}",
            "stylesFormatter": "",
            "data": {
                "value": "1315"
            },
            "component": {
                "width": 73.6,
                "height": 16,
                "name": "text",
                "prop": "text"
            },
            "option": {
                "textAlign": "center",
                "fontSize": 20,
                "fontWeight": "bold",
                "color": "#fff",
                "split": 0,
                "lineHeight": 15
            },
            "left": 631.53,
            "top": 301.96,
            "index": "1ec68ff4-7424-4901-8859-df6924cc58a2",
            "zIndex": 6,
            "time": 60000
        },
        {
            "title": "文本框",
            "name": "原材料入库",
            "icon": "icon-text",
            "img": "/img/text.852a3c54.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${erp}/shopOrder/getOrderBIShop`,
            "dataQuery": `{"tenant":"${tenantId}"}`,
            "dataFormatter": "(res)=>{  return {\r\n  value:res.data.orderBIHeadResp.rawMaterialEnterSum\r\n  }\r\n}",
            "stylesFormatter": "",
            "data": {
                "value": "220"
            },
            "component": {
                "width": 100,
                "height": 40,
                "name": "text",
                "prop": "text"
            },
            "option": {
                "textAlign": "center",
                "fontSize": 32,
                "fontWeight": "normal",
                "color": "#34C658",
                "split": 0,
                "lineHeight": 0
            },
            "left": 338.72,
            "top": 915.24,
            "index": "80727ce9-795c-44ff-92d1-c7e14ab497cb",
            "zIndex": 5,
            "time": 60000
        },
        {
            "title": "文本框",
            "name": "原材料出库",
            "icon": "icon-text",
            "img": "/img/text.852a3c54.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${erp}/shopOrder/getOrderBIShop`,
            "dataQuery": `{"tenant":"${tenantId}"}`,
            "dataFormatter": "(res)=>{  return {\r\n  value:res.data.orderBIHeadResp.rawMaterialLeaveSum\r\n  }\r\n}",
            "stylesFormatter": "",
            "data": {
                "value": "120"
            },
            "component": {
                "width": 100,
                "height": 40,
                "name": "text",
                "prop": "text"
            },
            "option": {
                "textAlign": "center",
                "fontSize": 32,
                "fontWeight": "normal",
                "color": "#FF4949",
                "split": 0,
                "lineHeight": 0
            },
            "left": 200.68,
            "top": 917.36,
            "index": "f6524640-1809-4fc5-a2a1-7729d4f70399",
            "zIndex": 4,
            "time": 60000
        },
        {
            "title": "文本框",
            "name": "成品入库",
            "icon": "icon-text",
            "img": "/img/text.852a3c54.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${erp}/shopOrder/getOrderBIShop`,
            "dataQuery": `{"tenant":"${tenantId}"}`,
            "dataFormatter": "(res)=>{  return {\r\n  value:res.data.orderBIHeadResp.finishedProductEnterSum\r\n  }\r\n}",
            "stylesFormatter": "",
            "data": {
                "value": "220"
            },
            "component": {
                "width": 100,
                "height": 40,
                "name": "text",
                "prop": "text"
            },
            "option": {
                "textAlign": "center",
                "fontSize": 32,
                "fontWeight": "normal",
                "color": "#34C658",
                "split": 0,
                "lineHeight": 0
            },
            "left": 347.8,
            "top": 796.92,
            "index": "9a3cff96-9c07-4ea3-86b6-e6bfa1cc76d2",
            "zIndex": 3,
            "time": 60000
        },
        {
            "title": "文本框",
            "name": "成品出库",
            "icon": "icon-text",
            "img": "/img/text.852a3c54.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${erp}/shopOrder/getOrderBIShop`,
            "dataQuery": `{"tenant":"${tenantId}"}`,
            "dataFormatter": "(res)=>{  return {\r\n  value:res.data.orderBIHeadResp.finishedProductLeaveSum\r\n  }\r\n}",
            "stylesFormatter": "",
            "data": {
                "value": "120"
            },
            "component": {
                "width": 100,
                "height": 40,
                "name": "text",
                "prop": "text"
            },
            "option": {
                "textAlign": "center",
                "fontSize": 32,
                "fontWeight": "normal",
                "color": "#FF4949",
                "split": 0,
                "lineHeight": 0
            },
            "left": 200.68,
            "top": 795.76,
            "index": "ea14f742-86e9-447e-98b6-0d6ecc4ffdab",
            "zIndex": 2,
            "time": 60000
        },
        {
            "name": "收付款情况",
            "title": "折线图",
            "icon": "icon-line",
            "img": "/img/line.d9ed6cf6.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${finance}/bill/queryHomeBill`,
            "dataFormatter": "(res)=>{\r\n var month=res.data.disburseList.map((el) => el.month).concat(res.data.incomeList.map((el) => el.month)); \r\n var info={categories:Array.from(new Set(month)).sort(),\r\n  series:[{name:'收款',data:res.data.incomeList.map((el) => el.value)},{name:'付款',data:res.data.disburseList.map((el) => el.value)}]} \r\n  return info\r\n}",
            "time": 60000,
            "data": {
                "categories": [
                    "1月",
                    "2月",
                    "3月",
                    "4月",
                    "5月"
                ],
                "series": [
                    {
                        "name": "收款",
                        "data": [
                            230,
                            320,
                            400,
                            238,
                            500
                        ]
                    },
                    {
                        "name": "付款",
                        "data": [
                            130,
                            620,
                            300,
                            438,
                            200
                        ]
                    }
                ]
            },
            "stylesFormatter": "",
            "component": {
                "width": 474.48,
                "height": 266.12,
                "name": "line",
                "prop": "line"
            },
            "option": {
                "gridX": 76,
                "gridY": 0,
                "gridX2": 0,
                "gridY2": 0,
                "nameColor": "#eee",
                "lineColor": "#eee",
                "lineWidth": 3,
                "xNameFontSize": 16,
                "yNameFontSize": 16,
                "labelShow": false,
                "labelShowFontSize": 14,
                "labelShowFontWeight": 300,
                "yAxisInverse": false,
                "xAxisInverse": false,
                "xAxisShow": true,
                "yAxisShow": true,
                "xAxisSplitLineShow": false,
                "yAxisSplitLineShow": false,
                "barWidth": 30,
                "barRadius": 8,
                "barColor": [
                    {
                        "color1": "#2F3DE9",
                        "color2": "#58C1F4",
                        "postion": 90,
                        "$index": 0,
                        "_show": true
                    },
                    {
                        "color1": "#34C658",
                        "color2": "#34C658",
                        "postion": 50,
                        "$index": 1,
                        "_show": true
                    }
                ],
                "symbolSize": 3,
                "smooth": true,
                "barMinHeight": 2,
                "areaStyle": true,
                "legend": true,
                "legendPostion": "right",
                "switchTheme": false
            },
            "left": 17.04,
            "top": 434.12,
            "index": "1fdb0798-78cd-4039-848c-a781338673aa",
            "zIndex": 1
        },
        {
            "name": "月度收款分析",
            "title": "柱状图",
            "icon": "icon-bar",
            "img": "/img/bar.179e480c.png",
            "data": {
                "categories": [
                    "一月",
                    "二月",
                    "三月",
                    "四月",
                    "五月"
                ],
                "series": [
                    {
                        "name": "手机品牌",
                        "data": [
                            200,
                            300,
                            400,
                            320,
                            340
                        ]
                    }
                ]
            },
            "dataType": 1,
            "dataMethod": "get",
            "url": `${finance}/bill/queryHomeBill`,
            "dataFormatter": "(res)=>{\r\n var info={categories:res.data.incomeList.map((el) => el.month),\r\n  series:[{data:res.data.incomeList.map((el) => el.value)}]} \r\n  return info\r\n}",
            "stylesFormatter": "",
            "time": 60000,
            "component": {
                "width": 462.64,
                "height": 249.68,
                "name": "bar",
                "prop": "bar"
            },
            "option": {
                "gridX": 82,
                "gridY": 0,
                "gridX2": 2,
                "gridY2": 0,
                "legend": false,
                "nameColor": "#eee",
                "lineColor": "#eee",
                "xNameFontSize": 16,
                "yNameFontSize": 16,
                "labelShow": true,
                "labelShowColor": "#fff",
                "labelShowFontSize": 14,
                "labelShowFontWeight": 300,
                "yAxisInverse": false,
                "xAxisInverse": false,
                "xAxisShow": true,
                "yAxisShow": true,
                "xAxisSplitLineShow": false,
                "yAxisSplitLineShow": false,
                "barWidth": 18,
                "barRadius": 0,
                "barColor": [
                    {
                        "color1": "#83bff6",
                        "color2": "#188df0",
                        "postion": 90,
                        "$index": 0,
                        "_show": true
                    },
                    {
                        "color1": "#23B7E5",
                        "color2": "#564AA3",
                        "postion": 50,
                        "$index": 1,
                        "_show": true
                    }
                ],
                "barMinHeight": 0
            },
            "left": 4.68,
            "top": 150.96,
            "index": "3b030090-bdfb-4945-84e5-05f1fe60d2e4",
            "zIndex": 0
        }
    ]
}