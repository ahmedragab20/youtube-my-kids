<template>
  <div>
    <h3 class="text-3xl font-bold">Sign In</h3>
    <p class="text-sm">Welcome back! Sign into your account and go in.</p>

    <div class="my-3">
      <AuthPanel
        mode="sign-in"
        :email-password-loading="loggingWithEmailPassword"
        :google-loading="loggingWithGoogle"
        @on-email-password-submit="signinWithEmailPassword"
        @on-google-submit="signinWithGoogle"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
  import { IAnyObject } from 'types';

  definePageMeta({
    layout: 'auth',
  });

  const router = useRouter();
  const auth = useFirebaseAuth();
  const toast = useToast();
  const { addUser } = useAppFirestore();
  const loggingWithEmailPassword = ref(false);
  const loggingWithGoogle = ref(false);
  const signinWithEmailPassword = async (data: IAnyObject) => {
    const { email, password } = data;
    if (!email || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email and password are required',
      });
    }
    loggingWithEmailPassword.value = true;
    await signInWithEmailAndPassword(auth!, email, password)
      .then(() => {
        toast.add({
          icon: 'i-heroicons-check-badge',
          title: 'Sign in successfully',
          description: 'Enjoy!❤️',
        });

        // router.push('/dashboard');
        router.push('/onboarding');
      })
      .catch((error) => {
        console.error(error);

        toast.add({
          icon: 'i-heroicons-x-circle',
          title: 'Sign in failed',
          description: 'Please check your email and password',
          color: 'red',
        });
      })
      .finally(() => {
        loggingWithEmailPassword.value = false;
      });
  };
  const signinWithGoogle = async () => {
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
          icon: 'i-heroicons-check-badge',
          title: 'Sign in successfully',
          description: 'Enjoy!❤️',
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

        toast.add({
          icon: 'i-heroicons-x-circle',
          title: 'Sign in failed',
          description: errorMessage,
          color: 'red',
        });
      })
      .finally(() => {
        loggingWithGoogle.value = false;
      });
  };
</script>
