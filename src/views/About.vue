<template>
  <div class="about">
    <h1>Drishti</h1>
    <div>You are now logged in!</div>
    <DrishtiActivity msg="Welcome to Drishti App"/>
  </div>
</template>
<script>
    import DrishtiActivity from '../components/DrishtiActivity';

    export default {
        components: {DrishtiActivity},
    };
</script>
