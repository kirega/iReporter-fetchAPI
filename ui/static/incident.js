window.onload = function Incident() {
    var id = localStorage.getItem('incidentId');

    get('/incident/' + id)
        .then((data) => {
            var fields = ["status",'incidenttype', 'comment','location'];
            fields.map((k) => {
                    var i = document.getElementById(k);
                    i.value = data[k];
                })
            data['images'].map((k)=>{
                var d = IMG_URL + k;
                document.querySelector('.image img').setAttribute('src',d);
                document.querySelector('.image a').setAttribute('href',d);
            });
        
            data['videos'].map((k)=>{
                var d = IMG_URL + k;
                document.querySelector('.video').innerHTML ='<video width="420" height="315" controls src="'+d+'">\
                Your browser does not support the video tag</video>';
            });
            var myLatLng = new google.maps.LatLng(Number(data.location.split(',')[0]), Number(data.location.split(',')[0]));
            var map = new google.maps.Map(document.getElementById('map'), {
                    center: {
                        lat: Number(data.location.split(',')[0]),
                        lng: Number(data.location.split(',')[1])
                    },
                    zoom: 15
                }); 
            var marker =  new google.maps.Marker({
                position:{
                    lat: Number(data.location.split(',')[0]),
                    lng: Number(data.location.split(',')[1])
                },
                map: map
            });
            marker.setMap(map);
        }).catch((err)=>{
            console.log(err);
        })
}
