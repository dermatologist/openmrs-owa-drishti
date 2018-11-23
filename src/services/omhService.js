import axios from 'axios';



export default class omhService {

constructor(patientId) {
  this.omhJsonServer = axios.create({
    baseURL: process.env.omhOnFhirRedirectUri,
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  this.patientId = patientId;
}

  static login(shimKey) {
    console.log("Logging in to Shimmer");
    this.loginSuccessful = false;
    var shimmerAuthUrl =
        env.omhOnFhirAPIBase +
        env.omhOnFhirAPIShimmerAuth +
        "?ehrId=" + this.getPatientId() +
        "&shimkey=" + shimKey;
    console.log("Authorizing with Shimmer " + shimmerAuthUrl);
    this.loginWindow = window.open(shimmerAuthUrl, 'Sign In', 'left=100,top=100,width=500,height=600');  }

  static getPatientNameFromObject (pt) {
    if (pt.name) {
      var names = pt.name.map(function(name) {
          return name.given.join(" ") + " " + name.family;
      });
      return names.join(" / ");
    } else {
      return "anonymous";
    }
  }

  getPatientResourceObj(){
    return this.patientResourceObj;
  };

  setPatientResourceObj (patientResourceObj){
    console.log("OMH on FHIR Service setting Patient");
    console.log(patientResourceObj);
    this.patientResourceObj = patientResourceObj;

    this.patientId = this.patientResourceObj.id;
    console.log("PatientId: " + this.getPatientId());

    this.patientName = this.getPatientNameFromObject(this.patientResourceObj);
    console.log("PatientName: " + this.patientName);
  };

  getPatientId(){
    return this.patientId;
  };

  setPatientId(patientId){
    this.patientId = patientId;
  };

  getPatientName(){
    return this.patientName;
  };

  setPatientName(patientName){
    this.patientName = patientName;
  };

  getShimmerId(){
    return this.shimmerId;
  };

  setShimmerId(shimmerId){
    console.log("Setting shimmer ID " + shimmerId);
    this.shimmerId = shimmerId;
  };

  getLoginSuccessful(){
    return this.loginSuccess;
  };

  setLoginSuccessful(loginSuccessful){
    console.log("Was login successful " + loginSuccessful);
    this.loginSuccess = loginSuccessful;
  };

  static getResource(url, _id) {
    return openmrsServer.get(`${url}/${_id}`);
  }

  static updateResource(url, resource) {
    return openmrsServer.put(`${url}/${resource._id}`, resource);
  }

  static deleteResource(url, _id) {
    return openmrsServer.delete(`${url}/${_id}`);
  }
}