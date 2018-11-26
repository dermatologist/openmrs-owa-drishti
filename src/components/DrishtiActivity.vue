<template>
  

<div id="activity">
<h1>Activity</h1>
<h2>Search Patient Activity for patient: {{this.session.user.uuid}}</h2>
<form>
    <h4>Search for activity between date range</h4>
    <div class="form-group">
        <label for="startDate">Start Date:</label>
        <!-- Using date input type for details see: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date -->
        <!-- input value is of the format yyyy-MM-dd by default -->
        <input v-model="startDate" type="date" id="startDate" name="startDate">
    </div>
    <div class="form-group">
        <label for="endDate">End Date:</label>
        <!-- Using date input type for details see: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date -->
        <!-- input value is of the format yyyy-MM-dd by default -->
        <input v-model="endDate" type="date" id="endDate" name="endDate">
    </div>
    <button class="btn btn-default" v-on:click="handleClick()">Find step-count as FHIR STU3 Observation</button>
</form>


<div ng-if="$ctrl.waitingForObservationSearch" class="alert alert-info">
    <i class="fa fa-spinner fa-spin" style="font-size:24px"></i>
    Searching for STU3 Observations...
</div>

<div ng-if="$ctrl.observationResponse.length > 0" class="container-fluid" id="observationResponse">
    <pre>
        {{$ctrl.observationResponse}}
    </pre>
</div>

</div>

</template>

<script>

import Patient from '../services/activityService';

export default {
  name: 'DrishtiActivity',
  props: {
    msg: String,
  },
  data() {
    return {
      isOpen: false,
      results: [],
      search: '',
      isLoading: false,
      arrowCounter: 0,
      startDate: '',
      endDate: '',
    };
  },
  created() {

  },
  computed: {
    error() {
      return Activity.state.error.patients;
    },
    pending() {
      return Activity.state.pending.patients;
    },
    activity() {
      return Activity.state.patients.results;
    },
    session() {
      return Session.state.session;
    },

  },
  methods: {

            handleClick() {
                console.log(process.env.VUE_APP_googleFitShim);
                let omhSevice = new OmhService(this.session.user.uuid);
                omhSevice.login(process.env.VUE_APP_googleFitShim);
                console.log(this.session.user.uuid);
            },

  },

  watch: {

  },

  mounted() {
  },

  destroyed() {
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.autocomplete-results {
    padding: 0;
    margin: 0;
    border: 1px solid #eeeeee;
    height: 120px;
    overflow: auto;
    width: 100%;
}

.autocomplete-result {
    list-style: none;
    text-align: left;
    padding: 4px 2px;
    cursor: pointer;
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
    background-color: #4aae9b;
    color: white;
}

</style>
