import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import {Configuration} from '../app.constants';

let encodeQueryData = (data: any): string => {
  let ret = [];

  for (let d of Object.keys(data)) {
    ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
  }

  return ret.join('&');
};

@Injectable()
export class CompanyInfoService {
  private actionUrl: string;
  private COMPANY_KEY: string = 'userCompany'

  constructor(private _http: Http,
              private _configuration: Configuration){
    this.actionUrl = `${_configuration.kvkApiHost}${_configuration.kvkApiPrefix}companies`;
  }

  public getCompanyByKvkNumber(kvkNumber) {
    return this._http
      .get(this.actionUrl + '/by-kvknumber/'+ kvkNumber +'?' + encodeQueryData({
          'api_key': this._configuration.kvkApiKey
        })).map(res => res.json());
  }

  public getCompanyOfCurrentUser() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser")).user;
    this.getCompanyByKvkNumber(currentUser.companyID).subscribe(result => {
      if (result.returned === 1){
        console.log("saved company info")
        let userCompany = result.companies[0];
        console.log(userCompany);
        localStorage.setItem(this.COMPANY_KEY, JSON.stringify({userCompany}));
      } else {
        console.log("could not find company");
        localStorage.setItem(this.COMPANY_KEY, JSON.stringify({}));
      }
    });
  }
}
