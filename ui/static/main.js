const URL = "http://localhost:5000/api/v2";

function signup() {
    event.preventDefault();
    var signupForm = document.getElementById("signup");
    var signupFormData = new FormData(signupForm);
    var signup = {};
    for (var [key, value] of signupFormData.entries()) {
        signup[key] = value;
    }
    signup = JSON.stringify(signup);

    post = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: signup
    }
    // Make a POST with fetch
    fetch(URL + '/signup', post)
        .then((res) => {
            if (res.status == 201) {

                setInterval(() => {
                    window.location.replace('login.html');
                }, 15);
            }
            return res.json();
        })
        .then((data) => {
            if (data.required) {
                var required = Object.keys(data.required)
                    .map((k) => {
                        return [k, data.required[k][0]]
                    });
                document.getElementById('errors').innerHTML = required[0][0] + ' : ' + required[0][1];
            } else {
                document.getElementById('errors').innerHTML = data.message;
            }
        })
        .catch((err) => {
            console.log(err);
        });
}

function login() {
    event.preventDefault();
    var LoginForm = document.getElementById("login");
    var LoginFormData = new FormData(LoginForm);
    var login = {};
    for (var [key, value] of LoginFormData.entries()) {
        login[key] = value;
    }
    login = JSON.stringify(login);
    console.log(login);
    post = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: login
    }
    fetch(URL + '/login', post)
        .then((res) => {
            if (res.status == 201) {
                setInterval(() => {
                    window.location.replace('dashboard.html');
                }, 3000);
            }
            return res.json();
        })
        .then((data) => {
            if (data.required) {
                var required = Object.keys(data.required)
                    .map((k) => {
                        return k + " : " + data.required[k][0];
                    });
                console.log(required);
                document.getElementById('errors').innerHTML = required[0];
            } else {
                document.getElementById('errors').innerHTML = data.message;
            }
        })
        .catch((err) => {
            console.log(err);
        });
}