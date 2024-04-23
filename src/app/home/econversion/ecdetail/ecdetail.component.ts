import { Component, OnInit } from '@angular/core';
import { Userservice } from '../../../services/userservice.service'
import { NotificationService } from '../../../notification.service'
import { DataService } from '../../data.service'

import { IS_TRX_TRX_ONLINETRANSACTIONPIN } from '../../../Models/IS_TRX_TRX_ONLINETRANSACTIONPIN'
import { IS_TRX_TRX_MASTER } from 'src/app/Models/IS_TRX_TRX_MASTER';
import { IS_TRX_TRX_REQUESTED } from 'src/app/Models/IS_TRX_TRX_REQUESTED'
import { v4 as uuidv4 } from 'uuid'
//const { v4: uuidv4 } = require('uuid');
import { IS_ACC_PRODUCTPROFILE } from 'src/app/Models/IS_ACC_PRODUCTPROFILE';
import { IS_TRX_PAY_PAYMENT } from 'src/app/Models/IS_TRX_PAY_PAYMENT';
import { PaymentState, PaymentStatus, TransactionPinStatus } from '../../../Utilities';
import { IS_TRX_COMM_SALE } from 'src/app/Models/IS_TRX_COMM_SALE';
import { TransactionDetailsViewModel } from 'src/app/Models/TransactionDetailsViewModel'
import { ConversionDetailsViewModel } from 'src/app/Models/ConversionDetailsViewModel';
import { Basket } from 'src/app/Models/Basket';



@Component({
  selector: 'app-ecdetail',
  templateUrl: './ecdetail.component.html',
  styleUrls: ['./ecdetail.component.scss']
})
export class EcdetailComponent implements OnInit {
  /*
    filterFund: any
    dataDtl!: any
    productName: string = ""
    // AccSysCode: string = '2e64b8a1-b313-479f-b45b-a065267c1b86'
    AccSysCode: string = ''
    MgCompanyCode: string = ''
    fundCode: number = 0;
    areAllSelected = false;
  */


  dateNow: Date = new Date();
  lstCommSale: IS_TRX_COMM_SALE[] = [] as IS_TRX_COMM_SALE[];
  lstpayment = {} as IS_TRX_PAY_PAYMENT
  userAccount: IS_TRX_TRX_ONLINETRANSACTIONPIN[] = [];
  trxMaster: IS_TRX_TRX_MASTER[] = [];
  lstRequested: IS_TRX_TRX_REQUESTED[] = [];

  AccountProfile = {} as IS_ACC_PRODUCTPROFILE
  _IS_TRX_TRX_MASTER = {} as IS_TRX_TRX_MASTER
  conversionOut = {} as Basket
  conversionIn = {} as Basket

  _IS_TRX_TRX_GENSERVICESFEES: any
  IS_PRD_COMMISSIONMASTER: any
  ///dsBankAccountDetails: any
  dsBankBranchDetails: any
  _lstPrdCommBreakup: any
  trxGenservicesFee: any
  dsProductAccount: any
  selectedProduct: any
  selectedProductIn: any
  dsInstrument: any
  dstCurrency: any
  selectedOpt: any
  PaymentMode: any
  filterFund: any
  UserData!: any
  //dtBasket: Basket[] = [];
  dtBasket: Basket[] = [] as Basket[];
  dataDtl!: any
  dataDtlIn!: any
  data: any[] = [];
  ds: any

  fnd_fundCode:any


  TrnsactionId: string = ''
  ACC_Code: string = ''
  UserId: string = ''
  Email: string = ''
  Genid: string = ''

  result = false

  isToggled = false;


  Tpin: string = ''
  displayStyle = "none"
  displayStyle2 = "none"

  FAC_ACCOUNTNO: string = ''
  productName: string = ""
  productNameIn: string = ""
  AccSysCode: string = ''
  MgCompanyCode: string = ''
  _formNumber: string = ''
  ProductName: string = ''
  TSD_TRXTYPE: string = ''
  TSD_TRXNAME: string = ''

  txtRedemptionPercentage: number = 0
  txtRedemptionUnits: number = 0
  txtRedemptionAmount: number = 0

  RedeemableUnit: number = 0
  productAmount: number = 0
  reqAmount: number = 0
  fundCode: number = 0
  crr_Rate: number = 1.01
  BNK_ID: number = 0
  BBR_ID: number = 0

  checkOut = false
  checkIn = false

  PRD_PRODUCTCODE: string = ''
  PUC_CLASSCODE: string = ''
  PUT_TYPENAME: string = ''
  FND_FUNDCODE: number = 0


  constructor(
    private http: Userservice,
    private notify: NotificationService,
    private dataService: DataService
  ) {
    this.AccSysCode = dataService.getAccSystemCode()
    this.MgCompanyCode = dataService.getUserManagementCompany();


    this.http.GetConversionProductListFilterManagmentCompany(this.AccSysCode, this.MgCompanyCode).subscribe((response) => {

      this.dataDtl = response
      this.dataDtlIn = response
    });

    /*
      this.http.GetProductListWithManagmentCompany(this.AccSysCode, this.MgCompanyCode).subscribe((response) => {
  
        this.dataDtl = response
        this.dataDtlIn = response
      });
  */

    /*
    GetConversionProductListFilterManagmentCompany
        this.http.GetAcc_BankAccountDetails2(this.dataService.getAccSystemCode()).subscribe((response) => {
          this.dsBankAccountDetails = response
        });
    */
  }

  ngOnInit(): void {

    this.UserData = this.dataService.getData()
    this.ACC_Code = this.UserData[0].ACC_Code
    this.UserId = this.UserData[0].UserId
    this.Email = this.UserData[0].Email
    this.Genid = this.UserData[0].ACC_PAYMENTTYPE

  }

  onBlurEvent(event: any) {

    let unitValue: number = 0.0;
    let amountValue: number = 0.0;

    if (this.selectedOpt == 'rbtnByUnits')
      unitValue = event.target.value;
    else if (this.selectedOpt == 'rbtnByAmount')
      amountValue = event.target.value;

    let minInvestment = this.filterFund?.PUT_MININVESTMENTAMOUNT

    let minReInvestment = this.filterFund?.PUT_MINREINVESTMENTAMOUNT
    let balUnit = this.filterFund?.BALANACEUNITS


    if (this.selectedOpt == 'rbtnByUnits') {
      if (unitValue > 0 && unitValue < balUnit) {
        this.notify.showError('Amount must be greater than minimum reinvestment amount', 'Error')
        this.closePopup()
      }
    }
    else if (this.selectedOpt == 'rbtnByAmount') {
      if (amountValue > 0 && amountValue < minReInvestment) {
        this.notify.showError('Amount must be greater than minimum reinvestment amount', 'Error')
        this.closePopup()
      }
    }
    else if (this.selectedOpt == 'rbtnEntire') {
      if (balUnit <= 0 && unitValue < minInvestment) {
        this.notify.showError('Amount must be greater than minimum investment amount', 'Error')
        this.closePopup()
      }
    }
    //this.filterFund.RequestedAmout = this.txtRedemptionAmount;
    //this.filterFund.RequestedUNITS = this.txtRedemptionUnits
  
    console.log('Selected Product :- ', this.selectedProduct)

  }
  /*
    isAllSelectedIn(item: any) {
      this.selectedProductIn = this.dataDtlIn.find(o => o.PRD_PRODUCTCODE === item.PRD_PRODUCTCODE && o.PUC_CLASSCODE === item.PUC_CLASSCODE && o.PUT_TYPENAME === item.PUT_TYPENAME)
      console.log('Selected Fund IN ', this.selectedProductIn)
      this.dataDtlIn.forEach(val => {
        if (val.FND_FUNDCODE == item.FND_FUNDCODE) {
          val.selected = !val.selected;
          this.productNameIn = item.PRD_NAME
        }
        else {
          val.selected = false;
        }
      });
      this.conversionIn = this.selectedProductIn
    }
  */

  isAllSelected(pro: any) {
    this.selectedProduct = this.dataDtl.find(o => o.PRD_PRODUCTCODE === pro.PRD_PRODUCTCODE && o.PUC_CLASSCODE === pro.PUC_CLASSCODE && o.PUT_TYPENAME === pro.PUT_TYPENAME)

    this.filterFund = this.selectedProduct 

    this.dataDtl.forEach(val => {
      if (val.FND_FUNDCODE == pro.FND_FUNDCODE) {
        val.selected = !val.selected
        this.productName = pro.PRD_NAME
        this.fnd_fundCode = pro.FND_FUNDCODE

        this.PRD_PRODUCTCODE = pro.PRD_PRODUCTCODE
        this.PUC_CLASSCODE =pro.PUC_CLASSCODE
        this.PUT_TYPENAME = pro.PUT_TYPENAME
        this.FND_FUNDCODE = pro.FND_FUNDCODE
      }
      else {
        val.selected = false
      }
    });
    if (!this.isToggled) {
      this.conversionOut = this.selectedProduct
      console.log('Selected Product OUT ', this.conversionOut)
    }
    else {
      this.conversionIn = this.selectedProduct
      console.log('Selected Product IN ', this.conversionIn)
    }
  }


  AddProductToBasket() {

    /*
    let ProductName: string = ''
    let TSD_TRXTYPE: string = ''
    let TSD_TRXNAME: string = ''

    let RedeemOutBy: string = ''
    let RedeemBy: string = ''
*/
    let RedeemableUnit: number = 0
    let RedeemUnits: number = 0
    let RedeemAmount: number = 0
    let RedeemableAmount: number = 0


    if (this.isToggled === false) {
      //this.selectedProduct.BALANACEUNITS
      this.conversionOut.id = 1
      this.conversionOut.PRD_NAME = this.productName;
      this.conversionOut.TSD_TRXTYPE = "CNOT";
      this.conversionOut.TSD_TRXNAME = "CONVERSION OUT"

      if (this.selectedOpt == 'rbtnByUnits') {
        this.conversionOut.RedeemOutBy = "Unit";
        this.conversionOut.RedeemBy = "By Units";
      }
      else if (this.selectedOpt == 'rbtnByAmount') {
        this.conversionOut.RedeemOutBy = "Amount";
        this.conversionOut.RedeemBy = "By Amount";
        this.conversionOut.RedeemAmount = this.txtRedemptionAmount
      }
      else if (this.selectedOpt == 'rbtnByPercentage') {
        this.conversionOut.RedeemOutBy = "Amount";
        let RedeemPercent: number = 0
        RedeemPercent = this.txtRedemptionPercentage
        RedeemAmount = this.txtRedemptionPercentage * (RedeemPercent / 100)
        let RedeemableAmount: number = 0

        if (RedeemableAmount <= 0 || RedeemAmount > RedeemableAmount) {
          this.notify.showError('Percentage Amount should not be greater than Convertable Amount', 'Error')
        }
      }
      else if (this.selectedOpt == 'rbtnEntire') {
        this.conversionOut.RedeemOutBy = "Unit";
        this.conversionOut.RedeemBy = "Entire";
        if (RedeemableUnit <= 0) {
          this.notify.showError('Convertable Units are Zero.', 'Error')
        }
        this.conversionOut.RedeemUnits = RedeemableUnit;
        this.conversionOut.RedeemAmount = RedeemableAmount;
      }
    }
    if (this.isToggled === true)// if NOT (dtBasket.Rows.Count == 0)
    {
      this.ProductName = this.productNameIn
      this.TSD_TRXTYPE = "CNIN"
      this.TSD_TRXNAME = "CONVERSION IN"
      this.conversionIn.id = 2
      this.conversionIn.PRD_NAME = this.productNameIn
      this.conversionIn.TSD_TRXTYPE = "CNIN"
      this.conversionIn.TSD_TRXNAME = "CONVERSION IN"
      this.conversionIn.RedeemOutBy = ""
      this.conversionIn.RedeemBy = ""
      this.conversionIn.RedeemUnits = this.selectedProduct.BALANACEUNITS
      this.conversionIn.RedeemAmount = (this.selectedProduct.BALANACEUNITS * this.selectedProduct.NAVVALUE)
    }
    console.log('Updated Out Dataset', this.conversionOut)
    console.log('Updated In Dataset', this.conversionIn)
    this.onToggle()
    this.isAllSelected(0)

  }

  onChanged(e: any) {
    this.selectedOpt = e.target.id
    this.PaymentMode = e.target.title
    console.log('Selected Text :- ', this.selectedOpt)
  }
  //#region 

  async getBankBranchDetails() {
    /*
    this.BNK_ID = this.dsBankAccountDetails[0].BNK_ID;
    this.BBR_ID = this.dsBankAccountDetails[0].BBR_ID;
    this.http.GetAcc_BankBranchDetails2(this.BNK_ID, this.BBR_ID).subscribe((response) => {
      this.dsBankBranchDetails = response
      ///////////////////////console.log('Bank Branch Details:- ', this.dsBankBranchDetails)
    });
    */
  }

  async getProductCommissionMaster() {
    
    this.IS_PRD_COMMISSIONMASTER = this.http.GetProductCommissionMaster(
      'OEIT',
      this.PRD_PRODUCTCODE,//'dc009de6-1a13-4dc9-a593-192bd60b19b0',
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

  openTryFunction() {
    this.getProductDetails().then(() => {
      //  console.log('this.getProductDetails()', this.dsProductAccount)
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
      debugger
      this.http.GetIS_PRD_PRODUCTACCOUNT_Details(this.PRD_PRODUCTCODE).subscribe((res) => {
        this.dsProductAccount = res
        console.log('RESOLVED ', this.dsProductAccount)

        this.BNK_ID = this.dsProductAccount[0].BNK_ID;
        this.BBR_ID = this.dsProductAccount[0].BBR_ID;
        this.FAC_ACCOUNTNO = this.dsProductAccount[0].FAC_ACCOUNTNO;
        console.log(this.dsProductAccount[0].FAC_ACCOUNTNO)
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

      //  console.log('Instrument ID ', this.dsInstrument.GEN_ID)
    }

  }

  openPopup() {

    this.generateTpin();

    if (this.productName.length <= 0) {
      this.notify.showError('Product must be selected ', 'Error')
      this.closePopup()
      return
    }

    if (this.selectedOpt == 'rbtnByAmount') {
      if (this.txtRedemptionAmount <= 0) {
        this.notify.showError('Investment amount must be entered', 'Error')
        this.closePopup()
        return
      }
      this.sendPin()
    }
    else if (this.selectedOpt == 'rbtnByUnits') {
      if (this.txtRedemptionUnits <= 0) {
        this.notify.showError('Investment unit(s) must be entered', 'Error')
        this.closePopup()
        return
      }
      this.sendPin()
    }


  }

  generateTpin(): void {
    this.Tpin = Math.floor(10000 * Math.random()).toString();
    console.log('this.Tpin', this.Tpin)

  }

  sendPin() {
    this.generateTpin();

    //console.log('this.SelectedProduct ', this.selectedProduct)

    this.result = this.http.SendEmailToInvester(this.Tpin, "amir.shaikh@sidathyder.com.pk") //this.Email //

    if (this.result === true) {
      {
        this._IS_TRX_TRX_GENSERVICESFEES = this.http.GetServiseFee(this.fnd_fundCode, this.selectedProduct.RequestedAmout)
      }
    }
    //this.trxGenservicesFee = this.http.GetServiseFee(this.selectedProduct.FND_FUNDCODE, this.selectedProduct.RequestedAmout)
    //////////////////////// 05Mar2024   this._IS_TRX_TRX_GENSERVICESFEES  = this.http.GetServiseFee(this.selectedProduct.FND_FUNDCODE, this.selectedProduct.RequestedAmout)
  }

  closePopup() {
    this.displayStyle = "none";
  }

  onSubmit(TPinForm) {
    if (this.Tpin == TPinForm.value.TPin) {
      console.log('Pin Matched', TPinForm.value)
      var _IS_TRX_TRX_ONLINETRANSACTIONPIN = {} as IS_TRX_TRX_ONLINETRANSACTIONPIN
      //this._formNumber = "OEIT_" +  this.ACC_Code + "_" + new Date().toLocaleString()
      //console.log('Account code ', this.UserData)
      _IS_TRX_TRX_ONLINETRANSACTIONPIN.ACC_CODE = parseInt(this.ACC_Code)
      _IS_TRX_TRX_ONLINETRANSACTIONPIN.OTP_PINCODE = this.Tpin
      _IS_TRX_TRX_ONLINETRANSACTIONPIN.TSM_FORMNO = "OEIT_" + this.ACC_Code + "_" + new Date().toLocaleString()
      _IS_TRX_TRX_ONLINETRANSACTIONPIN.TSM_TRNSACTIONID = uuidv4()
      this.TrnsactionId = _IS_TRX_TRX_ONLINETRANSACTIONPIN.TSM_TRNSACTIONID
      _IS_TRX_TRX_ONLINETRANSACTIONPIN.UOS_USERID = this.UserData[0].UserId
      //_IS_TRX_TRX_ONLINETRANSACTIONPIN.OTP_CREATEDON =  
      // _IS_TRX_TRX_ONLINETRANSACTIONPIN.OTP_STATUS = TransactionPinStatus.Generated.toString()
      //_IS_TRX_TRX_ONLINETRANSACTIONPIN.OTP_EXPIRYDATE = Date.now;

      this.http.InsertOnlineTransactionPIN(_IS_TRX_TRX_ONLINETRANSACTIONPIN).subscribe(res => {
        //console.log('Response Component', res)

      });

    }
    else {
      //console.log('Else ', this.Tpin);
    }
  }

  OpenPopup2() {

    if (this.isToggled === true)
      this.AddProductToBasket()

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

  SendRequest() {
    
    console.log('Inside Send Request Method  :- ')

    let DayID = new Date().toLocaleString('en-us', { weekday: 'long' })
    let PCT_CUTOFFTIME: string
    let PRD_PRODCODE = this.fnd_fundCode;
    //Utilities._isSuccess = false;
    let _isSuccess = true;

    if (this.UserData[0].ACC_Code.toString() == null || this.UserData[0].ACC_Code.toString() == "") {
      this.notify.showError("User Session time out. Please login.", Error)
      return
    }

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


  postData() {
    
    //console.log("INSIDE POST DATA METHOD :- " )
    if (this.lstCommSale)
      console.log("INSIDE COMMISSION DATA METHOD :- ", this.lstCommSale)

    ///console.log("INSIDE POST PAYMENT DATA METHOD :- " , this.lstpayment)
    const abc = {} as ConversionDetailsViewModel

    return new Promise<void>((resolve) => {

      abc._IS_TRX_TRX_MASTER = this._IS_TRX_TRX_MASTER
      abc.trxRequested = this.lstRequested
      abc.lstCommSale = this.lstCommSale

      console.log("INSIDE POST DATA METHOD :- END ")

      this.http.SaveConversion(abc).subscribe((res) => {
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

  sendTransactionObjects() {
    //this.getProductDetails().then(() => {
    //console.log('GetIS_PRD_PRODUCTACCOUNT_Details:- ', this.dsProductAccount)
    this.SetTransactionMasterObject().then(() => {
      this.SetTransactionRequested(this._IS_TRX_TRX_MASTER).then(() => {
        this.ApplyCommission(this.lstRequested[0], this._IS_TRX_TRX_MASTER).then(() => {
          this.setAccountPro(this._IS_TRX_TRX_MASTER).then(() => {
            this.postData().then(() => { console.log('calling post') })
          })
        })
      })
    })
  }

  SetTransactionMasterObject() {
    return new Promise<void>((resolve) => {
      console.log('INside Trx Master  method ') //addTrxMaster

      this._IS_TRX_TRX_MASTER.TSM_TRNSACTIONID = uuidv4()
      this._IS_TRX_TRX_MASTER.TSM_USERTRXCODE = "1"
      this._IS_TRX_TRX_MASTER.TSM_YEARTRXCOUNT = 1
      this._IS_TRX_TRX_MASTER.TSM_PERIODTRXCOUNT = 1
      this._IS_TRX_TRX_MASTER.ACC_SYSTEMCODE = this.UserData[0].ACC_SYSTEMCODE.toString();
      this._IS_TRX_TRX_MASTER.DSB_ID = this.UserData[0].DSB_ID;
      this._IS_TRX_TRX_MASTER.DST_ID = this.UserData[0].DST_ID;
      this._IS_TRX_TRX_MASTER.TSM_ACCOUNTCODE = parseInt(this.ACC_Code);
      this._IS_TRX_TRX_MASTER.TSM_ACCOUNTTYPE = this.UserData[0].ACC_ACCOUNTTYPE;
      this._IS_TRX_TRX_MASTER.TSM_AGENTCODE = this.UserData[0].FAC_ID;
      this._IS_TRX_TRX_MASTER.TSM_FORMNO = "OECN_" + this.UserData[0].ACC_Code + "_" + new Date().toLocaleString();
      this._IS_TRX_TRX_MASTER.TSM_COMMENTS = "Online Transaction";
      this._IS_TRX_TRX_MASTER.TSM_TRXDATE = this.cutOffTransactionDate()
      //string Time = TransactionDetailControl1.Time.Value.ToString("HH:mm").Replace(':', ' ').Replace(" ", "");
      this._IS_TRX_TRX_MASTER.TSM_TRXTIME = 1// for tesing only
      this._IS_TRX_TRX_MASTER.TSM_TRXTYPE = "CN"
      this._IS_TRX_TRX_MASTER.CUS_CODE = null
      this._IS_TRX_TRX_MASTER.TSM_TRXNAME = "Conversion"
      this._IS_TRX_TRX_MASTER.TSM_STATUS = "Submitted"
      this._IS_TRX_TRX_MASTER.CLP_PERIOD = null
      this._IS_TRX_TRX_MASTER.CLY_YEAR = null


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

        if (this.conversionOut) {
          const trxRequested = {} as IS_TRX_TRX_REQUESTED
          trxRequested.TSM_TRNSACTIONID = trxMaster.TSM_TRNSACTIONID;
          trxRequested.TSD_REQTRXID = uuidv4()
          trxRequested.ACC_SYSTEMCODE = trxMaster.ACC_SYSTEMCODE;
          trxRequested.DSB_ID = trxMaster.DSB_ID;
          trxRequested.DST_ID = trxMaster.DST_ID;
          trxRequested.TSD_REDEEMPERCENT = 0;
          trxRequested.TSD_REBATEPERCENT = 100;
          trxRequested.TSD_ISNAVANNOUNCED = 0;
          trxRequested.TSD_NAV = 0;
          trxRequested.CLP_PERIOD = trxMaster.CLP_PERIOD
          trxRequested.CLY_YEAR = trxMaster.CLY_YEAR

          trxRequested.TSD_TRXTYPE = this.conversionOut.TSD_TRXTYPE;
          trxRequested.TSD_TRXNAME = this.conversionOut.TSD_TRXNAME;
          trxRequested.TSD_REDEEMOUTBY = this.conversionOut.TSD_REDEEMOUTBY
          trxRequested.PRP_PROFILEID = this.conversionOut.PRP_PROFILEID

          trxRequested.FND_FUNDID = this.conversionOut.FND_FUNDID
          trxRequested.PUC_CLASSCODE = this.conversionOut.PUC_CLASSCODE
          trxRequested.PUT_TYPENAME = this.conversionOut.PUT_TYPENAME
          trxRequested.PRD_FUNDCODE = parseInt(this.conversionOut.FND_FUNDCODE);
          trxRequested.TSD_ISENTIREOUT = this.PaymentMode == 'Entire' ? 1 : 0;

          if (this.conversionOut.TSD_TRXTYPE === "CNOT")
            trxRequested.TSD_TRXUNITSOUT = this.conversionOut.RedeemUnits
          else if (this.conversionOut.TSD_TRXTYPE === "CNIN")
            trxRequested.TSD_TRXUNITSIN = this.conversionOut.RedeemUnits

          if (this.conversionOut.RedeemAmount == null) {
            if (this.conversionOut.TSD_TRXTYPE === "CNOT")
              trxRequested.TSD_TRXAMOUNTOUT = this.conversionOut.RedeemAmount
            else if (this.conversionOut.TSD_TRXTYPE === "CNIN")
              trxRequested.TSD_TRXAMOUNTIN = this.conversionOut.RedeemAmount
          }

          trxRequested.PRD_PLANID = null
          trxRequested.TSD_TRXAMOUNTIN = this.selectedProduct.RequestedAmount
          trxRequested.TSD_TRXUNITSIN = 0;

          if (this.conversionOut.TSD_AMOUNTPRECISION)
            trxRequested.TSD_AMOUNTPRECISION = this.conversionOut.TSD_AMOUNTPRECISION
          else
            trxRequested.TSD_AMOUNTPRECISION = 0

          trxRequested.TSD_AMOUNTPRECISIONMETHOD = this.conversionOut.TSD_AMOUNTPRECISIONMETHOD

          if (this.conversionOut.TSD_NAVPRECISION)
            trxRequested.TSD_NAVPRECISION = this.conversionOut.TSD_NAVPRECISION
          else
            trxRequested.TSD_NAVPRECISION = 0

          trxRequested.TSD_NAVPRECISIONMETHOD = this.conversionOut.TSD_NAVPRECISIONMETHOD

          if (this.conversionOut.TSD_PRICEPRECISION)
            trxRequested.TSD_PRICEPRECISION = this.conversionOut.TSD_PRICEPRECISION
          else
            trxRequested.TSD_PRICEPRECISION = 0

          trxRequested.TSD_PRICEPRECISIONMETHOD = this.conversionOut.TSD_PRICEPRECISIONMETHOD

          if (this.conversionOut.TSD_UNITPRECISION)
            trxRequested.TSD_UNITPRECISION = this.conversionOut.TSD_UNITPRECISION
          else
            trxRequested.TSD_UNITPRECISION = 0

          trxRequested.TSD_UNITPRECISIONMETHOD = this.conversionOut.TSD_UNITPRECISIONMETHOD

          if (this.conversionOut.TSD_ISISLAMIC)
            trxRequested.TSD_ISISLAMIC = this.conversionOut.TSD_ISISLAMIC
          else
            trxRequested.TSD_ISISLAMIC = 0

          trxRequested.TSD_TRUSTEECODE = this.conversionOut.TSD_TRUSTEECODE
          trxRequested.TSD_AUDITORCODE = this.conversionOut.TSD_AUDITORCODE
          if (this.conversionOut.TSD_REPURCHASEPRICEPRECISION)
            trxRequested.TSD_REPURCHASEPRICEPRECISION = this.conversionOut.TSD_REPURCHASEPRICEPRECISION
          else
            trxRequested.TSD_REPURCHASEPRICEPRECISION = 0

          trxRequested.TSD_REPURCHASEPRICEPRECISIONMETHOD = this.conversionOut.TSD_REPURCHASEPRICEPRECISIONMETHOD
          trxRequested.TSD_SERVICEFEE = 0;//Convert.ToDecimal(lblTransactionCharges.Text);


          trxRequested.PRP_PROFILEID = ""
          trxRequested.TSD_TRXAMOUNTOUT = 0
          trxRequested.TSD_TRXUNITSOUT = 0
          trxRequested.TSD_PRDCURRENCYSYMBOL = ""
          trxRequested.TSD_DIGITALCERTIFICATE = ""
          ///this.trxRequested.PRD_PLANID = ""
          trxRequested.TSD_AMOUNTPRECISIONMETHOD = ""
          trxRequested.TSD_NAVPRECISIONMETHOD = ""
          trxRequested.TSD_PRICEPRECISIONMETHOD = ""
          trxRequested.TSD_UNITPRECISIONMETHOD = ""
          trxRequested.TSD_REPURCHASEPRICEPRECISIONMETHOD = ""
          trxRequested.TSD_PREMIUMAMOUNT = 0
          trxRequested.TSD_INSSCHID = ""
          trxRequested.PRD_TABLEID = 0
          trxRequested.PRD_PLANCODE = 0
          trxRequested.TSD_TRXAMOUNTIN = 0
          trxRequested.TSD_TRUSTEECODE = ""
          trxRequested.TSD_AUDITORCODE = ""
          trxRequested.TSD_GROSSCOMMISSION = 0
          trxRequested.TSD_NAVID = ""
          trxRequested.CRR_ID = ""
          trxRequested.CRR_BUYCONRATE = 0
          trxRequested.TSD_TRXAMOUNTIN_CRR = 0
          trxRequested.TSD_TRXUNITSIN_CRR = 0

          this.lstRequested.push(trxRequested)
          console.log('ROW ONe :-', this.lstRequested[0])
        }
        if (this.conversionIn) {
          const trxRequest = {} as IS_TRX_TRX_REQUESTED
          trxRequest.TSM_TRNSACTIONID = trxMaster.TSM_TRNSACTIONID;
          trxRequest.TSD_REQTRXID = uuidv4()
          trxRequest.ACC_SYSTEMCODE = trxMaster.ACC_SYSTEMCODE;
          trxRequest.DSB_ID = trxMaster.DSB_ID;
          trxRequest.DST_ID = trxMaster.DST_ID;
          trxRequest.TSD_REDEEMPERCENT = 0;
          trxRequest.TSD_REBATEPERCENT = 50;
          trxRequest.TSD_ISNAVANNOUNCED = 0;
          trxRequest.TSD_NAV = 0;
          trxRequest.CLP_PERIOD = trxMaster.CLP_PERIOD
          trxRequest.CLY_YEAR = trxMaster.CLY_YEAR
          trxRequest.TSD_TRXTYPE = this.conversionIn.TSD_TRXTYPE
          trxRequest.TSD_TRXNAME = this.conversionIn.TSD_TRXNAME
          trxRequest.TSD_REDEEMOUTBY = "";

          if (this.conversionIn.FND_FUNDID) {
            trxRequest.FND_FUNDID = this.conversionIn.FND_FUNDID
            trxRequest.PRD_PLANID = null
          }
          else {
            trxRequest.FND_FUNDID = this.conversionIn.FND_FUNDID
            trxRequest.PRD_PLANID = null
          }

          trxRequest.PUC_CLASSCODE = this.conversionIn.PUC_CLASSCODE
          //this.trxRequested.PUT_TYPENAME = this.conversionIn.PUT_TYPENAME
          trxRequest.PRD_FUNDCODE = parseInt(this.conversionIn.FND_FUNDCODE);
          trxRequest.TSD_ISENTIREOUT = this.PaymentMode == 'Entire' ? 1 : 0;

          trxRequest.TSD_TRXAMOUNTIN = this.conversionIn.RequestedAmount
          trxRequest.TSD_TRXUNITSIN = 0;
          if (this.conversionIn.TSD_AMOUNTPRECISION)
            trxRequest.TSD_AMOUNTPRECISION = this.conversionIn.TSD_AMOUNTPRECISION
          else
            trxRequest.TSD_AMOUNTPRECISION

          trxRequest.TSD_AMOUNTPRECISIONMETHOD = this.conversionIn.TSD_AMOUNTPRECISIONMETHOD

          if (this.conversionIn.TSD_NAVPRECISION)
            trxRequest.TSD_NAVPRECISION = this.conversionIn.TSD_NAVPRECISION
          else
            trxRequest.TSD_NAVPRECISION = 0

          trxRequest.TSD_NAVPRECISIONMETHOD = this.conversionIn.TSD_NAVPRECISIONMETHOD

          if (this.conversionIn.TSD_PRICEPRECISION)
            trxRequest.TSD_PRICEPRECISION = this.conversionIn.TSD_PRICEPRECISION
          else
            trxRequest.TSD_PRICEPRECISION = 0

          trxRequest.TSD_PRICEPRECISIONMETHOD = this.conversionIn.TSD_PRICEPRECISIONMETHOD
          if (this.conversionIn.TSD_UNITPRECISION)
            trxRequest.TSD_UNITPRECISION = this.conversionIn.TSD_UNITPRECISION
          else
            trxRequest.TSD_UNITPRECISION = 0

          trxRequest.TSD_UNITPRECISIONMETHOD = this.conversionIn.TSD_UNITPRECISIONMETHOD

          if (this.conversionIn.TSD_ISISLAMIC)
            trxRequest.TSD_ISISLAMIC = this.conversionIn.TSD_ISISLAMIC
          else
            trxRequest.TSD_ISISLAMIC = 0

          trxRequest.TSD_TRUSTEECODE = this.conversionIn.TSD_TRUSTEECODE
          trxRequest.TSD_AUDITORCODE = this.conversionIn.TSD_AUDITORCODE
          if (this.conversionIn.TSD_REPURCHASEPRICEPRECISION)
            trxRequest.TSD_REPURCHASEPRICEPRECISION = this.conversionIn.TSD_REPURCHASEPRICEPRECISION
          else
            trxRequest.TSD_REPURCHASEPRICEPRECISION = 0

          trxRequest.TSD_REPURCHASEPRICEPRECISIONMETHOD = this.conversionIn.TSD_REPURCHASEPRICEPRECISIONMETHOD
          trxRequest.TSD_SERVICEFEE = 0;//Convert.ToDecimal(lblTransactionCharges.Text);


          trxRequest.PRP_PROFILEID = ""
          trxRequest.TSD_TRXAMOUNTOUT = 0
          trxRequest.TSD_TRXUNITSOUT = 0
          trxRequest.TSD_PRDCURRENCYSYMBOL = ""
          trxRequest.TSD_DIGITALCERTIFICATE = ""
          ///this.trxRequested.PRD_PLANID = ""
          trxRequest.TSD_AMOUNTPRECISIONMETHOD = ""
          trxRequest.TSD_NAVPRECISIONMETHOD = ""
          trxRequest.TSD_PRICEPRECISIONMETHOD = ""
          trxRequest.TSD_UNITPRECISIONMETHOD = ""
          trxRequest.TSD_REPURCHASEPRICEPRECISIONMETHOD = ""
          trxRequest.TSD_PREMIUMAMOUNT = 0
          trxRequest.TSD_INSSCHID = ""
          trxRequest.PRD_TABLEID = 0
          trxRequest.PRD_PLANCODE = 0
          trxRequest.TSD_TRXAMOUNTIN = 0
          trxRequest.TSD_TRUSTEECODE = ""
          trxRequest.TSD_AUDITORCODE = ""
          trxRequest.TSD_GROSSCOMMISSION = 0
          trxRequest.TSD_NAVID = ""
          trxRequest.CRR_ID = ""
          trxRequest.CRR_BUYCONRATE = 0
          trxRequest.TSD_TRXAMOUNTIN_CRR = 0
          trxRequest.TSD_TRXUNITSIN_CRR = 0

          this.lstRequested.push(trxRequest)
          console.log('ROW TWO :-', this.lstRequested[1])

        }
        //Commission _comm = new Commission();
        if (this.conversionOut.TSD_TRXTYPE === "CNIN")
          this.ApplyCommission(this.lstRequested[0], trxMaster);

        console.log('Inside Set Transaction Requested Method END :- ');
      }


      //#region 

      //#endregion
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
      debugger
      if (this._lstPrdCommBreakup) {

        for (let n = 0; n < this._lstPrdCommBreakup.length; ++n) {
          var _commSale = {} as IS_TRX_COMM_SALE
          _commSale.TSD_REQTRXID = _IS_TRX_TRX_REQUESTED.TSD_REQTRXID;
          _commSale.TCM_COMMISSIONEEID = this._lstPrdCommBreakup[n].PCB_COMMISSIONEEID;
          _commSale.TCM_TRXCOMMISSIONID = uuidv4()
          _commSale.TCM_ORGCOMMISSIONPERCENT = this._lstPrdCommBreakup[n].PCB_LOADSHAER;
          _commSale.TCM_COMMISSIONPERCENT = this._lstPrdCommBreakup[n].PCB_LOADSHAER;
          _commSale.TCM_COMMENTS = null;
          //if (string.IsNullOrEmpty(Convert.ToString(_IS_TRX_TRX_MASTER.TSM_FACILITATORREBATE)))
          _commSale.TCM_REBATEONSHARE = (this._lstPrdCommBreakup[n].PCB_LOADSHAER / 100) * 1//_IS_TRX_TRX_MASTER.TSM_FACILITATORREBATE;
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

          this.lstCommSale.push(_commSale)
        }
      }
      resolve()
      console.log('INSIDE ApplyCommission METHOD END :-')
    });
  }



  ///setAccountPro(trxMaster: IS_TRX_TRX_MASTER):IS_ACC_PRODUCTPROFILE {   
  async setAccountPro(trxMaster: IS_TRX_TRX_MASTER) {
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
    /*
    debugger
    console.log('Filter Fund :- ', this.filterFund)
    
    let PRD_PRODUCTCODE: string = this.filterFund.PRD_PRODUCTCODE
    let PUC_CLASSCODE: string = this.filterFund.PUC_CLASSCODE
    let PUT_TYPENAME: string = this.filterFund.PUT_TYPENAME
    let FND_FUNDCODE: number = this.filterFund.FND_FUNDCODE
    */

    this.AccountProfile.PRP_PROFILEID = uuidv4();
    this.AccountProfile.PRD_PRODUCTID = this.PRD_PRODUCTCODE;
    this.AccountProfile.ACC_SYSTEMCODE = trxMaster.ACC_SYSTEMCODE;
    this.AccountProfile.ACC_CODE = trxMaster.TSM_ACCOUNTCODE;
    this.AccountProfile.FND_FUNDCODE = this.FND_FUNDCODE;
    this.AccountProfile.PUC_CLASSCODE = this.PUC_CLASSCODE;
    this.AccountProfile.PUT_UNITTYPE = this.PUT_TYPENAME;
    this.AccountProfile.PRP_FIXEDINCOME = 0;
    this.AccountProfile.PRP_ISZEROBALANCE = false;
    this.AccountProfile.PRP_STATUS = "Active";
    this.AccountProfile.PRP_PROFILECREATEDON = new Date;
    this.AccountProfile.PRP_CREATEDON = null;
    this.AccountProfile.PRP_CREATEDBY = "Online User";
    this.AccountProfile.PRP_DIGITALCERTIFICATE = "???";
    this.AccountProfile.PRP_VERSION = 1;
    this.AccountProfile.PRP_OPTIONMETHOD = "Both";
    //return this.AccountProfile;
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



  //#endregion

  onToggle() {
    this.isToggled = !this.isToggled;
  }
  buyunits: boolean = true;
  buyamount: boolean = false;
  entire:boolean =false;
  percentage:boolean=false;
  inputFieldValue: string = '';

  buy_units(action: string) {
    if (action === 'show') {
      this.buyunits = true;
      this.buyamount = false;
      this.entire =false;
      this.percentage= false;
    } else {
      this.buyunits = false;
      this.buyamount = true;
      this.entire = true;
      this.percentage= true;
    }
  }
  buy_amount(action: string) {
    if (action === 'show') {
      this.buyamount = true;
      this.buyunits = false;
      this.entire = false;
      this.percentage= false;
    } else {
      this.buyamount = false;
      this.buyunits = true;
      this.entire = true;
      this.percentage= true;

    }
  }
  by_percentage(action: string) {
    if (action === 'show') {
      this.percentage= true;
      this.buyamount = false;
      this.buyunits = false;
      this.entire = false;
    } else {
      this.buyamount = false;
      this.buyunits = false;
      this.percentage= false;
      this.entire = true;

    }
  }
  entire_menu(action: string) {
    if (action === 'hide') {
      this.entire= true;
      this.buyamount = true;
      this.buyunits = true;
      this.percentage= false;
    } else {
      this.buyamount = false;
      this.buyunits = false;
      this.percentage= true;
      this.entire= false;
    }
  }
}
