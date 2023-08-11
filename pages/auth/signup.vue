<template>
  <div>
    <h3 class="text-3xl font-bold">Sign Up</h3>
    <p class="text-sm">
      Now it's time to create your account. You'll be able to access your dashboard and manage your
      account settings once you're done.
    </p>

    <!-- signup types -->
    <!-- TODO Make this component reusable (use AuthPanel.vue) -->
    <div class="my-3">
      <!-- sing-up with google -->
      <div class="w-full my-2 sm:max-w-sm">
        <button
          type="button"
          class="flex items-center gap-3 w-full border dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 px-4 py-3"
        >
          <img src="/icons/google-icon.svg" class="w-6 h-6" />
          <span>Sign up with Google</span>
        </button>
      </div>
      <!-- sign-up with email&password -->
      <div class="w-full my-2 sm:max-w-sm">
        <button
          type="button"
          class="flex items-center gap-3 w-full border dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 px-4 py-3"
        >
          <UIcon name="i-heroicons-at-symbol" class="w-6 h-6"></UIcon>
          <span>Sign up with Email</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';

  //@ts-ignore [nuxt type bug]
  definePageMeta({
    layout: 'auth',
  });

  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential!.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...

      console.log({
        token,
        user,
      });
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...

      console.log({
        errorCode,
        errorMessage,
        email,
        credential,
      });
    });
</script>
