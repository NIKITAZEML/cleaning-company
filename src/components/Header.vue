<template>
  <header>
    <div class="container">
      <div class="content">
        <router-link to="/" class="logo"><span>VIP</span>-cleaning</router-link>
        <nav>
          <a href="#/">УСЛУГИ</a>
          <a href="#/#">О НАС</a>
          <router-link to="/contacts">КОНТАКТЫ</router-link>
          <router-link to="/calculator">КАЛЬКУЛЯТОР</router-link>
        </nav>
      </div>
    </div>
    <hr>
  </header>
</template>

<script>
export default {
  name: 'HelloWorld',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/scss/null";

.container {
  width: size(1200, 1920);
  margin: 0 auto;
}

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<HEADER>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

header{
  padding-top: size(35, 1920);
}

.content{
  display: flex;
  justify-content: space-between;
  .logo{
    font-size: size(40, 1920);
    line-height: size(49, 1920);
    font-weight: bold;
    color: white;
    span{
      color: #F3CD00;
    }
  }
}

nav{
  display: flex;
  align-items: center;
  a{
    font-size: size(22, 1920);
    line-height: size(27, 1920);
    color: #F3CD00;
    margin-left: size(50, 1920);
  }
}

hr{
  background: rgba(255, 215, 0, 0.8);
  height: size(1, 1920);
  margin-top: size(35, 1920);
}





</style>
