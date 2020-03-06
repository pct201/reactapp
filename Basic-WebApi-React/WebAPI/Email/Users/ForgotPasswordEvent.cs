using Services;
using DataModels;
using static DataModel.Utilities.Constants;

/// <summary>
/// ConfirmPasswordEvent
/// </summary>
namespace WebAPI.Email
{
    public class ForgotPasswordEvent : EmailEvent
    {
        
        public ForgotPasswordEvent(EmailService emailService,string confirmPasswordLink,int tokenTimeToLive, string emailAddress,string languageCode)
        {
            this.EmailService = emailService;
            EmailModel EmailObj = this.EmailService.GetEmailDetailByEmailName(Emails.ForgotPwrd, emailAddress, languageCode, confirmPasswordLink);
            if(EmailObj != null)
            {
                this.Intialize(EmailObj);
            }            
        }

        public override bool Send()
        {
            int email_id = this.SaveEmailInDatabase();
            return EmailService.SendMail(mailFrom:this.From,mailTo: this.To,mailCC:this.CC,mailBCC:this.BCC,
                                         subject:this.Subject,body:this.Body,attachmentPath: null,attachments: null, emailId: email_id);
        }
    }
}