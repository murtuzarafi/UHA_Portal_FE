import { IS_TRX_TRX_MASTER } from "./IS_TRX_TRX_MASTER";
import { IS_TRX_TRX_REQUESTED } from "./IS_TRX_TRX_REQUESTED";
import { IS_TRX_COMM_SALE } from "./IS_TRX_COMM_SALE";

export interface ConversionDetailsViewModel {
    
    _IS_TRX_TRX_MASTER: IS_TRX_TRX_MASTER;
    trxRequested: IS_TRX_TRX_REQUESTED[];
    lstCommSale: IS_TRX_COMM_SALE[];
}