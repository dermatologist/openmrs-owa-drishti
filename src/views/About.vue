<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>You are now logged in!</div>
    <DrishtiActivity msg="Welcome to Your Vue.js App"/>
  </div>
</template>
<script>
    import DrishtiActivity from '../components/DrishtiActivity';

    export default {
        components: {DrishtiActivity},
    };
</script>
