<template>
  <div
    class="mackie-img"
    :class="this.img"
    @mousedown="showInfo"
    :style="{top: `${mackieList[index].info.t}px`,left:`${mackieList[index].info.l}px`,zIndex:`${mackieList[index].info.z}`,width: `${mackieList[index].info.w}px`,height: `${mackieList[index].info.h}px`}"
  >
    <div class="mk-add-img" v-if="mackieList[index].info.isImg === 0" @dblclick="onImg">
      <div class="mk-add-img-icon"></div>
      <p>添加图片</p>
    </div>
    <div class="mk-dialog-img" v-if="mackieList[index].info.isImg === 1">
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
            <input type="file" @change="changeImg($event)" id="up-load-img" multiple />
          </div>
          <div class="img-content-right-examples">
            <img
              class="examples-img"
              :src="item"
              :alt="'例'+(index+1)"
              v-for="(item,index) in examplesList"
              :key="index"
              @click="changeUrl(item)"
            />
          </div>
        </div>
      </div>
      <div class="mk-dialog-img-confrim" @click="showImg">确认</div>
    </div>
    <img
      :src="mackieList[index].info.url"
      alt="我是图片哦"
      v-show="mackieList[index].info.isImg === 2"
      id="mackie"
      @dblclick="onImg"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import $ from "jquery";
import "jquery-ui/ui/widgets/draggable";
import "jquery-ui/ui/widgets/droppable";
import "jquery-ui/ui/widgets/resizable";
export default {
  name: "MackieImg",
  data() {
    return {
      url: null,
      index: 0,
      examplesList: [
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1562919168933&di=45a9130de9678ebe847ea41b9e1d1b3b&imgtype=0&src=http%3A%2F%2Fwx4.sinaimg.cn%2Fbmiddle%2F97684585gy1fp2ckh0oapj21kw11vaun.jpg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1562919168933&di=45a9130de9678ebe847ea41b9e1d1b3b&imgtype=0&src=http%3A%2F%2Fwx4.sinaimg.cn%2Fbmiddle%2F97684585gy1fp2ckh0oapj21kw11vaun.jpg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1562919168933&di=45a9130de9678ebe847ea41b9e1d1b3b&imgtype=0&src=http%3A%2F%2Fwx4.sinaimg.cn%2Fbmiddle%2F97684585gy1fp2ckh0oapj21kw11vaun.jpg"
      ]
    };
  },
  computed: mapState(["moduleIndex", "mackieList", "isImg"]),
  created() {
    this.index = this.$attrs["data-id"];
    this.img = `mackie-img${this.index}`;
  },
  mounted() {
    const self = this;
    $(`.mackie-img${this.index}`)
      .resizable({
        maxWidth: 500,
        maxHeight: 500,
        minWidth: 100,
        minHeight: 100,
        resize(event, ui) {
          self.$store.commit("changeValue", {
            ...self.mackieList[self.index].info
          });
          self.$store.commit("changeWidth", ui.size.width);
          self.$store.commit("changeHeight", ui.size.height);
        }
      })
      .draggable({
        zIndex: 100,
        containment: "parent",
        containment: ".mk-container-content",
        cursor: "pointer",
        opacity: 0.5,
        drag: function(event, ui) {
          self.$store.commit("changeValue", {
            ...self.mackieList[self.index].info
          });
          self.$store.commit("changeLeft", ui.position.left);
          self.$store.commit("changeTop", ui.position.top);
        },
        stop: function() {}
      });
  },
  methods: {
    onImg() {
      this.$store.commit("changeValue", {
        ...this.mackieList[this.index].info
      });
      this.$store.commit("isShowImg", 1);
    },
    closeDialog() {
      this.$store.commit("changeValue", {
        ...this.mackieList[this.index].info
      });
      this.$store.commit("isShowImg", 0);
    },
    showImg() {
      this.$store.commit("isShowImg", 2);
      this.$store.commit("changeValue", {
        ...this.mackieList[this.index].info
      });
      this.$store.commit("changeUrl", this.url);
    },
    showInfo() {
      this.$store.commit("isShowModule", true);
      this.$store.commit("setModuleIndex", this.$attrs["data-id"]);
      this.$store.commit("changeModuleTab", 1);
    },
    changeInfo() {
      this.$store.commit("changeValue", {
        ...this.mackieList[this.index].info
      });
    },
    changeUrl(item) {
      this.url = item;
      alert('已选中例图，按确认载入图片')
    },
    changeImg(el) {
      const img = el.target.files[0];
      const type = img.type.split("/")[0];
      if (type === "image") {
        //base64编码
        const reader = new FileReader();
        reader.readAsDataURL(img);
        const self = this;
        reader.onloadend = () => {
          const dataUrl = reader.result;
          this.url = dataUrl;
        };
      } else {
        alert("打假");
      }
    }
  }
};
</script>

<style scoped lang="scss">
$box: border-box;
$border: 1px solid #ccc;
#mackie {
  width: 100%;
  height: 100%;
}
.mackie-img {
  // position: absolute;
  height: 100px;
  margin: 10px 10px 0 0;
  .mk-add-img {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background: rgb(97, 127, 239);
    width: 100%;
    height: 100%;
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
    background: #fff;
    position: fixed;
    z-index: 999;
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
        .img-content-right-examples {
          text-align: left;
          padding: 10px 5px 10px 20px;
          box-sizing: $box;
        }
        .examples-img {
          width: 40px;
          
          margin-right: 10px;
          cursor: pointer;
          transition: all .2s;
          &:hover {
            border-radius: 5px;
            transform: scale(1.2);
          }
        }
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
