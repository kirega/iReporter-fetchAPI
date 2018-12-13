function getIncidents(){
  get('/incidents')
  .then( (data) => {
      console.log(data);
  })
}