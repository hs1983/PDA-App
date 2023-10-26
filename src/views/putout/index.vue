<template>
    <div>
        <div class="page-header">
            <mt-header style="background-color: #2449a4" title="成品出库">
                <router-link :to="{ name: 'main' }" slot="left">
                    <mt-button icon="back">主界面</mt-button>
                </router-link>
                <mt-button icon="close" slot="right" @click="logout">退&nbsp;&nbsp;出</mt-button>
            </mt-header>
            <mt-field label="排车单号：" ref="form.pCode" v-model="form.pCode" @input="checkPCode" placeholder="请扫描排车单号！">
                <img src="../../assets/icons/scan.png" height="16px" width="16px" />
            </mt-field>

            <mt-field label="选择出库口：" readonly v-model="form.putOutExit" placeholder="请选择出库口！">
                <img src="../../assets/icons/search.png" height="16px" width="16px" @click="showPopup" />
            </mt-field>

            <mt-popup v-model="isShow" popup-transition="popup-fade" closeOnClickModal="true" position="bottom"
                style="width: 100%">
                <mt-picker :slots="dataList" @change="onValuesChange" style="width: 100%" :visible-item-count="3"
                    ref="picker">
                    <div style="display: flex;
            flex-direction: row;
            justify-content: space-around;
            height: 40px;
            line-height: 40px;
            font-size: 16px;
          ">
                        <div class="usi-btn-cancel" @click="selectedSubmit('cancel', 'picker')">
                            取消
                        </div>
                        <div class="usi-btn-sure" @click="selectedSubmit('sure', 'picker')">
                            确定
                        </div>
                    </div>
                </mt-picker>
            </mt-popup>
        </div>

        <div class="page-body">
            <div class="checklist" v-for="(item, index) in orderList" :key="index">

                <div>
                    <label class="mint-checklist-label">
                        <span class="mint-checkbox">
                            <input type="checkbox" disabled class="mint-checkbox-input" :value="item.orderNo"
                                v-model="checkBoxModel" @click="choose(item.orderNo)">
                            <span class="mint-checkbox-core"></span>
                        </span>
                        <span class="mint-checkbox-label">{{ item.orderNo }}</span>
                    </label>
                </div>
                <div>订单类型：{{ item.orderType }}</div>
                <div>经 销 商：{{ item.dealerName }}</div>
                <div>物流公司：{{ item.logisticsName }}</div>
                <div>预发日期：{{ item.shipmentDatePlaned }}</div>
                <div>配送线路：{{ item.lineName }}</div>
            </div>
        </div>
        <div class="page-footer">
            <div class="submit">
                <mt-button type="primary" style="width: 150px; background-color: #2449a4; margin-top: 10px"
                    @click="submitPutOut">确 认 出 库</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import { Indicator } from "mint-ui";
import { decrypt } from "@/utils";
import { getDeliveryOrderList, getPutOutExitList, createShipmentByOrder } from "@/apis/putout"
export default {
    data() {
        return {
            isShow: false,
            form: {
                pCode: '',
                putOutExit: '',
            },

            tagList: [],
            orderList: [],
            checkBoxModel: [],

        };
    },
    computed: {
        dataList() {
            return [
                {
                    flex: 1,
                    values: this.tagList,
                },
            ];
        },
    },
    created() {
        var userSecret = localStorage.getItem("authorization");
        if (userSecret !== null) {
            const user = JSON.parse(decrypt(userSecret));

            //获取出库口列表
            getPutOutExitList(3).then(response => {
                if (response.code === 1) {

                    var tagdata = []
                    var data = response.data.rows;
                    if (data.length > 0) {
                        data.forEach(element => {
                            tagdata.push(element.locationCode + '|' + element.locationAlias)
                        });
                    }
                    this.tagList = tagdata;
                }
            })
        } else {
            this.$router.push({ name: "login" });
        }
    },

    methods: {
        showPopup() {
            this.isShow = true;
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
        checkPCode(code) {

            if (code.length > 0) {
                Indicator.open();
                this.checkBoxModel = []
                //获取待出库订单列表
                getDeliveryOrderList(code).then(response => {
                    if (response.code === 1) {
                        this.orderList = response.data;
                        if (response.data != null) {
                            response.data.forEach(element => {
                                this.checkBoxModel.push(element.orderNo)
                            });

                        }


                    }
                    Indicator.close();
                });
            }
        },
        submitPutOut() {//确认出库
            Indicator.open();


            if (this.form.putOutExit.length === 0) {
                this.$toast("请选择出库口");
                return;
            }

            if (this.checkBoxModel.length === 0) {
                this.$toast("请扫描排车单号！");
                return;
            }
            const code = this.form.putOutExit.split('|')
            if (code.length > 0) {
                this.form.putOutExit = code[0];
            }

            createShipmentByOrder(this.form).then(response => {
                if (response.code === 1) {
                    this.$toast("创建出库单成功！");
                    Indicator.close();
                    this.$router.push({ name: "main" });

                } else {
                    Indicator.close();
                    this.$toast("创建出库单失败！");
                }
            })

        },
        selectedSubmit(type, refName) {
            this.isShow = false;
        },
        onValuesChange(picker, values) {
            console.log(values);
            this.form.putOutExit = values.toString();

        },
        choose() { }
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

.page-header {
    margin-bottom: 2px;
}

.page-body {
    height: 360px;
    overflow-y: auto;
    background-color: #ffffff;
}

.page-footer {
    margin-top: 2px;
}

/* .item {
  margin-top: 5px;
  border: 1px solid #eaeaea;
  padding: 8px;
  background-color: #fafafa;
} */

.checklist {
    padding-left: 10px;
    border: 1px solid #eaeaea;
    background-color: #fafafa;
    padding-right: 10px;
}

.checklist div {
    margin-top: 5px;
    margin-bottom: 5px;
}
</style>