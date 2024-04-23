import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-accountopening',
  templateUrl: './accountopening.component.html',
  styleUrls: ['./accountopening.component.scss']
})
export class AccountopeningComponent {

  constructor(
    private router: Router
  ){}

  gotoRegisternewuser(){

    this.router.navigate(['/registernewuser'])
  }
  gotoRegistercorporateuser(){
    this.router.navigate(['/registercorporateuser'])
  }
  
  
}
