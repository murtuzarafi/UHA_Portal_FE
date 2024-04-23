import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NavigationExtras, Router } from "@angular/router";
import { AuthService } from './../auth/auth.service';
import { Userservice } from '../services/userservice.service'
import { ActivatedRoute } from '@angular/router';
import { User } from '../auth/User'
import { DataService} from '../home/data.service'

@Component({
  selector: 'app-enterpassword',
  templateUrl: './enterpassword.component.html',
  styleUrls: ['./enterpassword.component.scss']
})
export class EnterpasswordComponent implements OnInit {
  data: any
  loginForm!: FormGroup;

  UserObj: User[] = [];;

  options = {
    words: ["chuck", "norris", "vs", "keanu", "reeves"]
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userservice: Userservice,
    private route: ActivatedRoute,
    private dataService:DataService
  ) { }

  ngOnInit(): void {
    const userName = this.route.snapshot.paramMap.get('id')
    console.log('Parameter ID ', userName)
    this.loginForm = this.formBuilder.group({
      password: ["", [Validators.required]]
    });
    
    this.data = userName
  }

  get formControl() {
    return this.loginForm.controls;
  }

  onLogin(): void {

    if (this.loginForm.valid) {
      console.log('PASSWORD ', this.loginForm.controls['password'].value);   
      this.getUser(this.loginForm.controls['password'].value)
    }

  }

  getUser(pwd: string) {
    console.log('Inside the getUser Method :-', pwd)
    try {
      console.log('PWD   ', pwd)
      
      this.userservice.GetUser('1234567', this.data, pwd, '128.1.22.66', 1, 1, 0).subscribe((response) => {
        console.log('User Data Response   ', response)
        this.data = response
       
        if (this.data.ErrorMessage !== "Invalid User" && this.data.ErrorMessage !== null) {
          console.log('Response Hai ', this.data)
          this.dataService.setData(this.data);
          this.router.navigate(['/home/portfoliosummary'], {skipLocationChange:true})
        }
        else {
          console.log('Response Error Hai ', this.data.ErrorMessage)
          this.router.navigate(['/login'])
        }
      });
    }
    catch (e) {
      console.error("ERROR ",e);
    }
  }

}
