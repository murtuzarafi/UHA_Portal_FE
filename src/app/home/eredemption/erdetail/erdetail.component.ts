import { Component, OnInit } from '@angular/core';
import { Userservice } from '../../../services/userservice.service'
import { NotificationService } from '../../../notification.service'
import { DataService } from '../../data.service';
import { RedemptionService } from '../../../services/RedemptionService'
import { IS_TRX_COMM_SALE } from 'src/app/Models/IS_TRX_COMM_SALE';
import { IS_TRX_PAY_PAYMENT } from 'src/app/Models/IS_TRX_PAY_PAYMENT';
import { IS_TRX_TRX_ONLINETRANSACTIONPIN } from 'src/app/Models/IS_TRX_TRX_ONLINETRANSACTIONPIN';
import { IS_TRX_TRX_MASTER } from 'src/app/Models/IS_TRX_TRX_MASTER';
import { IS_TRX_TRX_REQUESTED } from 'src/app/Models/IS_TRX_TRX_REQUESTED';
import { IS_ACC_PRODUCTPROFILE } from 'src/app/Models/IS_ACC_PRODUCTPROFILE';
import { TransactionPinStatus, PaymentState, PaymentStatus, } from '../../../Utilities';
import { v4 as uuidv4 } from 'uuid'
import { TransactionDetailsViewModel } from 'src/app/Models/TransactionDetailsViewModel';

@Component({
  selector: 'app-erdetail',
  templateUrl: './erdetail.component.html',
  styleUrls: ['./erdetail.component.scss']
})
export class ErdetailComponent implements OnInit {
  data: any[] = [];
  dateNow: Date = new Date();
  lstCommSale: IS_TRX_COMM_SALE[] = [] as IS_TRX_COMM_SALE[];
  lstpayment = {} as IS_TRX_PAY_PAYMENT
  userAccount: IS_TRX_TRX_ONLINETRANSACTIONPIN[] = [];
  _IS_TRX_TRX_GENSERVICESFEES: any;

  trxMaster: IS_TRX_TRX_MASTER[] = [];
  tbltrxRequested: IS_TRX_TRX_REQUESTED[] = [];
  trxRequested = {} as IS_TRX_TRX_REQUESTED
  AccountProfile = {} as IS_ACC_PRODUCTPROFILE
  _IS_TRX_TRX_MASTER = {} as IS_TRX_TRX_MASTER
  GeneralTypes: any

  IS_PRD_COMMISSIONMASTER: any
  dsBankAccountDetails: any
  dsBankBranchDetails: any
  _lstPrdCommBreakup: any
  dsProductAccount: any

  selectedProduct: any;
  trxGenservicesFee: any
  ds: any
  dstCurrency: any

  ACC_Code: string = ''
  UserId: string = ''
  Email: string = ''
  TrnsactionId = ''
  Genid: string = ''
  dsInstrument: any;

  result = false
  UserData!: any
  Tpin: string = ''
  displayStyle = "none";
  displayStyle2 = "none";

  filterFund: any
  dataDtl!: any
  productName: string = ""
  productAmount: number = 0

  txtRedemptionUnits: number = 0
  txtRedemptionAmount: number = 0
  RedeemableUnit: number = 0
  selectedOpt: any
  payMType: any
  PaymentMode: any
  filterPayModes: any

  AccSysCode: string = ''
  MgCompanyCode: string = ''
  fundCode: number = 0;

  reqAmount: number = 0;
  crr_Rate: number = 1.01;
  _formNumber: string = ''
  BNK_ID: number = 0;
  BBR_ID: number = 0;
  FAC_ACCOUNTNO: string = ''

  constructor(
    private http: Userservice,
    private notify: NotificationService,
    private dataService: DataService,
    private redempService: RedemptionService

  ) {

    //this.http.GetProductList(this.AccSysCode).subscribe((response) => {
    this.AccSysCode = dataService.getAccSystemCode()
    this.MgCompanyCode = dataService.getUserManagementCompany();
    //console.log('this.AccSysCode', this.AccSysCode)
    //console.log('this.MgCompanyCode', this.MgCompanyCode)

    this.redempService.GetRedemptionProductsWithManagmentCompany(this.AccSysCode, this.MgCompanyCode, 0).subscribe((response) => {
      this.dataDtl = response
      //console.log("Product Details :- ", this.dataDtl);
    });

    this.GetGenGeneralType();

    this.http.GetAcc_BankAccountDetails2(this.dataService.getAccSystemCode()).subscribe((response) => {
      this.dsBankAccountDetails = response
      ///////////////////////console.log('Call from constructor', this.dsBankAccountDetails)
    });
  }

  GetGenGeneralType() {
    this.GeneralTypes = this.redempService.GetGenGeneralType().subscribe((response) => {
      this.GeneralTypes = response
      //console.log('this.GeneralTypes', this.GeneralTypes)
    });
  }

  getManagementCompanies() {
    this.http.GetCurrency().subscribe((response) => {
      this.dstCurrency = response;
      //console.log('data array :-  ', this.dstCurrency);
    })
  }

  ngOnInit(): void {

    this.UserData = this.dataService.getData()
    this.ACC_Code = this.UserData[0].ACC_Code
    this.UserId = this.UserData[0].UserId
    this.Email = this.UserData[0].Email
    this.Genid = this.UserData[0].ACC_PAYMENTTYPE

    if (this.dsBankAccountDetails) {
      this.BNK_ID = this.dsBankAccountDetails[0].BNK_ID;
      this.BBR_ID = this.dsBankAccountDetails[0].BBR_ID;
      this.FAC_ACCOUNTNO = this.dsBankAccountDetails[0].FAC_ACCOUNTNO;
      this.dsBankBranchDetails = this.http.GetAcc_BankBranchDetails(this.BNK_ID, this.BBR_ID)
    }
    this.TrnsactionId = uuidv4();
    console.log('Transaction ID ', this.TrnsactionId)
  }

  onBlurEvent(event: any) {

    let reqAmount = event.target.value;
    let minInvestment = this.filterFund?.PUT_MININVESTMENTAMOUNT

    let minReInvestment = this.filterFund?.PUT_MINREINVESTMENTAMOUNT
    let balUnit = this.filterFund?.BALANACEUNITS
    this.RedeemableUnit = this.filterFund?.BALANACEUNITS

    this.filterFund.RequestedAmout = this.txtRedemptionAmount;
    this.filterFund.RequestedUNITS = this.txtRedemptionUnits
    this.selectedProduct = this.filterFund;
  }

  closePopup() {
    this.displayStyle = "none";
  }

  OpenPopup2() {
    //console.log('OpenPopup2()')
    this.displayStyle = "block";
    this.openPopup();
  }

  showOpenPopup() {
    //console.log('showOpenPopup()')
    this.displayStyle = "none";
    this.displayStyle2 = "block";
  }
  showClosePopup() {
    this.displayStyle2 = "none";
  }

  generateTpin(): void {
    this.Tpin = Math.floor(10000 * Math.random()).toString();
    console.log('this.Tpin', this.Tpin)

  }

  openPopup() {
    this.generateTpin();
    if (this.productName.length <= 0) {
      this.notify.showError('Product must be selected ', 'Error')
      this.closePopup()
      return
    }
    else if (!this.selectedOpt) {
      this.notify.showError('Redemption option must be selected', 'Error')
      this.closePopup()
      return
    }
    else if (this.selectedOpt == "rbtnByUnits" && this.txtRedemptionUnits <= 0) {
      this.notify.showError('Redemption units must be entered', 'Error')
      this.closePopup()
      return
    }
    else if (this.selectedOpt == "rbtnByAmount" && this.txtRedemptionAmount <= 0) {
      this.notify.showError('Redemption amount must be entered', 'Error')
      this.closePopup()
      return
    }
    this.sendPin()
  }

  sendPin() {
    this.generateTpin();
    this.result = this.http.SendEmailToInvester(this.Tpin, "amir.shaikh@sidathyder.com.pk") //this.Email //
    if (this.result === true) {
      {
        this._IS_TRX_TRX_GENSERVICESFEES = this.http.GetServiseFee(this.selectedProduct.FND_FUNDCODE, this.selectedProduct.RequestedAmout)
      }
    }
  }


  isAllSelected(item) {

    let DayID = new Date().toLocaleString('en-us', { weekday: 'long' })
    let PCT_CUTOFFTIME: string
    let PRD_PRODCODE: string
    this.filterFund = this.dataDtl.find(o => o.FND_FUNDCODE === item.FND_FUNDCODE);
    this.dataDtl.forEach(val => {
      if (val.FND_FUNDCODE == item.FND_FUNDCODE) {
        val.selected = !val.selected;
        this.productName = item.PRD_NAME
      }
      else {
        val.selected = false;
      }
    });
    this.ds = this.http.GetProductFundCutOffTimeWithProductCodeAndDayIDPaging(0, this.filterFund.FND_FUNDCODE, DayID)
    this.openTryFunction()
  }

  openTryFunction() {
    this.getProductDetails().then(() => {
      this.getBankBranchDetails().then(() => {
        this.getProductCommissionMaster().then(() => {
          this.getProductCommissionBreakup().then(() => {
            this.getInstDetails()
          })
        })
      })
    })
  }


  async getProductDetails() {
    return new Promise<void>((resolve) => {
      //this.dsProductAccount = this.http.GetIS_PRD_PRODUCTACCOUNT_Details(this.filterFund.PRD_PRODUCTCODE)
      this.http.GetIS_PRD_PRODUCTACCOUNT_Details(this.filterFund.PRD_PRODUCTCODE).subscribe((res) => {
        this.dsProductAccount = res
        console.log('RESOLVED ', this.dsProductAccount)

        this.BNK_ID = this.dsProductAccount[0].BNK_ID;
        this.BBR_ID = this.dsProductAccount[0].BBR_ID;
        this.FAC_ACCOUNTNO = this.dsProductAccount[0].FAC_ACCOUNTNO;
        //console.log(this.dsProductAccount[0].FAC_ACCOUNTNO)

      });
      resolve();

    });

  }

  getInstDetails() {
    if (this.Genid) {
      this.http.GetInstrumentDetails(this.Genid).subscribe((res) => {
        this.dsInstrument = res
        //console.log('GetInstrumentDetails:- ', this.dsInstrument)
      });
    }
    else {
      this.http.GetDefaultInstrumentDetails().subscribe((res) => {
        this.dsInstrument = res
        //  console.log('GetDefaultInstrumentDetails:- ', this.dsInstrument)
      });

      //  console.log('Instrument ID ', this.dsInstrument.)
    }
  }

  async getBankBranchDetails() {
    this.BNK_ID = this.dsBankAccountDetails[0].BNK_ID;
    this.BBR_ID = this.dsBankAccountDetails[0].BBR_ID;
    this.http.GetAcc_BankBranchDetails2(this.BNK_ID, this.BBR_ID).subscribe((response) => {
      this.dsBankBranchDetails = response
      ///////////////////////console.log('Bank Branch Details:- ', this.dsBankBranchDetails)
    });
  }

  async getProductCommissionMaster() {

    this.IS_PRD_COMMISSIONMASTER = this.http.GetProductCommissionMaster(
      'OEIT',
      this.filterFund.PRD_PRODUCTCODE,//'dc009de6-1a13-4dc9-a593-192bd60b19b0',
      '', //this.filterFund.PUC_CLASSCODE,
      '' //this.filterFund.PUT_TYPENAME
    );
    if (this.IS_PRD_COMMISSIONMASTER)
      console.log('GET OMMISSION MASTER', this.IS_PRD_COMMISSIONMASTER)
    else
      console.log('GET OMMISSION MASTER EMPTY')
  }

  getProductCommissionBreakup() {
    return new Promise<void>((resolve) => {
      if (this.IS_PRD_COMMISSIONMASTER) {
        this._lstPrdCommBreakup = this.http.GetProductCommissionBreakup(this.IS_PRD_COMMISSIONMASTER[0].PCM_RULEID)
      }
      else {
        console.log('lst PrdComm Breakup not fetched because COMMISSION MASTER IS EMPTY:- ')
      }

      resolve();
    });

  }

  onChanged(e: any) {
    this.selectedOpt = e.target.id
    console.log('Selected Text :- ', this.selectedOpt)
  }

  onChangedPayMType(e: any) {    
    console.log('on Changed PayMType  :- ', e.target.id)
    this.payMType = e.target.id
    this.PaymentMode = e.target.value
    this.filterPayModes = this.GeneralTypes.find(o => o.GEN_NAME === this.PaymentMode);
    console.log('Selected Text :- ', this.filterPayModes)
  }

  ValidateRequest(rdoId: string): boolean {
    let RedmableUNITS: Number = 0;
    let RequestedAmount: string = '';
    RedmableUNITS = 999

    /*
        if (!this.payMType) {
          this.notify.showError("Please select payment type.", "Error")
        }
    */
    if (rdoId == 'rbtnByUnits') {
      let RedemptionUnits: number = 0
      let BalanceUnits: number = 0
      let RedemableUNITS: number = 0

      BalanceUnits = this.filterFund?.BALANACEUNITS != null ? this.filterFund?.BALANACEUNITS : 0
      if (this.txtRedemptionUnits == 0) {
        this.notify.showError("Please enter units to redeem.", "Error")
      }
      if (this.txtRedemptionUnits > this.RedeemableUnit) {
        this.notify.showError("Redemption units should not be greater than 'Redemable Units'.", "Error")
      }
    }
    else if (rdoId == 'rbtnByAmount') {
      if (this.txtRedemptionAmount == 0) {
        this.notify.showError("Please enter amount to redeem.", "Error")
      }
    }
    else if (rdoId == 'rbtnEntire') {
    }
    return true; // ✅ allowed
  }


  onSubmit(TPinForm) {
    if (this.Tpin == TPinForm.value.TPin) {
      console.log('Pin Matched', TPinForm.value);
      var _IS_TRX_TRX_ONLINETRANSACTIONPIN = {} as IS_TRX_TRX_ONLINETRANSACTIONPIN
      //this._formNumber = "OEIT_" +  this.ACC_Code + "_" + new Date().toLocaleString()

      //console.log('Account code ', this.UserData)

      _IS_TRX_TRX_ONLINETRANSACTIONPIN.ACC_CODE = parseInt(this.ACC_Code);
      _IS_TRX_TRX_ONLINETRANSACTIONPIN.OTP_PINCODE = this.Tpin;
      _IS_TRX_TRX_ONLINETRANSACTIONPIN.TSM_FORMNO = "OEIT_" + this.ACC_Code + "_" + new Date().toLocaleString();;
      _IS_TRX_TRX_ONLINETRANSACTIONPIN.TSM_TRNSACTIONID = this.TrnsactionId //////////////uuidv4();
      //this.TrnsactionId = _IS_TRX_TRX_ONLINETRANSACTIONPIN.TSM_TRNSACTIONID
      _IS_TRX_TRX_ONLINETRANSACTIONPIN.UOS_USERID = this.UserData[0].UserId;
      //_IS_TRX_TRX_ONLINETRANSACTIONPIN.OTP_CREATEDON =  
      _IS_TRX_TRX_ONLINETRANSACTIONPIN.OTP_STATUS = TransactionPinStatus.Generated.toString();
      //_IS_TRX_TRX_ONLINETRANSACTIONPIN.OTP_EXPIRYDATE = Date.now;

      this.http.InsertOnlineTransactionPIN(_IS_TRX_TRX_ONLINETRANSACTIONPIN).subscribe(res => {
        //console.log('Response Component', res)
        if (res == 1){
          this.notify.showSuccess('Transaction save successfully', 'Success')
          this.showClosePopup()
        }
        else {
          this.notify.showError('something went wrong while saving transaction', 'Error')
          this.showClosePopup()
        }
      });

    }
    else {
      //console.log('Else ', this.Tpin);
    }
  }

  SendRequest() {

    console.log('Inside Send Request Method  :- ')

    let DayID = new Date().toLocaleString('en-us', { weekday: 'long' })
    let PCT_CUTOFFTIME: string
    let PRD_PRODCODE = this.filterFund.FND_FUNDCODE;
    //Utilities._isSuccess = false;
    let _isSuccess = true;

    if (this.UserData[0].ACC_Code.toString() == null || this.UserData[0].ACC_Code.toString() == "") {
      this.notify.showError("User Session time out. Please login.", Error)
      return
    }

    //this.ds = this.http.GetProductFundCutOffTimeWithProductCodeAndDayIDPaging(0, PRD_PRODCODE, DayID)

    if (typeof this.ds !== 'undefined') {
      PCT_CUTOFFTIME = this.ds.PCT_CUTOFFTIME;
    }

    //#region SSA Limit Checking For SSA
    //console.log('ACC_ISSSAACCOUNT :- ', this.UserData[0].ACC_ISSSAACCOUNT)
    if (this.UserData[0].ACC_ISSSAACCOUNT.toString() == 1) {
      if (this.ValidateTransactionLimitSSA() == false) {
        return;
      }
    }
    //#endregion


    if (_isSuccess) {
      this.sendTransactionObjects()
      //this.SetTransactionMasterObject()
      //this.SetTransactionRequested(this._IS_TRX_TRX_MASTER)
      // this.postData()

    }

  }

  sendTransactionObjects() {
    //this.getProductDetails().then(() => {
    //console.log('GetIS_PRD_PRODUCTACCOUNT_Details:- ', this.dsProductAccount)
    this.SetTransactionMasterObject().then(() => {
      this.SetTransactionRequested(this._IS_TRX_TRX_MASTER).then(() => {
        this.ApplyCommission(this.trxRequested, this._IS_TRX_TRX_MASTER).then(() => {
          this.SetPaymentObject(this._IS_TRX_TRX_MASTER, this.trxRequested).then(() => {
            this.postData().then(() => { console.log('calling post') })
          })
        })
      })
    })
    //})
  }

  SetTransactionMasterObject() {
    return new Promise<void>((resolve) => {
      console.log('INside Trx Master  method ') //addTrxMaster

      this._IS_TRX_TRX_MASTER.TSM_USERTRXCODE = "1"
      this._IS_TRX_TRX_MASTER.TSM_YEARTRXCOUNT = 1
      this._IS_TRX_TRX_MASTER.TSM_PERIODTRXCOUNT = 1
      this._IS_TRX_TRX_MASTER.ACC_SYSTEMCODE = this.UserData[0].ACC_SYSTEMCODE.toString();
      this._IS_TRX_TRX_MASTER.DSB_ID = this.UserData[0].DSB_ID;
      this._IS_TRX_TRX_MASTER.DST_ID = this.UserData[0].DST_ID;
      this._IS_TRX_TRX_MASTER.TSM_ACCOUNTCODE = parseInt(this.ACC_Code);
      this._IS_TRX_TRX_MASTER.TSM_ACCOUNTTYPE = this.UserData[0].ACC_ACCOUNTTYPE;
      this._IS_TRX_TRX_MASTER.TSM_AGENTCODE = this.UserData[0].FAC_ID;
      this._IS_TRX_TRX_MASTER.TSM_FORMNO = "OERN_" + this.UserData[0].ACC_Code + "_" + new Date().toLocaleString();
      this._IS_TRX_TRX_MASTER.TSM_COMMENTS = "Online Transaction";
      this._IS_TRX_TRX_MASTER.TSM_TRXDATE = this.cutOffTransactionDate()
      //string Time = TransactionDetailControl1.Time.Value.ToString("HH:mm").Replace(':', ' ').Replace(" ", "");
      this._IS_TRX_TRX_MASTER.TSM_TRXTIME = 1// for tesing only
      this._IS_TRX_TRX_MASTER.TSM_TRXTYPE = "RN"
      this._IS_TRX_TRX_MASTER.CUS_CODE = null
      this._IS_TRX_TRX_MASTER.TSM_TRXNAME = "Redemption"
      this._IS_TRX_TRX_MASTER.TSM_STATUS = "Submitted"
      this._IS_TRX_TRX_MASTER.TSM_ISONLINE = 1
      this._IS_TRX_TRX_MASTER.CLP_PERIOD = null
      this._IS_TRX_TRX_MASTER.CLY_YEAR = null
      this._IS_TRX_TRX_MASTER.TSM_TRNSACTIONID = this.TrnsactionId

      // console.log('IS_TRX_TRX_MASTER OBJECT :- ', this._IS_TRX_TRX_MASTER)
      // SAVE TRX MASTER TRANSACTION 
      ///////////////////////////////////////this.http.AddTrxMaster(this._IS_TRX_TRX_MASTER)
      //Set requested object  
      ////////////////////////this.SetTransactionRequested(this._IS_TRX_TRX_MASTER);

      //this.http.CreateTransactionSaleCommission(this.lstCommSale)
      //this.SetPaymentObject( this._IS_TRX_TRX_MASTER, this.trxRequested/*, trxOnlineVoucher*/);
      console.log('INside Trx Master  method END ') //addTrxMaster
      resolve();
    });
  }
  
  SetTransactionRequested(trxMaster: IS_TRX_TRX_MASTER) {

    return new Promise<void>((resolve) => {
      console.log('Inside Set Transaction Requested Method :- ');

      if (this.selectedProduct) {
        let PRP_PROFILEID = this.selectedProduct.PRP_PROFILEID;
        if (PRP_PROFILEID) {
          //_IS_ACC_PRODUCTPROFILE = SetAccountPro(trxMaster);
        }

        this.trxRequested.TSM_TRNSACTIONID = trxMaster.TSM_TRNSACTIONID;
        this.trxRequested.TSD_REQTRXID = uuidv4()
        this.trxRequested.ACC_SYSTEMCODE = trxMaster.ACC_SYSTEMCODE;
        this.trxRequested.DSB_ID = trxMaster.DSB_ID;
        this.trxRequested.DST_ID = trxMaster.DST_ID;
        this.trxRequested.TSD_REDEEMPERCENT = 0;
        this.trxRequested.TSD_REBATEPERCENT = 0;
        this.trxRequested.TSD_ISNAVANNOUNCED = 0;
        this.trxRequested.TSD_NAV = 0;
        this.trxRequested.CLP_PERIOD = trxMaster.CLP_PERIOD
        this.trxRequested.CLY_YEAR = trxMaster.CLY_YEAR
        this.trxRequested.TSD_TRXTYPE = trxMaster.TSM_TRXTYPE;
        this.trxRequested.TSD_TRXNAME = trxMaster.TSM_TRXNAME;
        this.trxRequested.TSD_REDEEMOUTBY = "";
        //trxRequested.PRP_PROFILEID = string.IsNullOrEmpty(PRP_PROFILEID) ? _IS_ACC_PRODUCTPROFILE.PRP_PROFILEID : Convert.ToString(item["PRP_PROFILEID"]);
        if (this.selectedProduct.FND_FUNDID) {
          this.trxRequested.FND_FUNDID = this.selectedProduct.PRD_PRODUCTCODE
          this.trxRequested.PRD_PLANID = null
        }
        else {
          this.trxRequested.FND_FUNDID = this.selectedProduct.PRD_PRODUCTCODE
          this.trxRequested.PRD_PLANID = null
        }

        this.trxRequested.PUC_CLASSCODE = this.selectedProduct.PUC_CLASSCODE
        this.trxRequested.PUT_TYPENAME = this.selectedProduct.PUT_TYPENAME
        this.trxRequested.PRD_FUNDCODE = parseInt(this.selectedProduct.FND_FUNDCODE);
        this.trxRequested.TSD_ISENTIREOUT = 0;
        this.trxRequested.TSD_TRXAMOUNTIN = this.selectedProduct.RequestedAmount
        this.trxRequested.TSD_TRXUNITSIN = 0;


        if (!this.txtRedemptionUnits)
          this.trxRequested.TSD_TRXUNITSOUT = this.txtRedemptionUnits

        if (!this.txtRedemptionAmount)
          this.trxRequested.TSD_TRXAMOUNTOUT = this.txtRedemptionAmount

        if (this.selectedProduct.TSD_AMOUNTPRECISION)
          this.trxRequested.TSD_AMOUNTPRECISION = parseInt(this.selectedProduct.TSD_AMOUNTPRECISION)
        else
          this.trxRequested.TSD_AMOUNTPRECISION

        this.trxRequested.TSD_AMOUNTPRECISIONMETHOD = this.selectedProduct.TSD_AMOUNTPRECISIONMETHOD
        if (this.selectedProduct.TSD_NAVPRECISION)
          this.trxRequested.TSD_NAVPRECISION = parseInt(this.selectedProduct.TSD_NAVPRECISION)
        else
          this.trxRequested.TSD_NAVPRECISION = 0

        this.trxRequested.TSD_NAVPRECISIONMETHOD = this.selectedProduct.TSD_NAVPRECISIONMETHOD
        if (this.selectedProduct.TSD_PRICEPRECISION)
          this.trxRequested.TSD_PRICEPRECISION = parseInt(this.selectedProduct.TSD_PRICEPRECISION)
        else
          this.trxRequested.TSD_PRICEPRECISION = 0

        this.trxRequested.TSD_PRICEPRECISIONMETHOD = this.selectedProduct.TSD_PRICEPRECISIONMETHOD
        if (this.selectedProduct.TSD_UNITPRECISION)
          this.trxRequested.TSD_UNITPRECISION = parseInt(this.selectedProduct.TSD_UNITPRECISION)
        else
          this.trxRequested.TSD_UNITPRECISION = 0

        this.trxRequested.TSD_UNITPRECISIONMETHOD = this.selectedProduct.TSD_UNITPRECISIONMETHOD

        if (this.selectedProduct.TSD_ISISLAMIC)
          this.trxRequested.TSD_ISISLAMIC = parseInt(this.selectedProduct.TSD_ISISLAMIC)
        else
          this.trxRequested.TSD_ISISLAMIC = 0

        this.trxRequested.TSD_TRUSTEECODE = this.selectedProduct.TSD_TRUSTEECODE
        this.trxRequested.TSD_AUDITORCODE = this.selectedProduct.TSD_AUDITORCODE
        if (this.selectedProduct.TSD_REPURCHASEPRICEPRECISION)
          this.trxRequested.TSD_REPURCHASEPRICEPRECISION = parseInt(this.selectedProduct.TSD_REPURCHASEPRICEPRECISION)
        else
          this.trxRequested.TSD_REPURCHASEPRICEPRECISION = 0

        this.trxRequested.TSD_REPURCHASEPRICEPRECISIONMETHOD = this.selectedProduct.TSD_REPURCHASEPRICEPRECISIONMETHOD
        this.trxRequested.TSD_SERVICEFEE = 0;//Convert.ToDecimal(lblTransactionCharges.Text);


        this.trxRequested.PRP_PROFILEID = ""
        this.trxRequested.TSD_TRXAMOUNTOUT = 0
        this.trxRequested.TSD_TRXUNITSOUT = 0
        this.trxRequested.TSD_PRDCURRENCYSYMBOL = ""
        this.trxRequested.TSD_DIGITALCERTIFICATE = ""
        ///this.trxRequested.PRD_PLANID = ""
        this.trxRequested.TSD_AMOUNTPRECISIONMETHOD = ""
        this.trxRequested.TSD_NAVPRECISIONMETHOD = ""
        this.trxRequested.TSD_PRICEPRECISIONMETHOD = ""
        this.trxRequested.TSD_UNITPRECISIONMETHOD = ""
        this.trxRequested.TSD_REPURCHASEPRICEPRECISIONMETHOD = ""
        this.trxRequested.TSD_PREMIUMAMOUNT = 0
        this.trxRequested.TSD_INSSCHID = ""
        this.trxRequested.PRD_TABLEID = 0
        this.trxRequested.PRD_PLANCODE = 0
        this.trxRequested.TSD_TRXAMOUNTIN = 0
        this.trxRequested.TSD_TRUSTEECODE = ""
        this.trxRequested.TSD_AUDITORCODE = ""
        this.trxRequested.TSD_GROSSCOMMISSION = 0
        this.trxRequested.TSD_NAVID = ""
        this.trxRequested.CRR_ID = ""
        this.trxRequested.CRR_BUYCONRATE = 0
        this.trxRequested.TSD_TRXAMOUNTIN_CRR = 0
        this.trxRequested.TSD_TRXUNITSIN_CRR = 0

        //Commission _comm = new Commission();
        ///////////////////////this.ApplyCommission(this.trxRequested, trxMaster);
        console.log('Inside Set Transaction Requested Method END :- ');
      }
      resolve();
    });
  }
  ApplyCommission(_IS_TRX_TRX_REQUESTED: IS_TRX_TRX_REQUESTED, _IS_TRX_TRX_MASTER: IS_TRX_TRX_MASTER) {
    return new Promise<void>((resolve) => {
      console.log('INSIDE ApplyCommission METHOD :-')

      //#region 
      /*
      const _IS_PRD_COMMISSIONMASTER = this.http.GetProductCommissionMaster(

        _IS_TRX_TRX_REQUESTED.TSD_TRXTYPE,
        _IS_TRX_TRX_REQUESTED.FND_FUNDID,
        _IS_TRX_TRX_REQUESTED.PUC_CLASSCODE,
        _IS_TRX_TRX_REQUESTED.PUT_TYPENAME);
        
        let _lstPrdCommBreakup = this.http.GetProductCommissionBreakup(_IS_PRD_COMMISSIONMASTER[0].PCM_RULEID);
        */
      //#endregion




      if (this._lstPrdCommBreakup) {

        var _commSale = {} as IS_TRX_COMM_SALE

        _commSale.TSD_REQTRXID = _IS_TRX_TRX_REQUESTED.TSD_REQTRXID;
        _commSale.TCM_COMMISSIONEEID = this._lstPrdCommBreakup.PCB_COMMISSIONEEID;
        _commSale.TCM_TRXCOMMISSIONID = uuidv4()
        _commSale.TCM_ORGCOMMISSIONPERCENT = this._lstPrdCommBreakup.PCB_LOADSHAER;
        _commSale.TCM_COMMISSIONPERCENT = this._lstPrdCommBreakup.PCB_LOADSHAER;
        _commSale.TCM_COMMENTS = null;
        //if (string.IsNullOrEmpty(Convert.ToString(_IS_TRX_TRX_MASTER.TSM_FACILITATORREBATE)))
        //_commSale.TCM_REBATEONSHARE = (_lstPrdCommBreakup[0].PCB_LOADSHAER / 100) * _IS_TRX_TRX_MASTER.TSM_FACILITATORREBATE;
        _commSale.TCM_REBATEONSHARE = 0;
        _commSale.TCM_REBATEONSHARE = 0;
        _commSale.TCM_NET = _commSale.TCM_REBATEONSHARE;
        _commSale.TCM_INCENTIVE = 0;
        _commSale.ALD_SLABID = null;
        _commSale.PLD_SLABID = null;
        _commSale.TCM_VERSION = 1;
        _commSale.TCM_CREATEDON = new Date;
        _commSale.TCM_CREATEDBY = "Online User";
        _commSale.TCM_MODIFIEDON = null;
        _commSale.TCM_MODIFIEDBY = null;
        _commSale.TCM_DIGITALCERTIFICATE = "???";
        _commSale.TRF_REQPLANFUNDID = null;
        _commSale.PCM_RULEID = this._lstPrdCommBreakup.PCM_RULEID;

        this.lstCommSale.push(_commSale);
      }
      resolve()
      console.log('INSIDE ApplyCommission METHOD END :-')
    });
  }

  SetPaymentObject(_master: IS_TRX_TRX_MASTER, _requested: IS_TRX_TRX_REQUESTED) {
    console.log('INSIDE Set Payment Method  ')

    return new Promise<void>((resolve) => {

      let ABA_ACCOUNRCODE: string;
      let ABA_ACCOUNTTITLE: string;
      let GenID: string;
      let GEN_NAME: string;
      let username: string;

      username = this.UserData[0].UserId;

      /*
      let dsBankAccountDetails 
      this.http.GetAcc_BankAccountDetails(this.UserData[0].ACC_SYSTEMCODE).subscribe((res) => {
        dsBankAccountDetails = res
        console.log('GetAcc_BankAccountDetails:- ', dsInstrument)
      });
  */
      ABA_ACCOUNRCODE = this.dsBankAccountDetails.ABA_ACCOUNTCODE;
      ABA_ACCOUNTTITLE = this.dsBankAccountDetails.ABA_ACCOUNTTITLE;
      //BNK_ID = this.dsBankAccountDetails[0].BNK_ID;
      //BBR_ID = this.dsBankAccountDetails[0].BBR_ID;

      //let dsBankBranchDetails = this.http.GetAcc_BankBranchDetails(BNK_ID, BBR_ID);

      if (this.selectedProduct) {

        //let dsProductAccount: any
        /*
        this.http.GetIS_PRD_PRODUCTACCOUNT_Details(this.selectedProduct[0].FND_FUNDID).subscribe((res) => {
          dsProductAccount = res
          console.log('GetIS_PRD_PRODUCTACCOUNT_Details:- ', dsProductAccount)
        });
      */

        var trxPayment = {} as IS_TRX_PAY_PAYMENT
        //this.PaymentMode

        trxPayment.TSM_TRNSACTIONID = _master.TSM_TRNSACTIONID
        trxPayment.PMT_PAYMENTROWID = uuidv4()
        trxPayment.PMT_TRANSACTIONTYPE = "RN"
        trxPayment.CLY_YEAR = 1
        trxPayment.CLP_PERIOD = 1
        trxPayment.PMT_INSTTYPE = this.filterPayModes.GEN_ID
        trxPayment.PMT_INSTNAME = this.filterPayModes.GEN_NAME
        ///////////////trxPayment.PMT_INSTNUMBER = Convert.ToString(Utilities.CreateNewVoucher(activeAccount.ACC_CODE.ToString(), FundCode).ToString());
        trxPayment.PMT_INSTDATE = new Date
        trxPayment.PMT_INSTTIME = 0
        trxPayment.PMT_INSTACCODE = ABA_ACCOUNRCODE
        trxPayment.PMT_INSTBANKCODE = this.BNK_ID;
        trxPayment.PMT_INSTBANKBRCODE = this.BBR_ID;
        trxPayment.PMT_SLIPNO = this._formNumber;
        //trxPayment.PMT_REALIZEDATE = ;
        trxPayment.PMT_REALIZETIME = 0;
        //trxPayment.PMT_CANCELDATE = ;
        trxPayment.PMT_CANCELTIME = 0;
        trxPayment.PMT_PAYMENTSTATE = PaymentState.NotCleared.toString();
        trxPayment.PMT_STATUS = PaymentStatus.Entered.toString();
        // trxPayment.PMT_EXECUTEDBY =;
        //trxPayment.PMT_EXECUTEDON =;
        //trxPayment.PMT_EXECUTIONSTATUS = ;
        //trxPayment.PMT_COMMENT = ;
        trxPayment.PMT_PAYMENTCURRSYMBOL = "PKR";
        //trxPayment.PMT_CONVDATE = ;
        trxPayment.PMT_CONVRATE = 0;
        trxPayment.PMT_REVISIONNO = 0;
        trxPayment.PMT_ISAUTORECONCILED = 0;
        trxPayment.PMT_CREATEDBY = username;
        trxPayment.PMT_CREATEDON = new Date;
        // trxPayment.PMT_MODIFIEDON = ;
        // trxPayment.PMT_MODIFIEDBY = ;
        //trxPayment.PMT_DIGITALSIGNATURE = ;
        //  trxPayment.CAC_ACCOUNTID = ;
        trxPayment.PMT_PAYMENTAMOUNT = 99999999; //Convert.ToDecimal(lblTotalInvestedAmount.Text);
        //trxPayment.PMT_PRDCURRSYMBOL = ;
        trxPayment.PMT_CONERTEDAMOUNT = 0;
        // trxPayment.PMT_EXECUTIONSENTTO = ;
        // trxPayment.PMT_VERIFIEDBY = ;
        // trxPayment.PMT_VERIFIEDON = ;
        trxPayment.PMT_ISVERIFIED = 0;
        trxPayment.PMT_ISIMPORTED = 0;
        /*
              debugger
              if (this.dsProductAccount) {
                console.log('RESOLVED ', this.dsProductAccount)
                //////////////trxPayment.PRD_PRODUCTCODE = this.dsProductAccount.PRD_PRODUCTCODE
                trxPayment.BNK_ID = this.dsProductAccount.BNK_ID;        //Table--->IS_PRD_PRODUCTACCOUNT  -->BNK_ID
                trxPayment.BBR_ID = this.dsProductAccount.BBR_ID       // Table--->IS_PRD_PRODUCTACCOUNT  -->BBR_ID
                trxPayment.FAC_ACCOUNTNO = this.dsProductAccount.FAC_ACCOUNTNO;       // IS_PRD_PRODUCTACCOUNT  -->FAC_ACCOUNTNO
              }
              else
              {
                trxPayment.BNK_ID = this.BNK_ID;        //Table--->IS_PRD_PRODUCTACCOUNT  -->BNK_ID
                trxPayment.BBR_ID = this.BBR_ID       // Table--->IS_PRD_PRODUCTACCOUNT  -->BBR_ID
                trxPayment.FAC_ACCOUNTNO = this.FAC_ACCOUNTNO;       // IS_PRD_PRODUCTACCOUNT  -->FAC_ACCOUNTNO
      
              }
      */

        trxPayment.PMT_INSTACTITLE = ABA_ACCOUNTTITLE;
        //  trxPayment.PMT_PRCNUMBER = ;
        // trxPayment.TSD_REQTRXID =  ;
        // trxPayment.TRF_REQPLANFUNDID = ;
        trxPayment.PMT_INSTOTHERBANK = 0;


        trxPayment.PMT_INSTNUMBER = ""
        trxPayment.PMT_INSTACCODE = ""
        trxPayment.PMT_REALIZEDATE = new Date
        trxPayment.PMT_CANCELDATE = new Date
        trxPayment.PMT_EXECUTEDBY = ""
        trxPayment.PMT_EXECUTEDON = null
        trxPayment.PMT_EXECUTIONSTATUS = ""
        trxPayment.PMT_COMMENT = ""
        trxPayment.PMT_CONVDATE = new Date
        trxPayment.PMT_MODIFIEDON = null
        trxPayment.PMT_MODIFIEDBY = ""
        trxPayment.PMT_DIGITALSIGNATURE = ""
        trxPayment.CAC_ACCOUNTID = null
        trxPayment.PMT_PRDCURRSYMBOL = ""
        trxPayment.PMT_EXECUTIONSENTTO = ""
        trxPayment.PMT_VERIFIEDBY = ""
        trxPayment.PMT_VERIFIEDON = null
        trxPayment.PRD_PRODUCTCODE = this.filterFund.PRD_PRODUCTCODE
        trxPayment.BNK_ID = this.BNK_ID
        trxPayment.BBR_ID = this.BBR_ID
        trxPayment.FAC_ACCOUNTNO = this.FAC_ACCOUNTNO
        trxPayment.PMT_INSTACTITLE = ""
        trxPayment.PMT_PRCNUMBER = ""
        trxPayment.TRF_REQPLANFUNDID = ""

        ///this.lstpayment.push(trxPayment)
        this.lstpayment = trxPayment
      }
      console.log('INSIDE Set Payment Method  END ')
      resolve();
    });

  }

  setAccountPro(trxMaster: IS_TRX_TRX_MASTER) {
    /*
        foreach(GridViewRow item in gvProducts.GetGridView().Rows)
        {
          CheckBox chk = item.FindControl("chkSelect") as CheckBox;
          if (chk.Checked) {
            selectedRow = item;
            break;
          }
        }
    */

    let PRD_PRODUCTCODE: string = this.selectedProduct.PRD_PRODUCTCODE
    let PUC_CLASSCODE: string = this.selectedProduct.PUC_CLASSCODE
    let PUT_TYPENAME: string = this.selectedProduct.PUT_TYPENAME
    let FND_FUNDCODE: number = this.selectedProduct.FND_FUNDCODE
    //this._formNumber = "OEIT_" + trxMaster.TSM_ACCOUNTCODE + "_" + new Date().toLocaleString()

    //var AccountProfile = {} as IS_ACC_PRODUCTPROFILE

    this.AccountProfile.PRP_PROFILEID = uuidv4();
    this.AccountProfile.PRD_PRODUCTID = PRD_PRODUCTCODE;

    this.AccountProfile.ACC_SYSTEMCODE = trxMaster.ACC_SYSTEMCODE;
    this.AccountProfile.ACC_CODE = trxMaster.TSM_ACCOUNTCODE;

    //if (activeAccount != null)
    //{
    //    AccountProfile.ACC_CODE = activeAccount.ACC_CODE;
    //}
    //AccountProfile.ACC_CODE = activeAccount.ACC_CODE;

    this.AccountProfile.FND_FUNDCODE = FND_FUNDCODE;
    this.AccountProfile.PUC_CLASSCODE = PUC_CLASSCODE;
    this.AccountProfile.PUT_UNITTYPE = PUT_TYPENAME;
    this.AccountProfile.PRP_FIXEDINCOME = 0;
    this.AccountProfile.PRP_ISZEROBALANCE = false;
    this.AccountProfile.PRP_STATUS = "Active";
    this.AccountProfile.PRP_PROFILECREATEDON = new Date;
    this.AccountProfile.PRP_CREATEDON = null;
    this.AccountProfile.PRP_CREATEDBY = "Online User";
    this.AccountProfile.PRP_DIGITALCERTIFICATE = "???";
    this.AccountProfile.PRP_VERSION = 1;
    this.AccountProfile.PRP_OPTIONMETHOD = "Both";

    //UOSDataAccess.Transaction objTransaction = new UOSDataAccess.Transaction();
    //objTransaction.CreteAccountProfileTransaction(AccountProfile);
    return this.AccountProfile;
  }

  postData() {

    if (this.ValidateRequest(this.selectedOpt)) 
      console.log("Oops something  went wrong", this.lstCommSale)

      if (this.lstCommSale)
        console.log("INSIDE COMMISSION DATA METHOD :- ", this.lstCommSale)
      ///console.log("INSIDE POST PAYMENT DATA METHOD :- " , this.lstpayment)
      const abc = {} as TransactionDetailsViewModel
      return new Promise<void>((resolve) => {
        
        abc._IS_TRX_TRX_MASTER = this._IS_TRX_TRX_MASTER
        abc.trxRequested = this.trxRequested
        abc.lstpayment = this.lstpayment
        
        if (this.lstCommSale.length > 0)
          this.data.push(this.lstCommSale)
        
          console.log("INSIDE POST DATA METHOD :- END ")
          /*
        this.http.SaveTransations(abc).subscribe((res) => {
          console.log('Request sent successfully', res)
          //this.notify.showSuccess('Request sent successfully', 'Save')
        });
        */
        this.http.SaveTransations(abc).subscribe((res)=>{
          if (res == 1)
            this.notify.showSuccess('Save Conversion transaction successfully', 'Success')
          else {
            this.notify.showError('something went wrong while saving transaction', 'Error')
            this.closePopup()
          }
        });
        resolve();
      });
    
  }

  ValidateTransactionLimitSSA(): boolean {
    let result: boolean = false
    let _isSuccess: number = 1;
    let _SSA_ID = this.UserData[0].SSA_ID
    let _ACC_Code = this.UserData[0].ACC_CODE

    const dtLimitAmountsSSA = this.http.GetLimitAmountsSSA(_SSA_ID, new Date())

    if (dtLimitAmountsSSA) {
      let MAXHOLDINGAMOUNT = dtLimitAmountsSSA[0].SAL_MAXHOLDINGAMOUNT
      let PerDayLimitAmount = dtLimitAmountsSSA[0].SAL_PERDAYAMOUNTLIMIT
      let PerTranLimitAmount = dtLimitAmountsSSA[0].SAL_PERTRXAMOUNTLIMIT
      let PERTRXCOUNTLIMIT = dtLimitAmountsSSA[0].SAL_PERTRXCOUNTLIMIT
      let InvestAmt = this.selectedProduct.RequestedAmount

      if (InvestAmt > PerTranLimitAmount) {
        this.notify.showError("Total Investment amount is greater than Per Day Transaction  Limit Amount.", "Error")
        _isSuccess = 0;
        return false;
      }

      if (_isSuccess == 1) {
        const dtTransactionCountLimit = this.http.GetTransactionCountLimit(_ACC_Code, new Date());
        if (dtTransactionCountLimit) {
          this.notify.showError("Per Day Transaction count limit has been exceeded.", "Error")
          _isSuccess = 0;
          return false;
        }
      }

      if (_isSuccess == 1) {
        const dtCurrentHolding = this.http.GetCurrentHoldingAmountTrxProcessed(_ACC_Code, new Date());
        if (dtCurrentHolding) {
          //BalanceAmount = Convert.ToDecimal(dtCurrentHolding.Rows[0]["Balance"]);
          let BalanceAmount: number = 100
          if (BalanceAmount > MAXHOLDINGAMOUNT) {
            this.notify.showError("Total Investment amount has been exceeded by Max Invstment Limit.", "Error")
            _isSuccess = 0;
            return false;
          }
        }
      }
      if (_isSuccess == 1) {
        let RequestedAmount: number = 0;
        const dtRequestedAmount = this.http.GetInvestorRequestedAmtForPerDayLimit(_ACC_Code, new Date());
        if (dtRequestedAmount) {
          RequestedAmount = dtRequestedAmount[0].RequestedAmount
          RequestedAmount = RequestedAmount + InvestAmt;
        }
        if (RequestedAmount > PerDayLimitAmount) {
          this.notify.showError("Requested Amount is greater than Per Day Limit Amount.  ", "Error")
          _isSuccess = 0;
          return false;
        }
      }
    }
    else {
      this.notify.showError("No Transaction Limit Found", "Error")
      return false;
    }
    return true
  }

  cutOffTransactionDate(): string {
    return new Date().getFullYear() + '-' + ("0" + (new Date().getMonth() + 1)).slice(-2) + '-' + ("0" + new Date().getDate()).slice(-2)
  }
  buyunits: boolean = true;
  buyamount: boolean = false;
  entire:boolean =false;
  inputFieldValue: string = '';

  buy_units(action: string) {
    if (action === 'show') {
      this.buyunits = true;
      this.buyamount = false;
      this.entire =false;
    } else {
      this.buyunits = false;
      this.buyamount = true;
      this.entire = true;
    }
  }
  buy_amount(action: string) {
    if (action === 'show') {
      this.buyamount = true;
      this.buyunits = false;
      this.entire = false;
    } else {
      this.buyamount = false;
      this.buyunits = true;
      this.entire = false;

    }
  }
  entire_menu(action: string) {
    if (action === 'hide') {
      this.buyamount = true;
      this.buyunits = true;
    } else {
      this.buyamount = false;
      this.buyunits = false;
    }
  }
}



