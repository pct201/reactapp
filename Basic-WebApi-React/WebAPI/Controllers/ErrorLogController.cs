using System;
using System.Collections.Generic;
using DataModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services;
using Microsoft.Extensions.Logging;
using System.Data;
using WebAPI.Common;
using System.IO;

namespace WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [Authorize]
    [ApiController]
    public class ErrorLogController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        public ErrorLogController(ILogger<UserController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IList<ErrorLogModel> AllErrorDetails(int page = 0, int perPage = 0, string sortBy = null, string sortDirection = null)
        {
            try
            {
                using (var errorLogService = new ErrorLogService())
                {
                    IList<ErrorLogModel> errorList = errorLogService.GetErrorLogList(page, perPage, sortBy, sortDirection);
                    return errorList;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message, null);
                return null;
            }
        }

        [HttpGet]
        public ActionResult ErrorLogExportToExcel()
        {
            int pageNo = 1;
            using (var errorLogService = new ErrorLogService())
            {
                DataTable dtData = errorLogService.GetErrorLogListForExport(pageNo);
                var stream = new MemoryStream();
                string fileName = "error_log_list.xlsx";
                string contentType = "application/octet-stream";
                if (dtData != null && dtData.Rows.Count > 0)
                {
                    DataTable newCombineDt = new DataTable();
                    newCombineDt.Columns.Add("Log Message", typeof(string));
                    newCombineDt.Columns.Add("Additional Info", typeof(string));
                    newCombineDt.Columns.Add("Created Date", typeof(string));
                    newCombineDt.Columns.Add("Stack Trace", typeof(string));

                    foreach (DataRow dr in dtData.Rows)
                    {
                        var row = newCombineDt.NewRow();

                        row["Log Message"] = dr["log_message"].ToString();
                        row["Additional Info"] = dr["additional_info"].ToString();
                        row["Created Date"] = dr["created_date"].ToString();
                        row["Stack Trace"] = dr["stack_trace"].ToString();
                        newCombineDt.Rows.Add(row);
                    }
                    stream = CommonClass.GenrateExcelFile(newCombineDt);
                    stream.Position = 0;
                    return File(stream, contentType, fileName);
                }
                else
                {
                    return File(stream, contentType, fileName);
                }
            }
        }
    }
}