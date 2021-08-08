import HttpService from "./HttpService";

export default class ApplicationService {
  static baseURL() {
    return "http://localhost:4000/applications";
  }

  static getOfferApplications(offerId) {
    return new Promise(async (resolve, reject) => {
      HttpService.get(
        `${this.baseURL()}/offer/${offerId}`,
        function (data) {
          if (data !== undefined || Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            reject("Error while retrieving offers");
          }
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }
  static getMyApplications() {
    return new Promise(async (resolve, reject) => {
      HttpService.get(
        `${this.baseURL()}/myapplications`,
        function (data) {
          if (data !== undefined || Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            reject("Error while retrieving analytics");
          }
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static updateApplication(application) {
    return new Promise(async (resolve, reject) => {
      HttpService.put(
        `${this.baseURL()}/${application._id}`,
        application,
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static createApplication(offerId) {
    return new Promise(async (resolve, reject) => {
      HttpService.post(
        `${this.baseURL()}`,
        { offerId: offerId },
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static removeApplication(application_id) {
    return new Promise(async (resolve, reject) => {
      HttpService.remove(
        `${this.baseURL()}/${application_id}`,
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }
}
