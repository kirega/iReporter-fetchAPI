window.onload = function editIncident() {
    var id = localStorage.getItem('incidentId');
    console.log("welcome", id);

    get('/incident/' + id)
        .then((data) => {
            console.log(data);
            var fields = ["status",'incidenttype', 'comment','location']
            // Object.keys(data)
            fields.map((k) => {
                    console.log(k);
                    var i = document.getElementById(k);
                    i.value = data[k];
                })
            new google.maps.Map(document.getElementById('map'), {
                center: {
                    lat: Number(data.location.split(',')[0]),
                    lng: Number(data.location.split(',')[1])
                },
                zoom: 10
            }); 
            // new google.maps.Marker({
            //     // position:data.location,
            //     map: map
            // })
        })
    

}
function update(){
    event.preventDefault();
    var id = localStorage.getItem('incidentId');
    var data = {};
    data['status'] =  document.getElementById('status').value;
    data = JSON.stringify(data);
    put('/incident/'+ id +"/status", data)
    .then((data) => {
        if (data['status'] == 200){
            window.location.replace('admin_incidences.html');
        }
    })
}
