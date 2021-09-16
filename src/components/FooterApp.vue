<template>
  <footer>
    <div class="container">
      <div class="content">
        <p class="about">
          © 2021 «VIP-cleaning». <br />Клининговая компания
          <br /> <br />
          г.Липецк, ул Театральная площадь 1<br />офис №318а
        </p>
        <nav>
          <ul>
            <li>
              <router-link to="/">Главная</router-link>
            </li>
            <li>
              <router-link to="/calculator">Калькулятор</router-link>
            </li>
            <li>
              <a href="#/">Уcлуги</a>
            </li>
          </ul>
          <ul>
            <li>
              <a href="#/#">О нас</a>
            </li>
            <li>
              <router-link to="/contacts">Контакты</router-link>
            </li>
            <li>
              <a href="#/#/#">Отзывы</a>
            </li>
          </ul>
        </nav>
        <div class="contacts">
          <p>vip-cleaning48@bk.ru</p>
          <p>+7-999-750-14-01</p>
          <p>vk.com/vipcleaning48</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import "../assets/scss/null";
footer{
  padding-top: size(40, 1920);
  padding-bottom: size(40, 1920);
  width: 100%;
  border-top: 1px solid #FFD700;
}

.about{
  font-style: normal;
  font-weight: 300;
  font-size: size(18, 1920);
  line-height: size(22, 1920);
  color: #FFFFFF;
}

.content{
  display: flex;
  justify-content: space-between;
  align-items: start  ;
}

nav{
  display: flex;
  justify-content: space-between;
  ul{
    margin-left: size(30, 1920);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    li{
      margin-bottom: size(15, 1920);
      a{
        font-weight: normal;
        font-size: size(18, 1920);
        line-height: size(22, 1920);
        color: #D2B206;
      }
    }
  }
}

.contacts{
  display: flex;
  flex-direction: column;
  p{
    font-style: normal;
    font-weight: 300;
    font-size: size(18, 1920);
    line-height: size(22, 1920);
    color: #FFFFFF;
    margin-bottom: size(20, 1920);
  }
}
</style>
