<template>
  <div
  class="mackie-online-input"
    :class="this.olineInput"
    @click="showInfo"
    :style="{top: `${mackieList[index].info.t}px`, height: `${mackieList[index].info.h}px`,width: `${mackieList[index].info.w}px`,left:`${mackieList[index].info.l}px`,zIndex:`${mackieList[moduleIndex].info.z}`}"
  >
    <div class="mk-o-input-title">信息调查</div>
    <div class="mk-o-input-form">
      <span>姓名:</span>
      <input type="text" class="mk-o-input-form-name" v-model="name" />
    </div>
    <div class="mk-o-input-form">
      <span>性别:</span>
      <label>男</label>
      <input type="radio" name="sex" value="男" />
      <label>女</label>
      <input type="radio" name="sex" value="女" />
    </div>
    <div class="mk-o-input-form">
      <span>爱好:</span>
      <label>篮球</label>
      <input type="checkbox" name="hobby" value="篮球" />
      <label>足球</label>
      <input type="checkbox" name="hobby" value="足球" />
      <label>羽毛球</label>
      <input type="checkbox" name="hobby" value="羽毛球" />
    </div>
    <div class="mk-o-input-form">
      <span>居住地：</span>
      <select id="adress">
        <option value="北京">北京</option>
      </select>
    </div>
    <div class="mk-o-input-form">
      <p>你的建议：</p>
      <textarea name="advice" id="advice" cols="25" rows="5" v-model="advice"></textarea>
    </div>
    <div class="mk-o-input-submit" @click="onSubmit">提交</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import $ from "jquery";
import "jquery-ui/ui/widgets/draggable";
import "jquery-ui/ui/widgets/droppable";
import "jquery-ui/ui/widgets/resizable";
export default {
  name: "MackieOnlineInput",
  data() {
    return {
      index: 0,
      name: "",
      advice: "",
      olineInput: ''
    };
  },
  computed: mapState(["moduleIndex", "mackieList"]),
  created() {
    this.index = this.$attrs["data-id"];
    this.olineInput = `mackie-online-input${this.index}`
  },
  mounted() {
    const self = this;
    $(`.mackie-online-input${this.index}`)
    .resizable({
      maxWidth: 500,
      maxHeight: 500,
      minWidth: 200,
      minHeight: 350,
      resize( event, ui ){
        self.$store.commit('changeValue',{...self.mackieList[self.index].info})
        self.$store.commit("changeWidth", ui.size.width);
        self.$store.commit("changeHeight", ui.size.height);
      }
    })
    .draggable({
      zIndex: 100,
      containment: "parent",
      containment: ".mk-container-content",
      cursor: "pointer",
      opacity: 0.5,
      drag: function(event, ui) {
        self.$store.commit("changeLeft", ui.position.left);
        self.$store.commit("changeTop", ui.position.top);
         self.$store.commit('changeValue',{...self.mackieList[self.index].info})
      },
      stop: function() {
        // self.$store.commit("changeLeft", ui.position.left);
        // self.$store.commit("changeTop", ui.position.top);
      }
    });
  },
  methods: {
    showInfo() {
      this.$store.commit("isShowModule", true);
      this.$store.commit("setModuleIndex", this.$attrs["data-id"]);
      this.$store.commit("changeModuleTab", 1);
    },
    onSubmit() {
      const $_sexVal = $(".mk-o-input-form input:radio:checked").val();
      const $_cval = $(".mk-o-input-form input[name='hobby']:checked");
      const $_hobbyList = this.checkVal($_cval);
      const $_hobbyVal = $_hobbyList.join(",");
      const $_name = this.name;
      const $_addr = $(".mk-o-input-form #adress").val();
      const $_advice = this.advice;
      const inputInfo = [$_sexVal, $_hobbyVal, $_name, $_addr, $_advice];
      $_sexVal &&
        $_hobbyVal &&
        $_name &&
        $_addr &&
        $_advice &&
        this.$store.commit("setInputInfo", inputInfo)
        if(!$_sexVal ||
        !$_hobbyVal ||
        !$_name || !$_addr || !$_advice){ alert("信息不完整，提交失败")};
    },
    checkVal(el) {
      const checkList = [];
      for (let i = 0; i < el.length; i++) {
        checkList.push(el[i].value);
      }
      return checkList;
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
  background: #fff;
  font-size: 12px;
  .mk-o-input-form {
    margin: 10px auto 0;
    width: 200px;
    text-align: left;
    padding-left: 10px;
    box-sizing: border-box;
    & input {
      vertical-align: middle;
    }
    & input[type="radio"] {
      background: #fff;
      border: none;
    }
    #advice {
      margin-top: 15px;
    }
    .mk-o-input-form-name {
      width: 120px;
    }
    span {
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
