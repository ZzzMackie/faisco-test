<template>
  <div class="mackie-online-input" @click="showInfo" :style="{top: `${mackieList[index].info.t}px`, height: `${mackieList[index].info.h}px`,width: `${mackieList[index].info.w}px`,left:`${mackieList[index].info.l}px`,zIndex:`${mackieList[moduleIndex].info.z}`}">
    <div class="mk-o-input-title">信息调查</div>
    <div class="mk-o-input-form">
      <span>姓名:</span>
      <input type="text" class="mk-o-input-form-name"/>
    </div>
    <div class="mk-o-input-form">
      <span>性别:</span>
      <label>男</label>
      <input type="radio" name="sex" value="男"/>
      <label>女</label>
      <input type="radio" name="sex" value="女"/>
    </div>
    <div class="mk-o-input-form">
      <span>爱好:</span>
      <label>篮球</label>
      <input type="checkbox" name="hobby" value="篮球"/>
      <label>足球</label>
      <input type="checkbox" name="hobby" value="足球"/>
      <label>羽毛球</label>
      <input type="checkbox" name="hobby" value="羽毛球"/>
    </div>
    <div class="mk-o-input-form">
      <span>居住地：</span>
      <select id="adress">
        <option value="北京">北京</option>
      </select>
    </div>
    <div class="mk-o-input-form">
      <p>你的建议：</p>
      <textarea name id="advice" cols="25" rows="5"></textarea>
    </div>
    <div class="mk-o-input-submit">提交</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "MackieOnlineInput",
  data() {
    return {
      index: 0
    };
  },
  computed:mapState(['moduleIndex','mackieList']),
  created() {
    this.index = this.$attrs['data-id'];
  },
  methods: {
      showInfo () {
        
        this.$store.commit("setModuleIndex", this.$attrs['data-id']);
        this.$store.commit('changeModuleTab',1)
    }
  }
};
</script>

<style scoped lang="scss">
.mackie-online-input {
  position: absolute;
  top: 0;
  left: 0;
  border: 1px dotted rgb(88, 116, 216);
  height: 350px;
  width: 200px;
  font-size: 12px;
  .mk-o-input-form {
    margin-top: 10px;
    text-align: left;
    padding-left: 10px;
    box-sizing: border-box;
    & input{
        vertical-align: middle;
    }
    // & input[type="radio"]{
    //     background: #fff;
    //     border: none;
    // }
    #advice{
        margin-top: 15px;
    }
    .mk-o-input-form-name{
        width: 120px;
    }
    span{
        margin-right: 10px;
    }
  }
  .mk-o-input-title {
    font-size: 14px;
    margin: 20px 0;
  }
  .mk-o-input-submit {
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
}
</style>
