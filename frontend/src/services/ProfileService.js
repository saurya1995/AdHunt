import HttpService from "./HttpService";

export default class ProfileService {
    static baseURL() {
        return "http://localhost:4000/users";
    }

    static getUserProfile(username) {
        return new Promise((resolve, reject) => {
            HttpService.get(
                `${ProfileService.baseURL()}/user/${username}`,
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

    static getCreatorProfiles() {
        return new Promise((resolve, reject) => {
            HttpService.get(
                `${ProfileService.baseURL()}/creator/`,
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static getBusinessProfiles() {
        return new Promise((resolve, reject) => {
            HttpService.get(
                `${ProfileService.baseURL()}/business/`,
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static updateCreatorProfile(profile) {
        return new Promise((resolve, reject) => {
            HttpService.put(
                `${ProfileService.baseURL()}/${profile._id}`,
                profile,
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static updateBusinessProfile(profile) {
        return new Promise((resolve, reject) => {
            HttpService.put(
                `${ProfileService.baseURL()}/${profile._id}`,
                profile,
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static addAnalytics(analytics) {
        return new Promise((resolve, reject) => {
            HttpService.post(
                `${ProfileService.baseURL()}/analytics/`,
                analytics,
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static getAnalytics(profile) {
        return new Promise((resolve, reject) => {
            HttpService.get(
                `${ProfileService.baseURL()}/analytics/${profile._id}`,
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

    static updateAnalytics(analytics) {
        return new Promise((resolve, reject) => {
            HttpService.put(
                `${ProfileService.baseURL()}/analytics/${analytics._id}`,
                analytics,
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
