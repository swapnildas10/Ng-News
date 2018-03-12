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
        [Route("api/TopUSNews/{category?}/{country?}/{sources?}/{q?}/{pageSize?}/{page?}")]
        [HttpGet]
        public async  Task<IActionResult>  getTopUSNews(String category = null,String country =null, String sources = null,String q = null, int? pageSize = null, int? page = null  ) {
            using(var httpClient = new HttpClient()) {
                try
                {
                  String url  ="https://newsapi.org/v2/top-headlines?";
                    TopHeadlines topHeadlines = null;
                           if(category!=null)
                    url = url+"category="+category+"&";
                    if(country!=null)
                      url = url+"country="+country+"&";
                      if(sources!=null)
                        url = url+"sources="+sources+"&";
                      if(q!=null)
                        url = url+"q="+q+"&";
                      if(pageSize!=null)
                        url = url+"pageSize="+pageSize+"&";
                      if(page!=null)
                        url = url+"page="+page+"&";
                          url = url+"apiKey="+API_KEY;
                        //GET Method  
                      //  httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Authorization", API_KEY);
                         var response = await httpClient.GetAsync(new Uri(url)).ConfigureAwait(false);
                        response.EnsureSuccessStatusCode();
                        var stringResult = await response.Content.ReadAsStringAsync();
                        
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
        [Route("api/TopNewsByCategory/{category?}/{country?}/{sources?}/{q?}/{pageSize?}/{page?}")]
        [HttpGet]
        public async  Task<IActionResult>  getTopNewsByCategory(String category = null,String country =null, String sources = null,String q = null, int? pageSize = null, int? page = null  ) {
            using(var httpClient = new HttpClient()) {
                try
                {
                  String url  ="https://newsapi.org/v2/top-headlines?";
                    TopHeadlines topHeadlines = null;
                           if(category!=null)
                    url = url+"category="+category+"&";
                    if(country!=null)
                      url = url+"country="+country+"&";
                      if(sources!=null)
                        url = url+"sources="+sources+"&";
                      if(q!=null)
                        url = url+"q="+q+"&";
                      if(pageSize!=null)
                        url = url+"pageSize="+pageSize+"&";
                      if(page!=null)
                        url = url+"page="+page+"&";
                          url = url+"apiKey="+API_KEY;
                        //GET Method  
                      //  httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Authorization", API_KEY);
                         var response = await httpClient.GetAsync(new Uri(url)).ConfigureAwait(false);
                        response.EnsureSuccessStatusCode();
                        var stringResult = await response.Content.ReadAsStringAsync();
                        
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

[HttpGet("api/Source/{category?}/{language?}/{country?}")]
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
                    SourceWrapper sources = null;
                        url = url+"apiKey="+API_KEY;
                         var response = await httpClient.GetAsync(new Uri(url)).ConfigureAwait(false);
                        response.EnsureSuccessStatusCode();
                        var stringResult = await response.Content.ReadAsStringAsync();
                        Console.WriteLine(stringResult);
                        var rawData = JsonConvert.DeserializeObject<SourceWrapper>(stringResult);
                        sources = new SourceWrapper{
                           
                           Status = rawData.Status,
                           Sources = rawData.Sources
                        };

                        return Ok(sources);
                }
                catch(HttpRequestException httpRequestException){
return BadRequest($"Error getting data: {httpRequestException.Message}");
                }
        }
    }

   
[HttpGet("api/Query/{q = queryString}/{sources = sources}/{domains = domains}/{from = from}/{to = to}/{language = language}/{pageSize = pageSize}/{page = page}")]
         public async Task<IActionResult> getQueryResult(string q = null, string sources = null, string domains = null, 
         string from = null, string to = null, string language = null, string sortBy = null, int? pageSize = null, int? page = null ){
        using(var httpClient = new HttpClient()){
                try{
                    string url = "https://newsapi.org/v2/everything?";
                    if(q!=null)
                    url = url+"q="+q+"&";
                    if(sources!=null)
                      url = url+"sources="+sources+"&";
                      if(domains!=null)
                        url = url+"domains="+domains+"&";
                   
                      if(from!=null)
                        url = url+"from="+from+"&";
                   
                      if(to!=null)
                        url = url+"to="+to+"&";
                   
                      if(language!=null)
                        url = url+"language="+language+"&";
                   
                      if(sortBy!=null)
                        url = url+"sortBy="+sortBy+"&";
                   
                      if(pageSize!=null)
                        url = url+"pageSize="+pageSize+"&";
                   
                      if(page!=null)
                        url = url+"page="+page+"&";
                   
                        url = url+"apiKey="+API_KEY;
                         var response = await httpClient.GetAsync(new Uri(url)).ConfigureAwait(false);
                        response.EnsureSuccessStatusCode();
                        var stringResult = await response.Content.ReadAsStringAsync();
                        SearchQueryModal searchQueryModal= null;
                        var rawData = JsonConvert.DeserializeObject<SearchQueryModal>(stringResult);
                        searchQueryModal = new SearchQueryModal{
                           
                           Status = rawData.Status,
                         TotalResults = rawData.TotalResults,
                         Articles = rawData.Articles
                        };

                        return Ok(searchQueryModal);
                }
                catch(HttpRequestException httpRequestException){
return BadRequest($"Error getting data: {httpRequestException.Message}");
                }
        }
    }

   
        
    
    }}