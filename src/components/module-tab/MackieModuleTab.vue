<template>
  <div class="mackie-module">
    <div class="mk-module-top-tab">
      <div class="top-tab-box">
        <i class="icon tab-box-icon"></i>
      </div>
      <ul class="top-tab-list">
        <li
          :class="{ 'tab-list-item': true, active: index === activeIndex }"
          v-for="(item, index) in tabList"
          :key="index"
          @click="changeTab(index)"
        >{{ item }}</li>
      </ul>
      <div class="top-tab-close" @click="closeModule">X</div>
    </div>
    <mackie-new-module v-show="activeIndex === 0" :newModuleList="newModuleList"></mackie-new-module>
    <mackie-information-module v-show="activeIndex === 1"></mackie-information-module>
    <mackie-now-module v-show="activeIndex === 2"></mackie-now-module>
  </div>
</template>

<script>
import MackieNewModule from "@/components/module-tab/module-content/MackieNewModule";
import MackieNowModule from "@/components/module-tab/module-content/MackieNowModule";
import MackieInformationModule from "@/components/module-tab/module-content/MackieInformationModule";
import { mapState } from "vuex";

export default {
  name: "MackieModuleTab",
  props: {
    isAdd: {
      type: Boolean
    }
  },
  data() {
    return {
      tabList: ["新增模块", "模块信息", "当前模块"],
      newModuleList: [
        {
          name: "常用",
          id: 101,
          children: [
            {
              id: 1011,
              info: {
                w: 150,
                h: 40,
                l: 0,
                t: 0,
                z: 0,
                fs: 16,
                tx: "",
                fc: "#ccc"
              },
              compName: "MackieText",
              className: "text",
              innerText: "文本",
              isShow: true
            },
            {
              id: 1012,
              info: {
                w: 500,
                h: 40,
                l: 0,
                t: 0,
                z: 0,
                url: ""
              },
              compName: "MackieImg",
              className: "img",
              innerText: "图片",
              isShow: true
            }
          ]
        },
        {
          name: "互动",
          id: 102,
          children: [
            {
              id: 1021,
              info: {
                w: 200,
                h: 350,
                l: 0,
                t: 0,
                z: 0,
                inputInfo:{},
              },
              compName: "MackieOnlineInput",
              className: "online-input",
              innerText: "在线表单",
              isShow: true
            }
          ]
        }
      ]
    };
  },
  computed: mapState(["activeIndex"]),
  methods: {
    changeTab(index) {
      this.$store.commit("changeModuleTab", index);
      // this.$bus.$activeIndex = this.activeIndex = index;
    },
    closeModule() {
      this.$store.commit("isShowModule", false);
    }
  },
  components: {
    MackieNewModule,
    MackieNowModule,
    MackieInformationModule
  }
};
</script>

<style lang="scss">
.mackie-module {
  width: 300px;
  height: 500px;
  background: #fefefe;
  box-shadow: 1px 1px 1px #ccc, -1px -1px 1px #ccc;
  position: fixed;
  left: 20px;
  top: 100px;
  overflow: hidden;
  .mk-module-top-tab {
    display: flex;
    justify-content: space-around;
    background: rgb(88, 116, 216);
  }
  .top-tab-list {
    padding: 0;
    line-height: 25px;
  }
  .tab-list-item {
    position: relative;
    display: inline-block;
    font-size: 14px;
    color: #fff;
    cursor: pointer;
    &:not(:last-child) {
      margin-right: 10px;
    }
    &.active::after {
      content: "";
      position: absolute;
      top: 30px;
      left: 20px;
      width: 0;
      height: 0;
      border: 6px solid #fff;
      border-top-color: transparent;
      border-right-color: transparent;
      border-left-color: transparent;
    }
  }
  .top-tab-box {
    background-color: #6680e1;
  }
  .tab-box-icon {
    display: inline-block;
    width: 54px;
    height: 54px;

    background-position: -435px -898px;
  }
  .top-tab-close {
    width: 43px;
    height: 58px;
    cursor: pointer;
    color: #fff;
    line-height: 58px;
  }
}
</style>
