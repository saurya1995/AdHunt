import HttpService from "./HttpService";

export default class CategoryService {
    static baseURL() {
        return "http://localhost:4000/categories";
    }

    static getSubCategories() {
        return new Promise((resolve, reject) => {
            HttpService.get(CategoryService.baseURL(),
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
}