import { Component } from '@angular/core';

@Component({
  selector: 'app-eredemption',
  templateUrl: './eredemption.component.html',
  styleUrls: ['./eredemption.component.scss']
})
export class EredemptionComponent {
  displayStyle = "none";


  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }
}
