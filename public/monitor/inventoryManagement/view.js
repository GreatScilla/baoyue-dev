
const option = {
    "detail": {
        "name": "by托盘",
        "width": 1920,
        "height": 1080,
        "scale": 52.39583333333333,
        "backgroundImage": "https://oss.bladex.vip/caster/upload/20211025/19c2df91968a1cb64fa59489f3e861b1.jpeg",
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
            "top": 217,
            "left": 36.92,
            "dataType": 1,
            "data": [],
            "dataMethod": "get",
            "url": `${erp}/stockTaking/getInventorySummaryReport?current=1&size=1000`,
            "dataFormatter": "(res)=>{\r\n var list=res.data.records\r\n  return list\r\n}",
            "time": 180000,
            "stylesFormatter": "",
            "component": {
                "width": 1820.12,
                "height": 800.24,
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
                        "prop": "depot_name",
                        "width": "200",
                        "hide": false,
                        "$index": 0
                    },
                    {
                        "$hide": "显示",
                        "label": "",
                        "prop": "product_number",
                        "width": "460",
                        "hide": false,
                        "$index": 1
                    },
                    {
                        "$hide": "显示",
                        "label": "",
                        "prop": "product_name",
                        "width": "220",
                        "hide": false,
                        "$index": 2
                    },
                    {
                        "$hide": "显示",
                        "label": "",
                        "prop": "product_specification_name",
                        "width": "440",
                        "hide": false,
                        "$index": 3
                    },
                    {
                        "$hide": "显示",
                        "label": "",
                        "prop": "stock_unit_name",
                        "width": "200",
                        "hide": false,
                        "$index": 4
                    },
                    {
                        "$hide": "显示",
                        "label": "",
                        "prop": "stock",
                        "width": "300",
                        "hide": false,
                        "$index": 5
                    },
                ],
                "align": "center",
                "headerAlign": "center",
                "header": false,
                "scroll": true,
                "scrollTime": 2000,
                "fontSize": 15,
                "count": 16,
                "nthColor": "rgba(0, 45, 142, 0.8)",
                "othColor": "rgba(0, 50, 145, 0.25)",
                "index": false,
                "scrollCount": 1,
                "menu": false,
                "showHeader": false
            },
            "index": "2f30803b-4c4b-45c4-845b-abc2c6c1b2b1",
            "zIndex": 5
        }
    ]
}