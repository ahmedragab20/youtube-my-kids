<template>
  <div>
    <h3 class="text-3xl font-bold">Sign In</h3>
    <p class="text-sm">Welcome back! Sign into your account and go in.</p>
    <div class="my-3">
      <AuthPanel
        mode="sign-in"
        @on-email-password-submit="signinWithEmailPassword"
        @on-google-submit="signinWithGoogle"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import {
    GoogleAuthProvider,
    getAuth,
    signInWithEmailAndPassword,
    signInWithPopup,
  } from 'firebase/auth';
  import { IAnyObject } from 'types';

  definePageMeta({
    layout: 'auth',
  });

  const router = useRouter();

  const auth = getAuth();

  const signinWithEmailPassword = (data: IAnyObject) => {
    const { email, password } = data;
    if (!email || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email and password are required',
      });
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...

        console.log({
          user,
        });

        router.push('/dashboard');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..

        console.log({
          errorCode,
          errorMessage,
        });
      });
  };
  const signinWithGoogle = () => {
    const provider = new GoogleAuthProvider();
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
          credential,
        });

        router.push('/dashboard');
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
  };
</script>
