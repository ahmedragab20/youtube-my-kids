export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxthq/ui', 'nuxt-vuefire'],
  vuefire: {
    auth: true,
    config: {
      apiKey: 'AIzaSyC0jwqcbPNSljJG5foK0hAV_GyeKmYaJdo',
      authDomain: 'my-kids-e1a98.firebaseapp.com',
      projectId: 'my-kids-e1a98',
      appId: '1:87707440697:web:f20efe8641f669d1ae9fe8',
      measurementId: 'G-6F1WBFEG77',
      messagingSenderId: '87707440697',
    },
    admin: {
      serviceAccount: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    },
  },
});
