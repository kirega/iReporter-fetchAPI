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
                        r.insertCell(-1).innerHTML = "<a href=#> <i class='fas fa-trash'></i></a>";
                        break
                    } else {
                        r.insertCell(-1).innerHTML = "No";
                        r.insertCell(-1).innerHTML = "<a href=#> <i class='fas fa-trash'></i></a>";
                        break
                    }
                }
                table.parentNode.insertBefore(r, table.nextSibling);
            }
        })
        .catch((err) => {
            console.log(err);
        })
}
