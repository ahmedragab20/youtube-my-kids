import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';

export default defineNuxtPlugin((nuxtApp) => {
  const firebaseConfig = {
    apiKey: 'AIzaSyC0jwqcbPNSljJG5foK0hAV_GyeKmYaJdo',
    authDomain: 'my-kids-e1a98.firebaseapp.com',
    projectId: 'my-kids-e1a98',
    storageBucket: 'my-kids-e1a98.appspot.com',
    messagingSenderId: '87707440697',
    appId: '1:87707440697:web:f20efe8641f669d1ae9fe8',
    measurementId: 'G-6F1WBFEG77',
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
});
