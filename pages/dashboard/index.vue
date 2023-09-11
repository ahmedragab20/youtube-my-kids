<template>
  <div class="min-h-[85svh] container mx-auto sm:px-0 px-3 pt-3">
    <!-- The welcome banner -->
    <div
      class="sm:h-[250px] h-[120px] p-5 relative rounded-lg border dark:border-gray-800 border-gray-200 overflow-hidden"
    >
      <!-- overlay -->
      <div class="absolute inset-0 bg-gray-100 dark:bg-gray-900 rounded-lg z-0"></div>

      <!-- content -->
      <div class="absolute inset-0 flex justify-center items-center flex-col z-20 w-full h-full">
        <!-- image -->
        <div class="p-10 rounded-full">
          <div class="w-10 h-10 flex justify-center items-center p-3">
            <span class="text-6xl animate-pulse">✨</span>
          </div>
        </div>
        <div class="text-center">
          <h2 class="text-3xl font-semibold">Welcome, {{ user?.displayName }}</h2>
          <p class="text-gray-500 dark:text-gray-300">we're glad to see you again</p>
        </div>
      </div>
    </div>

    <div class="my-10">
      <PreviewCard video-id="fHI8X4OXluQ" />
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
