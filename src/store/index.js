import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        mackieList: [],
        activeIndex: 0
    },
    mutations: {
        increment(state, n) { //添加模块
            // Vue.set(state.mackieList, n);
            state.mackieList.push(n);
        },
        deleted(state, n) { //删除模块
            state.mackieList.splice(n, 1);
        },
        show(state, n) { //显示/隐藏模块
            Vue.set(state.mackieList[n], 'isShow', !state.mackieList[n].isShow);
        },
        changeModuleTab(state, n) {
            state.activeIndex = n;
        }
    }
});
export default store;