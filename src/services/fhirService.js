import 'fhirclient';
import axios from 'axios';

const Bundles = function Bundles(pId, operation, payload) {
    const smart = window.FHIR.client({
        serviceUrl: process.env.VUE_APP_omhOnFhirAPIBase + process.env.VUE_APP_omhOnFhirPath,
        // smart-1137192
        patientId: pId,
    });


    /*
    Document type bundle.
    The first entry is a composition

     */
    let bundle = {
        "resourceType": "Bundle",
        "meta": {
            "lastUpdated": new Date().toISOString()
        },
        "type": "document"
    };

    let entries = [
        {
            "resource": {
                "resourceType": "Patient",
                "id": pId,
                "identifier": [
                    {
                        "system": "urn:system",
                        "value": pId
                    }
                ],
                "name": [{"family": ["Patient"], "given": ["Generic"]}]
            }
        }
    ];

    if (Array.isArray(payload)) {
        bundle.entry = entries.concat(payload);

    } else {
        entries.push(payload);
        bundle.entry = entries;
    }
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
    // if (operation === 'create')
    //     return smart.api.create({resource: bundle});
    if (operation === 'update')
        return smart.api.update({resource: payload});
    if (operation === 'delete')
        return smart.api.delete({resource: payload});

    if (operation === 'create') {
        bundle.id = pId;
        console.log("2");
        console.log(bundle);
        console.log(payload);
        return axios.post(process.env.VUE_APP_omhOnFhirAPIBase + '/ProcessBundle', bundle);
    }
};

export default Bundles;
