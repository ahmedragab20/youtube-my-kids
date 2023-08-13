<template>
  <div class="min-h-[85svh] flex justify-center items-center flex-col">
    <h2 class="text-3xl font-bold">Dashboard</h2>
    <p class="text-xl">
      Welcome to your dashboard,
      <span v-if="user?.uid" class="text-primary-500"> {{ user?.displayName || user.email }} </span>
    </p>

    <div>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
        @click="logout"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { signOut } from 'firebase/auth';
  definePageMeta({
    middleware: 'authentication',
  });

  const router = useRouter();
  const user = useCurrentUser();

  const logout = () => {
    console.log(
      `%cLogout`,
      'color: #fff; background-color: #000; padding: 0.25rem 0.5rem; border-radius: 0.45rem; font-weight: bold; font-family: monospace; font-size: 0.85rem;'
    );

    const auth = useFirebaseAuth();
    signOut(auth!)
      .then(() => {
        // Sign-out successful.
        router.push('/');
      })
      .catch((error) => {
        // An error happened.
        console.error({
          error,
        });
      });
  };
</script>
