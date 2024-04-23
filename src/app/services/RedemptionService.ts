import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class RedemptionService {

  private methodName: string = ''

  private appCode: string = 'appCode'
  private userName: string = 'userName'
  private password: string = 'password'
  private ipAddress: string = 'ipAddress'
  private macAddress: string = 'macAddress'
  private sysName: string = 'sysName'
  private timeOffset: string = 'timeOffset'

  private REST_API_SERVER_Old = "http://128.1.22.66:8090/User";
  private REST_API_SERVER = "http://localhost:44335/User";
  private REST_API_SERVER_Liv = "http://128.1.22.158/Portal/User"

  constructor(private http: HttpClient) { }

  public GetRedemptionProductsWithManagmentCompany(accSystemCode: string, mgCompanyCode: string, isSSAAllowed:number) {
    ///console.log("GetProductListWithManagmentCompany", this.REST_API_SERVER + '/GetProductListFilterManagmentCompany?accSystemCode=' + "'" + accSystemCode + "'" + '&mgCompanyCode=' + "'" + mgCompanyCode + "'")

    return this.http.get(this.REST_API_SERVER + '/GetRedemptionProductsWithManagmentCompany?accSystemCode=' + accSystemCode + '&mgCompanyCode=' + mgCompanyCode+ '&isSSAAllowed=' + isSSAAllowed );
    //return this.http.get(this.REST_API_SERVER + '/GetProductListFilterManagmentCompany?accSystemCode=' +"'"+ accSystemCode +"'"+ '&mgCompanyCode=' + "'"+mgCompanyCode+"'")
  }

  public GetGenGeneralType(){
    return this.http.get(this.REST_API_SERVER + '/GetGenGeneralType' );
  }
}