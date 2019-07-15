import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    mackieList: [],
    activeIndex: 0,
    moduleIndex: 0,
    isAdd: false
  },
  mutations: {
    increment(state, n) {
      //添加模块
      // Vue.set(state.mackieList, n);
      state.mackieList.push(n);
    },
    deleted(state, n) {
      //删除模块
      state.mackieList.splice(n, 1);
    },
    show(state, n) {
      //显示/隐藏模块
      Vue.set(state.mackieList[n], "isShow", !state.mackieList[n].isShow);
    },
    changeModuleTab(state, n) {
      //当前模块 模块信息 新增模块 索引
      state.activeIndex = n;
    },
    setModuleIndex(state, n) {
      //设置当前移动的模块索引
      state.moduleIndex = n;
    },
    changeUrl(state, n) {
      //改变链接地址
      Vue.set(state.mackieList[state.moduleIndex].info, "url", n);
    },
    changeValue(state, n) {
      //改变信息对象
      state.mackieList[state.moduleIndex].info = n;
    },
    setInputInfo(state, n) {
      //提交信息
      state.mackieList[state.moduleIndex].info.inputInfo = [...n];
    },
    isShowModule(state, n) {
      //是否展示模块
      state.isAdd = n;
    },
    changeLeft(state, left) {
      //模块位置
      state.mackieList[state.moduleIndex].info.l = left;
    },
    changeTop(state, top) {
      //模块位置
      state.mackieList[state.moduleIndex].info.t = top;
    },
    changeWidth(state, w) {
      //模块位置
      state.mackieList[state.moduleIndex].info.w = w;
    },
    changeHeight(state, h) {
      //模块位置
      state.mackieList[state.moduleIndex].info.h = h;
    },
    changeColor(state, color) {
      //模块颜色
      state.mackieList[state.moduleIndex].info.fc = color;
    }
  }
});
export default store;
