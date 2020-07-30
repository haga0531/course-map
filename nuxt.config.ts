
require('dotenv').config()
export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'spa',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: 'Course Map',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '無料or安価な技術、デザイン、コンピュータサイエンスなどのチュートリアルを紹介しあうサイトです。' },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:site', name: 'twitter:site', content: '@uzr4b' },
      { hid: 'twitter:image', name: 'twitter:image', content: 'https://img.freepik.com/free-vector/online-courses-concept_23-2148509720.jpg?size=626&ext=jpg&ga=GA1.2.830787033.1594693234'},
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Course Map'
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://tutorials-list.web.app'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: '無料or安価な技術、デザイン、コンピュータサイエンスなどのチュートリアルを紹介しあうサイトです。'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://img.freepik.com/free-vector/online-courses-concept_23-2148509720.jpg?size=626&ext=jpg&ga=GA1.2.830787033.1594693234'
      },
      { hid: 'og:site_name', name: 'og:site_name', content: 'Course Map' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '@/plugins/element-ui',
    "@/plugins/vue-select"
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/dotenv',
    '@nuxt/typescript-build'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    transpile: [/^element-ui/],
  },
  typescript: {
    typeCheck: true,
    ignoreNotFoundWarnings: true
  }
}
