import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { formatDate } from '@angular/common';
import { NotificationService } from '../notification.service';
import { Userservice } from '../services/userservice.service';
import { IS_UOS_SIGNUP } from '../Models/IS_UOS_SIGNUP';

//import {Utilities} from '../Utilities'

@Component({
  selector: 'app-registernewuser',
  templateUrl: './registernewuser.component.html',
  styleUrls: ['./registernewuser.component.scss']
})
export class RegisternewuserComponent implements OnInit {
  selected_value: any
  vw_Acc: any
  startDate!: Date;
  date = new Date();
  result = new Date().toLocaleDateString('en-GB');
  model: any
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private notify: NotificationService,
    private http: Userservice,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      txtRegNo: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(4)]],
      txtName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)]],
      txtRegEmail: ['', [Validators.required, Validators.email]],
      txtLoginID: ['', Validators.required],
      txtRegMobileNum: ['', Validators.required],
      txtCNIC: ['', Validators.required],
      date: ['', [Validators.required]],
    });
    this.form.get('date')!.patchValue(this.formatDate(new Date()));
    //console.log('Result Date :- ', this.result)
  }


  private formatDate(date: any) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (day.length < 2)
      day = '0' + day;
    if (month.length < 2)
      month = '0' + month;

    //console.log([ day, month, year].join('-'))
    return [year, month, day].join('-');
    // return [ day, month, year].join('-')
  }

  format(inputDate: Date) {
    let date, month, year;

    date = inputDate.getDate();
    month = inputDate.getMonth() + 1;
    year = inputDate.getFullYear();

    date = date
      .toString()
      .padStart(2, '0');

    month = month
      .toString()
      .padStart(2, '0');

    return `${date}/${month}/${year}`;
  }


  onChange(type: any) {
    this.selected_value = type.target.value;
    //console.log('Selected Value ', type.text)
  }

  ValidateLoginId() {
    var regex = new RegExp(/^[A-Za-z0-9_.]+$/)
    let LoginUserId = this.txtLoginID?.value
    const flag = regex.test(LoginUserId)

    if (!flag) {
      this.notify.showError("User ID should not contain space(s) or special characters.", "Error")
    }
  }

  GetUosUserById(id: string) {
    let result = this.http.GetUosUserById(id)
    if (!result)
      this.notify.showError("Already exist.", "Error")
  }

  GetSSUserByID(id: string) {
    let result = this.http.GetUosUserById(id)
    if (!result)
      this.notify.showError("Already exist.", "Error")
  }




  ValidateUserData() {
    debugger
    if (this.vw_Acc.length <= 0)
      this.notify.showError('Something went wrrong', 'Error')
    else {
    //if (this.vw_Acc) {
      if (this.vw_Acc[0].ACC_TITLE.trim().toLowerCase() != this.txtName?.value.trim().toLowerCase()) {
        console.log('this.vw_Acc', this.vw_Acc[0].ACC_TITLE)
        this.notify.showError("Account Title does not match with the detail provided to the AMC.", "Error")
      }
      if (this.vw_Acc[0].ACC_EMAILADDRESS.trim().toLowerCase() != this.txtRegEmail?.value.trim().toLowerCase()) {
        this.notify.showError("Email Address does not match with the detail provided to the AMC.", "Error")
      }
      if (this.vw_Acc[0].ACC_INCORPORATIONNO != this.txtRegMobileNum?.value) {
        this.notify.showError("Incorporation Number does not match with the detail provided to the AMC.", "Error")
      }
      if (this.vw_Acc[0].ACC_CODE != this.txtRegNo?.value) {
        this.notify.showError("Registration Number does not match with the detail provided to the AMC.", "Error")
      }
      if (this.vw_Acc[0].ACC_CNIC != this.txtCNIC?.value) {
        this.notify.showError("Registration Number does not match with the detail provided to the AMC.", "Error")
      }
    }
  }

  GetUserSignUpStatus(ID: number) {
    this.http.GetUserSignUpStatusByAccCode(ID).subscribe((res) => {
      let _usuStatus = res
      if (_usuStatus == 0)
        this.notify.showError("User is Already Created with this Registration No.", "Error")
      else if (_usuStatus == 1)
        this.notify.showError("You have already submitted a request which is under process", "Error")
    })
  }


  async GetInvestorProfile() {
    return new Promise<void>((resolve) => {
      this.http.GetInvestorProfileAcc_Code(this.txtRegNo?.value).subscribe((res) => {
        this.vw_Acc = res
        /*
        if(this.vw_Acc.Status ==0)
        {
          this.notify.showError('Something went wrrong', 'Error')
          return
        }*/
        //console.log('GetInvestorProfileAcc_Code', this.vw_Acc.Status);
      });
      resolve();
    });
  }

  runFunctions() {
    this.GetInvestorProfile().then(() => {
      // console.log('function call successfully')
    })
  }


  //#region 
  CustomerTypeControls() {
    //string _currentClient = System.Configuration.ConfigurationManager.AppSettings["client"];
    let _currentClient = "PICIC"
    if (_currentClient) {
      this.notify.showError("Server Error.", "Error")

      return false;
    }
    if (_currentClient.toLowerCase() == "PICIC") {
      if (this.selected_value == 0) {
        if (this.txtCNIC?.value == "" || this.txtDOB?.value == "" || this.txtLoginID?.value == "" || this.txtName?.value == "" || this.txtRegNo?.value == "" || this.txtRegEmail?.value == "" || this.txtRegMobileNum?.value == "") {
          this.notify.showError("Please fill all the fields.", "Error")
          return false;
        }
      }
      else if (this.selected_value == 1) {
        if (this.txtLoginID?.value == "" || this.txtName?.value == "" || this.txtRegNo?.value == "" || this.txtRegEmail?.value == "" || this.txtRegMobileNum?.value == "") {
          this.notify.showError("Please fill all the fields.", "Error")
          return false;
        }
      }

    }
    else {
      if (this.txtCNIC?.value == "" || this.txtDOB?.value == "" || this.txtLoginID?.value == "" || this.txtName?.value == "" || this.txtRegNo?.value == "" || this.txtRegEmail?.value == "" || this.txtRegMobileNum?.value == "") {
        this.notify.showError("Please fill all the fields.", "Error")
        return false;
      }

    }
    return true;
  }
  //#endregion

  saveNewUser():boolean {
    let results:boolean=false
    if(this.vw_Acc.Status ==0)
    {
      this.notify.showError('Something went wrrong', 'Error')
      return results
    }
    console.log('saveNewUser', this.form.value);
    this.ValidateUserData()
    //console.log('Title ', this.vw_Acc[0].ACC_TITLE)
    //this.ValidateUserData()
    //debugger
    const sign = {} as IS_UOS_SIGNUP
    sign.USU_ACCCODE = parseInt(this.txtRegNo?.value)
    sign.UOS_CREATEDON = null;
    if (this.selected_value == 1)
      sign.USU_ACCOUNTTYPE = 'Individual'
    else if (this.selected_value == 2)
      sign.USU_ACCOUNTTYPE = 'Pension'
    else
      sign.USU_ACCOUNTTYPE = ""
    sign.USU_CNIC = "";
    sign.USU_DOB = null
    sign.USU_EMAILADDRESS = this.txtRegEmail?.value;
    sign.USU_SECRETQUESTION = "";
    sign.USU_USERID = this.txtLoginID?.value;
    sign.USU_TITLE = this.vw_Acc[0].ACC_TITLE
    sign.USU_CELLNUMBER = this.txtRegMobileNum?.value;
    sign.USU_STATUS = "Entered";
    sign.USU_SECRETANSWER = "";

    //#region     
    /*
    sign.USU_NTNNO = this.txtNTN?.value
    sign.USU_AUTHORIZEDPERSON = this.txtAuthPersonName?.value
    sign.USU_INCORPORATIONNO = this.txtCompIncorporationNumber?.value
    sign.USU_AUTHORIZEDPERSONCNIC = this.txtAuthPersonCNIC?.value
    sign.USU_ADDRESSLINE1 = this.txtRegAddress?.value
    */
    //#endregion
    //#region -trackId
    let num = Math.round(Math.random() * (9999 - 1) + 1);
    sign.USU_TRACKID = num.toString()
    sign.USU_TRACKID = sign.USU_TRACKID + "/" + sign.USU_ACCCODE;
    //#endregion

    this.http.AddUOS_SignupNewUser(sign).subscribe((res) => {
      if (res > 0) {
        this.notify.showSuccess('Request sent successfully', 'Save')
        this.reset()
        results = true
      }
      else
        this.notify.showError('Something went wrrong', 'Error')
    });
    return results
  }

  reset() {
    this.form.reset()
  }

  onSubmit() {
    this.form.markAllAsTouched();
    this.runFunctions()
    setTimeout(() => {
      console.log('sleep')
      this.saveNewUser()
    }, 2000);
  }

  get txtLoginID() {
    return this.form.get("txtLoginID")
  }

  get txtRegNo() {
    return this.form.get("txtRegNo")
  }
  get txtName() {
    return this.form.get("txtName")
  }

  get txtRegEmail() {
    return this.form.get("txtRegEmail")
  }
  get txtRegMobileNum() {
    return this.form.get("txtRegMobileNum")
  }
  get txtCNIC() {
    return this.form.get("txtCNIC")
  }

  get txtDOB() {
    return this.form.get("txtDOB")
  }


}
