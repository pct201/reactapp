using DataModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Services;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using WebAPI.Common;
using WebAPI.Email;

namespace WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {


        private readonly IConfiguration _configuration;
        private readonly CommonClass _commonClass;
        private readonly EmailService _emailService;
        private readonly ILogger<AuthController> _logger;
        public AuthController(IConfiguration configuration, ILogger<AuthController> logger)
        {
            _configuration = configuration;
            _emailService = new EmailService(configuration);
            _commonClass = new CommonClass(configuration);
            _logger = logger;
        }

        [HttpPost]
        public ActionResult RegisterNewUser(UserModel model)
        {
            try
            {
                using (var userService = new UserServices())
                {
                    model.Token = GenerateEmailToken();
                    int userId = userService.AddEditUser(model);
                    if (userId < 0)
                        return Ok(new { success = false, errorCode = 201 });//Email Address Allready Registerd.

                    try
                    {
                        string url = HttpContext.Request.Headers["origin"];
                        //Trigger usercreation email
                        UserCreationEvent emailEvent = new UserCreationEvent(_emailService, model.Email, model.Language_code);
                        emailEvent.Send();

                        //Trigger confirm email                                       
                        ConfirmPasswordEvent EmailEvent = new ConfirmPasswordEvent(_emailService, (url + "/createpassword/?token=" + model.Token + "&uid=" + _commonClass.Encrypt(model.Email)), model.Email, model.Language_code);
                        EmailEvent.Send();

                        return Ok(new { success = true, errorCode = 200 });//User Registered Successfully.
                    }
                    catch
                    {
                        return Ok(new { success = false, errorCode = 202 });//Error In Mail Sending
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message, null);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public ActionResult CreatePassword([FromBody] JObject credentialObj)
        {
            try
            {
                string emailId = _commonClass.Decrypt(Convert.ToString(credentialObj["userId"]));
                string token = (Convert.ToString(credentialObj["token"])).Replace(" ", "+");
                string password = Convert.ToString(credentialObj["password"]);
                if (!string.IsNullOrEmpty(token) && isLatestToken(token))
                {
                    using (var userServices = new UserServices())
                    {
                        int resultCode = userServices.SetPassword(emailId, token, _commonClass.Encrypt(password));
                        bool isSuccess = (resultCode == 200) ? true : false;
                        return Ok(new { success = isSuccess, errorCode = resultCode });//Password Created Successfully.                   
                    }
                }
                else
                {
                    string url = HttpContext.Request.Headers["origin"];
                    string newToken = GenerateEmailToken();
                    using (var userServices = new UserServices())
                    {

                        if (userServices.UpdateTokenInDatabase(emailId, token, newToken))
                        {
                            //Trigger confirm email for expired link                                     
                            ConfirmPasswordEvent EmailEvent = new ConfirmPasswordEvent(_emailService, (url + "/createpassword/?token=" + newToken + "&uid=" + _commonClass.Encrypt(emailId)), emailId, "en-us");
                            EmailEvent.Send();
                            return Ok(new { success = false, errorCode = 204 });//Link Expired Sent New Link.
                        }
                        else
                            return Ok(new { success = false, errorCode = 203 });//token or email provided wrong.
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message, null);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public ActionResult ForgotPassword(string emailId)
        {
            try
            {
                string url = HttpContext.Request.Headers["origin"];
                string newToken = GenerateEmailToken();
                using (var userServices = new UserServices())
                {
                    userServices.UpdateTokenInDatabase(emailId, null, newToken);
                    //Trigger confirm email for expired link                                     
                    ConfirmPasswordEvent EmailEvent = new ConfirmPasswordEvent(_emailService, (url + "/createpassword/?token=" + newToken + "&uid=" + _commonClass.Encrypt(emailId)), emailId, "en-us");
                    EmailEvent.Send();
                }
                return Ok(new { success = true });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message, null);
                return Ok(new { success = false });
            }
        }

        [HttpPost]
        public ActionResult Login([FromBody] JObject credentialObj)
        {
            try
            {
                string emailId = Convert.ToString(credentialObj["userName"]);
                string password = Convert.ToString(credentialObj["password"]);
                using (var userServices = new UserServices())
                {
                    UserModel userDetail = userServices.GetUserByEmail(emailId);

                    if (userDetail != null && string.IsNullOrEmpty(userDetail.Password))
                        return Ok(new { isvalidUser = false, errorCode = 201 });
                    else if (userDetail == null || userDetail.UserId <= 0 || (password != _commonClass.Decrypt(userDetail.Password)))
                        return Ok(new { isvalidUser = false, errorCode = 202 });

                    return PreparejwtToken(userDetail, userServices);

                    //    using (var permissionService = new PermissionService())
                    //    {
                    //        string[] permissions = null;
                    //        IList<PermissionModel> permissionList = permissionService.GetPermissionListByUserId(userDetail.UserId);
                    //        if (permissionList.Count > 0)
                    //            permissions = permissionList.Select(x => x.permission_code).ToArray();

                    //        var claims = new[]
                    //    {
                    //    new Claim(JwtRegisteredClaimNames.Sub, userDetail.First_name + " " + userDetail.Last_name),
                    //    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    //    new Claim(JwtRegisteredClaimNames.Email, userDetail.Email),
                    //    new Claim(ClaimTypes.Role, "Admin")
                    //};

                    //        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["TokenAuthentication:SecretKey"]));
                    //        var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
                    //        var securityToken = new JwtSecurityToken(
                    //                issuer: _configuration["TokenAuthentication:Issuer"],
                    //                audience: _configuration["TokenAuthentication:Audience"],
                    //                claims: claims,
                    //                //expires: DateTime.UtcNow.AddHours(2),
                    //                expires: DateTime.UtcNow.AddMinutes(1),
                    //                signingCredentials: signingCredentials
                    //            );

                    //        return Ok(new
                    //        {
                    //            jwtToken = new JwtSecurityTokenHandler().WriteToken(securityToken),
                    //            refreshToken= _commonClass.GenerateRefreshToken(),
                    //            expiration = securityToken.ValidTo,
                    //            userName = userDetail.First_name + " " + userDetail.Last_name,
                    //            permissions = JsonConvert.SerializeObject(permissions),
                    //            isvalidUser = true,
                    //            errorCode = 200,
                    //        });
                    //    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message, null);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public ActionResult RefreshAuthToken([FromBody] JObject credentialObj)
        {
            try
            {
                string jwtToken = Convert.ToString(credentialObj["jwtToken"]);
                string refreshToken = Convert.ToString(credentialObj["refreshToken"]);
                using (var userServices = new UserServices())
                {
                    UserModel userDetail = userServices.GetUserByRefreshToken(jwtToken, refreshToken);

                    //if (userDetail != null)
                    //    return Ok(new { isvalidUser = false, isvalidToken = false, errorCode = 201 });

                    return PreparejwtToken(userDetail, userServices);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message, null);
                return BadRequest(ex.Message);
            }
        }

        [NonAction]
        public OkObjectResult PreparejwtToken(UserModel userDetail, UserServices userServices)
        {
            using (var permissionService = new PermissionService())
            {
                string[] permissions = null;
                IList<PermissionModel> permissionList = permissionService.GetPermissionListByUserId(userDetail.UserId);
                if (permissionList.Count > 0)
                    permissions = permissionList.Select(x => x.permission_code).ToArray();

                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, userDetail.First_name + " " + userDetail.Last_name),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Email, userDetail.Email),
                    new Claim(ClaimTypes.Role, "Admin")
                };

                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["TokenAuthentication:SecretKey"]));
                var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
                var securityToken = new JwtSecurityToken(
                        issuer: _configuration["TokenAuthentication:Issuer"],
                        audience: _configuration["TokenAuthentication:Audience"],
                        claims: claims,
                        //expires: DateTime.UtcNow.AddHours(2),
                        expires: DateTime.UtcNow.AddMinutes(1),
                        signingCredentials: signingCredentials
                    );

                var token = new JwtSecurityTokenHandler().WriteToken(securityToken);
                var refToken = _commonClass.GenerateRefreshToken();
                

                // code to insert refreshtoken into Database
                var saveToken  = userServices.UpdateRefreshToken(userDetail.UserId, token, refToken, DateTime.UtcNow.AddMonths(1));

                return Ok(new
                {
                    jwtToken = token,
                    refreshToken =refToken,
                    expiration = securityToken.ValidTo,
                    userName = userDetail.First_name + " " + userDetail.Last_name,
                    permissions = JsonConvert.SerializeObject(permissions),
                    isvalidUser = true,
                    errorCode = 200,
                });
            }
        }


        [NonAction]
        public string GenerateEmailToken()
        {
            byte[] time = BitConverter.GetBytes(DateTime.UtcNow.ToBinary());
            byte[] key = Guid.NewGuid().ToByteArray();
            return Convert.ToBase64String(time.Concat(key).ToArray());
        }

        [NonAction]
        public bool isLatestToken(string token)
        {
            byte[] data = Convert.FromBase64String(token);
            DateTime generateTime = DateTime.FromBinary(BitConverter.ToInt64(data, 0));
            bool isValid = (generateTime > DateTime.UtcNow.AddHours(Convert.ToInt32(_configuration["EmailLink:TimeToLiveHour"]) * -1)) ? true : false;
            return isValid;
        }

    }

}
