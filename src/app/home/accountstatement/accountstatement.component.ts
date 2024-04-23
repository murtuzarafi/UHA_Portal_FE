import { AfterViewInit, Component, OnInit, VERSION } from '@angular/core';
import { PdfService } from '../../pdf.service'
import * as PDFObject from 'pdfobject';
import { Userservice } from 'src/app/services/userservice.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-accountstatement',
  templateUrl: './accountstatement.component.html',
  styleUrls: ['./accountstatement.component.scss']
})
export class AccountstatementComponent implements OnInit {

  // changed: Date | undefined;
  fromDate: Date | undefined;
  toDate: Date | undefined;

  pipe = new DatePipe('en-US');
  newDate!: string | null;
  newFrDate!: string | null;
  newToDate!: string | null;


  pdfData;
  isLoading = false;
  isShowing = true;
  displayStyle = "none"

  constructor(
    private http: Userservice,
    private pdfService: PdfService
  ) { }

  ngOnInit(): void {
    // this.getReport()
  
  }

  SendDataonChange(event: any) {
    console.log(event.target.value);
  }

  closePopup() {
    console.log('closePopup()')
    this.isShowing = false
    this.displayStyle = "none";
  }

  OpenPopup() {
    this.displayStyle = "block";
  }



  changeFormatFr(fromDate) {
    let ChangedFormat = this.pipe.transform(this.fromDate, 'MM/dd/yyyy');
    this.newFrDate = ChangedFormat;
    console.log(this.newFrDate);
  }


  changeFormatTo(toDate) {
    let ChangedFormat = this.pipe.transform(this.toDate, 'MM/dd/yyyy');
    this.newToDate = ChangedFormat;
    console.log(this.newToDate);
  }

  onClick() {
    this.changeFormatFr(this.fromDate);
    this.changeFormatTo(this.toDate);
  }

  getReport() {
    this.isLoading = true;
    this.changeFormatFr(this.fromDate);
    this.changeFormatTo(this.toDate);
    console.log('Date From :- ', this.newFrDate)
    console.log('Date To :- ', this.newToDate)

    this.http.getPdfReport(this.newFrDate, this.newToDate).subscribe((response) => {
      let rptData = response
      this.isShowing = true
      //console.log('Report Details:- ', rptData)
      this.handleRenderPdf(rptData)
    });
  }
 
  handleRenderPdf(data) {
    PDFObject.embed(data, '#pdfContainer');
    // window.open(data, '#pdfContainer', '_blank');
    
    this.isLoading = false;
  }
}
