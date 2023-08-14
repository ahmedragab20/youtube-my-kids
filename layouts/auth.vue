<template>
  <div class="flex justify-between border items-center h-screen">
    <div class="sm:w-1/2 w-full">
      <div class="max-w-2xl mx-auto p-5">
        <ThemeToggler />
        <div class="flex gap-1 items-center text-gray-700 dark:text-gray-400 mb-5">
          <div class="w-9">
            <IconLogo class="w-full object-contain" />
          </div>
          <div>
            <h3 class="text-xl font-bold">{{ appName }}</h3>
          </div>
        </div>
        <div>
          <slot />
        </div>
      </div>
    </div>
    <div class="sm:w-1/2 w-0 h-full bg-gray-100 sm:block hidden">
      <Transition name="fade-in" appear mode="out-in">
        <img
          v-if="route.path.includes('signin')"
          src="/02-auth.webp"
          alt="image for a green mountain illustration"
          class="w-full h-full object-cover select-none pointer-events-none"
        />
        <img
          v-else
          src="/01-auth.webp"
          alt="image for a green mountain illustration"
          class="w-full h-full object-cover select-none pointer-events-none"
        />
      </Transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const { name: appName } = useMyApp();
  const route = useRoute();
</script>

<style scoped>
  .fade-in-enter-active,
  .fade-in-leave-active {
    transition: opacity 0.3s ease-in-out;
  }
  .fade-in-enter-from,
  .fade-in-leave-to {
    opacity: 0.8;
  }
</style>
