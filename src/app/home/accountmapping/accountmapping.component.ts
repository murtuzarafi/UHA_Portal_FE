import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Userservice } from '../../services/userservice.service'
import { createMask } from '@ngneat/input-mask';
import { NotificationService } from '../../notification.service'
import { IS_UOS_MAPPEDACCOUNT } from '../../Models/IS_UOS_MAPPEDACCOUNT'
import { DataService } from '../data.service'
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-accountmapping',
  templateUrl: './accountmapping.component.html',
  styleUrls: ['./accountmapping.component.scss']
})
export class AccountmappingComponent implements OnInit {

  userAccount: IS_UOS_MAPPEDACCOUNT[] = []

  licenseInputMask = createMask('[99999]-9999999-9');

  data: any
  mappedAccDst: any
  accountDst: any
  captchaData: any;
  UserData!: any
  currentDate = new Date();

  accCode: number = 0
  cnicNo: string = ''
  accTitle: string = ''


  form!: FormGroup;
  submitted = false;
  formSubmitAttempt!: boolean;
  user: any

  constructor(private formBuilder: FormBuilder,
    private http: Userservice,
    private notifyService: NotificationService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      accountNo: ['', [Validators.required]],
      accountTitle: ['', [Validators.required]],
      cnic: ['', [Validators.required]],
      typeText: ['', Validators.required]
    });
    console.log('IP Adress :- ', window.location.origin)

    this.UserData = this.dataService.getData()
    console.log('USer Service Data', this.UserData)

    //this.getUser()
    this.getCaptcha()
  }

  getUser() {
    this.http.GetUserEmail(this.UserData[0].UserId).subscribe((response) => {
      console.log(response)
      this.user = response;
    })
  }

  validateMapCode() {
    return new Promise<void>((resolve) => {
      let accCode = this.form.controls['accountNo'].value
      this.http.GetValidateACC_Code_MapAcc(accCode).subscribe((response) => {
        console.log('ValidateACC_Code_MapAcc', response)
        this.mappedAccDst = response
      
      });
      resolve();
    });
  }

  validateAccCode() {
    return new Promise<void>((resolve) => {
      this.accCode = this.form.controls['accountNo'].value
      this.cnicNo = this.form.controls['cnic'].value
      this.accTitle = this.form.controls['accountTitle'].value
      this.http.GetValidateUserACC_Code(this.accCode, this.cnicNo, this.accTitle).subscribe((res) => {
       this.accountDst = res
      console.log('accountDst :- ', this.accountDst)
        debugger
        if (this.accCode === this.accountDst[0].ACC_CODE &&
          this.cnicNo === this.accountDst[0].ACC_CNIC &&
          this.accTitle === this.accountDst[0].ACC_TITLE
        ) {
          this.notifyService.showError('Account is already mapped ', 'shma.com')
          return
        }
      });
      resolve()
    })
  }


  runFunctions() {
    this.validateMapCode().then(() => {
      console.log('validateMapCode function call successfully')
      this.validateAccCode().then(() => {
        console.log('validateAccCode function call successfully')        
      })
    })
  }


  postData() {
      var myObject = {} as IS_UOS_MAPPEDACCOUNT
      myObject.ACC_CODE = this.accCode,
      myObject.ACC_TITLE = this.accTitle,
      myObject.UOS_USERID = this.UserData[0].UserId,
      myObject.UMA_CREATEDWHEN = this.currentDate,
      myObject.UMA_DEFAULT = false,
      myObject.UMA_ACCOUNTSTATUS = "Entered",
      myObject.UMA_DIGITALSIGNATURE = "",
      myObject.UMA_EFFECTIVEFROM = this.currentDate,
      myObject.UMA_EFFECTIVETO = this.currentDate,
      myObject.UMA_MODERATEDWHEN = this.currentDate,
      myObject.UMA_MODERATIONSTATUS = "Pending"
      this.userAccount.push(myObject)
      console.log('IS_UOS_MAPPEDACCOUNT Object ', this.userAccount[0])

      this.http.AddUserAccount(this.userAccount[0]).subscribe((res) => {
        if(res => 0)
        {
          //this.notifyService.showSuccess('Request sent successfully', 'Save')
          this.notifyService.showSuccess(' Your request for has been submitted successfully. Please note  that  the process my take 24-48 hours .', 'Dear Customer !')    
          this.reset() 
        }
        else
          this.notifyService.showError('Something went wrrong', 'Error')
         //this.http.addTest(this.userAccount[0])
      });
      
  }

  onSubmit(): void {
    //console.log(this.form.value);
    this.form.markAllAsTouched()
    this.runFunctions()
    setTimeout(() => {
      console.log('sleep')
      this.postData()
    }, 2000);

    /*
        let accCode = this.form.controls['accountNo'].value
        let cnicNo = this.form.controls['cnic'].value
        let accTitle = this.form.controls['accountTitle'].value
    
        this.http.GetValidateUserACC_Code(accCode, cnicNo, accTitle).subscribe((res) => {
    
          this.accountDst = res
          console.log('Account Dataset :-', this.accountDst[0].ACC_CODE)
    
          if (accCode === this.accountDst[0].ACC_CODE &&
            cnicNo === this.accountDst[0].ACC_CNIC &&
            accTitle === this.accountDst[0].ACC_TITLE
          ) {
            this.notifyService.showError('Account is already mapped ', 'shma.com')
            return
          }
    
          else {
            var myObject = {} as IS_UOS_MAPPEDACCOUNT
    
            myObject.ACC_CODE = accCode,
              myObject.ACC_TITLE = accTitle,
              myObject.UOS_USERID = this.UserData[0].UserId,
              myObject.UMA_CREATEDWHEN = this.currentDate,
              myObject.UMA_DEFAULT = false,
              myObject.UMA_ACCOUNTSTATUS = "Entered",
              myObject.UMA_DIGITALSIGNATURE = "",
              myObject.UMA_EFFECTIVEFROM = this.currentDate,
              myObject.UMA_EFFECTIVETO = this.currentDate,
              myObject.UMA_MODERATEDWHEN = this.currentDate,
              myObject.UMA_MODERATIONSTATUS = "Pending"
            this.userAccount.push(myObject)
            console.log('IS_UOS_MAPPEDACCOUNT Object ', this.userAccount[0])
            this.http.AddUserAccount(this.userAccount[0])
            this.notifyService.showSuccess(' Your request for has been submitted successfully. Please note  that  the process my take 24-48 hours .', 'Dear Customer !')
          }
    
        });
        */
    /*
      if ('' === '') 
        {
        alert("If condition satisfied");
        }*/
  }

  reset() {
    this.form.reset()
  }


  getCaptcha() {

    let canvas = document.querySelector('canvas');
    let pen = canvas?.getContext('2d')

    pen!.clearRect(0, 0, canvas!.width, canvas!.height);
    pen!.font = "40px Roboto"
    pen!.fillStyle = "#1a283f"
    //pen!.fillRect(0,0, 400,400) 

    pen!.fillStyle = "#1a283f"


    let captcha = Math.random().toString(36).substring(2, 7)
    let maxLength = captcha.length
    maxLength = captcha.length;

    //console.log('Max Length ', maxLength)

    let index1 = this.getRandIndex(maxLength);
    let index2 = this.getRandIndex(maxLength);

    //console.log('index1', captcha[index1])
    //console.log('index2', captcha[index2])


    if (isNaN(index1) && isNaN(index2)) {

      if (captcha[index1] === captcha[index1].toLowerCase() && captcha[index2] === captcha[index2].toUpperCase()) {
        captcha = captcha.substring(0, index1 - 1) + captcha[index1].toUpperCase() + captcha.substring(index1 + 1, maxLength)
        captcha = captcha.substring(0, index2 - 1) + captcha[index2] + captcha.substring(index2 + 1, maxLength)
      }
      else if (captcha[index1] === captcha[index1].toUpperCase() && captcha[index2] === captcha[index2].toLowerCase()) {
        ///console.log('Else ', captcha[index1])
        captcha = captcha.substring(0, index1 - 1) + captcha[index1] + captcha.substring(index1 + 1, maxLength)
        captcha = captcha.substring(0, index2 - 1) + captcha[index2].toUpperCase() + captcha.substring(index2 + 1, maxLength)
      }
      else if (captcha[index1] === captcha[index1].toUpperCase() && captcha[index2] === captcha[index2].toUpperCase()) {
        //console.log('Else ', captcha[index1])
        captcha = captcha.substring(0, index1 - 1) + captcha[index1].toUpperCase() + captcha.substring(index1 + 1, maxLength)
        captcha = captcha.substring(0, index2 - 1) + captcha[index2].toUpperCase() + captcha.substring(index2 + 1, maxLength)
      }
    }

    this.data = captcha
    this.captchaData = captcha
    captcha = captcha.split('').join(' ')
    if (captcha.length == 0) {
      //console.log('captcha.length', captcha.length);
      this.getCaptcha()
    }
    pen!.fillText(captcha, 40, 40)
  }


/*
  getCaptcha() {

    let canvas = document.querySelector('canvas');
    let pen = canvas?.getContext('2d')

    pen!.clearRect(0, 0, canvas!.width, canvas!.height);
    pen!.font = "30px Georgia"
    pen!.fillStyle = "gery"
    //pen!.fillRect(0,0, 400,400) 

    pen!.fillStyle = "Orange"

    let captcha = Math.random().toString(36).substring(2, 8)
    let maxLength = captcha.length
    maxLength = captcha.length;

    console.log('Max Length ', maxLength)

    let index1 = this.getRandIndex(maxLength);
    let index2 = this.getRandIndex(maxLength);

    console.log('index1', captcha[index1]?.toLowerCase().toUpperCase())
    console.log('index2', captcha[index2]?.toLowerCase().toUpperCase())

    captcha = captcha.substring(0, index1 - 1) + captcha[index1]?.toLowerCase().toUpperCase() + captcha.substring(index1 + 1, maxLength)
    captcha = captcha.substring(0, index2 - 1) + captcha[index2]?.toLowerCase().toUpperCase() + captcha.substring(index2 + 1, maxLength)

    console.log('Captcha', captcha)
    this.data = captcha
    captcha = captcha.split('').join(' ')
    if (captcha.length == 0)
      this.getCaptcha()

    pen!.fillText(captcha, 40, 40)
  }
  */

  getRandIndex(maxLength: number) {
    return Math.floor(Math.random() * maxLength)
  }

  get cnic() {
    return this.form.get('cnic')
  }

  checkit() {

    console.log(this.form.get('email')!.value)
    console.log(this.form.get('typeText')!.value)
    let captchaValue = this.form.get('typeText')!.value
    console.log('data ', this.data)
    if (this.data == captchaValue) {
      alert('Matched')
      //return false
    }
    else {
      alert('Invalid')
      //console.log('typedata', this.data)
    }
  }
}
