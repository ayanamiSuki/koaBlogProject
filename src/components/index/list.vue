<template>
  <div class="h-100p w-100p">
    <transition-group :name="page.move ? 'group' : ''" class="waterfall-box" id="waterfallBox" tag="div">
      <div class="waterfall-item pointer" v-for="i in listData" @click="corrugatedClick(i._id)" :key="i._id">
        <img class="waterfall-bg" :src="i.bg" :alt="i.title" />
        <div class="view-or-edior ui-flex col-center row-center" v-if="isEditor" @click.stop>
          <div @click="corrugatedClick(i._id, 'view')">
            <el-button type="success" icon="el-icon-view" circle></el-button>
          </div>
          <div class="m-l-20 m-r-20" @click="corrugatedClick(i._id, 'editor')">
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
          </div>
          <div @click="confirmDeleteArticle(i._id)">
            <el-button type="danger" icon="el-icon-delete" circle></el-button>
          </div>
        </div>
        <div class="list-content-wrap">
          <div class="lf t-bold f-l p-t-5 p-b-5">
            {{ i.title }}
          </div>
          <div class="rt f-s t-bold">
            <span>
              {{ i.user }}
            </span>
            /
            <span class="tips sm">
              {{ i.time }}
            </span>
            /
            <span class="click-count sm">
              {{ i.click }}
            </span>
            /
            <span class="sm from">未分类</span>
          </div>
        </div>
        <div class="changeCover" ref="corrugated"></div>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  props: ['listData', 'isEditor'],
  data() {
    return {
      page: {
        loading: false,
        column: 4,
        move: true,
        list: this.listData,
      },
      observer: null,
    }
  },
  mounted() {
    const self = this
    const el = document.querySelector('.waterfall-box')
    this.observer = new ResizeObserver(function (entries) {
      const rect = entries[0].contentRect
      if (rect.width > 1200) {
        self.page.column = 4
      } else if (rect.width > 900) {
        self.page.column = 3
      } else if (rect.width > 600) {
        self.page.column = 2
      } else if (rect.width > 200) {
        self.page.column = 1
      }
      el?.style.setProperty('--column', self.page.column.toString())
      self.changeAllStyle()
    })
    self.observer.observe(el)
  },
  beforeDestroy() {
    this.observer.disconnect()
  },
  methods: {
    corrugatedClick(id, type) {
      this.$router.push({
        path: type === 'editor' ? '/editor' : '/listDetail',
        query: { id },
      })
    },
    confirmDeleteArticle(id) {
      this.$confirm('确认删除当前文章?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.deleteArticle(id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    deleteArticle(id) {
      this.$http.post('/article/deleteArticle', { id }).then((res) => {
        if (res) {
          this.$message.success('删除成功')
          this.$emit('refresh')
        } else {
          this.$message.error('删除失败')
        }
      })
    },
    changeAllStyle() {
      const imgs = document.getElementById('waterfallBox')?.getElementsByClassName('waterfall-bg')
      if (imgs && imgs.length) {
        for (let i = 0; i < imgs.length; i++) {
          this.setItemStyle(imgs[i], i)
        }
      }
    },
    setItemStyle(img, index) {
      // console.log(index, img);
      if (!img) return
      const self = this
      function update() {
        const item = img.parentElement
        if (!item) return
        const gapRows = index >= self.page.column ? self.page.column * 2 : 0
        const rows = Math.ceil(item.clientHeight / 2) + gapRows
        item.style.gridRowEnd = `span ${rows}`
      }
      update()
      img.onload = update
      img.onerror = function () {
        img.src = defaultPic.data
        update()
      }
    },
  },
}
</script>
<style lang="scss" src="./main.scss" scoped></style>
<style lang="scss" scoped>
.waterfall-box {
  --column: 4;
  display: grid;
  grid-template-columns: repeat(var(--column), 1fr);
  align-items: end;
  grid-gap: 0 20px;
  padding: 20px 0;
  overflow-y: auto;
  .waterfall-item {
    background-color: #fff;
    margin-bottom: 20px;
    overflow: hidden;
    box-shadow: 0 0 12px #0000001f;
    color: #30445e;
    padding: 10px;
    position: relative;
    .view-or-edior {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background-color: rgba($color: #000000, $alpha: 0.3);
      transition: all 0.3s;
      opacity: 0;
    }
    .waterfall-bg {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    &:hover {
      .view-or-edior {
        opacity: 1;
      }
      .waterfall-bg {
        transition: all 0.3s;
        transform: scale(1.08);
        opacity: 0.9;
      }
    }
    .rt {
      span {
        padding: 5px;
        &:first-child {
          padding-left: 0;
        }
      }
    }
  }
}
</style>
