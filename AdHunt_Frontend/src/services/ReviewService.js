import HttpService from "./HttpService";


export default class ReviewService {

    static baseURL() {
        return "http://localhost:4000/review";
    }

    static getReview(id) {
        return new Promise(async (resolve, reject) => {
            await HttpService.get(
                `${ReviewService.baseURL()}/${id}`,
                function (data) {
                    if (data !== undefined || Object.keys(data).length !== 0) {
                        resolve(data);
                    } else {
                        reject("Error while retrieving profile");
                    }
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static createReview(review) {
        return new Promise(async (resolve, reject) => {
            await HttpService.post(
                ReviewService.baseURL(),
                review,
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static getWorkHistory(partnerName) {
        return new Promise((resolve, reject) => {
            HttpService.get(
                `${ReviewService.baseURL()}/listReviews/${partnerName}`,
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
    static getAvgRate(partnerName) {
        return new Promise((resolve, reject) => {
            HttpService.get(
                `${ReviewService.baseURL()}/avgRate/${partnerName}`,
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
}