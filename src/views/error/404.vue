<template>
  <div class="notFound">
    <mt-header style="background-color: #2449a4" title="404">
        <router-link :to="{name:'main'}" slot="left">
        <mt-button icon="back">首页</mt-button>
      </router-link>
    </mt-header>
    <p class="msg">抱歉！您访问的页面失联了</p>
    <img src="../../assets/404.png" width="400px" height="400px" />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
<style>
.notFound {
  color: #384242;
  font-size: 18px;
  text-align: center;
}
.msg{
  padding-top: 20px;
}
</style>