let tenantId = JSON.parse(localStorage.getItem("saber-tenantId")).content
const option = {
    "detail": {
        "name": "采购数据分析",
        "width": 1920,
        "height": 1080,
        "scale": 52.39583333333333,
        "backgroundImage": "https://oss.bladex.vip/caster/upload/20210810/c7ffc5afd31167b322226ff1ce27b87c.png",
        "url": "",
        "mark": {},
        "gradeShow": false,
        "gradeLen": 30,
        "query": {}
    },
    "component": [
        {
            "title": "表格",
            "name": "表格",
            "icon": "icon-table",
            "img": "/img/table.215c94c3.png",
            "top": 788.64,
            "left": 1422.52,
            "dataType": 1,
            "data": [],
            "dataMethod": "get",
            "url": `${erp}/purchaseOrder/getPurchaseBI`,
            "dataQuery": `{"tenant":"${tenantId}"}`,
            "dataFormatter": "(res)=>{\r\n var list=res.data.supplierNameList\r\n  return list\r\n}",
            "stylesFormatter": "",
            "component": {
                "width": 436.4,
                "height": 200,
                "name": "table",
                "prop": "table"
            },
            "option": {
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
                        "label": "供应商名称",
                        "prop": "supplierName",
                        "$index": 0,
                        "$hide": ""
                    },
                    {
                        "label": "采购金额",
                        "prop": "totalAmountSum",
                        "$index": 1,
                        "$hide": ""
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
                "menu": false,
                "showHeader": false
            },
            "time": 60000,
            "index": "9face314-8748-45ed-85f2-438779006298",
            "zIndex": 14
        },
        {
            "title": "文本框",
            "name": "原材料库存",
            "icon": "icon-text",
            "img": "/img/text.852a3c54.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${erp}/purchaseOrder/getPurchaseBI`,
            "dataQuery": `{"tenant":"${tenantId}"}`,
            "dataFormatter": "(res)=>{  return {\r\n  value:res.data.inventoryStatisticsResp.rawMaterialSum\r\n  }\r\n}",
            "time": 60000,
            "stylesFormatter": "",
            "data": {
                "value": "0"
            },
            "component": {
                "width": 182.68,
                "height": 40,
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
            "left": 1636.64,
            "top": 599.96,
            "index": "985dcc49-abfc-4297-b1b0-b557618f7fde",
            "zIndex": 13
        },
        {
            "title": "文本框",
            "name": "成品库存",
            "icon": "icon-text",
            "img": "/img/text.852a3c54.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${erp}/purchaseOrder/getPurchaseBI`,
            "dataQuery": `{"tenant":"${tenantId}"}`,
            "dataFormatter": "(res)=>{  return {\r\n  value:res.data.inventoryStatisticsResp.finishedProductSum\r\n  }\r\n}",
            "time": 60000,
            "stylesFormatter": "",
            "data": {
                "value": "0"
            },
            "component": {
                "width": 182.68,
                "height": 40,
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
            "left": 1634.52,
            "top": 485.48,
            "index": "5b9da7f3-5d70-463f-ad16-3066984e6289",
            "zIndex": 12
        },
        {
            "name": "采购退货",
            "title": "折线图",
            "icon": "icon-line",
            "img": "/img/line.d9ed6cf6.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${erp}/purchaseOrder/getPurchaseBI`,
            "dataQuery": `{"tenant":"${tenantId}"}`,
            "dataFormatter": "(res)=>{\r\n var info={categories:res.data.purchaseReturnInfoRespList.map((el) => el.date),\r\n  series:[{data:res.data.purchaseReturnInfoRespList.map((el) => el.purchaseReturnSum)}]} \r\n  return info\r\n}",
            "time": 60000,
            "data": {
                "categories":[],
                "series":[]
            },
            "stylesFormatter": "",
            "component": {
                "width": 504.6,
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
                        "color1": "#34C658",
                        "color2": "#34C658",
                        "postion": 50,
                        "$index": 0,
                        "_show": true
                    }
                ],
                "symbolSize": 3,
                "smooth": true,
                "barMinHeight": 2,
                "areaStyle": true
            },
            "left": 1371.64,
            "top": 112.36,
            "index": "d32489f2-e79e-4c43-9daa-d96c8c50f801",
            "zIndex": 11
        },
        {
            "name": "采购订单",
            "title": "折线图",
            "icon": "icon-line",
            "img": "/img/line.d9ed6cf6.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${erp}/purchaseOrder/getPurchaseBI`,
            "dataQuery": `{"tenant":"${tenantId}"}`,
            "dataFormatter": "(res)=>{\r\n var info={categories:res.data.purchaseOrderInfoRespList.map((el) => el.date),\r\n  series:[{data:res.data.purchaseOrderInfoRespList.map((el) => el.purchaseOrderSum)}]} \r\n  return info\r\n}",
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
                "width": 858.64,
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
            "left": 502.44,
            "top": 742,
            "index": "cbe4ef1e-1ea3-46cb-9581-7ef475666223",
            "zIndex": 10
        },
        {
            "title": "文本框",
            "name": "入库数量",
            "icon": "icon-text",
            "img": "/img/text.852a3c54.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${erp}/purchaseOrder/getPurchaseBI`,
            "dataQuery": `{"tenant":"${tenantId}"}`,
            "dataFormatter": "(res)=>{  return {\r\n  value:res.data.orderBIHomePageResp.operNumberSum\r\n  }\r\n}",
            "time": 60000,
            "stylesFormatter": "",
            "data": {
                "value": "0"
            },
            "component": {
                "width": 89,
                "height": 14,
                "name": "text",
                "prop": "text"
            },
            "option": {
                "textAlign": "center",
                "fontSize": 18,
                "fontWeight": "normal",
                "color": "#fff",
                "split": 0,
                "lineHeight": 13
            },
            "left": 1115.8,
            "top": 304.24,
            "index": "14e1830b-c6d6-4f9b-9056-296411c64bd4",
            "zIndex": 9
        },
        {
            "title": "文本框",
            "name": "入库金额",
            "icon": "icon-text",
            "img": "/img/text.852a3c54.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${erp}/purchaseOrder/getPurchaseBI`,
            "dataQuery": `{"tenant":"${tenantId}"}`,
            "dataFormatter": "(res)=>{  return {\r\n  value:res.data.orderBIHomePageResp.unitTotalPriceSum\r\n  }\r\n}",
            "time": 60000,
            "stylesFormatter": "",
            "data": {
                "value":"0"
            },
            "component": {
                "width": 89,
                "height": 14,
                "name": "text",
                "prop": "text"
            },
            "option": {
                "textAlign": "center",
                "fontSize": 18,
                "fontWeight": "normal",
                "color": "#fff",
                "split": 0,
                "lineHeight": 13
            },
            "left": 965.8,
            "top": 323.24,
            "index": "e533f6b3-8655-4069-afd5-89146d60a109",
            "zIndex": 8
        },
        {
            "title": "文本框",
            "name": "采购总额",
            "icon": "icon-text",
            "img": "/img/text.852a3c54.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${erp}/purchaseOrder/getPurchaseBI`,
            "dataQuery": `{"tenant":"${tenantId}"}`,
            "dataFormatter": "(res)=>{  return {\r\n  value:res.data.orderBIHomePageResp.salePriceSum\r\n  }\r\n}",
            "time": 60000,
            "stylesFormatter": "",
            "data": {
                "value": "0"
            },
            "component": {
                "width": 89,
                "height": 14,
                "name": "text",
                "prop": "text"
            },
            "option": {
                "textAlign": "center",
                "fontSize": 18,
                "fontWeight": "normal",
                "color": "#fff",
                "split": 0,
                "lineHeight": 13
            },
            "left": 775.8,
            "top": 319.24,
            "index": "7a710cee-1c82-43ea-8393-fd6c76d09e3d",
            "zIndex": 7
        },
        {
            "title": "文本框",
            "name": "采购量",
            "icon": "icon-text",
            "img": "/img/text.852a3c54.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${erp}/purchaseOrder/getPurchaseBI`,
            "dataQuery": `{"tenant":"${tenantId}"}`,
            "dataFormatter": "(res)=>{  return {\r\n  value:res.data.orderBIHomePageResp.productQuantitySum\r\n  }\r\n}",
            "time": 60000,
            "stylesFormatter": "",
            "data": {
                "value": "0"
            },
            "component": {
                "width": 89,
                "height": 14,
                "name": "text",
                "prop": "text"
            },
            "option": {
                "textAlign": "center",
                "fontSize": 18,
                "fontWeight": "normal",
                "color": "#fff",
                "split": 0,
                "lineHeight": 13
            },
            "left": 624.8,
            "top": 300.24,
            "index": "4bf0df7c-277f-4ce2-a1d4-b26fd33be93b",
            "zIndex": 6
        },
        {
            "title": "文本框",
            "name": "原材料入库",
            "icon": "icon-text",
            "img": "/img/text.852a3c54.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${erp}/purchaseOrder/getPurchaseBI`,
            "dataQuery": `{"tenant":"${tenantId}"}`,
            "dataFormatter": "(res)=>{  return {\r\n  value:res.data.orderBIHeadResp.rawMaterialEnterSum\r\n  }\r\n}",
            "time": 60000,
            "stylesFormatter": "",
            "data": {
                "value":"0"
            },
            "component": {
                "width": 133.44,
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
            "left": 328.32,
            "top": 914.24,
            "index": "cba401a6-67db-4e2e-8d9a-2cb61a929446",
            "zIndex": 5
        },
        {
            "title": "文本框",
            "name": "原材料出库",
            "icon": "icon-text",
            "img": "/img/text.852a3c54.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${erp}/purchaseOrder/getPurchaseBI`,
            "dataQuery": `{"tenant":"${tenantId}"}`,
            "dataFormatter": "(res)=>{  return {\r\n  value:res.data.orderBIHeadResp.rawMaterialLeaveSum\r\n  }\r\n}",
            "time": 60000,
            "stylesFormatter": "",
            "data": {
                "value": "0"
            },
            "component": {
                "width": 139.84,
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
            "left": 178.52,
            "top": 914.08,
            "index": "93b52333-9d6d-4aaf-bc0d-7bd0e7b58cd3",
            "zIndex": 4
        },
        {
            "title": "文本框",
            "name": "成品入库",
            "icon": "icon-text",
            "img": "/img/text.852a3c54.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${erp}/purchaseOrder/getPurchaseBI`,
            "dataQuery": `{"tenant":"${tenantId}"}`,
            "dataFormatter": "(res)=>{  return {\r\n  value:res.data.orderBIHeadResp.finishedProductEnterSum\r\n  }\r\n}",
            "time": 60000,
            "stylesFormatter": "",
            "data": {
                "value":"0"
            },
            "component": {
                "width": 133.44,
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
            "left": 325.6,
            "top": 797.28,
            "index": "8920aa6a-2c54-4060-8156-baf30ed58804",
            "zIndex": 3
        },
        {
            "title": "文本框",
            "name": "成品出库",
            "icon": "icon-text",
            "img": "/img/text.852a3c54.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${erp}/purchaseOrder/getPurchaseBI`,
            "dataQuery": `{"tenant":"${tenantId}"}`,
            "dataFormatter": "(res)=>{  return {\r\n  value:res.data.orderBIHeadResp.finishedProductLeaveSum\r\n  }\r\n}",
            "time": 60000,
            "stylesFormatter": "",
            "data": {
                "value": "0"
            },
            "component": {
                "width": 139.84,
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
            "left": 174.44,
            "top": 797.12,
            "index": "ab8ed5e4-41da-4e61-bc17-423e46248fd2",
            "zIndex": 2
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
            "data": {
                "categories":[],
                "series": [
                    {
                        "name": "收款",
                        "data":[]
                    },
                    {
                        "name": "付款",
                        "data":[]
                    }
                ]
            },
            "stylesFormatter": "",
            "time": 60000,
            "component": {
                "width": 490.32,
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
                "areaStyle": true,
                "legend": true
            },
            "left": 20,
            "top": 428.24,
            "index": "f911596a-c202-4c8b-8f81-8d9505128780",
            "zIndex": 1
        },
        {
            "name": "月度付款",
            "title": "柱状图",
            "icon": "icon-bar",
            "img": "/img/bar.179e480c.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${finance}/bill/queryHomeBill`,
            "dataFormatter": "(res)=>{\r\n var info={categories:res.data.incomeList.map((el) => el.month),\r\n  series:[{data:res.data.incomeList.map((el) => el.value)}]} \r\n  return info\r\n}",
            "data": {
                "categories": [],
                "series": [
                    {
                        "data": []
                    }
                ]
            },
            "stylesFormatter": "",
            "time": 60000,
            "component": {
                "width": 491.88,
                "height": 293.64,
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
                "barWidth": 20,
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
            "left": 0,
            "top": 122.96,
            "index": "85c40e29-f8fe-4444-96b3-888226b3a3ae",
            "zIndex": 0
        }
    ]
}