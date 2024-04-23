import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute,  Router } from "@angular/router";
import {DataService} from '../data.service'
//import { getName } from 'src/app/test';
import {CommonFunctions } from 'src/app/test';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class SampleComponent implements OnInit{
 
  @Input()
  UserData!:any  
  params:any;
  
  constructor(private route: ActivatedRoute,
              private router: Router,
              private dataService: DataService,
              private commonFunctions: CommonFunctions
              
              ) { 
      console.log('SAMPLE')
    }

  ngOnInit(): void {
    const name =  this.commonFunctions.getName()

    console.log('Length is :- ', name)


    this.UserData = this.dataService.getData()
    console.log('SAMPLE COMPONENT', this.UserData)
   
  }

}
