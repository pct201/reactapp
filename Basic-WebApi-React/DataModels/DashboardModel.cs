using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace DataModels
{

    public class DashboardModel
    {
        #region Properties

        public int Total_Users { get; set; }
        public int Active_Users { get; set; }
        public int InActive_Users { get; set; }

        #endregion
    }
}
