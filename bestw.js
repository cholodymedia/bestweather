var dane;
var city;
var temp;
var temp_max;
var temp_min;
var cisnienie;
var wiatr;
var wilg;
var weather;
function search()
{
  $.getJSON('https://api.openweathermap.org/data/2.5/weather?q='+city+'&APPID=3d5391c36408b1f1e2dcbc592bdf41a2&units=metric', function(json) {
  dane = json;
  temp = dane.main.temp;
  temp_max = dane.main.temp_max;
  temp_min = dane.main.temp_min;
  cisnienie = dane.main.pressure;
  wiatr = dane.wind.speed;
  wilg = dane.main.humidity;
  weather = dane.weather[0].main;
  fillin();
});
}

function klik()
{
  load();
  city = document.getElementById("search").value.trim();
  search();
  setTimeout(check,2000);
}

document.addEventListener('keyup', function (przycisk) {
  if (przycisk.defaultPrevented) {
      return;
  }

  var key = przycisk.key || przycisk.keyCode;

  if(key == "Enter")
  {
      if(document.getElementById("search").value != "")
      {
          klik();
      }
  }
});

function fillin()
{
  document.getElementById('city').innerHTML = '<i class="fas fa-map-marker-alt" id="geo"></i> '+city;
  switch (weather)
  {
    case "Rain": document.getElementById('image').innerHTML = '<i class="fas fa-umbrella" id="icon"></i>'; break;
    case "Clouds": document.getElementById('image').innerHTML = '<i class="fas fa-cloud" id="icon"></i>'; break;
    case "Mist": document.getElementById('image').innerHTML = '<i class="fas fa-low-vision" id="icon"></i>'; break;
    case "Clear": document.getElementById('image').innerHTML = '<i class="fas fa-sun" id="icon"></i>'; break;
    case "Haze": document.getElementById('image').innerHTML = '<i class="fas fa-low-vision" id="icon"></i>'; break;
    case "Fog": document.getElementById('image').innerHTML = '<i class="fas fa-low-vision" id="icon"></i>'; break;
    case "Sand": document.getElementById('image').innerHTML = '<i class="fas fa-asterisk" id="icon"></i>'; break;
    case "Snow": document.getElementById('image').innerHTML = '<i class="fas fa-snowflake" id="icon"></i>'; break;
    case "Dust": document.getElementById('image').innerHTML = '<i class="fas fa-asterisk" id="icon"></i>'; break;
    case "Thunderstorm": document.getElementById('image').innerHTML = '<i class="fas fa-bolt" id="icon"></i>'; break;
    case "Smoke": document.getElementById('image').innerHTML = '<i class="fas fa-exclamation-triangle" id="icon"></i>'; break;
  }
  document.getElementById('weather').innerHTML = weather;
  document.getElementById('wind').innerHTML = 'Wind  <span class="orange">'+wiatr+' m/s</span>';
  document.getElementById('cisnienie').innerHTML = 'Pressure <span class="orange">'+cisnienie+' hPa</span>';
  document.getElementById('wilg').innerHTML = 'Humidity <span class="orange">'+wilg+' %</span>';
  document.getElementById('temp').innerHTML = 'Temp <span class="orange">'+temp+'℃</span>';
  document.getElementById('max').innerHTML = 'Temp max <span class="orange">'+temp_max+'℃</span>';
  document.getElementById('min').innerHTML = 'Temp min <span class="orange">'+temp_min+'℃</span>';
  document.getElementById('xd').style.opacity = 0;
  document.getElementById("answer-box").style.opacity = 1;
}

function load()
{
  document.getElementById('city').innerHTML = '';
  document.getElementById('image').innerHTML = '';
  document.getElementById('weather').innerHTML = '';
  document.getElementById('wind').innerHTML = '';
  document.getElementById('cisnienie').innerHTML = '';
  document.getElementById('wilg').innerHTML = '';
  document.getElementById('temp').innerHTML = '';
  document.getElementById('max').innerHTML = '';
  document.getElementById('min').innerHTML = '';
  document.getElementById("xd").style.opacity = 1;
  document.getElementById("answer-box").style.opacity = 0;
  document.getElementById("xd").innerHTML = '<div class="loader"></div>';
}

function check()
{
  if(document.getElementById('city').innerHTML == ''){error()};
}

function error()
{
  document.getElementById("xd").innerHTML = '<div id="error">Brak wyników</div>';
}
