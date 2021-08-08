import HttpService from "./HttpService";

export default class UserService {
    static baseURL() {
        return "http://localhost:4000/auth";
    }

    static register(user, pass, email, kind) {
        return new Promise((resolve, reject) => {
            HttpService.post(
                `${UserService.baseURL()}/register`,
                {
                    username: user,
                    password: pass,
                    kind: kind,
                    email: email,
                },
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            ).then(r => {if(typeof r !== 'undefined'){console.log(r)}});
        });
    }

    static login(email, pass) {
        return new Promise((resolve, reject) => {
            HttpService.post(
                `${UserService.baseURL()}/login`,
                {
                    email: email,
                    password: pass,
                },
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static getLoggedInUser() {
        return new Promise((resolve, reject) => {
            HttpService.get(
                `${UserService.baseURL()}/me`,
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static logout() {
        window.localStorage.removeItem("jwtToken");
    }
    
}