<template>
  <div class="wrapper" v-if="show">
    <div class="modal">
      <div class="title">{{ title }}</div>
      <div class="msg">{{ msg }}</div>
      <div class="btns">
        <button class="cancel" @click="cancelCallBack">取消</button>
        <button class="submit" @click="submitCallBack">确定</button>
      </div>
    </div>
    <div class="mask"></div>
  </div>
</template>

<script>
export default {
  name: 'MessageBox',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    msg: {
      type: String,
      default: ''
    },
    submit: {
      type: Function
      // default: () => {}
    }
  },
  methods: {
    submitCallBack() {
      this.$emit('update:show', false)
      this.submit && this.submit()
    },
    cancelCallBack() {
      this.$emit('update:show', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba($color: #000000, $alpha: 0.4);
  z-index: 2000;
}
.modal {
  position: absolute;
  z-index: 3000;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 320px;
  height: 220px;
  background: #fff;
  border-radius: 8px;
  display: flex;
  flex-flow: column nowrap;
  padding: 15px;
  .title {
    // padding: 0 15px;
  }
  .msg {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .btns {
    text-align: center;
    padding-bottom: 25px;
    button {
      border: none;
      width: 120px;
      height: 40px;
      border-radius: 8px;
      color: #fff;
      background: #ccc;
      font-size: 16px;
      &.submit {
        background: #4fd89a;
        margin-left: 15px;
        &:hover,
        &:focus {
          background: darken($color: #4fd89a, $amount: 10);
        }
      }
    }
  }
}
</style>
