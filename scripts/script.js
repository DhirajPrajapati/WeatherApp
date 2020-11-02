const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {
    const city = data.citydetials;
    const weather = data.weather;
    details.innerHTML = `
    <h5 class="my-3">${city.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>`;

    let Image = null;
    if(weather.IsDayTime){
        Image = 'img/day.svg';
    }
    else{
        Image = 'img/night.svg';
    }

    time.setAttribute('src', Image);

    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
}

// ! Update city

const updateCity = async (city) => {
    const citydetials = await getCity(city);
    const weather = await getWeather(citydetials.Key);    
    return{
        citydetials,
        weather
    };
};

// ! Get City

cityForm.addEventListener('submit', e =>{
    e.preventDefault();
    const city = cityForm.city.value.trim();
    cityForm.reset();
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
});
