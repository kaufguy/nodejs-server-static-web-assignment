export default class HttpClient{
    constructor() {
        this.baseUrl = window.location.origin;
    }

    post(url = ``, data = {}) {
        return fetch(this.baseUrl + url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json());
    }
}