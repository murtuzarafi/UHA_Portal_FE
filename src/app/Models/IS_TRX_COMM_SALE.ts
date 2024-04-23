export interface IS_TRX_COMM_SALE {
    TSD_REQTRXID: string;
    TCM_COMMISSIONEEID: string;
    TCM_TRXCOMMISSIONID: string;
    TCM_ORGCOMMISSIONPERCENT: number;
    TCM_COMMISSIONPERCENT: number;
    TCM_COMMENTS: string | null;
    TCM_REBATEONSHARE: number | null;
    TCM_NET: number;
    TCM_INCENTIVE: number;
    PLD_SLABID: string | null;
    ALD_SLABID: number | null;
    TCM_VERSION: number | null;
    TCM_CREATEDON: Date | null;
    TCM_CREATEDBY: string;
    TCM_MODIFIEDON: string | null;
    TCM_MODIFIEDBY: string | null;
    TCM_DIGITALCERTIFICATE: string;
    TSTAMP: string;
    TRF_REQPLANFUNDID: string| null;
    PCM_RULEID: string;
}