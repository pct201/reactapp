using DataModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Services;
using System;
using System.Net;
using System.Net.Http;

namespace WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [Authorize]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<HomeController> _logger;
        private readonly EmailService _emailService;
        public HomeController(IConfiguration configuration, ILogger<HomeController> logger)
        {
            _configuration = configuration;
            _emailService = new EmailService(configuration);
            _logger = logger;
        }

        [HttpGet]
        public ActionResult<DashboardModel> DashboardDetail()
        {
            try
            {               
                using (var dashboardService = new DashboardService())
                {
                    _logger.LogError("HI");
                    return dashboardService.GetDashboardUserCount();

                }
            }
            catch (Exception ex) {
                _logger.LogError(ex,ex.Message,null);
                return BadRequest(ex.Message);
            }
        }
    }
}
