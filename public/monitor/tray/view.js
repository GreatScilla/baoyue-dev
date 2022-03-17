
const option ={
    "detail": {
        "name": "by托盘",
        "width": 1920,
        "height": 1080,
        "scale": 52.39583333333333,
        "backgroundImage": "https://oss.bladex.vip/caster/upload/20210913/b1bac02ac742b6f058284d30f99f79e5.png",
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
            "top": 364.64,
            "left": 33.92,
            "dataType": 1,
            "data": [
                {
                    "projectNameA": "数据1"
                },
                {
                    "shipmentsSum": "数据2"
                },
                {
                    "recycleSum": "数据3"
                },
                {
                    "noRecycleSum": "数据4"
                }
            ],
            "dataMethod": "get",
            "url": `${erp}/depotHead/getTrayBI`,
            "dataFormatter": "(res)=>{\r\n var list=res.data.projectTrayBIRespList\r\n  return list\r\n}",
            "time": 60000,
            "stylesFormatter": "",
            "component": {
                "width": 1827.12,
                "height": 628.24,
                "name": "table",
                "prop": "table"
            },
            "option": {
                "columnShow": true,
                "columnViews": true,
                "headerBackground": "",
                "headerColor": "",
                "headerTextAlign": "center",
                "bodyBackground": "rgba(0, 0, 0, 0.01)",
                "bodyColor": "#fff",
                "borderColor": "rgba(51, 65, 107, 1)",
                "bodyTextAlign": "center",
                "column": [
                    {
                        "$hide": "显示",
                        "label": "",
                        "prop": "projectNameA",
                        "width": "",
                        "hide": false,
                        "$index": 0
                    },
                    {
                        "$hide": "显示",
                        "label": "",
                        "prop": "shipmentsSum",
                        "width": "",
                        "hide": false,
                        "$index": 1
                    },
                    {
                        "$hide": "显示",
                        "label": "",
                        "prop": "recycleSum",
                        "width": "",
                        "hide": false,
                        "$index": 2
                    },
                    {
                        "$hide": "显示",
                        "label": "",
                        "prop": "noRecycleSum",
                        "width": "",
                        "hide": false,
                        "$index": 3
                    }
                ],
                "align": "center",
                "headerAlign": "center",
                "header": false,
                "scroll": true,
                "scrollTime": 20000,
                "fontSize": 15,
                "count": 10,
                "nthColor": "",
                "othColor": "",
                "index": false,
                "scrollCount": 1,
                "menu": false,
                "showHeader": false
            },
            "index": "2f30803b-4c4b-45c4-845b-abc2c6c1b2b1",
            "zIndex": 5
        },
        {
            "title": "文本框",
            "name": "使用",
            "icon": "icon-text",
            "img": "/img/text.852a3c54.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${erp}/depotHead/getUseSum`,
            "dataFormatter": "(res)=>{ return {\r\n  value:res.data.useSum\r\n  }\r\n }",
            "time": 60000,
            "stylesFormatter": "",
            "data": {
                "value": "0"
            },
            "component": {
                "width": 259.36,
                "height": 40,
                "name": "text",
                "prop": "text"
            },
            "option": {
                "textAlign": "center",
                "fontSize": 32,
                "fontWeight": "normal",
                "color": "#0091FF",
                "split": 0,
                "lineHeight": 0
            },
            "left": 1552.1,
            "top": 217.46,
            "index": "b7fe2c83-a933-40e1-92c0-9f72b70dc382",
            "zIndex": 4
        },
        {
            "title": "文本框",
            "name": "闲置",
            "icon": "icon-text",
            "img": "/img/text.852a3c54.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${erp}/depotHead/getIdleSum`,
            "dataFormatter": "(res)=>{ return {\r\n  value:res.data.idleSum\r\n  }\r\n }",
            "time": 60000,
            "stylesFormatter": "",
            "data": {
                "value": "0"
            },
            "component": {
                "width": 259.36,
                "height": 40,
                "name": "text",
                "prop": "text"
            },
            "option": {
                "textAlign": "center",
                "fontSize": 32,
                "fontWeight": "normal",
                "color": "#BB6310",
                "split": 0,
                "lineHeight": 0
            },
            "left": 1185.24,
            "top": 219.12,
            "index": "9c2aeab0-5dcb-4f23-a16d-e15cb4faa7fe",
            "zIndex": 3
        },
        {
            "title": "文本框",
            "name": "未回收",
            "icon": "icon-text",
            "img": "/img/text.852a3c54.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${erp}/depotHead/getNoRecycleSum`,
            "dataFormatter": "(res)=>{ return {\r\n  value:res.data.noRecycleSum\r\n  }\r\n }",
            "time": 60000,
            "stylesFormatter": "",
            "data": {
                "value": "0"
            },
            "component": {
                "width": 259.36,
                "height": 40,
                "name": "text",
                "prop": "text"
            },
            "option": {
                "textAlign": "center",
                "fontSize": 32,
                "fontWeight": "normal",
                "color": "#F7B500",
                "split": 0,
                "lineHeight": 0
            },
            "left": 811.74,
            "top": 217.46,
            "index": "06d1c5a2-61e7-4d0e-802a-e6f410529c3e",
            "zIndex": 2
        },
        {
            "title": "文本框",
            "name": "回收",
            "icon": "icon-text",
            "img": "/img/text.852a3c54.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${erp}/depotHead/getRecycleSum`,
            "dataFormatter": "(res)=>{ return {\r\n  value:res.data.recycleSum\r\n  }\r\n }",
            "time": 60000,
            "stylesFormatter": "",
            "data": {
                "value": "0"
            },
            "component": {
                "width": 259.36,
                "height": 40,
                "name": "text",
                "prop": "text"
            },
            "option": {
                "textAlign": "center",
                "fontSize": 32,
                "fontWeight": "normal",
                "color": "#32C5FF",
                "split": 0,
                "lineHeight": 0
            },
            "left": 451.52,
            "top": 215.8,
            "index": "8ec3989e-ba6c-4e19-8680-2f13c73f1233",
            "zIndex": 1
        },
        {
            "title": "文本框",
            "name": "发货",
            "icon": "icon-text",
            "img": "/img/text.852a3c54.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${erp}/depotHead/getShipmentsSum`,
            "dataFormatter": "(res)=>{ return {\r\n  value:res.data.shipmentsSum\r\n  }\r\n }",
            "time": 60000,
            "stylesFormatter": "",
            "data": {
                "value":"0"
            },
            "component": {
                "width": 259.36,
                "height": 40,
                "name": "text",
                "prop": "text"
            },
            "option": {
                "textAlign": "center",
                "fontSize": 32,
                "fontWeight": "normal",
                "color": "#6DD400",
                "split": 0,
                "lineHeight": 0
            },
            "left": 83,
            "top": 214.14,
            "index": "4f0e0e4e-e693-4111-87e2-15716207f309",
            "zIndex": 0
        }
    ]
}