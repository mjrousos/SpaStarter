using System.Linq;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HelloWorldController : ControllerBase
    {
        private readonly ILogger<HelloWorldController> _logger;

        public HelloWorldController(ILogger<HelloWorldController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public string Get() => "Hello, world!";

        [Authorize]
        [HttpGet("secure")]
        public string GetAuthorized() => $"Hello, authorized user!\n{JsonSerializer.Serialize(HttpContext.User.Claims.ToDictionary(c => c.Type, c => c.Value))}";
    }
}
