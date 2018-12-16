const URL = "http://localhost:5000/api/v2";

function get(url) {

    payload = {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Bearer " + localStorage.getItem('jwt')
        },
    }
    return fetch(URL + url, payload)
        .then((res) => {
            return res.json()
        });
}

function post(url, data) {

    payload = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Bearer " + localStorage.getItem('jwt')
        },
        body: data,
    }
    return fetch(URL + url, payload)
        .then((res) => {
            return res.json()
        });;

}

function jsonify(FormData) {
    var data_json = {};
    for (var [key, value] of FormData.entries()) {
        data_json[key] = value;
    }
    // return JSON.stringify(data_json);
    return data_json;
}

function errors(errors) {
    return Object.keys(errors)
        .map((k) => {
            return [k, errors[k][0]]
        });
}

function logout() {
    event.preventDefault();
    data = JSON.stringify({});
    post('/logout', data)
        .then((data) => {
            console.log("Logout Success");
            localStorage.clear();
            window.location.replace('login.html');
        })
}
