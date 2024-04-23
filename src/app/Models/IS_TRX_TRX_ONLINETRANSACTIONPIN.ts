
export interface IS_TRX_TRX_ONLINETRANSACTIONPIN {
    OTP_ID: number;
    TSM_TRNSACTIONID:string;
    TSM_FORMNO?: string;   
    OTP_PINCODE?: string;  
    ACC_CODE: number;  
    UOS_USERID?:string;  
    OTP_CREATEDON?: Date;   
    OTP_MODIFIEDON?: Date;    
    OTP_STATUS?:string;   
    OTP_EXPIRYDATE?:Date;
}
