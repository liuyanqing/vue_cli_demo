import Vue from 'vue'
import { Button, Imagepicker, Row, Col } from '@nutui/nutui';
import App from './App.vue'
import 'normalize.css'
import './style/index.less'

Vue.config.productionTip = false

Button.install(Vue)
Imagepicker.install(Vue)
Row.install(Vue)
Col.install(Vue)

new Vue({
  render: h => h(App),
}).$mount('#app')
