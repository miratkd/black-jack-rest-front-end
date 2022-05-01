<template>
  <div class="site-footer">
    <div class="site-footer-text site-footer-madeby">
      Feito por: Lucas Mira
    </div>
    <div class="site-footer-links">
      <a href="https://www.linkedin.com/in/lucas-mira-17514b203/" target=”_blank” class="site-footer-link-row">
        <img class="site-footer-link-icon" src="@/assets/linkedin.svg" alt="linkedin">
        <div class="site-footer-link-text">Linkedin</div>
      </a>
      <a href="https://github.com/miratkd" target=”_blank” class="site-footer-link-row">
        <img class="site-footer-link-icon" src="@/assets/github.svg" alt="github">
        <div class="site-footer-link-text">Github</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.site-footer{
  background-color: lightseagreen;
  min-height: 7vh;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-left: 20px;
}
.site-footer-text{
  color: white;
  font-size: 30px;
}
.site-footer-link-text{
  color: white;
  font-size: 23px;
}
.site-footer-madeby{
  margin-right: 30px;
}
.site-footer-links{
  margin-right: 30px;
  display: flex;
  flex-direction: column;
}
.site-footer-link-icon{
  height: 20px;
  margin-right: 10px;
  filter: invert(100%) sepia(0%) saturate(7474%) hue-rotate(124deg) brightness(110%) contrast(106%);
}
.site-footer-link-row{
  display: flex;
  align-items: center;
}
@media only screen and (max-width: 730px) {
  .site-footer-text{
    font-size: 25px;
  }
}
</style>
