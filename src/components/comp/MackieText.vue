<template>
  <div class="mackie-text" @click="showInfo">
    <div class="mk-text-duoble" v-if="isInput" @dblclick="input">
      双击输入内容...
    </div>
    <input type="text" v-else class="mk-text-input" />
  </div>
</template>

<script>
export default {
  name: "MackieText",
  data() {
    return {
      isInput: true
    };
  },
  methods: {
    input() {
      this.isInput = false;
    },
    showInfo () {
        this.$store.commit('changeModuleTab',1)
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
    line-height: 40px;
    display: inline-block;
  }
}
</style>
