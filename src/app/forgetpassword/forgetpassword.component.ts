import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from './../auth/auth.service';
import {Userservice} from '../services/userservice.service' 

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent  implements OnInit {
  data: any
  loginForm!: FormGroup;
  submitted = false;
  formSubmitAttempt!: boolean;
  user:any
  
  
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService:Userservice
    ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      cnic: ['', [Validators.required]],
      //password: ["",[Validators.required//,Validators.pattern( "(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>\"'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}")]],
      typeText:['', Validators.required]
    });

    console.log('IP Adress :- ', window.location.origin )

    this.getUser()
    this.getCaptcha()
  }

  getUser(){
    this.userService.GetUserEmail('ejaz.awan').subscribe( (response) => {
      console.log(response)
      this.user =  response;
    })
  }

  get formControl() {
    return this.loginForm.controls;
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.controls['email'].value);
    }
    this.formSubmitAttempt = true;

  }


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

    console.log('index1', captcha[index1].toLowerCase().toUpperCase())
    console.log('index2', captcha[index2].toLowerCase().toUpperCase())

    captcha = captcha.substring(0, index1 - 1) + captcha[index1].toLowerCase().toUpperCase() + captcha.substring(index1 + 1, maxLength)
    captcha = captcha.substring(0, index2 - 1) + captcha[index2].toLowerCase().toUpperCase() + captcha.substring(index2 + 1, maxLength)

    console.log('Captcha', captcha)
    this.data = captcha
    captcha = captcha.split('').join(' ')

    pen!.fillText(captcha, 40, 40)
  }

  getRandIndex(maxLength: number) {
    return Math.floor(Math.random() * maxLength)
  }

  checkit() {

   console.log(this.loginForm.get('email')!.value)
   console.log(this.loginForm.get('typeText')!.value)
   let captchaValue = this.loginForm.get('typeText')!.value
    console.log('data ', this.data)
    if (this.data == captchaValue)      
    {
      alert('Matched')     
      //return false
    }
    else
    {
      alert('Invalid')
    //console.log('typedata', this.data)
    }
  }

}
