<template>
  <div class="home">
    <img alt="Vue logo" src="omrs-button.png">
    <DrishtiLogin logoUrl="openmrs-with-title-small.png"/>

  </div>
</template>

<script>

    // @ is an alias to /src
    import DrishtiLogin from '@/components/DrishtiLogin.vue';

    export default {
  name: 'home',
  components: {
      DrishtiLogin,
  },
};
</script>
