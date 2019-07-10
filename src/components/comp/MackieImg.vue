<template>
  <div class="mackie-img" @click="showInfo">
    <div class="mk-add-img" v-if="isImg === 0" @dblclick="onImg">
      <div class="mk-add-img-icon"></div>
      <p>添加图片</p>
    </div>
    <div class="mk-dialog-img" v-if="isImg === 1">
      <div class="mk-dialog-img-top">
        <p class="mk-dialog-img-top-text">设置图片模块</p>
        <div class="mk-dialog-img-top-close" @click="closeDialog"></div>
      </div>
      <div class="mk-dialog-img-content">
        <div class="mk-dialog-img-content-left">
          <div class="img-content-left-conv fc-b">常规</div>
          <div class="active-img"></div>
        </div>
        <div class="mk-dialog-img-content-right">
          <div class="img-content-right-href">
            <label class="img-content-right-href-text">图片链接：</label>
            <input type="text" v-model="url" />
          </div>
        </div>
      </div>
      <div class="mk-dialog-img-confrim" @click="showImg">确认</div>
    </div>
    <img :src="url" alt="我是图片哦" v-show="isImg === 2" id="mackie" />
  </div>
</template>

<script>
export default {
  name: "MackieImg",
  data() {
    return {
      isImg: 0,
      url: null
    };
  },
  methods: {
    onImg() {
      this.isImg = 1;
    },
    closeDialog() {
      this.isImg = 0;
    },
    showImg() {
      const $_img = document.getElementById("mackie");
      if (window.getComputedStyle($_img).width < 500) {
        this.isImg = 2;
      } else {
        alert("图片太大了！！小姐姐");
        this.isImg = 0;
      }
    },
    showInfo () {
        this.$store.commit('changeModuleTab',1)
    }
  }
};
</script>

<style scoped lang="scss">
$box: border-box;
$border: 1px solid #ccc;
.mackie-img {
  position: absolute;
  .mk-add-img {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background: rgb(97, 127, 239);
    width: 100px;
    height: 100px;
    color: #fff;
    .mk-add-img-icon {
      position: relative;
      height: 50px;
      &::after,
      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        background: #fff;
      }
      &::after {
        transform: translate(-20px, -1px);
        width: 40px;
        height: 1px;
      }
      &::before {
        transform: translate(-1px, -20px);
        height: 40px;
        width: 1px;
      }
    }
  }
  .mk-dialog-img {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-175px, -125px);
    width: 350px;
    height: 250px;
    border: $border;
    border-radius: 10px;
    box-shadow: 1px 1px 1px #ccc, -1px -1px 1px #ccc;
    box-sizing: $box;
    .mk-dialog-img-top {
      display: flex;
      justify-content: space-between;
      height: 40px;
      line-height: 40px;
      .mk-dialog-img-top-text {
        color: #111;
        font-size: 16px;
        padding-left: 10px;
      }
      .mk-dialog-img-top-close {
        position: relative;
        width: 40px;
        height: 40px;
        cursor: pointer;
        &::after,
        &::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 15px;
          height: 1px;
          background: #ccc;
        }
        &::after {
          transform: translate(-7.5px, -1px) rotate(45deg);
        }
        &::before {
          transform: translate(-7.5px, -1px) rotate(-45deg);
        }
      }
    }
    .mk-dialog-img-confrim {
      margin: 10px auto 0;
      width: 70px;
      height: 30px;
      font-size: 12px;
      color: #fff;
      line-height: 30px;
      text-align: center;
      background: rgb(97, 127, 239);
      cursor: pointer;
    }
    .mk-dialog-img-content {
      height: 150px;
      width: 100%;
      box-sizing: $box;
      border: $border;
      border-left: none;
      border-right: none;
      display: flex;
      .mk-dialog-img-content-left {
        position: relative;
        z-index: 1;
        flex: 1;
        border-right: 1px solid #ccc;
        box-sizing: $box;
        .active-img {
          position: absolute;
          transform: translateY(0);
          width: 5px;
          height: 30px;
          background: rgb(97, 127, 239);
        }
        .img-content-left-conv {
          position: absolute;
          border-right: 2px solid #fff;
          border-bottom: 1px solid #ccc;
          z-index: 2;
          height: 30px;
          font-size: 12px;
          line-height: 30px;
          width: 100%;
        }
      }
      .mk-dialog-img-content-right {
        flex: 3;
        .img-content-right-href {
          margin-top: 20px;
          .img-content-right-href-text {
            font-size: 12px;
            color: #111;
          }
        }
      }
    }
  }
}
</style>
