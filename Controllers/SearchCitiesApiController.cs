
using System;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

public class SearchCitiesApiController : Controller {

private const string API_KEY = "AIzaSyBDVYHJOjhHevK55OFBdG00990y-VSKuog";

[HttpGet]
[Route("/api/cities/{q?}")]
public async Task<IActionResult> getCities(string q = null) {
SearchCities searchCities = null;
using(var httpClient = new HttpClient()) {
try{
string url = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" + q + "&key=" + API_KEY + "&types=geocode";

var response = await httpClient.GetAsync(new Uri(url)).ConfigureAwait(false);
response.EnsureSuccessStatusCode();

var stringResult = await response.Content.ReadAsStringAsync();
var rawData =  JsonConvert.DeserializeObject<SearchCities>(stringResult);
searchCities = new SearchCities{
    status = rawData.status,
    predictions = rawData.predictions
     };
return Ok(searchCities);
}
catch(HttpRequestException httpRequestException) {
 return BadRequest($"Error getting data: {httpRequestException.Message}");
}

}

}
}