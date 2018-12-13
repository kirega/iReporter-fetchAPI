function login() {
    event.preventDefault();
    var LoginForm = document.getElementById("login");
    var LoginFormData = new FormData(LoginForm);
    var login = {};
    for (var [key, value] of LoginFormData.entries()) {
        login[key] = value;
    }
    login = JSON.stringify(login);
   
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
            if (res.status == 200) {
                setInterval(() => {
                    window.location.replace('dashboard.html');
                }, 1000);
            }
            return res.json();
        })
        .then((data) => {
            localStorage.setItem('jwt', data.access_token );
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
