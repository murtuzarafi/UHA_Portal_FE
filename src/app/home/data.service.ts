import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public myGlobalVar$ = new BehaviorSubject<string>("");
  public myStatusVar$ = new BehaviorSubject<string>("Logout");

  logined = false

  public userData = [{
    ACC_Code: "",
    Token: "",
    Name: "",
    UserId: "",
    UserTypeId: "",
    Email: "",
    PRD_MANAGEMENTCOMPANY: "",
    ACC_SYSTEMCODE: "",
    DST_ID: "",
    DSB_ID: "",
    ACC_ACCOUNTTYPE: "",
    FAC_ID: "",
    ACC_ISSSAACCOUNT: "",
    SSA_ID: "",
    ACC_PAYMENTTYPE: ""
  }];

  public UserOnline = [{
    USERID: "",
    USER_FIRSTNAME: "",
    USER_MIDDLENAME: "",
    USER_LASTNAME: "",
    CNIC: "",
    USEREMAIL: "",
    USER_ALTEREMAIL: "",
    REGISTERDATE: "",
    CREATEDWHEN: "",
    STATE: "",
    LOGINFROM: "",
    EFFECTIVETO: "",
    MODERATEDWHEN: "",
    MODERATIONSTATUS: "",
    LOGINSTATUS: "",
    sSToken: ""
  }];

  public ActiveAccount = [{
    ACC_SYSTEMCODE: "",
    ACC_CODE: 0,
    ACC_ACCOUNTTYPE: "",
    ACC_TITLE: "",
    ACC_CNIC: "",
    ACC_EMAILADDRESS: "",
    ACC_ISZEROACCOUNT: false,
    FAC_ID: "",
    DST_ID: "",
    DSB_ID: "",
    ACC_OPENINGDATE: "",
    ACC_SUSPENDEDFROM: "",
    ACC_SUSPENDEDTO: "",
    ACC_CNICEXPIRYDATE: "",
    ACC_CAREOFCNIC: ""

  }];

  constructor() { }

  getData() {
    return this.userData;
  }

  setData(obj: any) {
    ///console.log('Set User Data :-', obj)

    this.userData[0].ACC_Code = obj.Acc_code,
    this.userData[0].Token = obj.Token
    this.userData[0].Name = obj.Name
    this.userData[0].UserId = obj.UserId
    this.userData[0].UserTypeId = obj.UserTypeId
    this.userData[0].Email = obj.Email
    this.userData[0].PRD_MANAGEMENTCOMPANY = obj.PRD_MANAGEMENTCOMPANY
    this.logined = true;
    console.log('User Service :-', this.userData)

    this.setMyGV(obj.UserId)
    this.setStatus('Logged in')
  }

  setUserAccCode(accCode: string) {
    ///   console.log('Update Account Code ', this.userData[0])
    this.userData[0].ACC_Code = accCode
    ////console.log('Updated Account Code Done ', this.userData[0])

  }

  setAccSystemCode(accSystemCode: string) {
    this.userData[0].ACC_SYSTEMCODE = accSystemCode;
    ///console.log('Update Account System Code ', this.userData[0].ACC_SYSTEMCODE)
  }

  getAccSystemCode() {
    //console.log('Get User Account System Code ', this.userData[0].ACC_SYSTEMCODE)
    return this.userData[0].ACC_SYSTEMCODE
  }
  getUserAccountCode() {
    //console.log('Get User Account Code ', this.userData[0].ACC_Code)
    return this.userData[0].ACC_Code
  }

  getUserManagementCompany() {
    //console.log('Get User Management Company Get User Account Code ', this.userData[0].PRD_MANAGEMENTCOMPANY)
    return this.userData[0].PRD_MANAGEMENTCOMPANY
  }

  setUserManagementCompany(mgCode: string) {
    ///console.log('Update Management Company ', this.userData[0])
    this.userData[0].PRD_MANAGEMENTCOMPANY = mgCode
    ///console.log('Updated Management Company Done ', this.userData[0])

  }

  setInvestorProfile(obj: any) {

    ///console.log('OBJECT INVESTER PROFILE :-', obj)
    this.userData[0].ACC_Code = obj[0].ACC_CODE
    this.userData[0].PRD_MANAGEMENTCOMPANY = obj[0].MANAGEMENTCOMPANY
    this.userData[0].ACC_SYSTEMCODE = obj[0].ACC_SYSTEMCODE
    this.userData[0].DST_ID = obj[0].DST_ID
    this.userData[0].DSB_ID = obj[0].DSB_ID
    this.userData[0].ACC_ACCOUNTTYPE = obj[0].ACC_ACCOUNTTYPE
    this.userData[0].FAC_ID = obj[0].FAC_ID
  }


  setInvestorAccountProfile(obj: any) {
    this.userData[0].ACC_ISSSAACCOUNT = obj[0].ACC_ISSSAACCOUNT
    this.userData[0].SSA_ID = obj[0].SSA_ID
    this.userData[0].ACC_PAYMENTTYPE = obj[0].ACC_PAYMENTTYPE

    //console.log('ACC_PAYMENTTYPE', obj[0].ACC_PAYMENTTYPE)
  }


  logout() {
    this.userData[0].ACC_Code = '',
      this.userData[0].Token = '',
      this.userData[0].Name = '',
      this.userData[0].UserId = '',
      this.userData[0].UserTypeId = '',
      this.userData[0].Email = '',
      this.logined = true;
    ///console.log('User Service :-', this.userData)
  }



  setStatus(val: string) {
    this.myStatusVar$.next(val);
  }

  getStatus() {
    return this.myStatusVar$.asObservable();
  }


  setMyGV(val: string) {
    this.myGlobalVar$.next(val);
  }

  getMyGV() {
    return this.myGlobalVar$.asObservable();
  }

}

