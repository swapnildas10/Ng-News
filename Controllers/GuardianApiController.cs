using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

public class GuardianAPIController: Controller {

private const string API_KEY = "2c624f54-7117-422b-82c4-92ed319a1bc2";

string _base_Uri = "https://content.guardianapis.com/";
[HttpGet("api/Search")]
public Task<IActionResult> getSearchResult() {
return null;
}
}