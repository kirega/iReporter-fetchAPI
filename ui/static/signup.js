function signup() {
    event.preventDefault();
    var signupForm = document.getElementById("signup");
    var signupFormData = new FormData(signupForm);
    var signup = {};
    var error = false;
    for (var [key, value] of signupFormData.entries()) {
        signup[key] = value;
    }
    Object.keys(signup)
    .map((k)=>{
        var e = document.getElementById(k);
        e.className = ""
        if(signup[k].trim() == "" ){
            e.className = "err";
            error = true;
        }
    })
    if(signup.password != signup.confirm_password){
        document.getElementById('errors').innerHTML = ' Passwords do not match';
        error = true;
    }
    if(error){
        return;
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
