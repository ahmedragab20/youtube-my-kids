import config from './config';
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxthq/ui', 'nuxt-vuefire'],
  vuefire: {
    auth: true,
    config: {
      apiKey: config.API_KEY,
      authDomain: config.AUTH_DOMAIN,
      projectId: config.PROJECT_ID,
      appId: config.APP_ID,
      measurementId: config.MEASUREMENT_ID,
      messagingSenderId: config.MESSAGING_SENDER_ID,
    },
    admin: {
      serviceAccount: config.ADMIN_SERVICE,
    },
  },
});
