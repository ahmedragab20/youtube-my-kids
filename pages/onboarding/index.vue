<template>
  <div class="min-h-screen flex justify-center items-center flex-col">
    <div>
      <h3 class="font-extrabold text-3xl sm:text-6xl text-center text-gray-700 dark:text-gray-50">
        Hey, Friend!
      </h3>
      <h5 class="text-xl sm:text-3xl font-extrabold text-center text-gray-700 dark:text-gray-50">
        We're so pleased to have you here.❤️
      </h5>
    </div>
    <div class="mt-4 text-center">
      <div>
        <strong class="text-gray-700 dark:text-gray-50"> What should we call you? </strong>

        <div class="text-gray-500">
          <small>your name doesn't have to be real.</small>
          <small>Type whatever you want us to call you</small>
        </div>
      </div>
      <AppInput v-model="name" placeholder="Your Lovely Name" @keyup.enter="updateProfile" />
    </div>
    <div class="mt-4">
      <UButton
        :loading="updating"
        @click="updateProfile"
        :ui="{
          rounded: 'rounded-lg',
        }"
        variant="outline"
        icon="i-heroicons-arrow-right"
      >
        <span class="p-1">All settled, Let's go!</span>
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    middleware: 'onboarding',
  });
  const router = useRouter();
  const toast = useToast();
  const updating = ref(false);
  const name = ref('');
  const updateProfile = async () => {
    try {
      updating.value = true;
      const { updateUser } = useAppFirestore();

      await updateUser({
        displayName: name.value,
      });
      toast.add({
        title: 'All Settled!',
        description: 'You can now start using the app.',
        icon: 'i-heroicons-check-badge',
      });
      await router.push('/dashboard');
    } catch (error) {
      console.log(error);
      throw createError({
        statusCode: 500,
        statusMessage: 'Sorry! Something went wrong. Please try again later.',
      });
    } finally {
      updating.value = false;
    }
  };
</script>
