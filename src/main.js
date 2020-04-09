import Vue from 'vue'
import App from './App.vue'
import VueDraggableResizable from 'vue-draggable-resizable'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
Vue.component('vue-draggable-resizable', VueDraggableResizable)
import VCharts from 'v-charts'
Vue.use(VCharts)
new Vue({
  el: '#app',
  render: h => h(App)
})
