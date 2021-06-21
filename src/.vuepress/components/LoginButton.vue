<template>
  <div class="nav-item">
    <div class="btn" @click="login()">快速登录</div>
  </div>
</template>

<script>
export default {
  props: ['client'],
  methods: {
    login() {
      this.$store.commit('setCodeShow', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  height: 35px;
  line-height: 38px;
  font-size: 14px;
  padding: 0 10px;
  background-image: linear-gradient(0deg, #f5f5f5, #fff);
  border: 1px solid #d9d9d9;
  user-select: none;
  touch-action: manipulation;
  border-radius: 4px;
}
</style>
