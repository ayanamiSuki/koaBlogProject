<template>
  <div class="w-100p h-100p">
    <aya-header />
    <div class="middle-container bg-gray-50">
      <router-view />
    </div>
    <aya-footer />
  </div>
</template>

<script>
import ayaHeader from '@/components/public/header'
import ayaFooter from '@/components/public/footer'
export default {
  components: {
    ayaHeader,
    ayaFooter,
  },
}
</script>
<style lang="css" scoped>
.middle-container {
  height: calc(100% - 180px);
  overflow-y: auto;
}
</style>
