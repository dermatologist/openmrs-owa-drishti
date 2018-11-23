import openmrsServer from './crud';


// All functions return a promise

export default class crudService {
  static getResources(url) {
    return openmrsServer.get(url);
  }

  static postResource(url, resource) {
    return openmrsServer.post(url, resource);
  }

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
