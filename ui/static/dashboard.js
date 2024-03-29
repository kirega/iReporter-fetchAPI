window.onload = () => {
    
    document.getElementById('overlay').style.display = "block";
    get('/incidents')
        .then((values) => {
            console.table(values);
            var table = document.getElementById('incident_record');
            fields = ['id', 'incidenttype', 'comment', 'location', 'status'];
            var rows = table_gen(fields, values);
            for (var r of rows) {
                for (var data of values) {
                    if (data.images.length > 0 || data.videos.length > 0) {
                        r.insertCell(-1).innerHTML = "Yes";
                        break
                    } else {
                        r.insertCell(-1).innerHTML = "No";
                        break
                    }
                }
                table.parentNode.insertBefore(r, table.nextSibling);
            }
            var drafts = values.filter((i) => {
                return i.status == 'draft'
            }).length;
            var under_inv = values.filter((i) => {
                return i.status == 'under-investigation'
            }).length;
            var resolved = values.filter((i) => {
                return i.status == 'resolved'
            }).length;
            var rejected = values.filter((i) => {
                return i.status == 'rejected'
            }).length;
            document.getElementById('draft').innerText = drafts;
            document.getElementById('under-investigation').innerText = under_inv;
            document.getElementById('resolved').innerText = resolved;
            document.getElementById('rejected').innerText = rejected;
            setTimeout(() => {
                document.getElementById('overlay').style.display = "none";
            }, 1000)
        })
        .catch((err) => {
            console.log(err);
        })
}
