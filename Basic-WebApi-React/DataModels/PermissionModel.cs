using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataModels
{
    public sealed class PermissionModel
    {
        /// <summary>
        /// Gets or sets permission id
        /// </summary>
        public string permission_uid { get; set; }

        /// <summary>
        /// Gets or sets permission code
        /// </summary>
        public string permission_code { get; set; }

        /// <summary>
        /// Gets or sets permission code
        /// </summary>
        public string permission_name { get; set; }

        /// <summary>
        /// Gets or sets permission description
        /// </summary>
        public string permission_description { get; set; }

        /// <summary>
        /// Gets or sets page name
        /// </summary>
        public string page_name { get; set; }

        /// <summary>
        /// Gets or sets permission assigned
        /// </summary>
        public string permission_assigned { get; set; }

        [NotMapped]
        public bool Is_assigned { get; set; }

        /// <summary>
        /// Gets or sets the Created_by value.
        /// </summary>     
        public int Created_by { get; set; }

        /// <summary>
        /// Gets or sets the Updated_by value.
        /// </summary>
        public int? Updated_by { get; set; }

        /// <summary>
        /// Gets or sets the Created_date value.
        /// </summary>
        public DateTime Created_date { get; set; }

        /// <summary>
        /// Gets or sets the Updated_date value.
        /// </summary>
        public DateTime? Updated_date { get; set; }

        /// <summary>
        /// Gets or sets role id
        /// </summary>
        [NotMapped]
        public Int32 Role_id { get; set; }

        [NotMapped]
        public int total_records { get; set; }

    }
}