using DataModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Services;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
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


        private readonly IConfiguration configuration;
        private readonly CommonClass commonClass;
        private readonly EmailService emailService;
        public AuthController(IConfiguration configuration)
        {
            this.configuration = configuration;
            this.emailService = new EmailService(configuration);
            this.commonClass = new CommonClass(configuration);
        }

        [HttpPost]
        public ActionResult RegisterNewUser(UserModel model)
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
                    UserCreationEvent emailEvent = new UserCreationEvent(emailService, model.Email, model.Language_code);
                    emailEvent.Send();

                    //Trigger confirm email                                       
                    ConfirmPasswordEvent EmailEvent = new ConfirmPasswordEvent(emailService, (url + "/createpassword/?token=" + model.Token + "&uid=" + commonClass.Encrypt(model.Email)), model.Email, model.Language_code);
                    EmailEvent.Send();

                    return Ok(new { success = true, errorCode = 200 });//User Registered Successfully.
                }
                catch
                {
                    return Ok(new { success = false, errorCode = 202 });//Error In Mail Sending
                }
            }
        }

        [HttpPost]
        public ActionResult CreatePassword([FromBody] JObject credentialObj)
        {
            string emailId = commonClass.Decrypt(Convert.ToString(credentialObj["userId"]));
            string token = (Convert.ToString(credentialObj["token"])).Replace(" ", "+");
            string password = Convert.ToString(credentialObj["password"]);
            if (!string.IsNullOrEmpty(token) && isLatestToken(token))
            {
                using (var userServices = new UserServices())
                {
                    int resultCode = userServices.SetPassword(emailId, token, commonClass.Encrypt(password));
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
                        ConfirmPasswordEvent EmailEvent = new ConfirmPasswordEvent(emailService, (url + "/createpassword/?token=" + newToken + "&uid=" + commonClass.Encrypt(emailId)), emailId, "en-us");
                        EmailEvent.Send();
                        return Ok(new { success = false, errorCode = 204 });//Link Expired Sent New Link.
                    }
                    else
                        return Ok(new { success = false, errorCode = 203 });//token or email provided wrong.
                }
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
                    ConfirmPasswordEvent EmailEvent = new ConfirmPasswordEvent(emailService, (url + "/createpassword/?token=" + newToken + "&uid=" + commonClass.Encrypt(emailId)), emailId, "en-us");
                    EmailEvent.Send();
                }
                return Ok(new { success = true });
            }
            catch
            {
                return Ok(new { success = false });
            }
        }

        [HttpPost]
        public ActionResult Login([FromBody] JObject credentialObj)
        {
            string emailId = Convert.ToString(credentialObj["userName"]);
            string password = Convert.ToString(credentialObj["password"]);
            using (var userServices = new UserServices())
            {
                UserModel userDetail = userServices.GetUserByEmail(emailId);

                if (userDetail != null && string.IsNullOrEmpty(userDetail.Password))
                    return Ok(new { isvalidUser = false, errorCode = 201 });
                else if (userDetail == null || userDetail.UserId <= 0 || (password != commonClass.Decrypt(userDetail.Password)))
                    return Ok(new { isvalidUser = false, errorCode = 202 });

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

                    var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["TokenAuthentication:SecretKey"]));
                    var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
                    var securityToken = new JwtSecurityToken(
                            issuer: configuration["TokenAuthentication:Issuer"],
                            audience: configuration["TokenAuthentication:Audience"],
                            claims: claims,
                            expires: DateTime.UtcNow.AddHours(2),
                            signingCredentials: signingCredentials
                        );

                    return Ok(new
                    {
                        token = new JwtSecurityTokenHandler().WriteToken(securityToken),
                        expiration = securityToken.ValidTo,
                        userName = userDetail.First_name + " " + userDetail.Last_name,
                        permissions = JsonConvert.SerializeObject(permissions),
                        isvalidUser = true,
                        errorCode = 200,
                    });
                }
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
            bool isValid = (generateTime < DateTime.UtcNow.AddMinutes(Convert.ToInt32(configuration["EmailLink:TimeToLiveHour"]) * -1)) ? true : false;
            return isValid;
        }
    }
}
