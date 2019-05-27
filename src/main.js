import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase';
import { MdButton } from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

const config = {
  apiKey: "AIzaSyDEyP1kVVWiFWypKQ_7g651vqXUM-iYcJI",
  authDomain: "pasdatabase-c3a03.firebaseapp.com",
  databaseURL: "https://pasdatabase-c3a03.firebaseio.com",
  projectId: "pasdatabase-c3a03",
  storageBucket: "pasdatabase-c3a03.appspot.com",
  messagingSenderId: "1081279896615",
  appId: "1:1081279896615:web:793191eea14b69d4"
}
firebase.initializeApp(config);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
Vue.use(MdButton)