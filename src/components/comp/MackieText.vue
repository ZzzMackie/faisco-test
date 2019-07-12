<template>
  <div
    class="mackie-text"
    :class="this.text"
    @click="showInfo"
    :style="{top: `${mackieList[index].info.t}px`,left:`${mackieList[index].info.l}px`,zIndex:`${mackieList[index].info.z}`}"
  >
    <div class="mk-text-duoble" v-if="isInput" @dblclick="input">双击输入内容...</div>
    <input
      type="text"
      v-else
      class="mk-text-input"
      :style="{width: `${mackieList[index].info.w}px`,heigth: `${mackieList[index].info.h}px`,color:`${mackieList[index].info.fc}`}"
      v-model="mackieList[moduleIndex].info.tx"
      @input="changeInfo"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import $ from "jquery";
import "jquery-ui/ui/widgets/draggable";
import "jquery-ui/ui/widgets/droppable";
export default {
  name: "MackieText",
  data() {
    return {
      isInput: true,
      index: 0,
      text:''
    };
  },
  computed: mapState(["moduleIndex", "mackieList"]),
  created() {
    this.index = this.$attrs["data-id"];
    this.text = `mackie-text${this.index}`
  },
  mounted() {
    const self = this;
    $(`.mackie-text${this.index}`).draggable({
      zIndex: 100,
      containment: "parent",
      containment: ".mk-container-content",
      cursor: "pointer",
      opacity: 0.5,
      drag: function(event, ui) {
        self.$store.commit('changeValue',{...self.mackieList[self.index].info})
       self.$store.commit("changeLeft", ui.position.left);
        self.$store.commit("changeTop", ui.position.top);
      },
      stop: function() {
        console.log("拖拽结束");
      }
    });
  },
  methods: {
    input() {
      this.isInput = false;
    },
    showInfo() {
      this.$store.commit("isShowModule", true);
      this.$store.commit("setModuleIndex", this.$attrs["data-id"]);
      this.$store.commit("changeModuleTab", 1);
    },
    changeInfo(){
      this.$store.commit('changeValue',{...this.mackieList[this.index].info})
    }
  }
};
</script>

<style scoped lang="scss">
.mackie-text {
  position: absolute;
  .mk-text-duoble {
    border: 1px dotted rgb(88, 116, 216);
    width: 150px;
    height: 40px;
    line-height: 40px;
    color: #ccc;
  }
  .mk-text-input {
    width: 150px;
    height: 40px;
    font-size: 16px;
    line-height: 40px;
    display: inline-block;
  }
}
</style>
