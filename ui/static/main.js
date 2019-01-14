// const URL = "http://localhost:5000/api/v2";
// const IMG_URL = "http://localhost:5000";
const URL = "https://kirega-ireporter.herokuapp.com/api/v2";
const IMG_URL = "https://kirega-ireporter.herokuapp.com";
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

function put(url, data) {

    payload = {
        method: "PUT",
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
function table_gen(fields, values) {
    var rows = [];

    for (var data of values) {
        var tr = document.createElement('tr');
        fields.map((k) => {
            var td = tr.insertCell(-1);
            td.innerHTML = data[k];
            return td
        })
        rows.push(tr);
    }
    return rows;
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
