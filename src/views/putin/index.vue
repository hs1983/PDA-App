<template>
  <div id="completeGrouping">
    <mt-header style="background-color: #2449a4" title="组盘入库">
      <router-link :to="{ name: 'main' }" slot="left">
        <mt-button icon="back">主界面</mt-button>
      </router-link>
      <mt-button icon="close" slot="right" @click="logout">退&nbsp;&nbsp;出</mt-button>
    </mt-header>

    <mt-field label="包装条码：" ref="pCode" v-model="pCode" @input="checkPackCode" placeholder="请扫描包装标签！">
      <img src="../../assets/icons/scan.png" height="16px" width="16px" />
    </mt-field>

    <div class="page-navbar">
      <div class="navbar-header">
        <mt-navbar class="page-part" v-model="selected">
          <mt-tab-item id="tab1"><span style="font-size:15px;color: #2c3e50;">全部包件</span>
            <mt-badge v-if="isAShow" size="small">{{ aCount }}</mt-badge>
          </mt-tab-item>
          <mt-tab-item id="tab2"><span style="font-size:15px;color: #2c3e50;">已扫描包件</span>
            <mt-badge v-if="isFShow" type="success" size="small">{{ fCount }}</mt-badge>
          </mt-tab-item>
          <mt-tab-item id="tab3"><span style="font-size:15px;color: #2c3e50;">未扫描包件</span>
            <mt-badge v-if="isNShow" type="warning" size="small">{{ nCount }}</mt-badge>
          </mt-tab-item>
        </mt-navbar>
      </div>

      <div class="navbar-body">
        <mt-tab-container v-model="selected" style="500px">
          <mt-tab-container-item id="tab1">
            <div v-for="(packages, index) in aItems" :key="index" :class="packages.scanned ? 'item-scanned' : 'item'">
              <div class="header">
                <div class="div-a">包件：</div>
                <div class="div-b">{{ packages.packCode | formatPackCode }}
                </div>
                <div class="div-c">名称：</div>
                <div class="div-d">{{ packages.packName | formatPackName }}</div>
                <div class="div-x"></div>

                <div class="div-a">单号：</div>
                <div class="div-b">{{ packages.orderNo }}</div>
                <div class="div-c">包号：</div>
                <div class="div-d">{{ packages.serialNo }}</div>
                <div class="div-x">
                </div>
              </div>
            </div>
          </mt-tab-container-item>

          <mt-tab-container-item id="tab2">
            <div v-for="(packages, index) in fItems" :key="index" class="item-scanned">
              <div class="header">
                <div class="div-a">包件：</div>
                <div class="div-b">{{ packages.packCode | formatPackCode }}</div>
                <div class="div-c">名称：</div>
                <div class="div-d">{{ packages.packName | formatPackName }}</div>
                <div class="div-x"></div>

                <div class="div-a">单号：</div>
                <div class="div-b">{{ packages.orderNo }}</div>
                <div class="div-c">包号：</div>
                <div class="div-d">{{ packages.serialNo }}</div>
                <div class="div-x">
                  <img src="../../assets/icons/delete.png" @click="fDel(packages, [index])" height="16px" width="16px" />
                </div>
              </div>
            </div>
          </mt-tab-container-item>

          <mt-tab-container-item id="tab3">
            <div v-for="(packages, index) in nItems" :key="index" class="item">
              <div class="header">
                <div class="div-a">包件：</div>
                <div class="div-b">{{ packages.packCode | formatPackCode }}</div>
                <div class="div-c">名称：</div>
                <div class="div-d">{{ packages.packName | formatPackName }}</div>
                <div class="div-x"></div>

                <div class="div-a">单号：</div>
                <div class="div-b">{{ packages.orderNo }}</div>
                <div class="div-c">包号：</div>
                <div class="div-d">{{ packages.serialNo }}</div>
                <div class="div-x">
                </div>
              </div>
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>

    </div>
    <div class="page-footer">
      <mt-field label="托盘号：" v-model="formParam.palletCode" @input="checkTray" placeholder="请扫描托盘号！">
        <img src="../../assets/icons/scan.png" height="16px" width="16px" />
      </mt-field>
      <div class="submit">
        <mt-button type="primary" style="width: 150px; background-color: #2449a4; margin-top: 10px" @click="submitPutin">确
          认 组 盘</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import { Field, Indicator } from "mint-ui";
import { decrypt } from "@/utils";
import dinoql from "dinoql";
import { getMatchPackageList, savePalletCombination } from "@/apis/putin"

export default {
  data() {
    return {
      isQuickScan: false,//是否支持快捷扫描(一个齐套类型只扫一个包件)
      isAShow: false,
      isFShow: false,
      isNShow: false,
      selected: 'tab1',//tabpage选中项
      dataList: [],//查询结果
      pCode: '',//包件条码
      formParam: {
        palletCode: '',
        items: [],
      },
      aItems: [],//全部包件
      fItems: [],//已扫描包件
      nItems: [],//未扫描包件
      aCount: 0,//全部包件数量
      fCount: 0,//已扫描包件数量
      nCount: 0,//未扫描包件数量
    };
  },

  filters: {
    formatPackCode(value) {//格式化包件条码（超过12个字符后面用...代替）
      if (value.length > 12) {
        return value.substring(0, 12) + '...'
      } else {
        return value;
      }
    },
    formatPackName(value) {//格式化包件名称（超过4个字符后面用...代替）
      if (value.length > 4) {
        return value.substring(0, 3) + '...'
      } else {
        return value;
      }
    }
  },
  mounted() {

    this.cleanAndSetFouce('pCode');
  },

  created() {
    var userSecret = localStorage.getItem("authorization");
    if (userSecret !== null) {
      const user = JSON.parse(decrypt(userSecret));
      if (user.phone.length >= 2) {
        if (user.phone.substr(0, 1) == '1') {//取第一个字符串
          this.isQuickScan = true;
        } else {
          this.isQuickScan = false;
        }
      } else {
        this.isQuickScan = false;
      }
      // const user = JSON.parse(decrypt(userSecret));
      // if (user.phone.length > 0) {
      //   this.isQuickScan = true;
      // } else {
      //   this.isQuickScan = false;
      // }
    } else {
      this.$router.push({ name: "login" });
    }
  },
  components: {
    Field,
  },
  methods: {

    cleanAndSetFouce(element) { //清除input输入框并设置焦点
      var ele = this.$refs[element].$el.querySelector("input");
      setTimeout(function () {
        ele.value = ""
        ele.focus();
      }, 100);

    },

    fDel(packages, index) {//删除 已扫描包件
      this.$messagebox({
        title: "信息确认",
        message: "确认删除：" + packages.packCode + " 吗？",
        showCancelButton: true,
      }).then((action) => {
        if (action === "confirm") {

          this.fItems.splice(index, 1);
          this.fCount = this.fItems.length;

          this.nItems.push(packages);
          this.nCount = this.nItems.length;
        }
      });
    },

    logout() {
      this.$messagebox({
        title: "信息确认",
        message: "确认退出吗？",
        showCancelButton: true,
      }).then((action) => {
        if (action === "confirm") {
          this.$router.push({ name: "login" });
        }
      });
    },

    checkTray(code) {//校验托盘号

    },
    pageLoad() {
      this.aItems = [];
      this.fItems = [],//已扫描包件
        this.nItems = [],//未扫描包件
        this.aCount = 0,//全部包件数量
        this.fCount = 0,//已扫描包件数量
        this.nCount = 0//未扫描包件数量
      this.dataList = [];
      this.pCode = '';
      this.formParam.palletCode = '';

    },
    submitPutin() {//提交入库
      this.formParam.items = this.fItems;

      if (this.formParam.palletCode.length === 0) {
        this.$toast("请扫描托盘号!");
        return;
      }
      if (this.formParam.items.length === 0) {
        this.$toast("请扫描包装条码!");
        return;
      }

      Indicator.open();
      savePalletCombination(this.formParam).then((response) => {

        if (response.code === 1) {
          Indicator.close();
          this.pageLoad();
          this.$toast("组盘入库提交成功!");
          this.$router.push({ name: "putin" });

        } else {
          Indicator.close();
          this.$toast("组盘入库提交失败!" + response.msg);
        }

      }).catch((error) => {
        Indicator.close();
      });
    },
    getNoScanning() {//没有扫描的包件
      this.nItems = [];
      this.aItems = [];

      let newArr = new Array(...this.dataList);

      for (let i = 0; i < this.dataList.length; i++) {

        for (let j = 0; j < this.fItems.length; j++) {

          if (this.dataList[i].packCode === this.fItems[j].packCode) {
            newArr = newArr.filter(item => item.packCode != this.dataList[i].packCode)
            break;
          }
        }
      }

      this.nItems = newArr;//未扫描包件


      //全部包件
      let tmpItem = this.fItems;//已扫描包件

      for (let i in tmpItem) {
        tmpItem[i].scanned = true;
        this.aItems.push(tmpItem[i])//已扫描
      }

      for (let i in newArr) {
        this.aItems.push(newArr[i])//未扫描
      }

      this.aCount = this.aItems.length;
    },
    packCodeQuery(srcData, point) {//包件查询 
      const variables = {
        packCode: point,
      };
      let data = { requests: srcData };
      const datas = dinoql(data, { variables })`
                      requests(packCode:$packCode) {
                      packCode,
                      packName,
                      orderNo,
                      serialNo
                      }`;
      return datas.requests
    },
    getPalletComb(barcode) {//调用接口获取订单包件信息

      return new Promise((resolve, reject) => {
        getMatchPackageList(barcode).then((response) => {
          if (response.code === 1) {
            if (response.data.rows.length > 0) {
              this.dataList = response.data.rows;
              resolve(this.dataList);
            } else {
              this.cleanAndSetFouce('pCode');
              this.$toast("包装条码错误!");
            }
          } else {
            this.cleanAndSetFouce('pCode');
            this.$toast("包装条码错误!");
          }
        });
      });
    },

    checkPackCode(barcode) {//校验 包件条码
      if (barcode.length > 0) {
        let arrCode = barcode.split("=");
        if (arrCode.length > 1) {
          barcode = arrCode[arrCode.length - 1]

          let js = false;

          for (let i = 0; i < arrCode.length; i++) {
            if (arrCode[i].indexOf('&cb') > -1) {
              js = true;
              break;
            }
          }

          if (js) {//解析逗号分割的包件条码
            let arrBarCode = barcode.split(",");
            if (arrBarCode.length > 1) {
              arrBarCode.forEach(element => {
                this.barCodeQuery(element);
              });
              return;
            }

          }

        }

        this.barCodeQuery(barcode);
      }
    },
    barCodeQuery(barcode) {//条码查询
      let exist = this.packCodeQuery(this.fItems, barcode);
      if (exist !== undefined) {
        this.cleanAndSetFouce('pCode');
        this.$toast("此包装条码已扫描!");

      } else {

        let queryData = this.packCodeQuery(this.dataList, barcode);
        if (queryData === undefined) {
          getMatchPackageList(barcode).then((response) => {
            if (response.code === 1) {
              if (response.data.rows.length > 0) {
                this.dataList = response.data.rows;

                let result = this.packCodeQuery(this.dataList, barcode);
                if (result !== null) {
                  this.isAShow = true;
                  this.isFShow = true;
                  this.isNShow = true;

                  //快捷扫描/常规扫描
                  if (this.isQuickScan) {
                    this.dataList.forEach(element => {
                      this.fItems.push(element);
                    });

                    // console.log(this.fItems);

                  } else {
                    this.fItems.push(result[0]);
                  }

                  this.getNoScanning();

                  this.fCount = this.fItems.length;
                  this.nCount = this.nItems.length;

                  this.cleanAndSetFouce('pCode');
                }

              } else {
                this.cleanAndSetFouce('pCode');
                this.$toast("包装条码错误!");
              }
            } else {
              this.cleanAndSetFouce('pCode');
              this.$toast("包装条码错误!" + response.msg);
            }
          })
        } else {
          this.isAShow = true;
          this.isFShow = true;
          this.isNShow = true;
          this.fItems.push(queryData[0]);
          this.getNoScanning();

          this.fCount = this.fItems.length;
          this.nCount = this.nItems.length;

          this.cleanAndSetFouce('pCode');
        }
      }
    }
  },
};
</script>
<style>
.submit {
  font-family: Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.page-navbar {
  margin-top: 2px;
}

.navbar-body {
  height: 315px;
  overflow-y: auto;
  background-color: #ffffff;
}

.page-footer {
  margin-top: 2px;
}

.item {
  margin-top: 5px;
  border: 1px solid #eaeaea;
  padding: 8px;
  background-color: #fafafa;
}

.item-scanned {
  margin-top: 5px;
  border: 1px solid #64bd63;
  padding: 8px;
  background-color: #dbeee8;
}

.header {
  height: 60px;
}

.div-a {
  float: left;
  width: 16%;
  margin-top: 5px;

}

.div-b {
  float: left;
  width: 40%;
  margin-top: 5px;
  color: black;

}

.div-c {
  float: left;
  width: 16%;
  margin-top: 5px;

}

.div-d {
  float: left;
  width: 23%;
  margin-top: 5px;
}

.div-x {
  float: left;
  width: 5%;
  margin-top: 5px;
}
</style>