<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
@import "./assets/scss/null";

#app{
  background-image: url("assets/temp/back.png");
}

::-webkit-scrollbar-track
{
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  border-radius: 10px;
  background-color: #1d1d1d;
}

::-webkit-scrollbar
{
  width: 12px;
  background-color: #1d1d1d;
}

::-webkit-scrollbar-thumb
{
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: #F3CD00;
}
</style>
