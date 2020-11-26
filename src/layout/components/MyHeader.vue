<template>
  <div class="head-box">
    <div class="system-titleBox">
      <img class="logo-icon" src="@/assets/icon/logo.png">
      <div class="logo-text">
        <span>泽普县基础社会治理平台</span>
      </div>
    </div>
    <div class="right">
      <img id="headerIcon" src="@/assets/icon/default.png">
      <span>欢迎您，</span><span id="header_username">{{ name }}</span>
      <span class="nowTime">{{ datetime }}</span>
      <img
        class="QRCodeDiv"
        src="@/assets/icon/APP.png"
        @mouseenter="QRShow = 1"
        @mouseleave="QRShow = 0"
      >
      <span>智慧社区APP</span>
      <a class="exitBtn"><i /></a>
      <!--二维码-->
      <div v-show="QRShow == 1" class="QRCodeBox">
        <div class="QRCodeBoxArrow" />
        <div class="QRCodeBoxBG">
          <img src="@/assets/icon/QRCode.png">
          <p>手机浏览器下载二维码</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { parseTime } from '@/utils/index'
export default {
  name: 'MyHeader',
  data() {
    return {
      datetime: '',
      QRShow: 0 // 标记二维码是否显示
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  mounted() {
    this.dateTimeUpdate()
  },
  methods: {
    dateTimeUpdate() {
      setInterval(() => {
        this.datetime = parseTime(
          new Date(),
          '{y}-{m}-{d} {h}:{i}:{s} 星期{a}'
        )
      }, 100)
    }
  }
}
</script>
<style lang="scss" scoped>
.head-box {
  position: fixed;
  background-color: #4b7ac2;
  height: 64px;
  width: 100%;
  color: #ffffff;
  .system-titleBox {
    width: 30%;
    font-size: 22px;
    img {
      float: left;
      margin: 0 20px;
    }
    .logo-text {
      line-height: 64px;
      float: left;
    }
  }
  .right {
    float: right;
    line-height: 64px;
    .nowTime {
      margin: 0 10px;
    }
    img {
      vertical-align: middle;
      margin: 0 10px;
    }
    .exitBtn {
      cursor: pointer;
      display: inline-block;
      padding: 0 15px;
      margin-right: 2px;
      margin-left: 10px;
      position: relative;
      i {
        display: inline-block;
        width: 18px;
        height: 18px;
        position: relative;
        top: 2px;
        background: url("../../assets/icon/exit.png");
        &:hover {
          background: url("../../assets/icon/exit_hover.png");
        }
        &:after {
          content: "";
          display: inline-block;
          position: absolute;
          top: -7px;
          left: -15px;
          width: 2px;
          height: 34px;
          background-color: #b7d3ff;
        }
      }
    }
    .QRCodeBox {
      z-index: 100;
      width: 150px;
      position: absolute;
      right: 105px;
      color: #303d51;
      .QRCodeBoxArrow {
        width: 16px;
        display: revert;
        height: 8px;
        position: relative;
        z-index: 35;
        background: url("../../assets/icon/arrow.png");
        margin: -2px auto;
      }
      .QRCodeBoxBG {
        padding: 10px;
        padding-bottom: 0;
        background-color: #f7fafe;
        border: solid 1px #d7dee8;
        img {
          width: 100%;
          margin: 0;
        }
        p {
          font-size: 12px;
          text-align: center;
          height: 30px;
          line-height: 30px;
          margin: 0;
        }
      }
    }
  }
}
</style>
