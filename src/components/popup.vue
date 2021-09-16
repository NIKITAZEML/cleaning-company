<template>
  <div class="popup">
    <div class="container">
      <div class="popup-content">
        <div class="close">
          <svg @click="closePopup" viewBox="0 0 329.26933 329" xmlns="http://www.w3.org/2000/svg"><path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"/></svg>
        </div>
        <p class="popup-title">Заполните анкету для связи</p>
        <form class="form" @submit.prevent="checkForm">
          <div class="input-item">
            <div class="title">Имя</div>
            <div class="size">
              <input
                  type="text"
                  class="size"
                  :class="$v.name.$error ? 'is-invalid' : ''"
                  v-model.trim="name"
                  placeholder="Иван"
                  maxlength="71"
                  onKeyUp="if(/[^a-zA-Zа-яА-ЯёЁ ]/i.test(this.value)){this.value='';}"
              >
              <p v-if="$v.name.$dirty && !$v.name.required" class="invalid-feedback">
                Обязательное поле
              </p>
            </div>
          </div>
          <div class="input-item">
            <div class="title">Контактный телефон</div>
            <div class="size">
              <input
                  type="text"
                  class="size"
                  :class="$v.phone.$error ? 'is-invalid' : ''"
                  v-model.trim="phone"
                  v-imask="phoneNumberMask"
                  maxlength="16"
                  placeholder="+7(912)312-31-23"
                  @keypress="isNumber"
              >
              <p v-if="$v.phone.$dirty && !$v.phone.required" class="invalid-feedback">
                Введите номер в формате: +7(912)312-31-23
              </p>
              <p v-if="$v.phone.$dirty && !$v.phone.minLength" class="invalid-feedback">
                Введите номер в формате: +7(912)312-31-23
              </p>
            </div>
          </div>
          <div class="input-item">
            <div class="title">Адрес</div>
            <div class="size">
              <input
                  type="text"
                  class="size input-adress"
                  :class="$v.adress.$error ? 'is-invalid' : ''"
                  v-model.trim="adress"
                  placeholder="г.Липецк, ул Театральная площадь 1 офис №318а"
                  maxlength="71"
              >
              <p v-if="$v.adress.$dirty && !$v.adress.required" class="invalid-feedback">
                Обязательное поле
              </p>
            </div>
          </div>
          <div class="input-item">
            <div class="title">Пожелания к заказу</div>
            <div class="size">
              <textarea cols="30" rows="6" v-model="comment" maxlength="1000"></textarea>
            </div>
          </div>
          <button type="submit" @click="submitForm">Отправить</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'
import { IMaskDirective} from 'vue-imask'


export default {
  mixins: [validationMixin],
  props: ['showFinishPopup', 'roomTypes', 'coatingItems', 'glassesItem', 'specialItems', 'selectedRoomType', 'selectedClearType', 'selectedCoatingType', 'roomSize', 'trashSize', 'totalSumm'],
  data () {
    return {
        name: '',
        phone: '',
        adress: '',
        comment: '',

      phoneNumberMask: {
        mask: '+{0}(000)000-00-00',
        lazy: true
      },

      // bot config

      token: "1916378106:AAH_I-dviDioPMKanolMKKVOJ4TFFh2xlHY",
      chatId: "-591755037",
      chatId2: "-545823328"

    }
  },

  validations: {
        name: {required},
        phone: {required, minLength: minLength(16)},
        adress: {required},
  },



  created() {

  },
  methods: {

    isNumber (e) {
      const regex = /[0-9]/
      if (!regex.test(e.key)) {
        e.returnValue = false;
        if (e.preventDefault) e.preventDefault();
      }
    },
    // checkForm() {
    //   this.$v.$touch()
    //   if (!this.$v.$error) {
    //     console.log('Валидация прошла успешно')
    //   }
    // },

    closePopup() {
      this.$emit("closePopup", this.showFinishPopup)
    },
    submitForm() {
      this.$v.$touch()
      if (!this.$v.$error) {

        this.$emit("closePopup", this.showFinishPopup)
        let coatingArr = []
        let glassesArr = []
        let specialArr = []
        let roomType = `Тип помещения - ${this.selectedRoomType} \n`
        let roomSize = `Площадь ≈ ${this.roomSize} м2\n`
        let cleartype = `Тип уборки - ${this.selectedClearType} \n`
        let price = `Цена ≈ ${this.totalSumm} \n\n`
        let trash = `Мусор ≈ ${this.trashSize} кг\n`
        let coverType = `Тип покрытия - ${this.selectedCoatingType} \n`

        if (this.specialItems[4].active === false) {
          trash = ''
        }
        if (this.selectedRoomType === '') {
          roomType = ''
          roomSize = ''
          cleartype = ''
        }
        if (this.selectedCoatingType === '') {
          coverType = ''
        }
        if (coatingArr.length === 0) {
          coatingArr = ''
        }
        if (glassesArr.length === 0) {
          glassesArr = ''
        }
        if (specialArr.length === 0) {
          specialArr = ''
        }


        coatingArr = this.coatingItems.map((item) => {
          if (item.active === true) {
            if (item.name == 'Мебель') {
              return item.name + ' - присутствует\n'
            }
            return item.name + ' ' + item.counter + ' м2\n'
          }
        })


        glassesArr = this.glassesItem.map((item) => {
          if (item.active === true) {
            return item.name + ' - ' + item.counter + 'шт.\n'
          }
        })


        specialArr = this.specialItems.map((item) => {
          if (item.active === true) {
            return item.name + '\n'
          }
        })


        let msg = `${'Имя: ' + this.name + '\nТелефон: ' + this.phone + '\nАдрес: \n' + this.adress + '\n\nКомментарий: \n' + this.comment + '\n\n' + roomType + roomSize + cleartype + coatingArr.join('') + coverType + '\n' + glassesArr.join('') + '\n' + specialArr.join('') + trash + '\n' + price}`

        this.$http.post(`https://api.telegram.org/bot${this.token}/sendMessage?chat_id=${this.chatId}&text=${msg}`)
        this.$http.post(`https://api.telegram.org/bot${this.token}/sendMessage?chat_id=${this.chatId2}&text=${msg}`)

        this.closePopup()

        this.name = ''
        this.phone = ''
        this.adress = ''
        this.comment = ''
      }
    }
  },
  directives: {
    imask: IMaskDirective
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/null";
.popup{
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.popup-content{
  margin: auto;
  width: 50%;
  border: 1px solid #F3CD00;
  border-radius: 6px;
  background-color: #202020;
  padding: size(20, 1920);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.close{
  display: flex;
  width: 100%;
  justify-content: flex-end;
  svg{
    cursor: pointer;
    width: size(25, 1920);
    fill: white;
    transition: 0.1s ease-in-out;
    &:hover{
      fill: #F3CD00;
      transition: 0.1s ease-in-out;
    }

  }
}

.popup-title{
  margin: auto;
  text-align: center;
  color: white;
  font-weight: bold;
  font-size: size(30, 1920);
  margin-top: size(20, 1920);
}

.input-item{
  display: flex;
  flex-direction: column;
  margin-bottom: size(30, 1920);
  .title{
    color: white;
    margin-bottom: size(12, 1920);
    font-size: size(25, 1920);
  }
}

.form{
  width: 100%;
  margin-top: size(40, 1920);
}



input{
  border: 1px solid #F3CD00;
  width: 100% !important;
  height: size(50, 1920);
  display: flex;
  justify-content: start;
  align-items: center;
  padding: size(10, 1920);
  background-color: #202020;
  border-radius: 6px;
  font-style: normal;
  font-size: size(22, 1920);
  line-height: size(27, 1920);
  color: #FFFFFF;
  cursor: pointer;
  text-align: start;
}


textarea{
  width: 100%;
  border: 1px solid #F3CD00;
  padding: size(10, 1920);
  background-color: #202020;
  border-radius: 6px;
  font-style: normal;
  font-size: size(22, 1920);
  line-height: size(21, 1920);
  color: #FFFFFF;
  cursor: pointer;
  text-align: start;
}

  button {
    border: 1px solid #F3CD00;
    margin: auto;
    display: flex;
    padding: size(15, 1920) size(40, 1920);
    background-color: #202020;
    border-radius: 6px;
    font-style: normal;
    font-size: size(21, 1920);
    line-height: size(24, 1920);
    color: #FFFFFF;
    cursor: pointer;
    transition: 0.10s ease-in-out;
    font-weight: bold;

    &:hover {
      background-color: #2b2b2b;
      transition: 0.10s ease-in-out;
    }

    &:active {
      background-color: #242424;
      border: 1px solid #a1932a;
    }
  }
  .is-invalid{
    border: 1px solid red;
  }
  .invalid-feedback{
    color: #F3CD00;
    margin-top: size(10, 1920);
    font-size: size(20, 1920);
  }


</style>
