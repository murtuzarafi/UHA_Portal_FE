import { ChangeDetectionStrategy, Input, Component, OnInit } from '@angular/core';
import { Userservice } from 'src/app/services/userservice.service';
import { DataService } from '../data.service';
import { UnpaidInvestment } from 'src/app/Models/UnpaidInvestment';
import { PagingConfig, PagingPndConfig } from 'src/app/Models/pagingConfig';
import { map } from 'rxjs';



@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./summary.component.scss']
})


export class SummaryComponent implements OnInit {
  pdfSource: any
  start;
  last;


  AccSysCode: string = ''
  MgCompanyCode: string = ''
  Pending: any
  Unpaid: any

  currentPage: number = 1;
  itemsPerPage: number = 20;
  totalItems: number = 0;

  tableSize: number[] = [20, 15, 10, 5, 2, 1];
  pagingConfig: PagingConfig = {} as PagingConfig;
  
  constructor(private http: Userservice, dataService: DataService) {
    this.AccSysCode = dataService.getAccSystemCode()

    this.pagingConfig = {
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
      totalItems: this.totalItems
    }
    //this.getPendingTransactions()
    this.http.GetPendingTransaction(this.AccSysCode, 0).subscribe((res) => {
      this.Pending = res     
    });
  }

  ngOnInit(): void {
    
  }

  getPendingTransactions() {
    this.http.GetPendingTransaction(this.AccSysCode, 0).subscribe((res) => {
      this.Pending = res
      //this.customers = []
      for (let iCount = 0; iCount < this.Pending.length; iCount++) {
        console.log('ON Loop ', this.Pending[iCount])        
      }
//      console.log('ON INIT Customers ', this.customers)
    });
  }

  onTableDataChange(event: any) {
    console.log('onTableDataChange', event)
    this.pagingConfig.currentPage = event
  }

  onTableSizeChange(event: any): void {
      console.log('onTableSizeChange', event)
    this.pagingConfig.itemsPerPage = event.target.value;
  }

  getPdfReport() {

    const baseUrl = location.protocol + "//" + location.host + "/assets/"
    const document = 'Report_20240327103752.pdf'
    const url = baseUrl + document
    window.open(url, '_blank');
    console.log('Instide Report Method')

  }

  getPDF() {
    console.log('Report')
    const reportUrl = 'src/assets/Report_20240327103752.pdf'

    var file = new Blob([reportUrl], { type: 'application/pdf' });
    var fileURL = URL.createObjectURL(file);

    // if you want to open PDF in new tab
    window.open(fileURL);
    //var a = document.createElement('a');
    //a.href = fileURL;
    //a.download = 'bill.pdf';
    //document.body.appendChild(a);
    //a.click();
  }
  openPDF() {
    const URL = 'assets/pdf/Report_20240327103752.pdf'
    window.open(URL);
  }
}
