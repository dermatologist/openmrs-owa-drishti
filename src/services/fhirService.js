import 'fhirclient';

const Observations = function Observations(pId, operation, payload) {
    const smart = window.FHIR.client({
        serviceUrl: process.env.VUE_APP_omhOnFhirAPIBase + '/fhir',
        // smart-1137192
        patientId: pId,
    });

    // const smart = window.FHIR.oauth2.authorize({
    //   client: {
    //     client_id: 'my_web_app',
    //     scope: 'patient/*.read launch/patient',
    //   },
    //   server: 'https://launch.smarthealthit.org/v/r3/sim/eyJoIjoiMSIsImoiOiIxIn0/fhir',
    // });

    // $.Deferred
    if (operation === 'search')
        return smart.patient.api.search({type: 'Observation'});
    if (operation === 'create')
        return smart.api.create({resource: payload});
    if (operation === 'update')
        return smart.api.update({resource: payload});
    if (operation === 'delete')
        return smart.api.delete({resource: payload});

};

export default Observations;
