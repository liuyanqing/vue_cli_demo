import Vue from 'vue'
import { 
  Button, 
  Imagepicker, 
  Datepicker, 
  Actionsheet, 
  Picker, 
  Row, 
  Col, 
  Cell 
} from '@nutui/nutui';
import App from './App.vue'
import 'normalize.css'
import './style/index.scss'

Vue.config.productionTip = false

Button.install(Vue)
Imagepicker.install(Vue)
Datepicker.install(Vue)
Actionsheet.install(Vue)
Picker.install(Vue)
Row.install(Vue)
Col.install(Vue)
Cell.install(Vue)

new Vue({
  render: h => h(App),
}).$mount('#app')
