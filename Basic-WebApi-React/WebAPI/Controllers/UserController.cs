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
using WebAPI.Email;
using Microsoft.Extensions.Configuration;
using WebAPI.Common;
using Microsoft.Extensions.Logging;

namespace WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [Authorize]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly EmailService _emailService;
        private readonly CommonClass _commonClass;
        private readonly ILogger<UserController> _logger;
        public UserController(IConfiguration configuration, ILogger<UserController> logger)
        {
            _emailService = new EmailService(configuration);
            _commonClass = new CommonClass(configuration);
            _logger = logger;
        }

        [HttpGet]
        public IList<UserModel> AllUserDetails(int page, int perPage, string sortBy, string sortDirection)
        {
            try
            {
                using (var userService = new UserServices())
                {
                    IList<UserModel> userList = userService.GetUserList(page, perPage, sortBy, sortDirection);
                    return userList;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message, null);
                return null;
            }
        }

        [HttpGet]
        public ActionResult<UserModel> GetUserDetailsById(int id)
        {
            try
            {
                using (var userService = new UserServices())
                {
                    List<UserModel> userList = userService.GetUserList(0, null, null, null, id);
                    if (userList.Count > 0)
                        return userList.FirstOrDefault();
                    else
                    {
                        return null;
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message, null);
                return BadRequest(ex.Message);
            }
        }

        [AllowAnonymous]
        [HttpGet]
        public IList<EducationModel> GetEducationList()
        {
            try
            {
                using (var userService = new UserServices())
                {
                    return userService.GetEducationList();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message, null);
                return null;
            }
        }

        [AllowAnonymous]
        [HttpGet]
        public IList<UserRolesModel> GetUserRoleList()
        {
            try
            {
                using (var userService = new UserServices())
                {
                    return userService.GetUserRoleList();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message, null);
                return null;
            }
        }

        [HttpPost]
        public int UpdateUserDetails(UserModel model)
        {
            try
            {
                using (var userService = new UserServices())
                {

                    return userService.AddEditUser(model);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message, null);
                return 0;
            }
        }

        [HttpPost]
        public int UpdatePassword([FromBody] JObject pwrdDetailObj)
        {
            try
            {
                using (var userService = new UserServices())
                {
                    return userService.UpdatePassword(Convert.ToInt32(pwrdDetailObj["userId"]), _commonClass.Encrypt(Convert.ToString(pwrdDetailObj["oldPassword"])), _commonClass.Encrypt(Convert.ToString(pwrdDetailObj["newPassword"])));
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message, null);
                return 202;
            }
        }

        [HttpDelete]
        public bool DeleteUsers(string ids)
        {
            if (!string.IsNullOrEmpty(ids))
            {
                try
                {
                    using (var userService = new UserServices())
                    {
                        userService.DeleteUserById(ids);
                        return true;
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, ex.Message, null);
                    return false;
                }
            }
            else
                return false;
        }
    }
}