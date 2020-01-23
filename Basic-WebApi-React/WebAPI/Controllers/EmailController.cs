using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Services;
using DataModels;
using System.Linq;
using Microsoft.AspNetCore.Cors;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Authorization;
using WebAPI.Email;
using Microsoft.Extensions.Configuration;

namespace WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [Authorize]
    [ApiController]
    public class EmailController : ControllerBase
    {
        public string languageCode = "en-us";
        private IConfiguration configuration;
        private EmailService emailService;
        public EmailController(IConfiguration configuration)
        {
            this.emailService = new EmailService(configuration);
        }
      
        [HttpGet]
        public IList<EmailModel> AllEmailTemplate(int page, int perPage, string sortBy, string sortDirection)
        {
            try
            {
                IList<EmailModel> emailTemplateList = emailService.GetEmailTemplateList(page, perPage, sortBy, sortDirection, languageCode);
                return emailTemplateList;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        
        [HttpGet]
        public ActionResult<EmailModel> GetEmailTemplateById(string emailUid)
        {
            try
            {
                return emailService.GetEmailTemplateById(emailUid, languageCode);
            }
            catch (Exception)
            {
                throw;
            }
        }
      
        [HttpPost]
        public bool UpdateEmailTemplateDetail(EmailModel model)
        {
            try
            {
                return emailService.UpdateEmailTemplate(model);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpGet]
        public IList<PlaceholderModel> AllPlaceHolderList()
        {
            try
            {
                IList<PlaceholderModel> placeholderList = emailService.GetPlaceHolderList();
                return placeholderList;
            }
            catch (Exception e)
            {
                throw e;
            }
        }


        

    }
}