function edit_incident(m) {
    localStorage.setItem('incidentId', m);
    window.location.replace('edit_incident.html');
}
window.onload = function getIncidents() {
 
    get('/incidents')
        .then((values) => {
            var table = document.getElementById('incident_record');
            fields = ['id', 'incidenttype', 'comment', 'location', 'status'];
            var rows = table_gen(fields, values);
            for (var r of rows) {
                for (var data of values) {
                    if (data.images.length > 0 || data.videos.length > 0) {
                        r.insertCell(-1).innerHTML = "Yes";
                        break
                    } 
                    r.insertCell(-1).innerHTML = "No";  
                    r.insertCell(-1).innerHTML = "<a href=# onclick='edit_incident("+ data.id+ ");'> <i class='fas fa-edit'></i></a>";
                }
                table.parentNode.insertBefore(r, table.nextSibling);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    
}
