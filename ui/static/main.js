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
    .then((res)=> {
        return res.json()
    });
}

function post(url, data) {

    payload = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": "Bearer " + jwt
        },
        body: data,
    }
    return fetch(URL + url, payload);

}
function jsonify(FormData){
    var data_json = {};
    for (var [key, value] of LoginFormData.entries()) {
        data_json[key] = value;
    }
    return data_json;
}   