<template>
  <main class="page">
    <slot name="top" />

    <Content class="theme-default-content" />
    <Content class="theme-custom-content" slot-key="auth" v-if="isAuth" />
    <NoAuth v-else-if="!isAuth && needCheck" @click="check(true)"></NoAuth>
    <PageEdit />

    <PageNav v-bind="{ sidebarItems }" />

    <slot name="bottom" />
    <!-- <MessageBox
      :show.sync="show"
      :submit="submit"
      :msg="'您还未登录！点击确定扫一扫登录'"
    ></MessageBox> -->
    <el-dialog :visible.sync="dialogVisible" width="420px">
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="60px">
        <el-form-item label="兑换码" prop="coupon">
          <el-input
            v-model="form.coupon"
            placeholder="请输入兑换码进行兑换..."
          ></el-input>
          <!-- <span class="fmt">格式：xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx</span> -->
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
  </main>
</template>

<script>
import PageEdit from '@theme/components/PageEdit.vue'
import PageNav from '@theme/components/PageNav.vue'
import { mapActions, mapState } from 'vuex'
import { checkCoupon } from '@/api/user'

export default {
  components: { PageEdit, PageNav },
  props: ['sidebarItems'],
  data() {
    const validateCoupon = (rule, value, callback) => {
      if (
        value.trim() === '' ||
        !/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(
          value
        )
      ) {
        callback(Error('输入的格式有误，请检查!'))
      } else {
        callback()
      }
    }
    return {
      isAuth: false,
      needCheck: false,
      show: false,
      dialogVisible: false,
      form: {
        coupon: ''
      },
      rules: {
        coupon: [
          {
            validator: validateCoupon,
            trigger: 'change'
          }
        ]
      }
    }
  },
  mounted() {
    this.check()
  },
  computed: {
    ...mapState(['token'])
  },
  watch: {
    token(newval) {
      if (!newval) {
        this.isAuth = false
      }
    }
  },
  methods: {
    ...mapActions(['getAuth']),
    // submit() {
    //   this.$store.commit('setCodeShow', true)
    // },
    submitForm() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          const { code, msg } = await checkCoupon({ code: this.form.coupon })
          if (code === 200) {
            this.$message({
              message: '兑换成功，马上为您跳转',
              type: 'success'
            })
            this.dialogVisible = false
            this.check(true)
          } else {
            this.$alert(msg || '请求失败，请稍后重试')
          }
        }
      })
    },
    confirmLogin(msg, cb) {
      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          cb && cb()
        })
        .catch(() => {})
    },
    async check(flag = false) {
      if (flag && !this.token) {
        this.confirmLogin('您没有访问权限，请登录', () => {
          this.$store.commit('setCodeShow', true)
        })
        return
      }

      const { path, frontmatter } = this.$page
      const { auth } = frontmatter
      this.needCheck = auth || false
      try {
        const { code, data } = await this.getAuth({ path, frontmatter })
        if (code === 200 && JSON.stringify(data) !== '{}') {
          this.isAuth = data.all
        } else {
          this.isAuth = false
          flag &&
            this.confirmLogin('您未获得授权，兑换成为VIP继续阅读', () => {
              this.dialogVisible = true
            })
        }
      } catch (error) {
        flag &&
          this.confirmLogin('您没有访问权限，请登录', () => {
            this.$store.commit('setCodeShow', true)
          })
      }
      // if (code === 200) {
      //   this.isAuth = true
      // }
    }
  }
}
</script>

<style lang="stylus">
@require '../styles/wrapper.styl';

.page {
  padding-bottom: 2rem;
  display: block;
}

.el-dialog__footer {
  padding: 0 20px 20px !important;
}

.fmt {
  color: #999;
  font-size: 13px;
}

@media screen and (max-width: 800px) {
  .el-message-box__wrapper {
    .el-message-box {
      width: 80%;
    }
  }
}
</style>
