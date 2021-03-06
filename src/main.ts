import { createApp } from 'vue'
import { createPinia } from 'pinia'

// import { Quasar } from 'quasar'
// import '@quasar/extras/material-icons/material-icons.css'
// import 'quasar/src/css/index.sass'

import App from './App.vue'
import router from './router'
import '@/assets/styles/site.scss';

const app = createApp(App)

// app.use(Quasar, {
//     plugins: {},
//   })

app.use(
    createPinia()
);
app.use(router);

app.mount('#app');
