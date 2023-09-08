<template>
  <div class="min-h-[85svh] container mx-auto sm:px-0 px-3">
    <!-- The welcome banner -->
    <div class="min-h-[250px] p-5 flex justify-center items-center flex-col">
      <!-- image -->
      <div class="p-10 rounded-full">
        <div class="w-10 h-10 flex justify-center items-center p-3">
          <span class="text-6xl">✨</span>
        </div>
      </div>
      <div class="text-center">
        <h1 class="text-3xl font-semibold">Welcome, {{ user?.displayName }}</h1>
      </div>
    </div>

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
