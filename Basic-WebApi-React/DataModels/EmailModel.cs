using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataModels
{
    public class EmailModel
    {
      
        public EmailModel()
        {
            language_code = "en-us";
            updated_by = 1;
        }

        #region Properties
        /// <summary>
        /// Gets or sets the to_address value.
        /// </summary>  
        [Required(ErrorMessage = "*")]
        public string to_address { get; set; }

        /// <summary>
        /// Gets or sets the from_address value.
        /// </summary>  
        public string from_address { get; set; }

        /// <summary>
        /// Gets or sets the cc_list value.
        /// </summary>  
        public string cc_list { get; set; }

        /// <summary>
        /// Gets or sets the bcc_list value.
        /// </summary>  
        public string bcc_list { get; set; }

        /// <summary>
        /// Gets or sets the subject_text value.
        /// </summary>  
        [Required(ErrorMessage = "*")]
        public string subject_text { get; set; }

        /// <summary>
        /// Gets or sets the body_text value.
        /// </summary>          
        public string body_text { get; set; }

        /// <summary>
        /// Gets or sets the friendly_email_name value.
        /// </summary>        
        [NotMapped]
        public string friendly_email_name { get; set; }

        /// <summary>
        /// Gets or sets the language_code value.
        /// </summary>  
        [NotMapped]
        public string language_code { get; set; }

        /// <summary>
        /// Gets or sets the email_uid value.
        /// </summary>  
        public string email_uid { get; set; }

        /// <summary>
        /// Gets or sets the email_name value.
        /// </summary>  
        public string email_name { get; set; }

        /// <summary>
        /// Gets or sets the updated_by value.
        /// </summary>  
        public int? updated_by { get; set; }
              
        public DateTime created_date { get; set; }

        [NotMapped]
        public bool has_failed { get; set; }

        [NotMapped]
        public string response_message { get; set; }

        [NotMapped]
        public bool is_resend { get; set; }

        [NotMapped]
        public int email_id { get; set; }

        public int total_records { get; set; }

        #endregion


    }
}
