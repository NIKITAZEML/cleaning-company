<template>
  <div class="wrapper">
    <popup v-if="showFinishPopup"
           :showFinishPopup="showFinishPopup"
           @closePopup="showFinishPopup = false" :roomTypes="roomTypes"
           :coatingItems="coatingItems"
           :glassesItem="glassesItem"
           :specialItems="specialItems"
           :selectedRoomType="selectedRoomType"
           :selectedClearType="selectedClearType"
           :selectedCoatingType="selectedCoatingType"
           :roomSize="roomSize"
           :trashSize="trashSize"
           :totalSumm="totalSumm"/>
    <Header/>
    <div class="container">
      <p class="title">расчет стоимости</p>
      <div class="content">
        <div class="clear-room">
          <div class="slide-title">Уборка помещений</div>
          <div class="room-types">
            <div class="type-item" v-for="(item, key) in roomTypes">
              <input type="radio" name="room-type" :id="item.id">
              <p :for="item.id" @click="selectRoomType(item)" :class="{active: selectedRoomType === item.name}">{{item.name}}</p>
            </div>
          </div>
          <transition name="slide-fade">
          <div class="popup" v-if="firstPopup">
            <div class="size-wrapper">
              <div class="slide-title">Площадь м2</div>
              <div class="size">
                <div class="arrow-minus" @click="roomSize--">-</div>
                <input type="text" v-model="roomSize">
                <div class="arrow-plus" @click="roomSize++">+</div>
              </div>
            </div>

            <div class="cleaning-types">
              <div class="slide-title">Тип уборки</div>
              <div class="input">
                <div class="fake-input" @click="setClearOptions">
                  <span>{{selectedClearType}}</span>
                </div>
                <div class="arrow" @click="setClearOptions">ᐯ</div>
              </div>
              <div class="input-popup" v-if="optionsVisible">
                <ul>
                  <li v-for="(option) in clearTypeOptions" :key="option.value" :class="{active: option.name === selectedClearType}" @click="setClearType(option.name, option.price, option)">{{option.name}}</li>
                </ul>
              </div>
            </div>

          </div>
            </transition>
        </div>
          <div class="clear-coating">
            <p class="slide-title">Химчистка покрытий</p>
            <div class="coating-types">
              <div class="type-item" v-for="(item, key) in coatingItems">
                <input type="radio" name="coating-types" :id="item.id">
                <p :for="item.id" @click="selectCoatingType(item, key)" :class="{active: item.active}">{{item.name}}</p>
                <transition name="slide-fade">
                  <div class="popup" v-if="secondPopup[key].active">
                    <div class="size-wrapper">
                      <div class="slide-title">Площадь м2</div>
                      <div class="size">
                        <div class="arrow-minus" @click="setDo(item, '-')">-</div>
                        <input type="text" v-model="item.counter" readonly>
                        <div class="arrow-plus" @click="setDo(item, '+')">+</div>
                      </div>
                    </div>

                    <div class="cleaning-types">
                      <div class="slide-title">Тип покрытия</div>
                      <div class="input">
                        <div class="fake-input" @click="optionsVisible2 = !optionsVisible2">
                          <span>{{selectedCoatingType}}</span>
                        </div>
                        <div class="arrow" @click="optionsVisible2 = !optionsVisible2">ᐯ</div>
                      </div>
                      <div class="input-popup" v-if="optionsVisible2">
                        <ul>
                          <li v-for="(option) in item.array" :class="{active: option.name === selectedCoatingType}" @click="setCoatingType(option, item)">{{option.name}}</li>
                        </ul>
                      </div>
                    </div>

                  </div>
                </transition>
              </div>
            </div>
          </div>
          <div class="clear-glass">
            <p class="slide-title">Мытье стекол</p>
            <div class="glasses-types">
              <div class="type-item" v-for="(item, key) in glassesItem">
                <input type="radio" name="coating-types" :id="item.id">
                <p :for="item.id" @click="selectGlassesServices(item, key)" :class="{active: item.active}">{{item.name}}</p>
                <transition name="slide-fade">
                  <div class="popup" v-if="thirdPopup[key].active">
                    <div class="size-wrapper">
                      <div class="slide-title">Количество</div>
                      <div class="size">
                        <div class="arrow-minus" @click="setDo2(item, '-', key)">-</div>
                        <input type="text" readonly v-model="item.counter">
                        <div class="arrow-plus" @click="setDo2(item, '+', key)">+</div>
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
            </div>

          </div>
          <div class="special-services">
            <p class="slide-title">Специальные услуги</p>
            <div class="special-types">
              <div class="type-item" v-for="(item, key) in specialItems">
                <input type="radio" name="coating-types" :id="item.id">
                <p :for="item.id" @click="selectSpecialServices(item, key)" :class="{active: item.active}">{{item.name}}</p>
                <transition name="slide-fade">
                  <div class="popup" v-if="thoughtPopup[key].active">
                    <div class="size-wrapper">
                      <div class="slide-title">Вес кг</div>
                      <div class="size">
                        <div class="arrow-minus" @click="trashSize--">-</div>
                        <input type="text" v-model="trashSize">
                        <div class="arrow-plus" @click="trashSize++">+</div>
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
          </div>

<!--          <div class="next-button">Оставить заявку</div>-->
        <div class="place">
          <p>Примерная стоимость: <br />
            {{ totalSumm }}р
          </p>
          <span v-if="showMinPrice">Минимальная цена заказа - 3000р</span>
          <button class="next-button" :class="{'no-active': totalSumm <= 3000}" @click="openPopup()">Оставить заявку</button>
        </div>
      </div>
    </div>
    <FooterApp />
  </div>
</template>

<script>
import FooterApp from "../components/FooterApp"
import Header from "../components/Header"
import popup from "@/components/popup"
export default {
  data () {
    return {
      showMinPrice: false,
      optionsVisible: false,
      optionsVisible2: false,
      showFinishPopup: false,

      firstPopup: false,
      secondPopup: [
        {active: false},
        {active: false},
      ],
      thirdPopup: [
        {active: false},
        {active: false},
        {active: false}
      ],
      thoughtPopup: [
        {active: false},
        {active: false},
        {active: false},
        {active: false},
        {active: false},
        {active: false}
      ],


      roomTypes: [
        {
          name: 'Квартира',
          array: [
            {name: 'Генеральная', value: 1, price: 75},
            {name: 'Ежедневаня', value: 2, price: 60},
            {name: 'Комплексная', value: 3, price: 70},
            {name: 'После ремонта', value: 4, price: 90},
            {name: 'После пожара и ЧП', value: 5, price: 180},
          ],
          id: 'apartment',
          value: 1,
          active: false
        },
        {
          name: 'Котедж',
          array: [
            {name: 'Генеральная', value: 1, price: 80},
            {name: 'Ежедневаня', value: 2, price: 65},
            {name: 'Комплексная', value: 3, price: 70},
            {name: 'После ремонта', value: 4, price: 90},
            {name: 'После пожара и ЧП', value: 5, price: 180},
            {name: 'Уборка территории дома — цена договорная (м²)', value: 6, price: 0}
          ],
          id: 'house',
          value: 2,
          active: false
        },
        {
          name: 'Офис',
          array: [
            {name: 'Ежедневная уборка', value: 1, price: 50}
          ],
          id: 'office',
          value: 2,
          active: false
        },
      ],

      coatingItems: [
        {
          name: 'Мебель',
          id: 'furniture',
          value: 1,
          price: 800,
          counter: 1,
          array: [

          ],
          active: false

        },
        {
          name: 'Ковровые покрытия',
          id: 'floor',
          value: 2,
          price: 90,
          counter: 1,
          array: [
            {name: 'Светлый', value: 1, price: 90},
            {name: 'Шерстяной', value: 2, price: 80},
            {name: 'Наличие пятен', value: 3, price: 90},
            {name: 'Шерсть от животных', value: 4, price: 80},
            {name: 'Наличие мочи детской, животных', value: 1, price: 90},
            {name: 'Высокий ворс', value: 5, price: 90},
          ],
          active: false
        }
      ],

      glassesItem: [
        {
          name: 'Двухстворчатое окно',
          id: '2st',
          value: 1,
          price: 400,
          counter: 1,
          active: false
        },
        {
          name: 'Трехстворчатое окно',
          id: '3st',
          value: 2,
          price: 600,
          counter: 1,
          active: false
        },
        {
          name: 'Двухстворчатое окно с балконом и дверью',
          id: 'BalconDoor2st',
          value: 3,
          price: 800,
          counter: 1,
          active: false
        },
      ],

      specialItems: [
        {
          name: 'Мытьё микроволновой печи и чайников',
          id: 'microvolnovkaandchainik',
          value: 1,
          price: 200,
          counter: 1,
          active: false
        },
        {
          name: 'Мытьё холодильника и кухонной плиты',
          id: 'holodosandplita',
          value: 2,
          price: 200,
          counter: 1,
          active: false
        },
        {
          name: 'Протирка жалюзи',
          id: 'jaluzi',
          value: 3,
          price: 100,
          counter: 1,
          active: false
        },
        {
          name: 'Мойка люстр',
          id: 'lustri',
          value: 4,
          price: 200,
          counter: 1,
          active: false
        },
        {
          name: 'Вынос мусора ( не свыше 10кг )',
          id: 'musor',
          value: 5,
          price: 50,
          counter: 1,
          active: false
        },
        {
          name: 'Мытье сан-узла',
          id: 'san-uzel',
          value: 6,
          price: 500,
          counter: 1,
          active: false
        },

      ],


      clearTypeOptions: [],


      selectedRoomType: '',
      selectedClearType: '',
      selectedCoatingType: '',
      roomSize: '',
      trashSize: 1,
      counterSize: 0,
      test: null,

      summ1: 0,
      summ2: {
        firstSumm: 0,
        secondSumm: 0,
        result: 0
      },
      summ3: {
        firstSumm: 0,
        secondSumm: 0,
        thirdSumm: 0,
        result: 0
      },
      summ4: 0,
      summ: 0,
      totalSumm: 0

    }
  },
  created() {
    document.title = 'Расчет стоимости'
    this.roomSize = 0
  },
  methods: {
    selectRoomType(item){
      item.active = !item.active
      if(this.selectedRoomType === item.name){
        this.selectedRoomType = null
        this.firstPopup = false
        console.log('close')
        this.counterSize = 0
        this.summ = this.summ - this.roomSize * item.price
      }else {
        this.selectedRoomType = item.name
        this.firstPopup = true
        this.clearTypeOptions = item.array
      }
    },
    selectGlassesServices(item, key) {
      item.active = !item.active
      if(item.active === true){
        console.log('dsds')
        this.thirdPopup[key].active = true
        this.counterSize = item.price
        switch (key) {
          case 0:
            this.summ3.firstSumm = item.counter * item.price
            this.summ3.result = this.summ3.firstSumm + this.summ3.secondSumm + this.summ3.thirdSumm
            break
          case 1:
            this.summ3.secondSumm = item.counter * item.price
            this.summ3.result = this.summ3.firstSumm + this.summ3.secondSumm + this.summ3.thirdSumm
            break
          case 2:
            this.summ3.thirdSumm = item.counter * item.price
            this.summ3.result = this.summ3.firstSumm + this.summ3.secondSumm + this.summ3.thirdSumm
            break

        }

      }else {
        this.thirdPopup[key].active = false
        this.counterSize = item.price
        switch (key) {
          case 0:
            this.summ3.firstSumm = 0
            this.summ3.result = this.summ3.firstSumm + this.summ3.secondSumm + this.summ3.thirdSumm
            break
          case 1:
            this.summ3.secondSumm = 0
            this.summ3.result = this.summ3.firstSumm + this.summ3.secondSumm + this.summ3.thirdSumm
            break
          case 2:
            this.summ3.thirdSumm = 0
            this.summ3.result = this.summ3.firstSumm + this.summ3.secondSumm + this.summ3.thirdSumm
            break

        }
        item.counter = 1
      }
    },
    selectSpecialServices(item, key) {
      item.active = !item.active
      if(item.active === true){
        if(key == 4) {
          this.thoughtPopup[key].active = true
        }
        this.counterSize = item.price
        this.summ4 = this.summ4 + item.price
      }else {
        console.log(key)

        this.thoughtPopup[key].active = false
        this.counterSize = item.price
        this.summ4 = this.summ4 - item.price
      }
    },
    selectCoatingType(item, key) {
      item.active = !item.active

      if(item.active === true){
        if(key == 1) {
          this.secondPopup[key].active = true
          this.selectedCoatingType = item.array[0].name

          item.counter = 1

          this.summ2.secondSumm = item.counter * item.price
          this.summ2.result = this.summ2.firstSumm + this.summ2.secondSumm
        }
        if(key ==0 ) {
          console.log('key = 0')

          this.summ2.firstSumm = item.price
          this.summ2.result = this.summ2.firstSumm + this.summ2.secondSumm
        }
      }else {
        if(key == 1) {
          this.secondPopup[key].active = false
          this.summ2.secondSumm = 0
          this.summ2.result = this.summ2.firstSumm + this.summ2.secondSumm
          this.selectedCoatingType = ''
        }
        if(key == 0 ){
          console.log('key = 0')
          this.summ2.firstSumm = 0
          this.summ2.result = this.summ2.firstSumm + this.summ2.secondSumm
        }
      }

    },
    setClearOptions () {
      this.optionsVisible = !this.optionsVisible
    },
    setClearType(name, price, option) {
      this.selectedClearType = name
      this.optionsVisible = !this.optionsVisible
      this.counterSize = price
      this.test = option
      console.log(this.test)
    },
    setCoatingType (option, item) {
      this.optionsVisible2 = !this.optionsVisible2

      this.selectedCoatingType = option.name

      item.counter = 1
      this.summ2.secondSumm = option.price * item.counter
      this.summ2.result = this.summ2.firstSumm + this.summ2.secondSumm
    },

    setDo(item, set) {
      item.counter = [item.counter].filter( e => isFinite(e)).join('')
      if(set === '+'){
        item.counter++
        if(item.counter > 99999) {
          item.counter = 99999
        }
        this.summ2.secondSumm = item.counter * item.price
        this.summ2.result = this.summ2.firstSumm + this.summ2.secondSumm
      } if(set === '-') {
        item.counter--
        if(item.counter < 1) {
          item.counter = 1
        }
        this.summ2.secondSumm = item.counter * item.price
        this.summ2.result = this.summ2.firstSumm + this.summ2.secondSumm
        if(this.summ < 0) {
          this.summ = 0
        }
      }
    },
    setDo2(item, set, key) {
      console.log(key)
      item.counter = [item.counter].filter( e => isFinite(e)).join('')
      if(set === '+'){
        item.counter++
        if(item.counter > 99999) {
          item.counter = 99999
        }
        switch (key) {
          case 0:
            this.summ3.firstSumm = item.counter * item.price
            this.summ3.result = this.summ3.firstSumm + this.summ3.secondSumm + this.summ3.thirdSumm
            break
          case 1:
            this.summ3.secondSumm = item.counter * item.price
            this.summ3.result = this.summ3.firstSumm + this.summ3.secondSumm + this.summ3.thirdSumm
            break
          case 2:
            this.summ3.thirdSumm = item.counter * item.price
            this.summ3.result = this.summ3.firstSumm + this.summ3.secondSumm + this.summ3.thirdSumm
            break
        }
      } if(set === '-') {
        item.counter--
        if(item.counter < 1) {
          item.counter = 1
        }
        switch (key) {
          case 0:
            this.summ3.firstSumm = item.counter * item.price
            this.summ3.result = this.summ3.firstSumm + this.summ3.secondSumm + this.summ3.thirdSumm
            break
          case 1:
            this.summ3.secondSumm = item.counter * item.price
            this.summ3.result = this.summ3.firstSumm + this.summ3.secondSumm + this.summ3.thirdSumm
            break
          case 2:
            this.summ3.thirdSumm = item.counter * item.price
            this.summ3.result = this.summ3.firstSumm + this.summ3.secondSumm + this.summ3.thirdSumm
            break
        }
      }
    },

    openPopup() {
      if(this.totalSumm >= 3000){
        this.showFinishPopup = true
      }else {
        this.showMinPrice = true
      }
    }
  },
  watch: {
    selectedRoomType: function () {

      this.selectedClearType = this.clearTypeOptions[0].name
      this.counterSize = this.clearTypeOptions[0].price
      this.roomSize = 1
      this.summ1 = this.counterSize * this.roomSize

      if(this.firstPopup === false) {
        this.counterSize = 0
        this.summ1 = this.counterSize * this.roomSize
      }
    },

    selectedClearType: function () {
      this.summ1 = this.counterSize * this.roomSize
    },

    roomSize: function () {
      if(this.roomSize < 0) {
        this.roomSize = 0
      }
      if(this.roomSize > 99999) {
        this.roomSize = 99999
      }
      this.roomSize = [this.roomSize].filter( e => isFinite(e)).join('')
      this.summ1 = this.counterSize * this.roomSize
    },

    trashSize: function () {
      if(this.trashSize < 0) {
        this.trashSize = 0
      }
      if(this.trashSize > 10) {
        this.trashSize = 10
      }
      this.trashSize = [this.trashSize].filter( e => isFinite(e)).join('')
    },

    showFinishPopup: function () {
      if(this.showFinishPopup){
        document.documentElement.style.overflow = 'hidden'
        return
      }
      document.documentElement.style.overflow = 'auto'
    },

    summ1: function () {
      this.totalSumm = this.summ1 + this.summ2.result + this.summ3.result + this.summ4
    },
    summ2:  {
      handler() {
        this.totalSumm = this.summ1 + this.summ2.result + this.summ3.result + this.summ4
      },
      deep: true,
    },
    summ3:  {
      handler() {
        this.totalSumm = this.summ1 + this.summ2.result + this.summ3.result + this.summ4
      },
      deep: true,
    },
    summ4: function () {
      this.totalSumm = this.summ1 + this.summ2.result + this.summ3.result + this.summ4
    },




  },
  components: {
    FooterApp,
    Header,
    popup
  }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/null";



.title {
  font-size: size(45, 1920);
  color: #FFD700;
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  line-height: size(78, 1920);
  padding-top: size(55, 1920);
  margin-bottom: size(55, 1920);

}

.content{
  display: flex;
  flex-direction: column;
  margin-bottom: size(40, 1920);
}

.clear-room{
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.slide-title{
  font-style: normal;
  font-weight: bold;
  font-size: size(38, 1920);
  line-height: size(46, 1920);
  color: #FFD700;
}

.clear-coating, .clear-glass, .special-services{
  margin-top: size(60, 1920);
}

.popup{
  display: flex;
  justify-content: flex-start;
  align-items: start;
  margin-top: size(15, 1920);
}

.room-types, .coating-types, .glasses-types, .special-types{
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  input{
    display: none;
  }
  p{
    border: 1px solid #8b782a;
    background-color: #202020;
    border-radius: 8px;
    padding: size(20, 1920) size(60, 1920);
    font-style: normal;
    cursor: pointer;
    font-size: size(22, 1920);
    line-height: size(27, 1920);
    color: #FFFFFF;
    margin-right: size(30, 1920);
    margin-top:size(24, 1920) !important;
    transition: .15s ease-in-out;
    &:hover{
      border: 1px solid #ffd800;
    }
  }

  .active{
    transition: .15s ease-in-out;
    background-color: #F3CD00;
    border: 1px solid #202020;
    font-size: size(23, 1920);
  }
}

.size-wrapper{
  display: flex;
  flex-direction: column;
}

.size{
  display: flex;
  align-items: center;
  margin-top: size(20, 1920);
  input{
    border: 1px solid #F3CD00;
    width: size(278, 1920) !important;
    height: size(50, 1920);
    display: flex;
    justify-content: start;
    align-items: center;
    padding: size(10, 1920);
    background-color: #202020;
    border-radius: 8px;
    font-style: normal;
    font-size: size(22, 1920);
    line-height: size(27, 1920);
    color: #FFFFFF;
    margin-right: size(30, 1920);
    cursor: pointer;
    text-align: center;
  }
  .arrow-minus, .arrow-plus{
    background-color: #F3CD00;
    width: size(40, 1920);
    height: size(40, 1920);
    border-radius: 50%;
    color: white;
    font-size: size(20, 1920);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    -ms-user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
  }
  .arrow-minus{
    margin-right: - size(20, 1920);
    z-index: 10;
  }
  .arrow-plus{
    margin-left: - size(52, 1920);
  }
}

.cleaning-types{
  margin-left: size(40, 1920);
  .slide-title{
    margin-bottom: size(20, 1920);
  }
  .input{
    display: flex;
    align-items: center;
  }
  .fake-input{
    border: 1px solid #F3CD00;
    width: size(300, 1920) !important;
    height: size(60, 1920);
    display: flex;
    justify-content: start;
    align-items: center;
    padding: size(10, 1920);
    background-color: #202020;
    border-radius: 8px;
    font-style: normal;
    font-size: size(22, 1920);
    line-height: size(27, 1920);
    color: #FFFFFF;
    margin-right: size(30, 1920);
    text-align: start;
    cursor: pointer;
  }
  .arrow{
    background-color: #F3CD00;
    width: size(40, 1920);
    height: size(40, 1920);
    border-radius: 50%;
    margin-left: - size(52, 1920);
    color: white;
    font-size: size(20, 1920);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .input-popup{
    background-color: #202020;
    width: size(300, 1920);
    border-radius: 5px;
    border: 1px solid #F3CD00;
    margin-top: size(18, 1920);
    ul{
      li{
        font-style: normal;
        font-weight: normal;
        font-size: size(21, 1920);
        line-height: size(21, 1920);
        color: #FFFFFF;
        cursor: pointer;
        padding: size(12, 1920);
        border-bottom: 1px solid #F3CD00;
      }
    }
  }
}







.next-button{
  margin-top: size(65, 1920);
  margin-bottom: size(70, 1920);
  border: 1px solid #F3CD00;
  width: size(320, 1920) !important;
  height: size(70, 1920);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: size(15, 1920);
  background-color: #202020;
  border-radius: 8px;
  font-style: normal;
  font-size: size(24, 1920);
  line-height: size(27, 1920);
  color: #FFFFFF;
  cursor: pointer;
  text-align: center;
  font-weight: bold;
  transition: 0.10s ease-in-out;
  &:hover{
    background-color: #2b2b2b;
    transition: 0.10s ease-in-out;
  }
  &:active{
    background-color: #242424;
    border: 2px solid #a1932a;
  }

}

.place{
  position: fixed;
  top: 46%;
  right: 10px;
  background: #202020;
  width: size(410, 1920);
  height: size(200, 1920);
  border-radius: 8px;
  border: 1px solid #F3CD00;
  margin-bottom: size(70, 1920);
  p{
    margin: size(20, 1920);
    font-style: normal;
    font-weight: bold;
    font-size: size(35, 1920);
    line-height: size(43, 1920);
    color: #FFFFFF;
  }
  span{
    margin: size(20, 1920);
    color: white;
    font-weight: lighter;
  }
}

.no-active{
  opacity: 55%;
}


.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(0.6, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active до версии 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
