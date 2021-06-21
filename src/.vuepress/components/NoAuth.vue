<template>
  <div>
    <div class="wrapper">
      <div class="btn" @click="clickHanlder">阅读全文</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    clickHanlder() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  height: 200px;
  top: -100px;
  z-index: 1000;
  background: linear-gradient(
    rgba(255, 255, 255, 0) 0%,
    rgb(255, 255, 255) 100%
  );
  .btn {
    position: absolute;
    left: 50%;
    top: 70%;
    bottom: 30px;
    transform: translate(-50%, -50%);
    width: 160px;
    height: 36px;
    line-height: 36px;
    font-size: 15px;
    text-align: center;
    // border: 1px solid rgb(222, 104, 109);
    border: 1px solid #3eaf7c;
    color: #3eaf7c;
    // color: rgb(222, 104, 109);
    background: rgb(255, 255, 255);
    cursor: pointer;
    border-radius: 6px;
  }
}
</style>
