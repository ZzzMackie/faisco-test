<template>
  <div class="mackie-new-module">
    <ul class="new-module-list">
      <div class="new-list-item-search">
        <div class="search-icon"></div>
      </div>
      <li class="new-module-list-item" v-for="item in newModuleList" :key="item.id">
        <div class="new-list-item-title fc-b">{{ item.name }}</div>
        <ul class="new-list-item-box">
          <li
            class="list-item-box-content"
            v-for="md in item.children"
            :class="md.className"
            :key="md.className"
            @dblclick="renderModule(md)"
            @mousedown.stop="addModule(md, $event)"
          >
            <div class="module-icon icon"></div>
            <span class="module-text">{{ md.innerText }}</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { setTimeout, clearTimeout } from "timers";
export default {
  name: "MackieNewModuleme",
  props: {
    newModuleList: {
      type: Array
    }
  },
  data() {
    return {
      flag: false
    };
  },
  methods: {
    move(e) {
      this.containerX = document.getElementsByClassName(
        "mk-container-content"
      )[0].offsetLeft;
      this.containerY = document.getElementsByClassName(
        "mk-container-content"
      )[0].offsetTop;
      this.nowX = e.clientX;
      this.nowY = e.clientY;
      this.nowOX = e.offsetX;
      this.nowOY = e.offsetY;
      this.disOX = this.nowOX - this.offsetX;
      this.disOY = this.nowOY - this.offsetY;
      this.disX = this.nowX - this.oX;
      this.disY = this.nowY - this.oY;
      this.$div.style.top = `${this.nowY}px`;
      this.$div.style.left = `${this.nowX}px`;
    },
    renderModule(item) {
      debugger;
      this.$store.commit("increment", { ...item });
    },
    debounce(func, wait) {
      //防抖
      let timer = null;
      return function(...args) {
        if (!timer) {
          func.apply(null, args);
          timer = setTimeout(function() {
            timer = null;
          }, wait);
        }
      };
    },
    addModule(item, e) {
      const self = this;
      this.item = { ...item };
      this.oX = e.clientX;
      this.oY = e.clientY;
      this.offsetX = e.offsetX;
      this.offsetY = e.offsetY;

      this.timer = setTimeout(function() {
        self.$div = document.createElement("div");
        self.$div.style.width = "50px";
        self.$div.style.height = "50px";
        self.$div.style.background = "red";
        self.$div.style.position = "fixed";
        self.$div.style.zIndex = "99";
        e.target.appendChild(self.$div);
      }, 1000);

      document.addEventListener("mousemove", this.move);
      e.target.addEventListener("mouseup", function() {
        if (
          self.nowX >= self.containerX &&
          self.nowY >= self.containerY &&
          self.disX !== undefined && self.$div
        ) {
          self.$store.commit("increment", self.item);
        }
        clearTimeout(self.timer)
        self.$div.remove();
        document.removeEventListener("mousemove", self.move);
      });
    }
  }
};
</script>

<style scoped lang="scss">
ul {
  margin: 0;
}
.new-module-list {
  position: relative;
  .new-list-item-title {
    position: relative;
    padding-left: 25px;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    height: 46px;
    line-height: 46px;
    text-align: left;
    &::after {
      content: "";
      position: absolute;
      top: 20px;
      transform: rotate(-45deg);
      left: 10px;
      width: 0;
      height: 0;
      border: 6px solid #5874d8;
      border-bottom-color: transparent;
      border-right-color: transparent;
      border-left-color: transparent;
    }
  }
  .module-text {
    font-size: 14px;
  }
  .module-icon {
    position: relative;
    height: 30px;
    width: 37px;
    margin: 16px auto 5px auto;
  }
  .text .module-icon {
    background-position: -451px -1201px;
  }
  .img .module-icon {
    background-position: -499px -1201px;
  }
  .online-input .module-icon {
    background-position: -597px -1351px;
  }
}
.new-list-item-search {
  position: absolute;
  top: 0;
  right: 14px;
  width: 160px;
  height: 46px;
  line-height: 46px;
  text-align: right;
  .search-icon {
    position: absolute;
    top: 9px;
    right: 0;
    display: inline-block;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #f0f0f0 url(~@/assets/icon/mbg01.png) -1020px -576px no-repeat;
    vertical-align: middle;
    cursor: pointer;
  }
}
.new-list-item-box {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  .list-item-box-content {
    display: inline-block;
    margin: 0 10px;
    cursor: pointer;
    &:hover {
      color: #5874d8;
    }
    &.text:hover .module-icon {
      background-position: -1379px -138px;
    }
    &.img:hover .module-icon {
      background-position: -1427px -138px;
    }
    &.online-input:hover .module-icon {
      background-position: -1525px -288px;
    }
  }
}
</style>
