const closeBtn = document.getElementById('closeModalBtn');
const modal = document.getElementById('modal');

 

if(closeBtn){
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('open');
    });
}

 async function handleSubmit (event){
    event.preventDefault()
    //get user inputs//
    const destination = document.getElementById('destination')
    const leavingDate = document.getElementById('leavingDate')
    const arrivalDate = document.getElementById('arrivalDate')
    
    //validate input data//
    
    if(!checkNotValidDestination(destination.value) &&
     !checkNotValidDate(arrivalDate.value) &&  !checkNotValidDate(leavingDate.value)){
      const arrivalCountDown=countdown(new Date(),arrivalDate.value)
    if(arrivalCountDown>16){
        alert('Please select arrival Date within 16 days')
        return
    }   
    const response=await   fetch('http://localhost:8081/', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({destination:destination.value,days:arrivalCountDown})
     })
        const tripData=await response.json()
        //let daysToTrip=countdown(new Date(),arrivalDate.value) 
        const daysToTrip=arrivalCountDown<=1 ? `${arrivalCountDown} Day` :`${arrivalCountDown} Days`
        document.getElementById('location').src= tripData.image //locationRes.hits[0].largeImageURL //tripData.previewImage
        document.getElementById('icon').src=tripData.weather.icon  //`https://www.weatherbit.io/static/img/icons/${weatherRes.data[weatherRes.data.length-1].weather.icon}.png`
        document.getElementById('weather').innerHTML=tripData.weather.decription
        document.getElementById('temp').innerHTML=`${tripData.weather.temp}&degC`
        document.getElementById('modalHeader').innerHTML =`Your Trip details to ${destination.value}`          
        document.getElementById('trip').innerHTML=`<strong>Your Trip to:</strong> ${destination.value}`
        document.getElementById('countDown').innerHTML=`<strong>Your trip will be in:</strong>${daysToTrip}`
        document.getElementById('departure').innerHTML=`<strong>Departure Date:</strong> ${leavingDate.value}`
        modal.classList.add('open');

        
    }else{

        alert("invalid input")
    }


}
 
const checkNotValidDestination = (destination)=>{
    return !destination
}
const checkNotValidDate = (inputDate)=>{
     
    return !inputDate || isNaN(Date.parse(inputDate))
}

const countdown = (startDate, endDate) => {

    const start = Date.parse(startDate);
    const end = Date.parse(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
}

export{handleSubmit}

