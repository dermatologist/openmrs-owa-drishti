import axios from 'axios';


export default class OmhService {

    constructor(patientId) {
        this.omhJsonServer = axios.create({
            baseURL: process.env.omhOnFhirRedirectUri,
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    this.omhServer = axios.create({
        baseURL: process.env.omhOnFhirRedirectUri,
        credentials: 'same-origin',
    });
        this.patientId = patientId;
    }

    login(shimKey) {
        console.log('Logging in to Shimmer');
    this.loginSuccessful = false;
        const shimmerAuthUrl =
            process.env.VUE_APP_omhOnFhirAPIBase +
            process.env.VUE_APP_omhOnFhirAPIShimmerAuth +
            '?ehrId=' + this.getPatientId() +
            '&shimkey=' + shimKey;

        console.log(`Authorizing with Shimmer ${shimmerAuthUrl}`);
        this.loginWindow = window.open(shimmerAuthUrl, 'Sign In', 'left=100,top=100,width=500,height=600');
    }

    getPatientNameFromObject(pt) {
    if (pt.name) {
        const names = pt.name.map(name => `${name.given.join(' ')} ${name.family}`);
        return names.join(' / ');
    }
        return 'anonymous';
  }

    getPatientResourceObj() {
    return this.patientResourceObj;
    }

    setPatientResourceObj(patientResourceObj) {
        console.log('OMH on FHIR Service setting Patient');
    console.log(patientResourceObj);
    this.patientResourceObj = patientResourceObj;

    this.patientId = this.patientResourceObj.id;
        console.log(`PatientId: ${this.getPatientId()}`);

    this.patientName = this.getPatientNameFromObject(this.patientResourceObj);
        console.log(`PatientName: ${this.patientName}`);
    }

    getPatientId() {
    return this.patientId;
    }

    setPatientId(patientId) {
    this.patientId = patientId;
    }

    getPatientName() {
    return this.patientName;
    }

    setPatientName(patientName) {
    this.patientName = patientName;
    }

    getShimmerId() {
    return this.shimmerId;
    }

    setShimmerId(shimmerId) {
        console.log(`Setting shimmer ID ${shimmerId}`);
    this.shimmerId = shimmerId;
    }

    getLoginSuccessful() {
    return this.loginSuccess;
    }

    setLoginSuccessful(loginSuccessful) {
        console.log(`Was login successful ${loginSuccessful}`);
    this.loginSuccess = loginSuccessful;
    }


    requestDocumentReference(shimmerId, startDate, endDate) {
        let shimmerDocRefUrl = `${process.env.omhOnFhirAPIBase}/DocumentReference?subject=${shimmerId}`;

        if (startDate) {
            shimmerDocRefUrl = `${shimmerDocRefUrl}&date=${startDate.toISOString().substring(0, 10)}`;// to make format 'yyyy-MM-dd'
        }
        if (endDate) {
            shimmerDocRefUrl = `${shimmerDocRefUrl}&date=${endDate.toISOString().substring(0, 10)}`;// to make format 'yyyy-MM-dd'
        }
        console.log(`Requesting Document Reference ${shimmerDocRefUrl}`);

        // returns a promise that contains headers, status, and data
        return this.omhServer.get(shimmerDocRefUrl);
    }

    requestObservation(shimmerId, startDate, endDate) {
        return this.requestOmhResource('Observation', shimmerId, startDate, endDate);
    }

    requestOmhResource(resource, shimmerId, startDate, endDate) {
        let shimmerDocRefUrl = `${process.env.omhOnFhirAPIBase}/${resource}?subject=${shimmerId}`;

        if (startDate) {
            shimmerDocRefUrl = `${shimmerDocRefUrl}&date=${startDate.toISOString().substring(0, 10)}`;// to make format 'yyyy-MM-dd'
        }
        if (endDate) {
            shimmerDocRefUrl = `${shimmerDocRefUrl}&date=${endDate.toISOString().substring(0, 10)}`;// to make format 'yyyy-MM-dd'
        }
        console.log(`Requesting ${resource} ${shimmerDocRefUrl}`);

        // returns a promise that contains headers, status, and data
        return this.omhServer.get(shimmerDocRefUrl);
    }

    requestBinaryAsJson(binaryUrl) {
        const shimmerBinaryUrl = `${process.env.omhOnFhirAPIBase}/${binaryUrl}`;
        console.log(`Requesting Binary ${shimmerBinaryUrl}`);
        // returns a promise that contains headers, status, and data
        return this.omhJsonServer.get(shimmerBinaryUrl);
    }

    requestBinaryAsBase64(binaryUrl) {
        const shimmerBinaryUrl = `${process.env.omhOnFhirAPIBase}/${binaryUrl}`;
        console.log(`Requesting Binary ${shimmerBinaryUrl}`);
        // returns a promise that contains headers, status, and data
        return this.omhServer.get(shimmerBinaryUrl);
    }
}
