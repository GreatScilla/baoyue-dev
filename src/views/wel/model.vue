<template>
  <div style="height: 100%">
 <!-- <model-obj 
  id="finalResult"
  :src="`${publicPath}model/33.obj`"
  :mtl="`${publicPath}model/33.mtl`"
  backgroundColor="rgb(0,0,0)"
  :scale="{ x: 0.8, y: 0.8, z: 0.8 }"
  >
</model-obj> -->
 <iframe
      ref="iframe"
      id="bdIframe"
      src="/model/index.html"
      frameborder="0"
      scrolling="yes"
      height="1080"
      width="100%"
    ></iframe>
  </div>
</template>
 
<script>
import { ModelObj } from "vue-3d-model";

export default {
  components: {
    ModelObj,
  },
  data() {
    return {
        publicPath: process.env.BASE_URL
    };
  },
  mounted() {},
  methods: {},
};
</script>
 
<style>
</style>