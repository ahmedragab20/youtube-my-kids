<template>
  <div>
    <!-- via google -->
    <div class="w-full my-2 sm:max-w-sm">
      <button
        @click="setActionMethod('google')"
        type="button"
        class="flex items-center gap-3 w-full border dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 px-4 py-3"
        :class="{
          'opacity-50 cursor-progress': googleLoading || emailPasswordLoading || loading,
        }"
        :disabled="googleLoading || emailPasswordLoading || loading"
      >
        <AppSpinner v-if="googleLoading" size="6" />
        <div class="flex items-center gap-3">
          <img src="/icons/google-icon.svg" class="w-6 h-6" />
          <span>
            {{ viaGoogleBtnText }}
          </span>
        </div>
      </button>
    </div>
    <!-- email&password -->
    <div class="w-full my-2 sm:max-w-sm">
      <button
        @click="setActionMethod('email')"
        type="button"
        class="flex items-center gap-3 w-full border dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 px-4 py-3"
        :class="{
          'opacity-50 cursor-progress': emailPasswordLoading || googleLoading || loading,
        }"
        :disabled="emailPasswordLoading || googleLoading || loading"
      >
        <AppSpinner v-if="emailPasswordLoading" size="6" />
        <div class="flex items-center gap-3">
          <UIcon name="i-heroicons-at-symbol" class="w-6 h-6"></UIcon>
          <span>
            {{ viaEmailBtnText }}
          </span>
        </div>
      </button>
    </div>

    <!-- go to the other page -->
    <div>
      <template v-if="mode === 'sign-in'">
        <p class="text-sm">
          Don't have an account?
          <NuxtLink to="/auth/signup" class="text-primary-400 dark:text-primary-500">
            Sign up
          </NuxtLink>
        </p>
      </template>
      <template v-else>
        <p class="text-sm">
          Already have an account?
          <NuxtLink to="/auth/signin" class="text-primary-400 dark:text-primary-500">
            Sign in
          </NuxtLink>
        </p>
      </template>
    </div>

    <!-- action method -->
    <UModal v-model="emailPasswordMethod">
      <UCard>
        <template #header>
          <h3 class="text-xl text-gray-800 font-semibold dark:text-gray-50 truncate">
            {{
              actionMethod === 'google'
                ? `${mode === 'sign-in' ? 'Sign in' : 'Sign up'} with Google`
                : `${mode === 'sign-in' ? 'Sign in' : 'Sign up'} with email and password`
            }}
          </h3>
        </template>

        <!-- form -->
        <div>
          <AppInput
            v-model="emailPasswordForm.email"
            type="email"
            placeholder="Email"
            aria-autocomplete="false"
          />
          <div class="my-1"></div>
          <AppInput
            v-model="emailPasswordForm.password"
            placeholder="Password"
            type="password"
            aria-autocomplete="false"
          />

          <div class="my-3">
            <UButton
              size="lg"
              :ui="{
                rounded: 'rounded-xl',
              }"
              variant="soft"
              :disabled="!emailPasswordForm.email || !emailPasswordForm.password || !emailValid"
              @click="
                emit('on-email-password-submit', emailPasswordForm), (emailPasswordMethod = false)
              "
            >
              <div>
                <IconLogo class="w-6 h-6" />
              </div>
              {{ mode === 'sign-in' ? 'Sign in' : 'Sign up' }}
            </UButton>
          </div>
        </div>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
  import { IAnyObject } from 'types';
  interface Props {
    mode: 'sign-up' | 'sign-in';
    loading?: boolean;
    emailPasswordLoading?: boolean;
    googleLoading?: boolean;
  }
  const props = defineProps<Props>();
  const emit = defineEmits<{
    'on-email-password-submit': [obj: IAnyObject];
    'on-google-submit': [submitted: boolean];
  }>();

  const viaGoogleBtnText = computed(() => {
    return props.mode === 'sign-up' ? 'Sign up with Google' : 'Sign in with Google';
  });
  const viaEmailBtnText = computed(() => {
    return props.mode === 'sign-up' ? 'Sign up with Email' : 'Sign in with Email';
  });

  const emailPasswordMethod = ref(false);

  const actionMethod = ref();
  const setActionMethod = (method: 'google' | 'email') => {
    actionMethod.value = method;

    if (method === 'google') {
      emit('on-google-submit', true);

      return;
    }

    if (method === 'email') {
      emailPasswordMethod.value = true;

      return;
    }
    emailPasswordMethod.value = false;
  };

  const emailPasswordForm = ref({
    email: '',
    password: '',
  });

  const emailValid = computed(() => {
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return emailRegex.test(emailPasswordForm.value.email);
  });

  onBeforeMount(() => {
    if (!props.mode) {
      throw createError({
        statusCode: 500,
        statusMessage: 'AuthPanel: "mode" prop is required',
      });
    }
  });
</script>
