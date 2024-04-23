import { Component } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-backtologin',
  templateUrl: './backtologin.component.html',
  styleUrls: ['./backtologin.component.scss']
})
export class BacktologinComponent {

  constructor(
    private router: Router
  ){}

  LoginApp() {
    this.router.navigate(['/login'])
}
 
}




