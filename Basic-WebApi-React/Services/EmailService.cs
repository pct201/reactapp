﻿using System;
using System.Collections.Generic;
using System.Linq;
using DataModels;
using DataContext;
using System.Collections.ObjectModel;
using System.Net.Mail;
using NLog;
using System.Text.RegularExpressions;
using System.Collections.Generic;
using Services;
using System.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using System.Net;

namespace Services
{
    public class EmailService : ServiceContext
    {

        private IConfiguration configuration;
        public EmailService(IConfiguration configuration)
        {
            this.configuration = configuration;
            this.PagingInformation = new Pagination() { PageSize = DefaultPageSize, PagerSize = DefaultPagerSize };
        }


        #region GET Email


        /// <summary>
        /// get user creation email details
        /// </summary>
        /// <param name="emailName"></param>
        /// <param name="emailAddress"></param>
        /// <param name="languageCode"></param>
        /// <returns></returns>
        public EmailModel GetEmailDetailByEmailName(string emailName,string emailAddress, string languageCode,string confirmPasswordLink)
        {
            Collection<DBParameters> parameters = new Collection<DBParameters>();
            parameters.Add(new DBParameters() { Name = "@email_name", Value = emailName, DBType = DbType.AnsiString });
            parameters.Add(new DBParameters() { Name = "@language_code", Value = languageCode, DBType = DbType.AnsiString });
            parameters.Add(new DBParameters() { Name = "@email_address", Value = emailAddress, DBType = DbType.String });

            if(!string.IsNullOrEmpty(confirmPasswordLink))
            parameters.Add(new DBParameters() { Name = "@confirm_password_link", Value = confirmPasswordLink, DBType = DbType.AnsiString });

            return this.ExecuteProcedureWithPerameterwithoutPagination<EmailModel>("[doc].[email_details_get]", parameters).FirstOrDefault();
        }

        #endregion

        /// <summary>
        /// record the emails that got send out by the system for the proposal (versions)
        /// </summary>       
        /// <param name="to"></param>
        /// <param name="from"></param>
        /// <param name="cc"></param>
        /// <param name="bcc"></param>
        /// <param name="subject"></param>
        /// <param name="body"></param>
        /// <param name="createdBy"></param>     
        public int SaveEmailDetails(string to, string from, string cc, string bcc, string subject, string body, int createdBy, string email_uid)
        {
            Collection<DBParameters> parameters = new Collection<DBParameters>();           
            parameters.Add(new DBParameters() { Name = "@email_uid", Value = email_uid, DBType = DbType.AnsiString });
            parameters.Add(new DBParameters() { Name = "@subject_text", Value = subject, DBType = DbType.String });
            parameters.Add(new DBParameters() { Name = "@to_address", Value = to, DBType = DbType.String });
            parameters.Add(new DBParameters() { Name = "@from_address", Value = from, DBType = DbType.String });
            parameters.Add(new DBParameters() { Name = "@cc_list", Value = cc, DBType = DbType.String });
            parameters.Add(new DBParameters() { Name = "@bcc_list", Value = bcc, DBType = DbType.String });
            parameters.Add(new DBParameters() { Name = "@body_text", Value = body, DBType = DbType.String });
            parameters.Add(new DBParameters() { Name = "@created_by", Value = createdBy, DBType = DbType.Int32 });      
            return Convert.ToInt32(this.ExecuteProcedure("doc.emails_log_add", ExecuteType.ExecuteScalar, parameters));
        }

        /// <summary>
        /// update mail status which has sent
        /// </summary>
        /// <param name="emailId"></param>
        /// <param name="is_sent"></param>
        /// <param name="error"></param>     
        /// <param name="productId"></param>
        public void UpdateEmailStatus(int emailId, bool has_failed, string response_message)
        {
            Collection<DBParameters> parameters = new Collection<DBParameters>();
            parameters.Add(new DBParameters() { Name = "@email_id", Value = emailId, DBType = DbType.Int32 });
            parameters.Add(new DBParameters() { Name = "@has_failed", Value = has_failed, DBType = DbType.Boolean });
            parameters.Add(new DBParameters() { Name = "@response_message", Value = response_message, DBType = DbType.String });
            this.ExecuteProcedure("doc.emails_log_update", ExecuteType.ExecuteScalar, parameters);
        }

        #region Email Utility
        /// <summary>
        /// Sending An Email with master mail template
        /// </summary>
        /// <param name="mailFrom">Mail From</param>
        /// <param name="mailTo">Mail To</param>
        /// <param name="mailCC">Mail CC</param>
        /// <param name="mailBCC">Mail BCC</param>
        /// <param name="subject">Subject of mail</param>
        /// <param name="body">Body of mail</param>
        /// <param name="attachment">Attachment for the mail</param>
        /// <returns>return send status</returns>
        public bool SendMail(string mailFrom, string mailTo, string mailCC, string mailBCC, string subject, string body, string attachmentPath = null, List<Attachment> attachments = null, int emailId = 0)
        {
            if (!string.IsNullOrEmpty(mailTo))
                mailTo = mailTo.Replace(';', ',');

            if (ValidateEmail(mailFrom, mailTo) && (string.IsNullOrEmpty(mailBCC) || IsEmail(mailBCC)))
                {
                MailMessage mailMesg = new MailMessage();              
                SmtpClient objSMTP = new SmtpClient(){                   
                    Host = configuration["Email:Smtp:Host"],                  
                    Port = Convert.ToInt32(configuration["Email:Smtp:Port"]),
                    Credentials = new NetworkCredential(
                        configuration["Email:Smtp:Username"],
                          configuration["Email:Smtp:Password"]
                        )
                };

                mailMesg.From = new MailAddress(mailFrom);
                mailMesg.To.Add(mailTo);
                mailMesg.Subject = subject;
                mailMesg.Body = body;
                mailMesg.IsBodyHtml = true;

                //for CC
                if (!string.IsNullOrEmpty(mailCC))
                {
                    mailCC = mailCC.Replace(";", ",");
                    string[] mailCCArray = mailCC.Split(',');
                    foreach (string email in mailCCArray)
                    {
                        if (IsEmail(email))
                        {
                            mailMesg.CC.Add(email);
                        }
                    }
                }

                //for Bcc
                if (!string.IsNullOrEmpty(mailBCC))
                {
                    mailBCC = mailBCC.Replace(";", ",");
                    mailMesg.Bcc.Add(mailBCC);
                }

                //for attachment path
                if (!string.IsNullOrEmpty(attachmentPath))
                {
                    string[] attachmentArray = attachmentPath.Split(';');
                    foreach (string attachFile in attachmentArray)
                    {
                        try
                        {
                            Attachment attach = new Attachment(attachFile);
                            mailMesg.Attachments.Add(attach);
                        }
                        catch (Exception ex)
                        {
                            Logger logger = LogManager.GetCurrentClassLogger();
                            logger.Error(ex, "email attachment error");
                        }
                    }
                }

                //for attachment
                if (attachments != null && attachments.Count > 0)
                {
                    foreach (var attachment in attachments)
                    {
                        mailMesg.Attachments.Add(attachment);
                    }
                }

                //send mail
                try
                {
                    objSMTP.Send(mailMesg);
                    if (emailId > 0)
                        UpdateEmailStatus(emailId, false, "Email Sent Successfully");
                }
                catch (Exception ex)
                {
                    if (emailId > 0)
                        UpdateEmailStatus(emailId, true, ex.Message);

                    if (mailMesg != null) mailMesg.Dispose();
                    mailMesg = null;
                    Logger logger = LogManager.GetCurrentClassLogger();
                    logger.Error(ex, "Send email error");
                    return false;
                }
                finally
                {
                    if (mailMesg != null) mailMesg.Dispose();
                }
            }
            else
            {
                UpdateEmailStatus(emailId, true, "Email address not valid.");
                return false;
            }
            return true;
        }


        /// <summary>
        /// Method is used to Validate Email
        /// </summary>
        /// <param name="fromEmail">From email List</param>
        /// <param name="toEmail">To Email list</param>
        /// <returns>Returns validation result</returns>
        private bool ValidateEmail(string fromEmail, string toEmail)
        {
            bool isValid = true;
            if (!IsEmail(fromEmail))
            {
                isValid = false;
            }

            if (!string.IsNullOrEmpty(toEmail))
            {
                toEmail = toEmail.Replace(" ", string.Empty);
                string[] emailList = null;
                try
                {
                    emailList = toEmail.Split(',');
                }
                catch
                {
                    isValid = false;
                }

                if (emailList != null && emailList.Any())
                {
                    foreach (string email in emailList)
                    {
                        if (!IsEmail(email))
                        {
                            isValid = false;
                        }
                    }
                }
                else
                {
                    isValid = false;
                }
            }
            else
            {
                isValid = false;
            }

            if (!isValid)
            {

                Logger logger = LogManager.GetCurrentClassLogger();
                Exception ex = new Exception("Invalid Email Format");
                logger.Error(ex, "from Email : " + fromEmail + "<br/> to Email : " + toEmail);

            }

            return isValid;
        }

        /// <summary>
        /// Check email string is Email or not
        /// </summary>
        /// <param name="email">Email to verify</param>
        /// <returns>return email validation result</returns>
        private bool IsEmail(string email)
        {
            if (string.IsNullOrEmpty(email)) return false;
            string strRegex = @"^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}" +
                  @"\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\" +
                  @".)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$";
            Regex re = new Regex(strRegex);
            if (re.IsMatch(email.Trim()))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        #endregion

    }

}