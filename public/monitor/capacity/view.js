const option ={
    "detail": {
        "name": "by产能",
        "width": 1920,
        "height": 1080,
        "scale": 52.39583333333333,
        "backgroundImage": "https://oss.bladex.vip/caster/upload/20210729/7fb3e5e0202e5ced8de26f78d6519863.jpg",
        "url": "",
        "mark": {},
        "gradeShow": false,
        "gradeLen": 30,
        "query": {}
    },
    "component": [
        {
            "name": "加气切块对比",
            "title": "饼图",
            "icon": "icon-pie",
            "img": "/img/pie.14e72c57.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${mes}/Evaluation/getEvaluationBI`,
            "dataFormatter": "(res)=>{\r\n var list=[{name:'A班',\r\n value:res.data.modulusResp.aaeratedBlockModulus},\r\n{name:'B班',\r\nvalue:res.data.modulusResp.baeratedBlockModulus\r\n}] \r\n  return list\r\n}",
            "time": 60000,
            "data": [
                {
                    "name": "A班",
                    "value": 1000879
                },
                {
                    "name": "B班",
                    "value": 3400879
                }
            ],
          
            "stylesFormatter": "",
            "resize": false,
            "component": {
                "width": 572.44,
                "height": 285.16,
                "name": "pie",
                "prop": "pie"
            },
            "option": {
                "legend": true,
                "labelShow": true,
                "barColor": [
                    {
                        "color1": "#C679F6",
                        "color2": "",
                        "$index": 0
                    },
                    {
                        "color1": "#5670D3",
                        "color2": "",
                        "$index": 1
                    }
                ],
                "sort": false,
                "roseType": false,
                "radius": false,
                "notCount": false,
                "legendPostion": "right",
                "legendOrient": "horizontal",
                "fontSize": 0,
                "labelShowFontSize": 20,
                "labelShowColor": "#fff",
                "tipColor": "#fff",
                "titleColor": "#fff",
                "subTitleColor": "#fff"
            },
            "left": 1286.84,
            "top": 742,
            "index": "cbcb5deb-0fa9-4273-8f8a-55e299298c47",
            "zIndex": 7
        },
        {
            "name": "高精切块对比",
            "title": "饼图",
            "icon": "icon-pie",
            "img": "/img/pie.14e72c57.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${mes}/Evaluation/getEvaluationBI`,
            "dataFormatter": "(res)=>{\r\n var list=[{name:'A班',\r\n value:res.data.modulusResp.aprecisionBlockModulus},\r\n{name:'B班',\r\nvalue:res.data.modulusResp.bprecisionBlockModulus\r\n}] \r\n  return list\r\n}",
            "time": 60000,
            "data": [
                {
                    "name": "A班",
                    "value": 1000879
                },
                {
                    "name": "B班",
                    "value": 3400879
                }
            ],
            "stylesFormatter": "",
            "resize": false,
            "component": {
                "width": 572.44,
                "height": 285.16,
                "name": "pie",
                "prop": "pie"
            },
            "option": {
                "legend": true,
                "labelShow": true,
                "barColor": [
                    {
                        "color1": "#C679F6",
                        "color2": "",
                        "$index": 0
                    },
                    {
                        "color1": "#5670D3",
                        "color2": "",
                        "$index": 1
                    }
                ],
                "sort": false,
                "roseType": false,
                "radius": false,
                "notCount": false,
                "legendPostion": "right",
                "legendOrient": "horizontal",
                "fontSize": 0,
                "labelShowFontSize": 20,
                "labelShowColor": "#fff",
                "tipColor": "#fff",
                "titleColor": "#fff",
                "subTitleColor": "#fff"
            },
            "left": 667.8,
            "top": 748.36,
            "index": "63bf6e8c-9d9a-4679-8583-50a7d1a63c63",
            "zIndex": 6
        },
        {
            "name": "板材对比",
            "title": "饼图",
            "icon": "icon-pie",
            "img": "/img/pie.14e72c57.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${mes}/Evaluation/getEvaluationBI`,
            "dataFormatter": "(res)=>{\r\n var list=[{name:'A班',\r\n value:res.data.modulusResp.apanelModulus},\r\n{name:'B班',\r\nvalue:res.data.modulusResp.bpanelModulus\r\n}] \r\n  return list\r\n}",
            "time": 60000,
            "data": [
                {
                    "name": "A班",
                    "value": 1000879
                },
                {
                    "name": "B班",
                    "value": 3400879
                }
            ],
            "stylesFormatter": "",
            "resize": false,
            "component": {
                "width": 572.44,
                "height": 285.16,
                "name": "pie",
                "prop": "pie"
            },
            "option": {
                "legend": true,
                "labelShow": true,
                "barColor": [
                    {
                        "color1": "#C679F6",
                        "color2": "",
                        "$index": 0
                    },
                    {
                        "color1": "#5670D3",
                        "color2": "",
                        "$index": 1
                    }
                ],
                "sort": false,
                "roseType": false,
                "radius": false,
                "notCount": false,
                "legendPostion": "right",
                "legendOrient": "horizontal",
                "fontSize": 0,
                "labelShowFontSize": 20,
                "labelShowColor": "#fff",
                "tipColor": "#fff",
                "titleColor": "#fff",
                "subTitleColor": "#fff",
                "nameColor": "#fff",
                "lineColor": "#fff"
            },
            "left": 36.04,
            "top": 744.12,
            "index": "1cd481f8-af20-4dbe-9724-3f095824ce32",
            "zIndex": 5
        },
        {
            "name": "燃气对比",
            "title": "柱状图",
            "icon": "icon-bar",
            "img": "/img/bar.179e480c.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${mes}/Evaluation/getEvaluationBI`,
            "dataFormatter": "(res)=>{\r\n var info={categories:['燃气量'],\r\n  series:[{name:'实际消耗', data:[res.data.fuelGas]},{name:'参考标准', data:[res.data.fuelGasStandard]}]} \r\n  return info\r\n}",
            "time": 60000,
            "data": {
                "categories": [
                    "苹果"
                ],
                "series": [
                    {
                        "name": "实际消耗",
                        "data": [
                            1000879
                        ]
                    },
                    {
                        "name": "参考标准",
                        "data": [
                            2000879
                        ]
                    }
                ]
            },
            "stylesFormatter": "",
            "component": {
                "width": 462.2,
                "height": 300,
                "name": "bar",
                "prop": "bar"
            },
            "option": {
                "gridX": 90,
                "gridY": 0,
                "gridX2": 0,
                "gridY2": 0,
                "legend": true,
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
                "barWidth": 30,
                "barRadius": 0,
                "barColor": [
                    {
                        "color1": "#4CC7FF",
                        "color2": "#0792FC",
                        "postion": 90,
                        "$index": 0,
                        "_show": true
                    },
                    {
                        "color1": "#ECD60E",
                        "color2": "#D59C02",
                        "postion": 50,
                        "$index": 1,
                        "_show": true
                    }
                ],
                "barMinHeight": 2,
                "legendPostion": "right",
                "legendOrient": "horizontal"
            },
            "left": 1420.4,
            "top": 430.36,
            "index": "24e4e235-3bc7-4658-a974-036e7adce78f",
            "zIndex": 4
        },
        {
            "name": "电费对比",
            "title": "柱状图",
            "icon": "icon-bar",
            "img": "/img/bar.179e480c.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${mes}/Evaluation/getEvaluationBI`,
            "dataFormatter": "(res)=>{\r\n var info={categories:['电费'],\r\n  series:[{name:'实际消耗', data:[res.data.electric]},{name:'参考标准', data:[res.data.electricStandard]}]} \r\n  return info\r\n}",
            "time": 60000,
            "data": {
                "categories": [
                    "苹果"
                ],
                "series": [
                    {
                        "name": "实际消耗",
                        "data": [
                            1000879
                        ]
                    },
                    {
                        "name": "参考标准",
                        "data": [
                            2000879
                        ]
                    }
                ]
            },
            "stylesFormatter": "",
            "component": {
                "width": 462.2,
                "height": 300,
                "name": "bar",
                "prop": "bar"
            },
            "option": {
                "gridX": 90,
                "gridY": 0,
                "gridX2": 0,
                "gridY2": 0,
                "legend": true,
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
                "barWidth": 30,
                "barRadius": 0,
                "barColor": [
                    {
                        "color1": "#4CC7FF",
                        "color2": "#0792FC",
                        "postion": 90,
                        "$index": 0,
                        "_show": true
                    },
                    {
                        "color1": "#ECD60E",
                        "color2": "#D59C02",
                        "postion": 50,
                        "$index": 1,
                        "_show": true
                    }
                ],
                "barMinHeight": 2,
                "legendPostion": "right",
                "legendOrient": "horizontal"
            },
            "left": 951.88,
            "top": 426.12,
            "index": "675f312d-d51c-4e93-80ee-db88e44a3475",
            "zIndex": 3
        },
        {
            "name": "干物料对比",
            "title": "柱状图",
            "icon": "icon-bar",
            "img": "/img/bar.179e480c.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${mes}/Evaluation/getEvaluationBI`,
            "dataFormatter": "(res)=>{\r\n var info={categories:['板材','高精砌块','加气砌块'],\r\n  series:[{name:'A班', data:res.data.materialList.material},{name:'B班', data:res.data.materialList.materialSon}]}  \r\n  return info\r\n}",
            "time": 60000,
            "data": {
                "categories": [
                    "苹果",
                    "三星",
                    "小米",
                    "oppo",
                    "vivo"
                ],
                "series": [
                    {
                        "name": "A班",
                        "data": [
                            1000879,
                            3400879,
                            2300879,
                            5400879,
                            3400879
                        ]
                    },
                    {
                        "name": "B班",
                        "data": [
                            2000879,
                            1400879,
                            3300879,
                            2400879,
                            5400879
                        ]
                    }
                ]
            },
            "stylesFormatter": "",
            "component": {
                "width": 922.24,
                "height": 300,
                "name": "bar",
                "prop": "bar"
            },
            "option": {
                "gridX": 90,
                "gridY": 0,
                "gridX2": 0,
                "gridY2": 0,
                "legend": true,
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
                "barWidth": 30,
                "barRadius": 0,
                "barColor": [
                    {
                        "color1": "#C679F6",
                        "color2": "#A149F3",
                        "postion": 90,
                        "$index": 0,
                        "_show": true
                    },
                    {
                        "color1": "#5670D3",
                        "color2": "#5E4CCC",
                        "postion": 50,
                        "$index": 1,
                        "_show": true
                    }
                ],
                "barMinHeight": 2,
                "legendPostion": "right",
                "legendOrient": "horizontal"
            },
            "left": 10.6,
            "top": 430.36,
            "index": "6bfce3ad-ca81-496b-ac78-651d90073d5d",
            "zIndex": 2
        },
        {
            "name": "标注对比",
            "title": "柱状图",
            "icon": "icon-bar",
            "img": "/img/bar.179e480c.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${mes}/Evaluation/getEvaluationBI`,
            "dataFormatter": "(res)=>{\r\n var info={categories:['A班板材','B班板材','A班高精砌块','B班高精砌块','A班加气砌块','B班加气砌块'],\r\n  series:[{name:'实际消耗', data:res.data.modulusList.modulus},{name:'参考标准', data:res.data.modulusList.modulusSon}]}  \r\n  return info\r\n}",
            "time": 60000,
            "data": {
                "categories": [
                    "苹果",
                    "三星",
                    "小米",
                    "oppo",
                    "vivo"
                ],
                "series": [
                    {
                        "name": "实际消耗",
                        "data": [
                            1000879,
                            3400879,
                            2300879,
                            5400879,
                            3400879
                        ]
                    },
                    {
                        "name": "参考标准",
                        "data": [
                            2000879,
                            1400879,
                            3300879,
                            2400879,
                            5400879
                        ]
                    }
                ]
            },
            "stylesFormatter": "",
            "component": {
                "width": 1401.36,
                "height": 300,
                "name": "bar",
                "prop": "bar"
            },
            "option": {
                "gridX": 90,
                "gridY": 0,
                "gridX2": 0,
                "gridY2": 0,
                "legend": true,
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
                "barWidth": 30,
                "barRadius": 0,
                "barColor": [
                    {
                        "color1": "#4CC7FF",
                        "color2": "#0792FC",
                        "postion": 90,
                        "$index": 0,
                        "_show": true
                    },
                    {
                        "color1": "#ECD60E",
                        "color2": "#D59C02",
                        "postion": 50,
                        "$index": 1,
                        "_show": true
                    }
                ],
                "barMinHeight": 2,
                "legendPostion": "right",
                "legendOrient": "horizontal"
            },
            "left": 12.72,
            "top": 116.6,
            "index": "e57df5a8-f347-4b1b-9ea2-7c1e365f1952",
            "zIndex": 1
        },
        {
            "name": "产量对比",
            "title": "柱状图",
            "icon": "icon-bar",
            "img": "/img/bar.179e480c.png",
            "dataType": 1,
            "dataMethod": "get",
            "url": `${mes}/Evaluation/getEvaluationBI`,
            "dataFormatter": "(res)=>{\r\n var info={categories:['A班产量','B班产量','AB班合计'],\r\n  series:[{name:'产量', data:res.data.yieldList.yield},{name:'参考标准', data:res.data.yieldList.yieldSon}]}  \r\n  return info\r\n}",
            "time": 60000,
            "data": {
                "categories": [
                    "苹果",
                    "三星",
                    "小米"
                ],
                "series": [
                    {
                        "name": "产量",
                        "data": [
                            1000879,
                            3400879,
                            2300879
                        ]
                    },
                    {
                        "name": "参考标准",
                        "data": [
                            2000879,
                            1400879,
                            3300879
                        ]
                    }
                ]
            },
            "stylesFormatter": "",
            "component": {
                "width": 453.72,
                "height": 300,
                "name": "bar",
                "prop": "bar"
            },
            "option": {
                "gridX": 90,
                "gridY": 0,
                "gridX2": 0,
                "gridY2": 0,
                "legend": true,
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
                "barRadius": 0,
                "barColor": [
                    {
                        "color1": "#4CC7FF",
                        "color2": "#0792FC",
                        "postion": 90,
                        "$index": 0,
                        "_show": true
                    },
                    {
                        "color1": "#ECD60E",
                        "color2": "#D59C02",
                        "postion": 50,
                        "$index": 1,
                        "_show": true
                    }
                ],
                "barMinHeight": 2,
                "legendPostion": "right",
                "legendOrient": "horizontal"
            },
            "left": 1420.4,
            "top": 114.48,
            "index": "03e9d60a-8085-4486-a89b-810ad4b43521",
            "zIndex": 0
        }
    ]
}