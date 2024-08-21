import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from './../auth/auth.service';
import { Userservice } from '../services/userservice.service'
import { DataService } from '../home/data.service'
import { NotificationService } from '../notification.service'
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

 

  ////////////dataList: Array<any> = [{ code: 1, name: "Askari Cash Fund (6487)" }, { code: 2, name: "Fund Gold (6487) " }, { code: 3, name: "Fund Silver (7788)" }];
  dataP: any
  accCode: string = ''
  userName: string = ''
  data: any
  loginForm!: FormGroup;
  submitted = false;
  formSubmitAttempt!: boolean;
  user: any
  captchaData: any;
  // dstMCompanies: any;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: Userservice,
    private dataService: DataService,
    private notify: NotificationService,
    private NgxUiLoaderService: NgxUiLoaderService,
    private ngxService: NgxUiLoaderService,
    public translate: TranslateService
  ) { }

  ngOnInit(): void {
   
     
    

    
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]], //, Validators.pattern("(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>\"'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}")]
      /////////  mCompany: [Validators.required],
      typeText: ['', Validators.required]
    });

    console.log('IP Adress :- ', window.location.origin)
    // this.getUser()
    this.getCaptcha();
    ////////////////////this.getManagementCompanies();
    /*
        window.addEventListener('beforeunload', function (e) {      
          e.preventDefault();
          e.returnValue = '';
        });
        */
    const pwShowHide: NodeListOf<HTMLElement> = document.querySelectorAll(".showHidePw");
    const pwFields: NodeListOf<HTMLInputElement> = document.querySelectorAll(".password");


    //   js code to show/hide password and change icon
    pwShowHide.forEach((eyeIcon: HTMLElement) => {
      eyeIcon.addEventListener("click", () => {
        pwFields.forEach((pwField: HTMLInputElement) => {
          if (pwField.type === "password") {
            pwField.type = "text";

            pwShowHide.forEach((icon: HTMLElement) => {
              icon.classList.replace("uil-eye-slash", "uil-eye");
            });
          } else {
            pwField.type = "password";

            pwShowHide.forEach((icon: HTMLElement) => {
              icon.classList.replace("uil-eye", "uil-eye-slash");
            });
          }
        });
      });
    });
    

  }
  /*
    getManagementCompanies() {
      this.userService.GetManagementCompanies().subscribe((response) => {
        this.dstMCompanies = response;
        console.log('data array :-  ', this.dstMCompanies);
      })
    }
    */
  /*
    getUser() {
      console.log('User Name ', this.authService.login(this.loginForm.controls['userName'].value))
      this.userService.GetUserEmail(this.loginForm.controls['userName'].value).subscribe((response) => {
        console.log('getUser()  ', response)
        this.user = response;
      })
    }
    */

  get formControl() {
    return this.loginForm.controls;
  }

  onLogin(): void {
   
    if (this.loginForm.valid) {
      
      let uName = this.loginForm.controls['userName'].value
      let uPWD = this.loginForm.controls['password'].value
      this.userName = this.loginForm.controls['userName'].value

      if (this.checkit()) {
        try {
          this.userService.GetUser('1234567', uName, uPWD, '128.1.22.66', 1, 1, 0).subscribe((response) => {
            console.log('shell service response   ', response)
            this.data = response
            if (this.data.ErrorMessage !== "Invalid User, User Name / Password Invalid" && this.data.ErrorMessage !== null) {
              console.log('Response Hai ', this.data)
              this.dataService.setData(this.data);                      
              this.getInvestorProfile()              
              setTimeout(() => {
                this.NgxUiLoaderService.getDefaultConfig;
                this.router.navigate(['/home/portfoliosummary'], { skipLocationChange: true })
              }, 500);
             
            }
            else if (this.data.ErrorMessage === "Invalid User, User Name / Password Invalid") {
              //console.log('Response Error Hai ', this.data.ErrorMessage)
              this.notify.showError(this.data.ErrorMessage, 'Error')
              this.router.navigate(['/login'])
            }
          });
        }
        catch (e) {
          this.notify.showError('Invalid User, User Name / Password Invalid', 'Error')
        }
      }
    }
    
    
  }

  
  getInvestorProfile() {
    return new Promise<void>((resolve) => {
      console.log('User Name ', this.userName);
      ///this.userService.GetInvestorProfileAcc_Code(this.userName).subscribe((res) => {
      this.userService.GetInvestorProfileByUserId(this.userName).subscribe((res) => {
        this.dataP = res
        console.log('GetInvestorProfileAcc_Code', this.dataP);
        this.dataService.setInvestorProfile(this.dataP)
      });
    
      resolve();
    });
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

    console.log('Max Length ', maxLength)

    let index1 = this.getRandIndex(maxLength);
    let index2 = this.getRandIndex(maxLength);

    console.log('index1', captcha[index1])
    console.log('index2', captcha[index2])


    if (isNaN(index1) && isNaN(index2)) {

      if (captcha[index1] === captcha[index1].toLowerCase() && captcha[index2] === captcha[index2].toUpperCase()) {
        captcha = captcha.substring(0, index1 - 1) + captcha[index1].toUpperCase() + captcha.substring(index1 + 1, maxLength)
        captcha = captcha.substring(0, index2 - 1) + captcha[index2] + captcha.substring(index2 + 1, maxLength)
      }
      else if (captcha[index1] === captcha[index1].toUpperCase() && captcha[index2] === captcha[index2].toLowerCase()) {
        console.log('Else ', captcha[index1])
        captcha = captcha.substring(0, index1 - 1) + captcha[index1] + captcha.substring(index1 + 1, maxLength)
        captcha = captcha.substring(0, index2 - 1) + captcha[index2].toUpperCase() + captcha.substring(index2 + 1, maxLength)
      }
      else if (captcha[index1] === captcha[index1].toUpperCase() && captcha[index2] === captcha[index2].toUpperCase()) {
        console.log('Else ', captcha[index1])
        captcha = captcha.substring(0, index1 - 1) + captcha[index1].toUpperCase() + captcha.substring(index1 + 1, maxLength)
        captcha = captcha.substring(0, index2 - 1) + captcha[index2].toUpperCase() + captcha.substring(index2 + 1, maxLength)
      }
    }

    this.data = captcha
    this.captchaData = captcha
    captcha = captcha.split('').join(' ')
    if (captcha.length == 0) {
      console.log('captcha.length', captcha.length);
      this.getCaptcha()
    }
    pen!.fillText(captcha, 40, 40)
  }

  getRandIndex(maxLength: number) {
    return Math.abs(Math.floor(Math.random() * maxLength))
  }

  checkit(): boolean {
    console.log(this.loginForm.get('typeText')!.value)
    let captchaValue = this.loginForm.get('typeText')!.value
    console.log('CANVAS VALUE ', document.getElementsByTagName('canvas'))

    console.log('data ', this.data)


    if (this.data === captchaValue) {
      this.notify.showSuccess('Captcha Is Matched!', 'Sucessfull')
      return true
    }
    else {
      this.notify.showError('Captcha not matched!', 'Error')
      return false;
    }
  }

  openAccount() {
    console.log('open Account')
    this.router.navigate(['/accountopening'], { skipLocationChange: true });
  }

}






