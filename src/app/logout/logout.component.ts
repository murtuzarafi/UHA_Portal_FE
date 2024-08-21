import { Component, OnInit } from '@angular/core';
import {DataService} from '../home/data.service';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})

export class LogoutComponent implements OnInit  {
  

   loginedUser : Observable<string> | undefined;
   userStatus : Observable<string> | undefined;

  title:string='Demo'
  status:string="Sign in"
  action: string = 'Logout';
  constructor(  
                private dataservice: DataService,
                private router: Router,
                public translate: TranslateService
              ){}

              
  changeMe() {
  /*
    if(this.action == 'Sign in') {
      this.action = 'Sign out';      
    } else {
      this.action = 'Sign in';
    }
*/
    this.dataservice.setMyGV('');
    this.dataservice.setStatus('');
    this.dataservice.logout();
    this.router.navigate(['login']);

    
  }

  ngOnInit() {
    this.loginedUser = this.dataservice.getMyGV();    
    this.userStatus = this.dataservice.getStatus();
    
  }

  ngAfterViewInit(){
    document.querySelectorAll('.dropdown-toggle').forEach(item => {
  item.addEventListener('click', event => {
    if (event && event.target) {
      const targetElement = event.target as HTMLElement; // Cast event.target to HTMLElement
      if(targetElement.classList.contains('dropdown-toggle') ){
        targetElement.classList.toggle('toggle-change');
      }
      else if(targetElement.parentElement && targetElement.parentElement.classList.contains('dropdown-toggle')){
        targetElement.parentElement.classList.toggle('toggle-change');
      }
    }
  })
});

  }
}
