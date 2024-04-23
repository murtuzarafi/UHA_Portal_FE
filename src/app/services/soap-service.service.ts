import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SoapService {
  obj: any;
  BaseURL ='http://10.1.20.120:81/SecurityShell_Services/UserService.asmx';

  
  constructor(private http: HttpClient) {

   }

}
