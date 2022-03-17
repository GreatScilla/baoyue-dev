
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const domain = "http://192.168.1.55"
// const domain = "http://192.168.196.123"
// const domain = "http://122.9.67.122"

module.exports = {
  //路径前缀
  publicPath: "/",
  lintOnSave: false,
  productionSourceMap: false,
  chainWebpack: (config) => {
    //忽略的打包文件
    config.externals({
      vue: "Vue",
      "vue-router": "VueRouter",
      vuex: "Vuex",
      axios: "axios",
      "element-ui": "ELEMENT",
    });
    const entry = config.entry("app");
    entry.add("babel-polyfill").end();
    entry.add("classlist-polyfill").end();
    entry.add("@/mock").end();
  },
  //开发模式反向代理配置，生产模式请使用Nginx部署并配置反向代理
  devServer: {
    port: 3000,
    hot: true,
    proxy: {
      '/kaoqinapi': {
        target:'http://192.168.16.158:8098',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/kaoqinapi': '/'
        },
      },
      "/api": {
        //本地服务接口地址
        // target: "http://192.168.16.60:18013",
        // target: "http://192.168.16.197:18013",
        // target: "http://122.9.67.122:18013",
        // target: "http://192.168.196.123:18013",
        target: domain + ":18013",
        // target: "http://192.168.16.90:3000",
        // target: "http://192.168.16.154:18013",
        // target: "http://saber.bpy156.com/api",
        // target: "http://saber.bpy.com/api",
        // target: "http://saber.bipinyun.com/api",
        // target: "http://192.168.0.107:8001",
        // target: "http://192.168.196.168:18013",//宝悦测试服
        // target: "http://192.168.16.158:8098",//宝悦测试服
        // target: "http://192.168.0.82:18013",//王力
        // target: "http://120.24.34.49",
        // target:  "http://192.168.0.105:80",
        // target: "http://192.168.1.159", // 颜再燕
        // target: 'http://localhost',
        //远程演示服务地址,可用于直接启动项目
        // target: 'https://saber.bladex.vip/api',
        ws: true,
        pathRewrite: {
          "^/api": "/",
        },
      },
      "/files": {
        target: domain,
        ws: true,
        pathRewrite: {
          "^/files": "/files",
        },
      },
      "/finance": {
        target: domain + ":9200",
        ws: true,
        pathRewrite: {
          "^/finance": "/",
        },
      },
      "/erp": {
        target: domain+":8200",
        ws: true,
        pathRewrite: {
          "^/erp": "/",
        },
      },
      "/rcm": {
        // target: domain+":8200",
        target: domain+":8301",
        ws: true,
        pathRewrite: {
          "^/rcm": "/",
        },
      },
      "/log": {
        target: domain+":8103",
        ws: true,
        pathRewrite: {
          "^/log": "",
        },
      },
      "/base": {
        target: domain + ":8062",
        ws: true,
        pathRewrite: {
          "^/base": "/",
        },
      },
      "/linux": {
        target: domain + ":8063",
        ws: true,
        pathRewrite: {
          "^/linux": "/",
        },
      },
      "/mes": {
        target: domain + ":8061",
        // target: "http://192.168.16.166" + ":8061",
        ws: true,
        pathRewrite: {
          "^/mes": "/",
        },
      },
      "/quality": {
        target: domain + ":8405",
        ws: true,
        pathRewrite: {
          "^/quality": "/",
        },
      }
    },
  },
  configureWebpack: {
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            warnings: false,
            compress: {
              pure_funcs: ['console.log', 'console.debug'],
              drop_console: true,
            }
          }
        })
      ]
    }
  },
};
