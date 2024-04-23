
export interface IS_TRX_TRX_REQUESTED {
    TSM_TRNSACTIONID: string;
    PRP_PROFILEID: string;
    TSD_TRXTYPE: string;
    TSD_TRXNAME: string;
    TSD_TRXAMOUNTOUT: number;
    TSD_TRXUNITSOUT: number;
    TSD_REBATEPERCENT: number;
    TSD_PRDCURRENCYSYMBOL: string;
    TSD_ISENTIREOUT: number;
    TSD_DIGITALCERTIFICATE: string;
    ACC_SYSTEMCODE: string;
    CLP_PERIOD: number | null;
    CLY_YEAR: number | null;
    DST_ID: string;
    DSB_ID: string;
    FND_FUNDID: string;
    PRD_PLANID: string | null;
    PUT_TYPENAME: string;
    PUC_CLASSCODE: string;
    TSD_AMOUNTPRECISION: number;
    TSD_AMOUNTPRECISIONMETHOD: string;
    TSD_NAVPRECISION: number;
    TSD_NAVPRECISIONMETHOD: string;
    TSD_PRICEPRECISION: number;
    TSD_PRICEPRECISIONMETHOD: string;
    TSD_UNITPRECISION: number;
    TSD_UNITPRECISIONMETHOD: string;
    TSD_REPURCHASEPRICEPRECISION: number | null;
    TSD_REPURCHASEPRICEPRECISIONMETHOD: string;
    TSD_PREMIUMAMOUNT: number;
    TSD_INSSCHID: string;
    TSD_REQTRXID: string;
    PRD_TABLEID: number;
    PRD_FUNDCODE: number;
    PRD_PLANCODE: number;
    tSTAMP: string;
    TSD_TRXAMOUNTIN: number;
    TSD_TRXUNITSIN: number;
    TSD_REDEEMOUTBY: string;
    TSD_REDEEMPERCENT: number;
    TSD_NAV: number | null;
    TSD_ISNAVANNOUNCED: number | null;
    TSD_TRUSTEECODE: string;
    TSD_AUDITORCODE: string;
    TSD_ISISLAMIC: number | null;
    TSD_GROSSCOMMISSION: number | null;
    TSD_NAVID: string;
    TSD_SERVICEFEE: number | null;
    CRR_ID:string
    CRR_BUYCONRATE:number
    TSD_TRXAMOUNTIN_CRR:number
    TSD_TRXUNITSIN_CRR:number
   
   
}
 