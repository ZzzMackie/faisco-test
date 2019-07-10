<template>
  <div class="mackie-module-container">
    <div class="mk-container-add-module" v-if="mackieList.length === 0 " @click="addModule">添加模块</div>
    <component :is="item.compName" v-for="(item,index) in mackieList" :key="index" v-show="item.isShow">
      <template v-show="item.isShow">
        <mackie-text></mackie-text>
        <mackie-img></mackie-img>
        <mackie-online-input></mackie-online-input>
      </template>
    </component>
  </div>
</template>
 
<script>
import MackieText from "@/components/comp/MackieText";
import MackieImg from "@/components/comp/MackieImg";
import MackieOnlineInput from "@/components/comp/MackieOnlineInput";
import { mapState } from "vuex";
export default {
  name: "MackieContainer",
  props: {
    isAdd: {
      type: Boolean
    }
  },
  data() {
    return {};
  },
  computed: mapState(["mackieList"]),
  components: {
    MackieText,
    MackieImg,
    MackieOnlineInput
  },
  methods: {
    addModule() {
      this.$emit("onshow");
    }
  }
};
</script>
 
<style scoped lang = "scss">
.mackie-module-container {
  position: absolute;
  .mk-container-add-module {
    margin: 250px 150px;
    border: 1px dotted #ccc;
    height: 50px;
    width: 200px;
    line-height: 50px;
    text-align: center;
    cursor: pointer;
  }
}
</style>