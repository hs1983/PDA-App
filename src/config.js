//API 接口地址
  const ApiServer = 'http://localhost'//测试环境
//const ApiServer = 'http://172.25.90.101'//测试环境

//API 接口端口
const ApiPort = "8155"

//API 配置
const ApiConfig = {
    apiUrl: ApiServer + ':' + ApiPort,
    apiTimeout: 3600000,
}

// OAuth2 配置
const OAuth2Config = {
    userName: "",
    password: "",
    accountType: 0,
    platform: 0,
    verifyCode: {
        id: "",
        code: ""
    }
}

export default {
    ApiConfig,
    OAuth2Config
}