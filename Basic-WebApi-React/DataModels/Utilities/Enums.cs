//-----------------------------------------------------------------------
// <copyright file="Enums.cs" company="TatvaSoft">
//  Copyright (c) TatvaSoft. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------
namespace DataModel.Utilities
{
  
    using System.ComponentModel;
  
    public class Enums
    {
        /// <summary>
        /// Contains the enumeration for Sanction type
        /// </summary>
        public enum UserRole
        {
            /// <summary>
            /// Super_User
            /// </summary>
            [Description("Super_User")]
            Super_User = 1,

            /// <summary>
            /// Admin
            /// </summary>
            [Description("Admin")]
            Admin = 2,

            /// <summary>
            /// Broker
            /// </summary>
            [Description("Broker")]
            Broker = 3,

            /// <summary>
            /// Underwriter
            /// </summary>
            [Description("Underwriter")]
            Underwriter = 4,

            /// <summary>
            /// Principal_Underwriter
            /// </summary>
            [Description("Principal_Underwriter")]
            Principal_Underwriter = 5,

            /// <summary>
            /// Finance
            /// </summary>
            [Description("Finance")]
            Finance = 6,

            /// <summary>
            /// Principal_Broker
            /// </summary>
            [Description("Principal_Broker")]
            Principal_Broker = 7,

            /// <summary>
            /// Accounts
            /// </summary>
            [Description("Accounts")]
            Accounts = 8,

            /// <summary>
            /// Manager
            /// </summary>
            [Description("Manager")]
            Manager = 9,

            /// <summary>
            /// Claims_Adjuster
            /// </summary>
            [Description("Claims_Adjuster")]
            Claims_Adjuster = 10,

            /// <summary>
            /// Internal_Claim_Adjuster
            /// </summary>
            [Description("Internal_Claim_Adjuster")]
            Internal_Claim_Adjuster =11,

        }
    }

}


