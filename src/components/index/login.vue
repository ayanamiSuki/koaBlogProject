<template>
  <el-card class="wrap">
    <i class="el-icon-circle-close" @click="closeModel"></i>
    <el-row class="welcome">welcome to aySuki</el-row>
    <el-row class="th" type="flex" justify="center">
      <el-col :span="3" @click.native="islogin = true" class="loginbtn" :class="islogin ? 'active' : ''">登录</el-col>
      <el-col :span="1">|</el-col>
      <el-col :span="3" @click.native="islogin = false" class="registerbtn" :class="!islogin ? 'active' : ''">注册</el-col>
    </el-row>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="70px" v-if="!islogin">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code" class="verify">
        <el-input type="text" v-model="ruleForm.code" autocomplete="off"></el-input>
        <el-button @click="sendMessage()">{{ verifyInfo }}</el-button>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-button type="primary" class="subbtn" @click="submitForm('ruleForm')">注册</el-button>
    </el-form>
    <el-form :model="ruleForm1" status-icon :rules="rules1" ref="ruleForm1" label-width="70px" v-else>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm1.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm1.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-button type="primary" class="subbtn" @click="submitForm('ruleForm1')">登录</el-button>
      <el-row class="forget-pass">
        <span @click="$emit('showForget')">忘记密码？</span>
        <span>|</span>
        <span @click="islogin = false">注册新账号</span>
      </el-row>
    </el-form>
  </el-card>
</template>
<script>
import { setToken } from '@/common/auth'

export default {
  data() {
    var checkAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        email: '',
        pass: '',
        code: '',
        username: '',
      },
      rules: {
        email: [
          {
            required: true,
            trigger: 'blur',
            type: 'email',
            message: '请输入邮箱',
          },
        ],
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        pass: [{ validator: validatePass, trigger: 'blur', required: true }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
      },
      ruleForm1: {
        email: '',
        pass: '',
      },
      rules1: {
        username: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入用户名',
          },
        ],
        pass: [
          {
            trigger: 'blur',
            required: true,
            message: '请输入密码',
          },
        ],
      },
      verifyInfo: '发送验证码',
      islogin: true,
      count: 60,
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (formName === 'ruleForm1') {
            this.$http
              .post('users/signin', {
                password: this.ruleForm1.pass,
                username: this.ruleForm1.username,
              })
              .then((res) => {
                if (res) {
                  setToken(res)
                  this.$emit('loginSuccess')
                  this.refreshRoute()
                }
              })
            return false
          } else {
            this.$http
              .post(
                'users/signup',
                {
                  username: this.ruleForm.username,
                  password: this.ruleForm.pass,
                  email: this.ruleForm.email,
                  code: this.ruleForm.code,
                },
                { message: true },
              )
              .then((res) => {
                if (res) {
                  this.islogin = true
                }
              })
          }
        }
      })
    },
    refreshRoute() {
      // 获取当前路由的查询参数
      const currentQuery = this.$route.query

      // 添加一个随机的查询参数来强制刷新
      const randomValue = Math.random()
      this.$router.push({ path: this.$route.path, query: { ...currentQuery, random: randomValue } })
    },
    sendMessage() {
      const that = this
      if (this.count !== 60) {
        return false
      }
      that.$refs['ruleForm'].validateField('email', (valid) => {
        if (!valid) {
          that.$refs['ruleForm'].validateField('username', (valid2) => {
            if (!valid2) {
              this.$http
                .post(
                  '/users/verify',
                  {
                    username: this.ruleForm.username,
                    email: this.ruleForm.email,
                  },
                  { message: true },
                )
                .then((res) => {
                  res && that.interval()
                })
            }
          })
        }
      })
    },
    interval() {
      let timer = setInterval(() => {
        this.count--
        if (this.count === 0) {
          clearInterval(timer)
          this.verifyInfo = '发送验证码'
          this.count = 60
          return false
        }
        this.verifyInfo = `${this.count}秒后可再次发送`
      }, 1000)
    },
    closeModel() {
      this.$emit('closeModel', null)
    },
  },
}
</script>
<style lang="scss" scoped>
@use '@/assets/scss/login.scss';
</style>
