// Step 1
import Vapi from 'vuex-rest-api';
import Vue from 'vue';
import Vuex from 'vuex';
// import ContextService from './contextService';
Vue.use(Vuex);

// Step 2
const patients = new Vapi({
  // baseURL: ContextService.getManifest().openmrs.href,
  // credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
  },
  state: {
    patient: '',
    patients: [],
  },
})
// Step 3
  .get({
    action: 'getPatientByUuid',
    property: 'patient',
    path: ({ id }) => `/openmrs/ws/rest/v1/patient/${id}`,
  })
  .get({
    action: 'queryPatients',
    property: 'patients',
    queryParams: true,
    path: '/openmrs/ws/rest/v1/patient',
  })
// Request body (data {}) contains data to persist (not in  params)
  .post({
    action: 'createPatient',
    property: 'patient',
    path: '/openmrs/ws/rest/v1/patient',
  })
// Request body (data {}) contains data to persist (not in  params)
  .post({
    action: 'updatePatient',
    property: 'patient',
    path: ({ id }) => `/openmrs/ws/rest/v1/patient/${id}`,
  })
  .post({
    action: 'deletePatient',
    property: 'patient',
    path: ({ id }) => `/openmrs/ws/rest/v1/patient/${id}`,
  })
// Step 4
  .getStore();

// Step 5
const Patient = new Vuex.Store(patients);
export default Patient;
