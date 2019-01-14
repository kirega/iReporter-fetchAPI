window.onload = function Incident() {
    var id = localStorage.getItem('incidentId');

    get('/incident/' + id)
        .then((data) => {
            var fields = ["status",'incidenttype', 'comment','location'];
            console.log(data);
            fields.map((k) => {
                    var i = document.getElementById(k);
                    i.value = data[k];
                })
            data['images'].map((k)=>{
                var d = URL + k
                document.querySelector('.image img').setAttribute('src',d)
            })
            var myLatLng = new google.maps.LatLng(Number(data.location.split(',')[0]), Number(data.location.split(',')[0]));
            console.log(myLatLng);
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
