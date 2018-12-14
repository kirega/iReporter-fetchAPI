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
       
        for( var mk of markers){
            mk.setMap(null);
        }
        var marker = new google.maps.Marker({
            position: point.latLng,
            map:map
        })

        markers.push(marker);
        var p = point.latLng.lat() + "," + point.latLng.lng()
        document.getElementById('latLng').value = p;
        map.panTo(point.latLng);
    })
}

function addIncident() {
    event.preventDefault();
    var incidentData = document.getElementById('incidentForm');
    var incidentFormData = new FormData(incidentData);
    // var a = Array();
    // a.push('hellow');
    // a.push('hellow');
    // incidentFormData.append('images',a);
    // incidentFormData.append('videos',a);
    data = jsonify(incidentFormData);
    data['images'] = [];
    data['videos'] = [];

    data  =  JSON.stringify(data);

    console.log(data);
    console.log(data['incidentType']);
    post('/incidents', data)
        .then((data) => {
            console.log(data.message);
            if (data.required) {
                console.log(errors(data.required));
            }
            if (data.status == 201) {
                setInterval(() => {
                    window.location.replace('incidences.html');
                }, 3000);
            }
        })
}
