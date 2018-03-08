using System;
using Microsoft.AspNetCore.Mvc;

namespace NewsApi {
    [Route("api/[Controller]")]
    public class NewsApiController: Controller {
        
        private const string API_KEY = "367fcf68f19b4595b91d2d242085686d";

        [HttpGet]
        public IActionResult getTopUSNews() {
            private const string url = "https://newsapi.org/v2/top-headlines?country=us&apiKey="+API_KEY;
            return Ok();
        }
    }
}