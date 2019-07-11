<template>
  <div class="mackie-text" @click="showInfo" :style="{top: `${mackieList[index].info.t}px`,left:`${mackieList[index].info.l}px`,zIndex:`${mackieList[index].info.z}`}">
    <div class="mk-text-duoble" v-if="isInput" @dblclick="input">双击输入内容...</div>
    <input type="text" v-else class="mk-text-input" :style="{width: `${mackieList[index].info.w}px`,heigth: `${mackieList[index].info.h}px`}"/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "MackieText",
  data() {
    return {
      isInput: true,
      index: 0
    };
  },
  computed:mapState(['moduleIndex','mackieList']),
  created() {
    this.index = this.$attrs['data-id'];
  },
  methods: {
    input() {
      this.isInput = false;
    },
    showInfo() {
      this.$store.commit("setModuleIndex", this.$attrs['data-id']);
      this.$store.commit("changeModuleTab", 1);
      
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
