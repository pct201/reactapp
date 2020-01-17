// Decompiled with JetBrains decompiler
// Type: WebAPI.Controllers.AuthController
// Assembly: WebAPI, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: 9065BE5E-29FE-4791-BBEE-3E03B2B7F879
// Assembly location: D:\DemoPublish\WebAPI.dll

using DataModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using Services;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using WebAPI.Email;

namespace WebAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {


        private IConfiguration configuration;
        private EmailService emailService;
        public AuthController(IConfiguration configuration)
        {
            this.configuration = configuration;
            this.emailService = new EmailService(configuration);
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
                    ConfirmPasswordEvent EmailEvent = new ConfirmPasswordEvent(emailService, (url + "/createpassword/?token=" + model.Token + "&uid=" + Encrypt(model.Email)), model.Email, model.Language_code);
                    EmailEvent.Send();

                    return Ok(new { success = true, errorCode = 0 });//User Registered Successfully.
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
            string emailId = Decrypt(Convert.ToString(credentialObj["userId"]));
            string token = (Convert.ToString(credentialObj["token"])).Replace(" ", "+");
            string password = Convert.ToString(credentialObj["password"]);
            if (!string.IsNullOrEmpty(token) && isLatestToken(token))
            {
                using (var userServices = new UserServices())
                {
                    if (userServices.SetPassword(emailId, token, Encrypt(password)))
                        return Ok(new { success = true, errorCode = 0 });//Password Created Successfully.                   
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
                        ConfirmPasswordEvent EmailEvent = new ConfirmPasswordEvent(emailService, (url + "/createpassword/?token=" + newToken + "&uid=" + Encrypt(emailId)), emailId, "en-us");
                        EmailEvent.Send();
                        return Ok(new { success = false, errorCode = 202 });//Link Expired Sent New Link.
                    }
                }
            }
            return Ok(new { success = false, errorCode = 201 });//Token or email information is invalid.
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
                    ConfirmPasswordEvent EmailEvent = new ConfirmPasswordEvent(emailService, (url + "/createpassword/?token=" + newToken + "&uid=" + Encrypt(emailId)), emailId, "en-us");
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
                if (userDetail == null || userDetail.UserId <= 0 || !(password == this.Decrypt(userDetail.Password)))
                    return Ok(new
                    {
                        isvalidUser = false
                    });

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
                        expires: DateTime.UtcNow.AddMinutes(60),
                        signingCredentials: signingCredentials
                    );
                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(securityToken),
                    expiration = securityToken.ValidTo,
                    isvalidUser = true
                });
            }
        }

        [NonAction]
        private string Encrypt(string clearText)
        {
            string EncryptionKey = configuration["EncryptionKey"];
            byte[] clearBytes = Encoding.Unicode.GetBytes(clearText);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(clearBytes, 0, clearBytes.Length);
                        cs.Close();
                    }
                    clearText = Convert.ToBase64String(ms.ToArray());
                }
            }
            return clearText;
        }

        [NonAction]
        private string Decrypt(string cipherText)
        {
            string EncryptionKey = configuration["EncryptionKey"];
            byte[] cipherBytes = Convert.FromBase64String(cipherText);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(cipherBytes, 0, cipherBytes.Length);
                        cs.Close();
                    }
                    cipherText = Encoding.Unicode.GetString(ms.ToArray());
                }
            }
            return cipherText;
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
            return (generateTime < DateTime.UtcNow.AddMinutes(Convert.ToInt32(configuration["EmailLink:TimeToLiveHour"]) * -1)) ? true : false;
        }
    }
}
