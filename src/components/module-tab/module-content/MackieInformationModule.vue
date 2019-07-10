<template>
  <div class="mackie-infomation">
    {{mackieList[moduleIndex]}}
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

<style scoped lang="scss"></style>
