using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

public class LogoApiController: Controller {

private const string API_KEY = "sk_acf260caf5f1c9f12e95c38cc721228a";
[HttpGet]
[Route("/api/companylogo/{name?}/{size?}/{greyscale?}")]
public  async Task<IActionResult> getCompanyLogo(string name, int size = 40, bool greyscale = false) {
using(var httpClient = new HttpClient()) {
    if(name.Contains(".")) {
        LogoByDomain logoByDomain = null;
        try {
        String url = "https://logo.clearbit.com/" + name + "?size=" + size + "&greyscale=" + greyscale;
       
        var response = await httpClient.GetAsync(new Uri(url)).ConfigureAwait(false);
        response.EnsureSuccessStatusCode();
        var stringResult = await response.Content.ReadAsStringAsync();
         // var rawData = JsonConvert.DeserializeObject<LogoByDomain>(stringResult);
        logoByDomain = new LogoByDomain {
            url = url
        };
        return Ok(logoByDomain);
    }
    catch(HttpRequestException httpRequestException) {
         return BadRequest($"Error getting data: {httpRequestException.Message}");
    }
    } else {
        CompanyLogo companyLogo = null;
    try {
        if ( name.Contains("The Washington Post"))
        name = name.Split("The")[1].Trim();
        String url = "https://company.clearbit.com/v1/domains/find?name=" + name;
        httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Basic",
        Convert.ToBase64String(Encoding.ASCII.GetBytes(API_KEY+":")));
        var response = await httpClient.GetAsync(new Uri(url)).ConfigureAwait(false);
        response.EnsureSuccessStatusCode();
        var stringResult = await response.Content.ReadAsStringAsync();
          var rawData = JsonConvert.DeserializeObject<CompanyLogo>(stringResult);
        companyLogo = new CompanyLogo {
            Name = rawData.Name,
            Domain = rawData.Domain,
            Logo = rawData.Logo
        };
        return Ok(companyLogo);
    }
    catch(HttpRequestException httpRequestException) {
         return BadRequest($"Error getting data: {httpRequestException.Message}");
    }
    }
    
}
}
}