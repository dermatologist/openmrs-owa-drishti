<template>
  <div class="home">
    <img alt="Vue logo" src="omrs-button.png">
    <HelloPatient msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>

// @ is an alias to /src
import HelloPatient from '@/components/HelloPatient.vue';

export default {
  name: 'home',
  components: {
    HelloPatient,
  },
};
</script>
