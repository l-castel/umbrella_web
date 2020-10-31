window.addEventListener('load', () => {
    let long;
    let lat;

    if(navigator.geolocation){
       navigator.geolocation.getCurrentPosition(position =>{
          long = position.coords.longitude;
          lat = position.coords.latitude;
          let tempDegree = document.getElementById("degrees");
          let precip_perc = document.getElementById("perc");
          let answer = document.getElementById("answer");
          let desc = document.getElementById("temperature-description");
          let degreeSection = document.getElementById("degree-section");
          let degreeSpan = document.getElementById("mode");
          

          const api = `http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${long}&days=1&key=e0869c46affe410a85b7bd30345383e5`;
          
          fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            const {temp} = data.data[0]
            const {precip} = data.data[0];
            const {description} = data.data[0].weather;
            tempDegree.textContent = temp;
            degreeSection.addEventListener('click', () => {
                if(degreeSpan.textContent == 'C'){
                    degreeSpan.textContent  = 'F';
                    let far = (temp * (9/5)) + 32;
                    tempDegree.textContent = far;
                }else {
                    tempDegree.textContent = temp;
                    degreeSpan.textContent = 'C';
                }
            });
            
            desc.textContent = description;
            precip_perc.textContent = `${precip}%`
            if(precip < 50){
                answer.textContent = "Nah, you won't need it";

            }else if(precip > 50 && precip < 75){
                answer.textContent = "Take it just in case";
            }else{
                answer.textContent = "Def take it, looks like you'll need it";
            }

            
        })
       })
    }else{
        h1.textContent = "hey enable geolocation"
    }
    
    
});