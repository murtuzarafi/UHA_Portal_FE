export interface IS_UOS_MAPPEDACCOUNT {
   ACC_CODE: number;
   UOS_USERID:string;
   UMA_ACCOUNTSTATUS?: string;   
   UMA_EFFECTIVEFROM?: Date;  
   UMA_EFFECTIVETO?: Date;   
   UMA_CREATEDWHEN?: Date;   
   UMA_MODERATEDWHEN?: Date;   
   UMA_MODERATIONSTATUS?:string;  
   UMA_MODIFIEDBY?:string;   
   UMA_CREATEDBY?:string;   
   UMA_DIGITALSIGNATURE?:string;   
   UMA_MODERATEDBY?: string;  
   UMA_DEFAULT?:boolean;   
   ACC_TITLE?:string;  

}