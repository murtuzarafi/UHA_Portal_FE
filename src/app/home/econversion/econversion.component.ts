import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-econversion',
  templateUrl: './econversion.component.html',
  styleUrls: ['./econversion.component.scss']
})
export class EconversionComponent {



  displayStyle = "none";

  constructor(
    private router: Router
  ) { }

  openPopup() {
    this.displayStyle = "block";
    this.router.navigate(['/accountopening'], { skipLocationChange: true });
    

  }
  closePopup() {
    this.displayStyle = "none";
  }

  
  
  
}
