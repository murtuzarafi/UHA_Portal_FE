import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { DataService } from '../data.service'
import { Userservice } from '../../services/userservice.service'

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  data!: any
  UserData!: any
  alertsData!:any
  form!: FormGroup;
  alerts!: FormArray;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private userservice: Userservice
  ) { }

  ngOnInit(): void {


    console.log('User Data Inside Alert :- ',  this.dataService.getData())

    this.form = this.formBuilder.group({
      alerts: this.formBuilder.array([this.createItem()])
    });

    this.userservice.GetAlerts('6487').subscribe((res) => {
      this.alertsData = res
      console.log('Alert Data :-', this.alertsData)
    
    })

    this.userservice.GetAlertMaster().subscribe((res) => {
      this.data = res
      console.log('patchValues', this.data)
      this.patchValues();
    });

  
  }

  createItem() {
    return this.formBuilder.group({
      UAM_NAME: ['', Validators.required],
      UAM_CODE: [''],
      UAM_ID: [''],
      UAM_SMS: new FormControl(false),
      UAM_EMAIL: new FormControl(false),
      UAM_CALL: new FormControl(false),
      UAM_FAX: new FormControl(false),
      UAM_COURIER: new FormControl(false)
    });
  }

  addItem(): void {
    this.alerts = this.form.get('alerts') as FormArray;
    this.alerts.push(this.createItem());
  }

  patchValues() {
    for (let i = 0; i < this.data.length - 1; i++) {
      console.log('I ', i)
      this.addItem();
    }


    this.addAlerts();

  }

  addAlerts() {
    var arrayControl = this.form.get('alerts') as FormArray;
    console.log('ArrayControl', arrayControl.controls[0]);

    for (let iCount = 0; iCount < this.data.length; iCount++) {

      arrayControl.controls[iCount].patchValue(
        {
          "UAM_NAME": this.data[iCount].UAM_NAME,
          "UAM_CODE": this.data[iCount].UAM_CODE,
          "UAM_ID": this.data[iCount].UAM_ID,
          "UAM_SMS": this.data[iCount].UAM_SMS,
          "UAM_EMAIL": this.data[iCount].UAM_EMAIL,
          "UAM_CALL": this.data[iCount].UAM_CALL,
          "UAM_FAX": this.data[iCount].UAM_FAX,
          "UAM_COURIER": this.data[iCount].UAM_COURIER
        });
      console.log(arrayControl.at(iCount).value)
    }
  }


  clearQuantityIfNecessary(id: number) {

  }

  onSubmit() {
    console.log('Your form data : ', this.form.value);
  }

  allChecked(e, Eday:number) {
    let day = Eday
    console.log('SMS Event :-', e.target.checked)

    switch (day) {
      case 0:
        {
          console.log('Day   :-', day)
          this.data.forEach((currentValue, index) => {
            if (e.target.checked == true)
              this.data[index].UAM_SMS = 1;
            else
              this.data[index].UAM_SMS = 0;

          });
        }
        break;
      case 1:
        {
          console.log('Day Email   :-', day)
          this.data.forEach((currentValue, index) => {
            if (e.target.checked == true)
              this.data[index].UAM_EMAIL = 1;
            else
              this.data[index].UAM_EMAIL = 0;

          });
        }
        break;
      case 2:
        {
          console.log('Day Call   :-', day)
          this.data.forEach((currentValue, index) => {
            if (e.target.checked == true)
              this.data[index].UAM_CALL = 1;
            else
              this.data[index].UAM_CALL = 0;

          });
        }
        break;
      case 3:
        {
          console.log('Day Fax   :-', day)
          this.data.forEach((currentValue, index) => {
            if (e.target.checked == true)
              this.data[index].UAM_FAX = 1;
            else
              this.data[index].UAM_FAX = 0;

          });
        }
        break;
      case 4:
        {
          console.log('Day COURIER   :-', day)
          this.data.forEach((currentValue, index) => {
            if (e.target.checked == true)
              this.data[index].UAM_COURIER = 1;
            else
              this.data[index].UAM_COURIER = 0;

          });
        }
        break;     
      default:
        console.log("No such day exists!");
        break;
    }

  /*
    this.data.forEach((currentValue, index) => {
      if (e.target.checked == true)
        this.data[index].UAM_SMS = 0;
      else
        this.data[index].UAM_SMS = 1;

    });
  */
  }

  changeSMSStatus(id: string, event: any) {
    this.data.forEach((currentValue, index) => {
      if (currentValue.UAM_CODE == id) {
        if (this.data.UAM_SMS == 1)
          this.data.UAM_SMS = 0;
        else
          this.data.UAM_SMS = 1;
        console.log('Current SMS Value :- ', this.data.UAM_SMS)
      }
    });
  }

  changeEmailStatus(id: string, event: any) {
    this.data.forEach((currentValue, index) => {
      if (currentValue.UAM_CODE == id) {
        if (this.data.UAM_EMAIL == 1)
          this.data.UAM_EMAIL = 0;
        else
          this.data.UAM_EMAIL = 1;
        console.log('Current EMAIL Value :- ', this.data.UAM_EMAIL)
      }
    });
  }

  changeCallStatus(id: string, event: any) {
    this.data.forEach((currentValue, index) => {
      if (currentValue.UAM_CODE == id) {
        if (this.data.UAM_CALL == 1)
          this.data.UAM_CALL = 0;
        else
          this.data.UAM_CALL = 1;
        console.log('Current CALL Value :- ', this.data.UAM_CALL)
      }
    });
  }
  changeFaxStatus(id: string, event: any) {
    this.data.forEach((currentValue, index) => {
      if (currentValue.UAM_CODE == id) {
        if (this.data.UAM_FAX == 1)
          this.data.UAM_FAX = 0;
        else
          this.data.UAM_FAX = 1;
        console.log('Current FAX Value :- ', this.data.UAM_FAX)
      }
    });
  }
  changeCourierStatus(id: string, event: any) {
    this.data.forEach((currentValue, index) => {
      if (currentValue.UAM_CODE == id) {
        if (this.data.UAM_COURIER == 1)
          this.data.UAM_COURIER = 0;
        else
          this.data.UAM_COURIER = 1;
        console.log('Current COURIER Value :- ', this.data.UAM_COURIER)
      }
    });
  }
}
