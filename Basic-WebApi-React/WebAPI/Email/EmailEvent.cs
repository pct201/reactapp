using DataModels;
using Services;
using System;

/// <summary>
/// abstract class for EmailEvent
/// </summary>
namespace WebAPI.Email
{
    public abstract class EmailEvent
    {

        private EmailService _emailService;
        public EmailService EmailService
        {
            get
            {
                return _emailService;
            }
            set
            {
                _emailService = value;
            }
        }
        /// <summary>
        /// Get or set EmailUid
        /// </summary>
        public string EmailUid { get; set; }

        /// <summary>
        /// Get or set subject
        /// </summary>
        public string Subject { get; set; }

        /// <summary>
        /// Get or set body
        /// </summary>
        public string Body { get; set; }

        /// <summary>
        /// Get or set To
        /// </summary>
        public string To { get; set; }

        /// <summary>
        /// Get or set From
        /// </summary>
        public string From { get; set; }

        /// <summary>
        /// Get or set CC
        /// </summary>
        public string CC { get; set; }

        /// <summary>
        /// Get or set BCC
        /// </summary>
        public string BCC { get; set; }

        /// <summary>
        /// declare abstract send function
        /// </summary>
        public abstract bool Send();

        /// <summary>
        /// Get or Set UserId 
        /// </summary>
        public int UserId { get; set; }
      
        /// <summary>
        /// Get or Set CreatedBy 
        /// </summary>
        private int _createdby;
        public int CreatedBy
        {
            get
            {
                //the created by is 0 then return default value 1;
                if (_createdby == 0) return 1;

                return _createdby;
            }
            set
            {
                _createdby = value;
            }
        }       
                    

        /// <summary>
        /// intialize the email attributes values
        /// </summary>
        /// <param name="emailObj"></param>
        public void Intialize(EmailModel emailObj)
        {
            this.EmailUid = emailObj.email_uid;

            this.To = emailObj.to_address;

            this.CC = emailObj.cc_list;

            this.BCC = emailObj.bcc_list;

            this.From = emailObj.from_address;

            this.Subject = emailObj.subject_text;

            this.Body = emailObj.body_text;

        }

        /// <summary>
        /// Save send email in database.
        /// </summary>
        /// <param name="productId"></param>
        public int SaveEmailInDatabase()
        {
                return this.EmailService.SaveEmailDetails(this.To, this.From, this.CC, this.BCC, this.Subject, this.Body, this.CreatedBy,this.EmailUid);
        }
    }
}