export interface UnpaidInvestment {
    TransactionDate: string;
    TSM_TRNSACTIONID: string;
    Transactiontype: string;
    Status: string;
    Amount: number| null;
    Units: number | null;
    SourceFund: string;
    TSM_CREATEDON: string | null;
    Targetfund: string;
}