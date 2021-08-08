import HttpService from "./HttpService";

export default class OfferService {
  static baseURL() {
    return "http://localhost:4000/offers";
  }

  static getMyOffers() {
    return new Promise(async (resolve, reject) => {
      HttpService.get(
        `${this.baseURL()}/myoffers`,
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

  static getOffers() {
    return new Promise(async (resolve, reject) => {
      HttpService.get(
        `${this.baseURL()}`,
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
  static getUserOffers(profile) {
    return new Promise(async (resolve, reject) => {
      HttpService.get(
        `${this.baseURL()}/user/${profile._id}`,
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

  static getFilteredOffers(kind) {
    return new Promise(async (resolve, reject) => {
      HttpService.get(
        `${this.baseURL()}/kind/${kind}`,
        function (data) {
          if (data !== undefined || Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            reject("Error while retrieving business offers");
          }
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static updateOffer(offer) {
    return new Promise(async (resolve, reject) => {
      HttpService.put(
        `${this.baseURL()}/${offer._id}`,
        offer,
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static addOffer(offer) {
    return new Promise(async (resolve, reject) => {
      HttpService.post(
        `${this.baseURL()}`,
        offer,
        function (data) {
          resolve(data);
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }

  static removeOffer(offer_id) {
    return new Promise(async (resolve, reject) => {
      HttpService.remove(
        `${this.baseURL()}/${offer_id}`,
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
