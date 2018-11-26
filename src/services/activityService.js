// Step 1
import Vapi from 'vuex-rest-api';
import Vue from 'vue';
import Vuex from 'vuex';
// import ContextService from './contextService';
Vue.use(Vuex);

// Step 2
const activity = new Vapi({
    // baseURL: ContextService.getManifest().openmrs.href,
    // credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    state: {
        act: '',
        acts: [],
    },
})
// Step 3
/*
 authenticated: json.authenticated,
 user: json.user,
location: json.sessionLocation

 */
    .get({
    action: 'queryActivity',
        property: 'acts',
    queryParams: true,
    path: `${process.env.VUE_APP_omhOnFhirAPIBase}/Observation`,
  })
    // Step 4
    .getStore();

// Step 5
const Activity = new Vuex.Store(activity);
export default Activity;
