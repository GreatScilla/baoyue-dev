const data = function getData() {
    let tenantId = JSON.parse(localStorage.getItem("saber-tenantId")).content
    let authorization = JSON.parse(localStorage.getItem("saber-Authorization")).content
    let bladeAuth = JSON.parse(localStorage.getItem("saber-token")).content
    let headers = {
        "Tenant-Id": tenantId,
        "Authorization": authorization,
        "Blade-Auth": "bearer " + bladeAuth
    }
    var data = null;
    var data1 = null;
    var data2 = null;
    var data3 = null;
    //这家公司后端老为难前端。。。。。
    $.ajax({
        type: "get",
        data: {},
        headers: headers,
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded',
        processData: true,
        url: '/api/blade-erp/infoWarn/getStockWarningInfo',
        cache: false,
        async: false,
        success: function (result) {
            if (result.success) {
                let arr
                arr = result.data
                let obj = {};
                // 将数组转化为对象
                for (let key in arr) {
                    obj[key] = arr[key];
                }
                data1 = Object.keys(obj).map(val => ({
                    data: obj[val]
                }));

            }
        },
        error: function () {
        }
    });
    $.ajax({
        type: "get",
        data: {},
        headers: headers,
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded',
        processData: true,
        url: '/api/blade-rcm/tagIndex/getDeviceWarningInfo',
        cache: false,
        async: false,
        success: function (result) {
            if (result.success) {
                let arr
                arr = result.data
                let obj = {};
                // 将数组转化为对象
                for (let key in arr) {
                    obj[key] = arr[key];
                }
                data2 = Object.keys(obj).map(val => ({
                    data: obj[val]
                }));

            }
        },
        error: function () {
        }
    });
    $.ajax({
        type: "get",
        data: {},
        headers: headers,
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded',
        processData: true,
        url: '/api/blade-erp/projectManager/getCustomerFinanceWarningInfo',
        cache: false,
        async: false,
        success: function (result) {
            if (result.success) {
                let arr
                arr = result.data
                let obj = {};
                // 将数组转化为对象
                for (let key in arr) {
                    obj[key] = arr[key];
                }
                data3 = Object.keys(obj).map(val => ({
                    data: obj[val]
                }));

            }
        },
        error: function () {
        }
    });
    data = data1.concat(data2.concat(data3));
    return data;
}()

const systemMsg = function systemMsg() {
    var systemMsgList = {
        cpu: "",
        disk: "",
        mem: "",
    }
    let tenantId = JSON.parse(localStorage.getItem("saber-tenantId")).content
    let authorization = JSON.parse(localStorage.getItem("saber-Authorization")).content
    let bladeAuth = JSON.parse(localStorage.getItem("saber-token")).content
    let headers = {
        "Tenant-Id": tenantId,
        "Authorization": authorization,
        "Blade-Auth": "bearer " + bladeAuth
    }
    $.ajax({
        type: "get",
        data: {},
        headers: headers,
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded',
        processData: true,
        url: '/api/blade-base/linuxState/get',
        cache: false,
        async: false,
        success: function (result) {
            systemMsgList.cpu = 100 - result.cpu
            systemMsgList.disk = result.disk * 100
            systemMsgList.mem = result.mem / 10
        },
        error: function (err) {
        }
    });
    return systemMsgList;
}()
const option = {
    "detail": {
        "name": "by智能化",
        "width": 1920,
        "height": 1080,
        "scale": 52.39583333333333,
        "backgroundImage": "https://oss.bladex.vip/caster/upload/20211018/e99da202b8b9b8443d2d2338067eb0b7.jpeg",
        "url": "",
        "mark": {},
        "gradeShow": false,
        "gradeLen": 30,
        "query": {}
    },
    "component": [
        {
            "name": "实时时间",
            "title": "实时时间",
            "icon": "icon-datetime",
            "top": 25.35,
            "left": 1694.37,
            "component": {
                "width": 250,
                "height": 50,
                "name": "datetime",
                "prop": "datetime"
            },
            "option": {
                "format": "yyyy-MM-dd hh:mm:ss",
                "color": "#fff",
                "textAlign": "justify",
                "fontSize": 18,
                "opacity": 1,
                "fontWeight": "400"
            },
            "index": "78046c1a-d9f2-431f-8c49-d765643344c4",
            "zIndex": 1,
            "display": false
        },
        {
            "title": "表格",
            "name": "表格",
            "icon": "icon-table",
            "img": "/img/table.215c94c3.png",
            "left": 30.53,
            "top": 146.9,
            "dataType": 1,
            "data": [],
            "time": 60000,
            "dataMethod": "get",
            "url": `${erp}/stockTaking/getRawMaterialBi`,
            "dataFormatter": "(res)=>{\r\n var list=res.data\r\n  return list\r\n}",
            "stylesFormatter": "",
            "component": {
                "width": 459.72,
                "height": 230,
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
                        "$hide": "显示",
                        "label": "类型名称",
                        "prop": "productCategoryName",
                        "width": "",
                        "hide": false,
                        "$index": 0
                    },
                    {
                        "$hide": "显示",
                        "label": "入库数",
                        "prop": "operNumber",
                        "width": "",
                        "hide": true,
                        "$index": 1
                    },
                    {
                        "$hide": "显示",
                        "label": "现存量",
                        "prop": "stock",
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
                "count": 6,
                "nthColor": "#00328E",
                "othColor": "",
                "index": false,
                "scrollCount": 1,
                "menu": false,
                "showHeader": false
            },
            "index": "8d90742a-c03e-4f05-8b08-872795f6179f",
            "zIndex": 14,
            "display": false,
        },
        {
            "title": "文本框",
            "name": "板材1",
            "icon": "icon-text",
            "img": "/img/text.852a3c54.png",
            "dataType": 1,
            "dataMethod": "post",
            "url": `${erp}/depotHead/pagePanelAndBlock`,
            "dataFormatter": "(res)=>{ return {\r\n  value:res.data.panelIncoming\r\n  }\r\n }",
            "time": 60000,
            "stylesFormatter": "",
            "data": {
                "value": ""
            },
            "component": {
                "width": 100,
                "height": 26.65,
                "name": "text",
                "prop": "text"
            },
            "option": {
                "textAlign": "center",
                "fontSize": 21,
                "fontWeight": "normal",
                "color": "#fff",
                "split": 0,
                "lineHeight": 27
            },
            "left": 57.85,
            "top": 504.63,
            "index": "0ab31c4b-ccc0-473b-8977-2eceea6129c6",
            "zIndex": 24
        },
        {
            "title": "文本框",
            "name": "板材2",
            "icon": "icon-text",
            "img": "/img/text.852a3c54.png",
            "dataType": 1,
            "dataMethod": "post",
            "url": `${erp}/depotHead/pagePanelAndBlock`,
            "dataFormatter": "(res)=>{ return {\r\n  value:res.data.panelScrap\r\n  }\r\n }",
            "stylesFormatter": "",
            "data": {
                "value": ""
            },
            "component": {
                "width": 100,
                "height": 26.65,
                "name": "text",
                "prop": "text"
            },
            "option": {
                "textAlign": "center",
                "fontSize": 21,
                "fontWeight": "normal",
                "color": "#FF4949",
                "split": 0,
                "lineHeight": 27
            },
            "left": 210.93,
            "top": 504.63,
            "index": "cb2b4dd9-c2ac-4ed7-b830-99222fb23e60",
            "zIndex": 23
        },
        {
            "title": "文本框",
            "name": "板材3",
            "icon": "icon-text",
            "img": "/img/text.852a3c54.png",
            "dataType": 1,
            "dataMethod": "post",
            "url": `${erp}/depotHead/pagePanelAndBlock`,
            "dataFormatter": "(res)=>{ return {\r\n  value:res.data.panelOutbound\r\n  }\r\n }",
            "stylesFormatter": "",
            "data": {
                "value": ""
            },
            "component": {
                "width": 100,
                "height": 26.65,
                "name": "text",
                "prop": "text"
            },
            "option": {
                "textAlign": "center",
                "fontSize": 21,
                "fontWeight": "normal",
                "color": "#34C658",
                "split": 0,
                "lineHeight": 27
            },
            "left": 363.12,
            "top": 504.63,
            "index": "24b9f720-34ed-46ea-8173-001510f36d12",
            "zIndex": 22
        },
        {
            "title": "文本框",
            "name": "砌块1",
            "icon": "icon-text",
            "img": "/img/text.852a3c54.png",
            "dataType": 1,
            "dataMethod": "post",
            "url": `${erp}/depotHead/pagePanelAndBlock`,
            "dataFormatter": "(res)=>{ return {\r\n  value:res.data.blockIncoming\r\n  }\r\n }",
            "stylesFormatter": "",
            "data": {
                "value": "22223"
            },
            "component": {
                "width": 100,
                "height": 26.65,
                "name": "text",
                "prop": "text"
            },
            "option": {
                "textAlign": "center",
                "fontSize": 21,
                "fontWeight": "normal",
                "color": "#fff",
                "split": 0,
                "lineHeight": 27
            },
            "left": 57.85,
            "top": 617.66,
            "index": "20ac3c4c-c9b2-4f7d-8acb-92c00c166db3",
            "zIndex": 21
        },
        {
            "title": "文本框",
            "name": "砌块2",
            "icon": "icon-text",
            "img": "/img/text.852a3c54.png",
            "dataType": 1,
            "dataMethod": "post",
            "url": `${erp}/depotHead/pagePanelAndBlock`,
            "dataFormatter": "(res)=>{ return {\r\n  value:res.data.blockScrap\r\n  }\r\n }",
            "stylesFormatter": "",
            "data": {
                "value": "22223"
            },
            "component": {
                "width": 100,
                "height": 26.65,
                "name": "text",
                "prop": "text"
            },
            "option": {
                "textAlign": "center",
                "fontSize": 21,
                "fontWeight": "normal",
                "color": "#FF4949",
                "split": 0,
                "lineHeight": 27
            },
            "left": 210.93,
            "top": 619.44,
            "index": "df3e93c2-1084-4a25-8929-f983d11725b1",
            "zIndex": 20
        },
        {
            "title": "文本框",
            "name": "砌块3",
            "icon": "icon-text",
            "img": "/img/text.852a3c54.png",
            "dataType": 1,
            "dataMethod": "post",
            "url": `${erp}/depotHead/pagePanelAndBlock`,
            "dataFormatter": "(res)=>{ return {\r\n  value:res.data.blockOutbound\r\n  }\r\n }",
            "stylesFormatter": "",
            "data": {
                "value": "22223"
            },
            "component": {
                "width": 100,
                "height": 26.65,
                "name": "text",
                "prop": "text"
            },
            "option": {
                "textAlign": "center",
                "fontSize": 21,
                "fontWeight": "normal",
                "color": "#34C658",
                "split": 0,
                "lineHeight": 27
            },
            "left": 364.01,
            "top": 617.66,
            "index": "5c5e1f98-7d7d-47ce-a308-6ee90ef71728",
            "zIndex": 19
        },
        {
            "title": "表格",
            "name": "报警消息提示",
            "icon": "icon-table",
            "img": "/img/table.215c94c3.png",
            "top": 775.19,
            "left": 25.81,
            "dataType": 0,
            "data": data,
            // "dataMethod": "get",
            // "url": `${erp}/stockWarning/pageBi`,
            // "dataFormatter": "(res)=>{\r\n var list=res.data\r\n  return list\r\n}",
            "dataFormatter": "",
            "time": 60000,
            "stylesFormatter": "",
            "component": {
                "width": 466.18,
                "height": 224.92,
                "name": "table",
                "prop": "table"
            },
            "option": {
                "showHeader": false,
                "columnShow": false,
                "columnViews": false,
                "headerBackground": "rgba(30, 144, 255, 1)",
                "headerColor": "rgba(241, 242, 245, 1)",
                "headerTextAlign": "center",
                "bodyBackground": "rgba(0, 0, 0, 0.01)",
                "bodyColor": "#fff",
                "borderColor": "rgba(51, 65, 107, 1)",
                "bodyTextAlign": "center",
                "column": [
                    {
                        "$hide": "显示",
                        "label": "",
                        "prop": "data",
                        "width": "",
                        "hide": false,
                        "$index": 0
                    }
                ],
                "align": "center",
                "headerAlign": "center",
                "header": false,
                "scroll": true,
                "scrollTime": 2000,
                "fontSize": 15,
                "count": 7,
                "nthColor": "",
                "othColor": "",
                "index": false,
                "scrollCount": 1,
                "menu": false
            },
            "index": "130288d7-afb3-45f0-84e6-08dc5ebac415",
            "zIndex": 18
        },
        // {
        //     "title": "图片",
        //     "name": "图片",
        //     "icon": "icon-img",
        //     "img": "/img/img.97e50755.png",
        //     "top": 146.29,
        //     "left": 543.32,
        //     "dataType": 0,
        //     "data": {
        //         "value": "https://oss.bladex.vip/caster/upload/20210929/f376b8a780dfe4b37939dbd1fc034d14.png"
        //     },
        //     "dataFormatter": "",
        //     "stylesFormatter": "",
        //     "component": {
        //         "width": 807.06,
        //         "height": 535,
        //         "name": "img",
        //         "prop": "img"
        //     },
        //     "option": {
        //         "duration": "1000",
        //         "opacity": 0
        //     },
        //     "index": "2f3b4382-a28e-46b2-be56-298198df3a2d",
        //     "zIndex": 1
        // },
        {
            "title": "iframe",
            "name": "3d车间模型",
            "icon": "icon-iframe",
            "img": "/img/iframe.684f665e.png",
            "top": 146.29,
            "left": 543.32,
            "component": {
                "width": 809,
                "height": 535,
                "option": {},
                "name": "iframe",
                "prop": "iframe"
            },
            "option": {},
            "dataType": 0,
            "data": {
                "value": "../equipment3DData/index1.html"
                // "value": ""
            },
            "dataFormatter": "",
            "stylesFormatter": "",
            "index": "48907d3e-158d-44c1-8d25-a8c34dd6fc72",
            "zIndex": 17
        },
        {
            "title": "表格",
            "name": "车间报警",
            "icon": "icon-table",
            "img": "/img/table.215c94c3.png",
            "top": 546.19,
            "left": 554.81,
            "dataType": 1,
            "data": [],
            // "dataMethod": "get",
            // "url": `${erp}/stockWarning/pageBi`,
            // "dataFormatter": "(res)=>{\r\n var list=res.data\r\n  return list\r\n}",
            "time": 60000,
            "stylesFormatter": "",
            "component": {
                "width": 787.18,
                "height": 133.44,
                "name": "table",
                "prop": "table"
            },
            "option": {
                "showHeader": false,
                "columnShow": false,
                "columnViews": false,
                "headerBackground": "rgba(30, 144, 255, 1)",
                "headerColor": "rgba(241, 242, 245, 1)",
                "headerTextAlign": "center",
                "bodyBackground": "rgba(0, 0, 0, 0.01)",
                "bodyColor": "#fff",
                "borderColor": "rgba(51, 65, 107, 1)",
                "bodyTextAlign": "center",
                "column": [
                    {
                        "$hide": "显示",
                        "label": "",
                        "prop": "type1",
                        "width": "",
                        "hide": false,
                        "$index": 0
                    }
                ],
                "align": "center",
                "headerAlign": "center",
                "header": false,
                "scroll": true,
                "scrollTime": 2000,
                "fontSize": 15,
                "count": 4,
                "nthColor": "",
                "othColor": "",
                "index": false,
                "scrollCount": 1,
                "menu": false
            },
            "index": "3e2001b0-17df-46f0-bd4e-3bf6e714bdb5",
            "zIndex": 16
        },
        {
            "title": "iframe",
            "name": "3d车间模型",
            "icon": "icon-iframe",
            "img": "/img/iframe.684f665e.png",
            "left": 527,
            "top": 725.84,
            "component": {
                "width": 845,
                "height": 290,
                "option": {},
                "name": "iframe",
                "prop": "iframe"
            },
            "option": {},
            "dataType": 0,
            "data": {
                "value": "./index1.html"
            },
            "time": 60000,
            "dataFormatter": "",
            "stylesFormatter": "",
            "index": "48907d3e-158d-44c1-8d25-a8c34dd6fc72",
            "zIndex": 17
        },
        // {
        //     "name": "生产曲线",
        //     "title": "折线图",
        //     "icon": "icon-line",
        //     "img": "/img/line.d9ed6cf6.png",
        //     "dataType": 1,
        //     "dataMethod": "get",
        //     "url": `${mes}/jobBooking/getJobBookingBi`,
        //     "data": {
        //         "categories": [],
        //         "series": []
        //     },
        //     "dataFormatter": "(res)=>{\r\n var info={categories:res.map((el) => el.date),\r\n  series:[{data:res.map((el) => el.purchaseOrderSum)}]} \r\n  return info\r\n}",
        //     "stylesFormatter": "",
        //     "time": 0,
        //     "component": {
        //         "width": 850.32,
        //         "height": 300,
        //         "name": "line",
        //         "prop": "line"
        //     },
        //     "option": {
        //         "gridX": 90,
        //         "gridY": 0,
        //         "gridX2": 0,
        //         "gridY2": 0,
        //         "nameColor": "#eee",
        //         "lineColor": "#eee",
        //         "lineWidth": 3,
        //         "xNameFontSize": 16,
        //         "yNameFontSize": 16,
        //         "labelShow": false,
        //         "labelShowFontSize": 14,
        //         "labelShowFontWeight": 300,
        //         "yAxisInverse": false,
        //         "xAxisInverse": false,
        //         "xAxisShow": true,
        //         "yAxisShow": true,
        //         "xAxisSplitLineShow": false,
        //         "yAxisSplitLineShow": false,
        //         "barWidth": 30,
        //         "barRadius": 8,
        //         "barColor": [
        //             {
        //                 "color1": "#2F3DE9",
        //                 "color2": "rgba(88,193,244,0)",
        //                 "postion": 90,
        //                 "$index": 0,
        //                 "_show": true
        //             },
        //             {
        //                 "color1": "#34C658",
        //                 "color2": " rgba(52,198,88,0.6)",
        //                 "postion": 50,
        //                 "$index": 1,
        //                 "_show": true
        //             }
        //         ],
        //         "symbolSize": 3,
        //         "smooth": true,
        //         "barMinHeight": 2,
        //         "legend": true,
        //         "areaStyle": true
        //     },
        //     "left": 500.52,
        //     "top": 739.84,
        //     "index": "6a2c4f0e-ebba-451e-b301-608b1f2938bc",
        //     "zIndex": 15
        // },
        {
            "title": "表格",
            "name": "日志",
            "icon": "icon-table",
            "img": "/img/table.215c94c3.png",
            "top": 154.51,
            "left": 1407.53,
            "dataType": 1,
            "data": [],
            "dataMethod": "get",
            "url": `${log}/logApi/pageList`,
            "dataFormatter": "(res)=>{\r\n var list=res.data.records\r\n  return list\r\n}",
            "time": 60000,
            "stylesFormatter": "",
            "component": {
                "width": 459.42,
                "height": 530.56,
                "name": "table",
                "prop": "table"
            },
            "option": {
                "showHeader": false,
                "columnShow": false,
                "columnViews": false,
                "headerBackground": "rgba(30, 144, 255, 1)",
                "headerColor": "rgba(241, 242, 245, 1)",
                "headerTextAlign": "center",
                "bodyBackground": "rgba(0, 0, 0, 0.01)",
                "bodyColor": "#fff",
                "borderColor": "rgba(51, 65, 107, 1)",
                "bodyTextAlign": "center",
                "column": [
                    {
                        "$hide": "显示",
                        "label": "",
                        "prop": "data",
                        "width": "",
                        "hide": false,
                        "$index": 0
                    }
                ],
                "align": "center",
                "headerAlign": "center",
                "header": false,
                "scroll": true,
                "scrollTime": 2000,
                "fontSize": 15,
                "count": 10,
                "nthColor": "",
                "othColor": "",
                "index": false,
                "scrollCount": 1,
                "menu": false
            },
            "index": "c8cdc4db-39b0-4f41-823e-e97c64424c58",
            "zIndex": 10
        },
        {
            "title": "环形图",
            "name": "磁盘空间1",
            "icon": "icon-circle",
            "img": "/img/progress.2d32f6f3.png",
            "top": 840,
            "left": 1420,
            "data": {
                "label": "CPU使用率(%)",
                "value": systemMsg.cpu,
                "data": systemMsg.cpu
            },
            "dataType": 0,
            // "dataMethod": "get",
            // "url": `${linux}/linuxState/get`,
            // "dataFormatter": "(res)=>{ return {\r\n  value:res.data.disk\r\n  }\r\n }",
            "time": 60000,
            "stylesFormatter": "",
            "component": {
                "width": 122.88,
                "height": 124.24,
                "name": "progress",
                "prop": "progress"
            },
            "option": {
                "type": "circle",
                "strokeWidth": 8,
                "color": "#fff",
                "fontSize": 20,
                "fontWeight": "normal",
                "suffixColor": "#fff",
                "suffixFontSize": 14,
                "suffixFontWeight": "normal",
                "borderColor": "#0B74B7",
                "split": 0,
                "width": 400,
                "height": 80
            },
            "index": "6000c79b-150e-43a5-85f2-5a97b8685f9f",
            "zIndex": 9
        },
        // {
        //     "title": "环形图",
        //     "name": "系统温度1",
        //     "icon": "icon-circle",
        //     "img": "/img/progress.2d32f6f3.png",
        //     "top": 856.68,
        //     "left": 1539.52,
        //     "dataType": 0,
        //     "data": {
        //         "label": "磁盘空间",
        //         "value": 40,
        //         "data": 80
        //     },
        //     "dataFormatter": "",
        //     "stylesFormatter": "",
        //     "component": {
        //         "width": 72.88,
        //         "height": 74.24,
        //         "name": "progress",
        //         "prop": "progress"
        //     },
        //     "option": {
        //         "type": "circle",
        //         "strokeWidth": 3,
        //         "color": "#fff",
        //         "fontSize": 12,
        //         "fontWeight": "normal",
        //         "suffixColor": "#fff",
        //         "suffixFontSize": 12,
        //         "suffixFontWeight": "normal",
        //         "borderColor": "#58C1F4",
        //         "split": 0,
        //         "width": 400,
        //         "height": 80
        //     },
        //     "index": "6663efa0-df35-430e-82ba-10d9e12ff3e0",
        //     "zIndex": 8
        // },
        {
            "title": "环形图",
            "name": "cpu1",
            "icon": "icon-circle",
            "img": "/img/progress.2d32f6f3.png",
            "top": 840,
            "left": 1575,
            "dataType": 0,
            "data": {
                "label": "磁盘空间(GB)",
                "value": systemMsg.disk,
                "data": systemMsg.disk,
            },
            "dataFormatter": "",
            "stylesFormatter": "",
            "component": {
                "width": 122.88,
                "height": 124.24,
                "name": "progress",
                "prop": "progress"
            },
            "option": {
                "type": "circle",
                "strokeWidth": 8,
                "color": "#fff",
                "fontSize": 20,
                "fontWeight": "normal",
                "suffixColor": "#fff",
                "suffixFontSize": 14,
                "suffixFontWeight": "normal",
                "borderColor": "#B366EF",
                "split": 0,
                "width": 400,
                "height": 80
            },
            "index": "77157570-6d5f-4916-8da6-721ba04ecd3a",
            "zIndex": 7
        },
        // {
        //     "title": "环形图",
        //     "name": "内存1",
        //     "icon": "icon-circle",
        //     "img": "/img/progress.2d32f6f3.png",
        //     "top": 857.04,
        //     "left": 1787.04,
        //     "dataType": 0,
        //     "data": {
        //         "label": "磁盘空间",
        //         "value": 40,
        //         "data": 80
        //     },
        //     "dataFormatter": "",
        //     "stylesFormatter": "",
        //     "component": {
        //         "width": 72.88,
        //         "height": 74.24,
        //         "name": "progress",
        //         "prop": "progress"
        //     },
        //     "option": {
        //         "type": "circle",
        //         "strokeWidth": 3,
        //         "color": "#fff",
        //         "fontSize": 12,
        //         "fontWeight": "normal",
        //         "suffixColor": "#fff",
        //         "suffixFontSize": 12,
        //         "suffixFontWeight": "normal",
        //         "borderColor": "#B366EF",
        //         "split": 0,
        //         "width": 400,
        //         "height": 80
        //     },
        //     "index": "34c9d330-c706-4633-b7e8-3bc1f261b7bb",
        //     "zIndex": 6
        // },
        // {
        //     "title": "环形图",
        //     "name": "磁盘空间2",
        //     "icon": "icon-circle",
        //     "img": "/img/progress.2d32f6f3.png",
        //     "top": 928.68,
        //     "left": 1418.84,
        //     "dataType": 0,
        //     "data": {
        //         "label": "磁盘空间",
        //         "value": 40,
        //         "data": 80
        //     },
        //     "dataFormatter": "",
        //     "stylesFormatter": "",
        //     "component": {
        //         "width": 72.88,
        //         "height": 74.24,
        //         "name": "progress",
        //         "prop": "progress"
        //     },
        //     "option": {
        //         "type": "circle",
        //         "strokeWidth": 3,
        //         "color": "#fff",
        //         "fontSize": 12,
        //         "fontWeight": "normal",
        //         "suffixColor": "#fff",
        //         "suffixFontSize": 12,
        //         "suffixFontWeight": "normal",
        //         "borderColor": "#0B74B7",
        //         "split": 0,
        //         "width": 400,
        //         "height": 80
        //     },
        //     "index": "cdd18b4c-2a2c-4eae-8720-44d3b57a392d",
        //     "zIndex": 5
        // },
        // {
        //     "title": "环形图",
        //     "name": "系统温度2",
        //     "icon": "icon-circle",
        //     "img": "/img/progress.2d32f6f3.png",
        //     "top": 926.68,
        //     "left": 1539.52,
        //     "dataType": 0,
        //     "data": {
        //         "label": "磁盘空间",
        //         "value": 40,
        //         "data": 80
        //     },
        //     "dataFormatter": "",
        //     "stylesFormatter": "",
        //     "component": {
        //         "width": 72.88,
        //         "height": 74.24,
        //         "name": "progress",
        //         "prop": "progress"
        //     },
        //     "option": {
        //         "type": "circle",
        //         "strokeWidth": 3,
        //         "color": "#fff",
        //         "fontSize": 12,
        //         "fontWeight": "normal",
        //         "suffixColor": "#fff",
        //         "suffixFontSize": 12,
        //         "suffixFontWeight": "normal",
        //         "borderColor": "#58C1F4",
        //         "split": 0,
        //         "width": 400,
        //         "height": 80
        //     },
        //     "index": "9d202d99-67fe-4b02-82cd-77449479c6a2",
        //     "zIndex": 4
        // },
        // {
        //     "title": "环形图",
        //     "name": "cpu2",
        //     "icon": "icon-circle",
        //     "img": "/img/progress.2d32f6f3.png",
        //     "top": 928.04,
        //     "left": 1668.36,
        //     "dataType": 0,
        //     "data": {
        //         "label": "磁盘空间",
        //         "value": 40,
        //         "data": 80
        //     },
        //     "dataFormatter": "",
        //     "stylesFormatter": "",
        //     "component": {
        //         "width": 72.88,
        //         "height": 74.24,
        //         "name": "progress",
        //         "prop": "progress"
        //     },
        //     "option": {
        //         "type": "circle",
        //         "strokeWidth": 3,
        //         "color": "#fff",
        //         "fontSize": 12,
        //         "fontWeight": "normal",
        //         "suffixColor": "#fff",
        //         "suffixFontSize": 12,
        //         "suffixFontWeight": "normal",
        //         "borderColor": "#58C794",
        //         "split": 0,
        //         "width": 400,
        //         "height": 80
        //     },
        //     "index": "45b2dc96-05a5-46d3-871f-e79eae37a1e3",
        //     "zIndex": 3
        // },
        {
            "title": "环形图",
            "name": "内存2",
            "icon": "icon-circle",
            "img": "/img/progress.2d32f6f3.png",
            "top": 840,
            "left": 1730,
            "dataType": 0,
            "data": {
                "label": "内存使用率(%)",
                "value": systemMsg.mem,
                "data": systemMsg.mem
            },
            "dataFormatter": "",
            "stylesFormatter": "",
            "component": {
                "width": 122.88,
                "height": 124.24,
                "name": "progress",
                "prop": "progress"
            },
            "option": {
                "type": "circle",
                "strokeWidth": 8,
                "color": "#fff",
                "fontSize": 20,
                "fontWeight": "normal",
                "suffixColor": "#fff",
                "suffixFontSize": 14,
                "suffixFontWeight": "normal",
                "borderColor": "#58C794",
                "split": 0,
                "width": 400,
                "height": 80
            },
            "index": "7f6aca47-52d9-49d7-a29a-800841c9c3c0",
            "zIndex": 2,
            "time": 35

        },
        {
            "title": "文本框",
            "name": "文本框",
            "icon": "icon-text",
            "img": "/img/text.852a3c54.png",
            "dataType": 0,
            "dataFormatter": "",
            "stylesFormatter": "",
            "data": {
                "value": "服务器01"
            },
            "component": {
                "width": 76,
                "height": 24,
                "name": "text",
                "prop": "text"
            },
            "option": {
                "textAlign": "center",
                "fontSize": 18,
                "fontWeight": "normal",
                "color": "#fff",
                "split": 0,
                "lineHeight": 21
            },
            "left": 1410,
            "top": 800,
            "index": "6dc77e0b-5657-4bd6-8c4b-74a771643604",
            "zIndex": 1
        },
        // {
        //     "title": "文本框",
        //     "name": "文本框",
        //     "icon": "icon-text",
        //     "img": "/img/text.852a3c54.png",
        //     "dataType": 0,
        //     "dataFormatter": "",
        //     "stylesFormatter": "",
        //     "data": {
        //         "value": "服务器02"
        //     },
        //     "component": {
        //         "width": 76,
        //         "height": 24,
        //         "name": "text",
        //         "prop": "text"
        //     },
        //     "option": {
        //         "textAlign": "center",
        //         "fontSize": 18,
        //         "fontWeight": "normal",
        //         "color": "#fff",
        //         "split": 0,
        //         "lineHeight": 21
        //     },
        //     "left": 1413,
        //     "top": 892,
        //     "index": "f5adca7a-c1c4-4890-89d7-862344a120b8",
        //     "zIndex": 0
        // }
    ]
}