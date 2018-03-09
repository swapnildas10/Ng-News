using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace NewsApi
{   
    [Route("api/[controller]")]
    public class NewsApiController: Controller {
        

        private const string API_KEY = "367fcf68f19b4595b91d2d242085686d";

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
    }
}