<template>
  <div>
    <h3 class="text-3xl font-bold">Sign Up</h3>
    <p class="text-sm">
      Now it's time to create your account. You'll be able to access your dashboard and manage your
      account settings once you're done.
    </p>

    <div class="my-3">
      <AuthPanel mode="sign-up" />
    </div>
  </div>
</template>

<script setup lang="ts">
  // import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';

  definePageMeta({
    layout: 'auth',
  });
</script>
