export enum TransactionPinStatus {
  Generated = 1,
  Validated,
  Verified,
  Disabled
}

export enum PaymentStatus {
  OtherBankCleared,
  Entered,
  Corrected,
  Submitted,
  Verified,
  Cancelled
}

export enum PaymentState {
  Cleared,
  NotCleared,
  Cancelled,
  Verified,
}


export enum OnlineVoucherState
{
    Paid,
    UnPaid
}

export enum Client
{
    PICIC,
    ALFALAH,
    FAML,
    PAKOMAN
}

