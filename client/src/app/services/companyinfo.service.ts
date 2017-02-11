import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Configuration } from '../app.constants';
import { Observable } from 'rxjs';
import { KvKCompany } from '../models/kvkcompany.model';

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
  private COMPANY_KEY: 'userCompany';

  public constructor(
    private _http: Http,
    private _configuration: Configuration
  ) {
    this.actionUrl = `${_configuration.kvkApiHost}${_configuration.kvkApiPrefix}companies`;
  }

  public getCompanyByKvkNumber(kvkNumber: string): Observable<KvKCompany> {
    return this._http.get(this.actionUrl + '/by-kvknumber/' + kvkNumber + '?' + encodeQueryData({
        'api_key': this._configuration.kvkApiKey
    })).map(res => res.json());
  }

  public findByName(name: string): Observable<KvKCompany[]> {
    return this._http.get(this.actionUrl + '?' + encodeQueryData({
        'api_key': this._configuration.kvkApiKey,
        'tradename': name
    })).map(res => res.json());
  }

  public findByKvKNumber(kvkNumber: string): Observable<KvKCompany[]> {
    return this._http.get(this.actionUrl + '?' + encodeQueryData({
        'api_key': this._configuration.kvkApiKey,
        'kvknummer': kvkNumber
    })).map(res => res.json());
  }


  public getCompanyOfCurrentUser(): Observable<KvKCompany> {
    let currentUser = JSON.parse(localStorage.getItem('currentUser')).user;
    return this.getCompanyByKvkNumber(currentUser.companyID)
      .map((data: any) => data.returned === 1 ? <KvKCompany>data.companies[0] : undefined);
  }
}
