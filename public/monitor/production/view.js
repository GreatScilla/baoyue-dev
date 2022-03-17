const option = {
    "detail": {
        "name": "生产数据分析",
        "width": 1920,
        "height": 1080,
        "scale": 52.39583333333333,
        "backgroundImage": "https://oss.bladex.vip/caster/upload/20210728/8d2360659ea0f9faeab240e53714e178.png",
        "url": "",
        "mark": {},
        "gradeShow": false,
        "gradeLen": 30,
        "query": {}
    },
    "component": [
        {
            "name": "采购计划统计",
            "title": "折线图",
            "icon": "icon-line",
            "img": "/img/line.d9ed6cf6.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${mes}/productionplan/getProductionPlanBI`,
            "dataFormatter": "(res)=>{\r\n var info={categories:res.data.procurementResp.map((el) => el.months),\r\n  series:[{data:res.data.procurementResp.map((el) => el.planNumberSum)}]} \r\n  return info\r\n}",
            "time": 60000,
            "data": {
                "categories": [],
                "series": [
                    {
                        "name": "数量",
                        "data":[]
                    }
                ]
            },
            "stylesFormatter": "",
            "component": {
                "width": 487.12,
                "height": 300,
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
                        "color1": "#83bff6",
                        "color2": "#188df0",
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
            "left": 1394.4,
            "top": 737.04,
            "index": "19845f60-498c-42a1-856d-7a6b1fdc8d6a",
            "zIndex": 9
        },
        {
            "name": "预生产计划",
            "title": "柱状图",
            "icon": "icon-bar",
            "img": "/img/bar.179e480c.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${mes}/productionplan/getProductionPlanBI`,
            "dataFormatter": "(res)=>{\r\n var info={categories:res.data.preProductionResp.map((el) => el.months),\r\n  series:[{data:res.data.preProductionResp.map((el) => el.planNumberSum)}]} \r\n  return info\r\n}",
            "time": 60000,
            "data": {
                "categories": [],
                "series": [
                    {
                        "name": "生产数量",
                        "data": []
                    }
                ]
            },
            "stylesFormatter": "",
            "component": {
                "width": 473.84,
                "height": 295.02,
                "name": "bar",
                "prop": "bar"
            },
            "option": {
                "gridX": 90,
                "gridY": 0,
                "gridX2": 0,
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
                "barWidth": 16,
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
                "barMinHeight": 2
            },
            "left": 1394.4,
            "top": 429.94,
            "index": "28e0e3bb-3f55-48fd-82b0-c4ee9fb73200",
            "zIndex": 8
        },
        {
            "name": "生产统计",
            "title": "折线图",
            "icon": "icon-line",
            "img": "/img/line.d9ed6cf6.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${mes}/productionplan/getProductionPlanBI`,
            "dataFormatter": "(res)=>{\r\n var info={categories:res.data.productionStatisticsResp.map((el) => el.months),\r\n  series:[{name:'生产数量',data:res.data.productionStatisticsResp.map((el) => el.planNumberSum)},{name:'报工数量',data:res.data.productionStatisticsResp.map((el) => el.jobBookingNumSum)}]} \r\n  return info\r\n}",
            "time": 60000,
            "data": {
                "categories": [],
                "series": [
                    {
                        "name": "生产数量",
                        "data": []
                    },
                    {
                        "name": "报工数量",
                        "data": []
                    }
                ]
            },
            "stylesFormatter": "",
            "component": {
                "width": 495.42,
                "height": 300,
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
                "areaStyle": true
            },
            "left": 1391.08,
            "top": 111.22,
            "index": "a14394e5-e514-4b14-9c91-aa93d95ab2b0",
            "zIndex": 7
        },
        {
            "title": "表格",
            "name": "产品生产情况",
            "icon": "icon-table",
            "img": "/img/table.215c94c3.png",
            "top": 604.24,
            "left": 547.8,
            "dataType": 1,
            "dataMethod": "get",
            "url": `${mes}/productionplan/getProductionPlanBI`,
            "dataFormatter": "(res)=>{\r\n var list=res.data.productProduction\r\n  return list\r\n}",
            "time": 60000,
            "data": [],
            "stylesFormatter": "",
            "component": {
                "width": 808.76,
                "height": 390.9,
                "name": "table",
                "prop": "table"
            },
            "option": {
                "showHeader": false,
                "columnShow": false,
                "columnViews": true,
                "headerBackground": "#00328E",
                "headerColor": "#fff",
                "headerTextAlign": "center",
                "bodyBackground": "rgba(0, 0, 0, 0.01)",
                "bodyColor": "#fff",
                "borderColor": "rgba(51, 65, 107, 1)",
                "bodyTextAlign": "center",
                "column": [
                    {
                        "label": "产品",
                        "prop": "productName",
                        "$index": 0,
                        "$hide": ""
                    },
                    {
                        "label": "生产订单量",
                        "prop": "planNumberSum",
                        "$index": 1,
                        "$hide": ""
                    },
                    {
                        "label": "实际完工数量",
                        "prop": "jobBookingNumSum",
                        "$index": 2,
                        "$hide": ""
                    },
                    {
                        "label": "良品率",
                        "prop": "yieldRate",
                        "$index": 3,
                        "$hide": ""
                    }
                ],
                "align": "center",
                "headerAlign": "center",
                "header": false,
                "scroll": true,
                "scrollTime": 2000,
                "fontSize": 15,
                "count": 8,
                "nthColor": "rgba(0,50,142,0.20)",
                "othColor": "",
                "index": false,
                "scrollCount": 1,
                "menu": false
            },
            "index": "8fb65708-5c5f-4b13-8873-c4b0b9d5228b",
            "zIndex": 6
        },
        {
            "name": "考核指标",
            "title": "柱状图",
            "icon": "icon-bar",
            "img": "/img/bar.179e480c.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${mes}/productionplan/getProductionPlanBI`,
            "dataFormatter": "(res)=>{\r\n var info={categories:res.data.assessmentIndexResp.map((el) => el.months),\r\n  series:[{data:res.data.assessmentIndexResp.map((el) => el.planNumberSum)}]} \r\n  return info\r\n}",
            "time": 60000,
            "data": {
                "categories":[],
                "series": [
                    {
                        "data": []
                    }
                ]
            },
            "stylesFormatter": "",   
            "component": {
                "width": 822.44,
                "height": 300,
                "name": "bar",
                "prop": "bar"
            },
            "option": {
                "gridX": 90,
                "gridY": 0,
                "gridX2": 0,
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
                "barWidth": 28,
                "barRadius": 3,
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
                "barMinHeight": 2
            },
            "left": 537.84,
            "top": 247.34,
            "index": "089d5496-fc90-4483-80fe-e69fa6e7983d",
            "zIndex": 5
        },
        {
            "title": "表格",
            "name": "工单完成比率",
            "icon": "icon-table",
            "img": "/img/table.215c94c3.png",
            "top": 297.14,
            "left": 26.56,
            "dataType": 1,
            "dataMethod": "get",
            "url": `${mes}/productionplan/getProductionPlanBI`,
            "dataFormatter": "(res)=>{\r\n var list=res.data.workOrderCompletionRate\r\n  return list\r\n}",
            "time": 60000,
            "data": [],
            "stylesFormatter": "",
            "component": {
                "width": 451.86,
                "height": 693.02,
                "name": "table",
                "prop": "table"
            },
            "option": {
                "showHeader": false,
                "columnShow": false,
                "columnViews": true,
                "headerBackground": "#00328E",
                "headerColor": "#fff",
                "headerTextAlign": "center",
                "bodyBackground": "rgba(0, 0, 0, 0.01)",
                "bodyColor": "#fff",
                "borderColor": "rgba(51, 65, 107, 1)",
                "bodyTextAlign": "center",
                "column": [
                    {
                        "label": "工单编号",
                        "prop": "productionOrdersEncode",
                        "$index": 0,
                        "$hide": "",
                        "width": 160
                    },
                    {
                        "label": "计划生产数量",
                        "prop": "planNumberSum",
                        "$index": 1,
                        "$hide": "",

                    },
                    {
                        "label": "总产量",
                        "prop": "jobBookingNumSum",
                        "$index": 2,
                        "$hide": "",

                    },
                    {
                        "label": "百分比",
                        "prop": "percentage",
                        "$index": 3,
                        "$hide": "",

                    }
                ],
                "align": "center",
                "headerAlign": "center",
                "header": false,
                "scroll": true,
                "scrollTime": 2000,
                "fontSize": 15,
                "count": 10,
                "nthColor": "rgba(0,50,142,0.20)",
                "othColor": "",
                "index": false,
                "scrollCount": 1,
                "menu": false
            },
            "index": "8766c642-ba35-4a6e-8751-ab86174efcd9",
            "zIndex": 4
        },
        {
            "title": "文本框",
            "name": "良品率",
            "icon": "icon-text",
            "img": "/img/text.852a3c54.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${mes}/productionplan/getProductionPlanBI`,
            "dataFormatter": "(res)=>{  return {\r\n  value:res.data.yieldRate+'%'\r\n  }\r\n}",
            "time": 60000,
            "stylesFormatter": "",
            "data": {
                "value":"0"
            },
            "component": {
                "width": 125.52,
                "height": 40,
                "name": "text",
                "prop": "text"
            },
            "option": {
                "textAlign": "center",
                "fontSize": 28,
                "fontWeight": "normal",
                "color": "#fff",
                "split": 0,
                "lineHeight": 0
            },
            "left": 1153.04,
            "top": 138.04,
            "index": "05cf1134-bf98-4f8a-82bd-784ddf7952c9",
            "zIndex": 3
        },
        {
            "title": "文本框",
            "name": "产量达成率",
            "icon": "icon-text",
            "img": "/img/text.852a3c54.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${mes}/productionplan/getProductionPlanBI`,
            "dataFormatter": "(res)=>{  return {\r\n  value:res.data.productAchievementRate+'%'\r\n  }\r\n}",
            "time": 60000,
            "stylesFormatter": "",
            "data": {
                "value": "0"
            },
            "component": {
                "width": 125.52,
                "height": 40,
                "name": "text",
                "prop": "text"
            },
            "option": {
                "textAlign": "center",
                "fontSize": 28,
                "fontWeight": "normal",
                "color": "#fff",
                "split": 0,
                "lineHeight": 0
            },
            "left": 800.4,
            "top": 138.04,
            "index": "9be6eb04-d2e8-4397-9bc9-77729c72393f",
            "zIndex": 2
        },
        {
            "title": "文本框",
            "name": "实际完工数量",
            "icon": "icon-text",
            "img": "/img/text.852a3c54.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${mes}/productionplan/getProductionPlanBI`,
            "dataFormatter": "(res)=>{  return {\r\n  value:res.data.jobBookingNumSum\r\n  }\r\n}",
            "time": 60000,
            "stylesFormatter": "",
            "data": {
                "value": "0"
            },
            "component": {
                "width": 125.52,
                "height": 40,
                "name": "text",
                "prop": "text"
            },
            "option": {
                "textAlign": "center",
                "fontSize": 28,
                "fontWeight": "normal",
                "color": "#fff",
                "split": 0,
                "lineHeight": 0
            },
            "left": 461.68,
            "top": 138.04,
            "index": "7b57cec9-8db4-45b8-af6e-ebf91c817ba3",
            "zIndex": 1
        },
        {
            "title": "文本框",
            "name": "计划生产数量",
            "icon": "icon-text",
            "img": "/img/text.852a3c54.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${mes}/productionplan/getProductionPlanBI`,
            "dataFormatter": "(res)=>{  return {\r\n  value:res.data.planNumberSum\r\n  }\r\n}",
            "time": 60000,
            "stylesFormatter": "",
            "data": {
                "value":"0"
            },
            "component": {
                "width": 125.52,
                "height": 40,
                "name": "text",
                "prop": "text"
            },
            "option": {
                "textAlign": "center",
                "fontSize": 28,
                "fontWeight": "normal",
                "color": "#fff",
                "split": 0,
                "lineHeight": 0
            },
            "left": 114.84,
            "top": 139.2,
            "index": "0d9015fd-6810-4ed3-8f9d-54a0ee4b3ee8",
            "zIndex": 0
        }
    ]
}