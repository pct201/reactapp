using DataContext;
using DataModels;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Data;
using System.Linq;
using System.Text;

namespace Services
{
    public class ErrorLogService : ServiceContext
    {
        public ErrorLogService()
        {
            this.PagingInformation = new Pagination() { PageSize = DefaultPageSize, PagerSize = DefaultPagerSize };
        }

        public virtual List<ErrorLogModel> GetErrorLogList(int? pageNo, int? perPage, string sortExpression, string sortDirection)
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
                parameters.Add(new DBParameters() { Name = "sort_expression", Value = sortExpression, DBType = DbType.String });
                parameters.Add(new DBParameters() { Name = "sort_direction", Value = sortDirection, DBType = DbType.String });
            }
            return this.ExecuteProcedure<ErrorLogModel>("[dbo].[error_list_get]", parameters).ToList();
        }

        public DataTable GetErrorLogListForExport(int? pageNo)
        {
            Collection<DBParameters> parameters = new Collection<DBParameters>();
            this.PagingInformation.PageSize = Int16.MaxValue;

            if (this.StartRowIndex(pageNo) > 0 && this.EndRowIndex(pageNo) > 0)
            {
                parameters.Add(new DBParameters() { Name = "start_row_index", Value = this.StartRowIndex(pageNo), DBType = DbType.Int32 });
                parameters.Add(new DBParameters() { Name = "end_row_index", Value = this.EndRowIndex(pageNo), DBType = DbType.Int32 });
            }

            return this.ExecuteProcedurewithoutPaginationDatatable("[dbo].[error_list_get]", parameters);
        }
    }
}
