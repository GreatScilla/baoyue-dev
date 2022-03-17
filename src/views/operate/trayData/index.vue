<template>
  <div>
    <iframe
      ref="iframe"
      id="bdIframe"
      src="/monitor/tray/index.html"
      frameborder="0"
      scrolling="yes"
      height="1080"
      width="100%"
    ></iframe>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      props: {},
    };
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style scoped>
#bdIframe {
  margin: 0;
}
</style>
