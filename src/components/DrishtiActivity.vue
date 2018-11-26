<template>
  

<div id="activity">
<h1>Activity</h1>
<h2>Search Patient Activity for : {{$ctrl.getPatientName()}}</h2>
<form>
    <h4>Search for activity between date range</h4>
    <div class="form-group">
        <label for="startDate">Start Date:</label>
        <!-- Using date input type for details see: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date -->
        <!-- input value is of the format yyyy-MM-dd by default -->
        <input ng-model="$ctrl.startDate" type="date" id="startDate" name="startDate">
    </div>
    <div class="form-group">
        <label for="endDate">End Date:</label>
        <!-- Using date input type for details see: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date -->
        <!-- input value is of the format yyyy-MM-dd by default -->
        <input ng-model="$ctrl.endDate" type="date" id="endDate" name="endDate">
    </div>
    <button class="btn btn-default" ng-click="$ctrl.queryObservation()">Find step-count as FHIR STU3 Observation</button>
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

import Patient from '../services/patientService';

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
    };
  },
  created() {

  },
  computed: {
    error() {
      return Patient.state.error.patients;
    },
    pending() {
      return Patient.state.pending.patients;
    },
    patients() {
      return Patient.state.patients.results;
    },
  },
  methods: {

    onChange() {
      // Let's warn the parent that a change was made
      this.$emit('input', this.search);

      // Send request

      const params = { q: this.search };
      Patient.dispatch('queryPatients', { params });


      // Is the data given by an outside ajax request?
      if (this.pending) {
        this.isLoading = true;
      } else if (this.patients) {
        // Let's search our flat array
        this.filterResults();
        this.isOpen = true;
      }
    },

    filterResults() {
      // first uncapitalize all the things
      // this.results = this.items
      this.results = this.patients
        .filter(item => item.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
    },

    setResult(result) {
      this.search = result;
      this.isOpen = false;
    },

    onArrowDown(evt) {
      if (this.arrowCounter < this.results.length) {
        this.arrowCounter = this.arrowCounter + 1;
        console.log(evt);
      }
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1;
      }
    },
    onEnter() {
      this.search = this.results[this.arrowCounter];
      this.isOpen = false;
      this.arrowCounter = -1;
    },
    handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        this.isOpen = false;
        this.arrowCounter = -1;
      }
    },
  },

  watch: {
    items(val, oldValue) {
      // actually compare them
      if (val.length !== oldValue.length) {
        this.results = val;
        this.isLoading = false;
      }
    },
  },

  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },

  destroyed() {
    document.removeEventListener('click', this.handleClickOutside);
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
