<template>
  <div>
    <h3 class="text-3xl font-bold">Sign Up</h3>
    <p class="text-sm">
      Now it's time to create your account. You'll be able to access your dashboard and manage your
      account settings once you're done.
    </p>

    <div class="my-3">
      <AuthPanel
        mode="sign-up"
        @on-email-password-submit="signupWithEmailPassword"
        @on-google-submit="signupWithGoogle"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithPopup,
  } from 'firebase/auth';
  import { IAnyObject } from 'types';
  definePageMeta({
    layout: 'auth',
  });

  const router = useRouter();
  const auth = useFirebaseAuth();
  const { addUser } = useAppFirestore();

  const signupWithEmailPassword = async (data: IAnyObject) => {
    const { email, password } = data;
    if (!email || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email and password are required',
      });
    }

    await createUserWithEmailAndPassword(auth!, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        await addUser({
          uid: user.uid,
          email: user.email!,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          phoneNumber: user.phoneNumber,
          providerId: user.providerId,
          metadata: user.metadata,
          refreshToken: user.refreshToken,
          isAnonymous: user.isAnonymous,
        });

        router.push('/dashboard');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error({
          errorCode,
          errorMessage,
        });
      });
  };

  const signupWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth!, provider)
      .then(async (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential!.accessToken;
        const user = result.user;

        await addUser({
          uid: user.uid,
          email: user.email!,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          phoneNumber: user.phoneNumber,
          providerId: user.providerId,
          metadata: user.metadata,
          refreshToken: user.refreshToken,
          isAnonymous: user.isAnonymous,
        });

        router.push('/dashboard');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);

        console.error({
          errorCode,
          errorMessage,
          email,
          credential,
        });
      });
  };
</script>
