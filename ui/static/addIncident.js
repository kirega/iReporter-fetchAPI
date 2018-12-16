var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -1.2862553311956089,
            lng: 36.807310670199286
        },
        zoom: 10
    });
    var bounds = {
        north: -1.25529474700,
        south: -1.323941901199042,
        east: 36.87322544317328,
        west: 36.77901821594321
    };
    map.fitBounds(bounds);
    var markers = [];
    map.addListener('click', (point) => {

        for (var mk of markers) {
            mk.setMap(null);
        }
        var marker = new google.maps.Marker({
            position: point.latLng,
            map: map
        })

        markers.push(marker);
        var p = point.latLng.lat() + "," + point.latLng.lng()
        document.querySelector('input[name=location]').value = p;
        map.panTo(point.latLng);
    })
}

function addIncident() {
    event.preventDefault();
    var incidentData = document.getElementById('incidentForm');
    var incidentFormData = new FormData(incidentData);
    data = jsonify(incidentFormData);
    var error =  false;
    Object.keys(data)
    .map((k)=>{
        var e = document.getElementById(k);
        e.innerText = "";
        if(data[k].trim() == "" ){
            error = true;
            e.innerText = "Should be provided";
        }
    })
    data['images'] = [];
    data['videos'] = [];
    data = JSON.stringify(data);        
    if(!error){
        post('/incidents', data)
            .then((data) => {
                if (data.required) {
                    Object.keys(data.required)
                    .map((k) => {
                        var i = document.getElementById(k);
                        i.innerHTML = data.required[k][0];
                    })
                    console.log(errors(data.required));
                }
                if (data.status == 201) {
                    setInterval(() => {
                        window.location.replace('incidences.html');
                    }, 3000);
                }
            })
            .catch((err)=>{
                console.log(err);
            })
    }
}