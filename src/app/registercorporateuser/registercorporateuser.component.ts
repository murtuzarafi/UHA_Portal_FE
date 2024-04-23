import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Userservice } from '../services/userservice.service'
import { DataService } from '../home/data.service';
import { NotificationService } from '../notification.service';
import { IS_UOS_SIGNUP } from '../Models/IS_UOS_SIGNUP'


@Component({
  selector: 'app-registercorporateuser',
  templateUrl: './registercorporateuser.component.html',
  styleUrls: ['./registercorporateuser.component.scss']
})
export class RegistercorporateuserComponent implements OnInit {

  vw_Acc: any
  accAdderess: any
  model: any
  form!: FormGroup;
  strValue!: string

  constructor(private formBuilder: FormBuilder,
    private userService: Userservice,
    private notify: NotificationService,
    private dataService: DataService
  ) { }


  ngOnInit(): void {


    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      txtAccRegCode: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(1), Validators.maxLength(4),]],
      txtCompanyName: ['', [Validators.required]],
      ntnnumber: [''],
      txtNTN: ['', [Validators.required]],
      compregnumber: [''],
      authpersonname: [''],
      txtAuthPersonName: [''],
      txtAuthPersonCNIC: [''],
      authpersoncnic: [''],
      txtRegAddress: [''],
      txtCompIncorporationNumber: [''],

      txtEmail: ['', [Validators.required, Validators.email]],
      txtRegContact: [''],

      registeredcontact: [''],
      registeredaddress: [''],
    });
  }

  //return new Promise<void>((resolve) => {

  async GetInvestorProfile() {
    return new Promise<void>((resolve) => {
      this.userService.GetInvestorProfileAcc_Code(this.txtAccRegCode?.value).subscribe((res) => {
        this.vw_Acc = res
        console.log('GetInvestorProfileAcc_Code', this.vw_Acc);
      });
      resolve();
    });
  }

  GetInvestorAddress() {
    return new Promise<void>((resolve) => {
      this.userService.GetAccountAddress(this.vw_Acc[0].ACC_SYSTEMCODE).subscribe((res) => {
        this.accAdderess = res
        console.log('GetAccountAddress', this.accAdderess);
      });
      resolve();
    });
  }

  runFunctions() {
    this.GetInvestorProfile().then(() => {
      this.GetInvestorAddress().then(() => {
        console.log('function call successfully')
      })
    })
  }

  ValidateUserData(): boolean {

    //#region 
    /*
    this.userService.GetInvestorProfileAcc_Code(this.txtAccRegCode?.value).subscribe((res) => {
      this.vw_Acc = res
      console.log('GetInvestorProfileAcc_Code', this.vw_Acc);
    });

    
    this.userService.GetAccountAddress(this.vw_Acc.ACC_SYSTEMCODE).subscribe((res) => {
      this.accAdderess = res
      console.log('GetAccountAddress', this.accAdderess);
    });
    */
    //#endregion
    this.runFunctions()

    if (this.vw_Acc) {

      debugger
      if (this.vw_Acc[0].ACC_CODE != parseInt(this.txtAccRegCode?.value)) {
        console.log('this.vw_Acc', this.vw_Acc[0].ACC_CODE)
        this.notify.showError("Registration Number does not match with the detail provided to the AMC.", "Error")
      }
      if (this.vw_Acc[0].ACC_TITLE.trim().toLowerCase() != this.companyname?.value.trim().toLowerCase()) {
        console.log('this.vw_Acc', this.vw_Acc[0].ACC_TITLE)
        this.notify.showError("Company name does not match with the detail provided to the AMC.", "Error")
      }
      if (!this.txtNTN?.value) {
        console.log('this.vw_Acc', this.vw_Acc[0].ACC_NTNNO)
        if (this.vw_Acc[0].ACC_NTNNO != this.txtNTN?.value) {
          this.notify.showError("NTN does not match with the detail provided to the AMC.", "Error")
        }
      }
      if (!this.txtCompIncorporationNumber?.value) {
        console.log('this.vw_Acc', this.vw_Acc[0].ACC_INCORPORATIONNO)
        if (this.vw_Acc[0].ACC_INCORPORATIONNO != this.txtCompIncorporationNumber?.value) {
          this.notify.showError("Incorporation Number does not match with the detail provided to the AMC.", "Error")
        }
      }
      if (this.vw_Acc[0].ACC_EMAILADDRESS.trim().toLowerCase() != this.txtEmail?.value.trim().toLowerCase()) {
        this.notify.showError("Email does not match with the detail provided to the AMC.", "Error")
      }
      //SMS Cell Number
      if (this.txtRegContact?.value) {
        if (this.vw_Acc[0].ACC_SMSCELLNUMBER != this.txtRegContact?.value) {
          this.notify.showError("Contact number does not match with the detail provided to the AMC.", "Error")
        }
      }
      //Auth Person
      if (this.vw_Acc[0].ACC_CONTACTPERSON != this.txtAuthPersonName?.value) {
        this.notify.showError("Email does not match with the detail provided to the AMC.", "Error")
      }

      //Auth Person CNIC
      if (this.vw_Acc[0].ACC_CAREOFCNIC != this.txtAuthPersonCNIC?.value) {
        this.notify.showError("Contact person CNIC does not match with the detail provided to the AMC.", "Error")
      }

    }
    if (this.accAdderess) {
      if (!this.txtRegAddress?.value) {
        if (this.accAdderess[0].IAD_ADDRESSLINE1 != this.txtRegAddress?.value) {
          this.notify.showError("Address does not match with the detail provided to the AMC.", "Error")
        }
      }
    }
    else {
      this.notify.showError("Invalid Contact person.", "Error")

    }

    //let  Status = this.userService.GetUserSignUpStatus(txtAccRegCode.Text);


    return false;
  }


  onSubmit() {
    this.runFunctions()
    setTimeout(() => {
      console.log('sleep');
    }, 2000);

    console.log(this.form.value);
    console.log('Title ', this.vw_Acc[0].ACC_TITLE)
    //this.ValidateUserData()
    debugger
    const sign = {} as IS_UOS_SIGNUP
    sign.USU_ACCCODE = parseInt(this.txtAccRegCode?.value)
    sign.UOS_CREATEDON = null;
    sign.USU_ACCOUNTTYPE = "Corporate";
    sign.USU_CNIC = "";
    sign.USU_DOB = null
    sign.USU_EMAILADDRESS = this.txtEmail?.value;
    sign.USU_SECRETQUESTION = "";
    sign.USU_USERID = this.username?.value;
    sign.USU_TITLE = this.vw_Acc[0].ACC_TITLE
    sign.USU_CELLNUMBER = this.txtRegContact?.value;
    sign.USU_STATUS = "Entered";
    sign.USU_SECRETANSWER = "";

    //#region     
    sign.USU_NTNNO = this.txtNTN?.value
    sign.USU_AUTHORIZEDPERSON = this.txtAuthPersonName?.value
    sign.USU_INCORPORATIONNO = this.txtCompIncorporationNumber?.value
    sign.USU_AUTHORIZEDPERSONCNIC = this.txtAuthPersonCNIC?.value
    sign.USU_ADDRESSLINE1 = this.txtRegAddress?.value
    //#endregion

    //#region -trackId
    let num = Math.round(Math.random() * (9999 - 1) + 1);
    sign.USU_TRACKID = num.toString()
    sign.USU_TRACKID = sign.USU_TRACKID + "/" + sign.USU_ACCCODE;
    //#endregion

    this.userService.AddUOS_Signup(sign).subscribe((res) => {
      console.log('Request sent successfully', res)
      //this.notify.showSuccess('Request sent successfully', 'Save')
    });

  }

  reset() {
    this.form.reset()
  }

  get txtAccRegCode() {
    return this.form.get('txtAccRegCode')
  }
  get companyname() {
    return this.form.get('companyname')
  }
  get txtNTN() {
    return this.form.get('txtNTN')
  }
  get txtCompIncorporationNumber() {
    return this.form.get('txtCompIncorporationNumber')
  }
  get txtEmail() {
    return this.form.get('txtEmail')
  }
  get txtRegContact() {
    return this.form.get('txtRegContact')
  }
  get txtAuthPersonName() {
    return this.form.get('txtAuthPersonName')
  }
  get txtAuthPersonCNIC() {
    return this.form.get('xtAuthPersonCNIC')
  }
  get txtRegAddress() {
    return this.form.get('txtRegAddress')
  }

  get username(){
    return this.form.get("username")
  }
}
