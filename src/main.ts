import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { reveal } from './directives/reveal'
import router from './router'

createApp(App).use(router).directive('reveal', reveal).mount('#app')
