import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { EnterpasswordComponent } from './enterpassword/enterpassword.component'
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component'
import { PortfoliosummaryComponent } from './home/portfoliosummary/portfoliosummary.component'
//import {AlertComponent} from './alert/alert.component'
import { AlertComponent } from './home/alert/alert.component'
import { SampleComponent } from './home/sample/sample.component';
import { AccountopeningComponent } from './accountopening/accountopening.component';
import { RegisternewuserComponent } from './registernewuser/registernewuser.component';
import { RegistercorporateuserComponent } from './registercorporateuser/registercorporateuser.component';
import { EinvestmentComponent } from './home/einvestment/einvestment.component';
import { EredemptionComponent } from './home/eredemption/eredemption.component'
import { EconversionComponent } from './home/econversion/econversion.component'
import { ProductgridComponent } from './home/productgrid/productgrid.component'
import { AccountmappingComponent } from './home/accountmapping/accountmapping.component'
import { InvestmentDetailsComponent } from './home/einvestment/investment-details/investment-details.component'
import { EcdetailComponent } from './home/econversion/ecdetail/ecdetail.component';
import { ErdetailComponent } from './home/eredemption/erdetail/erdetail.component';
import { DetailComponent } from './home/einvestment/detail/detail.component';
import { TransactionsummaryComponent } from './home/transactionsummary/transactionsummary.component';
import { AccountstatementComponent } from './home/accountstatement/accountstatement.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  //{ path: '', component: AccountopeningComponent},  
  { path: 'login', component: LoginComponent },
  { path: 'forgetpassword', component: ForgetpasswordComponent },
  { path: 'enterpassword', component: EnterpasswordComponent },
  { path: 'accountopening', component: AccountopeningComponent },
  { path: 'registernewuser', component: RegisternewuserComponent },
  { path: 'registercorporateuser', component: RegistercorporateuserComponent },
  { path: 'productgrid', component: ProductgridComponent },
  { path: 'accountmapping', component: AccountmappingComponent },
  {path: 'accountstatement', component: AccountstatementComponent},
  {
    path: 'home', component: HomeComponent,
    children: [
      {
        path: 'alert',
        component: AlertComponent, data:{ animation: 'alert'}
      },
      {
        path: 'sample',
        component: SampleComponent
      },
      {
        path: 'portfoliosummary',
        component: PortfoliosummaryComponent, data:{ animation: 'portfoliosummary'}
      },
      {
        path: 'einvestment', children: 
        [
          {
            path: '', component: EinvestmentComponent, data:{ animation: 'einvestment'}
          },
          {            
            path: 'investment-details/:id', component: InvestmentDetailsComponent,                                  
          }
          //,{path:'detail', component:DetailComponent,}
        ]
      },
      {
        path: 'eredemption', children:[
          {
            path:'' ,component: EredemptionComponent, data:{ animation: 'eredemption'}
          },
          {
            path: 'erdetail', component:ErdetailComponent
          }
        ]
      },
      {
        path: 'econversion',  children: [
          {
            path:'',  component: EconversionComponent, data:{ animation: 'econversion'}
          },
          {
            path: 'ecdetail', component: EcdetailComponent,                                  
          }
        ]
      },
      {
        path: 'accountmapping',
        component: AccountmappingComponent, data:{ animation: 'accountmapping'}
      },
      {
        path: 'transactionsummary',
        component: TransactionsummaryComponent, 
      },
      {
        path: 'accountstatement',
        component: AccountstatementComponent, 
      }
      
    

    ]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
