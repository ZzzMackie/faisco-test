<template>
  <div class="mackie-container">
    <a
      href="javascript:void(0);"
      class="mk-container-module-btn icon img-hidden-text"
      @click="addModule"
    >模块</a>
    <div class="mk-container-content modulex-box">
      <mackie-container  />
    </div>
    <mackie-module-tab v-show="isAdd"></mackie-module-tab>
    <a href="javascript:void(0);" class="mk-container-save-btn" @click="onSave">保存</a>
  </div>
</template>

<script>
import MackieModuleTab from "@/components/module-tab/MackieModuleTab";
import MackieContainer from "@/components/comp/MackieContainer";
import { mapState } from 'vuex';
export default {
  name: "MackieIndex",
  data() {
    return {
      
    };
  },
  computed: mapState(['mackieList','isAdd']),
  components: {
    MackieModuleTab,
    MackieContainer
  },
  methods: {
    addModule() {
      this.$store.commit("isShowModule", true);
    },
    onSave() {
      console.log(JSON.stringify(this.mackieList))
    }
  }
};
</script>

<style lang="scss">
.mackie-container {
  display: flex;
  justify-content: space-around;
  min-width: 1200px;
  margin-top: 40px;
  .modulex-box {
    position: relative;
    width: 500px;
    height: 500px;
    border: 1px dotted skyblue;
  }
  .mk-container-module-btn {
    display: inline-block;
    color: #fff;
    line-height: 54px;
    text-align: center;
    border-radius: 50%;
    box-shadow: 1px 1px 1px #ccc, -1px -1px 1px #ccc;
    width: 54px;
    height: 54px;
    background-position: -493px -900px;
    &:hover {
      text-indent: 0;
      background: rgb(88, 116, 216);
    }
  }
  .mk-container-save-btn {
    display: inline-block;
    width: 100px;
    height: 20px;
    line-height: 20px;
    color: #fff;
    font-size: 16px;
    padding: 10px;
    background: rgb(88, 116, 216);
  }
}
</style>
