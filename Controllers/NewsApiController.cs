using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace NewsApi
{   
     
    public class NewsApiController: Controller {
        

        private const string API_KEY = "367fcf68f19b4595b91d2d242085686d";
    [Route("api/TopUSNews")]
        [HttpGet]
        public async  Task<IActionResult>  getTopUSNews() {
            using(var httpClient = new HttpClient()) {
                try
                {
                    TopHeadlines topHeadlines = null;
                          
                        //GET Method  
                        httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Authorization", API_KEY);
                         var response = await httpClient.GetAsync("https://newsapi.org/v2/top-headlines?country=us").ConfigureAwait(false);
                        response.EnsureSuccessStatusCode();
                        var stringResult = await response.Content.ReadAsStringAsync();
                        Console.WriteLine(stringResult);
                        var rawData = JsonConvert.DeserializeObject<TopHeadlines>(stringResult);
                        topHeadlines = new TopHeadlines{
                           
                           Status = rawData.Status,
                           TotalResults = rawData.TotalResults,
                            Articles  = rawData.Articles
                        };

                        return Ok(topHeadlines);
            
                }
                catch (HttpRequestException httpRequestException)
                {
                    
                     return BadRequest($"Error getting data: {httpRequestException.Message}");
                }
           
            }
         
            
        }
[Route("api/Source/{category}/{language}/{country}")]
[HttpGet]
         public async Task<IActionResult> getSources(string category = null, string language = null, string country = null){
        using(var httpClient = new HttpClient()){
                try{
                    string url = "https://newsapi.org/v2/sources?";
                    if(category!=null)
                    url = url+"category="+category+"&";
                    if(language!=null)
                      url = url+"language="+language+"&";
                      if(country!=null)
                        url = url+"country="+country+"&";
                    Source source = null;
                        url = url+"apiKey="+API_KEY;
                         var response = await httpClient.GetAsync(new Uri(url)).ConfigureAwait(false);
                        response.EnsureSuccessStatusCode();
                        var stringResult = await response.Content.ReadAsStringAsync();
                        Console.WriteLine(stringResult);
                        var rawData = JsonConvert.DeserializeObject<Source>(stringResult);
                        source = new Source{
                           
                           Status = rawData.Status,
                           Articles = rawData.Articles,
                           ID = rawData.ID,
                            Name = rawData.Name,
                            Description = rawData.Description,
                            URL = rawData.URL,
                            Category = rawData.Category,
                            Language = rawData.Language,
                            Country = rawData.Country
                        };

                        return Ok(source);
                }
                catch(HttpRequestException httpRequestException){
return BadRequest($"Error getting data: {httpRequestException.Message}");
                }
        }
    }

   
        
    
    }}