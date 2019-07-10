<template>
  <div class="mackie-infomation">
    <div class="mk-info-title">
      <span>模块信息</span>
      <span >{{mackieList[moduleIndex].innerText + '模块'}}</span>
    </div>
    <ul class="mk-info-list">
      <li class="mk-info-list-item"><label >模块宽度：</label><input type="text" :value="mackieList[moduleIndex].w"></li>
      <li class="mk-info-list-item"><label >模块高度：</label><input type="text" :value="mackieList[moduleIndex].h"></li>
      <li class="mk-info-list-item"><label >模块左距：</label><input type="text" :value="mackieList[moduleIndex].l"></li>
      <li class="mk-info-list-item"><label >模块顶距：</label><input type="text" :value="mackieList[moduleIndex].t"></li>
      <li class="mk-info-list-item"><label >模块层级：</label><input type="text" :value="mackieList[moduleIndex].z"></li>
      <li class="mk-info-list-item item-url" v-if="mackieList[moduleIndex].url !== undefined"><label >图片链接：</label><input type="text" :value="mackieList[moduleIndex].url"></li>
      <li class="mk-info-list-item" v-if="mackieList[moduleIndex].itx !== undefined"><label >用户提交信息：</label><input type="text" :value="mackieList[moduleIndex].itx"></li>
      <li class="mk-info-list-item" v-if="mackieList[moduleIndex].fs !== undefined"><label >文本字号：</label><input type="text" :value="mackieList[moduleIndex].fs"></li>
      <li class="mk-info-list-item item-text" v-if="mackieList[moduleIndex].tx !== undefined"><label >文本内容：</label><input type="text" :value="mackieList[moduleIndex].tx"></li>
      <li class="mk-info-list-item" v-if="mackieList[moduleIndex].fc !== undefined"><label >文本颜色：</label><div class="color-box" :style="{ background: mackieList[moduleIndex].fc}"></div></li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "MackieInformationModule",
  data() {
    return {
    };
  },
  computed:mapState(['moduleIndex','mackieList'])
};
</script>

<style scoped lang="scss">
.mk-info-title{
  height: 40px;
  line-height: 40px;
  font-size: 12px;
  margin: 0 0 0 20px;
  text-align: left;
  span:nth-of-type(1){
    color: rgb(88, 116, 216)
  }
  span:nth-of-type(2){
    color: #000;
    font-size: 14px;
    font-weight: bold;
    margin-left: 15px;
  }
}
  .mk-info-list-item{
    margin-bottom: 10px;
    text-align: left;
    padding-left: 20px;
    font-size: 12px;
    color: #000;
    box-sizing: border-box;
    &.item-text input,&.item-url input{
      height: 60px;
    }
    .color-box{
      display: inline-block;
      width: 25px;
      height: 25px;
      vertical-align: middle;
    }
  }
</style>
