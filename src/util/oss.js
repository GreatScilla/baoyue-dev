let oss = require("ali-oss");
let client = oss({
  region: "oss-cn-shenzhen",
  bucket: "bipinyun",
  accessKeyId: "LTAI4FyoJErCzmbxR1549QqR",
  accessKeySecret: "CE5T59WAbnM8xD2D3teGpWf94cYXNZ"
});

export {client};
