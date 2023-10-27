（WMS 系统PDA程序）
DingGu PDA Application

Components:

    "axios": "^0.18.1",
    "mint-ui": "^2.2.13",
    "vue": "^2.5.2",
    "vue-router": "^3.5.1",
    "vuex": "^3.0.1"

# install dependencies
cnpm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

When you publish the application use the HBuilder

Please modify below configs:

1. config/index.js:
   update: assetsPublicPath: './'

2. build/utils.js:
   add: publicPath: '../../'


