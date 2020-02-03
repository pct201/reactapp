using DataModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Services;

namespace WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [Authorize]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly IConfiguration configuration;
        private readonly EmailService emailService;
        public HomeController(IConfiguration configuration)
        {
            this.configuration = configuration;
            this.emailService = new EmailService(configuration);
        }

        [HttpGet]
        public ActionResult<DashboardModel> DashboardDetail()
        {
            using (var dashboardService = new DashboardService())
            {
                return dashboardService.GetDashboardUserCount();
            }
        }
    }
}
