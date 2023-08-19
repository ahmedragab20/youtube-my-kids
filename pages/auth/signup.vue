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
        :email-password-loading="loggingWithEmailPassword"
        :google-loading="loggingWithGoogle"
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
  const toast = useToast();
  const auth = useFirebaseAuth();
  const { addUser } = useAppFirestore();
  const loggingWithEmailPassword = ref(false);
  const loggingWithGoogle = ref(false);

  const signupWithEmailPassword = async (data: IAnyObject) => {
    const { email, password } = data;
    if (!email || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email and password are required',
      });
    }
    loggingWithEmailPassword.value = true;
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
          metadata: { ...user.metadata },
          refreshToken: user.refreshToken,
          isAnonymous: user.isAnonymous,
        });

        toast.add({
          title: 'Welcome🥰',
          description: 'Hope you have a wonderful session with us.',
          icon: 'i-heroicons-check-badge',
        });

        router.push('/onboarding');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error({
          errorCode,
          errorMessage,
        });

        toast.add({
          title: 'Error',
          description: errorMessage,
          icon: 'i-heroicons-x-circle',
        });
      })
      .finally(() => {
        loggingWithEmailPassword.value = false;
      });
  };

  const signupWithGoogle = async () => {
    loggingWithGoogle.value = true;
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth!, provider)
      .then(async (result) => {
        const user = result.user;

        await addUser({
          uid: user.uid,
          email: user.email!,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          phoneNumber: user.phoneNumber,
          providerId: user.providerId,
          metadata: { ...user.metadata },
          refreshToken: user.refreshToken,
          isAnonymous: user.isAnonymous,
        });

        toast.add({
          title: 'Welcome🥰',
          description: 'Hope you have a wonderful session with us.',
          icon: 'i-heroicons-check-badge',
        });

        router.push('/dashboard');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode);

        toast.add({
          title: 'Error',
          description: errorMessage,
          icon: 'i-heroicons-x-circle',
        });
      })
      .finally(() => {
        loggingWithGoogle.value = false;
      });
  };
</script>
