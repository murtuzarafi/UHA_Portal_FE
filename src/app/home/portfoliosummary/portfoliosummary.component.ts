import { Component, OnInit } from '@angular/core';
import { Userservice } from '../../services/userservice.service'
import { Chart } from 'node_modules/chart.js'
import { DataService } from '../data.service'
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-portfoliosummary',
  templateUrl: './portfoliosummary.component.html',
  styleUrls: ['./portfoliosummary.component.scss']
})

export class PortfoliosummaryComponent implements OnInit {

  //dropdownList
  //  const tmpaccCode: userData[0].ACC_Code
  //dataList: Array<any> = [{ACC_CODE:0, ACC_TITLE:''} ];

  //accountList: Array<any> = [{ code: 1, name: "Askari Cash Fund (6487)" },  { code: 2, name: "Fund Gold (6487) " },   { code: 3, name: "Fund Silver (7788)" }];
  dataList: any;
  accCode: string = ''
  userData: any
  dataP: any
  dataF: any
  fundName: string = "";

  //
  data: any;
  funds: any[] = [];
  datayear: any[] = []
  datacolor: any[] = []
  databorder: any[] = []
  //dataamount: any[7] = [];

  constructor(
    private userService: Userservice, 
    private dataService: DataService,
    private ngxService: NgxUiLoaderService,
    
    ) {
    this.accCode = this.dataService.getUserAccountCode();
    ///this.sample()
    this.userService.GetPersonalInformation(this.accCode).subscribe((res) => {
      this.dataP = res
      this.dataService.setUserAccCode(this.dataP?.ACC_CODE)
      this.dataService.setUserManagementCompany(this.dataP?.ACC_MANAGEMENTCOMPANY)
      this.dataService.setAccSystemCode(this.dataP?.ACC_SYSTEMCODE)
    });

  }


  sample = async () => {
    const response = await this.userService.GetPersonalInformation(this.accCode).subscribe((res) => {
      this.dataP = res
      this.dataService.setUserAccCode(this.dataP.ACC_CODE)
      this.dataService.setUserManagementCompany(this.dataP.ACC_MANAGEMENTCOMPANY)
      this.dataService.setAccSystemCode(this.dataP.ACC_SYSTEMCODE)
    });

  }
  ngOnInit(): void {
  
    let accCode = this.dataService.getUserAccountCode();
    let mgCode = this.dataService.getUserManagementCompany();
    this.userService.GetFundInformationWFilterManagementCompany(accCode, mgCode).subscribe((response) => {
      this.dataF = response
      console.log('Fund length', this.dataF.length);
      console.log('Fund Data', response);
      let dataamount = new Array<number>(this.dataF.length);
      let heading = new Array<string>(this.dataF.length);

      if (this.dataF != null) {
        for (let i = 0; i < this.dataF.length; i++) {
          heading.push(this.dataF[i].PRD_NAME)
          dataamount.push(parseInt(this.dataF[i].HoldingPercentage))
          /*
        //  console.log('Data Amount 2 ' + i, heading )

          // if (i > 0 && i < this.dataF.length-1) {
          //   console.log('Data Amount 2 ' + i, this.dataamount + ',' + parseInt(this.dataF[i].HoldingPercentage))
          //   this.dataamount.push(parseInt(this.dataF[i].HoldingPercentage))
          // }
          // else if (i == this.dataF.length-1)
          // {
          //   this.dataamount.push(parseInt(this.dataF[i].HoldingPercentage))
          //   console.log('Data Amount 2 ' + i, this.dataamount )
            
          // }
          // else {
          //   this.dataamount.push(parseInt(this.dataF[i].HoldingPercentage))
          //   console.log('Data Amount 2 ' + i, this.dataamount )
            
          // }
*/
        }
      }
      this.showData(dataamount, heading)
    });
    //this.getSwitchAccounts('Hasnain Tayyab');

  
   
  }

  getSwitchAccounts(event: any) {
    console.log(event.target.value);
    this.userService.GetSwitchAccounts('Hasnain Tayyab').subscribe((response) => {
      console.log('Fteched Switch Data :-  ', response[0].ACC_CODE);
      this.dataList = response;
      console.log('data array :-  ', this.dataList);
      this.userData.setUserAccCode(response[0].ACC_CODE);

    })

  }

  showData(dataamount: any[], heading: any[]) {
    console.log('Sample 4', heading.length)
    var result = heading.filter(function (x) { return x.length });
    //console.log('Result ', result);
    new Chart("myChart", {
      type: "pie",
      data: {
        labels: result,
        /*
        datasets : [ {
          label: 'Dataset 1',
          data: dataamount,
          borderColor: '#36A2EB',
          backgroundColor: '#9BD0F5',
        },
        {
          label: 'Dataset 2',
          data: dataamount,
          borderColor: '#FF6384',
          backgroundColor: '#FFB1C1',
        }],
        */
        datasets: [{
          label: 'HOLDING PERCENTAGE',
          data: dataamount,
          borderWidth: 1,
          backgroundColor: [
            'hsl(218, 41%, 30%)',
            'hsl(218, 81%, 75%)',
            'hsl(218 41% 45%)'
            
          ]
        }]

      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }

  /*
  updateArray(data:any){
    console.log('UpdateArray', data);
      data.forEach((item) => {
      console.log( "'"+item.PRD_NAME+"'"+',');
    });
    console.log("Pie Chart Labels ", this.pieChartLabels)       
  }
*/
}
