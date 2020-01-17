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

        public class Permission
        {
            public const string CloneProposal = "CloneProposal";
            public const string EditCompany = "EditCompany";
            public const string ViewDashboard = "ViewDashboard";           
            public const string ViewSiteKey = "ViewSiteKey";          
            public const string ViewSanctionCheckPage = "ViewSanctionCheckPage";  
            public const string ViewNotes = "ViewNotes";          
            public const string ViewClaims = "ViewClaims";            
            public const string ViewSearchProposalPage = "ViewSearchProposalPage";
            public const string ViewProposal = "ViewProposal";
            public const string ViewUserList = "ViewUserList";
            public const string SearchUserList = "SearchUserList";
            public const string CreateNewUser = "CreateNewUser";
            public const string EditUser = "EditUser";
            public const string CreateNewUnderwriter = "CreateNewUnderwriter";
            public const string EditUnderwriter = "EditUnderwriter";
            public const string ViewCompanyList = "ViewCompanyList";
            public const string SearchCompany = "SearchCompany";
            public const string ViewCompanyInformation = "ViewCompanyInformation";
            public const string ManageCompanyBasicFunctionalities = "ManageCompanyBasicFunctionalities";
            public const string ManageErrorsAndOmissions = "ManageErrorsandOmissions";
            public const string ManageAdditionalCompanyInformation = "ManageAdditionalCompanyInformation";
            public const string ManageRegistrationInformation = "ManageRegistrationInformation";
            public const string ManageAttachments = "ManageAttachments";
            public const string ViewExchangeRate = "ViewExchangeRate";
            public const string ViewAdmin = "ViewAdmin";
            public const string ViewClauseLibrary = "ViewClauseLibrary";
            public const string ManageTax = "ManageTax";
            public const string ViewTaxes = "ViewTaxes";
            public const string ManageProposalTax = "ManageProposalTax";
            public const string ManageAutoDiscounts = "ManageAutoDiscounts";
            public const string ViewDeductibleDiscounts = "ViewDeductibleDiscounts";
            public const string ManageDeductibleDiscounts = "ManageDeductibleDiscounts";
            public const string ViewBaseDiscounts = "ViewBaseDiscounts";
            public const string ManageBaseDiscounts = "ManageBaseDiscounts";
            public const string ManageRatingMatrices = "ManageRatingMatrices";            
            public const string ImportRatingMatrix = "ImportRatingMatrix"; 
            public const string ViewReportingPage = "ViewReportingPage";  
            public const string ManageRatingMatrix = "ManageRatingMatrix";
            public const string ViewRatingMatrix = "ViewRatingMatrix";  
            public const string ManageGlobalSetting = "ManageGlobalSetting";
            public const string ManageSAUSettings = "ManageSAUSettings";
            public const string ManageSanctionSettings = "ManageSanctionSettings";
            public const string ManageAdjusterCompany = "ManageAdjusterCompany";
            public const string ManageAdjusterAssignment = "ManageAdjusterAssignment";
            public const string ViewAdjusterCompanyList = "ViewAdjusterCompanyList";
            public const string CreateNewAdjusterCompany = "CreateNewAdjusterCompany";
            public const string DeleteAdjusterCompany = "DeleteAdjusterCompany";
            public const string CreateAdjusters = "CreateAdjusters";
            public const string AssignAdjuster = "AssignAdjuster";
            public const string DeleteAdjusterAssignment = "DeleteAdjusterAssignment";
            public const string ViewUnderwritingCompanyInformation = "ViewUnderwritingCompanyInformation";
            public const string ManageUnderwritingCompanyInformation = "ManageUnderwritingCompanyInformation";
            public const string EditClaim = "EditClaim"; 
            public const string CloseClaim = "CloseClaim";
            public const string ReopenClaim = "ReopenClaim";
            public const string ViewClaimDetailsPage = "ViewClaimDetailsPage";    
            public const string CreateNewClaim = "CreateNewClaim";
            public const string ViewTotalAmountofNetPremium = "ViewTotalAmountofNetPremium";
            public const string CreateProposal = "CreateProposal";       
            public const string ManageClause = "ManageClause";           
            public const string SaveSurplusDetails = "SaveSurplusDetails";           
            public const string ManageCompanyAdvanceFunctionalities = "ManageCompanyAdvanceFunctionalities";
            public const string ManageExchangeRate = "ManageExchangeRate";
            public const string ManageSiteKey = "ManageSiteKey";
            public const string ViewFinance = "ViewFinance";
            public const string ManageTemplates = "ManageTemplates";
            public const string ManageEmails = "ManageEmails";      
            public const string ManageSystemNotes = "ManageSystemNotes";            
            public const string ManageAddresses = "ManageAddresses";
            public const string ManageRolePermissions = "ManageRolePermissions";
            public const string ManageSAURulesMatrix = "ManageSAURulesMatrix";
            public const string RiskReassignment = "ReassignRisk";
            public const string ClaimReassignment = "ReassignClaims";
            public const string ViewUtilities = "ViewUtilities";
            public const string ViewRiskCode = "ViewRiskCode";
            public const string ViewSanctionChecker = "SanctionChecker";
            public const string ViewErrorLog = "ViewErrorLog";
            public const string ManageReports = "ManageReports";           
            public const string ManageQACMS = "ManageQACMS";
            public const string ManageBeacons = "ManageBeacons";
            public const string ManageTheme = "ManageTheme";  
            public const string BatchpaymentBorderaux = "BatchpaymentBorderaux";
            public const string RiskReport = "Risks";
            public const string UserReport = "Users";
            public const string CompaniesReport = "Companies";
            public const string Funnel = "Funnel";
            public const string HitRate = "HitRate";
            public const string AdjustmentReport = "AdjustmentReport";
            public const string BordereauxbyDateofFirmOrder = "BordereauxbyDateofFirmOrder";
            public const string BordereauxbyDateofFirmOrderACMAN = "BordereauxbyDateofFirmOrderACMAN";
            public const string BordereauxbyDateofFirmOrderUPUPBFIN = "BordereauxbyDateofFirmOrderUPUPBFIN";
            public const string BordereauxbyDateofFirmOrderW = "BordereauxbyDateofFirmOrderW";
            public const string ClaimsBordereaux = "ClaimsBordereaux";
            public const string ClaimsBordereauxbyDateofFirmOrder = "ClaimsBordereauxbyDateofFirmOrder";
            public const string DelinquentbyDateofFirmOrder = "DelinquentbyDateofFirmOrder";
            public const string FinanceBatch = "FinanceBatch";
            public const string ICSBPremiumBordereaux = "ICSBPremiumBordereaux";
            public const string Irreconcilable = "Irreconcilable";
            public const string LloydsClaimsBatch = "LloydsClaimsBatch";
            public const string LloydsClaimsBordereauxUK = "LloydsClaimsBordereauxUK";
            public const string LloydsPremiumBatch = "LloydsPremiumBatch";
            public const string WRBClaimsBordereaux = "WRBClaimsBordereaux";
            public const string WRBClaimsBordereauxUK = "WRBClaimsBordereauxUK";
            public const string WRBPremiumBordereaux = "WRBPremiumBordereaux";
            public const string RiskVersions = "RiskVersions";
            public const string AggregateReport = "Aggregate";
            public const string BrokerCommissionReport = "BrokerCommissionReport";
            public const string ClaimDetailReport = "ClaimDetailReport";
            public const string PaymentBatch = "PaymentBatch";
            public const string DelinquentPaymentsBordereaux = "DelinquentPaymentsBordereaux";
            public const string InvoiceDetailsReport = "InvoiceDetails";
            public const string PaymentDetails = "PaymentDetails";
            public const string UserAudit = "UserAudit";
            public const string SanctionTransactional = "SanctionTransactional";
            public const string SanctionCheckSummary = "SanctionCheckSummary";
            public const string SanctionMonthlyTransactionalSummary = "SanctionMonthlyTransactionalSummary";
            public const string ICFee = "ICFee";
            public const string WebProposal = "WebProposal";
            public const string CompleteReconciliation = "CompleteReconciliation";
            public const string RejectBatch = "RejectBatch";
            public const string SaveOnFinanceReconciliationPage = "SaveOnFinanceReconciliationPage"; 
            public const string VwPymntNotesFinanceRcnlationPage = "VwPymntNotesFinanceRcnlationPage";
            public const string AddPymntNotesFinanceRcnlationPage = "AddPymntNotesFinanceRcnlationPage";
            public const string ViewBatchSearch = "ViewBatchSearch";
            public const string ViewBatchNotes = "ViewBatchNotes";
            public const string AddBatchNotes = "AddBatchNotes";
            public const string ViewFinanceReconciliationPage = "ViewFinanceReconciliationPage";   
            public const string SubmitBatch = "SubmitBatch";         
            public const string ViewBatchReports = "ViewBatchReports";
            public const string ManagePlaceholder = "ManagePlaceholder";           
            public const string ManageServiceFees = "ManageServiceFees";
            public const string ManageAnnouncement = "ManageAnnouncement";
            public const string ManageLoadFactors = "ManageLoadFactors";
            public const string ManageDurationLoadFactor = "ManageDurationLoadFactor";
            public const string ManageFootfallLoadFactor = "ManageFootfallLoadFactor";
            public const string ManageTerritoryLoadFactor = "ManageTerritoryLoadFactor";
            public const string ManageBaseLoadFactor = "ManageBaseLoadFactor";
            public const string ManageReinstatementLoadFactor = "ManageReinstatementLoadFactor";
            public const string ViewDurationLoadFactor = "ViewDurationLoadFactor";
            public const string ViewFootfallLoadFactor = "ViewFootfallLoadFactor";
            public const string ViewTerritoryLoadFactor = "ViewTerritoryLoadFactor";
            public const string ViewBaseLoadFactor = "ViewBaseLoadFactor";
            public const string ViewReinstatementLoadFactor = "ViewReinstatementLoadFactor";
            public const string ManageCoverages = "ManageCoverages";
            public const string RatingCalculator = "RatingCalculator";
            public const string ManageCrossellProducts = "ManageCrossellProducts";
            public const string ViewCrossellProducts = "ViewCrossellProducts";
            public const string ManageRelatedProducts = "ManageRelatedProducts";
            public const string ViewRelatedProducts = "ViewRelatedProducts";
            public const string RegenerateCertificate = "RegenerateCertificate";
            public const string ManageSanctionConfiguration = "ManageSanctionConfiguration";
            public const string ManageArticle = "ManageArticle";
            public const string ManageBeacon = "ManageBeacon";
            public const string ManageBeaconPage = "ManageBeaconPage";
            public const string ManageBeaconsAssignment = "ManageBeaconsAssignment";
            public const string ManageFeature = "ManageFeature";
            public const string BatchStatus = "BatchStatus";
            public const string ExchangeRateHistory = "ExchangeRateHistory";
            public const string ManageExchangeSettings = "ManageExchangeSettings";
            public const string SPRACBoundRisk = "SPRACBoundRisk";
            public const string ManageEmailLog = "ManageEmailLog";
        }



        public class UserRoles
        {
            public const string Principal_Broker = "Principal Broker";
            public const string Broker = "Broker";
            public const string Principal_Underwriter = "Principal Underwriter";
            public const string Underwriter = "Underwriter";
            public const string Finance = "Finance";
            public const string Internal_Claim_Adjuster = "Internal Claim Adjuster";
            public const string Administrator = "Admin";
            public const string Accounts = "Accounts";
            public const string Manager = "Manager";
            public const string Claims_Adjuster = "Claims Adjuster";
            public const string Super_User = "Super User";
            public const string Finance_Manager = "Finance Manager";
        }

        public class Emails
        {
            public const string UserCreation = "UserCreation";          
            public const string ForgotPwd = "ForgotPassword";
            public const string ConfirmPwd = "ConfirmPassword";
        }

        public class DataTableOrderDirection
        {
            public const string DESC = "DESC";
            public const string Descending = "Descending";
            public const string Ascending = "Ascending";
        }

        public class GlobalSettings
        {
            public const string Admin = "Admin";
            public const string CapchaEnabled = "CapchaEnabled";
            public const string CarrierSiteName = "CarrierSiteName";
            public const string EmailLinkURL = "EmailLinkURL";
            public const string FileSize = "FileSize";
            public const string HideStackTrace = "HideStackTrace";
            public const string MailBoxId = "mailboxId";
            public const string NoReplyEmailAccount = "NoReplyEmailAccount";
            public const string SiteAdminInbox = "SiteAdminInbox";
        }

        public class FileContentType
        {
            public const string application_pdf = "application/pdf";
        }

        public class DateFormat
        {
            // public const string yyyy_MM_dd = "yyyy-MM-dd";

            public const string dd_MMM_yyyy = "dd-MMM-yyyy";

            public const string Html_dd_MMM_yyyy = "dd-M-yy";


            public const string dd_MMM_yyyy_HH_mm_ss = "dd-MMM-yyyy HH:mm:ss";

            public const string DD_MMM_YYYY_HH_mm_ss = "DD-MMM-YYYY HH:mm:ss";

            public const string yyyy_MM_dd_HH_mm_ss = "yyyy-MM-dd HH:mm:ss";
        }

    } 

}
