<template>
  <div class="main h-100p">
    <list-item :listData="list" />
    <!-- <el-row class="page">
      <el-pagination background layout="prev, pager, next" :total="count" @current-change="pageChage"></el-pagination>
    </el-row> -->
    <!-- 发布文章，置顶 -->
    <el-row class="fixed-btn">
      <itemBtn />
    </el-row>
  </div>
</template>

<script>
import listItem from '../components/index/list'
// import carousel from '../components/index/carousel'
import itemBtn from '../components/public/itemBtn'
// import asideItem from '../components/index/aside'
export default {
  components: {
    listItem,
    // carousel,
    itemBtn,
    // asideItem,
  },

  data() {
    return {
      isloading: false,
      list: [],
      currentPage: 1,
      pageSize: 20,
      asideList: [],
      count: 1,
    }
  },
  mounted() {
    this.asyncData()
  },
  methods: {
    async asyncData() {
      this.isloading = true
      this.getPageList(1)
    },
    async getPageList(page) {
      this.isloading = true
      const { list = [] } = await this.$http.get('article/getArticle', {
        page,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      })
      this.list = list
      this.isloading = false
    },
  },
}
</script>

<style lang="scss" scoped>
.main {
  padding: 0 4%;
}
.page {
  width: 1190px;
  margin: 0 auto;
  padding: 10px 0;
}
.switch {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 5px;
  span {
    display: inline-block;
    width: 100px;
    padding: 5px;
    margin: 5px;
    text-align: center;
    cursor: pointer;
    position: relative;
    &:hover {
      color: #002d4a;
    }
    // &:first-child {
    //   border-right: 1px solid #666;
    // }
  }
  .active {
    color: #e7838c;
  }
}
.banner {
  overflow: hidden;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .logo {
    position: absolute;
    left: 0;
    top: 0;
    padding: 10px;
  }
}
.ohter-intro {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #00243b;
  span {
    padding: 10px;
  }
  .el-button {
    margin-top: 10px;
  }
}
.list-content {
  height: 100%;
  padding: 0 4%;
  box-sizing: border-box;
  .list-item-wrap {
    width: 100%;
  }
  .aside-item-wrap {
    width: 28%;
    margin-left: 2%;
    margin-top: 5px;
  }
}
.silde-left-leave-active,
.silde-left-enter-active {
  transform: translateX(0);
  transition: transform 0.5s linear;
}
.silde-left-enter {
  transform: translateX(-100%);
}

@media screen and (max-width: 960px) {
  .page {
    width: 100%;
  }
  .list-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    .list-item-wrap {
      width: 100%;
    }
    .aside-item-wrap {
      width: 100%;
      padding: 5px;
      margin: 5px 0;
      box-sizing: border-box;
    }
  }
}
</style>
