import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'pinkNeo',
    themes: {
      pinkNeo: {
        dark: false,
        colors: {
          background: '#fff0f5',
          surface: '#ffe4ec',
          primary: '#ff69b4',
          secondary: '#ff1493',
          error: '#ff4d4d'
        }
      }
    }
  }
})

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')
