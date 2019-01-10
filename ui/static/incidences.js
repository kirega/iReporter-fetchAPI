window.onload = function getIncidents() {
    get('/incidents')
        .then((values) => {
            var table = document.getElementById('incident_record');
            fields = ['id', 'incidenttype', 'comment', 'location', 'status'];
            for (var data of values) {
                var tr = document.createElement('tr');
                fields.map((k) => {
                    var td = tr.insertCell(-1);
                    td.innerHTML = data[k];
                    return td
                })
                if (data.images.length > 0 || data.videos.length > 0) {
                        tr.insertCell(-1).innerHTML = "Yes";
                        tr.insertCell(-1).innerHTML = "<a href=#> <i class='fas fa-trash'  data-href=" + data.id + " ></i></a> <a href=# class='view' > <i class='fas fa-eye' data-href=" + data.id + " ></i></a>";    
                    } else {
                        tr.insertCell(-1).innerHTML = "No";
                        tr.insertCell(-1).innerHTML = "<a href=#> <i class='fas fa-trash'  data-href=" + data.id + " ></i></a> <a href=# class='view' > <i class='fas fa-eye'  data-href=" + data.id + " ></i></a>"; 
                    }
                table.parentNode.insertBefore(tr, table.nextSibling);
            }
        })
        .then(() => {
            var view = document.getElementsByClassName('view');
            for (var i of view) {
                i.addEventListener('click', (e) => {
                    event.preventDefault();
                    console.log(e.target.getAttribute('data-href'));
                    var id = e.target.getAttribute('data-href');
                    localStorage.setItem('incidentId',id);
                    window.location.replace('incident.html');
                })
            }
        })
}
