import { ChangeDetectionStrategy, Input, Component, OnInit } from '@angular/core';
import { Userservice } from 'src/app/services/userservice.service';
import { DataService } from '../data.service';
import { UnpaidInvestment } from 'src/app/Models/UnpaidInvestment';
import { PagingConfig, PagingPndConfig } from 'src/app/Models/pagingConfig';


@Component({
  selector: 'app-esummary',
  templateUrl: './esummary.component.html',
  styleUrls: ['./esummary.component.scss']
})
export class EsummaryComponent {

  AccSysCode: string = ''
  MgCompanyCode: string = ''
  UnPaiding: any
  Pending: UnpaidInvestment[] = [] as UnpaidInvestment[];

  Page: number = 1;
  PerPage: number = 20;
  totalRows: number = 0;

  tableSize: number[] = [20, 15, 10, 5, 4, 3, 2, 1];

  pagingConfig: PagingConfig = {} as PagingConfig;

  constructor(private http: Userservice, dataService: DataService) {
    this.AccSysCode = dataService.getAccSystemCode()

    this.pagingConfig = {
      itemsPerPage: this.PerPage,
      currentPage: this.Page,
      totalItems: this.totalRows
    }
  }

  ngOnInit(): void {
    this.http.GetUnpaidInvestment(this.AccSysCode, 0).subscribe((res) => {
      this.UnPaiding = res
      this.pagingConfig.totalItems = this.UnPaiding.length
      console.log('in INIT Pending ', this.UnPaiding)
    });
  }

  getPendingTransactions() {
    if (this.UnPaiding) {
      this.Pending = []
      for (let iCount = 0; iCount < this.UnPaiding.length; iCount++) {
        console.log('ON Loop ', this.UnPaiding[iCount])
        this.Pending.push(this.UnPaiding[iCount])
      }
    }
  }


  onTableDataChange(event: any) {
    console.log('onTableDataChange', event)
    this.pagingConfig.currentPage = event
  }


  onTableSizeChange(event: any): void {
    console.log('onTableSizeChange', event)
    this.pagingConfig.itemsPerPage = event.target.value;
    this.pagingConfig.currentPage = 1;
  }

}
