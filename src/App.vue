<template>
  <div class="container">
    <aya-header />
    <router-view />
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
  created() {
    this.$store.dispatch('getUserInfo')
  },
}
</script>
