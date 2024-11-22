<template>
  <div class="h-100p w-100p">
    <transition-group :name="page.move ? 'group' : ''" class="waterfall-box" id="waterfallBox" tag="div">
      <div class="waterfall-item pointer" v-for="i in listData" @click="corrugatedClick(i._id)" :key="i._id">
        <img class="waterfall-bg" :src="i.bg" alt="i.title" />
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
  props: ['listData'],
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
  watch: {
    'page.column'() {
      const imgs = document.getElementById('waterfallBox')?.getElementsByClassName('waterfall-bg')
      if (imgs && imgs.length) {
        for (let i = 0; i < imgs.length; i++) {
          this.setItemStyle(imgs[i], i)
        }
      }
    },
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
    })
    self.observer.observe(el)
  },
  beforeDestroy() {
    this.observer.disconnect()
  },
  methods: {
    corrugatedClick(id) {
      this.$router.push({
        path: '/listDetail',
        query: { id },
      })
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
    &:hover{
      .waterfall-bg{
        transition: all .3s;
        transform: scale(1.05);
        opacity: .9;
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
