<template>
    <div>
        <mt-header style="background-color: #2449a4" title="空盘入库">
            <router-link :to="{ name: 'main' }" slot="left">
                <mt-button icon="back">上一步</mt-button>
            </router-link>
            <mt-button icon="close" slot="right" @click="logout">退&nbsp;&nbsp;出</mt-button>
        </mt-header>
    </div>
</template>
<script>
import { decrypt } from "@/utils";
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

        }

    },
};
</script>
<style>

</style>