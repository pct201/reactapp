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

namespace WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [Authorize]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IConfiguration configuration;
        private EmailService emailService;
        public UserController(IConfiguration configuration)
        {
            this.emailService = new EmailService(configuration);
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
            catch (Exception e)
            {
                throw e;
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
            catch (Exception)
            {
                throw;
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
            catch (Exception)
            {
                throw;
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
            catch (Exception)
            {
                throw;
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
            catch (Exception e)
            {
                throw e;
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
                catch (Exception e)
                {
                    throw e;
                }
            }
            else
                return false;
        }






    }
}