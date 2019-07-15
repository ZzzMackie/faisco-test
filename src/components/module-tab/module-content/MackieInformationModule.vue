<template>
  <div class="mackie-infomation" @click.stop="hideModuleInfo">
    <div class="mk-null" v-if="mackieList.length === 0">information is null</div>
    <div class="mk-info" v-if="mackieList.length !== 0">
      <div class="mk-info-title">
        <span>模块信息</span>
        <span @click.stop="showModuleInfo">{{mackieList[moduleIndex].innerText + '模块'}}</span>
        <div class="mk-info-title-wrap" v-if="isShowModuleInfo">
          <div class="mk-info-title-box">
            <ul class="mk-info-title-list">
              <li
                v-for="(item,index) in mackieList"
                :key="index"
                @click="showNowModule(index)"
              >{{item.innerText}}</li>
            </ul>
          </div>
        </div>
      </div>
      <ul class="mk-info-list">
        <li class="mk-info-list-item">
          <label>模块宽度：</label>
          <input type="number" v-model="mackieList[moduleIndex].info.w" @input="changeInfo" />
        </li>
        <li class="mk-info-list-item">
          <label>模块高度：</label>
          <input type="number" v-model="mackieList[moduleIndex].info.h" @input="changeInfo" />
        </li>
        <li class="mk-info-list-item">
          <label>模块左距：</label>
          <input type="number" v-model="mackieList[moduleIndex].info.l" @input="changeInfo" />
        </li>
        <li class="mk-info-list-item">
          <label>模块顶距：</label>
          <input type="number" v-model="mackieList[moduleIndex].info.t" @input="changeInfo" />
        </li>
        <li class="mk-info-list-item">
          <label>模块层级：</label>
          <input type="number" v-model="mackieList[moduleIndex].info.z" @input="changeInfo" />
        </li>
        <li
          class="mk-info-list-item item-url"
          v-if="mackieList[moduleIndex].info.url !== undefined"
        >
          <label>图片链接：</label>
          <textarea
            cols="22"
            rows="5"
            type="text"
            v-model="mackieList[moduleIndex].info.url"
            @input="changeInfo"
          ></textarea>
        </li>
        <li class="mk-info-list-item" v-if="mackieList[moduleIndex].info.inputInfo !== undefined">
          <label>用户提交信息：</label>
          <span v-show="!mackieList[moduleIndex].info.inputInfo[0]">暂无信息</span>
          <ul class="submit-info" v-show="mackieList[moduleIndex].info.inputInfo[0]">
            <li v-for="(item,index) in adviceList" :key="index">
              <span>{{item}}:</span>
              <span>{{mackieList[moduleIndex].info.inputInfo[index]}}</span>
            </li>
          </ul>
        </li>
        <li class="mk-info-list-item" v-if="mackieList[moduleIndex].info.fs !== undefined">
          <label>文本字号：</label>
          <input type="text" v-model="mackieList[moduleIndex].info.fs" @input="changeInfo" />
        </li>
        <li
          class="mk-info-list-item item-text"
          v-if="mackieList[moduleIndex].info.tx !== undefined"
        >
          <label>文本内容：</label>
          <textarea
            cols="22"
            rows="5"
            type="text"
            v-model="mackieList[moduleIndex].info.tx"
            @input="changeInfo"
          ></textarea>
        </li>
        <li class="mk-info-list-item" v-if="mackieList[moduleIndex].info.fc !== undefined">
          <label>文本颜色：</label>
          <div
            class="color-box"
            :style="{ background: mackieList[moduleIndex].info.fc}"
            @click.stop="showModuleColor"
          ></div>
          <div class="mk-info-color-wrap" v-if="isShowModuleColor">
            <div class="mk-info-color-box">
              <ul class="mk-info-color-list">
                <li
                  v-for="(item,index) in colorList"
                  :key="index"
                  @click.stop="changeNowcolor(item)"
                  :style="{ background: item}"
                ></li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MackieInformationModule",
  data() {
    return {
      info: {},
      adviceList: ["姓名", "性别", "爱好", "地址", "留言"],
      colorList: [
        "rgb(241, 58, 58)",
        "rgb(237, 61, 161)",
        "rgb(196, 0, 0)",
        "rgb(255, 101, 55)",
        "rgb(255, 192, 1)",
        "rgb(74, 179, 68)",
        "rgb(2, 178, 181)",
        "rgb(7, 108, 224)",
        "rgb(30, 80, 174)",
        "rgb(0, 160, 233)",
        "rgb(139, 14, 234)",
        "rgb(43, 43, 43)"
      ],
      isShowModuleInfo: false,
      isShowModuleColor: false
    };
  },
  computed: mapState(["moduleIndex", "mackieList"]),
  methods: {
    changeInfo() {
      this.$store.commit("changeValue", {
        ...this.mackieList[this.moduleIndex].info
      });
    },
    showModuleInfo() {
      this.isShowModuleInfo = true;
    },
    showModuleColor() {
      this.isShowModuleColor = true;
    },
    changeNowcolor(item) {
      this.$store.commit("changeColor", item);
    },
    hideModuleInfo() {
      this.isShowModuleInfo = false;
      this.isShowModuleColor = false;
    },
    showNowModule(index) {
      this.$store.commit("setModuleIndex", index);
    }
  }
};
</script>

<style scoped lang="scss">
.mk-info-title {
  height: 40px;
  line-height: 40px;
  font-size: 12px;
  margin: 0 0 0 20px;
  text-align: left;
  .mk-info-title-wrap {
    position: relative;
    z-index: 2;
    border: 1px solid #ccc;
    border-top: none;
    margin-top: -10px;
    margin-left: 63px;
    width: 130px;
    height: 100px;
    overflow: hidden;
  }
  .mk-info-title-box {
    background: #fff;
    width: 150px;
    height: 100px;
    margin-right: -20px;
    overflow-y: scroll;
    .mk-info-title-list {
      li {
        color: #000;
        line-height: 1;
        padding: 5px 0 5px 5px;
        cursor: pointer;
        &:hover {
          color: rgb(88, 116, 216);
        }
      }
      li:not(:last-of-type) {
        border-bottom: 1px solid #ccc;
      }
    }
  }
  span:nth-of-type(1) {
    color: rgb(88, 116, 216);
  }
  span:nth-of-type(2) {
    color: #000;
    font-size: 14px;
    font-weight: bold;
    margin-left: 15px;
    cursor: pointer;
  }
}
.mk-info-list-item {
  margin-bottom: 10px;
  text-align: left;
  padding-left: 20px;
  font-size: 12px;
  color: #000;
  box-sizing: border-box;
  textarea {
    vertical-align: middle;
  }
  &.item-text input,
  &.item-url input {
    height: 60px;
  }
  .mk-info-color-wrap {
    position: relative;
    z-index: 2;
    border: 1px solid #ccc;
    border-left: none;
    margin-top: -25px;
    margin-left: 90px;
    width: 130px;
    height: 100px;
    overflow: hidden;
    .mk-info-color-box {
      background: #fff;
      width: 150px;
      height: 100px;
      margin-right: -20px;
      overflow-y: scroll;
      .mk-info-color-list {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        li {
          width: 20px;
          height: 20px;
          margin: 5px;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.2s;
          &:hover {
            border-radius: 0;
            transform: rotate(45deg);
          }
        }
      }
    }
  }
  .submit-info {
    margin-left: 80px;
    li {
      padding: 5px;
      span:nth-of-type(1) {
        padding-right: 5px;
      }
    }
  }
  .color-box {
    display: inline-block;
    width: 25px;
    height: 25px;
    vertical-align: middle;
  }
}
.mk-null {
  border: 1px solid #ccc;
  color: aqua;
  width: 90%;
  margin: 16px auto 0;
  height: 50px;
  box-sizing: border-box;
  line-height: 50px;
      padding: 0 20px;
      border-radius: 5px;
          font-size: 14px;
}
</style>
