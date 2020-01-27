using System;
using System.Collections.Generic;
using System.Linq;
using DataModels;
using DataContext;

using System.Data;

using System.Collections.ObjectModel;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Services
{
    /// <summary>
    /// Service Layer - User
    /// </summary>
    public class DashboardService : ServiceContext
    {
        public DashboardService()
        {
            this.PagingInformation = new Pagination() { PageSize = DefaultPageSize, PagerSize = DefaultPagerSize };
        }

        /// <summary>
        /// Get Active,In Active and Total User Count For Dashboard.
        /// </summary>    
        public virtual Dashboard GetDashboardUserCount()
        {
            return this.ExecuteProcedure<Dashboard>("[dbo].[dashboard_count_get]", null).FirstOrDefault();
        }


    }
}
