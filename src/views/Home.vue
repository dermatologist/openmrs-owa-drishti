<template>
  <div class="home">
    <img alt="Vue logo" src="omrs-button.png">
    <HelloPatient msg="Welcome to Your Vue.js App"/>
      <DrishtiLogin logoUrl="@/assets/Google-Fit-Logo-transparent.png"/>

  </div>
</template>

<script>

// @ is an alias to /src
import HelloPatient from '@/components/HelloPatient.vue';
import DrishtiLogin from '@/components/DrishtiLogin.vue';

export default {
  name: 'home',
  components: {
      HelloPatient, DrishtiLogin,
  },
};
</script>
