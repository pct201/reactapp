using Services;
using DataModels;

/// <summary>
/// ForgotPasswordEvent
/// </summary>
namespace ICSB.Email
{
    public class ForgotPasswordEvent  : EmailEvent
    {

        
        public ForgotPasswordEvent(EmailService emailService,string resetPasswordLink, TimeSpan tokenTimeToLive, string emailAddress,string languageCode) 
        {

            this.EmailService = emailService;

            EmailModel EmailObj = emailService.GetForgotPasswordEMailDetails(resetPasswordLink, tokenTimeToLive, emailAddress, languageCode);

            if (EmailObj != null)
            {
                this.Intialize(EmailObj);
            }

            this.CanCreateNote = false;


        }


        public override bool Send()
        {
            int email_id = this.SaveEmailInDatabase(null);
            return EmailService.SendMail(mailFrom:this.From,mailTo: this.To,mailCC:this.CC,mailBCC:this.BCC,
                                         subject:this.Subject,body:this.Body,attachmentPath: null,attachments: null, emailId: email_id, productId: null);
        }

  
    }
}