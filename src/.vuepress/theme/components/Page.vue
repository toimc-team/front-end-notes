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
  </main>
</template>

<script>
import PageEdit from '@theme/components/PageEdit.vue'
import PageNav from '@theme/components/PageNav.vue'
import { mapActions, mapState } from 'vuex'

export default {
  components: { PageEdit, PageNav },
  props: ['sidebarItems'],
  data: () => ({
    isAuth: false,
    needCheck: false,
    show: false
  }),
  mounted() {
    this.check()
  },
  computed: {
    ...mapState(['token'])
  },
  methods: {
    ...mapActions(['getAuth']),
    submit() {
      this.$store.commit('setCodeShow', true)
    },
    async check(flag = false) {
      const { path, frontmatter } = this.$page
      const { auth } = frontmatter
      console.log('🚀 ~ file: Page.vue ~ line 36 ~ check ~ auth', auth)
      this.needCheck = auth || false
      try {
        const result = await this.getAuth({ path, frontmatter })
        if (result && result.code === 200) {
          this.isAuth = result.data.all
        }
        console.log('🚀 ~ file: Page.vue ~ line 39 ~ check ~ result', result)
      } catch (error) {
        if (flag) {
          // this.show = true
          // this.$alert('')
          this.$confirm('您没有访问权限，请登录', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              // this.show = true
              this.$store.commit('setCodeShow', true)
            })
            .catch(() => {})
        }
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
</style>
