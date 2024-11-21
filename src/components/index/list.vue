<template>
  <div class="waterfall-box">
    <div class="waterfall-item" v-for="(i, index) in listData" @click="corrugatedClick(i._id)" :key="index">
      <div>
        <img :src="i.bg" alt="i.title" />
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
  mounted() {
    const el = document.querySelector('.waterfall-box')
    this.observer = new ResizeObserver(function (entries) {
      const rect = entries[0].contentRect
      if (rect.width > 1200) {
        page.column = 4
      } else if (rect.width > 900) {
        page.column = 3
      } else if (rect.width > 600) {
        page.column = 2
      }
      el?.style.setProperty('--column', page.column.toString())
    })
    this.observer.observe(el)
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
      function update() {
        const item = img.parentElement
        if (!item) return
        const gapRows = index >= page.column ? page.column * 2 : 0
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

<style lang="scss" scoped>
.waterfall-box {
  --column: 4;
  display: grid;
  grid-template-columns: repeat(var(--cloumn), 1fr);
  align-items: end;
  grid-gap: 0 20px;
  padding: 20px 0;
  .waterfall-item {
    background-color: #fff;
    margin-bottom: 20px;
    overflow: hidden;
    box-shadow: 0 0 12px #0000001f;
    color: #30445e;
    padding: 10px;
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
