import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { IS_TRX_TRX_MASTER } from '../Models/IS_TRX_TRX_MASTER';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Userservice {

  private methodName: string = ''

  private appCode: string = 'appCode'
  private userName: string = 'userName'
  private password: string = 'password'
  private ipAddress: string = 'ipAddress'
  private macAddress: string = 'macAddress'
  private sysName: string = 'sysName'
  private timeOffset: string = 'timeOffset'

  private REST_API_SERVER_Old = "http://128.1.22.66:8090/User";
  private REST_API_SERVER = "http://localhost:44335/User";
  private REST_API_SERVER_Liv = "http://128.1.22.158/Portal/User"

  constructor(private http: HttpClient) { }

  public GetUserEmail(input: string) {
    ///console.log('URL ', this.REST_API_SERVER + '/GetMailByUserId?input=' + input)
    return this.http.get(this.REST_API_SERVER + '/GetMailByUserId?input=' + input)
  }

  public GetUser(appCode: string, userName: string, password: string, ipAddress: string, macAddress: number, sysName: number, timeOffset: number) {
    const URL_Part2 = this.methodName = "/AuthenticateUser" +
      "?" + this.appCode + "=" + appCode +
      "&" + this.userName + "=" + userName +
      "&" + this.password + "=" + password +
      "&" + this.ipAddress + "=" + ipAddress +
      "&" + this.macAddress + "=" + macAddress +
      "&" + this.sysName + "=" + sysName +
      "&" + this.timeOffset + "=" + timeOffset
    ///console.log('URL :-  ', this.REST_API_SERVER + URL_Part2)
    return this.http.get(this.REST_API_SERVER + URL_Part2)
  }

  public GetCNICByEmail(email: string) {
    return this.http.get(this.REST_API_SERVER + '/GetCNICByEmail?input=' + email)
  }

  public GetSwitchAccounts(userId: string) {
    //console.log('GetSwitchAccounts INSIDE USER SERVICE :- ', userId);
    ///console.log(this.REST_API_SERVER + '/GetSwitchAccounts?input=' + userId);

    return this.http.get(this.REST_API_SERVER + '/GetSwitchAccounts?input=' + userId)
  }

  public GetAndSendPassword(compId: number, appCode: string, UserId: string, emailid: string, timeOffset: number) {
    const URL_Part2 = "?companyId=" + compId +
      "&" + this.appCode + "=" + appCode +
      "&" + "UserId" + "=" + UserId +
      "&" + "emailid" + emailid +
      "&" + timeOffset + "=" + 0;

    return this.http.get(this.REST_API_SERVER + '/GetAndSendPassword?input=' + URL_Part2)
  }

  public GetUosUserById(id: string) {
    let result
    this.http.get(this.REST_API_SERVER + '//User/GetUosUserById?input=' + id).subscribe((res) => {
      result = res
    });
    if (result == true)
      return true
    else
      return false
  }

  public GetSSUserByID(id: string) {
    let result
    this.http.get(this.REST_API_SERVER + '//User/GetSSUserByID?input=' + id).subscribe((res) => {
      result = res
    });
    if (result == true)
      return true
    else
      return false
  }

  public GetUserSignUpStatusByAccCode(ID:number){
    return this.http.get(this.REST_API_SERVER + '/GetUserSignUpStatusByAccCode?userId=' + ID)
  }
  public GetMailByUserId(userName: string) {

    return this.http.get(this.REST_API_SERVER + '/GetMailByUserId?userId=' + userName)
  }

  public GetCNICByUserId(userName: string) {

    return this.http.get(this.REST_API_SERVER + '/GetCNICByUserId?userId=' + userName)
  }

  public GetFundInformation(accCode: string) {

    ///console.log("Fund Information :- ", this.REST_API_SERVER + '/GetDashBoardFundInfo?input=' + accCode);
    return this.http.get(this.REST_API_SERVER + '/GetDashBoardFundInfo?input=' + accCode)
  }


  public GetProductFundCutOffTimeWithProductCodeAndDayIDPaging(PageNo: number, ProductCode: string, DayID: string) {
    this.http.get(this.REST_API_SERVER + '/GetProductFundCutOffTimeWithProductCodeAndDayIDPaging?PageNo=' + PageNo + '&ProductCode=' + ProductCode + '&DayID=' + DayID).subscribe((res) => {
      ////console.log('GetProductFundCutOffTimeWithProductCodeAndDayIDPaging:- ', res)
      return res
    });
  }

  public GetPersonalInformation(accCode: string) {
    return this.http.get(this.REST_API_SERVER + '/GetDashBoardUserInfo?input=' + accCode)
  }

  public GetUnpaidInvestment(systemcode: string, accCode: number) {
    return this.http.get(this.REST_API_SERVER + '/GetUnpaidInvestment?systemcode=' + systemcode + '&accCode=' + accCode)
  }

  public GetPendingTransaction(systemcode: string, accCode: number) {
    return this.http.get(this.REST_API_SERVER + '/GetPendingTransaction?systemcode=' + systemcode + '&accCode=' + accCode)
  }

  public GetInvestorProfileByUserId(userID: any) {
    return this.http.get(this.REST_API_SERVER + '/GetInvestorProfileByUserId?userID=' + userID)
  }

  public GetInvestorProfileAcc_Code(userID: any) {
    return this.http.get(this.REST_API_SERVER + '/GetInvestorProfileAcc_Code?userID=' + userID)
  }


  public GetLimitAmountsSSA(_SSA_ID: number, _CurrentDate: Date) {
    return this.http.get(this.REST_API_SERVER + '/GetLimitAmountsSSA?_SSA_ID=' + _SSA_ID + '&_CurrentDate=' + _CurrentDate)
  }

  public GetTransactionCountLimit(_ACC_Code: number, _CurrentDate: Date) {
    return this.http.get(this.REST_API_SERVER + '/GetTransactionCountLimit?_ACC_Code=' + _ACC_Code + '&_CurrentDate=' + _CurrentDate)
  }

  public GetCurrentHoldingAmountTrxProcessed(_ACC_Code: number, _CurrentDate: Date) {
    return this.http.get(this.REST_API_SERVER + '/GetCurrentHoldingAmountTrxProcessed?_ACC_Code=' + _ACC_Code + '&_CurrentDate=' + _CurrentDate)
  }

  public GetInvestorRequestedAmtForPerDayLimit(_ACC_Code: number, _CurrentDate: Date) {
    return this.http.get(this.REST_API_SERVER + '/GetInvestorRequestedAmtForPerDayLimit?_ACC_Code=' + _ACC_Code + '&_CurrentDate=' + _CurrentDate)
  }


  public GetFundInformationWFilterManagementCompany(accCode: string, mgCode: string) {

    ///console.log("Fund Information :- ", this.REST_API_SERVER + '/GetDashBoardFundInfoFilterManagmentCompany?input=' + accCode + '&input2=' + mgCode);
    return this.http.get(this.REST_API_SERVER + '/GetDashBoardFundInfoFilterManagmentCompany?input=' + accCode + '&input2=' + mgCode)
  }

  public GetAlertMaster() {
    return this.http.get(this.REST_API_SERVER + '/GetAlertMaster')
  }

  public GetAccountDetails(userAccCode: string) {
    return this.http.get(this.REST_API_SERVER + '/GetAccountDetails?accCode=' + userAccCode)
  }



  public GetServiseFee(PrdCode: string, Amount: number) {
    this.http.get(this.REST_API_SERVER + '/GetServiseFee?PrdCode=' + PrdCode + '&Amount=' + Amount).subscribe((res) => {
      ///console.log('GetServiseFee:- ', res)
      return res
    });
  }

  /*
    public  GetServiseFee(PrdCode: string, Amount: number) {
      console.log('GetServiseFee :- ', this.REST_API_SERVER + '/GetServiseFee?PrdCode=' + PrdCode + '&Amount=' + Amount);
       this.http.get(this.REST_API_SERVER + '/GetServiseFee?PrdCode=' + PrdCode + '&Amount=' + Amount).subscribe((res) => {      
        console.log('GetServiseFee:- ', res)
        return res
      });
    }
  
  */
  public GetProductList(accSystemCode: string) {
    ///console.log("GetProductList", accSystemCode)
    return this.http.get(this.REST_API_SERVER + '/GetProductList?accSystemCode=' + accSystemCode)
  }

  public GetProductListWithManagmentCompany(accSystemCode: string, mgCompanyCode: string) {
    ///console.log("GetProductListWithManagmentCompany", this.REST_API_SERVER + '/GetProductListFilterManagmentCompany?accSystemCode=' + "'" + accSystemCode + "'" + '&mgCompanyCode=' + "'" + mgCompanyCode + "'")

    return this.http.get(this.REST_API_SERVER + '/GetProductListFilterManagmentCompany?accSystemCode=' + accSystemCode + '&mgCompanyCode=' + mgCompanyCode);
    //return this.http.get(this.REST_API_SERVER + '/GetProductListFilterManagmentCompany?accSystemCode=' +"'"+ accSystemCode +"'"+ '&mgCompanyCode=' + "'"+mgCompanyCode+"'")
  }

  public GetConversionProductListFilterManagmentCompany(accSystemCode: string, mgCompanyCode: string) {
    ///console.log("GetConversionProductListFilterManagmentCompany", this.REST_API_SERVER + '/GetProductListFilterManagmentCompany?accSystemCode=' + "'" + accSystemCode + "'" + '&mgCompanyCode=' + "'" + mgCompanyCode + "'")
    return this.http.get(this.REST_API_SERVER + '/GetConversionProductListFilterManagmentCompany?accSystemCode=' + accSystemCode + '&mgCompanyCode=' + mgCompanyCode);
    //return this.http.get(this.REST_API_SERVER + '/GetProductListFilterManagmentCompany?accSystemCode=' +"'"+ accSystemCode +"'"+ '&mgCompanyCode=' + "'"+mgCompanyCode+"'")
  }



  public GetInvestmentByPage(accSystemCode: string) {
    ////console.log("GetProductList", accSystemCode)
    return this.http.get(this.REST_API_SERVER + '/GetInvestmentByPage?accSystemCode=' + accSystemCode)
  }

  public GetAlerts(userAccCode: string) {
    return this.http.get(this.REST_API_SERVER + '/GetAlert?input=' + userAccCode)
  }

  public GetValidateACC_Code_MapAcc(userAccCode: number) {
    return this.http.get(this.REST_API_SERVER + '/ValidateACC_Code_MapAcc?accCode=' + userAccCode)
  }

  public AddUserAccount(iS_UOS_MAPPEDACCOUNT: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(iS_UOS_MAPPEDACCOUNT);
    return this.http.post(this.REST_API_SERVER + '/AddAccount', body, { 'headers': headers })
  }

  public SendToInvesterEmail(TransactionPin: number, iS_UOS_MAPPEDACCOUNT: any) {
    let itemExists = false;
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(TransactionPin, iS_UOS_MAPPEDACCOUNT);
    this.http.post('API/SendToInvesterEmail', body).subscribe((res: any) => {
      itemExists = res.exists ? true : false;
    });
    return itemExists; // always returns false
  }

  public InsertOnlineTransactionPIN(iS_TRX_TRX_ONLINETRANSACTIONPIN: any): Observable<any> {
    //////////////////console.log('Data ', iS_TRX_TRX_ONLINETRANSACTIONPIN)
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(iS_TRX_TRX_ONLINETRANSACTIONPIN);
    //console.log(this.REST_API_SERVER + '/InsertOnlineTransactionPIN', body, { 'headers': headers })
    return this.http.post<any>(this.REST_API_SERVER + '/InsertOnlineTransactionPIN', body, { 'headers': headers })
  }
  /*
  public AddTrxMaster(iS_TRX_MASTER: IS_TRX_TRX_MASTER ): Observable<IS_TRX_TRX_MASTER> {
      console.log('Data ', iS_TRX_MASTER)
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(iS_TRX_MASTER);
    return this.http.post<IS_TRX_TRX_MASTER>(this.REST_API_SERVER + '/AddTrxMaster', body, { 'headers': headers })
  }
  */
  public AddTrxMaster(iS_TRX_MASTER: any): Observable<any> {
    //////////////console.log('AddTrxMaster ', iS_TRX_MASTER)
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(iS_TRX_MASTER);
    //////////////console.log(body)
    return this.http.post<any>(this.REST_API_SERVER + '/AddTrxMaster', body, { 'headers': headers })
  }


  public AddUOS_SignupNewUser(sign: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(sign);
   // console.log(body)
    return this.http.post<any>(this.REST_API_SERVER + '/AddUOS_SignupNewUser', body, { 'headers': headers })
  }

  public AddUOS_Signup(sign: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(sign);
    console.log(body)
    return this.http.post<any>(this.REST_API_SERVER + '/AddUOS_Signup', body, { 'headers': headers })
  }




  public CreteAccountProfileTransaction(AccountProfile: any): Observable<any> {
    ///console.log('Account Profile ', AccountProfile)
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(AccountProfile);
    console.log(body)
    return this.http.post<any>(this.REST_API_SERVER + '/AddAccProductProfile', body, { 'headers': headers })
  }


  public AddTrxRequested(iTRX_REQUESTED: any): Observable<any> {
    ///console.log('AddTrxRequested ', iTRX_REQUESTED)
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(iTRX_REQUESTED);
    ///console.log(body)
    return this.http.post<any>(this.REST_API_SERVER + '/AddTrxRequested', body, { 'headers': headers })
  }


  public CreateTransactionSaleCommission(iS_TRX_COMM_SALE: any): Observable<any> {
    ///console.log('CreateTransactionSaleCommission ', iS_TRX_COMM_SALE)
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(iS_TRX_COMM_SALE);
    ///console.log(body)
    return this.http.post<any>(this.REST_API_SERVER + '/CreateTransactionSaleCommission', body, { 'headers': headers })
  }

  public CreatePayment(iS_TRX_PAY_PAYMENT: any): Observable<any> {
    ///console.log('CreateTransactionSaleCommission ', iS_TRX_PAY_PAYMENT)
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(iS_TRX_PAY_PAYMENT);
    ///console.log(body)
    return this.http.post<any>(this.REST_API_SERVER + '/CreatePayment', body, { 'headers': headers })
  }

  public SaveTransations(data: any): Observable<any> {
    console.log('SaveTransations ', data)
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(data);
    //console.log(body)
    return this.http.post<any>(this.REST_API_SERVER + '/SaveTransations', body, { 'headers': headers })
  }

  //SaveConversion

  public SaveConversion(data: any): Observable<any> {
    console.log('SaveConversion ', data)
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(data);
    //console.log(body)
    return this.http.post<any>(this.REST_API_SERVER + '/SaveConversion', body, { 'headers': headers })
  }

  public SendEmailToInvester(transactionPin: string, mailTo: any) {
    // console.log('transactionPin SendEmailToInvester Method ', transactionPin)
    // console.log('Email Method SendEmailToInvester ', mailTo)
    let itemExists = false;
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(transactionPin, mailTo);
    this.http.post(this.REST_API_SERVER + '/SendEmailToInvester' + '?transactionPin=' + transactionPin + '&mailTo=' + mailTo, body).subscribe((res: any) => {
      console.log('Response  ', res)
      //itemExists = res.exists ?  true : false;
      itemExists = res
      console.log('itemExists  ', itemExists)
    });
    return itemExists; // always returns false
  }

  public GetValidateUserACC_Code(userAccCode: number, Cnic: string, accTitle: string) {
    console.log(this.REST_API_SERVER + '/ValidateUserACC_Code?acccode=' + userAccCode + '&Cnic=' + "'" + Cnic + "'" + '&account_Title=' + "'" + accTitle + "'")
    return this.http.get(this.REST_API_SERVER + '/ValidateUserACC_Code?acccode=' + userAccCode + '&Cnic=' + Cnic + '&account_Title=' + accTitle)
  }

  public GetInstrumentDetails(Genid: string) {
    console.log(this.REST_API_SERVER + '/GetInstrumentDetails?Genid=' + Genid + "'")
    return this.http.get(this.REST_API_SERVER + '/GetInstrumentDetails?Genid=' + Genid + "'")
  }

  public GetAcc_BankAccountDetails2(ACC_SYSTEMCODE: string) {
    return this.http.get(this.REST_API_SERVER + '/GetAcc_BankAccountDetails2?input=' + ACC_SYSTEMCODE + "'")
  }

  public async GetAcc_BankAccountDetails(ACC_SYSTEMCODE: string) {
    //eturn await this.http.get(this.REST_API_SERVER + '/GetAcc_BankAccountDetails?input=' + ACC_SYSTEMCODE+ "'")    

    try {
      const Response = await this.http.get(this.REST_API_SERVER + '/GetAcc_BankAccountDetails?input=' + ACC_SYSTEMCODE + "'").subscribe((res) => {
        console.log("planets :-", Response);
        return Response;
      });

    } catch (error) {
      console.log("There was a problem while fetching data.");
      console.error(error);
    } finally {
      console.log("Request completed");
    }

  }

  public async GetAcc_BankBranchDetails(param1: number, param2: number) {
    this.http.get(encodeURI(this.REST_API_SERVER + '/GetAcc_BankBranchDetails?param1=' + param1 + '&param2=' + param2)).subscribe((res) => {
      return res;
    })
    //const test = await this.http.get(encodeURI(this.REST_API_SERVER + '/GetAcc_BankBranchDetails?param1='+param1+'&param2='+param2))

  }


  public GetAcc_BankBranchDetails2(param1: number, param2: number) {
    return this.http.get(encodeURI(this.REST_API_SERVER + '/GetAcc_BankBranchDetails2?param1=' + param1 + '&param2=' + param2))

  }

  getPdfReport(dtFrom: any, dtTo: any) {
    console.log('parameter Date From :- ', dtFrom)
    console.log('parameter Date To :- ', dtTo)

    //const reportUrl = 'http://128.1.22.66/CrystalReportWebAPI/api/Reports/UHAPortal/AccountStatementReport?dtFrom=01%2F01%2F2024&dtTo=03%2F25%2F2024&ACC_CODE=1&MachineName=sdf&ClientMachineIP=sd&LoggedInUserName=khati&ReportFormat=PDF';
    const reportUrl = 'http://128.1.22.66/CrystalReportWebAPI/api/Reports/UHAPortal/AccountStatementReport?dtFrom=' + dtFrom + '&dtTo=' + dtTo + '&ACC_CODE=1&MachineName=aak66&ClientMachineIP=128.1.22.66&LoggedInUserName=SUPER&ReportFormat=PDF'
    console.log(reportUrl)
    return this.http.get(encodeURI(reportUrl))
  }

  /*
    async  fetchData(ACC_SYSTEMCODE:string) {
      try {
        console.log("fetc Data :-",  ACC_SYSTEMCODE);  
        const Response = await this.http.get(this.REST_API_SERVER + '/GetAcc_BankAccountDetails?input=' + ACC_SYSTEMCODE+ "'");
        const planets = await Response.subscribe((res)=>{        
          console.log("planets :-",  res);  
          return res;
        });      
      } catch (error) {
        console.log("There was a problem while fetching data.");
        console.error(error);
      } finally {
        console.log("Request completed");
      }
    }
  */

  public GetDefaultInstrumentDetails() {
    return this.http.get(this.REST_API_SERVER + '/GetDefaultInstrumentDetails')
  }

  public GetIS_PRD_PRODUCTACCOUNT_Details(param1: string) {

    return this.http.get(this.REST_API_SERVER + '/GetIS_PRD_PRODUCTACCOUNT_Details?fndId=' + param1)

    /*
        this.http.get(this.REST_API_SERVER + '/GetIS_PRD_PRODUCTACCOUNT_Details?fndId=' + param1 ).subscribe((res) => {
          console.log('api Get IS_PRD_PRODUCTACCOUNT Details:- ', res)
          return res
        });
       */
  }

  public GetAccountAddress(param1: string) {
    ///GetAccountAddress?accCode=0b4c102b-37c2-4ad3-b6dc-b6f4bc321571
    return this.http.get(this.REST_API_SERVER + '/GetAccountAddress?accCode=' + param1)
  }
  public GetProductCommissionMaster(_transactionType: string, _productCode: string, _fundClassCode: string, _fundUnitType: string) {
    console.log(this.REST_API_SERVER + '/GetProductCommissionMaster?_transactionType=' + _transactionType + '&_productCode=' + _productCode + '&_fundClassCode=' + _fundClassCode + '&_fundUnitType=' + _fundUnitType)

    /*
    this.http.get(this.REST_API_SERVER + '/GetProductCommissionMaster?_transactionType=' +"'"+ _transactionType+"'"+'&_productCode=' +"'"+_productCode +"'"+'&_fundClassCode=' +"'"+ _fundClassCode +"'"+'&_fundUnitType=' +"'"+ _fundUnitType+"'").subscribe((res) => {
      console.log('GetProductCommissionMaster:- ', res)
      return res 
    });
    */
    this.http.get(this.REST_API_SERVER + '/GetProductCommissionMaster?_transactionType=' + _transactionType + '&_productCode=' + _productCode + '&_fundClassCode=' + _fundClassCode + '&_fundUnitType=' + _fundUnitType).subscribe((res) => {
      ///console.log('api Get ProductCommission Master:- ', res)
      return res
    });

  }


  public GetProductCommissionBreakup(_PCM_RULEID: string) {
    return this.http.get(this.REST_API_SERVER + '/GetProductCommissionMaster?_PCM_RULEID=' + _PCM_RULEID + "'")
  }

  public GetManagementCompanies() {
    ///console.log(this.REST_API_SERVER + '/GetManagementCompanies')
    return this.http.get(this.REST_API_SERVER + '/GetManagementCompanies')
  }

  public GetCurrency() {
    ///console.log(this.REST_API_SERVER + '/GetCurrency')
    return this.http.get(this.REST_API_SERVER + '/GetCurrency')
  }


  addTest(iS_UOS_MAPPEDACCOUNT: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(iS_UOS_MAPPEDACCOUNT);
    console.log('Address :- ', this.REST_API_SERVER + '/test', body, { 'headers': headers })
    return this.http.post(this.REST_API_SERVER + '/test', body, { 'headers': headers })
  }

  getIPAddress() {
    this.http.get("http://api.ipify.org/?format=json").subscribe((res: any) => {

      //this.ipAddress = res.ip;
      this.ipAddress = '128.1.22.66';
      ///console.log('INSIDE getIPAddress() Method :- ' + this.ipAddress);
    });
  }
  /*
    getPdfReport() {
      const reportUrl = 'http://128.1.22.66/CrystalReportWebAPI/api/Reports/UHAPortal/AccountStatementReport?dtFrom=01%2F01%2F2024&dtTo=03%2F25%2F2024&ACC_CODE=1&MachineName=sdf&ClientMachineIP=sd&LoggedInUserName=khati&ReportFormat=PDF';
      //const reportUrl = 'src/assets/Report_20240327103752.pdf'
      return this.http.get(reportUrl, { responseType: 'blob', observe: 'response' }).pipe(
        map((res: any) => {
          return new Blob([res.body], { type: 'application/pdf' });
        })
      );      
    }
    */

  fetchPDF(): any {
    console.log('open PDF ')
    const path = 'assets/pdf/Report_20240327103752.pdf'
    return path;
  }

}
