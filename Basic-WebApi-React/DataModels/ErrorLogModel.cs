using System;
using System.Collections.Generic;
using System.Text;

namespace DataModels
{
    public class ErrorLogModel
    {
        /// <summary>
        /// Gets or Set id
        /// </summary>
        public int error_id { get; set; }

        /// <summary>
        /// Gets or Sets log message
        /// </summary>
        public string log_message { get; set; }

        /// <summary>
        /// Gets or Set stack trace
        /// </summary>
        public string stack_trace { get; set; }

        /// <summary>
        /// Gets or Sets additional info
        /// </summary>
        public string additional_info { get; set; }

        /// <summary>
        /// Gets or Sets Logger
        /// </summary>
        public string logger { get; set; }

        /// <summary>
        /// Gets or Sets created date
        /// </summary>
        public DateTime created_date { get; set; }

        /// <summary>
        /// Gets or Sets total records
        /// </summary>
        public int total_records { get; set; }

    }
}
