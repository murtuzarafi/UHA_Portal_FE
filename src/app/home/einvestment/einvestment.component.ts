import { Component, OnInit } from '@angular/core';
import { Userservice } from '../../services/userservice.service'
import { Router } from "@angular/router";
import { DataService } from '../data.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

//import {IS_TRX_TRX_ONLINETRANSACTIONPIN} from '../../Models/IS_TRX_TRX_ONLINETRANSACTIONPIN'


@Component({
  selector: 'app-einvestment',
  templateUrl: './einvestment.component.html',
  styleUrls: ['./einvestment.component.scss']
})

export class EinvestmentComponent implements OnInit {

  displayStyle = "none";
  data!: any
  dataDtl!: any
  AccSysCode:string=""
  productName:string=""
  constructor(
            private http: Userservice,
            private router: Router,
            private dataService :DataService,
            private NgxUiLoaderService: NgxUiLoaderService,
            ) {
  }

  ngOnInit(): void {
    
    this.http.GetAccountDetails('6487').subscribe((res) => {
      this.data = res
      this.AccSysCode = this.data[0]?.ACC_SYSTEMCODE
      console.log("Account Details :- ", this.AccSysCode );
    });
   // this.getProductList() 
 
  }

  getProductList(){
    this.http.GetProductList(this.AccSysCode).subscribe((response) => {    
      this.dataDtl = response  
    });
  }


  openPopup() {
    
    console.log("Open Investment Poopup window :- " )
    //////////this.displayStyle = "block";
    //////////////////this.productName = ""
    //this.router.navigate(['../einvestment/investment-details'], { skipLocationChange: true });
    ///this.router.navigate(['/investment-details', this.AccSysCode]);
    //this.router.navigateByUrl('./detail');    
    this.router.navigate(['./einvestment/detail']);
    
    /*
    this.http.GetProductList(this.AccSysCode).subscribe((response) => {    
      this.dataDtl = response  
      console.log("Pro duct Details :- ", this.dataDtl);
    });
    */

  }
  closePopup() {
    this.displayStyle = "none";
  }
  selectFund(event, proName){
    if(event.target.checked)
        this.productName = proName
    else
      this.productName = ""
    console.log('CheckBox', proName);
  }
}
