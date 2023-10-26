<template>
  <div>
    <mt-header style="background-color: #2449a4" title="PDA首页">
      <mt-button icon="close" slot="right" @click="logout">退&nbsp;&nbsp;出</mt-button>
    </mt-header>

    <div id="container">
      <div class="menu">
        <a href="#/putin">
          <span>包件组盘</span><br />
          <img src="../assets/img/putin.png" />
        </a>
      </div>
      <div class="menu">
        <a href="#/putout">
          <span>成品出库</span><br />
          <img src="../assets/img/putout.png" />
        </a>
      </div>
      <div class="menu">
        <a href="#/emptyout">
          <span>空托出库</span><br />
          <img src="../assets/img/trayout.png" />
        </a>
      </div>

      <div class="menu"></div>
      <div class="menu">
        <a href="#/package">
          <span>拣货装车</span><br />
          <img src="../assets/img/entrucking.png" />
        </a>
      </div>

      <div class="menu"></div>

            <!-- <div class="menu">
        <a href="#/return">
          <span>Get Mac</span><br />
          <img src="../assets/img/back.png" />
        </a>
      </div> -->
      <!-- <div class="menu">
        <a href="#/emptyin">
          <span>空托入库</span><br />
          <img src="../assets/img/trayin.png" />
        </a>
      </div> -->
      
    </div>
  </div>
</template>

<script>
import { decrypt } from "@/utils";
import global_ from "@/config";
export default {
  data() {
    return {
      imgslist: [],
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
    toDemo() {
      this.$router.push({ name: "demo" });
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
  },
};
</script>
<style>
#container {
  display: grid;
  margin-top: 50px;
  grid-template-columns: repeat(auto-fit, 33.3%);
}

.menu {
  height: 100px;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  /* border: 3px solid #ffffff;
  background-color: #2449a4; */

  border: 1px solid #e0e0e0;
  background-color: #f2f2f2;
}
.menu a {
  text-decoration: none;
}
.menu span {
  font-size: 15px;
  /* color: #ffffff */
  color: #2449a4;
}
.menu img {
  width: 48px;
  height: 48px;
}
</style>
