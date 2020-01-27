// Decompiled with JetBrains decompiler
// Type: WebAPI.Controllers.AuthController
// Assembly: WebAPI, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 9065BE5E-29FE-4791-BBEE-3E03B2B7F879
// Assembly location: D:\DemoPublish\WebAPI.dll

using DataModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using Services;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using WebAPI.Email;

namespace WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [Authorize]
    [ApiController]
    public class HomeController : ControllerBase
    {


        private IConfiguration configuration;
        private EmailService emailService;
        public HomeController(IConfiguration configuration)
        {
            this.configuration = configuration;
            this.emailService = new EmailService(configuration);
        }

        [HttpGet]
        public ActionResult<Dashboard> DashboardDetail()
        {
            using (var dashboardService = new DashboardService())
            {
                return dashboardService.GetDashboardUserCount();
            }
        }


    }
}
