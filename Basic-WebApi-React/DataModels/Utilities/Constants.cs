//-----------------------------------------------------------------------
// <copyright file="Constants.cs" company="TatvaSoft">
//  Copyright (c) TatvaSoft. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace DataModel.Utilities
{
    /// <summary>
    /// This class is used to define constants which is common throughout the application.
    /// <CreatedBy>Tatvasoft</CreatedBy>
    /// <Date>Date</Date>
    /// </summary>
    public class Constants
    {

        public class UserRoles
        {
            public const string Admin = "Admin";
            public const string Manager = "Manager";
            public const string User = "User";        
        }

        public class Emails
        {
            public const string UserCreation = "UserCreation";          
            public const string ForgotPwrd = "ForgotPassword";
            public const string ConfirmPwrd = "ConfirmPassword";
        }

        public class DateFormat
        {
            public const string yyyy_MM_dd = "yyyy-MM-dd";

            public const string dd_MMM_yyyy = "dd-MMM-yyyy";

            public const string Html_dd_MMM_yyyy = "dd-M-yy";

            public const string dd_MMM_yyyy_HH_mm_ss = "dd-MMM-yyyy HH:mm:ss";

            public const string DD_MMM_YYYY_HH_mm_ss = "DD-MMM-YYYY HH:mm:ss";

            public const string yyyy_MM_dd_HH_mm_ss = "yyyy-MM-dd HH:mm:ss";
        }

    } 

}
