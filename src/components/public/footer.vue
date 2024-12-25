<template>
  <div class="aya-footer flex items-center justify-center">
    <div class="ui-flex col-center row-center">
      <!-- <a href="http://www.beian.miit.gov.cn/">黔ICP备20001117号</a> -->
      <img style="width: 16px;" src="@/assets/images/beian.png" alt="" srcset="" />
      <a href="https://beian.mps.gov.cn/#/query/webSearch?code=52011502009461" rel="noreferrer" target="_blank">贵公网安备52011502009461</a>
      <a class="m-l-20" href="https://beian.miit.gov.cn/" target="_blank">黔ICP备2024041452号-1</a>
    </div>
    <div>建议使用chrome，firefox浏览，抵制IE从我做起</div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.aya-footer {
  background-color: #efefef;
  padding: 10px;
  font-size: 12px;
  color: #666;
  height: 80px;
  div {
    text-align: center;
    padding: 5px;
    a,
    span {
      color: #666;
    }
  }
}
</style>
