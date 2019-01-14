function login() {
    event.preventDefault();
    var LoginForm = document.getElementById("login");
    var LoginFormData = new FormData(LoginForm);
    var login = {};
    var snackbar = document.getElementById('snackbar');
    for (var [key, value] of LoginFormData.entries()) {
        login[key] = value;
    }
    if(login['password'].trim().length < 8){
        snackbar.className="show";
        snackbar.innerText= "Invalid username/password";
        setTimeout(()=>{
            snackbar.className = snackbar.className.replace("show", " ");
        }, 3000)
        document.getElementById('errors').innerHTML = "Invalid username/password";
        return
    }
    login.username = login.username.toLowerCase();
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
                snackbar.className="success";
                snackbar.innerText= "Success!";
                setTimeout(()=> {
                    snackbar.className = snackbar.className.replace("success", " ");  
                },2000)
                setTimeout(()=>{
                    document.getElementById('overlay').style.display="block";
                },2100)
                setTimeout(() => {
                    window.location.replace('dashboard.html');
                },3000);
               
            } else {
                document.getElementById('overlay').style.display="none";
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
