import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination'; //Imports NgxPaginationModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import {AuthGuard} from './auth/auth.guard'
import {AuthService} from './auth/auth.service'
import { HttpClientModule } from '@angular/common/http';
import { CaptchaverifyComponent } from './captchaverify/captchaverify.component';
//import { PortfoliosummaryComponent } from './portfoliosummary/portfoliosummary.component'
import {AccountopeningComponent} from './accountopening/accountopening.component';
import { EnterpasswordComponent } from './enterpassword/enterpassword.component';
import {ForgetpasswordComponent} from './forgetpassword/forgetpassword.component';
import { FooterComponent } from './footer/footer.component';
//import {AlertComponent} from './alert/alert.component';
import {AlertComponent} from './home/alert/alert.component'
//import { SampleComponent } from './home/sample/sample.component';
// import {SidebarComponent} from './home/sidebar/sidebar.component';
import { PortfoliosummaryComponent } from './home/portfoliosummary/portfoliosummary.component';
//import { AccountopeningComponent } from './home/accountopening/accountopening.component';
import { RegisternewuserComponent } from './registernewuser/registernewuser.component';
import { RegistercorporateuserComponent } from './registercorporateuser/registercorporateuser.component';
import { LogoutComponent } from './logout/logout.component'
import { BnNgIdleService } from 'bn-ng-idle'; // import bn-ng-idle service
import { NgChartsModule, NgChartsConfiguration } from 'ng2-charts';
import { EinvestmentComponent } from './home/einvestment/einvestment.component';
import { EredemptionComponent } from './home/eredemption/eredemption.component';
import { EconversionComponent } from './home/econversion/econversion.component';
import { EsummaryComponent } from './home/esummary/esummary.component';
import { TransactionsummaryComponent } from './home/transactionsummary/transactionsummary.component';
import { SummaryComponent } from './home/summary/summary.component';
import { AccountstatementComponent } from './home/accountstatement/accountstatement.component';
import { ProductgridComponent } from './home/productgrid/productgrid.component';
import { AccountmappingComponent } from './home/accountmapping/accountmapping.component';
import { InputMaskModule } from '@ngneat/input-mask';
import { InvestmentDetailsComponent } from './home/einvestment/investment-details/investment-details.component';
import { DetailComponent } from './home/einvestment/detail/detail.component';
import { ErdetailComponent } from './home/eredemption/erdetail/erdetail.component';
import { EcdetailComponent } from './home/econversion/ecdetail/ecdetail.component';
import { BacktologinComponent } from './backtologin/backtologin.component';
// import { NewSidebrComponent } from './home/new-sidebr/new-sidebr.component';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule,NgxUiLoaderRouterModule,NgxUiLoaderConfig } from 'ngx-ui-loader';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  "bgsColor": "#b4cfff",
  "bgsOpacity": 0.6,
  "bgsPosition": "bottom-right",
  "bgsSize": 70,
  "bgsType": "ball-scale-multiple",
  "blur": 5,
  "delay": 0,
  "fastFadeOut": true,
  "fgsColor": "#b4cfff",
  "fgsPosition": "center-center",
  "fgsSize": 80,
  "fgsType": "ball-scale-multiple",
  "gap": 24,
  "logoPosition": "center-center",
  "logoSize": 60,
  "logoUrl": "assets/images/iconse.png",
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgba(40, 40, 40, 0.8)",
  "pbColor": "#b4cfff",
  "pbDirection": "ltr",
  "pbThickness": 4,
  "hasProgressBar": false,
  "text": "Please Wait",
  "textColor": "#FFFFFF",
  "textPosition": "center-center",
  "maxTime": -1,
  "minTime": 500

}



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CaptchaverifyComponent,
    //PortfoliosummaryComponent,
    AccountopeningComponent,
    EnterpasswordComponent,
    // SidebarComponent,
    ForgetpasswordComponent,
    FooterComponent,
    AlertComponent,
    //SampleComponent,
    PortfoliosummaryComponent,
    AccountopeningComponent,
    RegisternewuserComponent,
    RegistercorporateuserComponent,
    TransactionsummaryComponent,
    SummaryComponent,
    LogoutComponent,
    EinvestmentComponent,
    EredemptionComponent,
    EconversionComponent,
    EsummaryComponent,
    ProductgridComponent,
    AccountmappingComponent,
    InvestmentDetailsComponent,
    DetailComponent,
    ErdetailComponent,
    EcdetailComponent,
    BacktologinComponent,
    AccountstatementComponent,
    // NewSidebrComponent,
    
    
    
   
    
   
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    NgbModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    FormsModule, ReactiveFormsModule,  HttpClientModule,
    NgChartsModule,
    InputMaskModule,
    NgxPaginationModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule.forRoot({ showForeground: true,}),
    NgxUiLoaderRouterModule.forRoot({ showForeground: true, }),
   
    
  
  ],
  providers: [AuthService, AuthGuard,BnNgIdleService, { provide: NgChartsConfiguration, useValue: { generateColors: false }} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
