import colors from "vuetify/es5/util/colors";
export default {
  mode: "spa",
  /*
   ** Headers of the page
   */
  target: "static",
  head: {
    titleTemplate: "%s - " + process.env.npm_package_description,
    title: process.env.npm_package_description || "",
    meta: [{ charset: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }, { hid: "description", name: "description", content: process.env.npm_package_description || "" }],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons" },
    ],
  },
  components: true,
  /*
   ** Customize the progress-bar color
   */
  // loading: { color: '#fff' },
  loading: "~/components/armsLoader.vue",
  /*
   ** Global CSS
   */
  css: ["@/assets/style.css", "@/assets/vuetify/overrides.scss"],
  router: {
    middleware: ["auth"],
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "~/plugins/moment.js" },
    { src: "~/plugins/vue-apexchart.js", ssr: false },
    { src: "~/plugins/highcharts-vue.js" },
    { src: "~/plugins/TiptapVuetify", mode: "client" },
    { src: "~/plugins/v-calendar", ssr: false },
    "~plugins/vue-gallery.client.js",
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/vuetify"],

  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/axios", "@nuxtjs/auth", "nuxt-pdf", "@nuxtjs/pwa", "vue-scrollto/nuxt", "nuxt-clipboard2"],
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            headers: { "Content-type": "application/json" },
            url: "/auth/local",
            method: "post",
            propertyName: "jwt",
          },
          logout: false,
          user: {
            headers: { "Content-type": "application/json" },
            url: "/users/me",
            method: "get",
            propertyName: false,
          },
        },
        tokenType: "Bearer",
      },
    },
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    // baseURL: 'http://armsbackend.localhost'
    // baseURL: "http://51.79.160.53:1338",
    //  baseURL: 'https://genie2.rotihouselao.com'
    baseURL: "http://103.162.73.11:1338",
  },

  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    treeShake: true,
    theme: {
      dark: false,
      default: "light",
      disable: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        light: {
          primary: "#1976D2",
          secondary: "#424242",
          accent: "#82B1FF",
          error: "#FF5252",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FB8C00",
        },
      },
    },
  },
  /*
   ** Build configuration
   */
  build: {
    vendor: ["vue-apexchart"],
    /*

    ** You can extend webpack config here
    */
    extend(config, ctx) {},
  },
};
