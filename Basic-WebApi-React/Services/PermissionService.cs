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
        /// Fetch Roler Permission list from database
        /// </summary>
        /// <param name="pageNo"></param>
        /// <param name="sortExpression"></param>
        /// <param name="sortDirection"></param>
        /// <param name="roleId"></param>
        /// <returns></returns>
        public IList<PermissionModel> GetPermissionsList(int? pageNo, int? perPage, string sortExpression, string sortDirection)
        {
            this.PagingInformation.PageSize = perPage.HasValue ? perPage.Value : DefaultPageSize;
            Collection<DBParameters> parameters = new Collection<DBParameters>();

            if (this.StartRowIndex(pageNo) > 0 && this.EndRowIndex(pageNo) > 0)
            {
                parameters.Add(new DBParameters() { Name = "start_row_index", Value = this.StartRowIndex(pageNo), DBType = DbType.Int16 });
                parameters.Add(new DBParameters() { Name = "end_row_index", Value = this.EndRowIndex(pageNo), DBType = DbType.Int16 });
            }

            if (!string.IsNullOrEmpty(sortExpression) && !string.IsNullOrEmpty(sortDirection))
            {
                parameters.Add(new DBParameters() { Name = "sort_expression", Value = sortExpression, DBType = DbType.AnsiString });
                parameters.Add(new DBParameters() { Name = "sort_direction", Value = sortDirection, DBType = DbType.AnsiString });
            }
            return this.ExecuteProcedure<PermissionModel>("[auth].[permissions_list_get]", parameters).ToList();
        }


        /// <summary>
        /// Get Permission details from the database.        
        /// </summary>     
        /// <param name="permissionUid"></param>
        /// <returns></returns>
        public virtual PermissionModel GetPermissionDetailById(string permissionUid)
        {
            Collection<DBParameters> parameters = new Collection<DBParameters>();
            parameters.Add(new DBParameters() { Name = "@permission_uid", Value = permissionUid, DBType = DbType.AnsiString });        
            return this.ExecuteProcedureWithPerameterwithoutPagination<PermissionModel>("[auth].[permission_get]", parameters).FirstOrDefault();
        }

        /// <summary>
        /// Get Permission details from the database.        
        /// </summary>
        /// <param name="permissionCode"></param>
        /// <returns></returns>
        public virtual PermissionModel GetPermissionDetailByCode(string permissionCode)
        {
            Collection<DBParameters> parameters = new Collection<DBParameters>();
            parameters.Add(new DBParameters() { Name = "@permission_code", Value = permissionCode, DBType = DbType.AnsiString });
            return this.ExecuteProcedureWithPerameterwithoutPagination<PermissionModel>("[auth].[permission_get]", parameters).FirstOrDefault();
        }


        /// <summary>
        /// Update permission from database
        /// </summary>   
        /// <param name="userId"></param>     
        /// <returns></returns>
        public virtual bool UpdatePermissionDetail(PermissionModel objPermissionModel,string roleList)
        {
            System.Collections.ObjectModel.Collection<DBParameters> parameters = new System.Collections.ObjectModel.Collection<DBParameters>();
            parameters.Add(new DBParameters() { Name = "@permission_uid", Value = objPermissionModel.permission_uid, DBType = DbType.AnsiString });
            parameters.Add(new DBParameters() { Name = "@permission_name", Value = objPermissionModel.permission_name, DBType = DbType.String });
            parameters.Add(new DBParameters() { Name = "@permission_description", Value = objPermissionModel.permission_description, DBType = DbType.String });
            parameters.Add(new DBParameters() { Name = "@page_name", Value = objPermissionModel.page_name, DBType = DbType.String });
            parameters.Add(new DBParameters() { Name = "@role_list", Value = roleList, DBType = DbType.String });
            parameters.Add(new DBParameters() { Name = "@updated_by", Value = 1, DBType = DbType.String });

            return Convert.ToBoolean(this.ExecuteProcedure("[auth].[permission_update]", ExecuteType.ExecuteScalar, parameters));
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
