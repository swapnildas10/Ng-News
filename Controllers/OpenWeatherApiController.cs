using System;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

public class OpenWeatherApiController: Controller {

private const string API_KEY = "d0b34b7dd2a90f341bfa6b23c67e367d";

[HttpGet]
[Route("/api/weeklyweather/{zipcode?}")]
public async Task<IActionResult> getFiveDayWeatherByZipCode(string zipcode = "90815") {
WeatherWrapper weatherWrapper = null;
using(var httpClient = new HttpClient()) {
try{
string url = "https://api.openweathermap.org/data/2.5/forecast?zip=" + zipcode + "&APPID=" + API_KEY;

var response = await httpClient.GetAsync(new Uri(url)).ConfigureAwait(false);

response.EnsureSuccessStatusCode();

var stringResult = await response.Content.ReadAsStringAsync();
var rawData =  JsonConvert.DeserializeObject<WeatherWrapper>(stringResult);
weatherWrapper = new WeatherWrapper{
    
    city = rawData.city,
    list = rawData.list.Where(element=> (rawData.list.IndexOf(element) % 8 == 0)? true : false).
    Select(element => {element.weather[0].icon = "http://openweathermap.org/img/w/"+ element.weather[0].icon+".png"; return element;}).ToList(),
    };
return Ok(weatherWrapper);
}
catch(HttpRequestException httpRequestException) {
 return BadRequest($"Error getting data: {httpRequestException.Message}");
}

}

}

[HttpGet]
[Route("/api/currentweather/{zipcode?}")]
public async Task<IActionResult> getCurrentWeatherByZipCode(string zipcode = "90815") {
CurrentWeather currentweather = null;
using(var httpClient = new HttpClient()) {
try{
string url = "https://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + "&APPID=" + API_KEY;

var response = await httpClient.GetAsync(new Uri(url)).ConfigureAwait(false);

response.EnsureSuccessStatusCode();

var stringResult = await response.Content.ReadAsStringAsync();
var rawData =  JsonConvert.DeserializeObject<CurrentWeather>(stringResult);
currentweather = new CurrentWeather{
    weather = rawData.weather.Select(element => {element.icon = "http://openweathermap.org/img/w/"+ element.icon+".png"; return element;}).ToList(),
    main = rawData.main 
    
    };
return Ok(currentweather);
}
catch(HttpRequestException httpRequestException) {
 return BadRequest($"Error getting data: {httpRequestException.Message}");
}

}

}
}