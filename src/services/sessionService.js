// Step 1
import Vapi from 'vuex-rest-api';
import Vue from 'vue';
import Vuex from 'vuex';
// import ContextService from './contextService';
Vue.use(Vuex);

// Step 2
const session = new Vapi({
    // baseURL: ContextService.getManifest().openmrs.href,
    // credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    state: {
        session: '',
    },
})
// Step 3
/*
 authenticated: json.authenticated,
 user: json.user,
location: json.sessionLocation

 */
    .get({
        action: 'getSession',
        property: 'session',
        queryParams: false,
        path: '/openmrs/ws/rest/v1/session',
    })
    // Step 4
    .getStore();

// Step 5
const Session = new Vuex.Store(session);
export default Session;
