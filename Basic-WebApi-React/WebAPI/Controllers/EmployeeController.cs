﻿using System;
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
    [Authorize]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private IConfiguration configuration;
        private EmailService emailService;
        public EmployeeController(IConfiguration configuration)
        {
            this.emailService = new EmailService(configuration);
        }
        // GET api/values
        [HttpGet]
        [Route("api/Employee/AllEmployeeDetails")]
        public IList<UserModel> AllEmployeeDetails(int page, int perPage,string sortBy, string sortDirection)
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

        // GET api/values/5
        [HttpGet]
        [Route("api/Employee/GetEmployeeDetailsById/{id}")]
        public ActionResult<UserModel> GetEmployeeDetailsById(int id)
        {
            try
            {
                using (var userService = new UserServices())
                {
                    List<UserModel> userList = userService.GetUserList(0, null,null, null, id);
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

        // GET api/values
        [AllowAnonymous]
        [HttpGet]
        [Route("api/Employee/GetEducationList")]
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

       

        // PUT api/values
        [HttpPost]
        [Route("api/Employee/UpdateEmployeeDetails")]
        public int UpdateEmployeeDetails(UserModel model)
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

        // DELETE api/values/5        
        [HttpDelete]
        [Route("api/Employee/DeleteEmployee")]
        public bool DeleteEmaployee(string ids)
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