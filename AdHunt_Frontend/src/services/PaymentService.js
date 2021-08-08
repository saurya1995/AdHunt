import HttpService from "./HttpService";

export default class PaymentService {
    static baseURL() {
        return "http://localhost:4000/payment";
    }

    static payout(amount, receiver, applicationId) {
          return new Promise(async (resolve, reject) => {
              HttpService.post(
                  `${this.baseURL()}/payout`,
                  {
                      amount: amount,
                      receiver: receiver,
                      applicationId: applicationId,
                      // },
                  },
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
    static setupStripeAccount() {
        return new Promise(async (resolve, reject) => {
            HttpService.post(
                `${this.baseURL()}/account`,
                {},
                function (data) {

                    if (data !== undefined || Object.keys(data).length !== 0) {
                        resolve(data);
                    } else {
                        reject("Error while setting up account");
                    }
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

        static checkout(amount, applicationId, offerPromoted) {
        return new Promise(async (resolve, reject) => {
            HttpService.post(
                `${this.baseURL()}/checkout-session`,
                {
                    successUrl: window.location.href,
                    cancelUrl: window.location.href,
                    amount: amount,
                    applicationId: applicationId,
                    offerPromoted: offerPromoted,
                },
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
}
