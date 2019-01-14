function edit_incident(m) {
    localStorage.setItem('incidentId', m);
    window.location.replace('edit_incident.html');
}
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
                } else {
                    tr.insertCell(-1).innerHTML = "No";
                }
                tr.insertCell(-1).innerHTML = "<a href=# onclick='edit_incident(" + data.id + ");'> <i class='fas fa-edit'></i></a>";
                table.parentNode.insertBefore(tr, table.nextSibling);
            }
        })
        .catch((err) => {
            console.log(err);
        });
}
