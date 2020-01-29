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
    public class PermissionService : ServiceContext
    {
        public PermissionService()
        {
            this.PagingInformation = new Pagination() { PageSize = DefaultPageSize, PagerSize = DefaultPagerSize };
        }

        /// <summary>
        /// Fetch users permission list from database
        /// </summary>   
        /// <param name="userId"></param>     
        /// <returns></returns>
        public virtual IList<PermissionModel> GetPermissionListByUserId(int userId)
        {
            Collection<DBParameters> parameters = new Collection<DBParameters>();
            parameters.Add(new DBParameters() { Name = "user_id", Value = userId, DBType = DbType.Int32 });

            return this.ExecuteProcedure<PermissionModel>("[auth].[user_permissions_get]", parameters).ToList();
        }

    }
}
