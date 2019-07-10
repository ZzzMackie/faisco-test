<template>
  <div class="home">
    <mackie-index></mackie-index>
  </div>
</template>

<script>
// @ is an alias to /src
import MackieIndex from "@/components/index/MackieIndex";
export default {
  name: "home",
  components: {
    MackieIndex
  }
};
</script>
<style lang="scss">
.img-hidden-text {
  text-indent: -99999px;
}
a {
  text-decoration: none;
}
p {
  margin: 0;
}
.icon {
  background-image: url(~@/assets/icon/mbg01.png);
  background-repeat: no-repeat;
}
ul,
li {
  padding: 0;
  list-style: none;
}
.fc-b {
  color: #5874d8;
}
</style>
