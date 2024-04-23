import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import {DataService} from './data.service'
import { slideInAnimation } from '../animation';



declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class HomeComponent implements OnInit {
  prepareRoute(outlet:RouterOutlet)
    {
      return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }

 private userData = [ {
                      UserId:"",
                      UserTypeId:"",
                      Email: "",
                      Token: "",
                      Name:""                  
                    }]; 

  params:any;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,

  ) { }

  ngOnInit(): void {
   

    } 
    ngAfterViewInit(){
      const activeToggle = document.querySelector('.toggle');
      const body = document.querySelector('body');
      const nav = document.querySelector('nav');
      const faMagnifyingGlass = document.querySelector('.fa-magnifying-glass');
      const switchBx = document.querySelector('.switch');
      // const switchText = document.querySelector('.switchText');
  
      activeToggle?.addEventListener('click', () => {
          nav?.classList.toggle('active');
      });
      faMagnifyingGlass?.addEventListener('click', () => {
          nav?.classList.remove('active');
      });
      switchBx?.addEventListener("click", () => {
          body?.classList.toggle("dark");
  
          // if (body?.classList.contains("dark")) {
          //     switchText?. = "light mode";
          //     switchText.style.transition = '.5s ease';
          // } else {
          //     switchText.innerText = "dark mode";
          //     switchText.style.transition = '.5s ease'
          // }
      });
      
  }
}
