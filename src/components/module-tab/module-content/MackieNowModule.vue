<template>
  <div class="mackie-now-module">
    <ul class="mk-now-list">
      <li class="mk-now-list-item" v-if="mackieList.length === 0">啥也没有</li>
      <li class="mk-now-list-item" v-for="(item, index) in mackieList" :key="index">
        <div class="mk-now-list-item-text">{{item.innerText}}</div>
        <div class="mk-now-list-item-control">
          <div
            :class="{ 'now-item-show-icon': true,'icon': true, active: item.isShow }"
            @click="isShowModule(index)"
          ></div>
          <div class="now-item-delete-icon icon" @click="deleteModule(index)"></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MackieNowModule",
  data() {
    return {};
  },
  computed: mapState(["mackieList"]),
  methods: {
    deleteModule(index) {
      this.$store.commit("deleted", index);
    },
    isShowModule(index) {
      this.$store.commit("show", index);
    }
  }
};
</script>

<style scoped lang="scss">
.mackie-now-module {
  overflow-y: scroll;
  height: 430px;
  margin-right: -20px;
}
.mk-now-list-item {
  display: flex;
  width: 90%;
  margin: 0 auto;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  justify-content: space-between;
  padding: 0 20px;
  margin-bottom: 10px;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #ccc;
  .mk-now-list-item-control {
    text-align: center;
  }
  .now-item-show-icon {
    display: inline-block;
    vertical-align: middle;
    margin-top: -3px;
    margin-right: 18px;
    width: 15px;
    height: 10px;
    background-position: -690px -588px;

    cursor: pointer;
    &.active {
      background-position: -627px -586px;
    }
  }
  .now-item-delete-icon {
    display: inline-block;
    width: 14px;
    height: 14px;
    vertical-align: middle;
    margin-top: -3px;
    cursor: pointer;
    background-position: -659px -584px;
  }
}
</style>
