<template>
  <div class="container">
    <ul v-loading="loading">
      <el-card class="m-b-5" v-for="item of list" :key="item._id">
        <div>{{ item.title }}</div>
        <div>作者：{{ item.user }}</div>
        <el-button class="m-t-5" size="mini" type="primary" @click="passed(item)">通过</el-button>
      </el-card>
      <div v-if="list.length===0&&!loading">没有审核文章或者你没有审核权限</div>
    </ul>
  </div>
</template>

<script>
import { http } from '@/http'
export default {
  name: '',
  // 模板组件
  components: {},
  // 页面数据集合
  data() {
    return {
      loading: false,
      list: [],
    }
  },
  // 加载完毕后触发
  async mounted() {
    this.getData()
  },
  // 执行方法
  methods: {
    getData() {
      this.loading = true
      this.$http
        .get('article/getExamineArticle')
        .then((res) => {
          this.list = res
        })
        .finally(() => {
          this.loading = false
        })
    },
    passed(item) {
      this.loading = true
      http
        .get(`article/examineArticle`, { id: item._id })
        .then((res) => {
          if (res) {
            return this.$message.success('审核通过')
          }
          return this.$message.warning('操作失败')
        })
        .finally(() => {
          this.loading = false
          this.getData()
        })
    },
  },
}
</script>

<style scoped lang="scss">
.container {
}
</style>
