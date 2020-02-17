using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Services;
using DataModels;
using System.Linq;
using Microsoft.AspNetCore.Cors;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;

namespace WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [Authorize]
    [ApiController]
    public class PermissionController : ControllerBase
    {
        #region Permissions

        private readonly ILogger<PermissionController> _logger;
        public PermissionController(ILogger<PermissionController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IList<PermissionModel> AllPermissionList(int page, int perPage, string sortBy, string sortDirection)
        {
            try
            {
                using (var permissionService = new PermissionService())
                {
                    return permissionService.GetPermissionsList(page, perPage, sortBy, sortDirection);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message, null);
                return null;
            }
        }

        [HttpGet]
        public ActionResult<PermissionModel> GetPermissionDetailById(string permissionUid)
        {
            try
            {
                using (var permissionService = new PermissionService())
                {
                    PermissionModel permissionObject = permissionService.GetPermissionDetailById(permissionUid);
                    if (permissionObject != null)
                    {
                        using (var userService = new UserServices())
                        {
                            permissionObject.Role_List = userService.GetUserRoleList();
                        }
                    }
                    return permissionObject;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message, null);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public bool UpdatePermissionDetail([FromBody] JObject permissionObj)
        {
            var permissionModel = JsonConvert.DeserializeObject<PermissionModel>(Convert.ToString(permissionObj["pemissionDetail"]));
            var roleList = JsonConvert.DeserializeObject<int[]>(Convert.ToString(permissionObj["roleList"]));
            try
            {
                using (var permissionService = new PermissionService())
                {
                    return permissionService.UpdatePermissionDetail(permissionModel, string.Join(",", roleList));
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message, null);
                return false;
            }
        }

        #endregion


    }
}