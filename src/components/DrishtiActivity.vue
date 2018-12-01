<template>


<div id="activity">
<h1>Activity</h1>
    <h2>Search Patient Activity for patient: {{ search }}</h2>
<form>
    <h4>Search for activity between date range</h4>
    <div class="form-group">
        <label for="startDate">Start Date:</label>
        <!-- Using date input type for details see: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date -->
        <!-- input value is of the format yyyy-MM-dd by default -->
        <input v-model="startDate" type="date" id="startDate" name="startDate">
    </div>
    <!--<div class="form-group">-->
    <!--<label for="endDate">End Date:</label>-->
    <!--&lt;!&ndash; Using date input type for details see: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date &ndash;&gt;-->
    <!--&lt;!&ndash; input value is of the format yyyy-MM-dd by default &ndash;&gt;-->
    <!--<input v-model="endDate" type="date" id="endDate" name="endDate">-->
    <!--</div>-->
    <button class="btn btn-default" @click.prevent="handleClick()">Find step-count as FHIR STU3 Observation</button>
</form>


    <div v-if="pending" class="alert alert-info">
    <i class="fa fa-spinner fa-spin" style="font-size:24px"></i>
    Searching for STU3 Observations...
</div>
    <ul>

        <li v-for="(result, i) in activity.entry" :key="i">
            {{i}}. {{ result.resource.effectivePeriod.start }} | {{ result.resource.effectivePeriod.end }} - STEPS:
            <div :key="j" @click="createObs(result)" v-for="(component, j) in result.resource.component">
                {{ component.valueQuantity.value}}
            </div>
        </li>
    </ul>
    <button @click="addAll(activity.entry)" class="btn btn-primary">Add all to drishti</button>
</div>

</template>

<script>

    import Activity from '../services/activityService';
    import Session from '../services/sessionService';
    import Bundles from '../services/fhirService';

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
      return Activity.state.error.act;
    },
    pending() {
      return Activity.state.pending.act;
    },
    activity() {
        return Activity.state.act;
    },
    session() {
      return Session.state.session;
    },

  },
  methods: {

      handleClick() {
          const startDateParam = new Date(this.startDate);
          const params = {
              date: startDateParam.toISOString().substring(0, 10),
              subject: this.$store.state.shimmerId,

          };
          Activity.dispatch('queryActivity', {params});
          this.search = this.session.user.display;
      },

      createObs(obs) {
          // Ad patient
          obs.resource.subject.reference = "Patient/" + this.session.user.uuid;
          Bundles(this.session.user.uuid, 'create', obs);
          console.log(obs);
      },

      addAll(allObs) {
          let entries = [];
          let uuid = this.session.user.uuid;
          allObs.forEach(function (element) {
              element.resource.subject.reference = "Patient/" + uuid;
              entries.push(element);
          });
          Bundles(this.session.user.uuid, 'create', entries);
      },
  },

  watch: {

  },

  mounted() {
      Session.dispatch('getSession');
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


</style>
