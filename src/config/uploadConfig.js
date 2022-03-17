let uploadUrl = '';

if (process.env.NODE_ENV === 'development') {
  // uploadUrl = `http://saber.bpy.com/`; // 开发环境地址
  // uploadUrl = `http://saber.bpy.com/`; // 开发环境地址
  // uploadUrl = `http://saber.bpy156.com/`; // 开发环境地址
  uploadUrl = window.baseServerUrl + `/`; // 开发环境地址
} else if (process.env.NODE_ENV === 'production') {
  // uploadUrl = `http://saber.bipinyun.com/`; //生产环境地址
  // uploadUrl = `http://192.168.0.123/`; // 开发环境地址
  // uploadUrl = `http://saber.bpy156.com/`; // 开发环境地址
  uploadUrl = window.baseServerUrl + `/`;
} else if (process.env.NODE_ENV === 'test') {
  // uploadUrl = `http://saber.bipinyun.com/`; //测试环境地址
  // uploadUrl = `http://192.168.0.123/`; // 开发环境地址
  // uploadUrl = `http://saber.bpy156.com/`; // 开发环境地址
  uploadUrl = window.baseServerUrl + `/`;
}

export default uploadUrl
