<template>
  <div v-if="show" @click="hide">
    <div class="wrapper">
      <div class="info">打开微信扫一扫</div>
      <div class="box">
        <div class="qrcode">
          <img class="box-img" :src="src" alt="qrcode" v-show="src" />
          <div class="tips-mask" v-if="expire">
            <p>小程序二维码状态已过期</p>
          </div>
        </div>
        <div class="resend" v-show="expire" @click.stop="getImg">
          重新获取二维码
        </div>
      </div>
    </div>
    <div class="mask"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getQrCode, getUserByScene } from '@/api/user'
import { nanoid } from 'nanoid'
import dayjs from 'dayjs'
export default {
  data: () => ({
    expire: false,
    src: '',
    date: '',
    ctrl: parseInt(localStorage.getItem('ctrl')) || ''
  }),
  mounted() {
    // this.getImg()
    clearInterval(this.ctrl)
  },
  watch: {
    show(newval) {
      if (newval) {
        this.getImg()
      }
    }
  },
  computed: {
    ...mapState({
      show: state => state.qrcodeShow
    })
  },
  methods: {
    async getImg() {
      clearInterval(this.ctrl)
      const local = localStorage.getItem('scene')
      if (!local) {
        this.scene = nanoid()
        localStorage.setItem('scene', this.scene)
      } else {
        this.scene = local
      }
      this.expire = false
      const result = await getQrCode({
        scene: this.scene
      })
      const bytes = new Uint8Array(result)
      let storeData = ''
      const len = bytes.byteLength
      for (let i = 0; i < len; i++) {
        storeData += String.fromCharCode(bytes[i])
      }
      // const blob = new Blob([result], { type: 'image/png' })
      // const imageUrl = (window.URL || window.webkitURL).createObjectURL(blob)
      this.src = 'data:image/png;base64,' + window.btoa(storeData)
      this.date = new Date()
      this.checkLogin()
    },
    checkLogin() {
      this.ctrl = setInterval(async () => {
        const result = await getUserByScene({ scene: this.scene })
        if (result.code === 200 && result.data && result.data.username) {
          this.$store.commit('setUserInfo', result.data)
          this.$store.commit('setToken', result.token)
          this.$store.commit('setRefreshToken', result.refreshToken)
          this.hide()
        }
        const diff = Math.abs(dayjs(this.date).diff(dayjs()))
        // 超过2分钟，即过期
        if (diff > 120 * 1000) {
          clearInterval(this.ctrl)
          this.expire = true
        }
      }, 2000)
      localStorage.setItem('ctrl', this.ctrl)
    },
    hide() {
      clearInterval(this.ctrl)
      this.$store.commit('setCodeShow', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba($color: #000000, $alpha: 0.4);
  z-index: 9090;
  left: 0;
  top: 0;
}

.wrapper {
  position: absolute;
  background: #fff;
  min-width: 350px;
  min-height: 300px;
  max-width: 400px;
  max-height: 400px;
  border-radius: 6px;
  z-index: 10000;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 40px 60px;
  display: flex;
  flex-flow: column nowrap;
  .info {
    font-size: 26px;
    color: #2c2c40;
    letter-spacing: 0;
    line-height: 26px;
    font-weight: 400;
  }
  .box {
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    flex: 1;
    .qrcode {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
      .box-img {
        width: 220px;
        height: 220px;
      }
    }
    .resend {
      color: #3eaf7c;
    }
  }
  .tips-mask {
    position: absolute;
    padding: 5px 25px;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 8px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #fff;
    letter-spacing: 0;
    text-align: center;
    top: 50%;
    transform: translateY(-50%);
    p {
      line-height: 0 !important;
    }
  }
}
</style>
