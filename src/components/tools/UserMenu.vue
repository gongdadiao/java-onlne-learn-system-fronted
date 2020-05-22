<template>
  <div class="user-wrapper">
    <div class="content-box">
      <a-dropdown>
        <span class="action ant-dropdown-link user-dropdown-menu" @click="clickLogButton">
          <a-avatar class="avatar" size="small" :src="avatar()"/>
          <span>{{ this.nickName() }}</span>
        </span>
        <a-menu v-if="this.$store.state.user.name!=null && this.$store.state.user.name!=''" slot="overlay" class="user-dropdown-menu-wrapper">
          <a-menu-item key="1" >
            <router-link :to="{ name: 'settings' }">
              <a-icon type="setting"/>
              <span>用户设置</span>
            </router-link>
          </a-menu-item>
          <a-menu-divider/>
          <a-menu-item key="2" >
            <router-link :to="{ name: 'messages' }">
<!--              <a-icon type="setting"/>-->
              <span>消息</span>
            </router-link>
          </a-menu-item>
          <a-menu-divider/>
          <a-menu-item key="3">
            <a href="javascript:;" @click="handleLogout">
              <a-icon type="logout"/>
              <span>退出登录</span>
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
    <login ref="createLoginModal"></login>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import  Login  from '../../views/user/Login'

export default {
  name: 'UserMenu',
  components: {
    Login
  },
  data(){
    return{

    }
  },
  methods: {
    clickLogButton(){
      if(this.$store.state.user.name==null || this.$store.state.user.name=='')
      {this.$refs.createLoginModal.create()}
    },
    nickName(){
      if(this.$store.state.user.name==null || this.$store.state.user.name=='')
        return '未登录'
      return this.$store.state.user.name
    },
    ...mapActions(['Logout']), // 清除token和localStorage中的信息
    ...mapGetters(['nickname', 'avatar']), // 从全局变量中获取用户昵称和头像
    handleLogout () {
      const that = this
      this.$confirm('真的要注销登录吗 ?', '提示', {
        confirmButtonText: '确定'
      }).then(() => {
        that.Logout({}).then(() => {
          window.location.reload()
        })
      })
      // this.$confirm({
      //   title: '提示',
      //   content: '真的要注销登录吗 ?',
      //   onOk () {
      //     return that.Logout({}).then(() => {
      //       window.location.reload()
      //     }).catch(err => {
      //       that.$message.error({
      //         title: '错误',
      //         description: err.message
      //       })
      //     })
      //   },
      //   onCancel () {
      //   }
      // })
    }
  }
}
</script>
