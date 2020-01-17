using Services;
using DataModels;
using static DataModel.Utilities.Constants;

/// <summary>
/// UserCreationEvent
/// </summary>
namespace WebAPI.Email
{
    public class UserCreationEvent : EmailEvent
    {
      
        public UserCreationEvent(EmailService emailService,string emailAddress,string languageCode)
        {
            this.EmailService = emailService;

            EmailModel EmailObj = emailService.GetEmailDetailByEmailName(Emails.UserCreation, emailAddress, languageCode,null);

            if (EmailObj != null)
            {
                this.Intialize(EmailObj);
            }
            
        }


        public override bool Send()
        {
            int email_id = this.SaveEmailInDatabase();
            return EmailService.SendMail(mailFrom: this.From, mailTo: this.To, mailCC: this.CC, mailBCC: this.BCC,
                                        subject: this.Subject, body: this.Body, attachmentPath: null, attachments: null, emailId: email_id);
        }
    }
}