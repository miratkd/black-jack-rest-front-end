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
  height: 7.5vh;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-left: 2vw;
  overflow-y: hidden;
  font-size: 1vw;
}
.site-footer-text{
  color: white;
  font-size: 2.2em;
}
.site-footer-link-text{
  color: white;
  font-size: 1.9em;
}
.site-footer-madeby{
  margin-right: 2vw;
}
.site-footer-links{
  margin-right: 2vw;
  display: flex;
  flex-direction: column;
}
.site-footer-link-icon{
  height: 2vh;
  margin-right: 1vw;
  filter: invert(100%) sepia(0%) saturate(7474%) hue-rotate(124deg) brightness(110%) contrast(106%);
}
.site-footer-link-row{
  display: flex;
  align-items: center;
}
@media only screen and (max-width: 730px) {.site-footer{font-size: 1.5vw;}}
@media only screen and (max-width: 450px) {.site-footer{font-size: 2vw;}}
@media only screen and (max-width: 370px) {.site-footer{font-size: 2.5vw;}}
</style>
