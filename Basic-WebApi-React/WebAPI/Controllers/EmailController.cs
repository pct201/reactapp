using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Services;
using DataModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using System;
using Microsoft.Extensions.Logging;

namespace WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [Authorize]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private string languageCode = "en-us";
        private readonly EmailService emailService;
        private readonly ILogger<EmailController> _logger;
        public EmailController(IConfiguration configuration, ILogger<EmailController> logger)
        {
            this.emailService = new EmailService(configuration);
            _logger = logger;
        }

        #region Email Template 

        [HttpGet]
        public IList<EmailModel> AllEmailTemplate(int page, int perPage, string sortBy, string sortDirection)
        {
            try
            {
                IList<EmailModel> emailTemplateList = emailService.GetEmailTemplateList(page, perPage, sortBy, sortDirection, languageCode);
                return emailTemplateList;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message, null);
                return null;
            }
        }

        [HttpGet]
        public ActionResult<EmailModel> GetEmailTemplateById(string emailUid)
        {
            try
            {
                return emailService.GetEmailTemplateById(emailUid, languageCode);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message, null);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public bool UpdateEmailTemplateDetail(EmailModel model)
        {
            try
            {
                return emailService.UpdateEmailTemplate(model);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message, null);
                return false;
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
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message, null);
                return null;
            }
        }

        #endregion

        #region Email Log
        [HttpGet]
        public IList<EmailModel> AllEmailLog(int page, int perPage, string sortBy, string sortDirection, string date = null, string emailTitle = null)
        {
            try
            {
                IList<EmailModel> emailTemplateList = emailService.GetEmailLogList(page, perPage, sortBy, sortDirection, date, emailTitle);
                return emailTemplateList;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message, null);
                return null;
            }
        }

        [HttpPost]
        public ActionResult ResendMail(int emailId)
        {
            try
            {
                bool isSuccess = true;
                string message = string.Empty;
                int newEmailId = emailService.ResendEmail(emailId, 1);
                if (newEmailId <= 0)
                    return Ok(new { success = false, message = "Error! email log is not inserted." });

                EmailModel emailModel = emailService.GetEmailLogById(emailId);
                bool result = emailService.SendMail(mailFrom: emailModel.from_address, mailTo: emailModel.to_address, mailCC: emailModel.cc_list, mailBCC: emailModel.bcc_list,
                                        subject: emailModel.subject_text, body: emailModel.body_text, attachmentPath: null, attachments: null, emailId: newEmailId);
                if (!result)
                {
                    isSuccess = false;
                    EmailModel errorEmailModel = emailService.GetEmailLogById(newEmailId);
                    if (errorEmailModel != null && !string.IsNullOrEmpty(errorEmailModel.response_message))
                        message = errorEmailModel.response_message;
                    else
                        message = "Error in email sending.";
                }
                else
                    message = "Email resend successfully.";

                return Ok(new { success = isSuccess, message = message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message, null);
                return Ok(new { success = false, message = "Somthing went wrong please try again later." });
            }

        }
        #endregion



    }
}