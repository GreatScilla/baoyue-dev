
const option = {
    "detail": {
        "name": "by托盘",
        "width": 1920,
        "height": 1080,
        "scale": 52.39583333333333,
        "backgroundImage": "https://oss.bladex.vip/caster/upload/20211013/fc70c7a966d9ef78285344ac36400bc6.jpeg",
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
            "left": 33.92,
            "dataType": 1,
            "data": [
                // {
                //     "sn": "A202201200003",
                //     "licenseNumber": "湘AA9055",
                //     "grossWeight": "48980.000KG",
                //     "tare": "48980.000KG",
                //     "netWeight": "48980.000KG",
                //     "weigher": "过磅员",
                //     "weigherTime": "2022-01-20 12:00:00",
                // }
            ],
            "dataMethod": "get",
            "url": `${rcm}/pl/getPlTwoSelectBIResp`,
            "dataFormatter": "(res)=>{\r\n var list=res.data\r\n  return list\r\n}",
            "time": 60000,
            "stylesFormatter": "",
            "component": {
                "width": 1827.12,
                "height": 928.24,
                "name": "table",
                "prop": "table"
            },
            "option": {
                "showHeader": false,
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
                        "prop": "sn",
                        "width": "200",
                        "hide": false,
                        "$index": 0
                    },
                    {
                        "$hide": "显示",
                        "label": "",
                        "prop": "licenseNumber",
                        "width": "320",
                        "hide": false,
                        "$index": 1
                    },
                    // {
                    //     "$hide": "显示",
                    //     "label": "",
                    //     "prop": "nameOfGoods",
                    //     "width": "-200",
                    //     "hide": false,
                    //     "$index": 2
                    // },
                    {
                        "$hide": "显示",
                        "label": "",
                        "prop": "grossWeight",
                        "width": "200",
                        "hide": false,
                        "$index": 2
                    },
                    {
                        "$hide": "显示",
                        "label": "",
                        "prop": "tare",
                        "width": "0",
                        "hide": false,
                        "$index": 3
                    },
                    {
                        "$hide": "显示",
                        "label": "",
                        "prop": "netWeight",
                        "width": "300",
                        "hide": false,
                        "$index": 4
                    },
                    {
                        "$hide": "显示",
                        "label": "",
                        "prop": "weigher",
                        "width": "300",
                        "hide": false,
                        "$index": 5
                    },
                    {
                        "$hide": "显示",
                        "label": "",
                        "prop": "weigherTime",
                        "width": "0",
                        "hide": false,
                        "$index": 6
                    }
                ],
                "align": "center",
                "headerAlign": "center",
                "header": false,
                "scroll": true,
                "scrollTime": 20000,
                "fontSize": 15,
                "count": 16,
                "nthColor": "rgba(0, 45, 142, 0.8)",
                "othColor": "rgba(0, 50, 145, 0.25)",
                "index": false,
                "scrollCount": 1,
                "menu": false
            },
            "index": "2f30803b-4c4b-45c4-845b-abc2c6c1b2b1",
            "zIndex": 5
        }
    ]
}