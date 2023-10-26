<template>
    <div>
        <div class="page-header">
            <mt-header style="background-color: #2449a4" title="空盘出库">
                <router-link :to="{ name: 'main' }" slot="left">
                    <mt-button icon="back">上一步</mt-button>
                </router-link>
                <mt-button icon="close" slot="right" @click="logout">退&nbsp;&nbsp;出</mt-button>
            </mt-header>

            <mt-field label="选择出库口："   readonly   v-model="form.putOutExit" placeholder="请选择出库口！">
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
            <div class="container">
                <div v-for="(item, index) in containerList" :key="index" class="item">
                    <div class="body">
                        <ul class="ui-row">
                            <li class="ui-col ui-col-50">
                                <label class="mint-checklist-label">
                            <span class="mint-checkbox">
                                <input type="checkbox" class="mint-checkbox-input" :value="item.lpn" v-model="checkBoxModel"
                                    @click="choose(item.lpn)">
                                <span class="mint-checkbox-core"></span>
                            </span>
                            <span class="mint-checkbox-label">托盘号：{{ item.lpn }}</span>
                        </label>
                            </li>
                            <li class="ui-col ui-col-50">托盘类型：空托垛</li>
                        </ul>

                    </div>
                </div>
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
import { getPutOutExitList, getcontainerList, containerPutout } from "@/apis/putout"
export default {
    data() {
        return {
            isShow: false,
            form: {
                putOutExit: '',
            },
            tagList: [],
            containerList: [],
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

            getcontainerList().then(response => {
                if (response.code === 1) {
                    this.containerList = response.data.rows;
                }
            })

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
        submitPutOut() {//确认出库

            if (this.form.putOutExit.length === 0) {
                this.$toast("请选择出库口");
                return;
            }
            if (this.checkBoxModel.length === 0) {
                this.$toast("请选择托盘号！");
                return;
            }

            Indicator.open();
            const code = this.form.putOutExit.split('|')
            if (code.length > 0) {
                this.form.putOutExit = code[0];
            }

            containerPutout(this.checkBoxModel.join(","), this.form.putOutExit).then(
                response => {
                    if (response.code === 1) {
                        this.$toast("提交成功！");
                        Indicator.close();
                        this.$router.push({ name: "emptyout" });
                    } else {
                        Indicator.close();
                        this.$toast("创建出库单失败！");
                    }
                }
            );
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
    height: 455px;
    overflow-y: auto;
    background-color: #ffffff;
}

.page-footer {
    margin-top: 2px;
}

.checklist {
    padding-left: 5px;
    border: 1px solid #eaeaea;
    background-color: #fafafa;
    padding-right: 5px;

}

.mint-checklist-label {
    margin-left: -5px;
}

.checklist div {
    margin-top: 5px;
    margin-bottom: 5px;
}

.itemBody {
    margin-top: 5px;
    height: 60px;
    padding: 8px;
}

.ui-row{
    height: 40px;
    margin-top: 10px;
}
</style>