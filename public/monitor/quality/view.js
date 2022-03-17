const option ={
    "detail": {
        "name": "质量数据分析",
        "width": 1920,
        "height": 1080,
        "scale": 52.39583333333333,
        "backgroundImage": "https://oss.bladex.vip/caster/upload/20210809/33516ca99ed1490e5975f9db8a02f427.png",
        "url": "",
        "mark": {},
        "gradeShow": false,
        "gradeLen": 30,
        "query": {}
    },
    "component": [
        {
            "name": "生产入库检验统计",
            "title": "折线图",
            "icon": "icon-line",
            "img": "/img/line.d9ed6cf6.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${quality}/plan/getPlanBI`,
            "dataFormatter": "(res)=>{\r\n var info={categories:res.data.productionReceiptInspectionStatisticsVO.map((el) => el.months),\r\n  series:[{data:res.data.productionReceiptInspectionStatisticsVO.map((el) => el.planNumberSum)}]} \r\n  return info\r\n}",
            "time": 60000,
            "data": {
                "categories":[],
                "series": [
                    {
                        "data":[]
                    }
                ]
            },
            "stylesFormatter": "",
            "component": {
                "width": 491.88,
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
                        "color1": "#34C4C6",
                        "color2": "rgba(52,196,198,0)",
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
            "left": 1387.2,
            "top": 738.66,
            "index": "bce1ff51-980b-40d4-8d57-16ffb1786ed0",
            "zIndex": 10
        },
        {
            "name": "进料检验统计",
            "title": "折线图",
            "icon": "icon-line",
            "img": "/img/line.d9ed6cf6.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${quality}/plan/getPlanBI`,
            "dataFormatter": "(res)=>{\r\n var info={categories:res.data.incomingInspectionStatisticsVO.map((el) => el.months),\r\n  series:[{data:res.data.incomingInspectionStatisticsVO.map((el) => el.planNumberSum)}]} \r\n  return info\r\n}",
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
                "width": 491.88,
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
                        "color1": "#E9902F",
                        "color2": "rgba(233,144,47,0)",
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
            "left": 1388.86,
            "top": 429.9,
            "index": "55a4ffe4-88be-4c9b-8e25-7cff4579e0b0",
            "zIndex": 9
        },
        {
            "name": "报工品质统计",
            "title": "折线图",
            "icon": "icon-bar",
            "img": "/img/bar.179e480c.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${quality}/plan/getPlanBI`,
            "dataFormatter": "(res)=>{\r\n var info={categories:res.data.reportQualityStatisticsVO.map((el) => el.months),\r\n  series:[{name:'不合格数',data:res.data.reportQualityStatisticsVO.map((el) => el.unqualifiedNumber)},{name:'合格数',data:res.data.reportQualityStatisticsVO.map((el) => el.qualifiedNumber)}]} \r\n  return info\r\n}",
            "time": 60000,
            "data": {
                "categories":[],
                "series": [
                    {
                        "name": "不合格数",
                        "data":  []
                    },
                    {
                        "name": "合格数",
                        "data": []
                    }
                ]
            },
            "stylesFormatter": "",
            "component": {
                "width": 491.88,
                "height": 295.76,
                "name": "line",
                "prop": "line"
            },
            "option": {
                "gridX": 90,
                "gridY": 0,
                "gridX2": 0,
                "gridY2": 0,
                "legend": true,
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
                        "color1": "#ECA50E",
                        "color2": "#ECA50E",
                        "postion": 90,
                        "$index": 0,
                        "_show": true
                    },
                    {
                        "color1": "#00EDF1",
                        "color2": "#00B2C5",
                        "postion": 50,
                        "$index": 1,
                        "_show": true
                    }
                ],
                "legendPostion": "right",
                "legendOrient": "horizontal",
                "symbolSize": 3,
                "smooth": true,
                "barMinHeight": 2,
                "areaStyle": true
            },
            "left": 1388.86,
            "top": 118.54,
            "index": "3bd95408-1c91-468b-989f-7689f1c04cdc",
            "zIndex": 8
        },
        {
            "name": "化验室排名",
            "title": "柱状图",
            "icon": "icon-bar",
            "img": "/img/bar.179e480c.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${quality}/plan/getPlanBI`,
            "dataFormatter": "(res)=>{\r\n var info={categories:res.data.laboratoryRankingVO.map((el) => el.laboratory),\r\n  series:[{data:res.data.laboratoryRankingVO.map((el) => el.numberOfTasks)}]} \r\n  return info\r\n}",
            "time": 60000,
            "data": {
                "categories":[],
                "series": [
                    {
                        "data":[]
                    }
                ]
            },
            "stylesFormatter": "",
            "component": {
                "width": 848.78,
                "height": 315.68,
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
                "xNameFontSize": 14,
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
            "left": 523.12,
            "top": 731.8,
            "index": "b08ab54e-dd96-44ce-867f-0afbed5ae264",
            "zIndex": 7
        },
        {
            "title": "文本框",
            "name": "进料检验",
            "icon": "icon-text",
            "img": "/img/text.852a3c54.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${quality}/plan/getPlanBI`,
            "dataFormatter": "(res)=>{  return {\r\n  value:res.data.incomingInspectionQuantity\r\n  }\r\n}",
            "time": 60000,
            "stylesFormatter": "",
            "data": {
                "value":0
            },
            "component": {
                "width": 83.09,
                "height": 14.19,
                "name": "text",
                "prop": "text"
            },
            "option": {
                "textAlign": "center",
                "fontSize": 16,
                "fontWeight": "normal",
                "color": "#fff",
                "split": 0,
                "lineHeight": 12
            },
            "left": 1116.08,
            "top": 307.78,
            "index": "3b710e2c-4f49-4147-9120-9e3ac6a8fa39",
            "zIndex": 6
        },
        {
            "title": "文本框",
            "name": "送样检验",
            "icon": "icon-text",
            "img": "/img/text.852a3c54.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${quality}/plan/getPlanBI`,
            "dataFormatter": "(res)=>{  return {\r\n  value:res.data.numberOfSamplesSubmittedForInspection\r\n  }\r\n}",
            "time": 60000,
            "stylesFormatter": "",
            "data": {
                "value":0
            },
            "component": {
                "width": 83.09,
                "height": 14.19,
                "name": "text",
                "prop": "text"
            },
            "option": {
                "textAlign": "center",
                "fontSize": 16,
                "fontWeight": "normal",
                "color": "#fff",
                "split": 0,
                "lineHeight": 12
            },
            "left": 962.96,
            "top": 322.86,
            "index": "99317ec5-9971-4b2d-a0d4-9c77b7f85e28",
            "zIndex": 5
        },
        {
            "title": "文本框",
            "name": "销退检验",
            "icon": "icon-text",
            "img": "/img/text.852a3c54.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${quality}/plan/getPlanBI`,
            "dataFormatter": "(res)=>{  return {\r\n  value:res.data.salesInspectionQuantity\r\n  }\r\n}",
            "time": 60000,
            "stylesFormatter": "",
            "data": {
                "value": "0"
            },
            "component": {
                "width": 83.09,
                "height": 14.19,
                "name": "text",
                "prop": "text"
            },
            "option": {
                "textAlign": "center",
                "fontSize": 16,
                "fontWeight": "normal",
                "color": "#fff",
                "split": 0,
                "lineHeight": 12
            },
            "left": 780.84,
            "top": 324.02,
            "index": "0eec5cbc-b5da-4727-8b16-dbbc6312e9c6",
            "zIndex": 4
        },
        {
            "title": "文本框",
            "name": "生产入库检验",
            "icon": "icon-text",
            "img": "/img/text.852a3c54.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${quality}/plan/getPlanBI`,
            "dataFormatter": "(res)=>{  return {\r\n  value:res.data.productionReceiptInspectionQuantity\r\n  }\r\n}",
            "time": 60000,
            "stylesFormatter": "",
            "data": {
                "value":"0"
            },
            "component": {
                "width": 83.09,
                "height": 14.19,
                "name": "text",
                "prop": "text"
            },
            "option": {
                "textAlign": "center",
                "fontSize": 16,
                "fontWeight": "normal",
                "color": "#fff",
                "split": 0,
                "lineHeight": 12
            },
            "left": 626.56,
            "top": 300.82,
            "index": "aa1d02c3-1724-4a2d-88a4-ee3f71347a4e",
            "zIndex": 3
        },
        {
            "name": "送样检验统计",
            "title": "折线图",
            "icon": "icon-line",
            "img": "/img/line.d9ed6cf6.png",
            "data": {
                "categories":[],
                "series": [
                    {
                        "data": []
                    }
                ]
            },
            "stylesFormatter": "",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${quality}/plan/getPlanBI`,
            "dataFormatter": "(res)=>{\r\n var info={categories:res.data.numberOfSamplesSubmittedForInspectionStatisticsVO.map((el) => el.months),\r\n  series:[{data:res.data.numberOfSamplesSubmittedForInspectionStatisticsVO.map((el) => el.planNumberSum)}]} \r\n  return info\r\n}",
            "time": 60000,
            "component": {
                "width": 491.88,
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
                        "color2": "rgba(52,198,88,0)",
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
            "left": 12.72,
            "top": 739.88,
            "index": "4d96fdff-5e34-4fdb-a48f-40a2eaeb91e4",
            "zIndex": 2
        },
        {
            "name": "销退检验统计",
            "title": "折线图",
            "icon": "icon-line",
            "img": "/img/line.d9ed6cf6.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${quality}/plan/getPlanBI`,
            "dataFormatter": "(res)=>{\r\n var info={categories:res.data.salesInspectionStatisticsVO.map((el) => el.months),\r\n  series:[{data:res.data.salesInspectionStatisticsVO.map((el) => el.planNumberSum)}]} \r\n  return info\r\n}",
            "time": 60000,
            "data": {
                "categories":[],
                "series": [
                    {
                        "name": "手机品牌",
                        "data": []
                    }
                ]
            },
            "stylesFormatter": "",
            "component": {
                "width": 491.88,
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
                        "color2": "rgba(88,193,244,0)",
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
            "left": 14.38,
            "top": 426.58,
            "index": "7be05c8a-8684-44fe-b80f-745fa947ca20",
            "zIndex": 1
        },
        {
            "name": "质量检验统计",
            "title": "柱状图",
            "icon": "icon-bar",
            "img": "/img/bar.179e480c.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${quality}/plan/getPlanBI`,
            "dataFormatter": "(res)=>{\r\n var info={categories:res.data.qualityInspectionStatisticsVO.map((el) => el.months),\r\n  series:[{data:res.data.qualityInspectionStatisticsVO.map((el) => el.planNumberSum)}]} \r\n  return info\r\n}",
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
                "width": 491.88,
                "height": 295.76,
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
                "barWidth": 23,
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
            "left": 14.38,
            "top": 106.92,
            "index": "6d8af707-77a8-4d44-8a2b-dc29e5a9545e",
            "zIndex": 0
        }
    ]
}