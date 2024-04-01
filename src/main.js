import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import VueElementLoading from "vue-element-loading";
import AOS from 'aos';
import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)
Vue.component('apexChart', VueApexCharts)
import 'aos/dist/aos.css';
import { VueEditor } from "vue2-editor";
Vue.component('VueEditor', VueEditor)
import firebase from 'firebase'; // Import only the Firebase App module
import 'firebase/firestore'; // Import Firestore if you're using it
const firebaseConfig = {
  apiKey: "AIzaSyCM_LYsNjkw6qqOyIslIuDI0Pswgq1khwY",
  authDomain: "vueverse-96952.web.app",
  projectId: "vueverse-96952",
  storageBucket: "gs://vueverse-96952.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID" // optional
  // Your Firebase configuration options...
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);







Vue.component("VueElementLoading", VueElementLoading);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  render: h => h(App),
  mounted() {
    console.log("Initializing AOS...");
    AOS.init();
  },
}).$mount('#app');
