import 'fhirclient';

const Bundles = function Bundles(pId, operation, payload) {
    const smart = window.FHIR.client({
        serviceUrl: process.env.VUE_APP_omhOnFhirAPIBase + '/fhir',
        // smart-1137192
        patientId: pId,
    });


    /*
    Document type bundle.
    The first entry is a composition

     */
    const bundle = {
        "resourceType": "Bundle",
        "meta": {
            "lastUpdated": new Date().toISOString()
        },
        "type": "document",
        "entry": [
            {
                "fullUrl": process.env.VUE_APP_omhOnFhirAPIBase + "/fhir/Patient/" + pId,
                "resource": {
                    "resourceType": "Patient",
                    "id": pId, "name": [{"family": ["Patient"], "given": ["Generic"]}]
                }
            }
        ]
    };

    if (payload.constructor === Array)
        bundle.entry.concat(payload);
    else
        bundle.entry.push(payload);

    // const smart = window.FHIR.oauth2.authorize({
    //   client: {
    //     client_id: 'my_web_app',
    //     scope: 'patient/*.read launch/patient',
    //   },
    //   server: 'https://launch.smarthealthit.org/v/r3/sim/eyJoIjoiMSIsImoiOiIxIn0/fhir',
    // });

    // $.Deferred
    if (operation === 'search')
        return smart.patient.api.search({type: 'Bundle'});
    if (operation === 'create')
        return smart.api.create({resource: bundle});
    if (operation === 'update')
        return smart.api.update({resource: payload});
    if (operation === 'delete')
        return smart.api.delete({resource: payload});

};

export default Bundles;
