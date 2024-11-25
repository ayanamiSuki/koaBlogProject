<template>
  <div class="container">
    <el-row class="fixed-btn">
      <itemBtn />
    </el-row>
    <aside>
      <el-card class="m-t-5 m-b-5">
        <div class="user-info">
          <!-- <img :src="userInfo.avatar" alt="userInfo.username+'的小窝，ayanami.com'" /> -->
          <span>{{ userInfo.username }}</span>
          <span class="intro">(*´▽｀)ノノ这是简介,当然，他还在施工中</span>
        </div>
      </el-card>
    </aside>
    <main class="main">
      <el-card>
        <div class="card-wrap">
          <el-row class="my-article">
            <span>我的动态</span>
          </el-row>

          <div class="list-wrap">
            <div class="my-artitle">
              <span>
                <i class="el-icon-document"></i>
                我的文章
              </span>
            </div>
            <ul class="list-item">
              <div v-if="list.length === 0">您还没有发布文章</div>
              <!-- <li v-for="(item, index) in listItem" :key="index" @click="toDetail(item._id)">
                <div class="revise" @click.stop="toEditor(item._id)">
                  
                  编辑此文章
                </div>
                <div class="lf-img">
                  <img :src="item.bg" alt="item.title" />
                </div>
                <div class="rt-words">
                  <div class="title">{{ item.title }}</div>
                  <div class="user">
                    <span>
                      <i class="el-icon-user"></i>
                      {{ item.user }}
                    </span>
                    <span>
                      <i class="el-icon-timer"></i>
                      {{ item.time }}
                    </span>
                  </div>
                </div>
              </li> -->
              <list-item :listData="list" :isEditor="true" @refresh="getData" />
            </ul>
          </div>
        </div>
      </el-card>
    </main>
  </div>
</template>

<script>
import itemBtn from '../components/public/itemBtn'
import listItem from '../components/index/list'
export default {
  components: {
    itemBtn,
    listItem,
  },
  data() {
    return {
      list: [],
    }
  },
  async mounted() {
    this.getData()
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    },
  },
  methods: {
    async getData() {
      this.list = await this.$http.get('/article/myArticle')
    },
    toDetail(id) {
      this.$router.push({
        path: '/listDetail',
        query: { id },
      })
    },
    toEditor(id) {
      this.$router.push({
        path: '/editor',
        query: { id },
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.container {
  margin: 0 auto;
  .my-article span {
    border-bottom: 3px solid #1e80ff;
    font-size: 18px;
    display: inline-block;
    width: 100px;
    padding-bottom: 5px;
    margin-bottom: 10px;
  }
}
</style>
