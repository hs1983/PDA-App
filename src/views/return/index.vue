<template>
    <div>
        <mt-header style="background-color: #2449a4" title="订单退库">
            <router-link :to="{ name: 'main' }" slot="left">
                <mt-button icon="back">上一步</mt-button>
            </router-link>
            <mt-button icon="close" slot="right" @click="logout">退&nbsp;&nbsp;出</mt-button>
        </mt-header>
        <div class="submit">
                <mt-button type="primary" style="width: 150px; background-color: #2449a4; margin-top: 10px"
                    @click="getMacAddress1">Get Mac1</mt-button>
                    <mt-button type="primary" style="width: 150px; background-color: #2449a4; margin-top: 10px"
                    @click="getMacAddress2">Get Mac2</mt-button>
                    <mt-button type="primary" style="width: 150px; background-color: #2449a4; margin-top: 10px"
                    @click="getMacAddress3">Get Mac3</mt-button>
            </div>
    </div>
</template>
<script>
import { decrypt,getNetworkIp} from "@/utils";

import getMac,{ isMAC } from 'getmac'
export default {
    data() {
        return {

        };
    },
    created() {
        var userSecret = localStorage.getItem("authorization");
        if (userSecret !== null) {
            const user = JSON.parse(decrypt(userSecret));

        } else {
            this.$router.push({ name: "login" });
        }
    },

    methods: {
        logout() {

        },
        getMacAddress1(){


          var code=getNetworkIp()

            alert(code)
           
        },
        getMacAddress2(){

                   var macAddress=require('getmac');
            require('getmac').getMac(function(err,macAddress){
                if (err)  throw err
                alert(macAddress)
            })

        },getMacAddress3(){

             require('node-macaddress').one(function (err, addr) { alert(addr); })

        }

        
            



    },
};
</script>
<style>

</style>