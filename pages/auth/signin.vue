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
  import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
  import { IAnyObject } from 'types';

  definePageMeta({
    layout: 'auth',
  });

  const router = useRouter();
  const auth = useFirebaseAuth();
  const { addUser } = useAppFirestore();

  const signinWithEmailPassword = async (data: IAnyObject) => {
    console.log({
      data,
    });

    const { email, password } = data;
    if (!email || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Email and password are required',
      });
    }

    await signInWithEmailAndPassword(auth!, email, password)
      .then(() => {
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
  const signinWithGoogle = async () => {
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
          metadata: user.metadata,
          refreshToken: user.refreshToken,
          isAnonymous: user.isAnonymous,
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
