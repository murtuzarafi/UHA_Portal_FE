import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute, RouterOutlet } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle'; // import it to your component
import { NgxUiLoaderService } from "ngx-ui-loader";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
  

})
export class AppComponent implements OnInit, OnDestroy {
  title = 'sample';
  user = { email: null, password: null };

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private bnIdle: BnNgIdleService,
    private NgxUiLoaderService: NgxUiLoaderService,
    private _loader: NgxUiLoaderService,
   
  ) { }
  onSubmit(user: any) {
    /// this.router.navigate(['/home']);
    //this.toastr.show("User logged in successfully");
    //console.log(user);
  }
  ngOnInit(): void {

   



    this.bnIdle.startWatching(900).subscribe((res) => {
      if (res) {
        this.router.navigate(['/login'])
      }
    }) 
   
  }

  ngOnDestroy(): void {
    alert('Alert')
    console.log('closed Application ')
  }
    
}
