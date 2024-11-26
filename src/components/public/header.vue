<template>
  <div class="header">
    <transition name="slide-down">
      <login
        @loginSuccess="loginBox = false"
        @closeModel="loginBox = false"
        @showForget=";(forgetStatus = true), (loginBox = false)"
        v-if="loginBox"
        ref="loginComponent"
      />
    </transition>
    <transition name="slide-down">
      <forget @forgetSuccess="forgetStatus = false" @closeModel="forgetStatus = false" v-if="forgetStatus" ref="forgetComponent" />
    </transition>
    <div>
      <div class="f-hl t-bold pointer" @click="toHome">aysuki.com</div>
      <div>Talk is cheap. Show me the code. ----Linus Torvalds</div>
    </div>
    <div class="title ui-flex col-center">
      <span class="p-r-10">ays test web</span>
      <el-row class="user-content">
        <el-dropdown v-if="username">
          <span class="avatar el-dropdown-link">
            <img :src="avatar" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="$router.push('/center')">个人中心</el-dropdown-item>
            <el-dropdown-item @click.native="$router.push('/')">返回首页</el-dropdown-item>
            <el-dropdown-item @click.native="exit()">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-row v-else>
          <span @click="loginBox = true" class="not-login">注册/登录</span>
        </el-row>
      </el-row>
    </div>
  </div>
</template>

<script>
import login from '../index/login'
import forget from '../index/forgetUser'
import { getToken, removeToken } from '@/common/auth'
export default {
  components: {
    login,
    forget,
  },
  data() {
    return {
      forgetStatus: false,
      loginBox: false,
    }
  },
  computed: {
    username() {
      return this.$store.getters.userInfo.username
    },
    avatar() {
      return this.$store.getters.userInfo.avatar || 'https://wx3.sinaimg.cn/mw690/9afd6f06gy1gd7peyq4v8j20f80e90t6.jpg'
    },
  },
  methods: {
    
    toHome(){
      this.$router.push('/')
    },
    toCode() {
      this.$router.replace('/')
    },
    exit() {
      removeToken()
      this.$store.dispatch('exitUser')
      this.$router.push('/')
    },
  },
}
</script>

<style lang="scss" scoped>
.header {
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5%;
  position: sticky;
  top: 0px;
  z-index: 1;
  background: #fff;
  .not-login {
    color: #666;
    line-height: 100px;
    letter-spacing: 1px;
    font-size: 12px;
    padding-right: 20px;
    cursor: pointer;
  }
  .user-content {
    .avatar {
      height: 50px;
      width: 50px;
      margin-right: 20px;
      display: inline-block;
      overflow: hidden;
      cursor: pointer;
      border-radius: 50%;
      border: 2px solid #f8d9dc;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      span {
        white-space: nowrap;
        padding-left: 15px;
      }
    }
  }
}
@media screen and (max-width: 960px) {
  .header {
    background-size: 50%;
  }
}
</style>
