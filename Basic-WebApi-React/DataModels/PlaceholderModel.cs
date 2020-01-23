using System.ComponentModel.DataAnnotations.Schema;

namespace DataModels
{
    public class PlaceholderModel 
    {
        #region Properties
        /// <summary>
        /// Gets or sets the placeholder_uid value.
        /// </summary>
        public string placeholder_uid { get; set; }

        /// <summary>
        /// Gets or sets the placeholder_name value.
        /// </summary>
        public string placeholder_name { get; set; }

        /// <summary>
        /// Gets or sets the placeholder_tag value.
        /// </summary>
        public string placeholder_tag { get; set; }

        #endregion

    }
}
